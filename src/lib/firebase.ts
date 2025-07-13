// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Helper function for Firestore fetch-with-fallback pattern
export async function fetchWithFallback<T>(
  collectionName: string,
  localStorageKey: string,
  defaultData: T[],
  dataTransformer: (doc: any) => T,
  maxRetries: number = 3
): Promise<{ data: T[]; source: 'firestore' | 'localStorage' | 'default' }> {
  let retryCount = 0;
  
  // Try to fetch from Firestore with retry mechanism
  while (retryCount < maxRetries) {
    try {
      console.log(`Fetching ${collectionName} data from Firestore, attempt:`, retryCount + 1);
      
      const { collection, getDocs } = await import('firebase/firestore');
      const snapshot = await getDocs(collection(db, collectionName));
      
      if (!snapshot.docs || snapshot.docs.length === 0) {
        console.log(`No ${collectionName} data found in Firestore, using default data`);
        // If no data in Firestore, use default data
        localStorage.setItem(localStorageKey, JSON.stringify(defaultData));
        return { data: defaultData, source: 'default' };
      }
      
      const data = snapshot.docs.map(doc => dataTransformer(doc.data()));
      
      // Check if there are any items with extremely large data
      const isDataTooLarge = data.some((item: any) => {
        // Check if any string field is too large (over 1MB)
        return Object.values(item).some(value => 
          typeof value === 'string' && value.length > 1000000
        );
      });
      
      if (isDataTooLarge) {
        console.warn(`Some ${collectionName} data is very large. This may cause performance issues.`);
      }
      
      console.log(`Successfully fetched ${data.length} ${collectionName} items from Firestore`);
      
      // Update localStorage for offline fallback - but be careful with large data
      try {
        localStorage.setItem(localStorageKey, JSON.stringify(data));
      } catch (storageError) {
        console.error(`Failed to store ${collectionName} data in localStorage (likely too large):`, storageError);
        // Try to store without large fields if it fails
        const dataWithoutLargeFields = data.map((item: any) => {
          const cleanedItem = { ...item };
          Object.keys(cleanedItem).forEach(key => {
            if (typeof cleanedItem[key] === 'string' && cleanedItem[key].length > 1000000) {
              cleanedItem[key] = cleanedItem[key].substring(0, 100) + '...';
            }
          });
          return cleanedItem;
        });
        localStorage.setItem(localStorageKey, JSON.stringify(dataWithoutLargeFields));
      }
      
      return { data, source: 'firestore' };
      
    } catch (fetchError) {
      retryCount++;
      if (retryCount >= maxRetries) {
        console.error(`Error fetching ${collectionName} data after all retries:`, fetchError);
        break;
      }
      console.log(`Fetch attempt ${retryCount} failed. Retrying in ${1000 * retryCount}ms...`, fetchError);
      await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
    }
  }
  
  // Fall back to localStorage if Firestore fails
  const savedData = localStorage.getItem(localStorageKey);
  if (savedData) {
    try {
      console.log(`Using ${collectionName} data from localStorage instead`);
      const parsedData = JSON.parse(savedData);
      return { data: parsedData, source: 'localStorage' };
    } catch (e) {
      console.error(`Error parsing ${collectionName} localStorage data:`, e);
    }
  }
  
  // Use default data as last resort
  console.log(`No ${collectionName} data in localStorage, using default data`);
  localStorage.setItem(localStorageKey, JSON.stringify(defaultData));
  return { data: defaultData, source: 'default' };
}
