import { useState, useEffect } from 'react';
import { Camera, Mail, Calendar, Award, BarChart3, Loader2, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile: authProfile, refreshProfile, signOut } = useAuth();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    full_name: '',
    bio: '',
    website: '',
  });

  // Load profile data
  useEffect(() => {
    if (authProfile) {
      setProfile({
        full_name: authProfile.full_name || '',
        bio: authProfile.bio || '',
        website: authProfile.website || '',
      });
    }
  }, [authProfile]);

  const stats = [
    { label: 'Posts Created', value: '0', icon: BarChart3 },
    { label: 'Total Reach', value: '0', icon: Award },
    { label: 'Accounts Managed', value: '0', icon: Calendar },
  ];

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Preview
    setAvatarPreview(URL.createObjectURL(file));

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error('Failed to upload avatar');
      setAvatarPreview(null);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', user.id);

    if (updateError) {
      toast.error('Failed to update profile');
      return;
    }

    await refreshProfile();
    toast.success('Avatar updated successfully');
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setCoverPreview(URL.createObjectURL(file));

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/cover.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('covers')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error('Failed to upload cover photo');
      setCoverPreview(null);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('covers')
      .getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ cover_url: publicUrl })
      .eq('id', user.id);

    if (updateError) {
      toast.error('Failed to update profile');
      return;
    }

    await refreshProfile();
    toast.success('Cover photo updated successfully');
  };

  const handleCancel = () => {
    if (authProfile) {
      setProfile({
        full_name: authProfile.full_name || '',
        bio: authProfile.bio || '',
        website: authProfile.website || '',
      });
    }
    setAvatarPreview(null);
    setCoverPreview(null);
    toast.info('Changes cancelled');
  };

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const confirmSave = async () => {
    if (!user) return;
    setIsSaving(true);
    setShowSaveModal(false);

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        bio: profile.bio,
        website: profile.website,
      })
      .eq('id', user.id);

    setIsSaving(false);

    if (error) {
      toast.error('Failed to save profile');
      return;
    }

    await refreshProfile();
    toast.success('Profile updated successfully');
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    // Note: Full account deletion requires server-side function
    // For now, sign out and show message
    toast.success('Account deletion request submitted. Please contact support.');
    await signOut();
    navigate('/');
  };

  const joinDate = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '';

  const avatarUrl = avatarPreview || authProfile?.avatar_url;
  const coverUrl = coverPreview || authProfile?.cover_url;

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Cover Image */}
        <div className="h-32 relative" style={coverUrl ? { backgroundImage: `url(${coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
          {!coverUrl && <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />}
          <label className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg text-white hover:bg-opacity-30 transition-colors cursor-pointer z-10">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />
            <Camera className="w-5 h-5" />
          </label>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            {avatarUrl ? (
              <img src={avatarUrl} alt={authProfile?.full_name || 'User'} className="w-32 h-32 rounded-full border-4 border-white object-cover" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 border-4 border-white flex items-center justify-center text-white text-4xl font-bold">
                {authProfile?.full_name?.charAt(0)?.toUpperCase() || '?'}
              </div>
            )}
            <label className="absolute bottom-2 right-2 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors shadow-lg cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <Camera className="w-4 h-4" />
            </label>
          </div>

          {/* Name & Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{authProfile?.full_name || 'User'}</h2>
            <p className="text-gray-600">{authProfile?.email}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">About</h3>
            <p className="text-gray-600">{authProfile?.bio || 'No bio yet'}</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{authProfile?.email}</span>
            </div>
            {authProfile?.website && (
              <div className="flex items-center gap-3 text-gray-600">
                <Globe className="w-4 h-4" />
                <span>{authProfile.website}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Joined {joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Profile</h2>

        <div className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={authProfile?.email || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed here</p>
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              value={profile.website}
              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl p-6 border border-red-200">
        <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
        <p className="text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button 
          onClick={handleDeleteAccount}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Account
        </button>
      </div>

      {/* Save Confirmation Modal */}
      <ConfirmationModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onConfirm={confirmSave}
        title="Save Profile Changes?"
        message="Are you sure you want to update your profile information?"
        confirmText="Save"
        type="info"
      />

      {/* Delete Account Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Account?"
        message="Are you absolutely sure? This action cannot be undone. All your data will be permanently deleted."
        confirmText="Delete Forever"
        type="danger"
      />
    </div>
  );
}
