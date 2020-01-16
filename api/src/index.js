require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const port = process.env.port || 3333;

const app = express();

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(port);
