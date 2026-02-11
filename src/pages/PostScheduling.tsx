import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Image as ImageIcon, Video, Plus, Trash2, Edit2, X, Eye, LayoutList, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmationModal from '../components/ConfirmationModal';
import PostPreview from '../components/PostPreview';
import Calendar from '../components/Calendar';

interface ScheduledPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'published' | 'failed';
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
  mediaFile?: File;
}

interface Platform {
  id: string;
  name: string;
  charLimit: number;
}

const PLATFORMS: Platform[] = [
  { id: 'tiktok', name: 'TikTok', charLimit: 2200 },
  { id: 'x', name: 'X', charLimit: 280 },
  { id: 'facebook', name: 'Facebook', charLimit: 63206 },
  { id: 'instagram', name: 'Instagram', charLimit: 2200 },
  { id: 'youtube', name: 'YouTube', charLimit: 5000 },
  { id: 'youtube-shorts', name: 'YouTube Shorts', charLimit: 5000 },
];

const mockScheduledPosts: ScheduledPost[] = [
  {
    id: '1',
    content: 'Check out our new product launch! 🚀',
    platforms: ['facebook', 'instagram'],
    scheduledDate: '2026-02-12',
    scheduledTime: '14:00',
    status: 'scheduled',
    mediaType: 'image',
  },
  {
    id: '2',
    content: 'Behind the scenes of our team working hard!',
    platforms: ['tiktok'],
    scheduledDate: '2026-02-11',
    scheduledTime: '10:30',
    status: 'scheduled',
    mediaType: 'video',
  },
];

