import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Image as ImageIcon, Video, Plus, Trash2 } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';

interface ScheduledPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'published' | 'failed';
  mediaType?: 'image' | 'video';
}

const mockScheduledPosts: ScheduledPost[] = [
  {
    id: '1',
    content: 'Check out our new product launch! 🚀',
    platforms: ['Facebook', 'Instagram'],
    scheduledDate: '2026-02-12',
    scheduledTime: '14:00',
    status: 'scheduled',
    mediaType: 'image',
  },
  {
    id: '2',
    content: 'Behind the scenes of our team working hard!',
    platforms: ['TikTok'],
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
  const [newPost, setNewPost] = useState({
    content: '',
    platforms: [] as string[],
    scheduledDate: '',
    scheduledTime: '',
  });

  const platforms = ['Facebook', 'Instagram', 'TikTok', 'Twitter'];

  const handlePlatformToggle = (platform: string) => {
    setNewPost((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
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
      };
      setScheduledPosts([post, ...scheduledPosts]);
      setNewPost({ content: '', platforms: [], scheduledDate: '', scheduledTime: '' });
      setShowNewPostForm(false);
    }
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
        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Post
        </button>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Post</h2>
          
          {/* Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Post Content</label>
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
              {platforms.map((platform) => (
                <button
                  key={platform}
                  onClick={() => handlePlatformToggle(platform)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    newPost.platforms.includes(platform)
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                  }`}
                >
                  {platform}
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-300 transition-colors cursor-pointer">
              <div className="flex items-center justify-center gap-4 mb-2">
                <ImageIcon className="w-8 h-8 text-gray-400" />
                <Video className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">Images or videos up to 10MB</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCreatePost}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Schedule Post
            </button>
            <button
              onClick={() => setShowNewPostForm(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Scheduled Posts List */}
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
                    {post.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {platform}
                      </span>
                    ))}
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
                <button
                  onClick={() => handleDeleteClick(post.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

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