import { NextResponse } from "next/server";
import { Resend } from "resend";

const recipients = ["brandonwesleycarter@gmail.com", "rod@customwerks.net"];

export async function POST(req: Request) {
  const lead = await req.json();
  const subject = `New CWG AI Website Quote Request — ${lead.fullName || lead.company || "New Lead"}`;
  const emailBody = JSON.stringify({ ...lead, timestamp: new Date().toISOString() }, null, 2);

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ status: "Demo Mode", preview: emailBody, recipients, subject, message: "Demo Mode: This lead would be sent to Brandon Carter and Rod at Custom Werks." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({ from: "onboarding@resend.dev", to: recipients, subject, text: emailBody });
  return NextResponse.json({ status: "Sent", message: "Thanks — your request has been sent to the CWG team. Someone will follow up with pricing, artwork next steps, and production details." });
}
