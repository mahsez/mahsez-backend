import type { Server } from 'http';
import app from './app.js';
import config from './config/index.js';

let server: Server;

const shutdown = (signal: string) => {
  console.log(`${signal} received. Closing server...`);

  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

async function startServer() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Mahsez backend api listening on port http://localhost:${config.port}`);
    });

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
