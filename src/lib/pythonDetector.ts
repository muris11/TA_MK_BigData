import fs from "fs";
import path from "path";

/**
 * Mendeteksi path executable Python yang valid secara cerdas pada sistem operasi.
 */
export function getPythonCommand(): string {
  // 1. Cek lingkungan virtual (.venv) lokal
  const venvBin = process.platform === "win32" ? ".venv\\Scripts\\python.exe" : ".venv/bin/python";
  const localVenv = path.join(process.cwd(), venvBin);
  if (fs.existsSync(localVenv)) {
    return localVenv;
  }

  // 2. Cek apakah ada path python kustom Laragon (seperti di mesin user)
  const laragonPython = "C:\\laragon\\bin\\python\\python-3.10\\python.exe";
  if (fs.existsSync(laragonPython)) {
    return laragonPython;
  }

  // 3. Cari di Laragon secara rekursif/dinamis jika versi python berbeda
  const laragonBase = "C:\\laragon\\bin\\python";
  if (fs.existsSync(laragonBase)) {
    try {
      const dirs = fs.readdirSync(laragonBase);
      for (const dir of dirs) {
        const potentialPath = path.join(laragonBase, dir, "python.exe");
        if (fs.existsSync(potentialPath)) {
          return potentialPath;
        }
      }
    } catch (e) {
      // Ignore directory read errors
    }
  }

  // 4. Cek path standar Windows / Linux / Mac lainnya
  const commonWindowsPaths = [
    "C:\\Users\\" + process.env.USERNAME + "\\AppData\\Local\\Programs\\Python\\Python310\\python.exe",
    "C:\\Users\\" + process.env.USERNAME + "\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    "C:\\Users\\" + process.env.USERNAME + "\\AppData\\Local\\Programs\\Python\\Python312\\python.exe",
    "C:\\Program Files\\Python310\\python.exe",
    "C:\\Program Files\\Python311\\python.exe",
    "C:\\Program Files\\Python312\\python.exe",
  ];

  for (const p of commonWindowsPaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  // Fallback standar ke global command
  return "python";
}