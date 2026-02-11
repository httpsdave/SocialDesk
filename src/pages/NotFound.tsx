import { Link } from 'react-router';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-purple-100 mb-6">
            <Search className="w-16 h-16 text-purple-600" />
          </div>
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500 mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/app"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40"
          >
            <Home className="w-5 h-5" />
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl font-semibold transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Helpful links:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/app" className="text-purple-600 hover:text-purple-700 hover:underline">
              Dashboard
            </Link>
            <Link to="/app/schedule" className="text-purple-600 hover:text-purple-700 hover:underline">
              Schedule Posts
            </Link>
            <Link to="/app/analytics" className="text-purple-600 hover:text-purple-700 hover:underline">
              Analytics
            </Link>
            <Link to="/app/add-account" className="text-purple-600 hover:text-purple-700 hover:underline">
              Connect Platforms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
