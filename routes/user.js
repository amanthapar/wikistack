const router = require('express').Router();
const { userList, userPages } = require('../views');
const { User, Page } = require('../models');

router.get('/', async (req, res, next) => {
  const users = await User.findAll();
  res.send(userList(users));
});

router.get('/:id', async (req, res, next) => {
  const userid = req.params.id;
  const user = await User.findById(userid);

  const pages = await Page.findAll({ where: { authorId: userid } });

  res.send(userPages(user, pages));
});

router.post('/', (req, res, next) => {
  res.send('We are in the user post route');
});

router.put('/:id', (req, res, next) => {
  res.send('updating user with id');
});

router.delete('/:id', (req, res, next) => {
  res.send('deleting user with id');
});

module.exports = router;
