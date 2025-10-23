import express from "express";
import Product from "../models/productModel.js";

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ status: "success", payload: products });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    };
});
productsRouter.get('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await Product.findById(pid);
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    };
});
productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, status, stock, category, thumbnails } = req.body;
        const product = new Product({ title, description, price, status, stock, category, thumbnails });
        await product.save();
        res.redirect("/");
        res.status(201).json({ status: "success", payload: product });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    };
});
productsRouter.put('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const updates = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(pid, updates, { new: true, runValidators: true });
        if (!updatedProduct) return res.status(404).json({ status: "error", message: "Product Not Found" });
        res.status(200).json({ status: "success", payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    };
});
productsRouter.delete('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const deletedProduct = await Product.findByIdAndDelete(pid);
        if (!deletedProduct) return res.status(404).json({ status: "error", message: "Product Not Found" });
        res.status(200).json({ status: "success", payload: deletedProduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    };
});

export default productsRouter;