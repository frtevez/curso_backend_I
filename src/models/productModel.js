import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: "",
        trim: true,
        index: "text"
    },
    code: {
        type: String,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    category: {
        type: String,
        default: "miscellaneous",
        trim: true,
        index: true
    },
    thumbnails: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

productSchema.plugin(paginate);

const Product = mongoose.model("Product", productSchema);

export default Product;