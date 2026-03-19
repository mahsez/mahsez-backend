import express, { type Application } from 'express';
import cors from 'cors';
import NotFound from './middleware/notFound.js';

const app: Application = express();

const corsOptions = {
  origin: [
    'https://mahsez.com',
    'http://localhost:5173',
    'http://192.168.0.103:5173',
  ],
  credentials: true,
};

/// parsers
app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  const a = 10;

  res.send(a);
});

// not found
app.use(NotFound);

export default app;
