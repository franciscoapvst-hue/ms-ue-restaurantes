import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import restaurantsRoute from './routes/restaurants.route';
import { swaggerSpec } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', restaurantsRoute);

app.get('/health', (_, res) => {
  res.json({ status: 'ok', service: 'ms-ue-restaurantes' });
});

app.listen(PORT, () => {
  console.log(`ms-ue-restaurantes corriendo en http://localhost:${PORT}`);
  console.log(`Swagger UI disponible en http://localhost:${PORT}/docs`);
});
