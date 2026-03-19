# 🎨 AgroPredict AI — Frontend Application

The frontend powers the AgroPredict AI user interface. It is a highly polished React SPA (Single Page Application) that communicates with our FastAPI backend to provide users with predictive insights, crop recommendations, and their individual prediction history.

## 🚀 Features & Aesthetics
- **Modern Animations**: Fully integrated with `motion/react` (Framer Motion) for smooth UI transitions, spring-animated dropdowns, hover cards, and page loads.
- **Explainable AI Views**: Real-time interactive charts (via `recharts`) that visualize exact Machine Learning feature importance weights directly in the client.
- **Mobile First & Responsive**: A layout adapting to whatever screen size you use. Employs slide-up bottom sheets on mobile menus instead of clunky popups.
- **Design System**: Uses a custom Tailwind CSS configuration for deep shadows (`--shadow-elevated`, `--shadow-glow-green`), gradients, and premium Google typography (`Inter` for body texts and `Poppins` for display headings).

## 🗂️ Component Architecture

All UI components reside in `src/app/components/`:
- **`App.tsx`**: The main router and state wrapper. Holds current logged-in user context and determines layout flows.
- **`LandingPage.tsx`**: A beautifully animated hero section explaining features and inviting users to sign up or log in.
- **`PredictionDashboard.tsx`**: The core application logic. Detects live location and allows configuring environmental variables before sending them off to the ML models.
- **`ResultsPage.tsx`**: Renders the XGBoost output, including a dynamic Top Crops list, yield metrics, and a feature importance bar chart.
- **`DashboardHeader.tsx`**: Shared navigation featuring a unified desktop dropdown and mobile sheet.

## 🛠️ Installation & Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd "frontend/AgroPredict AI Platform"
   ```
2. **Install Node modules:**
   ```bash
   npm install
   ```
3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```

The application will launch on **`http://localhost:5173`** (or whichever iterative port Vite assigns). Ensure your FastAPI backend is running simultaneously on `http://localhost:8000` to properly fetch predictions.