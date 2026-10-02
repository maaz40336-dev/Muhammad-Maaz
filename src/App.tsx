/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ClientInputSection } from './components/ClientInputSection';
import { AnalysisCard } from './components/AnalysisCard';
import { MessagePreview } from './components/MessagePreview';
import { ProfileCard } from './components/ProfileCard';
import { RecentAnalyses } from './components/RecentAnalyses';
import { ClientAnalysis, DesignerProfile, SavedAnalysisRecord } from './types';
import { DEFAULT_DESIGNER_PROFILE } from './constants/defaultProfile';
import { analyzeClient, regenerateMessage } from './services/api';
import { AlertCircle, ShieldCheck } from 'lucide-react';

const RECENT_STORAGE_KEY = 'maaz_client_analyses_history_v2';

export default function App() {
  const profile: DesignerProfile = DEFAULT_DESIGNER_PROFILE;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ClientAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // History state
  const [savedRecords, setSavedRecords] = useState<SavedAnalysisRecord[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse history:', e);
    }
    return [];
  });

  const handleAnalyze = async (clientInput: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentAnalysis(null);

    try {
      const analysis = await analyzeClient(clientInput);
      setCurrentAnalysis(analysis);

      // Save to recent list
      const newRecord: SavedAnalysisRecord = {
        id: `analysis_${Date.now()}`,
        clientInput,
        clientName: analysis.clientName,
        businessCategory: analysis.businessCategory,
        designOpportunity: analysis.designOpportunity,
        generatedMessage: analysis.generatedMessage,
        timestamp: new Date().toISOString(),
      };

      const updated = [newRecord, ...savedRecords.slice(0, 19)];
      setSavedRecords(updated);
      try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to storage:', e);
      }
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Failed to analyze client. Please verify the input and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!currentAnalysis) return;
    setIsRegenerating(true);
    try {
      const newMsg = await regenerateMessage(currentAnalysis);
      setCurrentAnalysis((prev) =>
        prev ? { ...prev, generatedMessage: newMsg } : null
      );
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSelectRecent = (rec: SavedAnalysisRecord) => {
    setCurrentAnalysis({
      clientName: rec.clientName,
      businessCategory: rec.businessCategory,
      mainProductsServices: 'Loaded from session history',
      targetAudience: 'Loaded from session history',
      brandStyle: 'Loaded from session history',
      socialPresence: 'Loaded from session history',
      promotionalContent: 'Loaded from session history',
      visualBranding: 'Loaded from session history',
      possibleDesignNeeds: [],
      designOpportunity: rec.designOpportunity,
      whyItMatters: 'Saved from prior analysis.',
      recommendedSolution: 'Professional graphic design deliverables tailored to business category.',
      generatedMessage: rec.generatedMessage,
    });
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    setSavedRecords([]);
    try {
      localStorage.removeItem(RECENT_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar profile={profile} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Error notification if any */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 1. Client Input Section: [ANALYZE CLIENT] + ENTER key */}
        <ClientInputSection onAnalyze={handleAnalyze} isLoading={isLoading} />

        {/* 2. Show Analysis Card (when analysis completes) */}
        {currentAnalysis && <AnalysisCard analysis={currentAnalysis} />}

        {/* 3. Message Preview: [EDIT], [REGENERATE], [COPY MESSAGE], [CANCEL] */}
        {currentAnalysis && (
          <MessagePreview
            analysis={currentAnalysis}
            onRegenerate={handleRegenerate}
            onCancel={() => setCurrentAnalysis(null)}
            isRegenerating={isRegenerating}
          />
        )}

        {/* Profile Card showing Muhammad Maaz skills */}
        <ProfileCard profile={profile} />

        {/* Recent Client Analyses */}
        <RecentAnalyses
          records={savedRecords}
          onSelect={handleSelectRecent}
          onClear={handleClearHistory}
        />
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-600">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            AI Client Outreach Dashboard • Muhammad Maaz ({profile.role})
          </span>
          <div className="flex items-center space-x-1.5 text-zinc-500 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Client Research & Personalized Message Generation • Zero Automatic Sends</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
