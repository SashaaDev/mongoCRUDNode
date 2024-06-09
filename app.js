require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/config');
const routes = require('./routes/router');
const pug = require('pug');



const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.set('views', './views');
app.set('view engine', 'pug');


const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database', err);
});
