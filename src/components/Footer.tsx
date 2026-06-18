interface FooterProps {
  setActiveScreen: (screen: string) => void;
}

export default function Footer({ setActiveScreen }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800" id="global-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand/Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-display font-bold text-slate-900">
                RV
              </div>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                Ree<span className="text-gray-400 font-light">Vue</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The modern standard for company insights. Transparent, curated, and editorialized for the professional world. Authenticity unfiltered by design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-100 uppercase tracking-widest font-display">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveScreen('home')} className="hover:text-white transition-colors cursor-pointer">
                  Landing Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveScreen('trending')} className="hover:text-white transition-colors cursor-pointer">
                  Trending Feed
                </button>
              </li>
              <li>
                <button onClick={() => setActiveScreen('submit-review')} className="hover:text-white transition-colors cursor-pointer">
                  Submit a Review
                </button>
              </li>
              <li>
                <button onClick={() => setActiveScreen('results')} className="hover:text-white transition-colors cursor-pointer">
                  Explore Companies
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Institutional */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-100 uppercase tracking-widest font-display">Institutional</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-white transition-colors">About ReeVue</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Frequently Asked</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">Privacy Principles</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">Terms of Engagement</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Closing details */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <p className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} ReeVue Inc. Authentic reviews compiled dynamically. All rights reserved.
          </p>
          <div className="flex space-x-6 text-[11px] text-slate-500">
            <span>Uptime: Verified</span>
            <span>Security: AES-256 Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
