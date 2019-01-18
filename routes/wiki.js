const router = require('express').Router();
const addPage = require('../views/addPage');

router.get('/', (req, res, next) => {
  res.send('We are in the wiki get route');
});

router.post('/', (req, res, next) => {
  res.send('We are in the wiki post route');
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
