import { User } from "../models/user.model.js";

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password, fullName, role } = req.body;
        if (password.includes(" "))
            return next("Password must not contain any white spaces");

        const userExists = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (userExists) {
            return userExists.username === username
                ? next("Username already exists")
                : next("Email already in use");
        }

        const user = await User.create({
            username,
            email,
            password,
            fullName,
            role,
        });
        if (!user) return next("Failed to create an account");

        const userData = await User.findById(user._id).select(
            "-password -refreshToken"
        );
        // user.password = undefined

        return res.status(200).json({
            success: true,
            message: "Account created",
            data: userData,
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "",
            data: "",
        });
    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "",
            data: "",
        });
    } catch (error) {
        next(error);
    }
};

// export const fnName = async (req, res, next) => {
//     try {
//         return res.status(200).json({
//             success: true,
//             message: "",
//             data: "",
//         });
//     } catch (error) {
//         next(error);
//     }
// };
