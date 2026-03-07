import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import PredictionDashboard from './components/PredictionDashboard';
import ResultsPage from './components/ResultsPage';

export type PredictionResult = {
  predicted_yield: number;
  model_accuracy: number;
  top_crops: Array<{
    crop: string;
    icon: string;
    score: number;
    expected_yield: number;
    description: string;
    explanation: string;
    benefits: string[];
    warnings: string[];
  }>;
  feature_importance: {
    rainfall: number;
    soil_type: number;
    temperature: number;
    humidity: number;
    season: number;
  };
  environmental_data: {
    temperature: number;
    rainfall: number;
    humidity: number;
    weather: string;
  };
};

export type PredictionHistoryItem = {
  id: string;
  date: string;
  yield: number;
  location: string;
  topCrop: string;
};

export type UserData = {
  name: string;
  email: string;
};

type Page = 'landing' | 'dashboard' | 'results';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [predictionHistory, setPredictionHistory] = useState<PredictionHistoryItem[]>([]);
  
  // Reset scroll position to top whenever current page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (userData: UserData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const handlePredictionComplete = (result: PredictionResult, latitude: string, longitude: string) => {
    setPredictionResult(result);
    
    // Add to prediction history
    const historyItem: PredictionHistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      yield: result.predicted_yield,
      location: `${parseFloat(latitude).toFixed(2)}°N, ${parseFloat(longitude).toFixed(2)}°E`,
      topCrop: result.top_crops[0].crop
    };
    
    setPredictionHistory(prev => [historyItem, ...prev].slice(0, 10)); // Keep last 10 predictions
    setCurrentPage('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {currentPage === 'landing' && (
        <LandingPage 
          onNavigate={handleNavigate}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'dashboard' && (
        <PredictionDashboard 
          onNavigate={handleNavigate}
          onPredictionComplete={handlePredictionComplete}
          user={user}
          onLogout={handleLogout}
          predictionHistory={predictionHistory}
        />
      )}
      {currentPage === 'results' && predictionResult && (
        <ResultsPage 
          result={predictionResult}
          onNavigate={handleNavigate}
          user={user}
          onLogout={handleLogout}
          predictionHistory={predictionHistory}
        />
      )}
    </div>
  );
}