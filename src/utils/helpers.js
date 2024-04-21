import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";

export const getPaginatedData = async ({
    model,
    page = 1,
    limit = 10,
    query = {},
    populate = "",
    select = "-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry",
    sort = { createdAt: -1 },
}) => {
    const options = {
        select,
        sort,
        page,
        limit,
        populate,
        lean: true,
        customLabels: {
            totalDocs: "totalItems",
            docs: "data",
            limit: "perPage",
            page: "currentPage",
            meta: "pagination",
        },
    };

    const { data, pagination } = await model.paginate(query, options);
    delete pagination?.pagingCounter;

    // // Real Logic
    // const skip = (page - 1) * limit;
    // const data = await model
    //     .find(query, select)
    //     .populate(populate)
    //     .sort(sort)
    //     .skip(skip)
    //     .limit(limit)
    //     .lean();

    // const totalItems = await model.countDocuments(query);
    // const totalPages = Math.ceil(totalItems / limit);

    // const pagination = {
    //     totalItems,
    //     totalPages,
    //     currentPage: page,
    //     perPage: limit,
    // };

    return { data, pagination };
};

export const getPaginatedUsers = async ({ query, page, limit, sort }) => {
    const { data, pagination } = await getPaginatedData({
        model: User,
        query: { ...query, role: "user" },
        page,
        limit,
        sort,
    });

    return { data, pagination };
};

export const getPaginatedCategories = async ({ query, page, limit, sort }) => {
    const { data, pagination } = await getPaginatedData({
        model: Category,
        query: { ...query },
        page,
        limit,
        sort,
    });

    return { data, pagination };
};
