import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Sun, Wifi } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Hero: React.FC = () => {
  const { heroImages } = useContent(); // Use dynamic images from Context
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Automatically cycle through images
  useEffect(() => {
    if (heroImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Mouse move handler for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; 
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#0B0F19] pt-12 pb-24 md:pt-20 md:pb-40 min-h-[90vh] flex items-center">
      {/* Styles for entry animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-entry {
          animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.3s; }
        .delay-300 { animation-delay: 0.5s; }
        .delay-400 { animation-delay: 0.7s; }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Vibrant Background Gradients with Parallax */}
      <div 
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur-[80px] md:blur-[120px] opacity-40 pointer-events-none transition-transform duration-300 ease-out will-change-transform" 
        style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}
      />
      <div 
        className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-tr from-orange-500 to-pink-500 rounded-full blur-[80px] md:blur-[120px] opacity-30 pointer-events-none transition-transform duration-300 ease-out will-change-transform"
        style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center w-full z-10">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 md:space-y-8 mt-12 lg:mt-0 relative z-30">
          <div className="animate-entry delay-100 inline-flex items-center space-x-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-4 py-1.5 md:px-5 md:py-2 mb-2 hover:bg-white/10 transition-colors cursor-default">
            <Star className="w-3 h-3 md:w-4 md:h-4 text-orange-400 fill-orange-400 animate-spin-slow" />
            <span className="text-indigo-200 text-[10px] md:text-xs font-bold tracking-widest uppercase">Trusted by 500+ Clients</span>
          </div>
          
          <h1 className="animate-entry delay-200 text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.15]">
            Smart Tech for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 animate-gradient-x">
              Modern Living.
            </span>
          </h1>
          
          <p className="animate-entry delay-300 text-base md:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed px-4 lg:px-0">
            Elevate your space with our premium <b>CCTV</b>, <b>Solar</b>, and <b>Automation</b> solutions. We bring international quality to your doorstep.
          </p>
          
          {/* CTA Buttons - Ultra High Z-Index */}
          <div className="animate-entry delay-400 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-4 px-4 sm:px-0 relative z-[100]">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-2 text-base md:text-lg cursor-pointer pointer-events-auto"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold backdrop-blur-md transition-all active:scale-95 flex items-center justify-center text-base md:text-lg cursor-pointer pointer-events-auto"
            >
              Explore Services
            </Link>
          </div>

          <div className="animate-entry delay-400 pt-6 md:pt-10 flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 text-slate-400 text-xs md:text-sm font-semibold">
            <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-lg">
               <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.5)]"></div>
               <span>24/7 Support</span>
            </div>
             <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-lg">
               <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>
               <span>Expert Team</span>
            </div>
          </div>
        </div>

        {/* Dynamic Visuals - Circular Image Slider */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-0 perspective-1000 mb-8 lg:mb-0 mt-10 lg:mt-0 animate-entry delay-200 pointer-events-none">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] transition-all duration-500">
             {/* Rotating Dashed Circle */}
             <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-[spin_30s_linear_infinite]"></div>
             
             {/* Floating Icons */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 md:-translate-y-6 bg-slate-800 p-2 md:p-4 rounded-2xl border border-slate-700 shadow-xl animate-float z-20" style={{animationDelay: '0s'}}>
                <Shield className="w-5 h-5 md:w-8 md:h-8 text-indigo-400" />
             </div>
             
             <div className="absolute bottom-1/4 right-0 translate-x-3 md:translate-x-4 bg-slate-800 p-2 md:p-4 rounded-2xl border border-slate-700 shadow-xl animate-float z-20" style={{animationDelay: '1s'}}>
                <Sun className="w-5 h-5 md:w-8 md:h-8 text-orange-400" />
             </div>
             
             <div className="absolute bottom-1/4 left-0 -translate-x-3 md:-translate-x-4 bg-slate-800 p-2 md:p-4 rounded-2xl border border-slate-700 shadow-xl animate-float z-20" style={{animationDelay: '2s'}}>
                <Wifi className="w-5 h-5 md:w-8 md:h-8 text-green-400" />
             </div>

             {/* Center Image Container with Slider */}
             <div className="absolute inset-2 md:inset-6 rounded-full overflow-hidden border-[4px] md:border-[6px] border-slate-800 shadow-2xl bg-slate-800 z-10 group">
                 {heroImages.map((img, idx) => (
                   <div 
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      idx === currentImageIndex 
                        ? 'opacity-100 scale-100 blur-0 z-20' 
                        : 'opacity-0 scale-110 blur-sm z-10'
                    }`}
                   >
                     <img 
                       src={img.src} 
                       alt={img.label} 
                       loading={idx === 0 ? "eager" : "lazy"} 
                       className="w-full h-full object-cover"
                       onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.onerror = null; 
                         target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"; 
                       }}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                     
                     <div className={`absolute bottom-4 md:bottom-6 left-0 right-0 text-center transition-all duration-700 delay-300 ${
                       idx === currentImageIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                     }`}>
                        <span className={`inline-block px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-[10px] md:text-sm font-medium border border-white/10 shadow-lg ${idx === currentImageIndex ? 'animate-float' : ''}`}>
                          {img.label}
                        </span>
                     </div>
                   </div>
                 ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;