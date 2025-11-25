import express from 'express';
import { homePage, tictactoe } from '../controllers/mainController.js';

const router = express.Router();

router.get('/', homePage);

router.get('/tictactoe', tictactoe);

export default router;
