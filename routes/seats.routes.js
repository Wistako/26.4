const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res, next) => {
  const id = req.params.id;
  const item = db.seats.find(item => item.id === parseInt(id));
  if (item) {
    res.json(item);
  } else {
    next();
  }
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  db.seats.push({ id: shortid(), day, seat, client, email });
  res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const element = db.seats.find(item => item.id.toString() === req.params.id);
  element.day = day;
  element.seat = seat;
  element.client = client;
  element.email = email;
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  const index = db.seats.findIndex(item => item.id.toString() === req.params.id);
  db.seats.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;