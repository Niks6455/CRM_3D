import Product from "../models/product.js";

export default {

    async getProducts(req, res) {
        try {
            const products = await Product.findAll({
                where: { isDeleted: false }, // Только не удаленные
                order: [['createdAt', 'DESC'], ['id', 'ASC']]
            });
            res.json(products);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    

    async getProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    

    async createProduct(req, res) {
        
        try {
            const product = await Product.create({ name: req.body.name, price:req.body.price, description:req.body.description, isDeleted: false });
            res.json(product);
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async restoreProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            await product.update({ isDeleted: false }); // Восстанавливаем товар
    
            res.json({ message: "Product restored", product });
        } catch (e) {
            res.status(500).json(e);
        }
    },

    
    async updateProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            product.name = req.body.name;
            product.price = req.body.price;
            product.description = req.body.description;
            await product.save();
            res.json(product);
        } catch (e) {
            res.status(500).json(e);
        }
    },

   async deleteProduct(req, res) {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.update({ isDeleted: true }); // Помечаем как удаленный

        res.json({ message: "Product marked as deleted", product });
    } catch (e) {
        res.status(500).json({ error: "Failed to delete product", details: e });
    }
}

}
