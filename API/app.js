import express from 'express';
import db from './models/index.js';
import AuthRoute from './routes/auth.js';
import corsConfig from './utils/cors.js';
import BookRoute from './routes/book.js';
import BookCaseRoute from './routes/bookCase.js';
import BookShelfRoute from './routes/bookShelf.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Подключение маршрутов
app.use(corsConfig);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use('/auth', AuthRoute);
app.use('/bookCase', BookCaseRoute )
app.use('/bookShelf', BookShelfRoute)
app.use('/book', BookRoute)

// Синхронизация с базой данных
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
