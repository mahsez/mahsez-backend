import type { Server } from "http";
import app from "./app.js";

let server: Server;

const shutdown = (signal: string) => {
  console.log(`${signal} received. Closing server...`);

  if (server) {
    server.close(() => {
      console.info("Server closed gracefully 🛑");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

async function startServer() {
  try {
    server = app.listen(5000, () => {
      console.log(
        `Mahsez backend api listening on ports http://localhost:5000`,
      );
    });

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

    // ✅ Runtime errors
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception 💥", err);
      shutdown("uncaughtException");
    });

    // ✅ Runtime errors
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception 💥", err);
      shutdown("uncaughtException");
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
