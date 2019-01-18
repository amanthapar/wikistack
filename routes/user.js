const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('We are in the users get route');
});

router.get('/:id', (req, res, next) => {
  res.send('We are getting a user');
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
