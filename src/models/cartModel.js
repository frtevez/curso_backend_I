import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    unique: true
                },
                quantity: {
                    type: Number,
                    min: 1,
                    default: 1
                }
            }
        ],
        default: []
    }
}, {
    timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;