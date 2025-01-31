import express from 'express';
import db from './models/index.js';
import AuthRoute from './routes/auth.js';
import UploadRoute from './routes/upload.js';
import corsConfig from './utils/cors.js';
import Product from './routes/product.js';
import Order from './routes/order.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Подключение маршрутов
app.use(corsConfig);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use('/auth', AuthRoute);
app.use('/upload', UploadRoute);
app.use('/product', Product);
app.use('/order', Order);



// Синхронизация с базой данных
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
