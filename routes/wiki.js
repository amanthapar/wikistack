const router = require('express').Router();
const { addPage, wikiPage, main } = require('../views');
const { Page, User } = require('../models');

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(main(pages));
});

router.post('/', async (req, res, next) => {
  const { title, content, status, name, email } = req.body;

  const [user] = await User.findOrCreate({
    where: { email },
    defaults: { name },
  });

  const page = new Page({
    title,
    content,
    status,
  });

  try {
    const { slug } = await page.save();

    await page.setAuthor(user);
    res.redirect(`/wiki/${slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  const { slug } = req.params;
  try {
    const page = await Page.findOne({
      where: {
        slug,
      },
    });
    res.send(wikiPage(page, await page.getAuthor()));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
