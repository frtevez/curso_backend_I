import express from "express";
import Product from "../models/productModel.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res) => {
    try {
        const products = await Product.find()
        res.render("home", { products });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    };
});

viewsRouter.get("/realTimeProducts", async (req, res) => {
    try {
        const products = await Product.find()
        res.render("realTimeProducts", { products });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    };
});


export default viewsRouter;