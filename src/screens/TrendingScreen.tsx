import { Flame, Star, MessageSquare, Briefcase, Zap, Compass, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { Company, Question } from '../types';

interface TrendingScreenProps {
  companies: Company[];
  questions: Question[];
  setActiveScreen: (screen: string, companyId?: string) => void;
}

export default function TrendingScreen({
  companies,
  questions,
  setActiveScreen
}: TrendingScreenProps) {
  
  // Static high momentum companies listed in the mockups
  const momentumList = [
    { name: 'CloudScale Dynamics', sector: 'Software Architecture', score: '4.8', badge: '+24% Velocity' },
    { name: 'Velocit Creative', sector: 'Digital Animation & Sound', score: '4.4', badge: '+18% Velocity' },
    { name: 'Synapse BioLabs', sector: 'Neural Diagnostics', score: '4.6', badge: '+12% Velocity' },
    { name: 'Aeris Space Systems', sector: 'Remote Orbit Mechanics', score: '4.7', badge: '+9% Velocity' },
    { name: 'TerraForma Ag Tech', sector: 'Hydroponic Systems Design', score: '4.1', badge: '+8% Velocity' }
  ];

  // hiring now vacancies
  const vacancies = [
    { title: 'Principal Platform Engineer', firm: 'Nebula AI', pay: '$190k - $240k', loc: 'San Francisco' },
    { title: 'Interactive Prototype Designer', firm: 'Veridian Creative', pay: '$110k - $145k', loc: 'Seattle' },
    { title: 'Staff Infrastructure Lead', firm: 'TechNova Solutions', pay: '$180k - $220k', loc: 'Palo Alto' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="trending-weekly-page">
      
      {/* Header title */}
      <div className="mb-8 space-y-2">
        <span className="text-[10px] font-bold tracking-widest text-[#6366f1] uppercase font-mono block">EDITORIAL PULSE</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Trending This Week
        </h1>
        <p className="text-xs text-slate-500 font-sans">
          Your weekly digest of workplace shifts, hiring loops, and high-velocity employer evaluations.
        </p>
      </div>

      {/* Primary Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Middle core pulse components */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Editorial abstract stylized wave banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between h-56 shadow-sm" id="editorial-pulse-banner">
            {/* Subtle floating circles in background to imitate editorial graphics */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute -bottom-10 left-10 w-48 h-48 bg-indigo-900 rounded-full blur-2xl opacity-20 pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <span className="text-[9px] font-bold tracking-widest text-indigo-400 uppercase font-mono bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-900 inline-block">
                Weekly Summary
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-display leading-tight max-w-lg">
                Compensation transparency is driving elevated levels of high-difficulty technical interviews.
              </h2>
              <p className="text-[11px] text-slate-400 font-sans max-w-sm">
                Candidates are prioritizing detailed timelines and recruiter response rates above traditional work titles.
              </p>
            </div>

            <div className="flex items-center space-x-1.5 text-[9px] font-mono text-indigo-400 relative z-10 pt-4" id="pulse-issue-tag">
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              <span>Issue No. 42 • Compiled June 2026</span>
            </div>
          </div>

          {/* Momentum Vetting list */}
          <div className="border border-slate-100 rounded-2xl bg-white p-6 space-y-4" id="momentum-companies-widget">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                Vetting Momentum
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Firms with the highest week-over-week peer evaluation uploads in June.</p>
            </div>

            <div className="space-y-3.5 pt-2" id="momentum-list-container">
              {momentumList.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-50 last:border-b-0 pb-3 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs text-slate-400 font-bold">{String(idx + 1).padStart(2, '0')}.</span>
                      <h4 className="font-bold text-slate-900 text-xs font-display">{item.name}</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 font-sans pl-6">{item.sector}</p>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {item.badge}
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Grade: {item.score} / 5.0</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar Widgets */}
        <aside className="space-y-6 lg:col-span-1">
          
          {/* Work Vacancies widget */}
          <div className="border border-slate-100 rounded-2xl bg-white p-5 space-y-4" id="hiring-now-widget">
            <h4 className="text-xs font-bold text-slate-950 font-display uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Briefcase className="w-3.5 h-3.5 text-slate-500" />
              Hiring Now
            </h4>

            <div className="space-y-4" id="vacancies-scannable">
              {vacancies.map((v, i) => (
                <div 
                  key={i} 
                  className="space-y-1.5 cursor-pointer hover:bg-slate-50 p-2 rounded-xl border border-transparent hover:border-slate-100 transition-all"
                  onClick={() => {
                    // Match query
                    const match = companies.find(c => c.name === v.firm);
                    if (match) {
                      setActiveScreen('company', match.id);
                    }
                  }}
                >
                  <p className="text-xs font-bold text-slate-900">{v.title}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>at {v.firm}</span>
                    <span>{v.pay}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">{v.loc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights discussions */}
          <div className="border border-slate-100 rounded-2xl bg-white p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 font-display uppercase tracking-widest">Active Discussions</h4>
            <div className="space-y-3 text-[11px] text-slate-500 font-sans" id="discussions-widget">
              <div className="border-b border-slate-50 pb-2">
                <p className="font-bold text-slate-800 leading-snug">"Does Nebula AI negotiate equity on initial product designer levels?"</p>
                <div className="flex items-center space-x-1 font-mono text-[9px] text-slate-400 mt-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>24 Responses</span>
                </div>
              </div>
              <div className="border-b border-slate-50 pb-2">
                <p className="font-bold text-slate-800 leading-snug">"What was the code assessment runtime limit for Stark General?"</p>
                <div className="flex items-center space-x-1 font-mono text-[9px] text-slate-400 mt-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>14 Responses</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
