import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Activity } from 'lucide-react';

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time state every 1000 milliseconds
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // CRITICAL: Cleanup interval on component unmount to prevent memory leaks
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const hours = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const seconds = time.getSeconds().toString().padStart(2, '0');

  const dateString = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500" />
      
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/15 border border-indigo-500/30 rounded-xl text-indigo-400">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                System Time
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Sync
              </span>
            </div>

            {/* Time display */}
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono-custom">
                {hours.slice(0, -3)}
              </span>
              <span className="text-xl sm:text-2xl font-semibold text-indigo-400 font-mono-custom">
                :{seconds}
              </span>
              <span className="text-xs font-semibold text-slate-400 ml-1 uppercase">
                {hours.slice(-2)}
              </span>
            </div>
          </div>
        </div>

        {/* Date display */}
        <div className="hidden sm:flex flex-col items-end border-l border-slate-800 pl-5">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>{dateString}</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500 font-mono-custom">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>1000ms heartbeat</span>
          </div>
        </div>
      </div>
    </div>
  );
}
