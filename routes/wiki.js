const router = require('express').Router();
const { addPage, wikiPage, main } = require('../views');
const { Page } = require('../models');

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(main(pages));
});

router.post('/', async (req, res, next) => {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  const { title, content, status } = req.body;

  const page = new Page({
    title,
    content,
    status,
  });

  try {
    const { slug } = await page.save();
    console.log(slug);
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
    res.send(wikiPage(page, null));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
