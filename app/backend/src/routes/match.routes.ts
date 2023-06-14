import { Request, Router, Response } from 'express';
import MatchController from '../controllers/matchController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
// router.get('/:id', (req: Request, res: Response) => matchController.getTeamById(req, res));

export default router;
