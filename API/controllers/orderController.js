import Order from '../models/order.js';
import OrderProduct from '../models/orderProduct.js';
import Product from '../models/product.js';
import User from '../models/user.js';

// Создать заказ
export default {
    async createOrder(req, res){
        try {
          const { userId, description, products } = req.body;
      
          if (!userId || !products || products.length === 0) {
            return res.status(400).json({ message: 'User ID and products are required' });
          }
      
          // Создаем заказ
          const order = await Order.create({ user_id: userId, description });
      
          // Добавляем товары в заказ
          const orderProducts = products.map((p) => ({
            order_id: order.id,
            product_id: p.productId,
            quantity: p.quantity,
          }));
      
          await OrderProduct.bulkCreate(orderProducts);
      
          res.status(201).json({ message: 'Order created successfully', order });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      },
      
      // Получить все заказы с товарами
      async getOrders (req, res){
        try {
            const orders = await Order.findAll({
                include: [
                  {
                    model: User,
                    attributes: ['id', 'fio', 'email'],
                  },
                  {
                    model: Product,
                    through: { model: OrderProduct, attributes: ['quantity'] }, // Указываем связь через OrderProduct
                    attributes: ['id', 'name', 'price', 'description'],
                  },
                ],
              });
              
      
          res.status(200).json(orders);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      },
      
      // Получить один заказ по ID
      async getOrderById(req, res){
        try {
          const { id } = req.params;
      
          const order = await Order.findByPk(id, {
            include: [
              {
                model: User,
                attributes: ['id', 'fio', 'email'],
              },
              {
                model: Product,
                through: { attributes: ['quantity'] },
                attributes: ['id', 'name', 'price', 'description'],
              },
            ],
          });
      
          if (!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
      
          res.status(200).json(order);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
      
}
