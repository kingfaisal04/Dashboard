import React, { useState, useEffect } from 'react';
import LiveClock from './components/LiveClock';
import StatsOverview from './components/StatsOverview';
import UserGrid from './components/UserGrid';
import UserModal from './components/UserModal';
import {
  Users,
  RefreshCw,
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
} from 'lucide-react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState(null);

  // Helper function to show temporary status toasts
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Function to fetch users from JSONPlaceholder API
  const fetchUsers = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      // Simulate artificial micro delay on refresh for smooth UX feedback
      if (isManualRefresh) {
        await new Promise((res) => setTimeout(res, 500));
      }

      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setUsers(data);
      setLastSyncTime(new Date());

      if (isManualRefresh) {
        showToast('User directory refreshed successfully!');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to fetch user list');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // useEffect Hook: Fetches user list automatically on component mount
  useEffect(() => {
    fetchUsers(false);
  }, []);

  // Filtered users based on search query
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-16 flex flex-col justify-between">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white font-medium text-xs rounded-2xl shadow-xl shadow-emerald-600/30 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full space-y-8">
        
        {/* Navigation Bar */}
        <header className="glass-card rounded-3xl p-4 sm:p-6 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  PulseDash
                </h1>
                <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                  v1.0 React 19
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Demonstrating <code className="text-indigo-300 font-mono-custom">useState</code> &amp; <code className="text-purple-300 font-mono-custom">useEffect</code> integration
              </p>
            </div>
          </div>

          {/* Live Clock Component */}
          <div className="w-full md:w-auto">
            <LiveClock />
          </div>
        </header>

        {/* Stats Summary Section */}
        <StatsOverview
          userCount={users.length}
          isLoading={isLoading || isRefreshing}
          lastSyncTime={lastSyncTime}
          onRefresh={() => fetchUsers(true)}
        />

        {/* User Directory Header & Controls */}
        <section className="space-y-6">
          <div className="glass-card rounded-3xl p-5 sm:p-6 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title & Count */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  User Directory
                  <span className="text-xs font-mono-custom px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {filteredUsers.length} of {users.length}
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Real-time list loaded on component mount via REST API
                </p>
              </div>
            </div>

            {/* Actions: Search Input + Refresh Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Refresh Button */}
              <button
                onClick={() => fetchUsers(true)}
                disabled={isLoading || isRefreshing}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
              >
                <RefreshCw
                  className={`w-4 h-4 transition-transform duration-700 ${
                    isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'
                  }`}
                />
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh Users'}</span>
              </button>
            </div>
          </div>

          {/* Error Alert View */}
          {error && (
            <div className="glass-card rounded-2xl p-6 border border-rose-500/30 bg-rose-500/10 text-rose-300 flex items-center gap-4">
              <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-rose-200">Fetch Failed</h4>
                <p className="text-xs text-rose-300/80 mt-0.5">{error}</p>
              </div>
              <button
                onClick={() => fetchUsers(true)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Retry Fetch
              </button>
            </div>
          )}

          {/* User Cards Grid */}
          <UserGrid
            users={filteredUsers}
            isLoading={isLoading}
            onSelectUser={(user) => setSelectedUser(user)}
          />
        </section>
      </div>

      {/* Profile Detail Modal */}
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {/* Dashboard Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center text-xs text-slate-500 border-t border-slate-800/80 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Built with React 19, Tailwind CSS v4 &amp; Vite
          </p>
          <p className="font-mono-custom text-slate-500">
            useState + useEffect Hook Pattern
          </p>
        </div>
      </footer>
    </div>
  );
}
