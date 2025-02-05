import Product from "../models/product.js";
import multer from "multer";
import path from "path";
import fs from "fs";

    const acceptedTypes = /jpeg|jpg|png|doc|docx|pdf/;

    const fileFilter = (req, { originalname }, cb) => {
    const extension = path.extname(originalname).toLowerCase();
    if (acceptedTypes.test(extension)) cb(null, true);
    else cb(new AppError(errorCodes.FileExtensionNotAllowed));
    };

const storage = multer.diskStorage({
  destination: async ({body: {id, types}, url},{ originalname }, cb) => {   
      cb(
        null,
        `./uploads/`
      );
  },
  filename: async ({body: { id, types }, url} , { originalname }, cb) => {
    const extension = path.extname(originalname).toLowerCase();
   cb(null,  Buffer.from(originalname, 'latin1').toString('utf8'));
  },
});

const uploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3145728 },
}).single("file");

export default {
    uploader,
    async  uploadFile({body: {id}, file}, res) {
        if (!file) return 'file is undefined';
        if(!id) return 'id is undefined';
        const filepath = file.size > 1024 * 1024 * 1.5 
            ? `uploads/compressed/${file.filename}` 
            : `uploads/${file.filename}`;
    
        const product = await Product.findByPk(id)

        if(!product) return 'product not found';
        try {
            const data = fs.readFileSync(filepath);
            const base64Image = data.toString('base64');
            await product.update({ image: base64Image });
                
            res.json({ filePath: filepath, base64Image });
        } catch (err) {
            console.error(err.message);
            throw new Error('Error reading file');
        }
    }
}

