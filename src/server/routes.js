import express from 'express';
import { initColorLatest } from './controllers/main';

const router = express.Router();

router.get('/latest', initColorLatest);

export default router;
