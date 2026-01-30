import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data';
import { ArrowLeft, CheckCircle2, ShieldCheck, CalendarCheck } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = servicesData.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Service Not Found</h2>
        <Link 
          to="/services"
          className="text-indigo-600 font-semibold hover:underline flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img 
          src={service.detailImages[0]} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link to="/services" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Services
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              {service.title}
            </h1>
            <p className="text-xl text-indigo-200 max-w-2xl font-medium">
              Professional installation and maintenance by AVN Ventures.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="p-2 bg-indigo-100 rounded-lg mr-3 text-indigo-600">
                    <service.icon className="w-6 h-6" />
                  </span>
                  Overview
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Key Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-slate-800 mb-2 flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                        {benefit.title}
                      </h4>
                      <p className="text-slate-500 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery Preview */}
              <div>
                 <h3 className="text-xl font-bold text-slate-900 mb-6">Gallery</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.detailImages.map((img, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-lg h-64">
                            <img src={img} alt={`${service.title} ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Right Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 text-white rounded-3xl p-8 sticky top-24 shadow-2xl">
                <div className="mb-6">
                  <p className="text-indigo-300 text-sm font-bold uppercase tracking-wider mb-2">Investment</p>
                  <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    {service.priceRange}
                  </p>
                  <p className="text-slate-400 text-xs mt-2">*Prices vary based on requirements.</p>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="flex items-center text-slate-300 text-sm">
                      <ShieldCheck className="w-5 h-5 mr-3 text-indigo-400" />
                      <span>1 Year Service Warranty</span>
                   </div>
                   <div className="flex items-center text-slate-300 text-sm">
                      <CalendarCheck className="w-5 h-5 mr-3 text-indigo-400" />
                      <span>Free Site Inspection</span>
                   </div>
                </div>

                <Link
                  to="/contact"
                  className="block w-full text-center py-4 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg active:scale-95"
                >
                  Book Free Consultation
                </Link>
                
                <p className="text-center text-slate-500 text-xs mt-4">
                  No hidden charges. 100% Transparent.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;