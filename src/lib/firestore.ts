import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';

// Helper untuk mengambil semua dokumen dari koleksi
export const getCollection = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting ${collectionName} collection:`, error);
    throw error;
  }
};

// Helper untuk mengambil dokumen tunggal berdasarkan ID
export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting document ${docId} from ${collectionName}:`, error);
    throw error;
  }
};

// Helper untuk menambahkan dokumen baru
export const addDocument = async (collectionName: string, data: Record<string, unknown>) => {
  try {
    // Tambahkan timestamps untuk tracking
    const dataWithTimestamps = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, collectionName), dataWithTimestamps);
    return {
      id: docRef.id,
      ...data
    };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
};

// Helper untuk update dokumen
export const updateDocument = async (collectionName: string, docId: string, data: Record<string, unknown>) => {
  try {
    // Tambahkan timestamp update
    const dataWithTimestamp = {
      ...data,
      updatedAt: serverTimestamp()
    };
    
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, dataWithTimestamp);
    return {
      id: docId,
      ...data
    };
  } catch (error) {
    console.error(`Error updating document ${docId} in ${collectionName}:`, error);
    throw error;
  }
};

// Helper untuk menghapus dokumen
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting document ${docId} from ${collectionName}:`, error);
    throw error;
  }
};

// Helper untuk query dengan filter
export const queryCollection = async (
  collectionName: string, 
  fieldPath: string, 
  operator: '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'array-contains-any' | 'in' | 'not-in', 
  value: unknown,
  orderByField?: string,
  orderDirection?: 'asc' | 'desc',
  limitCount?: number
) => {
  try {
    let queryRef = query(collection(db, collectionName), where(fieldPath, operator, value));
    
    if (orderByField) {
      queryRef = query(queryRef, orderBy(orderByField, orderDirection || 'asc'));
    }
    
    if (limitCount) {
      queryRef = query(queryRef, limit(limitCount));
    }
    
    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error querying ${collectionName} collection:`, error);
    throw error;
  }
};

// Export fungsi server timestamp untuk digunakan saat membuat data
export { serverTimestamp };
