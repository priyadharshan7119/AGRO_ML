import { motion } from 'motion/react';
import { Sprout, TrendingUp, Cloud, Lightbulb, MapPin, Brain, BarChart3, LogIn, UserPlus } from 'lucide-react';
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
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-green-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              AgroPredict AI
            </span>
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user.name}</span>
              <button 
                onClick={onLogout}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowLoginModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Login
              </button>
              <button 
                onClick={() => setShowSignupModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-green-100 rounded-full">
              <span className="text-green-700 font-medium">🌱 Powered by XGBoost Machine Learning</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
              AI Powered Smart Agriculture
              <br />
              Prediction Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Predict crop yield and discover the best crops using geolocation and real-time environmental data. 
              Make informed decisions with AI-driven insights.
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={handleNavigateToDashboard}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sprout className="w-5 h-5" />
                Start Prediction
              </motion.button>
              <motion.button
                onClick={handleNavigateToDashboard}
                className="px-8 py-4 bg-white text-green-600 rounded-xl font-medium border-2 border-green-500 hover:bg-green-50 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 className="w-5 h-5" />
                View Dashboard
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div
            className="mt-16 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-2xl">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white">
                    <TrendingUp className="w-8 h-8 mb-2" />
                    <div className="text-2xl font-bold">4.3T</div>
                    <div className="text-sm opacity-90">Predicted Yield</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-6 text-white">
                    <Sprout className="w-8 h-8 mb-2" />
                    <div className="text-2xl font-bold">Top 3</div>
                    <div className="text-sm opacity-90">Crop Recommendations</div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl p-6 text-white">
                    <Brain className="w-8 h-8 mb-2" />
                    <div className="text-2xl font-bold">92%</div>
                    <div className="text-sm opacity-90">Model Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Powerful Features for Smart Farming
            </h2>
            <p className="text-gray-600 text-lg">
              Leverage cutting-edge AI technology to optimize your agricultural decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/50 backdrop-blur-xl rounded-2xl p-6 border border-white/60 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Three simple steps to get AI-powered crop predictions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 border border-white/60 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white mb-4">
                    {step.icon}
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Optimize Your Farming?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start making data-driven decisions with AI-powered crop predictions
              </p>
              <motion.button
                onClick={handleNavigateToDashboard}
                className="px-8 py-4 bg-white text-green-600 rounded-xl font-medium hover:shadow-2xl transition-all duration-300"
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
      <footer className="py-8 px-6 bg-white/30 backdrop-blur-sm border-t border-green-100">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sprout className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-800">AgroPredict AI</span>
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