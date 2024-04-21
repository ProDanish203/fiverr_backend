import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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

CategorySchema.plugin(mongooseAggregatePaginate);
CategorySchema.plugin(mongoosePaginate);

export const Category = model("Category", CategorySchema);
