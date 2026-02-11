import { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Calendar, Award, BarChart3 } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';

export default function Profile() {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Digital marketing specialist passionate about social media growth and engagement. Helping brands tell their stories.',
    company: 'Creative Agency Inc.',
    website: 'www.creativeagency.com',
    joinDate: 'January 2024',
  });

  const stats = [
    { label: 'Posts Created', value: '248', icon: BarChart3 },
    { label: 'Total Reach', value: '1.2M', icon: Award },
    { label: 'Accounts Managed', value: '6', icon: Calendar },
  ];

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    // Save profile logic here
    setShowSaveModal(false);
  };

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
        <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600 relative">
          <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg text-white hover:bg-opacity-30 transition-colors">
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 border-4 border-white flex items-center justify-center text-white text-4xl font-bold">
              SJ
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Name & Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h2>
            <p className="text-gray-600">{profile.company}</p>
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
            <p className="text-gray-600">{profile.bio}</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Joined {profile.joinDate}</span>
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
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Location & Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <input
                type="url"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
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
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Save Changes
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
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
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
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
    </div>
  );
}
