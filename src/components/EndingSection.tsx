import React, { useState } from 'react';
import { ArrowUp, Mail, Send, CheckCircle2 } from 'lucide-react';

export const EndingSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('publication');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 4000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="colophon" className="relative border-t border-white/[0.08] bg-[#08080a] text-zinc-300">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Monograph Statement */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-zinc-500 font-mono">
              <span className="text-[#d4a373]">Colophon</span>
              <span>·</span>
              <span>Monograph Archival Notes</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Tectonic form exists only when illuminated by passing time.
            </h2>

            <p className="max-w-xl text-base text-zinc-400 font-light leading-relaxed">
              The Palmkvist Archive documents the confluence of brutalist weight, tactile materiality, and daylight orchestration across Europe and East Asia. Every frame is recorded at high optical fidelity to honor raw concrete, weathered stone, and sculpted space.
            </p>

            {/* Publication details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] text-xs">
              <div>
                <span className="text-zinc-500 uppercase tracking-wider block mb-1">Curation</span>
                <span className="text-zinc-200 font-medium">Nicolai Palmkvist Studio</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-wider block mb-1">Typography</span>
                <span className="text-zinc-200 font-medium">Syne & Plus Jakarta</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-wider block mb-1">Animation Core</span>
                <span className="text-zinc-200 font-medium">GSAP ScrollTrigger</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiries Form */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-900/30 p-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#d4a373] mb-2">
                <Mail className="h-3.5 w-3.5" />
                <span>Print & Archival Inquiries</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Request Limited Monograph Folio
              </h3>
              <p className="mt-2 text-xs text-zinc-400 font-light leading-relaxed">
                Receive the archival exhibition brochure, high-resolution prints specification catalog, and architectural photography licensing schedule.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="inquiry-type" className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Inquiry Intent
                  </label>
                  <select
                    id="inquiry-type"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full rounded-lg border border-white/[0.1] bg-zinc-950 px-3.5 py-2 text-xs text-zinc-200 focus:border-[#d4a373] focus:outline-none"
                  >
                    <option value="publication">Print Edition Publication</option>
                    <option value="licensing">Architectural Media Licensing</option>
                    <option value="commission">Commissioned Site Photography</option>
                    <option value="press">Press & Institutional Exhibition</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="inquiry-email" className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Recipient Address
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="inquiry-email"
                      type="email"
                      required
                      placeholder="curator@architecture-studio.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 rounded-lg border border-white/[0.1] bg-zinc-950 px-3.5 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-[#d4a373] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#d4a373] px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-[#e29578] cursor-pointer shrink-0"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit</span>
                    </button>
                  </div>
                </div>

                {submitted && (
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-950/50 border border-emerald-500/20 p-2.5 text-xs text-emerald-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Inquiry dispatch confirmed. The archive folio has been queued.</span>
                  </div>
                )}
              </form>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500">
              <span>Standard Response: 24–48 Hours</span>
              <span>Zurich · Kyoto · Lisbon</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Return to Top */}
        <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-white/[0.08] text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Palmkvist Archive. Architectural Photography & Spatial Direction.
          </div>

          <button
            onClick={handleScrollToTop}
            className="group inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-[#d4a373] transition-colors cursor-pointer w-fit"
          >
            <span>Return to Monograph Head</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-1 text-[#d4a373]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
