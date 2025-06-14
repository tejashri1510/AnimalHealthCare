import express from 'express';
import { getConsultations } from '../controllers/vetController.js';

const router = express.Router();

router.get('/consultations', getConsultations);

export default router;
