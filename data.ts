import { Camera, Sun, Cpu, Settings } from 'lucide-react';
import { ServiceItem } from './types';

export const servicesData: ServiceItem[] = [
  {
    id: 'cctv',
    title: 'CCTV Surveillance',
    description: 'Advanced HD & IP cameras with remote mobile viewing. Keep an eye on your property from anywhere.',
    fullDescription: 'Experience peace of mind with our state-of-the-art CCTV surveillance systems. We provide comprehensive security solutions tailored for homes, offices, and industrial complexes. Our systems feature high-definition recording, night vision capabilities, and intelligent motion detection that sends instant alerts to your smartphone. Whether you need a single camera for your front door or a complex network for a large facility, our expert technicians ensure seamless installation and maintenance.',
    icon: Camera,
    priceRange: '₹15,000 - ₹50,000+',
    features: ['Night Vision', 'Motion Alerts', 'Cloud Storage', 'Mobile App'],
    benefits: [
      { title: "Remote Monitoring", description: "Watch live feeds from anywhere in the world using our dedicated mobile app." },
      { title: "Evidence Quality", description: "Crystal clear 4K and HD footage ensures every detail is captured for evidence." },
      { title: "Deterrence", description: "Visible security cameras significantly reduce the risk of break-ins and vandalism." },
      { title: "Smart Alerts", description: "Get notified instantly when suspicious motion is detected in restricted areas." }
    ],
    detailImages: [
      "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590486803833-1c5dc8ce84ac?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 'solar',
    title: 'Solar Energy',
    description: 'Cut electricity bills with Tier-1 solar panels. Sustainable energy for a brighter future.',
    fullDescription: 'Switch to green energy and drastically reduce your electricity bills with our premium solar power solutions. AVN Ventures partners with Tier-1 manufacturers like Tata Power and Adani Solar to bring you high-efficiency photovoltaic panels. We handle everything from structural feasibility analysis and subsidy paperwork to installation and net-metering connection. Our on-grid and hybrid systems are designed to last for over 25 years, providing you with free electricity and protection against rising tariff rates.',
    icon: Sun,
    priceRange: 'Approx ₹60,000 / kW',
    features: ['On-Grid Systems', 'Hybrid Inverters', 'Govt Subsidy', '25yr Warranty'],
    benefits: [
      { title: "Zero Electricity Bills", description: "Generate your own power and export excess to the grid for credit." },
      { title: "Government Subsidy", description: "We assist you in availing up to 40% subsidy (PM Surya Ghar) on residential installations." },
      { title: "Eco-Friendly", description: "Reduce your carbon footprint significantly by using clean, renewable energy." },
      { title: "Low Maintenance", description: "Solar panels require minimal maintenance while running efficiently for decades." }
    ],
    detailImages: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508514177221-188b1cf2f24f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 'home-auto',
    title: 'Home Automation',
    description: 'Smart lighting, climate control, and security at your fingertips. Voice control enabled.',
    fullDescription: 'Transform your living space into a futuristic smart home. Our automation solutions allow you to control lighting, fans, ACs, curtains, and entertainment systems with a single touch or voice command. Compatible with Google Assistant and Amazon Alexa, our systems are designed for convenience and luxury. Set "Scenes" like "Movie Mode" or "Good Night" to adjust your entire home environment instantly. We offer both retrofit solutions (for existing homes) and wired solutions (for new constructions).',
    icon: Cpu,
    priceRange: 'Starts @ ₹25,000',
    features: ['Voice Control', 'Smart Curtains', 'Scene Scheduling', 'Energy Saving'],
    benefits: [
      { title: "Convenience", description: "Control your entire home from your bed or even when you are away on vacation." },
      { title: "Energy Savings", description: "Automated schedules ensure lights and ACs are turned off when not in use." },
      { title: "Voice Control", description: "Hands-free control using Alexa or Google Home for a seamless experience." },
      { title: "Enhanced Security", description: "Smart door locks and video doorbells integrate perfectly with our systems." }
    ],
    detailImages: [
      "https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 'gate',
    title: 'Gate Automation',
    description: 'Automatic gate motors for sliding and swing gates. Convenience meets security.',
    fullDescription: 'Arrive in style and safety with our Gate Automation systems. No more getting out of your car in the rain to open the gate. We install heavy-duty motors for sliding gates, swing gates, and shutter doors. Our systems come with encrypted remote controls, safety sensors to prevent accidents, and optional smartphone control. Built to withstand Indian weather conditions, our motors are robust, quiet, and reliable.',
    icon: Settings,
    priceRange: '₹35,000 - ₹85,000',
    features: ['Remote Control', 'Safety Sensors', 'Heavy Duty', 'Manual Key'],
    benefits: [
      { title: "Safety & Security", description: "Keep your gate locked securely without manual intervention." },
      { title: "Weather Proof", description: "IP54 rated motors designed to withstand heavy rain and dust." },
      { title: "Emergency Release", description: "Includes manual release keys for operation during power failures." },
      { title: "Obstacle Detection", description: "Intelligent sensors stop the gate automatically if an obstacle is detected." }
    ],
    detailImages: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80"
    ]
  },
];