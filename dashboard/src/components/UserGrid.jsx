import React from 'react';
import { Mail, Building, MapPin, Globe, ExternalLink, UserCheck, AlertCircle } from 'lucide-react';

const avatarColors = [
  'from-indigo-500 to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-indigo-600',
  'from-cyan-500 to-blue-600',
  'from-fuchsia-500 to-rose-600',
];

export default function UserGrid({ users, isLoading, onSelectUser }) {
  // Return skeleton cards during loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-6 border border-slate-800/80 space-y-4 animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl skeleton-shimmer" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-3/4 rounded skeleton-shimmer" />
                <div className="h-3 w-1/2 rounded skeleton-shimmer" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full rounded skeleton-shimmer" />
              <div className="h-3 w-5/6 rounded skeleton-shimmer" />
              <div className="h-3 w-4/6 rounded skeleton-shimmer" />
            </div>
            <div className="pt-2">
              <div className="h-9 w-full rounded-xl skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If no users matched search
  if (users.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center border border-slate-800 max-w-lg mx-auto my-8">
        <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-semibold text-white">No Users Found</h3>
        <p className="text-sm text-slate-400 mt-1">
          No matching user profiles found. Try searching for another name, email, or company.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {users.map((user, idx) => {
        const initials = user.name
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase();

        const avatarGradient = avatarColors[idx % avatarColors.length];

        return (
          <div
            key={user.id}
            className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-500/5 group flex flex-col justify-between"
          >
            <div>
              {/* Header: Avatar + Name & Handle */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${avatarGradient} text-white font-bold text-base flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-300`}
                  >
                    {initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors line-clamp-1">
                      {user.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 font-mono-custom">
                      @{user.username}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <UserCheck className="w-3 h-3" />
                  ID #{user.id}
                </span>
              </div>

              {/* User Details */}
              <div className="space-y-2.5 text-xs text-slate-300 pt-1 border-t border-slate-800/60">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <a
                    href={`mailto:${user.email}`}
                    className="hover:underline hover:text-indigo-300 transition-colors truncate"
                  >
                    {user.email}
                  </a>
                </div>

                {user.company?.name && (
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Building className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{user.company.name}</span>
                  </div>
                )}

                {user.address?.city && (
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{user.address.city}, {user.address.suite || ''}</span>
                  </div>
                )}

                {user.website && (
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline hover:text-cyan-300 transition-colors flex items-center gap-1 truncate"
                    >
                      <span>{user.website}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="mt-5 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => onSelectUser(user)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-indigo-500/25 group/btn"
              >
                <span>View Full Details</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
