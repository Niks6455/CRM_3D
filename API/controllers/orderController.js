import Order from "../models/order.js";
import Product from "../models/product.js";

export default {
    getOrders: async (req, res) => {
        const orders = await Order.findAll();
        res.json(orders);
    },

    createOrder: async (req, res) => {
        const { name, count, description, idProduct } = req.body;
        if(!name || !count || !description || !idProduct) {
            return res.status(400).json({ message: 'All fields are required' });
        }else{
            const product = await Product.findByPk(idProduct);
            if(!product) {
                return res.status(400).json({ message: 'Product not found' });
            }
        }
        const userId = req.user.id;
        console.log("userId", userId);
        console.log("req.body", req.body);
        // const order = await Order.create(req.body);
        // res.json(order);
    },

    getOrder: async (req, res) => {
        const order = await Order.findByPk(req.params.id);
        res.json(order);
    }
}