import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
        },
        desc: String,
        gigs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Gig",
            },
        ],
    },
    { timestamps: true }
);

export const Category = model("Category", CategorySchema);
