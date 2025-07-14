import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { JorongData } from '@/data/jorong';

export function useJorongFirestore() {
  const [data, setData] = useState<JorongData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await getDocs(collection(db, 'jorong'));
        const jorongList: JorongData[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as JorongData[];
        setData(jorongList);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Gagal mengambil data jorong');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
} 