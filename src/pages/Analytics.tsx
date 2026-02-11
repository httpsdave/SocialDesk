import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Users, Eye, Heart, Share2 } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Generate data for different date ranges
const generateData = (days: number) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    data.push({
      date: dateStr,
      facebook: Math.floor(Math.random() * 200) + 200,
      instagram: Math.floor(Math.random() * 150) + 150,
      tiktok: Math.floor(Math.random() * 120) + 120,
      x: Math.floor(Math.random() * 100) + 100,
      youtube: Math.floor(Math.random() * 180) + 160,
      'youtube-shorts': Math.floor(Math.random() * 140) + 130,
    });
  }
  return data;
};

const generateEngagementData = (days: number) => {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return dayNames.map((day) => ({
    day,
    likes: Math.floor(Math.random() * 300) + 400,
    comments: Math.floor(Math.random() * 150) + 100,
    shares: Math.floor(Math.random() * 100) + 80,
  }));
};

const platformDistribution = [
  { name: 'Facebook', value: 22, color: '#3b5998' },
  { name: 'Instagram', value: 20, color: '#E4405F' },
  { name: 'TikTok', value: 18, color: '#000000' },
  { name: 'X', value: 15, color: '#1DA1F2' },
  { name: 'YouTube', value: 13, color: '#FF0000' },
  { name: 'YouTube Shorts', value: 12, color: '#FF4444' },
];

const topPosts = [
  {
    id: 1,
    content: 'New product launch announcement 🚀',
    platform: 'Facebook',
    likes: 1240,
    comments: 340,
    shares: 180,
    reach: '15.2K',
  },
  {
    id: 2,
    content: 'Behind the scenes video',
    platform: 'TikTok',
    likes: 2850,
    comments: 520,
    shares: 420,
    reach: '28.5K',
  },
  {
    id: 3,
    content: 'Customer testimonial story',
    platform: 'Instagram',
    likes: 980,
    comments: 180,
    shares: 95,
    reach: '12.1K',
  },
];

const getMetrics = (dateRange: string) => {
  const multiplier = dateRange === 'year' ? 12 : dateRange === '3months' ? 3 : dateRange === '30days' ? 1 : 0.25;
  return [
    { label: 'Total Reach', value: `${(156.2 * multiplier).toFixed(1)}K`, change: '+18.5%', trending: 'up', icon: Eye },
    { label: 'Engagement Rate', value: '8.4%', change: '+2.3%', trending: 'up', icon: Heart },
    { label: 'New Followers', value: `+${Math.floor(1234 * multiplier).toLocaleString()}`, change: '+12.5%', trending: 'up', icon: Users },
    { label: 'Share Rate', value: '3.2%', change: '-0.8%', trending: 'down', icon: Share2 },
  ];
};

export default function Analytics() {
  const [dateRange, setDateRange] = useState<string>('7days');

  const weeklyGrowthData = useMemo(() => {
    const days = dateRange === 'year' ? 365 : dateRange === '3months' ? 90 : dateRange === '30days' ? 30 : 7;
    return generateData(days);
  }, [dateRange]);

  const engagementData = useMemo(() => {
    return generateEngagementData(7);
  }, [dateRange]);

  const metrics = useMemo(() => getMetrics(dateRange), [dateRange]);
  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Track your performance and growth trends</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="3months">Last 3 months</option>
            <option value="year">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <metric.icon className="w-5 h-5 text-gray-400" />
              {metric.trending === 'up' ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p
              className={`text-sm ${
                metric.trending === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {metric.change} vs last week
            </p>
          </div>
        ))}
      </div>

      {/* Weekly Growth Trends */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Weekly Growth Trends</h2>
          <p className="text-sm text-gray-600">New followers across all platforms</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="facebook"
              stroke="#3b5998"
              strokeWidth={2}
              name="Facebook"
            />
            <Line
              type="monotone"
              dataKey="instagram"
              stroke="#E4405F"
              strokeWidth={2}
              name="Instagram"
            />
            <Line
              type="monotone"
              dataKey="tiktok"
              stroke="#000000"
              strokeWidth={2}
              name="TikTok"
            />
            <Line
              type="monotone"
              dataKey="x"
              stroke="#1DA1F2"
              strokeWidth={2}
              name="X"
            />
            <Line
              type="monotone"
              dataKey="youtube"
              stroke="#FF0000"
              strokeWidth={2}
              name="YouTube"
            />
            <Line
              type="monotone"
              dataKey="youtube-shorts"
              stroke="#FF4444"
              strokeWidth={2}
              name="YouTube Shorts"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Engagement & Platform Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Engagement Breakdown</h2>
            <p className="text-sm text-gray-600">Likes, comments, and shares this week</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Bar dataKey="likes" fill="#8b5cf6" name="Likes" />
              <Bar dataKey="comments" fill="#3b82f6" name="Comments" />
              <Bar dataKey="shares" fill="#10b981" name="Shares" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Platform Distribution</h2>
            <p className="text-sm text-gray-600">Follower breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={platformDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {platformDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {platformDistribution.map((platform) => (
              <div key={platform.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: platform.color }}
                  />
                  <span className="text-sm text-gray-700">{platform.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{platform.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Top Performing Posts</h2>
          <p className="text-sm text-gray-600">Your best content this week</p>
        </div>
        <div className="space-y-4">
          {topPosts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-gray-900 mb-2">{post.content}</p>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    {post.platform}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">{post.reach} reach</span>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-700">{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span className="text-sm text-gray-700">{post.comments}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{post.shares}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
