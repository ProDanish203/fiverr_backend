import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller";

const router = Router();

router.post('/', registerUser)
router.post('/:id', loginUser)



export default router;