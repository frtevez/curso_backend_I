import express from "express";
import Cart from "../models/cartModel.js";

const cartsRouter = express.Router();

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = new Cart();
        await newCart.save();
        res.status(201).json({ status: "success", payload: newCart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
});
cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await Cart.findById(cid);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
});
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedCart = await Cart.findByIdAndUpdate(cid, 
            { $push: { products: { product: pid, quantity: quantity } } }, { new: true, runValidators: true });
        res.status(200).json({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
});
cartsRouter.delete("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const deletedCart = Cart.findByIdAndDelete(cid);
        res.status(200).json({ message: "Cart Successfully Removed", payload: deletedCart })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.messag })
    }
});

export default cartsRouter;