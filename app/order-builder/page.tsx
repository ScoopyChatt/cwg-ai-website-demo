import { AIAssistant } from "@/components/AIAssistant";

export default function Page(){return <div className='grid gap-6 lg:grid-cols-2'><AIAssistant page='Order Builder'/><div className='glass rounded-2xl p-5'><h2 className='text-2xl font-semibold'>Demo Lead Output Panel</h2><p className='text-slate-300 mt-2'>Shows captured contact details, project type, missing info, pricing guidance, internal sales note, and email preview/send state.</p><p className='mt-4 text-sm'>Use this for the Monday demo to show how AI qualifies and organizes quote requests.</p></div></div>}
