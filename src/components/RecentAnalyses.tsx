import React, { useState } from 'react';
import { History, Copy, Check, ExternalLink, ArrowRight } from 'lucide-react';
import { SavedAnalysisRecord } from '../types';

interface RecentAnalysesProps {
  records: SavedAnalysisRecord[];
  onSelect: (record: SavedAnalysisRecord) => void;
  onClear: () => void;
}

export const RecentAnalyses: React.FC<RecentAnalysesProps> = ({
  records,
  onSelect,
  onClear,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (records.length === 0) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <History className="w-4 h-4 text-zinc-400" />
          <h3 className="font-bold text-white text-sm">
            Recent Client Analyses ({records.length})
          </h3>
        </div>
        <button
          onClick={onClear}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
        >
          Clear History
        </button>
      </div>

      <div className="divide-y divide-zinc-800/60">
        {records.map((rec) => (
          <div
            key={rec.id}
            className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-sm">
                  {rec.clientName}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                  {rec.businessCategory}
                </span>
              </div>
              <p className="text-zinc-400 line-clamp-1 max-w-xl">
                {rec.designOpportunity}
              </p>
            </div>

            <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
              <button
                onClick={() => onSelect(rec)}
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleCopy(rec.id, rec.generatedMessage)}
                className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-medium transition-colors flex items-center space-x-1 cursor-pointer"
              >
                {copiedId === rec.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Message</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
