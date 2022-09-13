const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
const { connectDB } = require('./db/init');
const { PORT } = process.env ?? 500;

const app = express();
app.use(cors);

app.listen(PORT, () => {
  connectDB(() => {
    console.log('Connected to database');
    console.log(`server running on http://localhost:${PORT}`);
  });
});
