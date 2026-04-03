import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import NotFound from "./app/middleware/notFound.js";
import config from "./config/index.js";

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

app.get("/", (req: Request, res: Response) => {
  res.send(`Mahsez Server In Progress! & ${config.port}`);
});

app.use(NotFound);

export default app;
