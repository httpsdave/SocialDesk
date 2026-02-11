import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Check } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmationModal from '../components/ConfirmationModal';

interface SocialPlatform {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  connected: boolean;
}

export default function AddAccount() {
  const navigate = useNavigate();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);

  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: 'bg-black',
      description: 'Share short-form videos with your audience',
      connected: false,
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-black',
      description: 'Post updates and engage in conversations',
      connected: false,
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      description: 'Manage your Facebook page or profile',
      connected: false,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600',
      description: 'Share photos and stories with followers',
      connected: false,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'bg-red-600',
      description: 'Upload and manage your video content',
      connected: false,
    },
    {
      id: 'youtube-shorts',
      name: 'YouTube Shorts',
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"/>
        </svg>
      ),
      color: 'bg-red-600',
      description: 'Create bite-sized vertical videos',
      connected: false,
    },
  ]);

  const handleConnectClick = (platform: SocialPlatform) => {
    setSelectedPlatform(platform);
    setShowConnectModal(true);
  };

  const confirmConnect = () => {
    if (selectedPlatform) {
      // Simulate connection
      setPlatforms(platforms.map(p => 
        p.id === selectedPlatform.id ? { ...p, connected: true } : p
      ));
      setShowConnectModal(false);
      toast.success(`${selectedPlatform.name} connected successfully`);
      setSelectedPlatform(null);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/app')}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2 transition-colors"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Platforms</h1>
        <p className="text-gray-600">Manage your social media presence across all platforms</p>
      </div>

      {/* Connected Accounts Summary */}
      <div className="rounded-xl p-6 text-white" style={{ backgroundColor: '#A3CEF1' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1 text-gray-900">
              {platforms.filter(p => p.connected).length} Connected
            </h2>
            <p className="text-gray-700">
              {platforms.length - platforms.filter(p => p.connected).length} more available
            </p>
          </div>
          <div className="text-5xl opacity-20">🔗</div>
        </div>
      </div>

      {/* Platform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:border-gray-300"
          >
            {/* Platform Icon & Name */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${platform.color} text-white shadow-md`}>
                <platform.icon className="w-8 h-8" />
              </div>
              {platform.connected && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" />
                  Connected
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{platform.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{platform.description}</p>

            {/* Action Button */}
            {platform.connected ? (
              <div className="space-y-2">
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Manage Account
                </button>
                <button className="w-full px-4 py-2 text-red-600 text-sm hover:bg-red-50 rounded-lg transition-colors font-medium">
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleConnectClick(platform)}
                className="w-full px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all font-medium shadow-sm hover:shadow-md"
              >
                Connect {platform.name}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
        <p className="text-gray-700 mb-4">
          Having trouble connecting your accounts? Check out our guide or contact support.
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            View Guide
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all font-medium shadow-sm hover:shadow-md">
            Contact Support
          </button>
        </div>
      </div>

      {/* Connect Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConnectModal}
        onClose={() => {
          setShowConnectModal(false);
          setSelectedPlatform(null);
        }}
        onConfirm={confirmConnect}
        title={`Connect ${selectedPlatform?.name}?`}
        message={`You will be redirected to ${selectedPlatform?.name} to authorize SocialDesk to access your account. Make sure you're logged into the correct account.`}
        confirmText="Continue"
        type="info"
      />
    </div>
  );
}
