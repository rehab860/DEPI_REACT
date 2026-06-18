import { useState, FormEvent } from 'react';
import { Eye, EyeOff, Lock, Mail, User, ShieldAlert, CheckCircle, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (name: string, email: string) => void;
  setActiveScreen: (screen: string) => void;
}

export default function LoginScreen({
  onLoginSuccess,
  setActiveScreen
}: LoginScreenProps) {
  
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (activeTab === 'signin') {
      if (email.trim() === 'alex@reevue-expert.com' && pwd === 'password123') {
        onLoginSuccess('Alex D.', email.trim());
        setActiveScreen('home');
      } else {
        setError('Invalid credentials. Please use: alex@reevue-expert.com / password123');
      }
    } else {
      if (email.trim() && pwd.trim()) {
        onLoginSuccess(name.trim() || 'New User', email.trim());
        setActiveScreen('home');
      } else {
        setError('Please fill in all fields.');
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row relative" id="split-login-page">
      
      {/* Left Cover Banner Column (Editorial Theme) */}
      <div className="w-full md:w-1/2 bg-slate-900 text-white p-8 sm:p-16 flex flex-col justify-between relative overflow-hidden shrink-0" id="login-cover-banner">
        {/* Abstract grids */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-800 rounded-full blur-3xl opacity-20 pointer-events-none" />

        {/* Header Logo Brand */}
        <div className="flex items-center space-x-2 relative z-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-display font-black text-slate-950 shadow-sm">
            RV
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight text-white">
            Ree<span className="text-gray-400 font-light">Vue</span>
          </span>
        </div>

        {/* Cover Editorial Copy */}
        <div className="my-16 space-y-6 relative z-10 max-w-sm">
          <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase font-mono block">
            INDIVIDUAL EMPOWERMENT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display leading-tight">
            Authentic insights, unfiltered by design.
          </h2>
          <div className="h-0.5 w-12 bg-indigo-500 rounded-full" />
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            Peer evaluations, factual compensation registries, and recruiter pipeline timelines formulated to support professional agency.
          </p>
        </div>

        {/* Foot Credentials Note */}
        <div className="text-[10px] text-slate-500 font-mono relative z-10">
          <span>ReeVue Security Protocol • AES-256 Shield Enabled</span>
        </div>
      </div>

      {/* Right Interactive Form Column */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 sm:p-16" id="login-interactive-console">
        <div className="w-full max-w-md space-y-8 animate-fadeIn">
          
          {/* Signin vs Signup toggle */}
          <div className="border-b border-slate-100 flex space-x-6" id="login-form-tabs">
            <button
              onClick={() => setActiveTab('signin')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider font-mono relative transition-all ${
                activeTab === 'signin' ? 'text-slate-950' : 'text-slate-400 hover:text-slate-900'
              }`}
              id="tab-select-signin"
            >
              Sign In
              {activeTab === 'signin' && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-950 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider font-mono relative transition-all ${
                activeTab === 'signup' ? 'text-slate-950' : 'text-slate-400 hover:text-slate-900'
              }`}
              id="tab-select-signup"
            >
              Create Account
              {activeTab === 'signup' && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-950 rounded-full" />
              )}
            </button>
          </div>

          {/* Form container */}
          <form onSubmit={handleSubmit} className="space-y-5" id="login-core-form">
            
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-xl text-xs border border-red-100 animate-fadeIn">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Display Name (Only present on signup) */}
            {activeTab === 'signup' && (
              <div>
                <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase block mb-1.5">Display Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    required
                    placeholder="Alex D."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs font-sans rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-sans rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all"
                  id="email-input-field"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">Password</label>
                {activeTab === 'signin' && (
                  <a href="#reset" className="text-[10px] text-slate-400 hover:text-slate-900 transition-colors">Forgot Password?</a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className="w-full text-xs font-sans rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all"
                  id="pwd-input-field"
                />
              </div>
            </div>

            {/* Submit Trigger action */}
            <button
              type="submit"
              className="w-full bg-slate-950 hover:bg-slate-800 text-white font-sans text-xs font-bold py-3.5 rounded-xl transition-all hover:scale-[1.01] shadow-xs cursor-pointer pt-3"
              id="login-form-submit-btn"
            >
              {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Social login partition */}
          <div className="space-y-4">
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-slate-100" />
              <span className="text-[10px] font-mono text-slate-400 px-3 uppercase">Or Continue With</span>
              <div className="flex-1 border-t border-slate-100" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => {
                  onLoginSuccess('Alex D.', 'alex@reevue-expert.com');
                  setActiveScreen('home');
                }}
                className="flex items-center justify-center space-x-2 border border-slate-200 hover:border-slate-300 py-2.5 rounded-xl text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="font-bold">Google SSO</span>
              </button>
              <button 
                onClick={() => {
                  onLoginSuccess('Alex D.', 'alex@reevue-expert.com');
                  setActiveScreen('home');
                }}
                className="flex items-center justify-center space-x-2 border border-slate-200 hover:border-slate-300 py-2.5 rounded-xl text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="font-bold">Apple ID</span>
              </button>
            </div>
          </div>

          {/* Policy disclaimer */}
          <p className="text-[10px] text-slate-400 leading-relaxed font-sans text-center">
            By connecting through public protocols, you agree that you represent your authentic professional footprint. Read our Privacy Policy.
          </p>

        </div>
      </div>

    </div>
  );
}
