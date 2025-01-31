import Product from "../models/product.js";

export default {

    async getProducts(req, res) {
        console.log("getProducts");
        try {
            const products = await Product.findAll();
            res.json(products);
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async getProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            res.json(product);
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async createProduct(req, res) {
        
        try {
            const product = await Product.create({ name: req.body.name, price:req.body.price, description:req.body.description});
            res.json(product);
        } catch (e) {
            res.status(500).json(e);
        }
    },
}