export default function PostScheduling() {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(mockScheduledPosts);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<ScheduledPost | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [newPost, setNewPost] = useState({
    content: '',
    platforms: [] as string[],
    scheduledDate: '',
    scheduledTime: '',
  });

  const getCharLimit = () => {
    if (newPost.platforms.length === 0 || editingPost?.platforms.length === 0) return null;
    const activePlatforms = editingPost ? editingPost.platforms : newPost.platforms;
    const limits = activePlatforms.map(platformId => 
      PLATFORMS.find(p => p.id === platformId)?.charLimit || Infinity
    );
    return Math.min(...limits);
  };

  const charLimit = getCharLimit();
  const currentLength = editingPost ? editingPost.content.length : newPost.content.length;
  const charsRemaining = charLimit ? charLimit - currentLength : null;

  const handlePlatformToggle = (platformId: string) => {
    if (editingPost) {
      setEditingPost({
        ...editingPost,
        platforms: editingPost.platforms.includes(platformId)
          ? editingPost.platforms.filter((p) => p !== platformId)
          : [...editingPost.platforms, platformId],
      });
    } else {
      setNewPost((prev) => ({
        ...prev,
        platforms: prev.platforms.includes(platformId)
          ? prev.platforms.filter((p) => p !== platformId)
          : [...prev.platforms, platformId],
      }));
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
  };

  const handleCreatePost = () => {
    if (newPost.content && newPost.platforms.length > 0 && newPost.scheduledDate && newPost.scheduledTime) {
      const post: ScheduledPost = {
        id: Date.now().toString(),
        content: newPost.content,
        platforms: newPost.platforms,
        scheduledDate: newPost.scheduledDate,
        scheduledTime: newPost.scheduledTime,
        status: 'scheduled',
        mediaFile: mediaFile || undefined,
        mediaType: mediaFile ? (mediaFile.type.startsWith('video/') ? 'video' : 'image') : undefined,
        mediaUrl: mediaPreview || undefined,
      };
      setScheduledPosts([post, ...scheduledPosts]);
      setNewPost({ content: '', platforms: [], scheduledDate: '', scheduledTime: '' });
      setMediaFile(null);
      setMediaPreview(null);
      setShowNewPostForm(false);
      toast.success('Post scheduled successfully');
    }
  };

  const handleEditClick = (post: ScheduledPost) => {
    setEditingPost(post);
    setMediaPreview(post.mediaUrl || null);
    setShowNewPostForm(false);
  };

  const handleUpdatePost = () => {
    if (editingPost && editingPost.content && editingPost.platforms.length > 0) {
      setScheduledPosts(scheduledPosts.map(post => 
        post.id === editingPost.id ? {
          ...editingPost,
          mediaFile: mediaFile || editingPost.mediaFile,
          mediaType: mediaFile ? (mediaFile.type.startsWith('video/') ? 'video' : 'image') : editingPost.mediaType,
          mediaUrl: mediaPreview || editingPost.mediaUrl,
        } : post
      ));
      setEditingPost(null);
      setMediaFile(null);
      setMediaPreview(null);
      toast.success('Post updated successfully');
    }
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setMediaFile(null);
    setMediaPreview(null);
    toast.info('Edit cancelled');
  };

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      setScheduledPosts(scheduledPosts.filter((post) => post.id !== postToDelete));
      setShowDeleteModal(false);
      setPostToDelete(null);
      toast.success('Post deleted successfully');
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Posts</h1>
          <p className="text-gray-600">Create and manage your social media content</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutList className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Calendar
            </button>
          </div>
          <button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>
      </div>

      {/* New Post Form */}
      {showNewPostForm && !editingPost && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Post</h2>
          
          {/* Content */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Post Content</label>
              {charsRemaining !== null && (
                <span className={`text-sm ${charsRemaining < 0 ? 'text-red-600 font-semibold' : charsRemaining < 50 ? 'text-orange-600' : 'text-gray-500'}`}>
                  {charsRemaining < 0 ? `${Math.abs(charsRemaining)} characters over limit` : `${charsRemaining} characters remaining`}
                </span>
              )}
            </div>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              placeholder="What's on your mind?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              rows={4}
            />
          </div>

          {/* Platform Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Platforms</label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    newPost.platforms.includes(platform.id)
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                  }`}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={newPost.scheduledDate}
                  onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={newPost.scheduledTime}
                  onChange={(e) => setNewPost({ ...newPost, scheduledTime: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Media Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Media (Optional)</label>
            {mediaPreview ? (
              <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                {mediaFile?.type.startsWith('video/') ? (
                  <video src={mediaPreview} className="w-full h-48 object-cover" controls />
                ) : (
                  <img src={mediaPreview} alt="Upload preview" className="w-full h-48 object-cover" />
                )}
                <button
                  onClick={removeMedia}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-300 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
                <div className="flex items-center justify-center gap-4 mb-2">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                  <Video className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">Images or videos up to 10MB</p>
              </label>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCreatePost}
              disabled={charsRemaining !== null && charsRemaining < 0}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Schedule Post
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button
              onClick={() => {
                setShowNewPostForm(false);
                removeMedia();
                setShowPreview(false);
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Preview Section */}
          {showPreview && newPost.platforms.length > 0 && newPost.content && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Previews</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {newPost.platforms.map(platformId => (
                  <PostPreview
                    key={platformId}
                    platform={platformId}
                    content={newPost.content}
                    mediaUrl={mediaPreview || undefined}
                    mediaType={mediaFile?.type.startsWith('video/') ? 'video' : 'image'}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edit Post Form */}
      {editingPost && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Post</h2>
          
          {/* Content */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Post Content</label>
              {charsRemaining !== null && (
                <span className={`text-sm ${charsRemaining < 0 ? 'text-red-600 font-semibold' : charsRemaining < 50 ? 'text-orange-600' : 'text-gray-500'}`}>
                  {charsRemaining < 0 ? `${Math.abs(charsRemaining)} characters over limit` : `${charsRemaining} characters remaining`}
                </span>
              )}
            </div>
            <textarea
              value={editingPost.content}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              placeholder="What's on your mind?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              rows={4}
            />
          </div>

          {/* Platform Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Platforms</label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    editingPost.platforms.includes(platform.id)
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                  }`}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={editingPost.scheduledDate}
                  onChange={(e) => setEditingPost({ ...editingPost, scheduledDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={editingPost.scheduledTime}
                  onChange={(e) => setEditingPost({ ...editingPost, scheduledTime: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Media Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Media (Optional)</label>
            {mediaPreview ? (
              <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                {(mediaFile?.type.startsWith('video/') || editingPost.mediaType === 'video') ? (
                  <video src={mediaPreview} className="w-full h-48 object-cover" controls />
                ) : (
                  <img src={mediaPreview} alt="Upload preview" className="w-full h-48 object-cover" />
                )}
                <button
                  onClick={removeMedia}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-300 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
                <div className="flex items-center justify-center gap-4 mb-2">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                  <Video className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">Images or videos up to 10MB</p>
              </label>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleUpdatePost}
              disabled={charsRemaining !== null && charsRemaining < 0}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Update Post
            </button>
            <button
              onClick={cancelEdit}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Scheduled Posts - List or Calendar View */}
      {viewMode === 'calendar' ? (
        <Calendar
          posts={scheduledPosts}
          onPostClick={(post) => handleEditClick(post)}
        />
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Scheduled Posts</h2>
          {scheduledPosts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No scheduled posts yet</p>
              <p className="text-sm text-gray-500">Create your first post to get started</p>
            </div>
          ) : (
            scheduledPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-gray-900 mb-3">{post.content}</p>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {post.platforms.map((platformId) => {
                      const platform = PLATFORMS.find(p => p.id === platformId);
                      return (
                        <span
                          key={platformId}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                        >
                          {platform?.name || platformId}
                        </span>
                      );
                    })}
                    {post.mediaType && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center gap-1">
                        {post.mediaType === 'image' ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                        {post.mediaType}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {new Date(post.scheduledDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.scheduledTime}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : post.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(post)}
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPostToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Post?"
        message="Are you sure you want to delete this scheduled post? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}