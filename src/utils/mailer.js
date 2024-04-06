import nodemailer from "nodemailer";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const sendVerificationMail = async ({ type, email, userId }) => {
    try {
        const token = await bcrypt.hash(userId, 10);
        if (!token) return;

        if (type === "VERIFY") {
        } else if (type === "RESET") {
        } else return;

        const transporter = await nodemailer.createTransport({
            pool: true,
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const subject = ``;
        const html = ``;

        const mailOptions = {
            from: "danishsidd203@gmail.com",
            to: email,
            html,
            subject,
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        throw new Error(error.message);
    }
};
