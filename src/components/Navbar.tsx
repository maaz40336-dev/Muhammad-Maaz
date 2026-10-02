import React from 'react';
import { Palette, Sparkles, UserCheck, Layers } from 'lucide-react';
import { DesignerProfile } from '../types';

interface NavbarProps {
  profile: DesignerProfile;
}

export const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand & App Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 flex items-center justify-center shadow-lg shadow-purple-500/10">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <Palette className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-base tracking-tight">
                AI Client Outreach Dashboard
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Analysis & Generation
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Personalized Graphic Design Outreach Engine
            </p>
          </div>
        </div>

        {/* Designer Profile Badge */}
        <div className="flex items-center space-x-2.5">
          <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center space-x-2 text-xs">
            <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
              M
            </div>
            <div>
              <span className="font-semibold text-zinc-200 block leading-tight">
                {profile.name}
              </span>
              <span className="text-[11px] text-zinc-400">
                {profile.role} • {profile.experience}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
