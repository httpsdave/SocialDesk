import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, TrendingUp, Users, Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

// Platform icons and configs
const platformConfigs: Record<string, { 
  name: string; 
  icon: any; 
  color: string; 
  gradient: string;
  handle: string;
}> = {
  tiktok: {
    name: 'TikTok',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    color: 'bg-black',
    gradient: 'from-black to-gray-800',
    handle: '@yourhandle'
  },
  x: {
    name: 'X',
    icon: Twitter,
    color: 'bg-black',
    gradient: 'from-black to-gray-800',
    handle: '@yourhandle'
  },
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    gradient: 'from-blue-600 to-blue-800',
    handle: '@yourpage'
  },
  instagram: {
    name: 'Instagram',
    icon: Instagram,
    color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600',
    gradient: 'from-purple-600 via-pink-600 to-orange-600',
    handle: '@yourhandle'
  },
  youtube: {
    name: 'YouTube',
    icon: Youtube,
    color: 'bg-red-600',
    gradient: 'from-red-600 to-red-800',
    handle: 'Your Channel'
  },
  'youtube-shorts': {
    name: 'YouTube Shorts',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"/>
      </svg>
    ),
    color: 'bg-red-600',
    gradient: 'from-red-600 to-red-800',
    handle: 'Your Channel'
  }
};

export default function PlatformDetail() {
  const { platformId } = useParams<{ platformId: string }>();
  const navigate = useNavigate();

  const platform = platformConfigs[platformId || ''];

  if (!platform) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Platform Not Found</h1>
        <button
          onClick={() => navigate('/app')}
          className="text-purple-600 hover:text-purple-700"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  // Mock data specific to each platform
  const metrics = [
    { label: 'Followers', value: '124.5K', change: '+12.3%', icon: Users },
    { label: 'Engagement Rate', value: '8.4%', change: '+2.1%', icon: Heart },
    { label: 'Avg. Views', value: '45.2K', change: '+15.7%', icon: Eye },
    { label: 'Total Posts', value: '248', change: '+8', icon: TrendingUp },
  ];

  const growthData = [
    { date: 'Jan', followers: 98000, engagement: 7200 },
    { date: 'Feb', followers: 102000, engagement: 7800 },
    { date: 'Mar', followers: 108000, engagement: 8400 },
    { date: 'Apr', followers: 112000, engagement: 9100 },
    { date: 'May', followers: 118000, engagement: 9600 },
    { date: 'Jun', followers: 124500, engagement: 10500 },
  ];

  const contentPerformance = [
    { type: 'Video', count: 120, engagement: 45 },
    { type: 'Image', count: 85, engagement: 38 },
    { type: 'Carousel', count: 30, engagement: 42 },
    { type: 'Story', count: 13, engagement: 28 },
  ];

  const audienceDemographics = [
    { name: '18-24', value: 35, color: '#A3CEF1' },
    { name: '25-34', value: 42, color: '#7BB8E8' },
    { name: '35-44', value: 15, color: '#5AA3DD' },
    { name: '45+', value: 8, color: '#3B8FD2' },
  ];

  const topPosts = [
    {
      id: 1,
      content: 'Just launched our new product line! Check it out 🚀',
      type: 'Video',
      date: '2 days ago',
      reach: '89.5K',
      likes: '12.4K',
      comments: '856',
      shares: '2.3K'
    },
    {
      id: 2,
      content: 'Behind the scenes of our latest photoshoot 📸',
      type: 'Carousel',
      date: '5 days ago',
      reach: '67.2K',
      likes: '9.8K',
      comments: '432',
      shares: '1.1K'
    },
    {
      id: 3,
      content: 'Tips and tricks for maximizing your productivity ⚡',
      type: 'Image',
      date: '1 week ago',
      reach: '54.3K',
      likes: '7.2K',
      comments: '289',
      shares: '890'
    },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/app')}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        
        <div className={`bg-gradient-to-r ${platform.gradient} rounded-xl p-6 text-white shadow-lg`}>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
              <platform.icon className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{platform.name}</h1>
              <p className="text-white/80 text-lg">{platform.handle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{metric.label}</span>
              <metric.icon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Follower Growth */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Follower Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="followers" stroke="#A3CEF1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Trend */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Engagement Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="engagement" stroke="#7BB8E8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content Performance & Audience */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Performance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Content Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contentPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="engagement" fill="#A3CEF1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Audience Demographics */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Audience Age Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={audienceDemographics}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {audienceDemographics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Top Performing Posts</h2>
        <div className="space-y-4">
          {topPosts.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-gray-900 mb-2">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{post.type}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 pt-3 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Reach</div>
                  <div className="text-sm font-semibold text-gray-900">{post.reach}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Likes</div>
                  <div className="text-sm font-semibold text-gray-900">{post.likes}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Comments</div>
                  <div className="text-sm font-semibold text-gray-900">{post.comments}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Shares</div>
                  <div className="text-sm font-semibold text-gray-900">{post.shares}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
