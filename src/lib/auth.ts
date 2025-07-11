import { auth } from './firebase';
import { db } from './firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { User as AdminUser } from './models';

// Fungsi untuk login admin
export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login timestamp
    const userRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
    
    return userCredential.user;
  } catch (error: unknown) {
    // Tangani error dengan lebih baik
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'Email tidak ditemukan',
      'auth/wrong-password': 'Password salah',
      'auth/invalid-email': 'Format email tidak valid',
      'auth/user-disabled': 'Akun telah dinonaktifkan'
    };
    
    const firebaseError = error as { code?: string, message: string };
    const errorCode = firebaseError.code || '';
    const errorMessage = errorCode ? (errorMessages[errorCode] || firebaseError.message) : 'Terjadi kesalahan saat login';
    
    throw new Error(errorMessage);
  }
};

// Fungsi untuk register admin (biasanya dibatasi untuk super admin)
export const registerWithEmail = async (
  email: string, 
  password: string, 
  displayName?: string,
  role: 'admin' | 'super-admin' | 'editor' = 'admin'
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profil dengan displayName jika ada
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    // Buat data admin di Firestore
    const userRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userRef, {
      email: email,
      displayName: displayName || email.split('@')[0],
      role: role,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });
    
    return userCredential.user;
  } catch (error: unknown) {
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'Email sudah terdaftar',
      'auth/invalid-email': 'Format email tidak valid',
      'auth/weak-password': 'Password terlalu lemah'
    };
    
    const firebaseError = error as { code?: string, message: string };
    const errorCode = firebaseError.code || '';
    const errorMessage = errorCode ? (errorMessages[errorCode] || firebaseError.message) : 'Terjadi kesalahan saat registrasi';
    
    throw new Error(errorMessage);
  }
};

// Fungsi untuk logout
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    const firebaseError = error as { message: string };
    throw new Error(`Gagal logout: ${firebaseError.message || 'Terjadi kesalahan'}`);
  }
};

// Fungsi untuk reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: unknown) {
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'Email tidak ditemukan',
      'auth/invalid-email': 'Format email tidak valid',
    };
    
    const firebaseError = error as { code?: string, message: string };
    const errorCode = firebaseError.code || '';
    const errorMessage = errorCode ? (errorMessages[errorCode] || firebaseError.message) : 'Terjadi kesalahan saat reset password';
    
    throw new Error(errorMessage);
  }
};

// Fungsi untuk mendapatkan user saat ini
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Fungsi untuk memantau perubahan status auth
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Fungsi untuk mendapatkan data user dari Firestore (termasuk role)
export const getUserData = async (userId: string): Promise<AdminUser | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return {
        id: userSnap.id,
        ...userSnap.data()
      } as AdminUser;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};