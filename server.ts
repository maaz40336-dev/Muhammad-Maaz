import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI client (server-side only)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper: Safely fetch public metadata from a website URL if provided
async function fetchPublicWebsiteData(inputUrl: string): Promise<{ title?: string; description?: string; accessible: boolean }> {
  try {
    let target = inputUrl.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = `https://${target}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(target, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return { accessible: false };
    }

    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch =
      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);

    const title = titleMatch ? titleMatch[1].trim() : undefined;
    const description = descMatch ? descMatch[1].trim() : undefined;

    return {
      title,
      description,
      accessible: !!(title || description),
    };
  } catch {
    return { accessible: false };
  }
}

// API: Analyze Client & Generate Personalized Message
app.post('/api/analyze-client', async (req, res) => {
  try {
    const { clientInput, customInstructions } = req.body;

    if (!clientInput || typeof clientInput !== 'string' || !clientInput.trim()) {
      res.status(400).json({ success: false, error: 'Please enter client information.' });
      return;
    }

    const rawInput = clientInput.trim();

    // Check if input looks like a website or URL
    let publicWebDetails = '';
    const isUrl =
      rawInput.startsWith('http://') ||
      rawInput.startsWith('https://') ||
      rawInput.includes('.com') ||
      rawInput.includes('.org') ||
      rawInput.includes('.net') ||
      rawInput.includes('.co') ||
      rawInput.includes('.io') ||
      rawInput.includes('.store') ||
      rawInput.includes('.ae') ||
      rawInput.includes('.pk');

    if (isUrl) {
      const webResult = await fetchPublicWebsiteData(rawInput);
      if (webResult.accessible) {
        publicWebDetails = `Public Website Metadata extracted from page:
- Page Title: "${webResult.title || 'N/A'}"
- Meta Description: "${webResult.description || 'N/A'}"`;
      } else {
        publicWebDetails = `Website check: The domain was recognized but internal page content could not be deeply fetched. Base analysis strictly on the visible URL/domain name. Do NOT invent unverified features.`;
      }
    }

    const prompt = `
You are the AI Client Research & Graphic Design Outreach Strategist for Muhammad Maaz.

MY PROFESSIONAL PROFILE:
Name: Muhammad Maaz
Role: Freelance Graphic Designer
Experience: 1 year
Skills:
- Photoshop
- Illustrator
- Canva
- Logo Design
- Brand Design
- Posters
- Flyers
- Social Media Graphics
- Restaurant Menu Design
- YouTube Thumbnails
- Basic UI/UX

CLIENT INPUT PROVIDED BY USER:
"""
${rawInput}
"""

${publicWebDetails ? `ADDITIONAL ACCESSIBLE CONTEXT:\n${publicWebDetails}\n` : ''}
${customInstructions ? `USER REGENERATION INSTRUCTION:\n${customInstructions}\n` : ''}

ANALYSIS INSTRUCTIONS:
1. Analyze ONLY the information that is actually available from the input and accessible metadata.
2. Identify:
   - Client / business name
   - Business category
   - Main products or services (if identifiable, otherwise "Not enough public information available.")
   - Target audience (if identifiable, otherwise "Not enough public information available.")
   - Brand style (if identifiable, otherwise "Not enough public information available.")
   - Social-media presence (based on input)
   - Promotional content
   - Visual branding
   - Possible graphic-design needs
   - Specific opportunities where professional graphic design could add genuine value
3. NEVER invent facts. Do NOT fabricate previous interactions, metrics, or non-existent design flaws.
4. If information is unavailable, clearly state: "Not enough public information available."
5. If there is not enough information to identify a real design opportunity, set designOpportunity to: "Not enough information to identify a specific design opportunity."
6. Do NOT insult or negatively criticize the client's existing design (never say "Your designs are bad"). Use constructive, professional wording like "I noticed an opportunity to make your promotional visuals more consistent and engaging."

POSSIBLE DESIGN OPPORTUNITIES TO CONSIDER:
- Social media graphics
- Promotional posts
- Business posters
- Event graphics
- Flyers
- Product advertisements
- Restaurant menu design
- Brand identity
- Logo improvements
- YouTube thumbnails
- LinkedIn banners
- Instagram promotional content
- Facebook advertising graphics
- Packaging design
- Campaign visuals

MESSAGE GENERATION RULES:
Create a personalized outreach message that strictly follows this 6-part structure:
1. Personalized opening based on the client's actual business.
2. Mention a genuine problem or design opportunity.
3. Explain how professional graphic design can solve or improve it.
4. Briefly introduce me: "My name is Muhammad Maaz, a freelance graphic designer with 1 year of hands-on experience..."
5. Mention ONLY the skills from my list that are directly relevant to that specific client (e.g. if a cafe/restaurant, mention menu design, posters, Canva, Illustrator; if a creator, mention YouTube thumbnails, social graphics, Photoshop; if a corporate brand, mention brand design, logo design).
6. End with a simple, natural, low-pressure call to action (e.g. asking if they'd be open to seeing a sample mockup or quick idea).

CRITICAL CONSTRAINTS:
- Do NOT make the message sound like mass spam.
- Do NOT use exaggerated claims or hype.
- Do NOT invent previous interactions with the client.
- Do NOT claim to have reviewed something that you could not actually access.
- Keep the message concise, natural, and professional.

Return a JSON object matching this exact schema:
{
  "clientName": "Extracted or inferred client name (e.g. 'Bella Cucina Cafe', or 'Business Owner' if unknown)",
  "businessCategory": "Specific business category or niche (e.g. 'Artisanal Bakery & Cafe')",
  "mainProductsServices": "Summary of main offerings or 'Not enough public information available.'",
  "targetAudience": "Identifiable target audience or 'Not enough public information available.'",
  "brandStyle": "Observed visual/brand style or 'Not enough public information available.'",
  "socialPresence": "Observed platform presence based on input",
  "promotionalContent": "Promotional observations or 'Not enough public information available.'",
  "visualBranding": "Visual branding observations or 'Not enough public information available.'",
  "possibleDesignNeeds": ["Design need 1", "Design need 2", "Design need 3"],
  "designOpportunity": "Specific opportunity identified (e.g. 'Creating a high-contrast seasonal menu design and cohesive Instagram promotional flyers')",
  "whyItMatters": "Short 1-2 sentence explanation of why this opportunity benefits their business",
  "recommendedSolution": "Specific graphic-design solution tailored to Muhammad Maaz's skills",
  "generatedMessage": "The complete, ready-to-use personalized outreach message.",
  "isLimitedInfo": boolean (true if input is very brief or lacks detail, false if rich)
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsedData = JSON.parse(text);

    res.json({
      success: true,
      analysis: parsedData,
    });
  } catch (error: any) {
    console.error('Error analyzing client:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze client information.',
    });
  }
});

