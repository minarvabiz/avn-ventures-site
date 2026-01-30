import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const AVN_SYSTEM_INSTRUCTION = `
You are the intelligent AI assistant for AVN Ventures, a premium technology service provider based in Trivandrum, Kerala.
Address: AVN VENTURES LLP, MP 20/537I, VST COMPLEX, THACHOTTUKAVU, MALAYINKEEZHU PO, TRIVANDRUM, KERALA.
Phone: +919074590620.
Email: avnventuresllp@gmail.com.

Your goal is to be helpful, polite, and professional. You speak English and Malayalam.

Services offered by AVN Ventures:
1. CCTV Camera Installation & Service (Security surveillance for homes and businesses).
2. Solar Panels & Inverters (Green energy solutions).
3. Home Automation (Smart lights, fans, centralized control).
4. Gate Automation (Remote controlled gates).

If asked about prices, give approximate ranges but emphasize that exact quotes require a site visit.
- CCTV: Starting from ₹15,000 for basic kits up to ₹1 Lakh+ for commercial.
- Solar: Approx ₹60,000 - ₹75,000 per KW depending on subsidy.
- Home Automation: Basic kits start at ₹25,000.
- Gate Automation: Starts around ₹35,000.

Always encourage the user to visit the "Booking" page to register a service request or call the phone number for immediate assistance.
`;

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const sendMessageToGemini = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // Convert generic history to Gemini format if needed, but for simple generateContent we can just append
    // For a better chat experience, we use chats.create logic or simple context concatenation.
    // Here we will use a fresh chat instance with history for context window management.
    
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview', // Fast and efficient for chat
      config: {
        systemInstruction: AVN_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently experiencing high traffic. Please call +919074590620 for immediate help.";
  }
};