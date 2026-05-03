"use client";
import { useEffect, useState } from "react";
import { LeadData } from "@/lib/types";

export default function DemoLeadsPage(){
  const [leads, setLeads] = useState<LeadData[]>([]);
  useEffect(()=>{ setLeads(JSON.parse(localStorage.getItem("cwg-demo-leads") || "[]")); },[]);
  return <div className='space-y-6'>
    <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-sm'><p className='text-sm font-semibold uppercase tracking-wide text-blue-700'>Internal Demo</p><h1 className='mt-1 text-4xl font-bold text-slate-900'>CWG Sales Inbox Preview</h1><p className='mt-2 text-slate-600'>This preview shows the quality of leads collected by the AI ordering experience.</p></section>
    {leads.map((l,i)=><article key={i} className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2 text-sm'>
      <div className='flex flex-wrap items-center gap-2'><h2 className='text-lg font-semibold text-slate-900'>{l.fullName}</h2><span className='rounded-full bg-slate-100 px-3 py-1'>Lead Score: {l.leadScore}</span><span className='rounded-full bg-slate-100 px-3 py-1'>Project: {l.projectType}</span><span className='rounded-full bg-slate-100 px-3 py-1'>Send: {l.sendStatus}</span></div>
      <p><b>Contact:</b> {l.email} · {l.phone} · {l.company || '—'}</p>
      <p><b>Order Summary:</b> {l.orderDetails.productType} {l.orderDetails.quantity}</p>
      <p><b>Missing Info:</b> {l.orderDetails.missingInfo.join(', ')}</p>
      <p><b>Pricing Guidance:</b> {l.orderDetails.pricingGuidance}</p>
      <p><b>Internal Sales Note:</b> {l.salesNote}</p>
      <p><b>Suggested Sales Reply:</b> {l.suggestedSalesReply}</p>
      <p><b>Email Preview:</b> {l.emailPreview || 'Pending'}</p>
    </article>)}
    {!leads.length && <div className='rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600'>No demo leads yet. Submit one from Start AI Order.</div>}
  </div>
}
