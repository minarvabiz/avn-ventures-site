import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db, isConfigured } from '../firebaseConfig';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

// Default Data
const defaultHeroImages = [
  {
    src: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80", 
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

const defaultAppConfig = {
  companyName: "AVN VENTURES",
  tagline: "Smart Solutions",
  logoUrl: "", // Empty string means use default icon
  themeColor: "indigo", // indigo, blue, emerald, violet, rose
  heroTitle: "Smart Tech for Modern Living.",
  heroSubtitle: "Elevate your space with our premium CCTV, Solar, and Automation solutions. We bring international quality to your doorstep.",
  notificationEnabled: false,
  notificationMessage: "⚠️ Site maintenance in progress. Some features may be temporarily unavailable."
};

interface HeroImage {
  src: string;
  label: string;
}

interface AppConfig {
  companyName: string;
  tagline: string;
  logoUrl: string;
  themeColor: string;
  heroTitle: string;
  heroSubtitle: string;
  notificationEnabled: boolean;
  notificationMessage: string;
}

interface ContentContextType {
  heroImages: HeroImage[];
  galleryImages: string[];
  appConfig: AppConfig;
  updateHeroImages: (images: HeroImage[]) => void;
  updateGalleryImages: (images: string[]) => void;
  updateAppConfig: (config: Partial<AppConfig>) => void;
  resetToDefaults: () => void;
  isFirebaseActive: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [heroImages, setHeroImages] = useState<HeroImage[]>(defaultHeroImages);
  const [galleryImages, setGalleryImages] = useState<string[]>(defaultGalleryImages);
  const [appConfig, setAppConfig] = useState<AppConfig>(defaultAppConfig);
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
          if (data.appConfig) setAppConfig({ ...defaultAppConfig, ...data.appConfig });
        } else {
          // Initialize DB if empty
          setDoc(doc.ref, { 
            heroImages: defaultHeroImages, 
            galleryImages: defaultGalleryImages,
            appConfig: defaultAppConfig
          });
        }
      }, (error) => {
         console.error("Firestore sync error:", error);
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
    const savedConfig = localStorage.getItem('avn_app_config');
    
    if (savedHero) setHeroImages(JSON.parse(savedHero));
    if (savedGallery) setGalleryImages(JSON.parse(savedGallery));
    if (savedConfig) setAppConfig({ ...defaultAppConfig, ...JSON.parse(savedConfig) });
  };

  const updateHeroImages = async (images: HeroImage[]) => {
    setHeroImages(images);
    saveData({ heroImages: images });
  };

  const updateGalleryImages = async (images: string[]) => {
    setGalleryImages(images);
    saveData({ galleryImages: images });
  };

  const updateAppConfig = async (config: Partial<AppConfig>) => {
    const newConfig = { ...appConfig, ...config };
    setAppConfig(newConfig);
    saveData({ appConfig: newConfig });
  };

  const saveData = async (data: any) => {
    if (isConfigured && db) {
      try {
        await setDoc(doc(db, "siteContent", "main"), data, { merge: true });
      } catch (e) { console.error("Save failed", e); }
    } else {
      // Local Storage Fallback
      if(data.heroImages) localStorage.setItem('avn_hero_images', JSON.stringify(data.heroImages));
      if(data.galleryImages) localStorage.setItem('avn_gallery_images', JSON.stringify(data.galleryImages));
      if(data.appConfig) localStorage.setItem('avn_app_config', JSON.stringify(data.appConfig));
    }
  }

  const resetToDefaults = async () => {
    setHeroImages(defaultHeroImages);
    setGalleryImages(defaultGalleryImages);
    setAppConfig(defaultAppConfig);
    
    if (isConfigured && db) {
       await setDoc(doc(db, "siteContent", "main"), { 
         heroImages: defaultHeroImages, 
         galleryImages: defaultGalleryImages,
         appConfig: defaultAppConfig
       });
    } else {
       localStorage.setItem('avn_hero_images', JSON.stringify(defaultHeroImages));
       localStorage.setItem('avn_gallery_images', JSON.stringify(defaultGalleryImages));
       localStorage.setItem('avn_app_config', JSON.stringify(defaultAppConfig));
    }
  };

  return (
    <ContentContext.Provider value={{ 
      heroImages, 
      galleryImages, 
      appConfig,
      updateHeroImages, 
      updateGalleryImages, 
      updateAppConfig,
      resetToDefaults, 
      isFirebaseActive 
    }}>
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