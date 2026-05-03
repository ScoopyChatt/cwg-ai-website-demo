"use client";
import { useState } from "react";
import { LeadData, ProjectType } from "@/lib/types";

const prompts = ["I need shirts for an event", "I need embroidered polos for my team", "Help me find customer gifts", "I have a logo but need design help", "I need trade show giveaways"];
const industry = ["Schools", "Sports Teams", "Banks", "Churches", "Construction", "Healthcare", "Hotels", "Restaurants", "Trade Shows", "Corporate Gifts", "Employee Appreciation"];
const modes = ["I know what I want", "Help me find ideas", "I need a rush/in-stock option", "I want to reorder something", "I need help with artwork/design"];

export function AIAssistant({ page }: { page: string }) {
  const [contact, setContact] = useState({ fullName: "", email: "", phone: "", company: "" });
  const [workflowMode, setWorkflowMode] = useState("");
  const [msg, setMsg] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("");
  const [conversation, setConversation] = useState([{ role: "assistant", content: "Hi — I can help you start a custom order, find the right product, or get your project ready for the CWG team. First, I’ll need your name, email, and phone number so we can follow up with accurate pricing and next steps." }]);
  const [lead, setLead] = useState<LeadData | null>(null);
  const [status, setStatus] = useState("Demo Mode");
  const done = !!(contact.fullName && /.+@.+\..+/.test(contact.email) && contact.phone);

  async function send(text?: string) {
    const userMessage = text ?? msg;
    if (!userMessage.trim()) return;
    setConversation((c) => [...c, { role: "user", content: userMessage } as any]);
    setMsg("");
    const r = await fetch("/api/ai-order-assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPage: page, userMessage, contactDetails: contact, projectType, workflowMode, currentOrderState: lead?.orderDetails }) });
    const data = await r.json();
    setConversation((c) => [...c, { role: "assistant", content: data.assistantMessage } as any]);
    setStatus(data.mode);
    if (data.orderDetails) {
      const newLead: LeadData = { fullName: contact.fullName, email: contact.email, phone: contact.phone, company: contact.company, originalRequest: userMessage, projectType: data.projectType || "", orderDetails: data.orderDetails, designBrief: data.designBrief, salesNote: data.salesNote, suggestedSalesReply: data.suggestedSalesReply, customerConfirmation: data.customerConfirmation, leadScore: data.leadScore, mode: data.mode, workflowMode, sendStatus: "Needs Confirmation" };
      setLead(newLead);
      const existing = JSON.parse(localStorage.getItem("cwg-demo-leads") || "[]");
      localStorage.setItem("cwg-demo-leads", JSON.stringify([newLead, ...existing].slice(0, 50)));
    }
  }

  return <section className="glass rounded-2xl p-5 space-y-3">
    <div className="flex justify-between"><span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs">AI Order Assistant</span><span className="text-xs">{status}</span></div>
    <h2 className="text-2xl font-semibold">Need help with your order?</h2>
    <p className="text-slate-300">This AI assistant helps us with organized quote requests by collecting project type, artwork status, quantity, deadline, design needs, and order details before routing to CWG.</p>
    <div className="grid gap-2 md:grid-cols-2">
      <input className="rounded bg-slate-800 p-2" placeholder="Full name*" value={contact.fullName} onChange={(e)=>setContact({...contact, fullName:e.target.value})}/>
      <input className="rounded bg-slate-800 p-2" placeholder="Email*" value={contact.email} onChange={(e)=>setContact({...contact, email:e.target.value})}/>
      <input className="rounded bg-slate-800 p-2" placeholder="Phone*" value={contact.phone} onChange={(e)=>setContact({...contact, phone:e.target.value})}/>
      <input className="rounded bg-slate-800 p-2" placeholder="Company" value={contact.company} onChange={(e)=>setContact({...contact, company:e.target.value})}/>
    </div>
    {done && <div><p className="text-sm mb-1">Great Ideas Mode</p><div className="flex flex-wrap gap-2">{modes.map((m)=><button key={m} className={`rounded border px-2 py-1 text-xs ${workflowMode===m?"bg-brand-500/30":""}`} onClick={()=>setWorkflowMode(m)}>{m}</button>)}</div></div>}
    <div className="max-h-56 overflow-y-auto rounded bg-slate-950 p-3 text-sm space-y-1">{conversation.map((m,i)=><p key={i}><b>{m.role === "assistant" ? "AI" : "You"}:</b> {m.content}</p>)}</div>
    <div className="flex flex-wrap gap-2">{prompts.map((p)=><button key={p} onClick={()=>send(p)} className="rounded border px-2 py-1 text-xs">{p}</button>)}</div>
    <div className="flex flex-wrap gap-2">{industry.map((i)=><button key={i} onClick={()=>send(`Give me ${i} ideas in CWG categories.`)} className="rounded bg-slate-800 px-2 py-1 text-xs">{i}</button>)}</div>
    <textarea value={msg} onChange={(e)=>setMsg(e.target.value)} className="h-24 w-full rounded bg-slate-800 p-2" placeholder="Tell our AI assistant what you’re trying to make."/>
    <div className="flex gap-2"><button onClick={()=>send()} className="rounded bg-brand-500 px-4 py-2">Send</button><select value={projectType} onChange={(e)=>setProjectType(e.target.value as ProjectType)} className="rounded bg-slate-800 p-2"><option value="">Project Type</option><option>Screen Printing</option><option>Embroidery</option><option>Ad Specialty / Promotional Item</option></select></div>
    {lead && <LeadView lead={lead} setLead={setLead} />}
  </section>;
}

function LeadView({ lead, setLead }: { lead: LeadData; setLead: (l: LeadData)=>void }) {
  async function sendToCWG() {
    const r = await fetch('/api/send-order-lead', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(lead)});
    const data = await r.json();
    setLead({...lead, sendStatus: data.status, emailPreview: data.preview || data.message});
  }
  const checklist = ["size breakdown", "artwork/logo file", "deadline", "budget level", "product style preference", "ink/thread colors", "delivery/pickup preference"];
  return <div className='rounded border border-slate-700 p-4 text-sm space-y-2'>
    <div className='flex gap-2'><span className='rounded bg-slate-800 px-2 py-1'>Lead Score: {lead.leadScore}</span><span className='rounded bg-slate-800 px-2 py-1'>Mode: {lead.workflowMode || 'Standard'}</span><span className='rounded bg-slate-800 px-2 py-1'>Send: {lead.sendStatus}</span></div>
    <p><b>Product Direction</b></p><ul className='list-disc ml-5'><li>Budget-Friendly: {lead.orderDetails.productDirection.budgetFriendly}</li><li>Mid-Range: {lead.orderDetails.productDirection.midRange}</li><li>Premium: {lead.orderDetails.productDirection.premium}</li></ul>
    <p><b>Missing Information Checklist</b></p>
    <div className='grid md:grid-cols-2 gap-1'>{checklist.map((c)=><label key={c} className='flex items-center gap-2'><input type='checkbox' checked={!lead.orderDetails.missingInfo.includes(c)} readOnly/>{c}</label>)}</div>
    <p><b>Internal Sales Note:</b> {lead.salesNote}</p>
    <p><b>Suggested Sales Reply:</b> {lead.suggestedSalesReply}</p>
    <button onClick={sendToCWG} className='rounded bg-brand-500 px-4 py-2'>Send Request to CWG</button>
    {lead.emailPreview && <pre className='overflow-auto rounded bg-slate-950 p-3 text-xs'>{lead.emailPreview}</pre>}
  </div>;
}
