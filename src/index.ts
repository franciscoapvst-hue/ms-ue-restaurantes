import express from 'express';
import cors from 'cors';
import restaurantsRoute from './routes/restaurants.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', restaurantsRoute);

app.get('/health', (_, res) => {
  res.json({ status: 'ok', service: 'ms-ue-restaurantes' });
});

app.listen(PORT, () => {
  console.log(`ms-ue-restaurantes corriendo en http://localhost:${PORT}`);
});
