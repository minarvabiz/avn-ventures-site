import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Rahul Nair",
      location: "Kowdiar, Trivandrum",
      text: "AVN Ventures did a fantastic job with my CCTV installation. The clarity is amazing and the mobile app setup was very helpful. Highly recommended!",
      rating: 5
    },
    {
      name: "Dr. Susan Thomas",
      location: "Medical College PO",
      text: "I installed a 5KW Solar system for my clinic. The team handled all the subsidy paperwork. Very professional service.",
      rating: 5
    },
    {
      name: "Anil Kumar",
      location: "Peyad",
      text: "The automatic gate motor they installed is very smooth. It's a great convenience during rainy days. Good support team.",
      rating: 5
    }
  ];

  return (
    <div className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">Testimonials</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-black text-slate-900">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-indigo-100 group-hover:text-indigo-200 transition-colors" />
              <div className="flex space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 italic leading-relaxed">"{review.text}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-bold text-slate-900">{review.name}</p>
                  <p className="text-xs text-slate-500">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;