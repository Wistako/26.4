const express = require('express');
const cors = require('cors');
const path = require('path');
const shortid = require('shortid');
const db = require('./db');

const app = express();

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

// mildware

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

// endpoints

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});