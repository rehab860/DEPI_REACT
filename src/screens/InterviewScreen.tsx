import { useState, FormEvent } from 'react';
import { ArrowLeft, MessageSquare, ThumbsUp, Plus, Sliders, Play, Sparkles, Send, BrainCircuit, CheckCircle } from 'lucide-react';
import { Company, Question } from '../types';

interface InterviewScreenProps {
  company: Company;
  questions: Question[];
  onAddQuestion: (question: {text: string, department: string, difficulty: 'Easy' | 'Medium' | 'Hard', author: string}) => void;
  onUpvoteQuestion: (questionId: string) => void;
  setActiveScreen: (screen: string, companyId?: string) => void;
}

export default function InterviewScreen({
  company,
  questions,
  onAddQuestion,
  onUpvoteQuestion,
  setActiveScreen
}: InterviewScreenProps) {
  
  const [activeDept, setActiveDept] = useState<string>('All');
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [newDifficulty, setNewDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  
  // Expandable reply map
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  // AI Mocking Assistant
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Filter questions for this company
  const companyQuestions = questions.filter(q => q.companyId === company.id);

  // Get department badges sizes
  const engineeringCount = companyQuestions.filter(q => q.department === 'Engineering').length;
  const productCount = companyQuestions.filter(q => q.department === 'Product').length;
  const designCount = companyQuestions.filter(q => q.department === 'Design').length;
  const operationsCount = companyQuestions.filter(q => q.department === 'Operations').length;

  // Filtered Questions by sidebar selection
  const filteredQuestions = companyQuestions.filter(q => {
    if (activeDept === 'All') return true;
    return q.department === activeDept;
  });

  const toggleExpand = (qId: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newQuestionText.trim()) {
      onAddQuestion({
        text: newQuestionText.trim(),
        department: newDept,
        difficulty: newDifficulty,
        author: 'Anonymous Candidate'
      });
      setNewQuestionText('');
      setIsAdding(false);
    }
  };

  const handleAiPrep = (e: FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    setAiResponse(null);

    // Simulate direct server prompt or clean generator responses
    setTimeout(() => {
      setAiResponse(
        `Here is your recommended tailored answer blueprint for "${aiPrompt}":\n\n` +
        `1. STAR Framework Approach: Begin by highlighting a specific enterprise project (10%). Describe the scaling bottlenecks you confronted (30%). Detail the specific architectural decisions and data structures implemented (40%), and wrap up with quantifiable outcome metrics (20%).\n` +
        `2. Technical Highlights: If engineering, mention database read/write ratios, eventual consistency issues, fallback caches, or throttling limits.`
      );
      setAiLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="interview-repository-page">
      
      {/* Structural Back Navigation */}
      <button
        onClick={() => setActiveScreen('company', company.id)}
        className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
        id="back-to-company"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to {company.name} Profile</span>
      </button>

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 mb-8">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono block">INTERVIEW REPOSITORY</span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            Interview Questions for {company.name}
          </h1>
          <p className="text-xs text-slate-500 font-sans max-w-xl">
            Browse real interview questions submitted by candidates, complete with verified peer answers, expert blueprints, and difficulty grading.
          </p>
        </div>

        {/* Trigger form addition */}
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 shadow-xs cursor-pointer"
          id="add-question-trigger"
        >
          <Plus className="w-4 h-4" />
          <span>Add a Question</span>
        </button>
      </div>

      {/* Conditional Questionnaire Addition Form */}
      {isAdding && (
        <div className="border border-indigo-100 rounded-2xl bg-indigo-50/50 p-6 mb-8 max-w-3xl animate-fadeIn" id="add-question-panel">
          <h3 className="text-xs font-bold tracking-wide uppercase text-indigo-900 font-display mb-3">Submit Candidate Question</h3>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold font-mono tracking-wider text-slate-500 uppercase block mb-1">Question Content</label>
              <textarea
                required
                rows={3}
                placeholder="What did they ask you regarding system architecture, product management case logs, or visual portfolio critique?"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                className="w-full text-xs font-sans rounded-xl border border-indigo-200 bg-white p-3.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold font-mono tracking-wider text-slate-500 uppercase block mb-1">Target Department</label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full text-xs bg-white border border-indigo-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold font-mono tracking-wider text-slate-500 uppercase block mb-1">Complexity</label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value as any)}
                  className="w-full text-xs bg-white border border-indigo-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border rounded-xl hover:bg-white text-xs font-semibold text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Submit to Repository
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Structural Work Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Department Navigation */}
        <aside className="space-y-6 lg:col-span-1" id="interview-sidebar">
          
          {/* Department List List */}
          <div className="border border-slate-100 rounded-2xl bg-white p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 tracking-wider font-display uppercase border-b border-slate-100 pb-2">
              Departments
            </h3>
            
            <div className="space-y-1" id="dept-navigation-stack">
              {/* All */}
              <button
                onClick={() => setActiveDept('All')}
                className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-xl transition-all ${
                  activeDept === 'All'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>All Disciplines</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  activeDept === 'All' ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {companyQuestions.length}
                </span>
              </button>

              {/* Engineering */}
              <button
                onClick={() => setActiveDept('Engineering')}
                className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-xl transition-all ${
                  activeDept === 'Engineering'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>Engineering</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  activeDept === 'Engineering' ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {engineeringCount}
                </span>
              </button>

              {/* Product */}
              <button
                onClick={() => setActiveDept('Product')}
                className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-xl transition-all ${
                  activeDept === 'Product'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>Product</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  activeDept === 'Product' ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {productCount}
                </span>
              </button>

              {/* Design */}
              <button
                onClick={() => setActiveDept('Design')}
                className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-xl transition-all ${
                  activeDept === 'Design'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>Design</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  activeDept === 'Design' ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {designCount}
                </span>
              </button>

              {/* Operations */}
              <button
                onClick={() => setActiveDept('Operations')}
                className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-xl transition-all ${
                  activeDept === 'Operations'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>Operations</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  activeDept === 'Operations' ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {operationsCount}
                </span>
              </button>
            </div>
          </div>

          {/* Prepare for Success Editorial box */}
          <div className="border border-slate-100 rounded-2xl bg-white p-5 space-y-3" id="prepare-success-card">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider font-display uppercase">Prepare for Success</h4>
            <div className="text-[11px] text-slate-500 space-y-2 leading-relaxed">
              <p>Peer insights indicate TechNova values rigorous documentation design and analytical clarity.</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Review distributed caching schemes.</li>
                <li>Practice product case metrics frameworks.</li>
                <li>Verify your interactive design prototypes.</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Middle Core Questions Feed List */}
        <section className="lg:col-span-2 space-y-4" id="questions-primary-feed">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => {
              const isOpen = expandedQuestions[q.id] || false;
              return (
                <div 
                  key={q.id} 
                  className="border border-slate-100 rounded-2xl bg-white p-5 sm:p-6 space-y-4"
                  id={`question-box-${q.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      {/* Dept & level badges */}
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold font-mono text-indigo-600 uppercase tracking-widest">
                          {q.department}
                        </span>
                        <span className="text-slate-200">•</span>
                        <span className={`text-[10px] font-bold font-mono px-2 py-0.2 rounded-full border uppercase ${
                          q.difficulty === 'Hard' ? 'bg-red-50 text-red-700 border-red-100' :
                          q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          {q.difficulty} Complexity
                        </span>
                      </div>
                      
                      {/* Question Text */}
                      <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                        "{q.text}"
                      </h3>

                      <p className="text-[10px] text-slate-400 font-mono">
                        Posted by {q.author} • {q.date}
                      </p>
                    </div>
                  </div>

                  {/* Community Verified Answer Box */}
                  {q.communityAnswer && (
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">Community Approved Strategy</span>
                      </div>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        {q.communityAnswer}
                      </p>
                    </div>
                  )}

                  {/* Expandable replies list */}
                  {isOpen && q.replies && q.replies.length > 0 && (
                    <div className="pl-4 border-l-2 border-slate-100 space-y-3 pt-2 animate-fadeIn" id={`replies-list-${q.id}`}>
                      {q.replies.map((reply, i) => (
                        <div key={i} className="text-xs space-y-1">
                          <div className="flex items-center space-x-1.5 font-mono text-[10px] text-slate-400">
                            <span className="font-semibold text-slate-700">{reply.author}</span>
                            <span>({reply.role})</span>
                            <span>•</span>
                            <span>{reply.date}</span>
                          </div>
                          <p className="text-slate-500 font-sans">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Footer vote and response toggler triggers */}
                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-50" id={`q-footer-${q.id}`}>
                    <button
                      onClick={() => onUpvoteQuestion(q.id)}
                      className="flex items-center space-x-1.5 text-slate-400 hover:text-slate-900 cursor-pointer border border-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-50"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-mono">{q.upvotes} Upvotes</span>
                    </button>

                    {q.replies && q.replies.length > 0 && (
                      <button
                        onClick={() => toggleExpand(q.id)}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                      >
                        {isOpen ? 'Collapse Responses' : `View ${q.repliesCount} Responses`}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-white text-xs text-slate-400" id="empty-questions-state">
              No interview questions found under the selected department. Be the first to add one!
            </div>
          )}
        </section>

        {/* Right Sidebar AI helper and links */}
        <aside className="space-y-6 lg:col-span-1">
          
          {/* AI Prep Planner Assistant Sidebar block */}
          <div className="border border-indigo-100 rounded-2xl bg-indigo-50/50 p-5 space-y-4" id="ai-prep-model-widget">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-2xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-bold tracking-widest text-indigo-600 uppercase font-mono block">AI PLANNER</span>
                <h4 className="text-xs font-bold text-indigo-950 font-display uppercase">Instant prep blueprint</h4>
              </div>
            </div>
            
            <p className="text-[11px] text-indigo-700 font-sans leading-relaxed">
              Identify the core topics of your upcoming candidate interview to extract a custom response playbook model.
            </p>

            <form onSubmit={handleAiPrep} className="space-y-2">
              <input
                type="text"
                required
                placeholder="e.g. System Design for Logistics"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full text-xs font-sans rounded-xl border border-indigo-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:bg-white"
              />
              <button
                type="submit"
                disabled={aiLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-xs font-bold py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 shadow-2xs"
              >
                <span>{aiLoading ? 'Synthesizing...' : 'Draft Preparation Model'}</span>
              </button>
            </form>

            {aiResponse && (
              <div className="bg-white border border-indigo-100 rounded-xl p-3 text-[11px] text-slate-600 leading-relaxed max-h-48 overflow-y-auto animate-fadeIn uppercase-none font-sans mt-3 space-y-2">
                <p className="font-semibold text-slate-800">{aiResponse}</p>
              </div>
            )}
          </div>

          {/* Scannable Recently Asked repository list */}
          <div className="border border-slate-100 rounded-2xl bg-white p-5 space-y-3" id="recently-asked-widget">
            <h4 className="text-xs font-bold text-slate-950 font-display uppercase tracking-wider">Recently Asked</h4>
            
            <div className="space-y-3 text-xs" id="recent-snippets-stack">
              <div className="border-b border-slate-50 pb-2">
                <p className="font-bold text-slate-900 font-display">System Design for Logistics</p>
                <span className="text-[10px] text-slate-400 font-mono">1 day ago • Staff Engineering</span>
              </div>
              <div className="border-b border-slate-50 pb-2">
                <p className="font-bold text-slate-900 font-display">A/B Testing Cohort Retention Logs</p>
                <span className="text-[10px] text-slate-400 font-mono">3 days ago • Product Management</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 font-display">Behavioral Alignment Loop</p>
                <span className="text-[10px] text-slate-400 font-mono">5 days ago • Human Resources</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
