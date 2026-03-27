import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import NotFound from './app/middleware/notFound.js';
import router from './app/routes/index.js';
import globalErrorHandler from './app/middleware/globalErrorHandler.js';

const app: Application = express();

const corsOptions = {
  origin: ['https://mahsez.com', 'http://localhost:5173', 'http://192.168.0.103:5173'],
  credentials: true,
};

app.use(express.json());
/// parsers
app.use(cors(corsOptions));
// app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  // if (req.accepts('html')) {
  //   return res.send(`
  //     <!DOCTYPE html>
  //     <html lang="en">
  //     <head>
  //       <meta charset="UTF-8" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //       <title>Mahsez Server</title>
  //       <style>
  //         body {
  //           margin: 0;
  //           padding: 0;
  //           font-family: Arial, sans-serif;
  //           background: linear-gradient(135deg, #0f172a, #1e293b);
  //           color: #fff;
  //           display: flex;
  //           align-items: center;
  //           justify-content: center;
  //           height: 100vh;
  //         }
  //         .container {
  //           text-align: center;
  //           background: rgba(255, 255, 255, 0.05);
  //           padding: 40px;
  //           border-radius: 16px;
  //           backdrop-filter: blur(10px);
  //           box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  //         }
  //         h1 {
  //           font-size: 2.5rem;
  //           margin-bottom: 10px;
  //         }
  //         p {
  //           color: #cbd5f5;
  //         }
  //         .status {
  //           margin-top: 20px;
  //           padding: 10px 20px;
  //           border-radius: 50px;
  //           background: #22c55e;
  //           color: #022c22;
  //           font-weight: bold;
  //           display: inline-block;
  //         }
  //         .footer {
  //           margin-top: 20px;
  //           font-size: 0.9rem;
  //           color: #94a3b8;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       <div class="container">
  //         <h1>🚀 Mahsez backend Running</h1>
  //         <p>Mahsez backend is live and ready to handle requests.</p>
  //         <div class="status">✔ Server Status: Online</div>
  //         <div class="footer">Powered by Express + TypeScript</div>
  //       </div>
  //     </body>
  //     </html>
  //   `);
  // }

  res.json({
    message: 'Mahsez API is running 🚀',
  });
});

const formatUptime = () => {
  const uptime = process.uptime();

  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
};

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    uptime: formatUptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV,
  });
});

// not found
app.use(NotFound);

// app.use(globalErrorHandler);

export default app;
