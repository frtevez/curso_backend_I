import express from 'express';
import { engine } from 'express-handlebars';
import viewsRouter from './routers/viewsRouter.js';
import productsRouter from './routers/productsRouter.js';
import cartsRouter from './routers/cartsRouter.js';
import { Server } from "socket.io";
import http from "http";
import connectMongoDB from './config/db.js';
import { configDotenv } from 'dotenv';
import __dirname from "../dirname.js";
import Product from './models/productModel.js';
import crypto from "crypto";

configDotenv({ path: __dirname + "/.env" });
connectMongoDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');

app.use('/', viewsRouter);
app.use("/api/products", productsRouter);
app.use('/api/carts/', cartsRouter);

io.on("connection", (socket) => {
    console.log("New User Connected");

    socket.on("newProduct", async newProduct => {
        try {
            const { title, description, code: incomingCode, price, status, stock, category, thumbnails } = newProduct;
            const code = incomingCode ?? crypto.randomUUID();
            const product = new Product({ title, description, code, price, status, stock, category, thumbnails });
            await product.save();
            io.emit("addedProduct", product);
        } catch (error) {
            console.error("Failed to add product", error)
        };
    });
    socket.on("deleteProduct", async productId => {
        try {
            await Product.findByIdAndDelete(productId);

            io.emit("deletedProduct", productId);
        } catch (error) {
            console.error("Failed to delete product", error)
        };
    });
});

server.listen(PORT, () => console.log(`Servidor Iniciado en http://localhost:${PORT}`));