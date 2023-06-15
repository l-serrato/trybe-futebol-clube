import { Request, Router, Response } from 'express';
import tokenValidator from '../utils/tokenValidator';
import MatchController from '../controllers/matchController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getMatches(req, res));
router.route('/:id').patch(tokenValidator, matchController.updateScoreboard);
router.route('/:id/finish').patch(tokenValidator, matchController.setFinishMatch);

export default router;
