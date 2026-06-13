import { Router, Request, Response } from 'express';
import { MOCK_RESTAURANTS } from '../data/restaurants.mock';
import { haversineDistance } from '../utils/haversine';

const router = Router();

// GET /fetch-restaurants?lat=-12.0464&lng=-77.0428&radius=10
router.get('/fetch-restaurants', (req: Request, res: Response) => {
  const lat = parseFloat(req.query.lat as string);
  const lng = parseFloat(req.query.lng as string);
  const radius = parseFloat(req.query.radius as string) || 10; // km, default 10

  if (isNaN(lat) || isNaN(lng)) {
    res.status(400).json({
      success: false,
      message: 'Se requieren los parámetros lat y lng',
    });
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
    // TODO: cuando conectemos Firestore, descomentar para filtrar por radio real
    // .filter((r) => r.location.distance <= radius)
    .sort((a, b) => a.location.distance - b.location.distance);

  res.json({
    success: true,
    total: restaurants.length,
    data: restaurants,
  });
});

export default router;
