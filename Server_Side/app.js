const express = require('express');
const app = express();
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const tourRoute = require('./routes/tours');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.static('public'));

app.use((req, res, next) => {
  // for CORS error cross origin resource sharing due to sharing data between different servers ie this pc and ui e.g. codepen.io or client side
  res.setHeader('Access-Control-Allow-Origin', '*'); //allowing origin for every server for now
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization'); //required headers
  next();
});

app.use(bodyParser.json()); //middleware for handeling post etc request
app.use(cookieParser());

app.use('/auth', authRoute);
app.use(tourRoute);

app.use((error, req, res, next) => {
  //error handeling middleware
  const statusCode = error.statusCode || 500;
  const msg = error.message;
  const data = error.data;
  console.log(data);
  res.status(statusCode).json({
    message: msg,
    data: data,
  });
});

mongoose
  .connect(
    'mongodb+srv://user1:657214@cluster0.myjw1.mongodb.net/AdventureRadar?retryWrites=true&w=majority'
  )
  .then((result) => {
    console.log('connected');
    app.listen(8000);
  })
  .catch((err) => console.log(err));
