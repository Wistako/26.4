const express = require('express');
const router = express.Router();
const db = require('./../db');


router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});


router.route('/testimonials/:id').get((req, res, next) => {

  const id = req.params.id;
  const item = db.testimonials.find(item => item.id === parseInt(id));
  if (item) {
    res.json(item);
  } else {
    next();
  }
});

router.route('/testimonials/random').get((req, res) => {
  const random = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[random]);
});

router.route('/testmonials').post((req, res) => {
  const { author, text } = req.body;
  db.testimonials.push({ id: shortid(), author, text });
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const element = db.testimonials.find(item => item.id.toString() === req.params.id);
  element.author = author;
  element.text = text;
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const index = db.testimonials.findIndex(item => item.id.toString() === req.params.id);
  db.testimonials.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;