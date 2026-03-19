import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Cloud, Droplets, Thermometer, Wind, Sprout, ArrowLeft, Loader2, Navigation, ChevronDown, Check } from 'lucide-react';
import type { PredictionResult, UserData, PredictionHistoryItem } from '../App';
import DashboardHeader from './DashboardHeader';

type Props = {
  onNavigate: (page: 'landing' | 'dashboard' | 'results') => void;
  onPredictionComplete: (result: PredictionResult, latitude: string, longitude: string) => void;
  user: UserData | null;
  onLogout: () => void;
  predictionHistory: PredictionHistoryItem[];
};

type WeatherData = {
  temperature: number;
  rainfall: number;
  humidity: number;
  weather: string;
};

export default function PredictionDashboard({ onNavigate, onPredictionComplete, user, onLogout, predictionHistory }: Props) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [soilType, setSoilType] = useState('loamy');
  const [season, setSeason] = useState('kharif');
  const [previousYield, setPreviousYield] = useState('3.5');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Fetch weather data when location changes
  useEffect(() => {
    if (latitude && longitude) {
      const delayFn = setTimeout(() => {
        fetchWeatherData();
      }, 500);
      return () => clearTimeout(delayFn);
    }
  }, [latitude, longitude]);

  const detectLocation = () => {
    setIsLoadingLocation(true);
    setLocationError('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(4));
          setLongitude(position.coords.longitude.toFixed(4));
          setIsLoadingLocation(false);
        },
        (error) => {
          setLocationError('Unable to detect location. Please enter manually.');
          setIsLoadingLocation(false);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
      setIsLoadingLocation(false);
    }
  };

  // const fetchWeatherData = async () => {
  //   setIsLoadingWeather(true);
    
  //   // Simulate API call delay
  //   await new Promise(resolve => setTimeout(resolve, 1500));

  //   // Mock weather data based on location
  //   const lat = parseFloat(latitude);
  //   const mockWeather: WeatherData = {
  //     temperature: 25 + (lat % 10),
  //     rainfall: 800 + Math.floor(Math.random() * 400),
  //     humidity: 65 + Math.floor(Math.random() * 20),
  //     weather: lat > 20 ? 'Partly Cloudy' : 'Clear Sky'
  //   };

  //   setWeatherData(mockWeather);
  //   setIsLoadingWeather(false);
  // };

  // const handlePredict = async () => {
  //   if (!latitude || !longitude || !weatherData) {
  //     alert('Please enter location and wait for weather data to load.');
  //     return;
  //   }

  //   setIsPredicting(true);

  //   // Simulate ML prediction with delay
  //   await new Promise(resolve => setTimeout(resolve, 2500));

  //   // Mock XGBoost prediction results
  //   const result: PredictionResult = {
  //     predicted_yield: 3.8 + Math.random() * 1.5,
  //     model_accuracy: 88 + Math.floor(Math.random() * 8),
  //     top_crops: [
  //       {
  //         crop: 'Rice',
  //         score: 90 + Math.floor(Math.random() * 8),
  //         expected_yield: 4.2 + Math.random() * 0.8,
  //         benefits: [
  //           'High rainfall compatibility',
  //           'Suitable for ' + soilType + ' soil',
  //           'High market demand',
  //           'Optimal for ' + season + ' season'
  //         ]
  //       },
  //       {
  //         crop: 'Maize',
  //         score: 82 + Math.floor(Math.random() * 8),
  //         expected_yield: 3.6 + Math.random() * 0.8,
  //         benefits: [
  //           'Moderate water requirement',
  //           'Warm climate suitability',
  //           'Good for ' + soilType + ' soil'
  //         ]
  //       },
  //       {
  //         crop: 'Wheat',
  //         score: 75 + Math.floor(Math.random() * 8),
  //         expected_yield: 3.2 + Math.random() * 0.8,
  //         benefits: [
  //           'Stable crop yield',
  //           'High market demand',
  //           'Suitable for current season'
  //         ]
  //       }
  //     ],
  //     feature_importance: {
  //       rainfall: 0.30,
  //       soil_type: 0.25,
  //       temperature: 0.20,
  //       humidity: 0.15,
  //       season: 0.10
  //     },
  //     environmental_data: weatherData
  //   };

  //   setIsPredicting(false);
  //   onPredictionComplete(result, latitude, longitude);
  // };

// const fetchWeatherData = async () => {
//   setIsLoadingWeather(true);

