import express from 'express';
import { engine } from 'express-handlebars';
import viewsRouter from './routers/viewsRouter.js';
import productsRouter from './routers/productsRouter.js';
import cartsRouter from './routers/cartsRouter.js';
import { Server } from "socket.io";
import http from "http";
import ProductManager from './productManager.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/', viewsRouter);
app.use("/api/products", productsRouter);
app.use('/api/carts/', cartsRouter);

const productManager = new ProductManager("./src/products.json");
io.on("connection", (socket) => {
    console.log("New User Connected");

    socket.on("newProduct", async product => {
        try {
            const productId = await productManager.addProduct(product);
            const newProduct = {...product, id: productId};
            
            io.emit("addedProduct", newProduct);
        } catch (error) {
            console.error("Failed to add product", error)
        };
    });
    socket.on("deleteProduct", async productId => {
        try {
            await productManager.removeProductById(productId);

            io.emit("deletedProduct", productId);
        } catch (error) {
            console.error("Failed to delete product", error)
        };
    });
});

server.listen(PORT, () => console.log(`Servidor Iniciado en http://localhost:${PORT}`));