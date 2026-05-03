export type ProjectType = "Screen Printing" | "Embroidery" | "Ad Specialty / Promotional Item" | "";
export type LeadScore = "Hot" | "Warm" | "Needs More Info";

export type LeadData = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  originalRequest: string;
  projectType: ProjectType;
  mode?: string;
  workflowMode?: string;
  orderDetails: {
    productType: string;
    quantity: string;
    colors: string[];
    decorationMethod: string;
    locations: string[];
    deadline: string;
    deliveryPreference: string;
    artworkStatus: string;
    needsDesignHelp: boolean;
    budgetLevel: string;
    pricingGuidance: string;
    productDirection: { budgetFriendly: string; midRange: string; premium: string };
    missingInfo: string[];
  };
  designBrief: string;
  salesNote: string;
  suggestedSalesReply: string;
  customerConfirmation: string;
  leadScore: LeadScore;
  sendStatus?: string;
  emailPreview?: string;
};
