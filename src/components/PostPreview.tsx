import { MessageCircle, Heart, Share2, Repeat2, Bookmark } from 'lucide-react';

interface PostPreviewProps {
  platform: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

const platformConfigs = {
  tiktok: {
    name: 'TikTok',
    gradient: 'from-black to-gray-800',
    charLimit: 2200,
    bgColor: 'bg-black',
    textColor: 'text-white',
  },
  x: {
    name: 'X',
    gradient: 'from-black to-gray-900',
    charLimit: 280,
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
  },
  facebook: {
    name: 'Facebook',
    gradient: 'from-blue-600 to-blue-800',
    charLimit: 63206,
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
  },
  instagram: {
    name: 'Instagram',
    gradient: 'from-purple-600 via-pink-500 to-orange-400',
    charLimit: 2200,
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
  },
  youtube: {
    name: 'YouTube',
    gradient: 'from-red-600 to-red-700',
    charLimit: 5000,
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
  },
  'youtube-shorts': {
    name: 'YouTube Shorts',
    gradient: 'from-red-600 to-red-800',
    charLimit: 5000,
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
  },
};

export default function PostPreview({ platform, content, mediaUrl, mediaType }: PostPreviewProps) {
  const config = platformConfigs[platform as keyof typeof platformConfigs];
  
  if (!config) return null;

  const truncatedContent = content.length > config.charLimit 
    ? content.slice(0, config.charLimit) + '...' 
    : content;

  const renderPreview = () => {
    // X (Twitter) style
    if (platform === 'x') {
      return (
        <div className="bg-white rounded-xl p-4 border border-gray-200 max-w-xl">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-900">Your Brand</span>
                <span className="text-gray-500">@yourbrand · 2h</span>
              </div>
              <p className="text-gray-900 mb-3 whitespace-pre-wrap">{truncatedContent}</p>
              {mediaUrl && (
                <div className="rounded-xl overflow-hidden border border-gray-200 mb-3">
                  {mediaType === 'video' ? (
                    <video src={mediaUrl} className="w-full" controls />
                  ) : (
                    <img src={mediaUrl} alt="Post media" className="w-full" />
                  )}
                </div>
              )}
              <div className="flex items-center justify-between text-gray-500 max-w-md">
                <button className="flex items-center gap-2 hover:text-blue-500">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">24</span>
                </button>
                <button className="flex items-center gap-2 hover:text-green-500">
                  <Repeat2 className="w-5 h-5" />
                  <span className="text-sm">12</span>
                </button>
                <button className="flex items-center gap-2 hover:text-red-500">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">156</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-500">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Instagram style
    if (platform === 'instagram') {
      return (
        <div className="bg-white rounded-xl border border-gray-200 max-w-lg">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
            <span className="font-semibold">yourbrand</span>
          </div>
          {/* Media */}
          {mediaUrl && (
            <div className="bg-gray-100 aspect-square">
              {mediaType === 'video' ? (
                <video src={mediaUrl} className="w-full h-full object-cover" controls />
              ) : (
                <img src={mediaUrl} alt="Post" className="w-full h-full object-cover" />
              )}
            </div>
          )}
          {/* Actions */}
          <div className="p-4">
            <div className="flex items-center gap-4 mb-3">
              <Heart className="w-6 h-6" />
              <MessageCircle className="w-6 h-6" />
              <Share2 className="w-6 h-6" />
              <Bookmark className="w-6 h-6 ml-auto" />
            </div>
            <p className="font-semibold mb-1">1,234 likes</p>
            <p className="text-sm">
              <span className="font-semibold mr-2">yourbrand</span>
              {truncatedContent}
            </p>
          </div>
        </div>
      );
    }

    // Facebook style
    if (platform === 'facebook') {
      return (
        <div className="bg-white rounded-xl border border-gray-200 max-w-xl">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
              <div>
                <p className="font-semibold">Your Brand</p>
                <p className="text-xs text-gray-500">2 hours ago · 🌎</p>
              </div>
            </div>
            <p className="text-gray-900 mb-3 whitespace-pre-wrap">{truncatedContent}</p>
          </div>
          {mediaUrl && (
            <div className="bg-gray-100">
              {mediaType === 'video' ? (
                <video src={mediaUrl} className="w-full" controls />
              ) : (
                <img src={mediaUrl} alt="Post" className="w-full" />
              )}
            </div>
          )}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-around text-gray-600">
              <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded">
                <Heart className="w-5 h-5" />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded">
                <MessageCircle className="w-5 h-5" />
                <span>Comment</span>
              </button>
              <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    // TikTok style
    if (platform === 'tiktok') {
      return (
        <div className="bg-black rounded-xl overflow-hidden max-w-sm relative">
          <div className="aspect-[9/16] bg-gradient-to-b from-gray-800 to-black flex items-center justify-center">
            {mediaUrl && mediaType === 'video' ? (
              <video src={mediaUrl} className="w-full h-full object-cover" controls />
            ) : (
              <div className="text-white text-center p-6">
                <p className="mb-4">📱</p>
                <p className="text-sm opacity-75">Video preview</p>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
            <p className="font-semibold mb-1">@yourbrand</p>
            <p className="text-sm opacity-90">{truncatedContent}</p>
          </div>
        </div>
      );
    }

    // YouTube style
    if (platform === 'youtube' || platform === 'youtube-shorts') {
      return (
        <div className="bg-white rounded-xl overflow-hidden max-w-2xl border border-gray-200">
          <div className="aspect-video bg-black flex items-center justify-center">
            {mediaUrl && mediaType === 'video' ? (
              <video src={mediaUrl} className="w-full h-full object-cover" controls />
            ) : (
              <div className="text-white text-center">
                <p className="mb-4">🎥</p>
                <p className="text-sm opacity-75">Video preview</p>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {truncatedContent.split('\n')[0] || 'Video Title'}
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600" />
              <div className="text-sm">
                <p className="font-medium">Your Brand</p>
                <p className="text-gray-500">1.2K subscribers</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient}`} />
        <span className="text-sm font-medium text-gray-700">{config.name} Preview</span>
        <span className="text-xs text-gray-500 ml-auto">
          {content.length} / {config.charLimit} characters
        </span>
      </div>
      {renderPreview()}
    </div>
  );
}
