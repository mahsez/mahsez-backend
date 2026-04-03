import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import NotFound from "./app/middleware/notFound.js";
import config from "./config/index.js";
import router from "./app/routes/index.js";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import {
  dashboardHTML,
  getDashboardData,
} from "./utils/healthDataTemplates.js";

const app: Application = express();

const corsOptions = {
  origin: [
    "https://mahsez.com",
    "http://localhost:5173",
    "http://192.168.0.103:5173",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", router);

// app.get("/", (req: Request, res: Response) => {
//   res.send(`Mahsez Server In Progress! & ${config.port}`);
// });

app.get("/", async (req: Request, res: Response) => {
  const data = await getDashboardData();
  if (req.accepts("html")) {
    return res.send(dashboardHTML(data));
  }

  return res.json({
    success: true,
    status: "OK",
    data: {
      uptime: data.uptime,
      environment: data.environment,
      nodeVersion: data.nodeVersion,
      database: data.dbStatus,
      memory: data.memory,
      cpu: data.cpu,
    },
    timestamp: data.timestamp,
  });
});

app.use(NotFound);

app.use(globalErrorHandler);

export default app;
