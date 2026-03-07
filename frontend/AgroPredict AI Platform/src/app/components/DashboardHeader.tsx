import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, User, LogOut, History, ChevronDown } from 'lucide-react';

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
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-green-100 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            AgroPredict AI
          </span>
        </button>

        {/* Profile Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-1.5 md:py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-md"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-left hidden md:block">
              <div className="text-sm font-semibold text-gray-800">{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
            <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-gray-600 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Profile Info */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{user.name}</div>
                      <div className="text-sm text-green-50">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                    <User className="w-4 h-4" />
                    <span>Premium Member</span>
                  </div>
                </div>

                {/* Prediction History */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <History className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-800">Prediction History</h3>
                  </div>
                  
                  {predictionHistory.length === 0 ? (
                    <div className="text-center py-6 text-gray-500 text-sm">
                      <History className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      No predictions yet
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {predictionHistory.map((item) => (
                        <div
                          key={item.id}
                          className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-gray-800">{item.topCrop}</span>
                            <span className="text-xs text-gray-500">{item.date}</span>
                          </div>
                          <div className="text-xs text-gray-600">
                            📍 {item.location}
                          </div>
                          <div className="text-xs text-green-600 font-medium mt-1">
                            Yield: {item.yield} T/Ha
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600 font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
