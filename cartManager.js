import crypto from 'crypto';
import fs from 'fs/promises';

class CartManager {
    constructor(path) {
        this.path = path;
    };

    async getCarts() {
        try {
            const carts = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(carts);
        } catch (error) { };
    };
    async updateCarts(carts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
        } catch (error) { };
    };

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === id);
    };

    async addCart() {
        const carts = await this.getCarts();

        const id = crypto.randomUUID();
        const cart = { id: id, products: [] };
        carts.push(cart);
        await this.updateCarts(carts);
    }

    async addToCart(cartId, productId, quantity) {
        const carts = await this.getCarts();

        const cartIndex = carts.findIndex(cart => cart.id === cartId);
        if (cartIndex === -1) throw new Error("Cart not found");

        const cartProducts = carts[cartIndex]['products'];
        const productIndex = cartProducts.findIndex(prod => prod.product === productId);
        if (productIndex === -1) {
            cartProducts.push({ product: productId, quantity: quantity });
        } else {
            cartProducts[productIndex]['quantity'] += quantity; 
        };

        await this.updateCarts(carts);
    };

    async removecartById(id) {
        const carts = await this.getCarts();

        const filteredCarts = carts.filter(cart => cart.id !== id);

        await this.updateCarts(filteredCarts);
    }
};

export default CartManager;