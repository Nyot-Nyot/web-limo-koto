import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    console.log('Testing Firebase connection...');
    
    // Test Firebase configuration
    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : 'Not Set',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Not Set',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Set' : 'Not Set',
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? 'Set' : 'Not Set',
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? 'Set' : 'Not Set',
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? 'Set' : 'Not Set'
    };
    
    console.log('Firebase config status:', config);
    
    // Test Firestore connection
    const collections = [];
    try {
      const beritaSnapshot = await getDocs(collection(db, 'berita'));
      collections.push({
        name: 'berita',
        count: beritaSnapshot.docs.length,
        status: 'Connected'
      });
    } catch (error) {
      collections.push({
        name: 'berita',
        count: 0,
        status: 'Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    try {
      const pejabatSnapshot = await getDocs(collection(db, 'pejabat'));
      collections.push({
        name: 'pejabat',
        count: pejabatSnapshot.docs.length,
        status: 'Connected'
      });
    } catch (error) {
      collections.push({
        name: 'pejabat',
        count: 0,
        status: 'Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    try {
      const faqSnapshot = await getDocs(collection(db, 'faq'));
      collections.push({
        name: 'faq',
        count: faqSnapshot.docs.length,
        status: 'Connected'
      });
    } catch (error) {
      collections.push({
        name: 'faq',
        count: 0,
        status: 'Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    try {
      const jorongSnapshot = await getDocs(collection(db, 'jorong'));
      collections.push({
        name: 'jorong',
        count: jorongSnapshot.docs.length,
        status: 'Connected'
      });
    } catch (error) {
      collections.push({
        name: 'jorong',
        count: 0,
        status: 'Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    try {
      const galeriSnapshot = await getDocs(collection(db, 'galeri'));
      collections.push({
        name: 'galeri',
        count: galeriSnapshot.docs.length,
        status: 'Connected'
      });
    } catch (error) {
      collections.push({
        name: 'galeri',
        count: 0,
        status: 'Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    try {
      const agendaSnapshot = await getDocs(collection(db, 'agenda'));
      collections.push({
        name: 'agenda',
        count: agendaSnapshot.docs.length,
        status: 'Connected'
      });
    } catch (error) {
      collections.push({
        name: 'agenda',
        count: 0,
        status: 'Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    const result = {
      timestamp: new Date().toISOString(),
      firebaseConfig: config,
      collections: collections,
      summary: {
        totalCollections: collections.length,
        connectedCollections: collections.filter(c => c.status === 'Connected').length,
        totalDocuments: collections.reduce((sum, c) => sum + c.count, 0)
      }
    };
    
    console.log('Firebase test result:', result);
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error testing Firebase:', error);
    return NextResponse.json(
      { 
        error: 'Failed to test Firebase connection',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 