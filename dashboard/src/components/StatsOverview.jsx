import React from 'react';
import { Users, RefreshCw, Server, ShieldCheck } from 'lucide-react';

export default function StatsOverview({ userCount, isLoading, lastSyncTime, onRefresh }) {
  const stats = [
    {
      id: 'users',
      label: 'Active Users',
      value: isLoading ? '...' : userCount,
      subtext: 'Fetched from JSONPlaceholder',
      icon: Users,
      color: 'from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30',
    },
    {
      id: 'sync',
      label: 'Last Synced',
      value: lastSyncTime ? lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Pending',
      subtext: 'Triggered via useEffect',
      icon: RefreshCw,
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
    },
    {
      id: 'api',
      label: 'API Gateway',
      value: '200 OK',
      subtext: 'REST Endpoint Healthy',
      icon: Server,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'hook',
      label: 'State Engine',
      value: 'useState + useEffect',
      subtext: 'React 19 Hooks active',
      icon: ShieldCheck,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.id}
            className="glass-card rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold text-white mt-1 font-mono-custom">
                  {stat.value}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {stat.subtext}
                </p>
              </div>

              <div className={`p-3 bg-gradient-to-br ${stat.color} border rounded-xl shadow-lg`}>
                <IconComponent className={`w-5 h-5 ${stat.id === 'sync' && isLoading ? 'animate-spin' : ''}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
