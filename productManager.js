import crypto from 'crypto';
import fs from 'fs/promises';

class ProductManager {
    constructor(path) {
        this.path = path;
    };

    async getProducts() {
        try {
            const products = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } catch (error) { };
    };
    async updateProducts(products) {
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
        } catch (error) { };
    };

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(prod => prod.id === id);
    };

    async addProduct(newProduct) {
        const products = await this.getProducts();

        const id = crypto.randomUUID();
        const product = { id: id, ...newProduct };
        products.push(product);
        await this.updateProducts(products);
    };

    async setProductById(id, updates) {
        const products = await this.getProducts();

        const productIndex = products.findIndex(prod => prod.id === id);
        if (productIndex === -1) throw new Error("Product not found");

        products[productIndex] = { ...products[productIndex], ...updates, id: id };

        await this.updateProducts(products);

    };

    async removeProductById(id) {
        const products = await this.getProducts();

        const filteredProducts = products.filter(prod => prod.id !== id);

        await this.updateProducts(filteredProducts);
    };
};

export default ProductManager;