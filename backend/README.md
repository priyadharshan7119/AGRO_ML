# ⚙️ AgroPredict AI — Backend Server

The backend of the AgroPredict AI ecosystem is built on **FastAPI**. It handles all machine learning inferences, external api data-fetching, user authentication mocks, and prediction history management. 

## 🧠 Machine Learning Engine
Inside the `/backend` directory, you'll find the core intelligence that powers the platform:
- **`xgboost_model.pkl`**: The trained XGBoost regression model responsible for predicting crop yields in Tons/Hectare based on environmental features.
- **`crop_classifier.pkl`**: A multi-class ML classifier that evaluates physical parameters and ranks suitable crop recommendations.
- **`*_encoder.pkl`**: Scikit-Learn LabelEncoders utilized for converting categorical text inputs (like soil type and season) into numerical formats parsed by the ML models.
- **`train_model.py`**: The training script used to generate these `.pkl` files based on the `crop_dataset.csv`.

## 🌐 Endpoints

- `POST /predict/yield`: Core endpoint. Takes location coordinates and soil features, queries weather APIs, processes them through the `.pkl` models, and returns full predict output alongside XAI feature importance weights.
- `POST /auth/login` / `POST /auth/signup`: User authentication endpoints.

## 🛠️ Installation & Setup

1. **Ensure Python 3.9+ is installed.**
2. **Navigate into the backend directory:**
   ```bash
   cd backend
   ```
3. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On Mac/Linux
   source venv/bin/activate
   ```
4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
5. **Run the server:**
   ```bash
   uvicorn main:app --reload
   ```

The backend runs on **`http://localhost:8000`** by default.
You can view the interactive Swagger API Documentation by visiting **`http://localhost:8000/docs`** in your browser while the server is running.
