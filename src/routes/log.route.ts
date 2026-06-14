import { Router, Request, Response } from 'express';
import { log } from '../services/logger.service';

const router = Router();

router.post('/log', async (req: Request, res: Response) => {
  const { level, event, message, metadata } = req.body;
  if (!level || !event) {
    res.status(400).json({ success: false, message: 'Se requieren level y event' });
    return;
  }
  await log({
    service: 'ue-backoffice',
    level: level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'info',
    event,
    metadata: { message, ...metadata },
    ip: (req.headers['x-forwarded-for'] as string) ?? req.socket.remoteAddress ?? '',
  });
  res.json({ success: true });
});

export default router;
