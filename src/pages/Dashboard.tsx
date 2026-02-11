import { useState, useEffect } from 'react';
import { Users, Heart, MessageCircle, TrendingUp, Link } from 'lucide-react';
import { useNavigate } from 'react-router';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const colorClasses: Record<string, { bg: string; text: string }> = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
};

interface ConnectedAccount {
  id: string;
  platform: string;
  username: string;
  followers: string;
  status: 'connected' | 'disconnected';
  icon: string;
}

// Platform icons as SVG strings for dynamic rendering
const platformIcons: Record<string, React.FC<{ className?: string }>> = {
  tiktok: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  ),
  x: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  facebook: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  youtube: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  'youtube-shorts': ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  pinterest: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
    </svg>
  ),
};

const weeklyData = [
  { day: 'Mon', followers: 120 },
  { day: 'Tue', followers: 180 },
  { day: 'Wed', followers: 150 },
  { day: 'Thu', followers: 220 },
  { day: 'Fri', followers: 280 },
  { day: 'Sat', followers: 240 },
  { day: 'Sun', followers: 200 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile: authProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [recentPosts, setRecentPosts] = useState<{ action: string; time: string; status: string }[]>([]);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const loadDashboard = async () => {
      setIsLoading(true);

      // Fetch connected accounts
      const { data: accounts } = await supabase
        .from('connected_accounts')
        .select('id, platform, platform_username, platform_display_name, followers_count, is_active')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (accounts) {
        const platformNames: Record<string, string> = {
          tiktok: 'TikTok', x: 'X', facebook: 'Facebook',
          instagram: 'Instagram', youtube: 'YouTube', 'youtube-shorts': 'YouTube Shorts',
          pinterest: 'Pinterest',
        };
        setConnectedAccounts(accounts.map(a => ({
          id: a.platform,
          platform: platformNames[a.platform] || a.platform,
          username: a.platform_username ? `@${a.platform_username}` : 'Connected',
          followers: formatCount(a.followers_count || 0),
          status: 'connected' as const,
          icon: a.platform,
        })));
      }

      // Fetch recent posts for activity feed
      const { data: posts, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (posts) {
        setRecentPosts(posts.map(p => {
          const platformNames = p.platforms.map((pl: string) => {
            const names: Record<string, string> = {
              tiktok: 'TikTok', x: 'X', facebook: 'Facebook',
              instagram: 'Instagram', youtube: 'YouTube', 'youtube-shorts': 'YouTube Shorts',
              pinterest: 'Pinterest',
            };
            return names[pl] || pl;
          }).join(', ');

          const actionPrefix = p.status === 'published' ? 'Posted on'
            : p.status === 'scheduled' ? 'Scheduled for'
            : p.status === 'failed' ? 'Failed on'
            : 'Draft for';

          return {
            action: `${actionPrefix} ${platformNames}`,
            time: timeAgo(new Date(p.created_at)),
            status: p.status === 'published' ? 'success' : p.status === 'scheduled' ? 'scheduled' : 'failed',
          };
        }));
      }

      setPostCount(count || 0);
      setIsLoading(false);
    };

    loadDashboard();
  }, [user]);

  const formatCount = (n: number): string => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  const timeAgo = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Derive stats from real data
  const totalFollowers = connectedAccounts.reduce((sum, a) => {
    const num = parseFloat(a.followers.replace(/[KMk]/g, '')) * (a.followers.includes('K') || a.followers.includes('k') ? 1000 : a.followers.includes('M') ? 1000000 : 1);
    return sum + num;
  }, 0);

  const dynamicStats = [
    {
      label: 'Connected Accounts',
      value: connectedAccounts.length.toString(),
      change: connectedAccounts.length > 0 ? `${connectedAccounts.length} platforms` : 'None yet',
      icon: Users,
      color: 'purple',
    },
    {
      label: 'Total Followers',
      value: formatCount(totalFollowers),
      change: 'Across all platforms',
      icon: Heart,
      color: 'pink',
    },
    {
      label: 'Total Posts',
      value: postCount.toString(),
      change: 'All time',
      icon: MessageCircle,
      color: 'blue',
    },
    {
      label: 'Scheduled',
      value: recentPosts.filter(p => p.status === 'scheduled').length.toString(),
      change: 'Upcoming posts',
      icon: TrendingUp,
      color: 'green',
    },
  ];
  
  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back{authProfile?.full_name ? `, ${authProfile.full_name}` : ''}! Here's your social media overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))
        ) : (
          dynamicStats.map((stat) => {
            const colors = colorClasses[stat.color] || { bg: 'bg-gray-100', text: 'text-gray-600' };
            return (
              <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-2">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${colors.bg}`}>
                    <stat.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Weekly Growth</h2>
            <p className="text-sm text-gray-600">New followers this week</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="followers" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          {recentPosts.length === 0 ? (
            <p className="text-gray-500 text-sm py-4">No recent activity yet. Create your first post!</p>
          ) : (
            <div className="space-y-4">
              {recentPosts.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success'
                        ? 'bg-green-500'
                        : activity.status === 'scheduled'
                        ? 'bg-blue-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Connected Accounts</h2>
          <button
            onClick={() => navigate('/app/add-account')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            + Add Account
          </button>
        </div>
        {connectedAccounts.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Link className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Connected Accounts</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Connect your social media platforms to start managing all your content in one place.
            </p>
            <button
              onClick={() => navigate('/app/add-account')}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
            >
              <Link className="w-4 h-4" />
              Connect Your First Account
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectedAccounts.map((account) => {
              const IconComponent = platformIcons[account.icon];
              return (
                <button
                  key={account.id}
                  onClick={() => navigate(`/app/platform/${account.id}`)}
                  className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {IconComponent && <IconComponent className="w-5 h-5 text-gray-700" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{account.platform}</h3>
                      <p className="text-sm text-gray-500">{account.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{account.followers} followers</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    account.status === 'connected'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {account.status === 'connected' ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </button>
            );
          })}
          </div>
        )}
      </div>
    </div>
  );
}