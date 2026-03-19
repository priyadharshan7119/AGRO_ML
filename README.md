# 🌱 AgroPredict AI Platform

AgroPredict AI is a full-stack, AI-powered smart agriculture platform designed to help farmers and agricultural planners make data-driven decisions. By analyzing real-time geolocation-based environmental data and tapping into historical climate patterns, our machine learning models accurately predict crop yields and recommend the most optimal crops to plant.

![agro-predict-hero](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/Frontend-React.js-blue)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-teal)
![Machine Learning](https://img.shields.io/badge/AI-XGBoost-orange)

### 🌐 Live Demo: [https://agro-ml-liart.vercel.app](https://agro-ml-liart.vercel.app)

## ✨ Key Features
- **🌍 Real-Time Location & Weather Data:** Automatically fetches live coordinates using your device's GPS and retrieves local environmental data (rainfall, humidity, temperature) via NASA POWER Climatology and Open-Meteo APIs.
- **📈 Advanced Yield Prediction:** Utilizes a highly trained **XGBoost Regressor** to predict estimated crop yields (Tons/Hectare) based on soil conditions, location data, and weather.
- **💡 Intelligent Crop Recommendations:** A multi-class **Random Forest / XGBoost Classifier** suggests the top crops most suited for your exact geospatial climate and season.
- **🔍 Explainable AI (XAI):** Gives transparent insights showing exactly *which* environmental features (like Rainfall or Soil Type) influenced the AI's decision the most using feature importance graphs.
- **🎨 Modern, Premium UI:** A beautiful, responsive frontend built with React, Vite, Tailwind CSS, and Framer Motion, featuring rich shadows, dynamic transitions, and polished typography (Inter & Poppins).

---

## 📂 Project Structure

This project is separated into a frontend client and a backend API:

- **[`/frontend`](./frontend/)**: The React + Vite SPA. Handles all UI, routing, and animations.
- **[`/backend`](./backend/)**: The Python FastAPI backend. Houses the Machine Learning models, encoders, datasets, and REST endpoints.

---

## 🚀 Quick Start Guide

To run the full application locally, you will need to start two separate terminal instances: one for the backend server and one for the frontend development server.

### 1. Start the Backend API (Terminal 1)
```bash
cd backend
python -m venv venv
# Activate the virtual environment
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```
*The backend API will run on `http://localhost:8000`.*

### 2. Start the Frontend Client (Terminal 2)
```bash
cd "frontend/AgroPredict AI Platform"
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`. Open this URL in your browser to interact with the platform.*

---

## 🛠️ Technology Stack

**Frontend**
- **Framework:** React.js + TypeScript (managed by Vite)
- **Styling:** Tailwind CSS + custom CSS variables
- **Animations:** framer-motion
- **Icons:** lucide-react
- **Charts:** recharts

**Backend & Machine Learning**
- **Framework:** FastAPI (Python) + Uvicorn
- **Machine Learning:** XGBoost, Scikit-learn, Pandas, NumPy
- **External Data Providers:** Open-Meteo API, NASA POWER
