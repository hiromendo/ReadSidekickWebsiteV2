import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { trackEvent } from '../utils/analytics';
import type { AuthError } from 'firebase/auth';

// Map Firebase error codes to user-friendly messages
const getAuthErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password must be at least 8 characters.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    default:
      return 'An error occurred. Please try again.';
  }
};

export function Login() {
  const { user, isLoading, isAuthorized, signInWithGoogle, signUpWithEmail, signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isLoading && user && isAuthorized) {
      navigate('/englishtoasltranslator', { replace: true });
    }
  }, [user, isLoading, isAuthorized, navigate]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsSigningIn(true);
    trackEvent('sign_in_attempt', { method: 'google' });
    try {
      await signInWithGoogle();
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      console.error(err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    if (authMode === 'signup' && password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setIsSigningIn(true);
    trackEvent(authMode === 'signup' ? 'sign_up_attempt' : 'sign_in_attempt', { method: 'email' });

    try {
      if (authMode === 'signup') {
        await signUpWithEmail(email, password, displayName || undefined);
        trackEvent('sign_up_success', { method: 'email' });
      } else {
        await signInWithEmail(email, password);
        trackEvent('sign_in_success', { method: 'email' });
      }
    } catch (err) {
      const authError = err as AuthError;
      setError(getAuthErrorMessage(authError));
      trackEvent(authMode === 'signup' ? 'sign_up_error' : 'sign_in_error', {
        method: 'email',
        error_code: authError.code || 'unknown'
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    setError(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-coral-500 border-t-transparent"></div>
          <p className="mt-4 font-mono text-ink-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-4">
      <div className="bg-ivory-50 rounded-xl p-8 shadow-md max-w-md w-full text-center animate-slide-up">
        <h1 className="text-3xl font-serif font-bold text-ink-800 mb-2">
          ASL Translator
        </h1>
        <p className="font-mono text-sm text-ink-700/70 mb-8">
          {authMode === 'signin'
            ? 'Sign in to access the English to ASL translation tool'
            : 'Create your account'}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-ochre-300 border-2 border-ochre-400 rounded-lg text-ink-800 font-mono text-sm text-left">
            {error}
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          {authMode === 'signup' && (
            <div>
              <input
                type="text"
                placeholder="Display Name (optional)"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={isSigningIn}
                className="w-full px-4 py-3 rounded-lg border-2 border-ivory-300 bg-white font-mono text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-coral-400 transition-colors disabled:opacity-50"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSigningIn}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-ivory-300 bg-white font-mono text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-coral-400 transition-colors disabled:opacity-50"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSigningIn}
              required
              className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-ivory-300 bg-white font-mono text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-coral-400 transition-colors disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-700 transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {authMode === 'signup' && (
            <p className="text-xs font-mono text-ink-500 text-left">
              Password must be at least 8 characters
            </p>
          )}

          <button
            type="submit"
            disabled={isSigningIn}
            className="w-full px-6 py-3 rounded-lg font-sans font-semibold text-base bg-coral-500 text-white hover:bg-coral-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSigningIn ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                {authMode === 'signin' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              authMode === 'signin' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <p className="font-mono text-sm text-ink-600 mb-6">
          {authMode === 'signin' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={toggleAuthMode}
                className="text-coral-600 hover:text-coral-700 font-semibold transition-colors"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={toggleAuthMode}
                className="text-coral-600 hover:text-coral-700 font-semibold transition-colors"
              >
                Sign in
              </button>
            </>
          )}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-ivory-300"></div>
          <span className="font-mono text-xs text-ink-500">or</span>
          <div className="flex-1 h-px bg-ivory-300"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isSigningIn}
          className="w-full px-6 py-3 rounded-lg font-sans font-semibold text-base bg-ivory-50 border-2 border-ivory-300 text-ink-800 hover:bg-ivory-100 hover:border-coral-400 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSigningIn ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-ink-700 border-t-transparent"></div>
              Signing in...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
}