//   try {

//     const response = await fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,precipitation`
//     );

//     const data = await response.json();

//     const weather: WeatherData = {
//       temperature: data.current_weather.temperature,
//       rainfall: data.hourly.precipitation[0],
//       humidity: data.hourly.relativehumidity_2m[0],
//       weather: "Clear Sky"
//     };

//     setWeatherData(weather);

//   } catch (error) {

//     console.error("Weather API error:", error);
//     alert("Failed to fetch weather data");

//   }

//   setIsLoadingWeather(false);
// };

// const handlePredict = async () => {

//   if (!latitude || !longitude) {
//     alert("Please enter location first");
//     return;
//   }

//   setIsPredicting(true);

//   try {

//     const response = await fetch("http://127.0.0.1:8000/predict", {

//       method: "POST",

//       headers: {
//         "Content-Type": "application/json"
//       },

//       body: JSON.stringify({
//         latitude: latitude,
//         longitude: longitude,
//         soil_type: soilType,
//         season: season
//       })

//     });

//     if (!response.ok) {
//       throw new Error("Prediction failed");
//     }

//   const result = await response.json()

//   // update UI weather using backend data
//   setWeatherData(result.environmental_data)

//   setIsPredicting(false)

//   onPredictionComplete(result, latitude, longitude)

//   } catch (error) {

//     console.error("Prediction error:", error);
//     alert("Backend not running or API failed");

//     setIsPredicting(false);
//   }

// };

