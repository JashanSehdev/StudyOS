import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import {
    getSubjects,
    createSubject,
    deleteSubject
} from "../controller/gpaController.js"

const router = express.Router()

router.use(authMiddleware);

router.get("/",         getSubjects);
router.post("/",        createSubject);
router.delete("/:id",   deleteSubject);

export default router;