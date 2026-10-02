import React from 'react';
import { User, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { DesignerProfile } from '../types';

interface ProfileCardProps {
  profile: DesignerProfile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 text-xs text-zinc-300 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white text-sm">
            Professional Profile: {profile.name}
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[11px] font-medium">
          {profile.role} • {profile.experience}
        </span>
      </div>

      <p className="text-[11px] text-zinc-400">
        The AI automatically introduces you and mentions <strong>only the skills relevant</strong> to the analyzed client's industry:
      </p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 text-[11px] font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
