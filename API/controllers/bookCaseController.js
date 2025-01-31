import { Model } from 'sequelize';
import Book from '../models/book.js';
import BookShelf from '../models/bookShelf.js';
import BooksCase from '../models/bookCase.js';

export default {
	async create(req, res) {
		const { name, countShelf } = req.body;
		if (!name) throw new Error('name no found');
		if (!countShelf) throw new Error('countShelf no found');
		const userData = req.user;
		console.log('userData', userData);
		console.log('name', name);
		console.log('countShelf', countShelf);
		const bookCase = await BooksCase.create({
			name,
			countShelf,
			userId: userData.id,
		});
		res.json(bookCase);
	},
	async getAll(req, res) {
		const bookCases = await BooksCase.findAll({
			include: [
				{
					model: BookShelf,
					include: [Book],
				},
			],
		});
		res.json(bookCases);
	},
};
