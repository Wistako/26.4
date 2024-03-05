const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res, next) => {
  const id = req.params.id;
  const item = db.concerts.find(item => item.id === parseInt(id));
  if (item) {
    res.json(item);
  } else {
    next();
  }
});
  
router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  db.concerts.push({ id: shortid(), performer, genre, price, day, image });
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const element = db.concerts.find(item => item.id.toString() === req.params.id);
  element.performer = performer;
  element.genre = genre;
  element.price = price;
  element.day = day;
  element.image = image;
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const index = db.concerts.findIndex(item => item.id.toString() === req.params.id);
  db.concerts.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;