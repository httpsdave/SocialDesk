import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Check } from 'lucide-react';
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
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      description: 'Connect your Facebook page or profile',
      connected: true,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600',
      description: 'Connect your Instagram account',
      connected: false,
    },
    {
      id: 'twitter',
      name: 'Twitter (X)',
      icon: Twitter,
      color: 'bg-black',
      description: 'Connect your Twitter account',
      connected: false,
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: 'bg-black',
      description: 'Connect your TikTok account',
      connected: true,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700',
      description: 'Connect your LinkedIn profile or page',
      connected: false,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'bg-red-600',
      description: 'Connect your YouTube channel',
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
      setSelectedPlatform(null);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/app')}
          className="text-purple-600 hover:text-purple-700 mb-4 flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Social Account</h1>
        <p className="text-gray-600">Connect your social media accounts to manage them all in one place</p>
      </div>

      {/* Connected Accounts Summary */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {platforms.filter(p => p.connected).length} Connected
            </h2>
            <p className="text-purple-100">
              {platforms.length - platforms.filter(p => p.connected).length} more available
            </p>
          </div>
          <div className="text-5xl opacity-20">📱</div>
        </div>
      </div>

      {/* Platform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
          >
            {/* Platform Icon & Name */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${platform.color} text-white`}>
                <platform.icon className="w-8 h-8" />
              </div>
              {platform.connected && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
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
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Manage Account
                </button>
                <button className="w-full px-4 py-2 text-red-600 text-sm hover:bg-red-50 rounded-lg transition-colors">
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleConnectClick(platform)}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Connect {platform.name}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
        <p className="text-gray-700 mb-4">
          Having trouble connecting your accounts? Check out our guide or contact support.
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
            View Guide
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
        message={`You will be redirected to ${selectedPlatform?.name} to authorize SocialHub to access your account. Make sure you're logged into the correct account.`}
        confirmText="Continue"
        type="info"
      />
    </div>
  );
}
