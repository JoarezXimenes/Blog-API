const express = require('express');
require('express-async-errors');

const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const blogPostRoutes = require('./routes/blogPostRoutes');

const loginController = require('./controllers/loginController');

const errorMiddleware = require('./middlewares/errorMiddleware');
// ...

const app = express();

app.use(express.json());

app.post('/login', loginController.login);

app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/post', blogPostRoutes);

// ...

app.use(errorMiddleware);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
