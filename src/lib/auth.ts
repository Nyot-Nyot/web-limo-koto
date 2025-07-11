import { auth } from './firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';

// Fungsi untuk login admin
export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
  displayName?: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profil dengan displayName jika ada
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    
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
