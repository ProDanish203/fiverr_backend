import { Router } from "express";
import {
    createGig,
    deleteGig,
    getAllGigs,
    getSingleGig,
    updateGig,
} from "../controllers/gig.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";
import { upload } from "../middlewares/multer.middlware.js";

const router = Router();

router.get("/", getAllGigs);
router.get("/single/:id", getSingleGig);

router.post(
    "/create",
    verifyAuth(Object.values(ROLES)),
    upload.fields([
        {
            name: "cover",
            maxCount: 1
        },
        {
            name: "images",
            maxCount: 5
        }
    ]), 
    createGig
);

router.put(
    "/update/:id",
    verifyAuth(Object.values(ROLES)),
    upload.single("cover"),
    updateGig
);
router.delete("/delete/:id", verifyAuth(Object.values(ROLES)), deleteGig);

export default router;
