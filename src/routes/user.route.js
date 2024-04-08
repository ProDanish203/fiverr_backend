import { Router } from "express";
import {
    deleteUser,
    getAllUsers,
    getCurrentUser,
    getSingleUser,
    updateProfile,
    verifyEmail,
} from "../controllers/user.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.get("/current-user", verifyAuth(Object.values(ROLES)), getCurrentUser);
router.post("verify-email", verifyAuth(Object.values(ROLES)), verifyEmail);
router.put("/update/:id", verifyAuth(Object.values(ROLES)), updateProfile);
router.delete("/delete/:id", verifyAuth(Object.values(ROLES)), deleteUser);

export default router;
