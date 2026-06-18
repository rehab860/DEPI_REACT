import { useState, FormEvent } from 'react';
import { Star, Check, AlertCircle, Sparkles, Building, Briefcase, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Company, Review } from '../types';

interface SubmitReviewScreenProps {
  companies: Company[];
  onSubmitReview: (review: Omit<Review, 'id' | 'date' | 'upvotes' | 'author'>) => void;
  setActiveScreen: (screen: string, companyId?: string) => void;
}

export default function SubmitReviewScreen({
  companies,
  onSubmitReview,
  setActiveScreen
}: SubmitReviewScreenProps) {
  
  // Multi-step Form State
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { num: 1, label: 'Company' },
    { num: 2, label: 'Type' },
    { num: 3, label: 'Rating' },
    { num: 4, label: 'Feedback' },
    { num: 5, label: 'Finalize' }
  ];

  // Choices State
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || 'technova');
  const [isInterview, setIsInterview] = useState(false);
  const [role, setRole] = useState('Senior Analyst');

  // Rating metrics
  const [overallRating, setOverallRating] = useState(4);
  const [wlbRating, setWlbRating] = useState(4);
  const [transparencyRating, setTransparencyRating] = useState(4);
  const [responsivenessRating, setResponsivenessRating] = useState(4);
  const [difficultyRating, setDifficultyRating] = useState(4);

  // Text feedback
  const [reviewText, setReviewText] = useState('An incredible company with massive growth opportunities and deep-level computational problems.');
  const [pros, setPros] = useState('High standard of talent, extremely high scale engineering system, supportive leadership, and generous compensation package.');
  const [cons, setCons] = useState('Speed of iteration is incredibly fast; processes can occasionally bottleneck due to strict quality gating guidelines.');
  const [postAnonymously, setPostAnonymously] = useState(true);

  const selectedCompanyObj = companies.find(c => c.id === selectedCompanyId) || companies[0];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    onSubmitReview({
      companyId: selectedCompanyId,
      companyName: selectedCompanyObj.name,
      role: role,
      text: reviewText,
      rating: overallRating,
      wlbRating: wlbRating,
      transparencyRating: transparencyRating,
      responsivenessRating: responsivenessRating,
      difficultyRating: difficultyRating,
      pros: pros,
      cons: cons,
      isInterview: isInterview,
      interviewOutcome: isInterview ? 'Offer' : undefined
    });

    // Alert successful state injection and route to company profile
    setActiveScreen('company', selectedCompanyId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="submit-review-flow">
      
      {/* Step Indicators Rail */}
      <div className="mb-12" id="form-step-indicators">
        <div className="flex items-center justify-between relative">
          {/* Progress bar background line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-slate-900 -translate-y-1/2 z-0 transition-all duration-300" 
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          />

          {steps.map((step) => {
            const isCompleted = step.num < currentStep;
            const isActive = step.num === currentStep;
            return (
              <div key={step.num} className="relative z-10 flex flex-col items-center">
                <div 
                  onClick={() => step.num < currentStep && setCurrentStep(step.num)}
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all cursor-pointer ${
                    isCompleted 
                      ? 'bg-slate-900 border border-slate-950 text-white' 
                      : isActive 
                        ? 'bg-white border-2 border-slate-900 text-slate-900 scale-110 shadow-2xs' 
                        : 'bg-white border border-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.num}
                </div>
                <span className={`text-[9px] font-bold font-mono uppercase tracking-wider mt-2 ${
                  isActive ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Review Form Card container */}
      <div className="border border-slate-100 rounded-2xl bg-white shadow-2xs p-6 sm:p-10" id="form-card-container">
        
        {/* Dynamic header details depending on state */}
        <div className="border-b border-slate-50 pb-6 mb-8">
          <span className="text-[10px] font-bold tracking-widest text-[#6366f1] uppercase font-mono block">SCORECARD REGISTRATION</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-1">
            Reviewing {selectedCompanyObj?.name || 'Vetted Companies'}
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Ensure your responses comply with the ReeVue community guidelines for factual and helpful metrics.
          </p>
        </div>

        {/* STEP 1: Select Target Company & Role */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn" id="step-1-form">
            <div>
              <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase block mb-2">Select Company</label>
              <select
                value={selectedCompanyId}
                onChange={(e) => setSelectedCompanyId(e.target.value)}
                className="w-full text-xs font-sans rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all"
                id="select-company-input"
              >
                {companies.map(comp => (
                  <option key={comp.id} value={comp.id}>{comp.name} ({comp.city})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase block mb-2">Your Job Role/Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Software Engineer, Infrastructure Architect, Product Designer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-xs font-sans rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all"
                id="select-role-input"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Choose type of scorecard */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn" id="step-2-form">
            <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase block">Scorecard Classification Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Choice A */}
              <div
                onClick={() => setIsInterview(false)}
                className={`border rounded-2xl p-6 cursor-pointer transition-all flex flex-col justify-between h-40 ${
                  !isInterview 
                    ? 'border-slate-900 bg-slate-50 shadow-2xs' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                id="choose-work-experience"
              >
                <div className="space-y-2">
                  <div className="p-2 rounded-xl bg-slate-900 text-white w-fit shadow-2xs">
                    <Building className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-slate-900">Work Experience Review</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                    I spent substantial time contracted or directly employed at this enterprise.
                  </p>
                </div>
              </div>

              {/* Choice B */}
              <div
                onClick={() => setIsInterview(true)}
                className={`border rounded-2xl p-6 cursor-pointer transition-all flex flex-col justify-between h-40 ${
                  isInterview 
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-2xs' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                id="choose-interview-experience"
              >
                <div className="space-y-2">
                  <div className="p-2 rounded-xl bg-indigo-600 text-white w-fit shadow-2xs">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-indigo-950">Interview Experience</h3>
                  <p className="text-[11px] text-indigo-700 leading-relaxed font-sans">
                    Details of my recruitment cycle, tech assessment, and recruiter responsiveness.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: Multi-Score Rating slider metrics */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn" id="step-3-form">
            <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase block mb-4 border-b border-slate-50 pb-2">
              Metric Star Scorecards
            </label>

            {/* Overall Rating Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 font-display">Overall Grade (Stars)</span>
                <span className="text-xs font-mono font-bold text-slate-700">{overallRating} / 5</span>
              </div>
              <div className="flex space-x-1.5" id="overall-star-inputs">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setOverallRating(star)}
                    className="focus:outline-none cursor-pointer"
                  >
                    <Star className={`w-8 h-8 transition-colors ${
                      star <= overallRating ? 'text-slate-800 fill-slate-800' : 'text-slate-200 hover:text-slate-400'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Grid for secondary levels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              
              {/* Metric A */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 font-display block">Work-Life Balance</span>
                <div className="flex space-x-1" id="wlb-star-inputs">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setWlbRating(star)}
                      className="focus:outline-none cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${
                        star <= wlbRating ? 'text-slate-800 fill-slate-800' : 'text-slate-200'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric B */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 font-display block">Process Transparency</span>
                <div className="flex space-x-1" id="transparency-star-inputs">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setTransparencyRating(star)}
                      className="focus:outline-none cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${
                        star <= transparencyRating ? 'text-slate-800 fill-slate-800' : 'text-slate-200'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric C */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 font-display block">Recruiter Responsiveness</span>
                <div className="flex space-x-1" id="responsiveness-star-inputs">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setResponsivenessRating(star)}
                      className="focus:outline-none cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${
                        star <= responsivenessRating ? 'text-slate-800 fill-slate-800' : 'text-slate-200'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric D */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 font-display block">Interview assessment difficulty</span>
                <div className="flex space-x-1" id="difficulty-star-inputs">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setDifficultyRating(star)}
                      className="focus:outline-none cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${
                        star <= difficultyRating ? 'text-slate-800 fill-slate-800' : 'text-slate-200'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 4: Textual Pros & Cons feedback */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn" id="step-4-form">
            <div>
              <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase block mb-1">Highlight / Pros</label>
              <textarea
                required
                rows={3}
                placeholder="What sets their culture, technical scope, or compensation models apart?"
                value={pros}
                onChange={(e) => setPros(e.target.value)}
                className="w-full text-xs font-sans rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white"
                id="pros-textarea"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase block mb-1">Growth Opportunities / Cons</label>
              <textarea
                required
                rows={3}
                placeholder="What friction metrics, deployment pace guidelines, or timeline bottlenecks did you face?"
                value={cons}
                onChange={(e) => setCons(e.target.value)}
                className="w-full text-xs font-sans rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white"
                id="cons-textarea"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Finalize Review Body text & Anonymity check */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn" id="step-5-form">
            <div>
              <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase block mb-1">Scorecard Paragraph text</label>
              <textarea
                required
                rows={4}
                placeholder="Write a clear summarized review of your experience compiling both pros and cons."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full text-xs font-sans rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white"
                id="text-summary-textarea"
              />
            </div>

            {/* Interactive Switch Slide */}
            <div className="flex items-center justify-between border border-slate-100 rounded-xl bg-slate-50 p-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900 font-display">Post Anonymously</span>
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                  Your identity remains strictly hidden. Only aggregated job classifications are outputted.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPostAnonymously(!postAnonymously)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                  postAnonymously ? 'bg-slate-900' : 'bg-slate-200'
                }`}
                id="anonymity-switch"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    postAnonymously ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Error or guideline warnings */}
            <div className="flex items-start space-x-2 text-slate-400 bg-slate-50 border border-slate-100 rounded-xl p-3">
              <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-[10px] leading-relaxed font-sans">
                By submitting this scorecard, you agree that you are a verified professional representing first-party data and experience. Fake or malicious scorecards are deleted immediately.
              </p>
            </div>
          </div>
        )}

        {/* Unified Bottom Action button set */}
        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center space-x-1.5 ${
              currentStep === 1 ? 'opacity-50 pointer-events-none' : ''
            }`}
            id="form-back-btn"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer hover:scale-[1.01]"
              id="form-next-btn"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all hover:scale-[1.02] flex items-center space-x-1"
              id="form-submit-btn"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Submit Scorecard</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
