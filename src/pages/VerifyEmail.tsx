import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  type AuthError,
} from 'firebase/auth';
import { getFunctions, httpsCallable, FunctionsError } from 'firebase/functions';
import { auth, app } from '../auth/firebase';

type Status =
  | { kind: 'loading'; message: string }
  | { kind: 'needs-email'; pending?: string }
  | { kind: 'success' }
  | {
      kind: 'error';
      headline: string;
      subtext: string;
      severity: 'error' | 'warning';
    };

export function VerifyEmail() {
  const [status, setStatus] = useState<Status>({
    kind: 'loading',
    message: 'Signing you in…',
  });
  const [emailInput, setEmailInput] = useState('');
  const anonUidRef = useRef<string | null>(null);
  const ranOnce = useRef(false);

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    const params = new URLSearchParams(window.location.search);
    anonUidRef.current = params.get('anonUid');
    const emailFromUrl = params.get('email')?.trim() || null;

    if (!isSignInWithEmailLink(auth, window.location.href)) {
      setStatus({
        kind: 'error',
        severity: 'error',
        headline: 'This link is invalid or has already been used.',
        subtext: 'You can close this tab.',
      });
      return;
    }

    const stored = window.localStorage.getItem('emailForSignIn');
    const candidate = emailFromUrl || stored;
    if (candidate) {
      void completeSignIn(candidate);
    } else {
      setStatus({ kind: 'needs-email' });
    }
  }, []);

  async function completeSignIn(email: string) {
    setStatus({ kind: 'loading', message: 'Verifying…' });

    try {
      await signInWithEmailLink(auth, email, window.location.href);
    } catch (err) {
      const code = (err as AuthError)?.code ?? '';
      if (code === 'auth/invalid-action-code') {
        setStatus({
          kind: 'error',
          severity: 'warning',
          headline: "This link has already been used.",
          subtext: "You're already verified — you can close this tab.",
        });
        return;
      }
      if (code === 'auth/expired-action-code') {
        setStatus({
          kind: 'error',
          severity: 'error',
          headline: 'This link expired.',
          subtext: 'Open the extension and re-submit your email to get a new one.',
        });
        return;
      }
      if (code === 'auth/invalid-email') {
        setStatus({
          kind: 'needs-email',
          pending: "That email doesn't look valid.",
        });
        return;
      }
      console.error('[verify-email] signInWithEmailLink failed', err);
      setStatus({
        kind: 'error',
        severity: 'error',
        headline: 'Something went wrong signing you in.',
        subtext: 'Open the extension and re-submit your email.',
      });
      return;
    }

    window.localStorage.removeItem('emailForSignIn');

    const anonUid = anonUidRef.current;
    if (!anonUid) {
      setStatus({
        kind: 'error',
        severity: 'warning',
        headline: 'Verified, but couldn’t sync with the extension.',
        subtext: 'The link was malformed. Please re-submit from the extension.',
      });
      return;
    }

    try {
      const callable = httpsCallable<{ anonUid: string }, { ok: boolean }>(
        getFunctions(app, 'us-central1'),
        'linkVerifiedEmail',
      );
      await callable({ anonUid });
    } catch (err) {
      const code = (err as FunctionsError)?.code ?? '';
      const message = (err as FunctionsError)?.message ?? '';
      if (code === 'functions/not-found') {
        setStatus({
          kind: 'error',
          severity: 'error',
          headline: 'No extension profile found for this link.',
          subtext: 'Finish onboarding in the extension first.',
        });
        return;
      }
      if (code === 'functions/permission-denied') {
        setStatus({
          kind: 'error',
          severity: 'error',
          headline: "That email doesn't match the extension.",
          subtext:
            message ||
            "The address you just verified doesn't match the one in the extension. Re-submit with the correct email.",
        });
        return;
      }
      if (code === 'functions/unauthenticated') {
        setStatus({
          kind: 'error',
          severity: 'error',
          headline: "Sign-in didn't stick.",
          subtext: 'Re-open the link from your email.',
        });
        return;
      }
      if (code === 'functions/internal') {
        console.error(
          '[verify-email] linkVerifiedEmail failed; this is often an outdated CORS deployment for the callable',
          err,
        );
      }
      console.error('[verify-email] linkVerifiedEmail failed', err);
      setStatus({
        kind: 'error',
        severity: 'error',
        headline: 'We verified your email but couldn’t sync with your profile.',
        subtext: 'Try again, or contact support if it keeps happening.',
      });
      return;
    }

    try {
      await signOut(auth);
    } catch {
      // Best-effort sign-out; the source of truth is the extension's session.
    }

    setStatus({ kind: 'success' });
  }

  function onSubmitEmail(e: React.FormEvent) {
    e.preventDefault();
    const email = emailInput.trim();
    if (!email) return;
    void completeSignIn(email);
  }

  return (
    <>
      <Helmet>
        <title>Verifying your email · Read Sidekick</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-4">
        <div className="bg-ivory-50 rounded-xl p-8 shadow-md max-w-md w-full text-center animate-slide-up">
          {status.kind === 'loading' && (
            <>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-coral-500 border-t-transparent mb-4"></div>
              <h1 className="text-2xl font-serif font-bold text-ink-800 mb-2">
                {status.message}
              </h1>
              <p className="font-mono text-sm text-ink-700/70">One moment.</p>
            </>
          )}

          {status.kind === 'needs-email' && (
            <>
              <h1 className="text-2xl font-serif font-bold text-ink-800 mb-2">
                Confirm your email
              </h1>
              <p className="font-mono text-sm text-ink-700/70 mb-6">
                Enter the email you used in the Read Sidekick extension.
              </p>
              {status.pending && (
                <div className="mb-6 p-4 bg-ochre-300 border-2 border-ochre-400 rounded-lg text-ink-800 font-mono text-sm text-left">
                  {status.pending}
                </div>
              )}
              <form onSubmit={onSubmitEmail} className="space-y-4">
                <input
                  type="email"
                  required
                  autoFocus
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-ivory-300 bg-white font-mono text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-coral-400 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg font-sans font-semibold text-base bg-coral-500 text-white hover:bg-coral-600 transition-all duration-300"
                >
                  Continue
                </button>
              </form>
            </>
          )}

          {status.kind === 'success' && (
            <>
              <CheckCircle2 className="w-14 h-14 mx-auto mb-4 text-coral-500" />
              <h1 className="text-3xl font-serif font-bold text-ink-800 mb-3">
                You&rsquo;re verified.
              </h1>
              <p className="font-mono text-sm text-ink-700/70">
                You can close this tab and return to the Read Sidekick extension.
              </p>
            </>
          )}

          {status.kind === 'error' && (
            <>
              {status.severity === 'error' ? (
                <XCircle className="w-14 h-14 mx-auto mb-4 text-ochre-400" />
              ) : (
                <AlertCircle className="w-14 h-14 mx-auto mb-4 text-ochre-400" />
              )}
              <h1 className="text-2xl font-serif font-bold text-ink-800 mb-3">
                {status.headline}
              </h1>
              <p className="font-mono text-sm text-ink-700/70">{status.subtext}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
