import { Outlet, NavLink, useNavigate } from 'react-router';
import { LayoutDashboard, Calendar, BarChart3, Settings, LogOut, Menu, X, User, ChevronUp, Link } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { useAuth } from '../contexts/AuthContext';

export default function MainLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { path: '/app/schedule', label: 'Schedule Posts', icon: Calendar },
    { path: '/app/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/app/add-account', label: 'Connect Platforms', icon: Link },
  ];

  // Handle click outside sidebar to collapse when not pinned
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarOpen &&
        !sidebarPinned &&
        window.innerWidth >= 1024 // Only on desktop
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, sidebarPinned]);

  // Handle click outside user menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        showUserMenu
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/');
  };

  const toggleSidebarPin = () => {
    setSidebarPinned(!sidebarPinned);
    setSidebarOpen(!sidebarPinned); // Open when pinning, close when unpinning
  };

  const handleSidebarClick = () => {
    if (!sidebarPinned && window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  };

  const handleMobileMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-xl">📱</span>
          <span className="font-bold text-gray-900">SocialDesk</span>
        </div>
        <button
          onClick={handleMobileMenuToggle}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        onClick={handleSidebarClick}
        className={`
          fixed top-0 left-0 z-30 h-full bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200
          transform transition-all duration-300 ease-in-out lg:cursor-pointer
          ${sidebarOpen ? 'w-64' : 'w-20 lg:w-20'}
          ${!sidebarOpen && 'lg:w-20 max-lg:-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-2xl flex-shrink-0">📱</span>
              <span className={`font-bold text-xl text-gray-900 whitespace-nowrap transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>SocialDesk</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSidebarPin();
              }}
              className={`p-1.5 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0 ${sidebarPinned ? 'bg-purple-100' : ''}`}
            >
              <Menu className={`w-5 h-5 ${sidebarPinned ? 'text-purple-600' : 'text-gray-700'}`} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={(e) => {
                  if (!sidebarPinned && window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center transition-colors ${
                    sidebarOpen 
                      ? 'gap-3 px-4 py-3 rounded-lg' 
                      : 'w-12 h-12 rounded-xl justify-center mx-auto'
                  } ${
                    isActive
                      ? 'text-gray-900 shadow-md'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#A3CEF1' : 'transparent'
                })}
                title={!sidebarOpen ? item.label : ''}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={`font-medium whitespace-nowrap transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Menu - Dropup */}
          <div className="p-4 border-t border-gray-200 relative" ref={userMenuRef}>
            {/* Dropup Menu */}
            {showUserMenu && (
              <div className={`absolute bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 ${
                sidebarOpen 
                  ? 'bottom-full left-4 right-4 mb-2' 
                  : 'bottom-4 left-full ml-2 w-48'
              }`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/app/profile');
                    setShowUserMenu(false);
                    if (!sidebarPinned && window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 w-full text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Profile</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/app/settings');
                    setShowUserMenu(false);
                    if (!sidebarPinned && window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 w-full text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Settings className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Settings</span>
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUserMenu(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 w-full text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}

            {/* User Menu Trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowUserMenu(!showUserMenu);
              }}
              className={`flex items-center gap-3 w-full transition-colors ${
                sidebarOpen 
                  ? 'px-4 py-3 rounded-lg hover:bg-gray-200' 
                  : 'justify-center'
              }`}
              title={!sidebarOpen ? 'Account' : ''}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <User className="w-5 h-5" />
              </div>
              {sidebarOpen && (
                <>
                  <span className="font-medium text-gray-700 flex-1 text-left">Account</span>
                  <ChevronUp className={`w-4 h-4 flex-shrink-0 text-gray-700 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : 'rotate-0'}`} />
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={`min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title="Logout"
        message="Are you sure you want to logout? You will need to sign in again to access your account."
        confirmText="Logout"
        type="warning"
      />
    </div>
  );
}