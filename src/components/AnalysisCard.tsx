import React, { useState } from 'react';
import {
  User,
  Briefcase,
  Layers,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { ClientAnalysis } from '../types';

interface AnalysisCardProps {
  analysis: ClientAnalysis;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis }) => {
  const [showExtraDetails, setShowExtraDetails] = useState<boolean>(false);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-800 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              AI Client Analysis & Opportunity
            </h2>
            <p className="text-xs text-zinc-400">
              Grounded strictly in available public information
            </p>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium self-start sm:self-auto flex items-center space-x-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Real Opportunity Identified</span>
        </span>
      </div>

      {/* EXACT REQUIRED 5-SECTION CLEAN RESULT CARD:
          CLIENT: [Client Name]
          BUSINESS: [Business Category]
          DESIGN OPPORTUNITY: [Specific opportunity]
          WHY IT MATTERS: [Short explanation]
          RECOMMENDED SOLUTION: [Specific graphic-design solution]
      */}
      <div className="space-y-4">
        {/* 1. CLIENT */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-inner">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-1">
            CLIENT
          </span>
          <div className="text-base sm:text-lg font-bold text-white tracking-tight">
            {analysis.clientName || 'Not enough public information available.'}
          </div>
        </div>

        {/* 2. BUSINESS */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-inner">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-1">
            BUSINESS
          </span>
          <div className="text-sm sm:text-base font-semibold text-indigo-300">
            {analysis.businessCategory || 'Not enough public information available.'}
          </div>
        </div>

        {/* 3. DESIGN OPPORTUNITY */}
        <div className="p-4.5 rounded-2xl bg-zinc-950 border-2 border-purple-500/30 shadow-inner space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block mb-1 flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>DESIGN OPPORTUNITY</span>
          </span>
          <div className="text-sm sm:text-base font-semibold text-purple-100 leading-snug">
            {analysis.designOpportunity}
          </div>
        </div>

        {/* 4. WHY IT MATTERS */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-inner">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-1 flex items-center space-x-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>WHY IT MATTERS</span>
          </span>
          <div className="text-sm text-zinc-300 leading-relaxed">
            {analysis.whyItMatters}
          </div>
        </div>

        {/* 5. RECOMMENDED SOLUTION */}
        <div className="p-4.5 rounded-2xl bg-zinc-950 border border-indigo-500/30 shadow-inner">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 block mb-1 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>RECOMMENDED SOLUTION</span>
          </span>
          <div className="text-sm text-zinc-200 font-medium leading-relaxed">
            {analysis.recommendedSolution}
          </div>
        </div>
      </div>

      {/* Extra Discovered Insights (Expandable) */}
      <div className="pt-2">
        <button
          onClick={() => setShowExtraDetails(!showExtraDetails)}
          className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center space-x-1 transition-colors cursor-pointer"
        >
          <span>{showExtraDetails ? 'Hide' : 'View'} Additional Verified Client Details</span>
          {showExtraDetails ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {showExtraDetails && (
          <div className="mt-3 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs space-y-3 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-zinc-500 font-mono block">Main Products / Services:</span>
                <span className="text-zinc-300 font-medium">{analysis.mainProductsServices}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono block">Target Audience:</span>
                <span className="text-zinc-300 font-medium">{analysis.targetAudience}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono block">Observed Brand Style:</span>
                <span className="text-zinc-300 font-medium">{analysis.brandStyle}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono block">Social / Web Presence:</span>
                <span className="text-zinc-300 font-medium">{analysis.socialPresence}</span>
              </div>
            </div>

            {analysis.possibleDesignNeeds?.length > 0 && (
              <div>
                <span className="text-zinc-500 font-mono block mb-1.5">
                  Possible Graphic Design Needs:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.possibleDesignNeeds.map((need, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]"
                    >
                      • {need}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
