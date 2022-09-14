const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
const { connectDB } = require('./db/init');
const { PORT } = process.env ?? 7000;
const routes = require('./routes');

app.use(express.json({ limit: '200kb' }));
app.use(cors());

app.get('/', (req, res) => res.status(200).send('OK'));
app.use('/api', routes);

app.listen(PORT, () => {
  connectDB(() => {
    console.log('Connected to database');
    console.log(`server running on http://localhost:${PORT}`);
  });
});
