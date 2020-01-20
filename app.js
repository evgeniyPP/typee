const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ extended: true }));

app.use('/x', express.static(path.join(__dirname, 'client', 'x')));

app.get('/x/:code', async (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, 'client', 'x', 'index.html'));
  } catch (e) {
    res.status(500).json({ message: 'Ошибка сервера, попробуйте снова', error: e });
  }
});

app.get('/api/:id', async (req, res) => {
  try {
    const allLinks = await axios.get('https://typeme-1388e.firebaseio.com/links.json');
    res.json(allLinks.data[req.params.id]);
  } catch (e) {
    res.status(500).json({ message: 'Ошибка сервера, попробуйте снова', error: e });
  }
});

app.use('/', express.static(path.join(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
