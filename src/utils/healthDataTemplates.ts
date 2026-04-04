import { prisma } from "@/lib/prisma.js";
import formatUptime from "./formatUptime.js";

export type DashboardData = {
  uptime: string;
  timestamp: string;
  memory: NodeJS.MemoryUsage;
  cpu: NodeJS.CpuUsage;
  environment: string;
  nodeVersion: string;
  port: string;
  dbStatus: string;
};

// 🔹 Data gather + HTML template একসাথে
export const getDashboardData = async (): Promise<DashboardData> => {
  const uptime = formatUptime();
  const timestamp = new Date().toISOString();
  const memory = process.memoryUsage();
  const cpu = process.cpuUsage();
  const environment = process.env.NODE_ENV || "development";
  const port = process.env.PORT || "6000";
  const nodeVersion = process.version;

  let dbStatus: string;
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "Connected ✅";
  } catch {
    dbStatus = "Disconnected ❌";
  }

  return {
    uptime,
    timestamp,
    memory,
    cpu,
    environment,
    nodeVersion,
    port,
    dbStatus,
  };
};

// 🔹 HTML template
export const dashboardHTML = (data: DashboardData) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mahsez Server</title>
  <style>
    body { margin:0; font-family: Arial; background:#0f172a; color:#fff; display:flex; align-items:center; justify-content:center; height:100vh; }
    .container { width:420px; background:rgba(255,255,255,0.05); padding:30px; border-radius:16px; backdrop-filter:blur(10px); box-shadow:0 10px 30px rgba(0,0,0,0.5); }
    h1 { text-align:center; }
    .status { text-align:center; margin:15px 0; padding:10px; border-radius:50px; background:#22c55e; color:#022c22; font-weight:bold; }
    .info { margin-top:20px; }
    .info-item { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.1); font-size:0.9rem; }
    .label { color:#94a3b8; }
    .value { font-weight:bold; }
    .footer { text-align:center; margin-top:20px; font-size:0.8rem; color:#64748b; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Mahsez Backend</h1>
    <div class="status">✔ Status: OK</div>

    <div class="info">
      <div class="info-item"><span class="label">Uptime</span><span class="value">${data.uptime}</span></div>
      <div class="info-item"><span class="label">Environment</span><span class="value">${data.environment}</span></div>
      <div class="info-item"><span class="label">Port</span><span class="value">${data.port}</span></div>
      <div class="info-item"><span class="label">Node Version</span><span class="value">${data.nodeVersion}</span></div>
      <div class="info-item"><span class="label">Database</span><span class="value">${data.dbStatus}</span></div>
      <div class="info-item"><span class="label">Memory (RSS)</span><span class="value">${(data.memory.rss / 1024 / 1024).toFixed(2)} MB</span></div>
      <div class="info-item"><span class="label">Heap Used</span><span class="value">${(data.memory.heapUsed / 1024 / 1024).toFixed(2)} MB</span></div>
      <div class="info-item"><span class="label">CPU User</span><span class="value">${(data.cpu.user / 1000).toFixed(2)} ms</span></div>
      <div class="info-item"><span class="label">CPU System</span><span class="value">${(data.cpu.system / 1000).toFixed(2)} ms</span></div>
      <div class="info-item"><span class="label">Timestamp</span><span class="value">${data.timestamp}</span></div>
    </div>

    <div class="footer">Powered by Express + TypeScript</div>
  </div>
</body>
</html>
`;
