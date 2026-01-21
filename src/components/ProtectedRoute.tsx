import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading, isAuthorized } = useAuth();

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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-4">
        <div className="bg-ivory-50 rounded-xl p-8 shadow-md max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-ochre-300 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-ochre-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-bold text-ink-800 mb-2">
            Access Denied
          </h2>
          <p className="font-mono text-sm text-ink-700 mb-6">
            Your email ({user.email}) is not authorized to access this page.
            Please contact an administrator for access.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 rounded-lg font-sans font-semibold text-base bg-coral-500 text-white hover:bg-coral-600 transition-all duration-300"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
