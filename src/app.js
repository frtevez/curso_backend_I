import express from 'express';
import { engine } from 'express-handlebars';
import CartManager from './cartManager.js';
import ProductManager from './productManager.js';
import viewsRouter from './routers/viewsRouter.js';
import productsRouter from './routers/productsRouter.js';
import cartsRouter from './routers/cartsRouter.js';

const app = express();
app.use(express.json());
const cartManager = new CartManager('./src/carts.json');
const productManager = new ProductManager('./src/products.json');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/', viewsRouter);
app.use("/api/products", productsRouter)
app.use('/api/carts/', cartsRouter);

app.listen(8080, () => {
    console.log('Servidor Iniciado');
});
