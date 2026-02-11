import { Users, Heart, MessageCircle, TrendingUp, Facebook, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  {
    label: 'Total Followers',
    value: '45.2K',
    change: '+12.5%',
    icon: Users,
    color: 'purple',
  },
  {
    label: 'Total Engagement',
    value: '8.4K',
    change: '+8.2%',
    icon: Heart,
    color: 'pink',
  },
  {
    label: 'Comments',
    value: '1.2K',
    change: '+15.3%',
    icon: MessageCircle,
    color: 'blue',
  },
  {
    label: 'Avg. Growth',
    value: '+234',
    change: '+5.7%',
    icon: TrendingUp,
    color: 'green',
  },
];

const connectedAccounts = [
  { platform: 'Facebook', username: '@yourbrand', followers: '25.4K', status: 'connected', icon: Facebook },
  { platform: 'TikTok', username: '@yourbrand', followers: '12.8K', status: 'connected', icon: Instagram },
  { platform: 'Instagram', username: '@yourbrand', followers: '7.0K', status: 'connected', icon: Instagram },
];

const recentActivity = [
  { action: 'Posted on Facebook', time: '2 hours ago', status: 'success' },
  { action: 'Scheduled TikTok video', time: '4 hours ago', status: 'scheduled' },
  { action: 'Posted on Instagram', time: '1 day ago', status: 'success' },
  { action: 'Facebook post failed', time: '2 days ago', status: 'failed' },
];

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
  
  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your social media overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 mt-2">{stat.change} this week</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
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
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {connectedAccounts.map((account) => (
            <div key={account.platform} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <account.icon className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{account.platform}</h3>
                  <p className="text-sm text-gray-500">{account.username}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{account.followers} followers</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  Connected
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}