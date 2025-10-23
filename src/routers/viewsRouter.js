import express from "express";
import Product from "../models/productModel.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res) => {
    try {
        const productsWithObjectId = await Product.find().lean();
        const products = productsWithObjectId.map(product => ({
            ...product,
            _id: product._id.toString(),
        }));

        res.render("home", { products });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    };
});

viewsRouter.get("/realTimeProducts", async (req, res) => {
    try {
        const productsWithObjectId = await Product.find().lean();
        const products = productsWithObjectId.map(product => ({
            ...product,
            _id: product._id.toString(),
        }));

        res.render("realTimeProducts", { products });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    };
});


export default viewsRouter;