import os
import glob
import pandas as pd
import xgboost as xgb
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, mean_absolute_error

# ── Merge all CSV files from data/ folder ─────────────────────────────────────
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
csv_files = glob.glob(os.path.join(DATA_DIR, "*.csv"))

if not csv_files:
    raise FileNotFoundError(f"No CSV files found in {DATA_DIR}")

dfs = []
for f in csv_files:
    df = pd.read_csv(f)
    print(f"  Loaded {os.path.basename(f):40s} -> {len(df):4d} rows")
    dfs.append(df)

data = pd.concat(dfs, ignore_index=True).drop_duplicates()
print(f"\nTotal combined rows : {len(data)}")
print(f"Unique crops        : {sorted(data['crop'].unique())}")
print(f"Crops count         : {data['crop'].nunique()}")

# ── Encoders ──────────────────────────────────────────────────────────────────
soil_encoder   = LabelEncoder()
season_encoder = LabelEncoder()
crop_encoder   = LabelEncoder()

data["soil_enc"]   = soil_encoder.fit_transform(data["soil_type"])
data["season_enc"] = season_encoder.fit_transform(data["season"])
data["crop_enc"]   = crop_encoder.fit_transform(data["crop"])

FEATURES = ["temperature", "rainfall", "humidity", "soil_enc", "season_enc"]

# ── 1. Yield regressor ─────────────────────────────────────────────────────────
X      = data[FEATURES]
y_yld  = data["yield"]
Xtr, Xte, ytr, yte = train_test_split(X, y_yld, test_size=0.15, random_state=42)

yield_model = xgb.XGBRegressor(
    n_estimators=300, max_depth=6, learning_rate=0.05,
    subsample=0.8, colsample_bytree=0.8, random_state=42
)
yield_model.fit(Xtr, ytr)
mae = mean_absolute_error(yte, yield_model.predict(Xte))
print(f"\n[Yield regressor]   MAE = {mae:.3f} t/ha")

# ── 2. Crop classifier ─────────────────────────────────────────────────────────
y_crop = data["crop_enc"]
Xcr, Xce, ycr, yce = train_test_split(X, y_crop, test_size=0.15,
                                       random_state=42, stratify=y_crop)

crop_model = xgb.XGBClassifier(
    n_estimators=300, max_depth=6, learning_rate=0.05,
    subsample=0.8, colsample_bytree=0.8,
    use_label_encoder=False, eval_metric="mlogloss", random_state=42
)
crop_model.fit(Xcr, ycr)
acc = accuracy_score(yce, crop_model.predict(Xce))
print(f"[Crop classifier]   Accuracy = {acc*100:.1f}%")
print(f"[Crop classes]      {list(crop_encoder.classes_)}")

# ── Save artifacts ─────────────────────────────────────────────────────────────
joblib.dump(yield_model,    "xgboost_model.pkl")
joblib.dump(crop_model,     "crop_classifier.pkl")
joblib.dump(soil_encoder,   "soil_encoder.pkl")
joblib.dump(season_encoder, "season_encoder.pkl")
joblib.dump(crop_encoder,   "crop_encoder.pkl")

print("\nAll models saved!")