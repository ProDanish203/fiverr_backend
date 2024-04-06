import { Schema, model } from "mongoose";

const GigSchema = new Schema(
    {
        sellerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "Gig title is required"],
        },
        desc: {
            type: String,
            required: [true, "Gig description is required"],
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Catgeory",
            required: [true, "Gig category is required"],
        },
        price: {
            type: Number,
            required: [true, "Gig price is required"],
        },
        cover: {
            public_id: {
                type: String,
                required: [true, "Gig cover public_id is required"],
            },
            url: {
                type: String,
                required: [true, "Gig cover secure_url is required"],
            },
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: [true, "Gig image public_id is required"],
                },
                url: {
                    type: String,
                    required: [true, "Gig image secure_url is required"],
                },
            },
        ],
        noOfRevisions: {
            type: Number,
            default: 1,
        },
        deliveryTime: {
            type: Number,
            required: [true, "Gig delivery time is required"],
        },
        sales: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Gig = model("Gig", GigSchema);