const fetchWeatherData = async () => {

  setIsLoadingWeather(true);

  try {

    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${apiUrl}/weather`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      })
    });

    if (!response.ok) {
      throw new Error("Weather fetch failed");
    }

    const data = await response.json();

    const weather: WeatherData = {
      temperature: data.temperature,
      rainfall: data.rainfall,
      humidity: data.humidity,
      weather: data.weather
    };

    setWeatherData(weather);

  } catch (error) {

    console.error("Weather API error:", error);
    alert("Failed to fetch weather data. Is backend running?");

  } finally {

    setIsLoadingWeather(false);

  }
};

const handlePredict = async () => {

  if (!latitude || !longitude) {
    alert("Please enter location first");
    return;
  }

  setIsPredicting(true);

  try {

    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${apiUrl}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        soil_type: soilType,
        season: season
      })
    });

    if (!response.ok) {
      throw new Error("Prediction failed");
    }

    const result = await response.json();

    // Update environmental data from backend
    if (result.environmental_data) {
      setWeatherData({
        temperature: result.environmental_data.temperature,
        rainfall: result.environmental_data.rainfall,
        humidity: result.environmental_data.humidity,
        weather: result.environmental_data.weather
      });
    }

    onPredictionComplete(result, latitude, longitude);

  } catch (error) {

    console.error("Prediction error:", error);
    alert("Backend not running or API failed");

  } finally {

    setIsPredicting(false);

  }

};

  return (
    <div className="min-h-screen py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {user && (
          <DashboardHeader
            user={user}
            onLogout={onLogout}
            onNavigateHome={() => onNavigate('landing')}
            predictionHistory={predictionHistory}
          />
        )}

        {/* Main Content - Add top padding for fixed header */}
        <div className="pt-20 md:pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)]">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <MapPin className="w-6 h-6 text-green-600" />
                  Location & Parameters
                </h2>

                {/* Location Detection */}
                <div className="mb-6">
                  <button
                    onClick={detectLocation}
                    disabled={isLoadingLocation}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoadingLocation ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Detecting Location...
                      </>
                    ) : (
                      <>
                        <Navigation className="w-5 h-5" />
                        Detect My Location
                      </>
                    )}
                  </button>
                  {locationError && (
                    <p className="text-red-500 text-sm mt-2">{locationError}</p>
                  )}
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      placeholder="11.0168"
                      className="w-full px-4 py-3 md:py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/60 bg-white text-gray-800 placeholder-gray-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      placeholder="76.9558"
                      className="w-full px-4 py-3 md:py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/60 bg-white text-gray-800 placeholder-gray-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Soil Type */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil Type
                  </label>
                  <CustomDropdown
                    value={soilType}
                    onChange={setSoilType}
                    options={[
                      { value: 'loamy', label: 'Loamy' },
                      { value: 'clay', label: 'Clay' },
                      { value: 'sandy', label: 'Sandy' },
                      { value: 'silty', label: 'Silty' },
                      { value: 'peaty', label: 'Peaty' },
                      { value: 'chalky', label: 'Chalky' },
                    ]}
                  />
                </div>

                {/* Season */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Season
                  </label>
                  <CustomDropdown
                    value={season}
                    onChange={setSeason}
                    options={[
                      { value: 'kharif', label: 'Kharif (Monsoon)' },
                      { value: 'rabi', label: 'Rabi (Winter)' },
                      { value: 'zaid', label: 'Zaid (Summer)' },
                      { value: 'whole_year', label: 'Whole Year' },
                    ]}
                  />
                </div>

                {/* Previous Yield */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Yield (Tons/Hectare)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={previousYield}
                    onChange={(e) => setPreviousYield(e.target.value)}
                    placeholder="3.5"
                    className="w-full px-4 py-3 md:py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/60 bg-white text-gray-800 placeholder-gray-400 transition-colors"
                  />
                </div>

                {/* Predict Button */}
                <motion.button
                  onClick={handlePredict}
                  disabled={isPredicting}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isPredicting ? 1 : 1.02 }}
                  whileTap={{ scale: isPredicting ? 1 : 0.98 }}
                >
                  {isPredicting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Running AI Prediction...
                    </>
                  ) : (
                    <>
                      <Sprout className="w-5 h-5" />
                      Predict Crop Yield
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column - Real-Time Data */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)]">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Cloud className="w-6 h-6 text-green-600" />
                  Real-Time Environmental Data
                </h2>

                {!weatherData && !isLoadingWeather && (
                  <div className="text-center py-12">
                    <Cloud className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Enter location to fetch real-time weather data
                    </p>
                  </div>
                )}

                {isLoadingWeather && (
                  <div className="text-center py-12">
                    <Loader2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-spin" />
                    <p className="text-gray-600 font-medium">
                      Fetching real-time data from weather APIs...
                    </p>
                  </div>
                )}

                {weatherData && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* Temperature */}
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-6 h-6" />
                          <span className="font-medium">Temperature</span>
                        </div>
                        <span className="text-3xl font-bold">{weatherData.temperature.toFixed(1)}°C</span>
                      </div>
                      <div className="text-sm opacity-90">Optimal range: 20-30°C</div>
                    </div>

                    {/* Rainfall */}
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-6 h-6" />
                          <span className="font-medium">Annual Rainfall</span>
                        </div>
                        <span className="text-3xl font-bold">{weatherData.rainfall.toFixed(0)} mm</span>
                      </div>
                      <div className="text-sm opacity-90">Historical avg (NASA 30yr climatology)</div>
                    </div>

                    {/* Humidity */}
                    <div className="bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Wind className="w-6 h-6" />
                          <span className="font-medium">Avg Humidity</span>
                        </div>
                        <span className="text-3xl font-bold">{weatherData.humidity.toFixed(0)}%</span>
                      </div>
                      <div className="text-sm opacity-90">Historical annual average (NASA)</div>
                    </div>

                    {/* Weather Condition */}
                    <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Cloud className="w-6 h-6" />
                          <span className="font-medium">Weather Condition</span>
                        </div>
                        <span className="text-xl font-bold">{weatherData.weather}</span>
                      </div>
                      <div className="text-sm opacity-90">Current sky conditions</div>
                    </div>

                    {/* Data Source Info */}
                    <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                      <p className="text-xs text-gray-600">
                        📡 Data fetched from Weather API, NASA POWER, and SoilGrids
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Info Cards */}
          <motion.div
            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[{val:'XGBoost', lbl:'ML Algorithm'},{val:'Real-Time', lbl:'Weather Integration'},{val:'92%+', lbl:'Prediction Accuracy'}].map((info, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)] text-center">
                <div className="text-2xl font-bold text-green-600 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{info.val}</div>
                <div className="text-sm text-gray-500">{info.lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Custom Select / Dropdown Component
function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = "Select an option"
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 md:py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500/60 transition-colors flex items-center justify-between text-left shadow-sm ${
          isOpen ? 'border-green-500 ring-2 ring-green-500/20 bg-green-50/30' : 'border-gray-200 bg-white hover:border-green-300'
        }`}
      >
        <span className={selectedOption ? 'text-gray-800' : 'text-gray-400 font-medium'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-green-500' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden py-1"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left flex items-center justify-between transition-colors ${
                      isSelected ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-green-600" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}