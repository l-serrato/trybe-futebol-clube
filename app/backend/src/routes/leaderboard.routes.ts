import { Router } from 'express';
import LeaderController from '../controllers/leaderboardController';

const router = Router();

const leaderController = new LeaderController();

router.route('/').get(leaderController.getGeneral);
router.route('/home').get(leaderController.getHome);

export default router;
