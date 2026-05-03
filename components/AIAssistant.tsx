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

  return <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-700">CWG AI Order Assistant</p><h2 className="text-2xl font-bold text-slate-900">Tell me what you’re trying to make.</h2></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{status}</span></div>
    <p className="text-slate-600">Need help with your order? Start your request in under 60 seconds. CWG will review and follow up with pricing and next steps.</p><div className="grid grid-cols-5 gap-2 text-xs">{["Contact","Project Type","Artwork","Details","Send Request"].map((step,idx)=><div key={step} className={`rounded-full px-2 py-1 text-center ${idx===0?"bg-blue-600 text-white":"bg-slate-100 text-slate-600"}`}>{step}</div>)}</div>
    <div className="grid gap-2 md:grid-cols-2">
      <input className="rounded-xl border border-slate-300 bg-white p-3" placeholder="Full name*" value={contact.fullName} onChange={(e)=>setContact({...contact, fullName:e.target.value})}/>
      <input className="rounded-xl border border-slate-300 bg-white p-3" placeholder="Email*" value={contact.email} onChange={(e)=>setContact({...contact, email:e.target.value})}/>
      <input className="rounded-xl border border-slate-300 bg-white p-3" placeholder="Phone*" value={contact.phone} onChange={(e)=>setContact({...contact, phone:e.target.value})}/>
      <input className="rounded-xl border border-slate-300 bg-white p-3" placeholder="Company" value={contact.company} onChange={(e)=>setContact({...contact, company:e.target.value})}/>
    </div>
    {done && <div><p className="text-sm mb-1">Great Ideas Mode</p><div className="flex flex-wrap gap-2">{modes.map((m)=><button key={m} className={`rounded-full border px-3 py-1 text-xs ${workflowMode===m?"border-blue-600 bg-blue-50 text-blue-700":"border-slate-300 bg-white text-slate-700"}`} onClick={()=>setWorkflowMode(m)}>{m}</button>)}</div></div>}
    <div className="max-h-56 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm space-y-2">{conversation.map((m,i)=><p key={i}><b>{m.role === "assistant" ? "AI" : "You"}:</b> {m.content}</p>)}</div>
    <div className="flex flex-wrap gap-2">{prompts.map((p)=><button key={p} onClick={()=>send(p)} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs hover:border-blue-300 hover:bg-blue-50">{p}</button>)}</div>
    <div className="flex flex-wrap gap-2">{industry.map((i)=><button key={i} onClick={()=>send(`Give me ${i} ideas in CWG categories.`)} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 hover:bg-slate-200">{i}</button>)}</div>
    <textarea value={msg} onChange={(e)=>setMsg(e.target.value)} className="h-24 w-full rounded-2xl border border-slate-300 bg-white p-3" placeholder="Tell our AI assistant what you’re trying to make."/>
    <div className="grid gap-2 md:grid-cols-3">{["Screen Printing","Embroidery","Ad Specialty / Promotional Item"].map((p)=> <button key={p} onClick={()=>setProjectType(p as ProjectType)} className={`rounded-2xl border p-3 text-left text-sm ${projectType===p?"border-blue-600 bg-blue-50":"border-slate-300 bg-white"}`}>{p}</button>)}</div><div className="flex gap-2"><button onClick={()=>send()} className="rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white shadow">Build My Request</button></div>
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
  return <div className='rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm space-y-3'>
    <div className='flex gap-2'><span className='rounded-full bg-white border border-slate-300 px-3 py-1'>Lead Score: {lead.leadScore}</span><span className='rounded-full bg-white border border-slate-300 px-3 py-1'>Mode: {lead.workflowMode || 'Standard'}</span><span className='rounded-full bg-white border border-slate-300 px-3 py-1'>Send: {lead.sendStatus}</span></div>
    <p><b>Product Direction</b></p><ul className='list-disc ml-5'><li>Budget-Friendly: {lead.orderDetails.productDirection.budgetFriendly}</li><li>Mid-Range: {lead.orderDetails.productDirection.midRange}</li><li>Premium: {lead.orderDetails.productDirection.premium}</li></ul>
    <p><b>Missing Information Checklist</b></p>
    <div className='grid md:grid-cols-2 gap-1'>{checklist.map((c)=><label key={c} className='flex items-center gap-2'><input type='checkbox' checked={!lead.orderDetails.missingInfo.includes(c)} readOnly/>{c}</label>)}</div>
    <p><b>Internal Sales Note:</b> {lead.salesNote}</p>
    <p><b>Suggested Sales Reply:</b> {lead.suggestedSalesReply}</p>
    <button onClick={sendToCWG} className='rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white shadow'>Send Request to CWG</button>
    {lead.emailPreview && <pre className='overflow-auto rounded-xl border border-slate-200 bg-white p-3 text-xs'>{lead.emailPreview}</pre>}
  </div>;
}
