const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI_ATLAS)
.then(()=> console.log("Connected to MongoDB server"))
.catch(err=>console.log(err))

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use("/api/users", users);
app.use("/api/cards", cards);

app.listen(port, ()=> console.log("Server is running on port " + port));