import Favorite from '../models/favorites.js';
import Product from '../models/product.js';

export default {
  // Получить все избранные товары пользователя
  async getFavorites(req, res) {
    try {
      const favorites = await Favorite.findAll({
        where: { userId: req.user.id },
        include: { model: Product, attributes: ['id', 'name', 'price', 'description', 'image'] }
      });
      res.json(favorites);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // Добавить товар в избранное
  async addFavorite(req, res) {
    try {
      const { productId } = req.body;
      const userId = req.user.id;

      // Проверяем, не добавлен ли уже товар в избранное
      const existing = await Favorite.findOne({ where: { userId, productId } });
      if (existing) return res.status(400).json({ message: "Этот товар уже в избранном" });

      const favorite = await Favorite.create({ userId, productId });
      res.json(favorite);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // Удалить товар из избранного
  async removeFavorite(req, res) {
    try {
      const { productId } = req.body;
      const userId = req.user.id;

      await Favorite.destroy({ where: { userId, productId } });
      res.json({ message: "Товар удален из избранного" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};
