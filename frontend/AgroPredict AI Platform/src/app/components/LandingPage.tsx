import { motion } from 'motion/react';
import { Sprout, TrendingUp, Cloud, Lightbulb, MapPin, Brain, BarChart3, LogIn } from 'lucide-react';
import { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import type { UserData } from '../App';

type Props = {
  onNavigate: (page: 'landing' | 'dashboard' | 'results') => void;
  user: UserData | null;
  onLogin: (userData: UserData) => void;
  onLogout: () => void;
};

export default function LandingPage({ onNavigate, user, onLogin, onLogout }: Props) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLoginSuccess = (userData: UserData) => {
    onLogin(userData);
  };

  const handleSignupSuccess = (userData: UserData) => {
    onLogin(userData);
  };

  const handleNavigateToDashboard = () => {
    if (user) {
      onNavigate('dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  const features = [
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Real-Time Weather Data",
      description: "Automatically fetch live weather conditions, temperature, rainfall, and humidity based on your location."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Crop Yield Prediction",
      description: "Advanced XGBoost ML algorithm predicts accurate crop yields using environmental and historical data."
    },
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "Top 3 Crop Recommendations",
      description: "Get personalized crop suggestions with suitability scores and expected yields for your location."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Explainable AI Insights",
      description: "Understand which factors influence predictions with transparent feature importance analysis."
    }
  ];

  const steps = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Enter or detect location",
      description: "Use GPS or manually input coordinates"
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "System fetches real-time data",
      description: "Weather, soil, and environmental conditions"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI predicts and recommends",
      description: "Crop yield prediction and top 3 suitable crops"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-green-100/60 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-green-500/30">
              <Sprout className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
              AgroPredict AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-gray-600 text-sm">Welcome, <span className="font-semibold text-green-600">{user.name}</span></span>
                <button
                  onClick={onLogout}
                  className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-5 py-2 text-green-700 font-medium hover:text-green-800 text-sm transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 text-sm font-medium"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile nav */}
          <div className="md:hidden flex items-center gap-2">
            {user ? (
              <button
                onClick={handleNavigateToDashboard}
                className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="p-2 text-green-600"
              >
                <LogIn className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-5 px-4 py-2 bg-green-100 rounded-full border border-green-200">
              <span className="text-green-700 font-medium text-sm md:text-base">🌱 Powered by XGBoost Machine Learning</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight px-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              AI Powered Smart Agriculture
              <br className="hidden md:block" />
              {' '}Prediction Platform
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4 leading-relaxed">
              Predict crop yield and discover the best crops using geolocation and real-time environmental data.
              Make informed decisions with AI-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-6">
              <motion.button
                onClick={handleNavigateToDashboard}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-2.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sprout className="w-5 h-5" />
                Start Prediction
              </motion.button>
              <motion.button
                onClick={handleNavigateToDashboard}
                className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold border-2 border-green-500 hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 className="w-5 h-5" />
                View Dashboard
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Stats Cards */}
          <motion.div
            className="mt-12 md:mt-16 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mx-auto max-w-4xl px-4">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/60 backdrop-blur-2xl rounded-3xl p-4 md:p-8 border border-white/70 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.12)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: <TrendingUp className="w-8 h-8" />, value: '4.3T', label: 'Predicted Yield', gradient: 'from-green-400 to-emerald-500' },
                    { icon: <Sprout className="w-8 h-8" />, value: 'Top 3', label: 'Crop Recommendations', gradient: 'from-emerald-400 to-teal-500' },
                    { icon: <Brain className="w-8 h-8" />, value: '92%', label: 'Model Accuracy', gradient: 'from-teal-400 to-cyan-500' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-4 md:p-6 text-white flex items-center md:block gap-4 md:gap-0 shadow-lg`}
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-0 md:mb-2">{stat.icon}</div>
                      <div className="text-left md:text-center flex-1">
                        <div className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{stat.value}</div>
                        <div className="text-xs md:text-sm opacity-90 mt-0.5">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 px-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Powerful Features for Smart Farming
            </h2>
            <p className="text-gray-600 text-base md:text-lg px-6">
              Leverage cutting-edge AI technology to optimize your agricultural decisions
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-md shadow-green-500/25 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 px-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              How It Works
            </h2>
            <p className="text-gray-600 text-base md:text-lg px-6">
              Three simple steps to get AI-powered crop predictions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.12)] transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white mb-4 shadow-md shadow-green-500/25">
                    {step.icon}
                  </div>
                  <div className="text-4xl font-black text-green-500 mb-2 opacity-25" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-10 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 absolute -right-1 -top-[3px]"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-[0_25px_60px_-12px_rgba(34,197,94,0.4)]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Ready to Optimize Your Farming?
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90 px-4 leading-relaxed">
                Start making data-driven decisions with AI-powered crop predictions
              </p>
              <motion.button
                onClick={handleNavigateToDashboard}
                className="w-full sm:w-auto px-10 py-4 bg-white text-green-600 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Launch Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white/40 backdrop-blur-sm border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sprout className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>AgroPredict AI</span>
          </div>
          <p className="text-sm">
            © 2026 AgroPredict AI. Geolocation Driven Crop Yield Prediction and Smart Crop Recommendation System.
          </p>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
        onLoginSuccess={(userData) => {
          handleLoginSuccess(userData);
          onNavigate('dashboard');
        }}
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
        onSignupSuccess={(userData) => {
          handleSignupSuccess(userData);
          onNavigate('dashboard');
        }}
      />
    </div>
  );
}