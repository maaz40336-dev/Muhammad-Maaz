import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  Sparkles,
  Loader2,
  Zap,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Video,
  Globe,
  Phone,
  FileText,
} from 'lucide-react';

interface ClientInputSectionProps {
  onAnalyze: (input: string) => Promise<void>;
  isLoading: boolean;
}

export const ClientInputSection: React.FC<ClientInputSectionProps> = ({
  onAnalyze,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    onAnalyze(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const samples = [
    {
      title: 'Restaurant & Cafe',
      text: 'https://www.instagram.com/bellacucina_cafe',
      hint: 'Instagram',
    },
    {
      title: 'Brand Website',
      text: 'https://apexbrandstudio.com',
      hint: 'Website',
    },
    {
      title: 'Diner / Grill',
      text: '+923104529576 (Lahore Burger & Grill)',
      hint: 'WhatsApp / Business',
    },
    {
      title: 'Creator / Media',
      text: 'https://www.youtube.com/@creativepulse / contact@pulsemedia.io',
      hint: 'Creator Email',
    },
    {
      title: 'Startup Founder',
      text: 'https://www.linkedin.com/in/startup-founder',
      hint: 'LinkedIn',
    },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-40 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI CLIENT ANALYSIS & OPPORTUNITY DISCOVERY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Discover Genuine Graphic Design Opportunities
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            Paste any client email, social profile, website, or business notes to analyze real
            design needs and generate a personalized message for Muhammad Maaz.
          </p>
        </div>

        {/* Input Form with ENTER Key Support */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative rounded-2xl bg-zinc-950 border-2 border-indigo-500/40 focus-within:border-indigo-500 p-2 sm:p-2.5 transition-all shadow-xl">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="pl-3 pr-2 hidden sm:flex items-center shrink-0">
                <Search className="w-5 h-5 text-indigo-400" />
              </div>

              {/* CLEAN MAIN INPUT FIELD */}
              {isExpanded ? (
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={4}
                  placeholder="Paste Client Email, Social Media Profile, Website, or Business Information"
                  className="flex-1 px-3 py-2 bg-transparent text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none resize-none"
                  disabled={isLoading}
                />
              ) : (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Paste Client Email, Social Media Profile, Website, or Business Information"
                  className="flex-1 px-3 py-3 bg-transparent text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none font-medium"
                  disabled={isLoading}
                />
              )}

              {/* LARGE [ANALYZE CLIENT] BUTTON */}
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer shrink-0 uppercase tracking-wider"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>ANALYZING...</span>
                  </>
                ) : (
                  <>
                    <span>[ANALYZE CLIENT]</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Subtext & Mode toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 px-2 gap-2">
            <div className="flex items-center space-x-1.5">
              <kbd className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px] border border-zinc-700">
                ENTER
              </kbd>
              <span>Press ENTER to start analysis</span>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-zinc-400 hover:text-indigo-400 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isExpanded ? 'Switch to Single Line' : 'Paste Multi-line Notes'}</span>
            </button>
          </div>

          {/* Supported Inputs List */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[11px] text-zinc-400">
            <span className="text-zinc-500 font-medium">Accepts:</span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800/80">
              <Mail className="w-3 h-3 text-rose-400" />
              <span>Email</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800/80">
              <Instagram className="w-3 h-3 text-fuchsia-400" />
              <span>Instagram</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800/80">
              <Facebook className="w-3 h-3 text-blue-400" />
              <span>Facebook</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800/80">
              <Linkedin className="w-3 h-3 text-sky-400" />
              <span>LinkedIn</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800/80">
              <Video className="w-3 h-3 text-cyan-400" />
              <span>TikTok</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800/80">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800/80">
              <Globe className="w-3 h-3 text-amber-400" />
              <span>Website</span>
            </span>
          </div>

          {/* Quick-try sample inputs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] text-zinc-500 flex items-center space-x-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Try sample:</span>
            </span>
            {samples.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setInputValue(s.text);
                  onAnalyze(s.text);
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors cursor-pointer"
              >
                {s.title} ({s.hint})
              </button>
            ))}
          </div>
        </form>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-4 rounded-xl bg-zinc-950 border border-indigo-500/30 text-center space-y-2 animate-pulse max-w-lg mx-auto">
            <div className="flex items-center justify-center space-x-2 text-indigo-400 text-xs font-bold">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>ANALYZING AVAILABLE INFORMATION...</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Identifying business category, brand style, and genuine graphic-design opportunities
              grounded strictly in available facts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
