import { Router } from "express";
import {
    deleteUser,
    getAllUsers,
    getCurrentUser,
    getSingleUser,
    sendVerificationEmail,
    updateProfile,
    verifyEmail,
} from "../controllers/user.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";
import { upload } from "../middlewares/multer.middlware.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/profile/:id", getSingleUser);
router.get("/current-user", verifyAuth(Object.values(ROLES)), getCurrentUser);

router.post(
    "/send-verification-email",
    verifyAuth(Object.values(ROLES)),
    sendVerificationEmail
);
router.post("/verify-email", verifyAuth(Object.values(ROLES)), verifyEmail);

router.put(
    "/update/:id",
    verifyAuth(Object.values(ROLES)),
    upload.single("avatar"),
    updateProfile
);

// Incomplete
router.delete("/delete/:id", verifyAuth(Object.values(ROLES)), deleteUser);

export default router;
