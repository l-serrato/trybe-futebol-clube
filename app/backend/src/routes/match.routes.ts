import { Request, Router, Response } from 'express';
import MatchController from '../controllers/matchController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getMatches(req, res));

export default router;
