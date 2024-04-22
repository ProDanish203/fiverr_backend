import mongoose from "mongoose";
import { Gig } from "../models/gig.model.js";
import { User } from "../models/user.model.js";
import { ROLES } from "../utils/constants.js";
import { uploadFile } from "../utils/fileUpload.js";

export const getAllGigs = async (req, res, next) => {
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getSingleGig = async (req, res, next) => {
    try {
        const { id } = req.params;

        const gig = await Gig.findById(id);
        if (!gig) return next("Gig not found");

        const gigData = await Gig.aggregate([
            // First
            {
                $match: {
                    _id: gig._id,
                },
            },
            // Second
            {
                $lookup: {
                    from: "users",
                    localField: "sellerId",
                    foreignField: "_id",
                    as: "seller",
                    pipeline: [
                        {
                            $project: {
                                username: 1,
                                avatar: 1,
                                email: 1,
                                name: 1,
                            },
                        },
                    ],
                },
            },
            // Third
            {
                $addFields: {
                    seller: {
                        $first: "$seller",
                    },
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            message: "Gig fetched",
            data: gigData,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const createGig = async (req, res, next) => {
    try {
        const { title, desc, category, price, noOfRevisions, deliveryTime } =
            req.body;

        if (req.user.role !== ROLES.SELLER)
            return next("You are not authorized to perform this action");
        if (!title) return next("Gig title is required");
        if (!desc) return next("Gig description is required");
        if (!category) return next("Gig category is required");
        if (!price) return next("Gig price is required");
        if (!deliveryTime) return next("Gig delivery time is required");
        console.log(req.file);
        const coverLocalPath = req.files?.cover?.[0].path;
        const imagesLocalPath = req.files?.images?.[0].path;

        if (!coverLocalPath) return next("Gig cover image is required");
        if (!imagesLocalPath)
            return next("Atleast 1 gig descriptive image are required");

        const coverFile = await uploadFile(coverLocalPath);
        const imageFile = await uploadFile(imagesLocalPath);
        if (!coverFile)
            return next("An error occured while uploading the cover image");
        if (!imageFile)
            return next("An error occured while uploading the gig images");

        console.log(coverFile);
        const gig = await Gig.create({
            sellerId: req.user._id,
            title,
            desc,
            price,
            category,
            deliveryTime,
            noOfRevisions,
            cover: {
                public_id: coverFile.public_id,
                url: coverFile.secure_url,
            },
            images: [
                {
                    public_id: imageFile.public_id,
                    url: imageFile.secure_url,
                },
            ],
        });

        return res.status(200).json({
            success: true,
            message: "Gig created successfully",
            data: gig,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateGig = async (req, res, next) => {
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deleteGig = async (req, res, next) => {
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
