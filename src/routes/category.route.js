import { Router } from "express";
import {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/category.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = Router();

router.get("/", getAllCategories);
router.get("/single/:id", getSingleCategory);

router.post("/create", verifyAuth(Object.values(ROLES)), createCategory);
router.put("/update/:id", verifyAuth(Object.values(ROLES)), updateCategory);
// Incomplete
router.delete("/delete/:id", verifyAuth(Object.values(ROLES)), deleteCategory);

export default router;
