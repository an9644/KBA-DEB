import express from 'express';
import cors from 'cors';
import adminRoute from './routes/routes.js';

const app = express();
const port = 4500;

app.use(
  cors({
    origin: 'http://localhost:3500',
    credentials: true,
  }),
);

app.use(express.json());
app.use('/',adminRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});