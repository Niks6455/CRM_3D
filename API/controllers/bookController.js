import Book from "./../models/book.js";
import BookShelfCase from "../models/bookShelf.js";

export default {
    
    async getAll(req, res) {
        const books = await Book.findAll();
        res.json(books);
    },

    async getOne(req, res) {
        const { id } = req.params;
        const book = await Book.findOne({ where: { id } });
        res.json(book);
    },

    async create(req, res) {
        const { name, countPage, author, bookShelfId } = req.body;
        if(!name) throw new Error("name no found");
        if(!countPage) throw new Error("countPage no found");
        if(!author) throw new Error("author no found"); 
        if(!bookShelfId) throw new Error("bookShelfId no found");
        const BookShelf = await BookShelfCase.findByPk(bookShelfId);
        if(!BookShelf) throw new Error("BookShelf no found");
        const book = await Book.create({ name, countPage, author, bookShelfId});
        res.json(book);
    },

    async delete(req, res) {
        const { id } = req.params;
        console.log("id",   id)
        const book = await Book.destroy({ where: { id } });
        res.json(book);
    },

}