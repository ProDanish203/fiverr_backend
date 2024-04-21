import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
import { ROLES } from "../utils/constants.js";
import { getPaginatedCategories } from "../utils/helpers.js";

export const createCategory = async (req, res, next) => {
    try {
        const { name, desc } = req.body;
        if (req.user.role !== ROLES.ADMIN)
            return next("You are not authorized to perform this action");
        if (!name) return next("Category name is required");
        if (!desc) return next("Category description is required");

        const category = await Category.create({
            name,
            desc,
        });
        if (!category) return next("An error occured whle creating category");

        return res.status(200).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAllCategories = async (req, res, next) => {
    try {
        const page = +(req.query.page || 1);
        const limit = +(req.query.limit || 10);
        const search = req.query.search || "";

        const categories = await getPaginatedCategories({
            query: { name: { $regex: `^${search}`, $options: "i" } },
            page,
            limit,
            sort: { name: 1 },
        });

        return res.status(200).json({
            success: true,
            message: "Gigs fetched successfully",
            data: categories,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getSingleCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        return res.status(200).json({
            success: true,
            message: "Gig fetched successfully",
            data: category,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, desc } = req.body;

        const fields = {};
        if (name && name.length > 0) fields.name = name;
        if (desc && desc.length > 0) fields.desc = desc;

        if (Object.keys(fields).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields to update",
            });
        }

        const category = await Category.findByIdAndUpdate(id, fields, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            message: "Gig updated successfully",
            data: category,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);
        if (!category)
            return next("An error occured while deleting the category");
        return res.status(200).json({
            success: true,
            message: "Gig deleted successfully",
            data: "",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
