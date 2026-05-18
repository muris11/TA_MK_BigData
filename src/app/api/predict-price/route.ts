import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import { getPythonCommand } from "@/lib/pythonDetector";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Jalankan eksekusi model ML Python lokal asli menggunakan spawn
    const scriptPath = path.join(process.cwd(), "api", "predict_local.py");
    const pythonCmd = getPythonCommand();

    return new Promise<Response>((resolve) => {
      const child = spawn(pythonCmd, [scriptPath, "predict-price"]);

      let stdoutData = "";
      let stderrData = "";

      child.stdout.on("data", (data) => {
        stdoutData += data.toString();
      });

      child.stderr.on("data", (data) => {
        stderrData += data.toString();
      });

      child.on("close", (code) => {
        if (code !== 0) {
          console.error(`Local Python child process exited with code ${code}. Stderr: ${stderrData}`);
          resolve(NextResponse.json({
            status: "error",
            message: `Python process error: ${stderrData}`
          }, { status: 500 }));
          return;
        }

        try {
          const result = JSON.parse(stdoutData.trim());
          if (result.status === "error") {
            resolve(NextResponse.json({ status: "error", message: result.message }, { status: 500 }));
          } else {
            resolve(NextResponse.json(result));
          }
        } catch (e: any) {
          console.error(`Failed to parse Python output: ${stdoutData}. Error: ${e.message}`);
          resolve(NextResponse.json({
            status: "error",
            message: `JSON parse error: ${stdoutData}`
          }, { status: 500 }));
        }
      });

      // Write payload to stdin and close it to trigger execution
      child.stdin.write(JSON.stringify(payload));
      child.stdin.end();
    });

  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}