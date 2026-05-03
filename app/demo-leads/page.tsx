"use client";
import { useEffect, useState } from "react";
import { LeadData } from "@/lib/types";

export default function DemoLeadsPage(){
  const [leads, setLeads] = useState<LeadData[]>([]);
  useEffect(()=>{ setLeads(JSON.parse(localStorage.getItem("cwg-demo-leads") || "[]")); },[]);
  return <div className='space-y-4'><h1 className='text-3xl font-bold'>Demo Leads / Sales Inbox</h1>{leads.map((l,i)=><div key={i} className='glass rounded-xl p-4 text-sm space-y-1'><p><b>{l.fullName}</b> · {l.email} · {l.phone} · {l.company}</p><p><b>Project:</b> {l.projectType} | <b>Lead Score:</b> {l.leadScore} | <b>Send:</b> {l.sendStatus}</p><p><b>Order:</b> {l.orderDetails.productType} {l.orderDetails.quantity}</p><p><b>Missing Info:</b> {l.orderDetails.missingInfo.join(', ')}</p><p><b>Internal Sales Note:</b> {l.salesNote}</p><p><b>Suggested Sales Reply:</b> {l.suggestedSalesReply}</p><p><b>Email Preview:</b> {l.emailPreview || 'Pending'}</p></div>)}{!leads.length && <p>No demo leads yet. Submit one from the Order Builder.</p>}</div>
}
