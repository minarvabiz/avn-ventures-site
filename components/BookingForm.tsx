import React, { useState, useEffect } from 'react';
import { BookingFormData } from '../types';
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    serviceType: 'CCTV',
    address: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Form submitted:', formData);
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Request Received!</h2>
          <p className="text-lg text-slate-500 mb-8">
            Thank you, {formData.name}. Our team from AVN Ventures will contact you shortly at {formData.phone} to schedule a site visit.
          </p>
          <button 
            onClick={() => { setSubmitted(false); setFormData({...formData, name: '', phone: '', address: '', message: ''}) }}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          
          {/* Contact Info Side */}
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-slate-500 mb-10">
              Ready to upgrade your space? Fill out the form to register a service request. We provide free site inspections within Trivandrum.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600">
                    <MapPin className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-slate-900">Our Office</p>
                  <p className="mt-1 text-slate-500 leading-relaxed">
                    AVN VENTURES LLP, MP 20/537I,<br />
                    VST COMPLEX, THACHOTTUKAVU,<br />
                    MALAYINKEEZHU PO, TRIVANDRUM,<br />
                    KERALA
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600">
                    <Phone className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-slate-900">Phone</p>
                  <p className="mt-1 text-slate-500">+91 90745 90620</p>
                  <p className="text-sm text-indigo-600 mt-1 font-medium">Available 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600">
                    <Mail className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-slate-900">Email</p>
                  <p className="mt-1 text-slate-500">avnventuresllp@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-indigo-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Service Registration</h3>
              <p className="text-indigo-200 text-sm">Fill in the details below</p>
            </div>
            <div className="px-6 py-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-3"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-3"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-3"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-slate-700">Service Required</label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-3 bg-white"
                    value={formData.serviceType}
                    onChange={handleChange}
                  >
                    <option value="CCTV">CCTV Camera Installation</option>
                    <option value="Solar">Solar Panels & Inverters</option>
                    <option value="Home Automation">Home Automation</option>
                    <option value="Gate Automation">Gate Automation</option>
                    <option value="Service/Repair">Repair & Maintenance</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-slate-700">Site Address</label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    required
                    className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-3"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">Additional Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-3"
                    placeholder="E.g. Number of cameras needed, type of roof for solar..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;