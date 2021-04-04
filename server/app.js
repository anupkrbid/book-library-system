const express = require('express');

const config = require('./config');

const Cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');

const BookRoutes = require('./api/v1/book/book.router');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(Cors);

app.use('/api/v1/books', BookRoutes);

app.use(errorHandler.badRequest);
app.use(errorHandler.anyError);

app.listen(config.PORT, () => console.log(`Node Server running on port ${config.PORT}`));
