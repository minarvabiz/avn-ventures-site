import React from 'react';

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string; // Short description for cards
  fullDescription: string; // Long description for detail page
  icon: React.ElementType;
  priceRange: string;
  features: string[];
  benefits: ServiceBenefit[];
  detailImages: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  address: string;
  message: string;
}
