import React from 'react';

const ImageGallery: React.FC = () => {
  // Updated with reliable, specific Unsplash Image IDs to prevent errors
  const images = [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80", // Solar Panels on Roof
    "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=80", // Security Camera
    "https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&w=600&q=80", // Smart Home Tablet
    "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80", // Gate/Fence
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80", // Electrical / Tech
    "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80", // CCTV Close up
  ];

  return (
    <div className="py-10 bg-slate-900 overflow-hidden">
        <div className="text-center mb-8">
            <h3 className="text-white text-lg font-bold uppercase tracking-widest opacity-80">Our Recent Works</h3>
            <p className="text-slate-400 text-xs mt-1">Snapshot of projects completed in Trivandrum</p>
        </div>
      <div className="flex w-[200%] animate-scroll hover:paused">
        {/* First Set */}
        <div className="flex w-1/2 justify-around gap-4 px-4">
          {images.map((img, idx) => (
            <div key={`a-${idx}`} className="relative w-64 h-40 rounded-xl overflow-hidden shadow-lg border-2 border-slate-700 flex-shrink-0 group cursor-pointer">
              <img 
                src={img} 
                alt="Completed Project" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                   const target = e.target as HTMLImageElement;
                   target.onerror = null;
                   target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"; // Fallback image
                }}
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
           {images.map((img, idx) => (
            <div key={`b-${idx}`} className="relative w-64 h-40 rounded-xl overflow-hidden shadow-lg border-2 border-slate-700 flex-shrink-0 group cursor-pointer">
              <img 
                src={img} 
                alt="Completed Project" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                onError={(e) => {
                   const target = e.target as HTMLImageElement;
                   target.onerror = null;
                   target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"; // Fallback image
                }}
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