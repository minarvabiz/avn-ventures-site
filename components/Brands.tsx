import React, { useState } from 'react';

interface Brand {
  name: string;
  logo?: string;
  cat: string;
  isText?: boolean;
}

const BrandItem: React.FC<{ brand: Brand }> = ({ brand }) => {
  const [imgError, setImgError] = useState(false);

  if (brand.isText || imgError || !brand.logo) {
    return (
      <span className="text-xl md:text-2xl font-black text-white tracking-tighter font-sans opacity-80 hover:opacity-100 transition-opacity">
        {brand.name}
      </span>
    );
  }

  return (
    <img 
      src={brand.logo} 
      alt={brand.name} 
      className="h-6 md:h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
      onError={() => setImgError(true)}
    />
  );
};

const Brands: React.FC = () => {
  // Ordered List: CCTV First, then Automation/Solar
  const brands: Brand[] = [
    {
      name: "Hikvision",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Hikvision_logo.svg",
      cat: "CCTV"
    },
    {
      name: "Dahua",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Dahua_Technology_logo.svg",
      cat: "CCTV"
    },
    {
      name: "Honeywell",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Honeywell_logo.svg",
      cat: "Security"
    },
    {
      name: "Godrej",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Godrej_Logo.svg",
      cat: "Security"
    },
    {
      name: "Tata Power",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_Power_logo.svg",
      cat: "Solar"
    },
    {
      name: "Havells",
      isText: true, // Wikipedia 'en' links often block hotlinking, using text for safety
      cat: "Electrical"
    },
    {
      name: "Schneider",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Schneider_Electric_2007.svg",
      cat: "Automation"
    },
    {
      name: "CP PLUS",
      isText: true,
      cat: "CCTV"
    },
    {
      name: "LUMINOUS",
      isText: true,
      cat: "Solar"
    }
  ];

  return (
    <div className="bg-slate-900 py-8 border-y border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-6">
        <p className="text-slate-500 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
          Trusted Technology Partners
        </p>
      </div>
      
      {/* Infinite Scroll Ticker */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-scroll whitespace-nowrap flex items-center space-x-12 sm:space-x-20 px-4 group-hover:paused">
          {/* First Set */}
          {brands.map((brand, idx) => (
            <div key={`a-${idx}`} className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer transform hover:scale-105">
               <BrandItem brand={brand} />
            </div>
          ))}
          
          {/* Duplicate Set for smooth loop */}
          {brands.map((brand, idx) => (
             <div key={`b-${idx}`} className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer transform hover:scale-105">
                <BrandItem brand={brand} />
            </div>
          ))}
        </div>
        
        {/* Fade edges to create depth */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-slate-900 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Brands;