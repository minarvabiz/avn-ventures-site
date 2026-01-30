import React from 'react';
import { PhoneCall, ClipboardCheck, Wrench, Smile } from 'lucide-react';

const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      icon: PhoneCall,
      title: "Contact Us",
      desc: "Call or book online",
      color: "bg-blue-500"
    },
    {
      icon: ClipboardCheck,
      title: "Free Site Visit",
      desc: "We analyze your needs",
      color: "bg-purple-500"
    },
    {
      icon: Wrench,
      title: "Expert Installation",
      desc: "Quick & clean setup",
      color: "bg-orange-500"
    },
    {
      icon: Smile,
      title: "Happy Service",
      desc: "Lifetime support",
      color: "bg-green-500"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">Simple Process</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-black text-slate-900">How We Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-slate-100 -z-10 transform translate-y-1/2"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              <div className={`w-20 h-20 rounded-3xl ${step.color} text-white flex items-center justify-center shadow-lg shadow-indigo-100 mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm font-medium">{step.desc}</p>
              
              {/* Connector Line (Mobile) */}
              {idx !== steps.length - 1 && (
                <div className="md:hidden absolute bottom-[-32px] w-1 h-8 bg-slate-100"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;