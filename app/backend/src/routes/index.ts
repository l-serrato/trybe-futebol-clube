import { Router } from 'express';
import teamsRouter from './team.routes';
import userRouter from './user.routes';
import matchRouter from './match.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);

export default router;
