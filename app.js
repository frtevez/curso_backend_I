import express from 'express';
import CartManager from './cartManager';
import ProductManager from './productManager';

const app = express();
const cartManager = new CartManager('./cartManager.json');
const productManager = new ProductManager('./productManager.json');

app.get('/api/products/', async (req, res) => {
    // Debe listar todos los productos de la base de datos.
    try {
        const products = await productManager.getProducts();
        res.status(200).json({ message: "Products:", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
app.get('/api/products/:pid', async (req, res) => {
    // Debe traer solo el producto con el id proporcionado.
    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);
        res.status(200).json({ message: "Product:", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
app.post('/api/products/', (req, res) => {
    // Debe agregar un nuevo producto con los siguientes campos:
    // id: Number/String (No se manda desde el body, se autogenera para asegurar que nunca se repitan los ids).
    // title: String
    // description: String
    // code: String
    // price: Number
    // status: Boolean
    // stock: Number
    // category: String
    // thumbnails: Array de Strings (rutas donde están almacenadas las imágenes del producto).
})
app.put('/api/products/:pid', (req, res) => {
    // Debe actualizar un producto por los campos enviados desde el body. 
    // No se debe actualizar ni eliminar el id al momento de hacer la actualización.
})
app.delete('/api/products/:pid', (req, res) => {
    // Debe eliminar el producto con el pid indicado.
})

app.post('/api/carts/', (req, res) => {
    /*
    Debe crear un nuevo carrito con la siguiente estructura:
        id: Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).
        products: Array que contendrá objetos que representen cada producto.
     */
})
app.get('/api/carts/:cid', (req, res) => {
    // Debe listar los productos que pertenecen al carrito con el cid proporcionado.
})
app.post('/api/carts/:cid/products/:pid', (req, res) => {
    // Debe agregar el producto al arreglo products del carrito seleccionado, utilizando el siguiente formato:
    //      product: Solo debe contener el ID del producto.
    //      quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno).
    // Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity de dicho producto.
})

app.listen(8080, () => {
    console.log('Servidor Iniciado');
});

class ProductManager {
    constructor() {
        this.products = [];
    };
    addProduct({ title, description = "", price = 0, thumbnail = "", code, stock = 0 } = {}) {
        const product = { title, description, price, thumbnail, code, stock };
        this.products.push(product);
    };
    getProducts() {
        return this.products;
    };
    getProductById(id) {
        const product = this.products.find((p) => p.id = id)
        if (product == undefined) {
            console.log("Not Found")
            return
        };
        return product
    };

};

let prods = new ProductManager();
prods.addProduct({
    title: "a",
    code: "aabb"
});
console.log(prods.getProducts());
