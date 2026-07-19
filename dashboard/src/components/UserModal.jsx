import React, { useEffect } from 'react';
import { X, Mail, Phone, Globe, Building, MapPin, Compass, Briefcase } from 'lucide-react';

export default function UserModal({ user, onClose }) {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 rounded-xl transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-bold flex items-center justify-center shadow-lg shadow-indigo-500/20">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-sm text-indigo-400 font-mono-custom">@{user.username}</p>
            <span className="inline-block mt-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              User ID: #{user.id}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-4 text-sm">
          {/* Contact Section */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 sm:col-span-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-cyan-300 truncate"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>

          {/* Company Section */}
          {user.company && (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-purple-400" />
                Company Details
              </h4>
              <p className="font-semibold text-white text-sm">{user.company.name}</p>
              {user.company.catchPhrase && (
                <p className="text-xs text-slate-400 italic">
                  "{user.company.catchPhrase}"
                </p>
              )}
              {user.company.bs && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="capitalize">{user.company.bs}</span>
                </div>
              )}
            </div>
          )}

          {/* Address Section */}
          {user.address && (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                Address & Location
              </h4>
              <p className="text-xs text-slate-300">
                {user.address.street}, {user.address.suite}, {user.address.city} - {user.address.zipcode}
              </p>
              {user.address.geo && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono-custom pt-1">
                  <Compass className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-lg shadow-indigo-600/20"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
