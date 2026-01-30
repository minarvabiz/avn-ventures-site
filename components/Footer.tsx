import React from 'react';
import { ShieldCheck, Facebook, Instagram, Twitter, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center text-white mb-4">
              <ShieldCheck className="h-8 w-8 mr-2 text-indigo-500" />
              <span className="text-xl font-bold">AVN VENTURES</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Leading provider of security and sustainable energy solutions in Trivandrum. Dedicated to quality service and customer satisfaction.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:ml-12">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">CCTV Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Solar Energy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Home Automation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gate Motors</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li>AVN VENTURES LLP, MP 20/537I</li>
              <li>VST COMPLEX, THACHOTTUKAVU</li>
              <li>MALAYINKEEZHU PO, TRIVANDRUM</li>
              <li>KERALA</li>
              <li className="text-white font-medium text-lg pt-2 flex items-center">
                 <Phone className="w-4 h-4 mr-2 text-indigo-500" />
                 +91 90745 90620
              </li>
              <li className="break-all">avnventuresllp@gmail.com</li>
              <li>
                  <a 
                    href="https://wa.me/919074590620" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 text-[#25D366] font-bold hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
               <a 
                 href="https://www.facebook.com" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-slate-400 hover:text-indigo-500 transition-all duration-300 transform hover:scale-110"
                 aria-label="Facebook"
               >
                 <Facebook className="h-5 w-5"/>
               </a>
               <a 
                 href="https://www.instagram.com" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-slate-400 hover:text-pink-500 transition-all duration-300 transform hover:scale-110"
                 aria-label="Instagram"
               >
                 <Instagram className="h-5 w-5"/>
               </a>
               <a 
                 href="https://twitter.com" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-slate-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                 aria-label="Twitter"
               >
                 <Twitter className="h-5 w-5"/>
               </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 text-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} AVN Ventures. All rights reserved. Designed for Excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;