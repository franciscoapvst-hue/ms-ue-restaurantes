import { Router, Request, Response } from 'express';
import { MOCK_RESTAURANTS } from '../data/restaurants.mock';
import { haversineDistance } from '../utils/haversine';
import { log } from '../services/logger.service';

const router = Router();

/**
 * @openapi
 * /fetch-restaurants:
 *   get:
 *     summary: Obtener restaurantes cercanos
 *     description: Retorna todos los restaurantes ordenados por distancia al punto indicado. Próximamente filtrará por radio.
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *           minimum: -90
 *           maximum: 90
 *         description: Latitud de la ubicación del usuario (entre -90 y 90)
 *         example: -12.0464
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: number
 *           minimum: -180
 *           maximum: 180
 *         description: Longitud de la ubicación del usuario (entre -180 y 180)
 *         example: -77.0428
 *       - in: query
 *         name: radius
 *         required: false
 *         schema:
 *           type: number
 *           default: 10
 *         description: Radio de búsqueda en km (preparado para uso futuro)
 *     responses:
 *       200:
 *         description: Lista de restaurantes ordenados por distancia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FetchRestaurantsResponse'
 *       400:
 *         description: Faltan parámetros lat o lng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/fetch-restaurants', async (req: Request, res: Response) => {
  const start = Date.now();
  const ip = (req.headers['x-forwarded-for'] as string) ?? req.socket.remoteAddress ?? '';
  const lat = parseFloat(req.query.lat as string);
  const lng = parseFloat(req.query.lng as string);

  if (isNaN(lat) || isNaN(lng)) {
    log({ service: 'ms-ue-restaurantes', level: 'warn', event: 'fetch-restaurants', ip, metadata: { error: 'missing_params' } });
    res.status(400).json({ success: false, message: 'Se requieren los parámetros lat y lng' });
    return;
  }

  if (lat < -90 || lat > 90) {
    log({ service: 'ms-ue-restaurantes', level: 'warn', event: 'fetch-restaurants', ip, metadata: { error: 'invalid_lat', lat } });
    res.status(400).json({ success: false, message: 'lat debe estar entre -90 y 90' });
    return;
  }

  if (lng < -180 || lng > 180) {
    log({ service: 'ms-ue-restaurantes', level: 'warn', event: 'fetch-restaurants', ip, metadata: { error: 'invalid_lng', lng } });
    res.status(400).json({ success: false, message: 'lng debe estar entre -180 y 180' });
    return;
  }

  const restaurants = MOCK_RESTAURANTS.map((r) => ({
    ...r,
    location: {
      ...r.location,
      distance: parseFloat(
        haversineDistance(lat, lng, r.location.lat, r.location.lng).toFixed(2)
      ),
    },
  }))
    // TODO: descomentar cuando conectemos Firestore para filtrar por radio real
    // .filter((r) => r.location.distance <= radius)
    .sort((a, b) => a.location.distance - b.location.distance);

  const duration_ms = Date.now() - start;
  log({ service: 'ms-ue-restaurantes', level: 'info', event: 'fetch-restaurants', ip, duration_ms, metadata: { lat, lng, total: restaurants.length } });

  res.json({ success: true, total: restaurants.length, data: restaurants });
});

export default router;
