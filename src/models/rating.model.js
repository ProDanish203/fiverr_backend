import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
    {
        gig: {
            type: Schema.Types.ObjectId,
            ref: "Gig",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        rating: {
            type: Number,
            required: [true, "Rating is required"],
            enum: [1,2,3,4,5]
        },
        desc: {
            type: String,
            required: [true, "Review description is required"],
        },
    },
    { timestamps: true }
);

export const Review = model("Review", ReviewSchema);
