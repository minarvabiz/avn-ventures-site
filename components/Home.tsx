import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import Features from './Features';
import ProcessTimeline from './ProcessTimeline';
import ImageGallery from './ImageGallery';
import Services from './Services';
import Brands from './Brands';
import { Wrench, ShieldCheck, Zap } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      <Brands />
      <Features />
      <Services showPricing={false} />
      <ProcessTimeline />
      <ImageGallery />
      
      {/* Why Choose Us Section */}
      <div className="py-20 bg-slate-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <Wrench className="w-10 h-10 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Expert Maintenance</h3>
                  <p className="text-slate-400 text-sm">We provide AMC support for all your CCTV and Solar installations.</p>
               </div>
               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <ShieldCheck className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Top Brands Only</h3>
                  <p className="text-slate-400 text-sm">We partner with Hikvision, CP Plus, Tata Solar, and other global leaders.</p>
               </div>
               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <Zap className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Energy Audits</h3>
                  <p className="text-slate-400 text-sm">Free consultation to calculate your power savings with Solar.</p>
               </div>
            </div>
         </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 px-4">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to Upgrade Your Space?</h2>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-white text-indigo-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl transform hover:-translate-y-1"
          >
            Get a Free Quote Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;