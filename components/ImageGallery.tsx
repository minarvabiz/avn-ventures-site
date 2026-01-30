import React from 'react';
import { useContent } from '../contexts/ContentContext';

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80", // CCTV
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80", // Solar
  "https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&w=800&q=80", // Automation
  "https://images.unsplash.com/photo-1590486803833-1c5dc8ce84ac?auto=format&fit=crop&w=800&q=80"  // Surveillance
];

const ImageGallery: React.FC = () => {
  // Use images from Context
  const { galleryImages } = useContent();

  if (!galleryImages || galleryImages.length === 0) return null;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, index: number) => {
    const target = e.target as HTMLImageElement;
    // Prevent infinite loop if fallback also fails
    target.onerror = null;
    // Assign a fallback image deterministically based on index so it is consistent but varied
    target.src = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  };

  return (
    <div className="py-10 bg-slate-900 overflow-hidden">
        <div className="text-center mb-8">
            <h3 className="text-white text-lg font-bold uppercase tracking-widest opacity-80">Our Recent Works</h3>
            <p className="text-slate-400 text-xs mt-1">Snapshot of projects completed in Trivandrum</p>
        </div>
      <div className="flex w-[200%] animate-scroll hover:paused">
        {/* First Set */}
        <div className="flex w-1/2 justify-around gap-4 px-4">
          {galleryImages.map((img, idx) => (
            <div key={`a-${idx}`} className="relative w-64 h-40 rounded-xl overflow-hidden shadow-lg border-2 border-slate-700 flex-shrink-0 group cursor-pointer">
              <img 
                src={img} 
                alt="Completed Project" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => handleImageError(e, idx)}
              />
              <div className="absolute inset-0 bg-indigo-600/20 group-hover:bg-transparent transition-colors"></div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="text-white text-xs font-bold border border-white px-3 py-1 rounded-full backdrop-blur-sm">View Project</span>
              </div>
            </div>
          ))}
        </div>
        {/* Duplicate Set for Infinite Scroll */}
        <div className="flex w-1/2 justify-around gap-4 px-4">
           {galleryImages.map((img, idx) => (
            <div key={`b-${idx}`} className="relative w-64 h-40 rounded-xl overflow-hidden shadow-lg border-2 border-slate-700 flex-shrink-0 group cursor-pointer">
              <img 
                src={img} 
                alt="Completed Project" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                onError={(e) => handleImageError(e, idx + galleryImages.length)}
              />
              <div className="absolute inset-0 bg-indigo-600/20 group-hover:bg-transparent transition-colors"></div>
               {/* Hover Overlay */}
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="text-white text-xs font-bold border border-white px-3 py-1 rounded-full backdrop-blur-sm">View Project</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;