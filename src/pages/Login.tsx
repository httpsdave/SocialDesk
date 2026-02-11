import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Lock, Eye, EyeOff, TrendingUp, BarChart3, Zap, ArrowRight, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, isAuthenticated } = useAuth();
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    loginEmail?: string;
    loginPassword?: string;
    signUpEmail?: string;
    signUpPassword?: string;
    confirmPassword?: string;
  }>({});

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/app', { replace: true });
    return null;
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    const { error } = await signIn(email, password);
    
    if (error) {
      setIsSubmitting(false);
      if (error.toLowerCase().includes('invalid')) {
        toast.error('Invalid email or password');
        setErrors({ loginPassword: 'Invalid email or password' });
      } else if (error.toLowerCase().includes('email not confirmed')) {
        toast.error('Please verify your email address first');
      } else {
        toast.error(error);
      }
      return;
    }
    
    toast.success('Logged in successfully!');
    navigate('/app');
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: typeof errors = {};
    
    if (!validateEmail(signUpEmail)) {
      newErrors.signUpEmail = 'Please enter a valid email address';
    }
    if (signUpPassword.length < 8) {
      newErrors.signUpPassword = 'Password must be at least 8 characters long';
    }
    if (signUpPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    const { error } = await signUp(signUpEmail, signUpPassword, signUpName);
    
    if (error) {
      setIsSubmitting(false);
      if (error.toLowerCase().includes('already registered')) {
        toast.error('An account with this email already exists');
        setErrors({ signUpEmail: 'This email is already registered' });
      } else {
        toast.error(error);
      }
      return;
    }
    
    setIsSubmitting(false);
    toast.success('Account created! Check your email to verify your account.');
  };

  const handleGoogleLogin = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error('Google sign-in failed: ' + error);
    }
  };

  const toggleCard = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative overflow-hidden">
      {/* Corner Gradients */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-200/60 via-purple-100/30 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-orange-200/60 via-pink-100/30 to-transparent pointer-events-none"></div>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px'
        }}></div>
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 relative z-10">
        <div className="max-w-lg">
          <h1 className="text-8xl font-bold mb-4 leading-none text-purple-600">
            SocialDesk
          </h1>
          
          <h2 className="text-2xl font-medium mb-2 leading-tight bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
            Simplicity meets productivity
          </h2>
          <p className="text-gray-500 mb-12 text-sm">
            Your social media, organized beautifully
          </p>

          {/* Feature Description */}
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-stone-800 leading-tight tracking-tight">
              Manage everything seamlessly when your posts, analytics, and schedule are unified in one place
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed font-normal">
              Create, schedule, and track performance all in one platform that simplifies your workflow and gives you complete visibility over your social presence.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10">
        <div className="relative w-full max-w-md min-h-[700px]">
          {/* Sign In Card */}
          <div 
            className={`absolute inset-0 w-full bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-10 border border-gray-100 ring-1 ring-gray-900/5 transition-all duration-700 ${
              isSignUp ? 'translate-x-8 translate-y-8 scale-95 opacity-30 z-0' : 'translate-x-0 translate-y-0 scale-100 opacity-100 z-10'
            }`}
          >
            {/* Logo */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
              <p className="text-gray-600">Sign in to manage all of your social media accounts!</p>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white outline-none transition-all peer"
                required
              />
              <label 
                htmlFor="email" 
                className="absolute left-11 top-3.5 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
              >
                Email
              </label>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showLoginPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                className="block w-full pl-11 pr-11 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white outline-none transition-all peer"
                required
              />
              <label 
                htmlFor="password" 
                className="absolute left-11 top-3.5 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
              >
                {showLoginPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Forgot?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3.5 rounded-2xl font-semibold transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 flex items-center justify-center gap-2 group mt-6"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white text-gray-500 uppercase tracking-wider">Or</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account?{' '}
            <button 
              onClick={toggleCard}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Sign up for free
            </button>
          </p>

          {/* Account indicator */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-2 h-2 rounded-full bg-purple-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Sign Up Card */}
        <div 
          className={`absolute inset-0 w-full bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-10 border border-gray-100 ring-1 ring-gray-900/5 transition-all duration-700 ${
            isSignUp ? 'translate-x-0 translate-y-0 scale-100 opacity-100 z-10' : 'translate-x-8 translate-y-8 scale-95 opacity-30 z-0'
          }`}
        >
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join us and start managing your social presence!</p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="signup-name"
                type="text"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                placeholder=" "
                className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white outline-none transition-all peer"
                required
              />
              <label 
                htmlFor="signup-name" 
                className="absolute left-11 top-3.5 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
              >
                Full Name
              </label>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="signup-email"
                type="email"
                value={signUpEmail}
                onChange={(e) => {
                  setSignUpEmail(e.target.value);
                  if (errors.signUpEmail) {
                    setErrors(prev => ({ ...prev, signUpEmail: undefined }));
                  }
                }}
                placeholder=" "
                className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50 border rounded-xl focus:ring-2 focus:border-transparent focus:bg-white outline-none transition-all peer ${
                  errors.signUpEmail ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-purple-500'
                }`}
                required
              />
              <label 
                htmlFor="signup-email" 
                className={`absolute left-11 top-3.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 ${
                  errors.signUpEmail ? 'text-red-500 peer-focus:text-red-600 peer-[:not(:placeholder-shown)]:text-red-600' : 'text-gray-500 peer-focus:text-purple-600 peer-[:not(:placeholder-shown)]:text-gray-600'
                }`}
              >
                Email
              </label>
              {errors.signUpEmail && (
                <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.signUpEmail}</span>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="signup-password"
                type={showSignUpPassword ? 'text' : 'password'}
                value={signUpPassword}
                onChange={(e) => {
                  setSignUpPassword(e.target.value);
                  if (errors.signUpPassword) {
                    setErrors(prev => ({ ...prev, signUpPassword: undefined }));
                  }
                }}
                placeholder=" "
                className={`block w-full pl-11 pr-11 py-3.5 bg-gray-50 border rounded-xl focus:ring-2 focus:border-transparent focus:bg-white outline-none transition-all peer ${
                  errors.signUpPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-purple-500'
                }`}
                required
                minLength={8}
              />
              <label 
                htmlFor="signup-password" 
                className={`absolute left-11 top-3.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 ${
                  errors.signUpPassword ? 'text-red-500 peer-focus:text-red-600 peer-[:not(:placeholder-shown)]:text-red-600' : 'text-gray-500 peer-focus:text-purple-600 peer-[:not(:placeholder-shown)]:text-gray-600'
                }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
              >
                {showSignUpPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
              {errors.signUpPassword && (
                <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.signUpPassword}</span>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                  }
                }}
                placeholder=" "
                className={`block w-full pl-11 pr-11 py-3.5 bg-gray-50 border rounded-xl focus:ring-2 focus:border-transparent focus:bg-white outline-none transition-all peer ${
                  errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-purple-500'
                }`}
                required
              />
              <label 
                htmlFor="confirm-password" 
                className={`absolute left-11 top-3.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 ${
                  errors.confirmPassword ? 'text-red-500 peer-focus:text-red-600 peer-[:not(:placeholder-shown)]:text-red-600' : 'text-gray-500 peer-focus:text-purple-600 peer-[:not(:placeholder-shown)]:text-gray-600'
                }`}
              >
                Confirm Password
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
              {errors.confirmPassword && (
                <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3.5 rounded-2xl font-semibold transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 flex items-center justify-center gap-2 group mt-4"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white text-gray-500 uppercase tracking-wider">Or</span>
            </div>
          </div>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <button 
              onClick={toggleCard}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Sign in
            </button>
          </p>

          {/* Account indicator */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-purple-600"></div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
