import express from "express";

const cartsRouter = express.Router();

cartsRouter.post('/', async (req, res) => {
    try {
        await cartManager.addCart();
        const carts = await cartManager.getCarts();
        res.status(201).json({ message: "Cart Successfully Added", carts });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartManager.getCartById(cid);
        const cartProducts = cart['products'];
        res.status(200).json({ message: "Cart Products:", cartProducts });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        await cartManager.addToCart(cid, pid, 1)
        const carts = await cartManager.getCarts();
        res.status(201).json({ message: "Product Successfully Added to Cart", carts });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
cartsRouter.delete("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        await cartManager.removecartById(cid);
        const carts = await cartManager.getCarts();
        res.status(200).json({ message: "Cart Successfully Removed", carts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

export default cartsRouter;