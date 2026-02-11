import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface ScheduledPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'published' | 'failed';
}

interface CalendarProps {
  posts: ScheduledPost[];
  onPostClick?: (post: ScheduledPost) => void;
}

export default function Calendar({ posts, onPostClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getPostsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return posts.filter(post => post.scheduledDate === dateStr);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square p-2 bg-gray-50" />
      );
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const postsOnDay = getPostsForDate(day);
      const isToday = 
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={day}
          className={`aspect-square p-2 border border-gray-200 hover:bg-gray-50 transition-colors ${
            isToday ? 'bg-purple-50 border-purple-300' : 'bg-white'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className={`text-sm font-semibold mb-1 ${
              isToday ? 'text-purple-600' : 'text-gray-900'
            }`}>
              {day}
            </div>
            <div className="flex-1 overflow-y-auto space-y-1">
              {postsOnDay.slice(0, 3).map(post => (
                <button
                  key={post.id}
                  onClick={() => onPostClick?.(post)}
                  className="w-full text-left px-1 py-0.5 rounded text-xs truncate hover:bg-purple-100 transition-colors"
                  style={{
                    backgroundColor: 
                      post.status === 'scheduled' ? '#dbeafe' :
                      post.status === 'published' ? '#dcfce7' :
                      '#fee2e2',
                    color:
                      post.status === 'scheduled' ? '#1e40af' :
                      post.status === 'published' ? '#166534' :
                      '#991b1b',
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 flex-shrink-0" />
                    <span>{post.scheduledTime}</span>
                  </div>
                </button>
              ))}
              {postsOnDay.length > 3 && (
                <div className="text-xs text-gray-500 px-1">
                  +{postsOnDay.length - 3} more
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-0 mb-2">
        {dayNames.map(day => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0 border-l border-t border-gray-200">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-200" />
          <span className="text-gray-600">Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-200" />
          <span className="text-gray-600">Published</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-200" />
          <span className="text-gray-600">Failed</span>
        </div>
      </div>
    </div>
  );
}
