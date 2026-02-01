import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data';

interface ServicesProps {
  showPricing?: boolean;
}

const Services: React.FC<ServicesProps> = ({ showPricing = false }) => {
  return (
    <div className="bg-slate-50 py-24 relative overflow-hidden">
      <style>{`
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounceIn 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
        }
      `}</style>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">What We Do</span>
          <h2 className="mt-2 text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
             World-Class Services
          </h2>
          <p className="mt-4 text-xl text-slate-500">
            Technology meets reliability. We bring you the best in security and energy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8">
          {servicesData.map((service, idx) => (
            <Link 
              to={`/services/${service.id}`}
              key={service.id} 
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 border border-slate-100 transition-all duration-300 transform hover:-translate-y-2 block z-0 hover:z-10"
            >
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-100 rounded-3xl transition-colors pointer-events-none"></div>
              
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  {/* Icon Container with Animations & Tooltip */}
                  <div className="relative group/tooltip">
                    <div 
                      className={`p-4 rounded-2xl bg-gradient-to-br ${idx % 2 === 0 ? 'from-indigo-500 to-purple-500' : 'from-orange-500 to-pink-500'} text-white shadow-lg transform transition-all duration-300 animate-bounce-in group-hover:scale-110 group-hover:rotate-3 hover:!scale-125 hover:shadow-xl hover:brightness-110 cursor-pointer`}
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <service.icon className="h-8 w-8 animate-pulse-once" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl transform translate-y-2 group-hover/tooltip:translate-y-0 z-50">
                      {service.title}
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                  
                  <div className={`p-2 rounded-full transition-colors ${!showPricing ? 'bg-slate-50 group-hover:bg-indigo-50' : ''}`}>
                    <ArrowRight className="h-6 w-6 text-slate-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{service.title}</h3>
                <p className="text-slate-500 mb-6 leading-relaxed flex-grow">{service.description}</p>
                
                {showPricing ? (
                    <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-100 group-hover:border-indigo-100 transition-colors">
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Estimated Investment</p>
                      <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{service.priceRange}</p>
                      <p className="text-[10px] text-slate-400 mt-1">*Site visit required for final quote.</p>
                    </div>
                ) : (
                    <div className="h-4"></div> /* Spacer for alignment */
                )}

                <ul className="space-y-3 pt-4 border-t border-slate-100">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-slate-600">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm font-semibold">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;