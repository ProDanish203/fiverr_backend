import { User } from "../models/user.model.js";

export const createCategory = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Gig created successfully",
            data: "",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const getAllCategories = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Gig created successfully",
            data: "",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const getSingleCategory = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Gig created successfully",
            data: "",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const updateCategory = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Gig created successfully",
            data: "",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const deleteCategory = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Gig created successfully",
            data: "",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
