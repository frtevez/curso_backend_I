import express from "express";
import Product from "../models/productModel.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = { price: 1 } } = req.query;
        const data = await Product.paginate({}, { limit, page, sort, lean: true });
        const productsWithObjectId = await data.docs;
        const products = productsWithObjectId.map(product => ({
            ...product,
            _id: product._id.toString(),
        }));
        delete data.docs;

        const pageLinks = [];

        for (let currentPage = 1; currentPage <= data.totalPages; currentPage++) {
            pageLinks.push({ pageNumber: currentPage, link: `?limit=${limit}&page=${currentPage}` })
        };

        res.render("home", { products, pageLinks });
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