import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Facebook, Instagram, Twitter, Youtube, Check, Loader2, Unplug } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ConnectedAccount {
  id: string;
  platform: string;
  platform_username: string | null;
  platform_display_name: string | null;
  platform_avatar_url: string | null;
  is_active: boolean;
  connected_at: string;
}

interface SocialPlatform {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  connectedAccount?: ConnectedAccount;
}

const PLATFORM_DEFS: Omit<SocialPlatform, 'connectedAccount'>[] = [
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
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    icon: Twitter,
    color: 'bg-black',
    description: 'Post updates and engage in conversations',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    description: 'Manage your Facebook page or profile',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600',
    description: 'Share photos and stories with followers',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: 'bg-red-600',
    description: 'Upload and manage your video content',
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
  },
];

export default function AddAccount() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Fetch connected accounts from Supabase
  useEffect(() => {
    if (!user) return;

    const fetchAccounts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('connected_accounts')
        .select('id, platform, platform_username, platform_display_name, platform_avatar_url, is_active, connected_at')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) {
        toast.error('Failed to load connected accounts');
        console.error(error);
      } else {
        setConnectedAccounts(data || []);
      }
      setIsLoading(false);
    };

    fetchAccounts();
  }, [user]);

  // Build platforms list with connection status
  const platforms: SocialPlatform[] = PLATFORM_DEFS.map((def) => ({
    ...def,
    connectedAccount: connectedAccounts.find((a) => a.platform === def.id),
  }));

  const connectedCount = platforms.filter((p) => p.connectedAccount).length;

  const handleConnectClick = (platform: SocialPlatform) => {
    setSelectedPlatform(platform);
    setShowConnectModal(true);
  };

  const handleDisconnectClick = (platform: SocialPlatform) => {
    setSelectedPlatform(platform);
    setShowDisconnectModal(true);
  };

  // Initiate OAuth flow — redirects user to the platform's authorization page
  // The actual OAuth callback handling requires a backend edge function to exchange
  // the authorization code for tokens and store them in connected_accounts
  const confirmConnect = async () => {
    if (!selectedPlatform || !user) return;
    setIsConnecting(true);

    // In production, this would redirect to:
    // - TikTok: https://www.tiktok.com/v2/auth/authorize/
    // - X: https://twitter.com/i/oauth2/authorize
    // - Facebook/Instagram: https://www.facebook.com/v19.0/dialog/oauth
    // - YouTube/Shorts: https://accounts.google.com/o/oauth2/v2/auth
    //
    // The redirect_uri would point to a Supabase Edge Function that:
    // 1. Exchanges the auth code for access/refresh tokens
    // 2. Fetches the user's platform profile info
    // 3. Inserts into connected_accounts table
    // 4. Redirects back to /app/add-account

    // For now, show that the infrastructure is ready
    toast.info(`OAuth flow for ${selectedPlatform.name} requires platform developer credentials. Configure your app keys in the Supabase Edge Function.`);
    setIsConnecting(false);
    setShowConnectModal(false);
    setSelectedPlatform(null);
  };

  const confirmDisconnect = async () => {
    if (!selectedPlatform?.connectedAccount) return;

    const { error } = await supabase
      .from('connected_accounts')
      .update({ is_active: false })
      .eq('id', selectedPlatform.connectedAccount.id);

    if (error) {
      toast.error('Failed to disconnect account');
      console.error(error);
    } else {
      setConnectedAccounts(connectedAccounts.filter(
        (a) => a.id !== selectedPlatform.connectedAccount!.id
      ));
      toast.success(`${selectedPlatform.name} disconnected`);
    }

    setShowDisconnectModal(false);
    setSelectedPlatform(null);
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
              {connectedCount} Connected
            </h2>
            <p className="text-gray-700">
              {platforms.length - connectedCount} more available
            </p>
          </div>
          <div className="text-5xl opacity-20">🔗</div>
        </div>
      </div>

      {/* Platform Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
              <div className="w-14 h-14 bg-gray-200 rounded-xl mb-4" />
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : (
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
              {platform.connectedAccount && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" />
                  Connected
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">{platform.name}</h3>
            {platform.connectedAccount?.platform_username && (
              <p className="text-sm text-purple-600 font-medium mb-1">@{platform.connectedAccount.platform_username}</p>
            )}
            <p className="text-sm text-gray-600 mb-4">{platform.description}</p>

            {/* Action Button */}
            {platform.connectedAccount ? (
              <div className="space-y-2">
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Manage Account
                </button>
                <button
                  onClick={() => handleDisconnectClick(platform)}
                  className="w-full px-4 py-2 text-red-600 text-sm hover:bg-red-50 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Unplug className="w-4 h-4" />
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
      )}

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
        confirmText={isConnecting ? 'Connecting...' : 'Continue'}
        type="info"
      />

      {/* Disconnect Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDisconnectModal}
        onClose={() => {
          setShowDisconnectModal(false);
          setSelectedPlatform(null);
        }}
        onConfirm={confirmDisconnect}
        title={`Disconnect ${selectedPlatform?.name}?`}
        message={`This will remove your ${selectedPlatform?.name} account from SocialDesk. Scheduled posts for this platform will no longer be published.`}
        confirmText="Disconnect"
        type="danger"
      />
    </div>
  );
}
