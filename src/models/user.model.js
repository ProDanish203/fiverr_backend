import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: [true, "Username already taken"],
            trim: true,
            index: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [true, "Password must be greater than 6 charcters"],
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            unique: [true, "Email address already in use"],
            validate: validator.isEmail,
            trim: true,
            lowercase: true,
        },
        isEmailVerfied: {
            type: Boolean,
            default: false,
        },
        fullName: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            index: true,
        },
        avatar: {
            public_id: {
                type: String,
                required: [true, "Avatar public_id is required"],
            },
            url: {
                type: String,
                required: [true, "Avatar secure_url is required"],
            },
        },
        role: {
            type: String,
            enum: ["user", "seller", "admin"],
            default: "user",
        },
        country: String,
        phone: String,
        desc: String,
        refreshToken: String,
    },
    { timestamps: true }
);

export const User = model("User", UserSchema);
