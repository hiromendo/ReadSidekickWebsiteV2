import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthorized: boolean;
  authMethod: 'google' | 'email' | null;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authMethod, setAuthMethod] = useState<'google' | 'email' | null>(null);

  // Check authorization based on auth method
  const checkAuthorization = async (firebaseUser: User): Promise<boolean> => {
    try {
      const providerData = firebaseUser.providerData[0];
      const isEmailProvider = providerData?.providerId === 'password';

      if (isEmailProvider) {
        // Email/password users - check aslUsers collection
        const aslUserDoc = await getDoc(doc(db, 'aslUsers', firebaseUser.uid));
        if (aslUserDoc.exists()) {
          const userData = aslUserDoc.data();
          return userData.status === 'active';
        }
        return false;
      } else {
        // Google auth - check allowedEmails collection
        const allowedEmailsRef = collection(db, 'allowedEmails');
        const q = query(allowedEmailsRef, where('email', '==', firebaseUser.email));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
      }
    } catch (error) {
      console.error('Error checking authorization:', error);
      return false;
    }
  };

  // Detect auth method from user
  const detectAuthMethod = (firebaseUser: User | null): 'google' | 'email' | null => {
    if (!firebaseUser) return null;
    const providerData = firebaseUser.providerData[0];
    if (providerData?.providerId === 'password') return 'email';
    if (providerData?.providerId === 'google.com') return 'google';
    return null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthMethod(detectAuthMethod(firebaseUser));

      if (firebaseUser) {
        const authorized = await checkAuthorization(firebaseUser);
        setIsAuthorized(authorized);
      } else {
        setIsAuthorized(false);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        setAuthMethod('google');
        const authorized = await checkAuthorization(result.user);
        setIsAuthorized(authorized);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Create user document in aslUsers collection
      await setDoc(doc(db, 'aslUsers', result.user.uid), {
        uid: result.user.uid,
        email: email,
        displayName: displayName || null,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        status: 'active'
      });

      setAuthMethod('email');
      setIsAuthorized(true);
    } catch (error) {
      console.error('Error signing up with email:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Update lastLoginAt in aslUsers collection
      const userDocRef = doc(db, 'aslUsers', result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data().status === 'active') {
        await updateDoc(userDocRef, {
          lastLoginAt: serverTimestamp()
        });
        setAuthMethod('email');
        setIsAuthorized(true);
      } else {
        // User not in aslUsers or suspended
        await firebaseSignOut(auth);
        throw new Error('Account not found or suspended');
      }
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setIsAuthorized(false);
      setAuthMethod(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthorized,
    authMethod,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
