import BookShelf from "./../models/bookShelf.js";

export default {
    
    async getAll(req, res) {
        const bookShelfs = await BookShelf.findAll();
        res.json(bookShelfs);
    },

    async getOne(req, res) {
        const { id } = req.params;
        const bookShelf = await BookShelf.findByPk(id);
        res.json(bookShelf);
    },

    async create(req, res) {
        const { numberShelf, sizePageCount, idBookCase } = req.body;
        if(!numberShelf) throw new Error("numberShelf no found");
        if(!sizePageCount) throw new Error("sizePageCount no found");
        if(!idBookCase) throw new Error("idBookCase no found");
        console.log("req.body", req.body)
        const bookShelf = await BookShelf.create({ numberShelf, sizePageCount, bookCaseId: idBookCase,  });
        res.json(bookShelf);
    },


}