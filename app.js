const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { db } = require('./models');
const wikiRoutes = require('./routes/wiki');
const userRoutes = require('./routes/user');

const app = express();
//middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

// parses json bodies
app.use(express.json());

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

app.use('/wiki', wikiRoutes);
app.use('/user', userRoutes);

const init = async () => {
  // await Page.sync();
  // await User.sync();
  await db.sync({ force: true });

  app.listen(3000, () => {
    console.log('Listening on Port 3000');
  });
};

init();

//database to test connection
// db.authenticate().then(() => {
//   console.log('connected to database');
// });
