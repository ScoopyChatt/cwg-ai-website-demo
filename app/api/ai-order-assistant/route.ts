import { NextResponse } from "next/server";

const categories = ["Best Sellers", "Awards & Recognition", "Trade Shows", "Sports", "Banking", "Everyday Use", "Back to School", "Health and Wellness", "Corporate Gifts", "Drinkware", "Bags", "Headwear", "Apparel", "Technology Items"];

function scoreLead(body: any): "Hot" | "Warm" | "Needs More Info" {
  const points = [body.contactDetails?.fullName, body.contactDetails?.email, body.contactDetails?.phone, body.projectType, body.currentOrderState?.quantity, body.currentOrderState?.deadline, body.currentOrderState?.artworkStatus, body.currentOrderState?.budgetLevel].filter(Boolean).length;
  if (points >= 7) return "Hot";
  if (points >= 5) return "Warm";
  return "Needs More Info";
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userMessage, contactDetails, projectType, workflowMode } = body;
  const contactComplete = Boolean(contactDetails?.fullName && /.+@.+\..+/.test(contactDetails?.email || "") && contactDetails?.phone);

  if (!contactComplete) return NextResponse.json({ mode: process.env.OPENAI_API_KEY ? "OpenAI-ready" : "Demo Mode", assistantMessage: "Absolutely — I can help with that. First, I’ll need your name, email, and phone number so the CWG team can follow up with accurate pricing and next steps.", contactComplete: false, orderDetails: null });

  const message = String(userMessage || "").toLowerCase();
  const detectedProject = projectType || (message.includes("embroider") ? "Embroidery" : message.includes("giveaway") || message.includes("promo") ? "Ad Specialty / Promotional Item" : "Screen Printing");
  const isIdeas = workflowMode === "Help me find ideas";
  const isRush = workflowMode === "I need a rush/in-stock option";
  const isReorder = workflowMode === "I want to reorder something";

  const assistantMessage = isIdeas
    ? "Great Ideas Mode is on. Who is the audience, what is the event/purpose, your budget per item, quantity, deadline, and desired impression (budget-friendly, practical, premium, unique, fun, or professional)?"
    : isRush
      ? "Need it fast? Please share event date, in-hands date, quantity, product flexibility, preferred decoration method, pickup or shipping, and if you're open to in-stock alternatives."
      : isReorder
        ? "Reorder mode: what did you order before, what should change, new quantity, deadline, and is artwork the same?"
        : "Thanks. What type of project can I help you with today? Choose Screen Printing, Embroidery, or Ad Specialty / Promotional Item. Do you already have artwork or need design help?";

  return NextResponse.json({
    mode: process.env.OPENAI_API_KEY ? "OpenAI-ready" : "Demo Mode",
    assistantMessage,
    contactComplete: true,
    projectType: detectedProject,
    orderDetails: {
      productType: detectedProject === "Ad Specialty / Promotional Item" ? "Trade show giveaways" : "T-shirts",
      quantity: message.match(/\d+/)?.[0] || "",
      colors: ["White", "Grey"],
      decorationMethod: detectedProject,
      locations: ["Front left chest", "Full back"],
      deadline: "",
      deliveryPreference: "",
      artworkStatus: "Need confirmation",
      needsDesignHelp: true,
      budgetLevel: "Not sure yet",
      pricingGuidance: "CWG will confirm final pricing, product availability, artwork requirements, and turnaround time.",
      productDirection: {
        budgetFriendly: "Entry-level blanks or value promo catalog picks.",
        midRange: "Better hand-feel garments or upgraded everyday promo items.",
        premium: "Retail-grade apparel or high-impact premium gifting products."
      },
      missingInfo: ["size breakdown", "artwork/logo file", "deadline", "budget level", "product style preference", "ink/thread colors", "delivery/pickup preference"]
    },
    designBrief: "Collect style preference, text, colors, audience, and inspiration before proofing.",
    salesNote: `Workflow: ${workflowMode || "Standard"}. Gather missing production details before quote finalization.`,
    suggestedSalesReply: `Hi ${contactDetails.fullName}, thanks for your request. We’re reviewing options now and will follow up with product recommendations, confirmed pricing ranges, artwork requirements, and timing details shortly.`,
    customerConfirmation: `Thanks, ${contactDetails.fullName}. We have the basics of your request. CWG will review and follow up with confirmed pricing, artwork requirements, and next steps.`,
    leadScore: scoreLead({ contactDetails, projectType: detectedProject, currentOrderState: body.currentOrderState }),
    suggestedPrompts: isIdeas ? categories.slice(0, 5) : ["I need 124 white and grey t-shirts with a front left chest and full back print"]
  });
}
