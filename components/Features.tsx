import React from 'react';
import { Users, Clock, ShieldCheck, MapPin } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "Expert Technicians",
      description: "Certified professionals ensuring safe & perfect installation."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your technical needs."
    },
    {
      icon: ShieldCheck,
      title: "Trusted Brands",
      description: "Official partners with Hikvision, Tata Solar, and more."
    },
    {
      icon: MapPin,
      title: "Free Site Visits",
      description: "Zero-cost expert consultation at your doorstep."
    }
  ];

  return (
    <div className="bg-white py-12 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors duration-300 group cursor-default">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-indigo-200">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;