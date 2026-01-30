import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db, isConfigured } from '../firebaseConfig';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

// Default Data
const defaultHeroImages = [
  {
    src: "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=800&q=80", 
    label: "AI Smart Security"
  },
  {
    src: "https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&w=800&q=80", 
    label: "Smart Control Panel"
  },
  {
    src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80", 
    label: "Solar Energy"
  }
];

const defaultGalleryImages = [
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80",
];

interface HeroImage {
  src: string;
  label: string;
}

interface ContentContextType {
  heroImages: HeroImage[];
  galleryImages: string[];
  updateHeroImages: (images: HeroImage[]) => void;
  updateGalleryImages: (images: string[]) => void;
  resetToDefaults: () => void;
  isFirebaseActive: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [heroImages, setHeroImages] = useState<HeroImage[]>(defaultHeroImages);
  const [galleryImages, setGalleryImages] = useState<string[]>(defaultGalleryImages);
  const [isFirebaseActive, setIsFirebaseActive] = useState(false);

  // Initialize Data
  useEffect(() => {
    if (isConfigured && db) {
      // FIREBASE MODE: Listen to real-time updates
      setIsFirebaseActive(true);
      const unsub = onSnapshot(doc(db, "siteContent", "main"), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data.heroImages) setHeroImages(data.heroImages);
          if (data.galleryImages) setGalleryImages(data.galleryImages);
        } else {
          // Initialize DB if empty
          setDoc(doc.ref, { heroImages: defaultHeroImages, galleryImages: defaultGalleryImages });
        }
      }, (error) => {
         console.error("Firestore sync error:", error);
         // Fallback to local if permission denied or error
         loadFromLocal();
      });
      return () => unsub();
    } else {
      // LOCAL STORAGE MODE
      loadFromLocal();
    }
  }, []);

  const loadFromLocal = () => {
    const savedHero = localStorage.getItem('avn_hero_images');
    const savedGallery = localStorage.getItem('avn_gallery_images');
    if (savedHero) setHeroImages(JSON.parse(savedHero));
    if (savedGallery) setGalleryImages(JSON.parse(savedGallery));
  };

  const updateHeroImages = async (images: HeroImage[]) => {
    setHeroImages(images);
    if (isConfigured && db) {
      try {
        await setDoc(doc(db, "siteContent", "main"), { heroImages: images }, { merge: true });
      } catch (e) { console.error("Save failed", e); }
    } else {
      localStorage.setItem('avn_hero_images', JSON.stringify(images));
    }
  };

  const updateGalleryImages = async (images: string[]) => {
    setGalleryImages(images);
    if (isConfigured && db) {
       try {
        await setDoc(doc(db, "siteContent", "main"), { galleryImages: images }, { merge: true });
       } catch (e) { console.error("Save failed", e); }
    } else {
      localStorage.setItem('avn_gallery_images', JSON.stringify(images));
    }
  };

  const resetToDefaults = async () => {
    setHeroImages(defaultHeroImages);
    setGalleryImages(defaultGalleryImages);
    if (isConfigured && db) {
       await setDoc(doc(db, "siteContent", "main"), { 
         heroImages: defaultHeroImages, 
         galleryImages: defaultGalleryImages 
       });
    } else {
       localStorage.setItem('avn_hero_images', JSON.stringify(defaultHeroImages));
       localStorage.setItem('avn_gallery_images', JSON.stringify(defaultGalleryImages));
    }
  };

  return (
    <ContentContext.Provider value={{ heroImages, galleryImages, updateHeroImages, updateGalleryImages, resetToDefaults, isFirebaseActive }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};