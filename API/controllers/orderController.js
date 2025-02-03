import Order from '../models/order.js';
import OrderProduct from '../models/orderProduct.js';
import Product from '../models/product.js';
import User from '../models/user.js';

// Создать заказ
export default {
  async createOrder(req, res) {
    try {
      const { description, products, phoneNumber } = req.body;
      const userId = req.user.id;
  
      if (!userId || !products || products.length === 0) {
        return res.status(400).json({ message: 'User ID and products are required' });
      }
      // Создаем заказ с указанным статусом (или "pending" по умолчанию)
      const order = await Order.create({ userId, description, status: 'pending', phoneNumber });
  
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

  //!JОбновление статуса заказа 
  async updateOrderStatus(req, res) {
    try {
      const { orderId, status } = req.body;
      
      if (!orderId || !status) {
        return res.status(400).json({ message: 'Order ID and status are required' });
      }
  
      // Проверяем, что статус валиден
      const allowedStatuses = ['pending', 'processing', 'completed', 'canceled'];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      order.status = status;
      await order.save();
  
      res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  
  
      
      // Получить все заказы с товарами
    async getOrders(req, res) {
      try {
        const userData = req.user;
        
        if (!userData) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        let orders;

        if (userData.role == 2) { // Если администратор (менеджер)
          orders = await Order.findAll({
            include: [
              {
                model: User,
                attributes: ['id', 'fio', 'email'],
              },
              {
                model: Product,
                through: { attributes: ['quantity'] }, // Указываем связь через OrderProduct
                attributes: ['id', 'name', 'price', 'description'],
              },
            ],
          });
        } else { // Если обычный пользователь
          orders = await Order.findAll({
            where: { user_id: userData.id },
            include: [
              {
                model: Product,
                through: { attributes: ['quantity'] }, // Указываем связь через OrderProduct
                attributes: ['id', 'name', 'price', 'description'],
              }, {
                model: User,
                attributes: ['id', 'fio', 'email'],
              },
            ],
          });
        }

        return res.status(200).json(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
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
