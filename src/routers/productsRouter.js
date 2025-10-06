import express from "express";

const productsRouter = express.Router();

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
        const product = req.body;
        await productManager.addProduct(product);
        const products = await productManager.getProducts();
        res.status(201).json({ message: "Product Successfully Added", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
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