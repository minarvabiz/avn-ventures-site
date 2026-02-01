import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "919074590620";

  const options = [
    { label: "📹 CCTV Enquiry", text: "Hello, I am interested in CCTV Camera installation. Please provide details." },
    { label: "☀️ Solar Energy", text: "Hi, I would like to know more about Solar Panels and subsidies." },
    { label: "🏠 Home Automation", text: "I want to discuss Home Automation solutions." },
    { label: "🚪 Gate Automation", text: "Please share details about Automatic Gate Motors." },
    { label: "💬 General Chat", text: "Hello AVN Ventures, I have a query regarding your services." },
  ];

  const handleClick = (text: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4 pointer-events-none">
      {/* Options Menu */}
      <div className={`transition-all duration-300 transform origin-bottom-left pointer-events-auto ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="bg-white p-4 rounded-2xl shadow-2xl border border-green-100 mb-2 flex flex-col gap-2 w-72">
           <div className="flex justify-between items-center mb-2 border-b border-slate-100 pb-2">
             <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Start a Conversation</span>
             <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Online</span>
           </div>
           {options.map((opt, idx) => (
             <button
               key={idx}
               onClick={() => handleClick(opt.text)}
               className="text-left text-sm font-medium text-slate-700 hover:text-green-700 hover:bg-green-50 p-3 rounded-xl transition-all flex items-center justify-between group border border-transparent hover:border-green-200"
             >
               <span>{opt.label}</span>
               <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-green-500 -translate-x-2 group-hover:translate-x-0 duration-300" />
             </button>
           ))}
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-green-500/40 transition-all transform hover:scale-110 active:scale-95"
        aria-label="Open WhatsApp Chat"
      >
        {isOpen ? (
            <X className="w-7 h-7" />
        ) : (
            <WhatsAppIcon />
        )}
        
        {/* Pulse Effect */}
        {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20 duration-1000"></span>
        )}

        {/* Tooltip Label */}
        {!isOpen && (
           <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white text-green-600 font-bold text-xs px-3 py-2 rounded-xl shadow-xl border border-green-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
             Chat on WhatsApp
             <span className="absolute top-1/2 left-[-6px] -translate-y-1/2 w-3 h-3 bg-white border-b border-l border-green-50 rotate-45 transform"></span>
           </span>
        )}
      </button>
    </div>
  );
};

export default WhatsAppFloat;