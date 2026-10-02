export interface ClientAnalysis {
  clientName: string;
  businessCategory: string;
  mainProductsServices: string;
  targetAudience: string;
  brandStyle: string;
  socialPresence: string;
  promotionalContent: string;
  visualBranding: string;
  possibleDesignNeeds: string[];
  designOpportunity: string;
  whyItMatters: string;
  recommendedSolution: string;
  generatedMessage: string;
  isLimitedInfo?: boolean;
}

export interface DesignerProfile {
  name: string;
  role: string;
  experience: string;
  skills: string[];
}

export interface SavedAnalysisRecord {
  id: string;
  clientInput: string;
  clientName: string;
  businessCategory: string;
  designOpportunity: string;
  generatedMessage: string;
  timestamp: string;
}
