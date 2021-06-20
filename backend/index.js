const path = require("path")
const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
require('dotenv').config();
// routes
const notes = require('./routes/notes');
const auth = require('./routes/auth');

const header_middleware = require("./middlewares/header")

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(header_middleware);

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api/auth', auth);

// use Routes
app.use('/api/notes', notes);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));