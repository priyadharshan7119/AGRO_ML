import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, User, LogOut, History, ChevronDown, X } from 'lucide-react';

type PredictionHistoryItem = {
  id: string;
  date: string;
  yield: number;
  location: string;
  topCrop: string;
};

type Props = {
  user: { name: string; email: string };
  onLogout: () => void;
  onNavigateHome?: () => void;
  predictionHistory?: PredictionHistoryItem[];
};

export default function DashboardHeader({ user, onLogout, onNavigateHome, predictionHistory = [] }: Props) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-100 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-green-500/30">
              <Sprout className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span
              className="text-lg md:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              AgroPredict AI
            </span>
          </button>

          {/* Profile Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 bg-white backdrop-blur-sm rounded-xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-md"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base shadow-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Dropdown — anchored below button, right-aligned */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  className="hidden md:block absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden"
                  initial={{ opacity: 0, y: -20, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  style={{ transformOrigin: 'top right' }}
                >
                  <DropdownContent
                    user={user}
                    predictionHistory={predictionHistory}
                    onLogout={() => { setShowProfileMenu(false); onLogout(); }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* Mobile Bottom Sheet — slides up from bottom, full-width */}
      <AnimatePresence>
        {showProfileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfileMenu(false)}
            />
            {/* Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl overflow-hidden shadow-[0_-8px_30px_rgba(0,0,0,0.12)] md:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 38 }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-gray-200 rounded-full" />
              </div>
              {/* Close button */}
              <button
                onClick={() => setShowProfileMenu(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
              <DropdownContent
                user={user}
                predictionHistory={predictionHistory}
                onLogout={() => { setShowProfileMenu(false); onLogout(); }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Shared content for both desktop dropdown and mobile sheet
function DropdownContent({
  user,
  predictionHistory,
  onLogout,
}: {
  user: { name: string; email: string };
  predictionHistory: PredictionHistoryItem[];
  onLogout: () => void;
}) {
  return (
    <>
      {/* Profile Info */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-base truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>{user.name}</div>
            <div className="text-xs text-green-50 opacity-90 truncate">{user.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <User className="w-4 h-4 flex-shrink-0" />
          <span>Premium Member</span>
        </div>
      </div>

      {/* Prediction History */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <History className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-800">Prediction History</h3>
        </div>

        {predictionHistory.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            <History className="w-10 h-10 text-gray-200 mx-auto mb-2" />
            No predictions yet
          </div>
        ) : (
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {predictionHistory.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-xl p-3 hover:bg-green-50 transition-colors cursor-pointer border border-transparent hover:border-green-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-800">{item.topCrop}</span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <div className="text-xs text-gray-600">📍 {item.location}</div>
                <div className="text-xs text-green-600 font-medium mt-1">Yield: {item.yield} T/Ha</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="p-2 pb-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 rounded-xl transition-colors text-red-600 font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}
