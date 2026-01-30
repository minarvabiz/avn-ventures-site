import React, { useState } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Book Service', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-indigo-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center cursor-pointer group select-none"
          >
            <div className="relative bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-2.5 rounded-2xl mr-3 shadow-lg shadow-indigo-200 group-hover:shadow-pink-400 group-hover:shadow-2xl transition-all duration-500 transform group-hover:rotate-6 group-hover:scale-110">
              <ShieldCheck className="h-7 w-7 text-white" />
              <div className="absolute inset-0 bg-white/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-pink-600 transition-all duration-300">
                AVN VENTURES
              </span>
              <span className="text-[10px] font-bold text-indigo-600 tracking-[0.2em] uppercase leading-tight group-hover:tracking-[0.3em] transition-all duration-300">
                Smart Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Menu with Special Hover Effects */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 overflow-hidden group/btn ${
                  isActive(link.path)
                    ? 'text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {/* Active State Background */}
                {isActive(link.path) && (
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 w-full h-full -z-10 animate-gradient-x"></span>
                )}
                
                {/* Hover Effect: Slide & Glow */}
                <span className={`absolute inset-0 bg-indigo-50 w-full h-full -z-10 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300 ${isActive(link.path) ? 'hidden' : 'block'}`}></span>
                <span className="relative z-10 group-hover/btn:tracking-wide transition-all duration-300">{link.label}</span>
                
                {/* Bottom Glow Line */}
                {!isActive(link.path) && (
                   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500"></span>
                )}
              </Link>
            ))}
            
            <Link
              to="/contact"
              className="ml-6 relative group overflow-hidden bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-sm shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-indigo-600 focus:outline-none p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white border-b border-slate-100 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100 shadow-lg' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-4 py-4 rounded-2xl text-base font-bold transition-all ${
                isActive(link.path)
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-inner border border-indigo-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600 hover:pl-6'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;