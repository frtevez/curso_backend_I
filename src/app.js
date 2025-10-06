import express from 'express';
import { engine } from 'express-handlebars';
import CartManager from './cartManager.js';
import ProductManager from './productManager.js';

const app = express();
app.use(express.json());
const cartManager = new CartManager('./src/carts.json');
const productManager = new ProductManager('./src/products.json');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/api/products/', async (req, res) => {

    try {
        const products = await productManager.getProducts();
        res.status(200).json({ message: "Products:", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get('/api/products/:pid', async (req, res) => {

    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);
        res.status(200).json({ message: "Product:", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.post('/api/products/', async (req, res) => {
    try {
        const product = req.body;
        await productManager.addProduct(product);
        const products = await productManager.getProducts();
        res.status(201).json({ message: "Product Successfully Added", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.put('/api/products/:pid', async (req, res) => {
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
app.delete('/api/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        await productManager.removeProductById(pid);
        const products = await productManager.getProducts();
        res.status(200).json({ message: "Product Successfully Removed", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/carts/', async (req, res) => {
    try {
        await cartManager.addCart();
        const carts = await cartManager.getCarts();
        res.status(201).json({ message: "Cart Successfully Added", carts });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
app.get('/api/carts/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartManager.getCartById(cid);
        const cartProducts = cart['products'];
        res.status(200).json({ message: "Cart Products:", cartProducts });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
app.post('/api/carts/:cid/products/:pid', async (req, res) => {
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
app.delete("/api/carts/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        await cartManager.removecartById(cid);
        const carts = await cartManager.getCarts();
        res.status(200).json({ message: "Cart Successfully Removed", carts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.listen(8080, () => {
    console.log('Servidor Iniciado');
});
