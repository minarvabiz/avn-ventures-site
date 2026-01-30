import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ContentProvider } from './contexts/ContentContext'; // Import Provider
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import ServiceDetail from './components/ServiceDetail';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import WhatsAppFloat from './components/WhatsAppFloat';
import ProcessTimeline from './components/ProcessTimeline';
import Admin from './components/Admin'; // Import Admin

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <HashRouter>
          <ScrollToTop />
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<Home />} />
              
              {/* Services Routes */}
              <Route path="/services" element={
                <>
                  <div className="bg-slate-900 pt-20 pb-12 text-center">
                      <h1 className="text-4xl font-bold text-white">Our Services & Pricing</h1>
                      <p className="text-indigo-300 mt-2">Transparent costs, premium quality.</p>
                  </div>
                  <Services showPricing={true} />
                  <div className="bg-slate-50 pb-20">
                     <ProcessTimeline />
                  </div>
                </>
              } />
              <Route path="/services/:id" element={<ServiceDetail />} />
              
              {/* Contact Route */}
              <Route path="/contact" element={<BookingForm />} />

              {/* Admin Route */}
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          <Footer />
          <Chatbot />
          <WhatsAppFloat />
        </HashRouter>
      </div>
    </ContentProvider>
  );
};

export default App;