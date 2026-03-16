import express from 'express'
import {getTimetable,
        createEntry,
        deleteEntry
} from "../controller/timetableController.js"
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware)
router.get("/",         getTimetable);
router.post("/",        createEntry);
router.delete("/:id",   deleteEntry);

export default router;