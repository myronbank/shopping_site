const express = require('express');
const app = express();
const path = require('path');
const dotenv = require("dotenv");
const config = require('./config');
const mongoose = require('mongoose');
const error = require('./middleware/error');
const product = require('./routes/product');
const upload = require('./routes/upload');
const user = require('./routes/user');
const auth = require('./routes/auth');
const home = require('./routes/home');
const form = require('./routes/form');
const fanSubmission_AWS2 = require('./routes/fanSubmission');
require('express-async-errors');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('connected to MongoDB...'))
  .catch(err => console.error("could not connect to MongoDB...", err))

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/contactUs', form)
app.use('/api/products', product)
app.use('/api/user', user)
app.use('/api/login', auth)
app.use("/api/upload", upload)
app.use("/api/submitPhoto", fanSubmission_AWS2)
app.use('*', home)
app.use(error);

app.listen(process.env.PORT, () => console.log("listening to port 5500")); 
