import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeUrl = async (url: string): Promise<AnalysisResult> => {
  const model = "gemini-2.5-flash";
  
  const systemInstruction = `
    You are a world-class Technical SEO and Web Performance Expert. 
    Your job is to simulate a "Live Link Analyzer" scan for a given URL.
    
    Since you cannot directly browse the live DOM in real-time due to environment restrictions, 
    use your Search Grounding tool to find the most up-to-date technical information about the website, 
    including its tech stack, recent performance reports, and visible SEO metadata structure.
    
    Analyze the following aspects:
    1. SEO Health (Canonical, Title, Description, Robots)
    2. Performance (Simulate/Estimate Core Web Vitals based on typical performance for this type of site or search data)
    3. Security (HTTPS, HSTS, CSP headers)
    4. Tracking Scripts (Identify common analytics/ads usually found on this site)
    5. Tech Stack (CMS, Frameworks, Server)

    RETURN DATA FORMAT:
    You must return a raw JSON object string. Do not wrap it in markdown code blocks.
    The JSON structure must strictly follow this schema:

    {
      "url": "the input url",
      "overallScore": number (0-100),
      "summary": "3-sentence non-technical summary",
      "actionItems": ["action 1", "action 2"],
      "seo": {
        "canonical": "detected canonical url",
        "title": "page title",
        "titleStatus": "optimal" | "missing" | "too-long" | "too-short",
        "description": "meta description",
        "descriptionStatus": "optimal" | "missing" | "too-long" | "too-short",
        "robotsTxt": "status of robots.txt",
        "metaRobots": "detected meta robots tag",
        "brokenLinksEstimate": number (estimate count)
      },
      "performance": {
        "lcp": number (seconds),
        "cls": number (0.0-1.0),
        "ttfb": number (ms),
        "score": number (0-100),
        "imageIssues": ["issue 1", "issue 2"]
      },
      "security": {
        "https": boolean,
        "hsts": boolean,
        "xContentTypeOptions": boolean,
        "contentSecurityPolicy": boolean,
        "summary": "short security summary"
      },
      "tracking": {
        "thirdPartyScripts": [{"domain": "google-analytics.com", "category": "Analytics"}],
        "commonTrackers": ["Google Analytics", "FB Pixel"]
      },
      "techStack": {
        "platform": "WordPress/Shopify/Custom etc",
        "server": "Nginx/Apache/Vercel etc",
        "frameworks": ["React", "Vue", "Tailwind"]
      }
    }
  `;

  const prompt = `Analyze this URL: ${url}. Provide a realistic technical health report based on public knowledge and search results.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: systemInstruction,
        // responseMimeType: "application/json" // NOT allowed with googleSearch, so we parse manually
      },
    });

    const textResponse = response.text || "";
    
    // Clean up potential markdown formatting if Gemini adds it despite instructions
    const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedData: AnalysisResult;
    try {
      parsedData = JSON.parse(cleanJson);
    } catch (e) {
      console.error("JSON Parse Error", e);
      throw new Error("Failed to parse analysis results. Please try again.");
    }

    // Extract grounding sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingSources: GroundingSource[] = groundingChunks
      .map((chunk: any) => chunk.web ? { title: chunk.web.title, uri: chunk.web.uri } : null)
      .filter((item: any): item is GroundingSource => item !== null);

    return {
      ...parsedData,
      groundingSources
    };

  } catch (error) {
    console.error("Gemini Analysis Error", error);
    throw error;
  }
};