import React, { useState, useEffect } from 'react';
import {
  Edit3,
  RotateCcw,
  Copy,
  Check,
  XCircle,
  Sparkles,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { ClientAnalysis } from '../types';

interface MessagePreviewProps {
  analysis: ClientAnalysis;
  onRegenerate: () => Promise<void>;
  onCancel: () => void;
  isRegenerating: boolean;
}

export const MessagePreview: React.FC<MessagePreviewProps> = ({
  analysis,
  onRegenerate,
  onCancel,
  isRegenerating,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedMessage, setEditedMessage] = useState<string>(analysis.generatedMessage);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync if analysis updates
  useEffect(() => {
    setEditedMessage(analysis.generatedMessage);
  }, [analysis.generatedMessage]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-zinc-900 border-2 border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-semibold">
                PERSONALIZED OUTREACH MESSAGE
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
              Ready for Muhammad Maaz to Review & Copy
            </h3>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-medium self-start sm:self-auto">
          Tailored • Non-Spam • Value-First
        </span>
      </div>

      {/* MESSAGE BOX */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
            [Generated Message]
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {editedMessage.length} characters • {editedMessage.split(/\s+/).filter(Boolean).length} words
          </span>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              rows={10}
              className="w-full p-4 sm:p-5 rounded-2xl bg-zinc-950 border-2 border-indigo-500/60 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed font-sans shadow-inner"
              placeholder="Edit your outreach message..."
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setEditedMessage(analysis.generatedMessage);
                  setIsEditing(false);
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs text-zinc-400 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Discard Edits
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                Save Edits
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 whitespace-pre-wrap leading-relaxed shadow-inner font-sans selection:bg-indigo-500 selection:text-white">
            {editedMessage}
          </div>
        )}
      </div>

      {/* REQUIRED BUTTONS:
          [EDIT]
          [REGENERATE]
          [COPY MESSAGE]
          [CANCEL]
      */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {/* [EDIT] */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-200 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-zinc-400" />
            <span>{isEditing ? 'Done Editing' : '[EDIT]'}</span>
          </button>

          {/* [REGENERATE] */}
          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-200 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RotateCcw
              className={`w-3.5 h-3.5 text-indigo-400 ${
                isRegenerating ? 'animate-spin' : ''
              }`}
            />
            <span>[REGENERATE]</span>
          </button>

          {/* [CANCEL] */}
          <button
            onClick={onCancel}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>[CANCEL]</span>
          </button>
        </div>

        {/* [COPY MESSAGE] */}
        <button
          onClick={handleCopy}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer uppercase tracking-wider"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>COPIED TO CLIPBOARD!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>[COPY MESSAGE]</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
