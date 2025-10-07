import express from "express";
import ProductManager from "../productManager.js";

const productsRouter = express.Router();
const productManager = new ProductManager('./src/products.json');

productsRouter.get('/', async (req, res) => {

    try {
        const products = await productManager.getProducts();
        res.status(200).json({ message: "Products:", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
productsRouter.get('/:pid', async (req, res) => {

    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);
        res.status(200).json({ message: "Product:", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
productsRouter.post('/', async (req, res) => {
    try {
        const title = req.body.title;
        const price = parseInt(req.body.price);
        const thumbnail = req.body.thumbnail;
        const product = {title, price, thumbnail}
        await productManager.addProduct(product);
        const products = await productManager.getProducts();
        res.redirect("/");
        res.status(201).json({ message: "Product Successfully Added", products });
    } catch (error) {
        res.status(500).json({ message: error.message + req.body});
    }
});
productsRouter.put('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const updates = req.body;
        await productManager.setProductById(pid, updates);
        const products = await productManager.getProducts();
        res.status(200).json({ message: "Product Successfully Updated", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
productsRouter.delete('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        await productManager.removeProductById(pid);
        const products = await productManager.getProducts();
        res.status(200).json({ message: "Product Successfully Removed", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default productsRouter;