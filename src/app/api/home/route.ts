import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { featuresData } from '@/data/features';
import { allPejabat } from '@/data/pejabat';
import { mockNewsData } from '@/data/newsData';
import { faqData } from '@/data/faq';

export async function GET() {
  try {
    console.log('Fetching home data from Firebase...');
    
    const homeData = {
      features: featuresData,
      pejabat: allPejabat,
      news: mockNewsData,
      faq: faqData
    };

    // Fetch news data from Firestore
    try {
      const newsSnapshot = await getDocs(collection(db, 'berita'));
      if (newsSnapshot.docs.length > 0) {
        const newsData = newsSnapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            id: doc.id,
            title: typeof docData.title === 'string' ? docData.title : '',
            excerpt: typeof docData.excerpt === 'string' ? docData.excerpt : '',
            tags: Array.isArray(docData.tags) ? docData.tags : [],
            categoryColor: typeof docData.categoryColor === 'string' ? docData.categoryColor : 'bg-gradient-to-r from-red-500 to-pink-600',
            imageSrc: typeof docData.imageSrc === 'string' ? docData.imageSrc : '',
            isFeatured: typeof docData.isFeatured === 'boolean' ? docData.isFeatured : false,
            blocks: Array.isArray(docData.blocks) ? docData.blocks : [],
            href: typeof docData.href === 'string' ? docData.href : `/berita/${doc.id}`,
            date: typeof docData.date === 'string' ? docData.date : new Date().toLocaleDateString('id-ID', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            }),
            views: typeof docData.views === 'number' ? docData.views : 0,
            category: typeof docData.category === 'string' ? docData.category : 'trending',
            backgroundGradient: typeof docData.backgroundGradient === 'string' ? docData.backgroundGradient : 'bg-gradient-to-br from-blue-400 to-blue-600',
            emoji: typeof docData.emoji === 'string' ? docData.emoji : '📰'
          };
        });
        homeData.news = newsData;
        console.log(`Fetched ${newsData.length} news items from Firestore`);
      }
    } catch (error) {
      console.warn('Error fetching news from Firestore:', error);
    }

    // Fetch pejabat data from Firestore
    try {
      const pejabatSnapshot = await getDocs(collection(db, 'pejabat'));
      if (pejabatSnapshot.docs.length > 0) {
        const pejabatData = pejabatSnapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            id: doc.id,
            name: typeof docData.name === 'string' ? docData.name : '',
            title: typeof docData.title === 'string' ? docData.title : '',
            jorong: typeof docData.jorong === 'string' ? docData.jorong : undefined,
            image: typeof docData.image === 'string' ? docData.image : '',
            description: typeof docData.description === 'string' ? docData.description : ''
          };
        });
        homeData.pejabat = pejabatData;
        console.log(`Fetched ${pejabatData.length} pejabat items from Firestore`);
      }
    } catch (error) {
      console.warn('Error fetching pejabat from Firestore:', error);
    }

    // Fetch FAQ data from Firestore
    try {
      const faqSnapshot = await getDocs(collection(db, 'faq'));
      if (faqSnapshot.docs.length > 0) {
        const faqData = faqSnapshot.docs.map((doc, index) => {
          const docData = doc.data();
          return {
            id: index,
            question: typeof docData.question === 'string' ? docData.question : '',
            answer: typeof docData.answer === 'string' ? docData.answer : '',
            category: typeof docData.category === 'string' ? docData.category : ''
          };
        });
        homeData.faq = faqData;
        console.log(`Fetched ${faqData.length} FAQ items from Firestore`);
      }
    } catch (error) {
      console.warn('Error fetching FAQ from Firestore:', error);
    }

    console.log('Successfully fetched home data from Firebase');
    return NextResponse.json(homeData);
    
  } catch (error) {
    console.error('Error fetching home data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch home data',
        features: featuresData,
        pejabat: allPejabat,
        news: mockNewsData,
        faq: faqData
      },
      { status: 500 }
    );
  }
} 