// API: Regenerate personalized message with alternative angles or instructions
app.post('/api/regenerate-message', async (req, res) => {
  try {
    const { clientAnalysis, stylePreference } = req.body;

    if (!clientAnalysis) {
      res.status(400).json({ success: false, error: 'Client analysis is required to regenerate.' });
      return;
    }

    const prompt = `
You are the AI Outreach Strategist for:
Name: Muhammad Maaz
Role: Freelance Graphic Designer
Experience: 1 year
Skills: Photoshop, Illustrator, Canva, Logo Design, Brand Design, Posters, Flyers, Social Media Graphics, Restaurant Menu Design, YouTube Thumbnails, Basic UI/UX

CLIENT CONTEXT:
Client Name: ${clientAnalysis.clientName}
Business: ${clientAnalysis.businessCategory}
Design Opportunity: ${clientAnalysis.designOpportunity}
Why It Matters: ${clientAnalysis.whyItMatters}
Recommended Solution: ${clientAnalysis.recommendedSolution}
Style Preference: ${stylePreference || 'Balanced & Direct'}

Generate another fresh, highly personalized outreach message following the exact 6-part structure:
1. Personalized opening based on the client's actual business.
2. Mention the genuine design opportunity: "${clientAnalysis.designOpportunity}".
3. Explain how professional graphic design improves it without insulting their current visuals.
4. Briefly introduce Muhammad Maaz (Freelance Graphic Designer, 1 year experience).
5. Mention ONLY the skills relevant to this specific client.
6. End with a simple, natural call to action.

RULES:
- No mass spam phrasing.
- No exaggerated claims.
- Natural, concise, professional.
- Output JSON: { "generatedMessage": "..." }
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);

    res.json({
      success: true,
      generatedMessage: parsed.generatedMessage,
    });
  } catch (error: any) {
    console.error('Error regenerating message:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to regenerate message.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`);
  });
}

startServer();
