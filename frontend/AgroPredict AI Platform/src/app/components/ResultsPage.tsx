import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Sprout, Award, CheckCircle, AlertTriangle, Thermometer, Droplets, Wind, Cloud, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { PredictionResult, UserData, PredictionHistoryItem } from '../App';
import DashboardHeader from './DashboardHeader';

type Props = {
  result: PredictionResult;
  onNavigate: (page: 'landing' | 'dashboard' | 'results') => void;
  user: UserData | null;
  onLogout: () => void;
  predictionHistory: PredictionHistoryItem[];
};

const RANK_STYLES = [
  { badge: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white', label: '🥇 Best Pick' },
  { badge: 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900', label: '🥈 Runner Up' },
  { badge: 'bg-gradient-to-r from-orange-300 to-orange-500 text-white', label: '🥉 3rd Choice' },
  { badge: 'bg-gradient-to-r from-blue-300 to-blue-500 text-white',   label: '4th' },
  { badge: 'bg-gradient-to-r from-teal-300 to-teal-500 text-white',   label: '5th' },
];

export default function ResultsPage({ result, onNavigate, user, onLogout, predictionHistory }: Props) {
  const featureData = [
    { name: 'Rainfall', value: result.feature_importance.rainfall * 100, color: '#3b82f6' },
    { name: 'Soil Type', value: result.feature_importance.soil_type * 100, color: '#8b5cf6' },
    { name: 'Temperature', value: result.feature_importance.temperature * 100, color: '#ef4444' },
    { name: 'Humidity', value: result.feature_importance.humidity * 100, color: '#06b6d4' },
    { name: 'Season', value: result.feature_importance.season * 100, color: '#10b981' }
  ];

  return (
    <div className="min-h-screen py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {user && (
          <DashboardHeader
            user={user}
            onLogout={onLogout}
            onNavigateHome={() => onNavigate('landing')}
            predictionHistory={predictionHistory}
          />
        )}

        <div className="pt-20 md:pt-24 px-2 md:px-0">
          {/* ── Main Prediction Card ── */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="text-lg md:text-xl font-medium opacity-90">AI Predicted Yield</span>
                  </div>
                  <div className="text-5xl md:text-6xl font-bold mb-2">{result.predicted_yield.toFixed(2)}</div>
                  <div className="text-xl md:text-2xl opacity-90">Tons per Hectare</div>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 md:p-6 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base md:text-lg font-medium">Model Accuracy</span>
                      <Award className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold mb-2">{result.model_accuracy}%</div>
                    <div className="w-full bg-white/30 rounded-full h-2 md:h-3">
                      <div
                        className="bg-white rounded-full h-2 md:h-3 transition-all duration-1000"
                        style={{ width: `${result.model_accuracy}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] md:text-xs mt-2 opacity-80">XGBoost model trained on Indian agri-climate data</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Historical Environmental Data ── */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Cloud className="w-6 h-6 text-green-600" />
              Historical Climate Data Used for Prediction
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-4 text-white">
                <Thermometer className="w-6 h-6 mb-2" />
                <div className="text-2xl font-bold">{result.environmental_data.temperature.toFixed(1)}°C</div>
                <div className="text-sm opacity-90">Current Temperature</div>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-white">
                <Droplets className="w-6 h-6 mb-2" />
                <div className="text-2xl font-bold">{result.environmental_data.rainfall.toFixed(0)} mm</div>
                <div className="text-sm opacity-90">Annual Rainfall (30yr avg)</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl p-4 text-white">
                <Wind className="w-6 h-6 mb-2" />
                <div className="text-2xl font-bold">{result.environmental_data.humidity.toFixed(0)}%</div>
                <div className="text-sm opacity-90">Annual Avg Humidity</div>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-4 text-white">
                <Cloud className="w-6 h-6 mb-2" />
                <div className="text-lg font-bold">{result.environmental_data.weather}</div>
                <div className="text-sm opacity-90">Current Condition</div>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
              📡 Rainfall & humidity sourced from NASA POWER 30-year climatology dataset for your exact coordinates. Temperature from Open-Meteo live API.
            </p>
          </motion.div>

          {/* ── Top Crop Recommendations ── */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Sprout className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              Crop Recommendations
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Ranked by suitability score computed from your location's historical climate, soil type, and season.
            </p>

            <div className="space-y-5">
              {result.top_crops.map((crop, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.09)] hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] transition-shadow overflow-hidden"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.08 }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left accent bar */}
                    <div
                      className="md:w-2 w-full h-2 md:h-auto flex-shrink-0"
                      style={{
                        background: index === 0
                          ? 'linear-gradient(to bottom, #fbbf24, #f59e0b)'
                          : index === 1
                          ? 'linear-gradient(to bottom, #9ca3af, #6b7280)'
                          : index === 2
                          ? 'linear-gradient(to bottom, #fb923c, #ea580c)'
                          : 'linear-gradient(to bottom, #60a5fa, #2563eb)'
                      }}
                    />

                    <div className="flex-1 p-5">
                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row items-start gap-3 mb-3">
                        <span className="text-4xl">{crop.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-2">
                             <h3 className="text-xl font-bold text-gray-800">{crop.crop}</h3>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${RANK_STYLES[index].badge}`}>
                              {RANK_STYLES[index].label}
                            </span>
                          </div>
                           <p className="text-sm text-gray-500 mt-0.5">{crop.description}</p>
                        </div>
                        {/* Score ring */}
                        <div className="flex sm:flex-col items-center gap-2 sm:gap-0 sm:flex-shrink-0 text-center bg-gray-50 sm:bg-transparent p-2 sm:p-0 rounded-lg w-full sm:w-auto">
                          <div
                            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold text-base sm:text-lg text-white shadow-md"
                            style={{
                              background: crop.score >= 70
                                ? 'linear-gradient(135deg,#22c55e,#15803d)'
                                : crop.score >= 45
                                ? 'linear-gradient(135deg,#f59e0b,#d97706)'
                                : 'linear-gradient(135deg,#ef4444,#b91c1c)'
                            }}
                          >
                            {crop.score.toFixed(0)}
                          </div>
                          <div className="text-xs text-gray-500 sm:mt-1">Suitability Score</div>
                        </div>
                      </div>

                      {/* Score bar */}
                      <div className="mb-3">
                         <div className="flex justify-between text-xs text-gray-500 mb-1">
                           <span>Suitability</span>
                           <span className="font-semibold text-gray-700">{crop.score.toFixed(0)} / 100</span>
                         </div>
                         <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="rounded-full h-2"
                            style={{
                              background: crop.score >= 70
                                ? 'linear-gradient(to right,#22c55e,#15803d)'
                                : crop.score >= 45
                                ? 'linear-gradient(to right,#f59e0b,#d97706)'
                                : 'linear-gradient(to right,#ef4444,#b91c1c)'
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${crop.score}%` }}
                            transition={{ duration: 0.9, delay: 0.4 + index * 0.08 }}
                          />
                        </div>
                      </div>

                      {/* Yield + AI explanation */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                         <div className="bg-green-50 rounded-xl p-3 text-center flex sm:block items-center justify-between">
                           <div className="text-xs text-gray-500 sm:mb-0.5">Est. Yield</div>
                           <div className="text-xl font-bold text-green-700">{crop.expected_yield.toFixed(1)} T/Ha</div>
                         </div>
                         <div className="sm:col-span-2 bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2">
                           <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                           <p className="text-xs text-blue-800 leading-relaxed">{crop.explanation}</p>
                        </div>
                      </div>

                      {/* Benefits & Warnings */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {crop.benefits.length > 0 && (
                          <div>
                            <div className="text-[10px] font-bold text-green-700 mb-2 uppercase tracking-wider">
                              ✅ Why it fits
                            </div>
                            <ul className="space-y-2">
                               {crop.benefits.map((b, i) => (
                                 <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                  <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {crop.warnings.length > 0 && (
                          <div>
                            <div className="text-[10px] font-bold text-amber-700 mb-2 uppercase tracking-wider">
                              ⚠️ Watch out for
                            </div>
                            <ul className="space-y-2">
                               {crop.warnings.map((w, i) => (
                                 <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                                  <span>{w}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Feature Importance ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)]">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <Award className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                Explainable AI — Feature Importance
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                The XGBoost model analysed {featureData.length} environmental features.
                Here's how much each one influenced the prediction.
              </p>

              <div className="h-72 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={featureData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                    <XAxis dataKey="name" angle={-40} textAnchor="end" height={70} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <YAxis label={{ value: 'Importance (%)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} tick={{ fill: '#9ca3af' }} />
                    <Tooltip
                      formatter={(value: number) => [`${value.toFixed(1)}%`, 'Importance']}
                      contentStyle={{ backgroundColor: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f1f5f9' }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {featureData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {featureData.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: feature.color }}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{feature.name}</span>
                        <span className="font-bold text-gray-900">{feature.value.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <motion.div
                          className="rounded-full h-1.5"
                          style={{ backgroundColor: feature.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${feature.value}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Why these weights?</h3>
                    <p className="text-sm text-blue-800">
                      <strong>Rainfall ({featureData[0].value.toFixed(0)}%)</strong> and{' '}
                      <strong>Soil Type ({featureData[1].value.toFixed(0)}%)</strong> are the dominant
                      predictors because crop water requirements and root-zone health are fundamentally
                      determined by how much water falls and how well the ground can hold it.
                      Together they account for over half the model's decision weight, which aligns
                      with agricultural science consensus on yield determinants in tropical and sub-tropical regions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Action Buttons ── */}
          <motion.div
            className="mt-8 mb-12 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300"
            >
              New Prediction
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-green-600 rounded-xl font-semibold border-2 border-green-500 hover:bg-green-50 transition-all duration-300"
            >
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}