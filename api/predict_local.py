import sys
import os
import json
import warnings
warnings.filterwarnings("ignore")
import joblib
import pandas as pd
import numpy as np

# Path configurations
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "model", "model_bundle.pkl")
RULES_PATH = os.path.join(BASE_DIR, "model", "recommendation_rules.json")

def load_assets():
    model_bundle = None
    recommendation_rules = {}

    if os.path.exists(RULES_PATH):
        with open(RULES_PATH, "r", encoding="utf-8") as f:
            recommendation_rules = json.load(f)

    if os.path.exists(MODEL_PATH):
        try:
            model_bundle = joblib.load(MODEL_PATH)
        except Exception as e:
            sys.stderr.write(f"Error loading model: {str(e)}\n")
    return model_bundle, recommendation_rules

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"status": "error", "message": "Missing mode argument"}))
        return

    mode = sys.argv[1]

    # Read payload from stdin
    try:
        payload_str = sys.stdin.read()
        payload = json.loads(payload_str)
    except Exception as e:
        print(json.dumps({"status": "error", "message": f"Invalid payload: {str(e)}"}))
        return

    model_bundle, recommendation_rules = load_assets()
    if not model_bundle:
        print(json.dumps({"status": "error", "message": "Model bundle not loaded"}))
        return

    try:
        if mode == "predict-price":
            reg_model = model_bundle["models"].get("regression_model") or model_bundle["models"].get("regresi")
            features = model_bundle.get("preprocessing", {}).get("feature_columns_regression") or [
                "tahun", "bulan_angka", "month_index", "komoditas_encoded",
                "provinsi_encoded", "jenis_harga_encoded", "level_wilayah_encoded",
                "harga_sebelumnya", "rata_rata_3_bulan", "volatilitas_3_bulan",
                "perubahan_harga", "persentase_kenaikan"
            ]

            input_data = {
                "tahun": [payload.get("tahun", 2026)],
                "bulan_angka": [payload.get("bulan_angka", 5)],
                "month_index": [payload.get("month_index", 24317)],
                "komoditas_encoded": [payload.get("komoditas_encoded", 7)],
                "provinsi_encoded": [payload.get("provinsi_encoded", 7)],
                "jenis_harga_encoded": [payload.get("jenis_harga_encoded", 0)],
                "level_wilayah_encoded": [payload.get("level_wilayah_encoded", 0)],
                "harga_sebelumnya": [payload.get("harga_sebelumnya", 0.0)],
                "rata_rata_3_bulan": [payload.get("rata_rata_3_bulan", 0.0)],
                "volatilitas_3_bulan": [payload.get("volatilitas_3_bulan", 0.0)],
                "perubahan_harga": [payload.get("perubahan_harga", 0.0)],
                "persentase_kenaikan": [payload.get("persentase_kenaikan", 0.0)]
            }

            df = pd.DataFrame(input_data)[features]
            predicted_val = float(reg_model.predict(df)[0])

            rata_rata_3_bulan = payload.get("rata_rata_3_bulan", 1.0) or 1.0
            diff_pct = ((predicted_val - rata_rata_3_bulan) / rata_rata_3_bulan) * 100

            if diff_pct > 10:
                kategori = "Alert"
                interpretasi = f"Harga diprediksi melonjak tinggi sebesar {diff_pct:.2f}% di atas rata-rata 3 bulan."
            elif diff_pct > 3:
                kategori = "Warning"
                interpretasi = f"Harga diprediksi mengalami kenaikan moderat sebesar {diff_pct:.2f}%."
            elif diff_pct < -5:
                kategori = "Normal"
                interpretasi = f"Harga diprediksi turun stabil sebesar {abs(diff_pct):.2f}%."
            else:
                kategori = "Normal"
                interpretasi = "Harga diprediksi relatif stabil dalam rentang aman."

            print(json.dumps({
                "status": "success",
                "prediksi_harga": predicted_val,
                "kategori": kategori,
                "interpretasi": interpretasi,
                "satuan": "Rupiah"
            }))

        elif mode == "predict-status":
            clf_model = model_bundle["models"].get("classification_model") or model_bundle["models"].get("classification")
            features = model_bundle.get("preprocessing", {}).get("feature_columns_classification") or [
                "tahun", "bulan_angka", "month_index", "komoditas_encoded",
                "provinsi_encoded", "jenis_harga_encoded", "level_wilayah_encoded",
                "harga", "harga_sebelumnya", "rata_rata_3_bulan", "volatilitas_3_bulan",
                "perubahan_harga", "persentase_kenaikan", "indeks"
            ]

            input_data = {
                "tahun": [payload.get("tahun", 2026)],
                "bulan_angka": [payload.get("bulan_angka", 5)],
                "month_index": [payload.get("month_index", 24317)],
                "komoditas_encoded": [payload.get("komoditas_encoded", 7)],
                "provinsi_encoded": [payload.get("provinsi_encoded", 7)],
                "jenis_harga_encoded": [payload.get("jenis_harga_encoded", 0)],
                "level_wilayah_encoded": [payload.get("level_wilayah_encoded", 0)],
                "harga": [payload.get("harga", 0.0)],
                "harga_sebelumnya": [payload.get("harga_sebelumnya", 0.0)],
                "rata_rata_3_bulan": [payload.get("rata_rata_3_bulan", 0.0)],
                "volatilitas_3_bulan": [payload.get("volatilitas_3_bulan", 0.0)],
                "perubahan_harga": [payload.get("perubahan_harga", 0.0)],
                "persentase_kenaikan": [payload.get("persentase_kenaikan", 0.0)],
                "indeks": [payload.get("indeks", 0.0)]
            }

            df = pd.DataFrame(input_data)[features]
            pred_class = clf_model.predict(df)[0]

            confidence = 1.0
            if hasattr(clf_model, "predict_proba"):
                proba = clf_model.predict_proba(df)[0]
                confidence = float(np.max(proba))

            status_label = str(pred_class)
            if status_label in ["0", "0.0"]:
                status_label = "Normal"
            elif status_label in ["1", "1.0"]:
                status_label = "Warning"
            elif status_label in ["2", "2.0"]:
                status_label = "Alert"

            rekomendasi = recommendation_rules.get(status_label, "Rekomendasi umum: lakukan pengawasan stok dan distribusi pangan.")

            print(json.dumps({
                "status": "success",
                "status_prediksi": status_label,
                "confidence": confidence,
                "rekomendasi": rekomendasi
            }))

        elif mode == "predict-cluster":
            cluster_model = model_bundle["models"].get("clustering_model") or model_bundle["models"].get("clustering")
            scaler = model_bundle.get("preprocessing", {}).get("scaler_cluster")
            features = model_bundle.get("preprocessing", {}).get("feature_columns_clustering") or [
                "rata_rata_harga", "harga_median", "harga_maksimum", "harga_minimum",
                "standar_deviasi_harga", "rata_rata_kenaikan", "volatilitas_rata_rata"
            ]

            input_data = {
                "rata_rata_harga": [payload.get("rata_rata_harga", 0.0)],
                "harga_median": [payload.get("harga_median", 0.0)],
                "harga_maksimum": [payload.get("harga_maksimum", 0.0)],
                "harga_minimum": [payload.get("harga_minimum", 0.0)],
                "standar_deviasi_harga": [payload.get("standar_deviasi_harga", 0.0)],
                "rata_rata_kenaikan": [payload.get("rata_rata_kenaikan", 0.0)],
                "volatilitas_rata_rata": [payload.get("volatilitas_rata_rata", 0.0)]
            }

            df = pd.DataFrame(input_data)[features]
            if scaler:
                df_scaled = scaler.transform(df)
                pred_cluster = int(cluster_model.predict(df_scaled)[0])
            else:
                pred_cluster = int(cluster_model.predict(df)[0])

            interpretasi_mapping = {
                0: "Cluster Stabil (Harga rendah dan volatilitas rendah)",
                1: "Cluster Sedang (Harga sedang dan fluktuasi normal)",
                2: "Cluster Fluktuatif (Fluktuasi harga tinggi, perlu kewaspadaan)",
                3: "Cluster Prioritas Intervensi (Harga sangat tinggi dan fluktuatif)"
            }

            interpretasi = interpretasi_mapping.get(pred_cluster, f"Cluster {pred_cluster}")
            rec_key = f"Cluster {['Stabil', 'Sedang', 'Waspada', 'Prioritas'][pred_cluster]}" if pred_cluster < 4 else f"Cluster {pred_cluster}"
            rekomendasi = recommendation_rules.get(rec_key, "Lakukan pemantauan berkala dan pastikan ketersediaan pasokan.")

            print(json.dumps({
                "status": "success",
                "cluster": pred_cluster,
                "interpretasi": interpretasi,
                "rekomendasi": rekomendasi
            }))

    except Exception as e:
        print(json.dumps({"status": "error", "message": f"Execution error: {str(e)}"}))

if __name__ == "__main__":
    main()