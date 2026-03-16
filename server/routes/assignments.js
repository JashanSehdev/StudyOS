import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import {
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment
} from "../controller/assignmentController.js"

const router = express.Router();

router.use(authMiddleware)

router.get("/", getAssignments);
router.post("/", createAssignment);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

export default router
