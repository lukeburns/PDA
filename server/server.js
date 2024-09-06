const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors({
  origin: 'chrome-extension://nngpnjnabbdophdgmbpdikdfognblmcf',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());

// Log the headers of each incoming request
app.use((req, res, next) => {
  console.log('Headers:', req.headers);
  console.log('CORS-related headers:', {
    origin: req.headers.origin,
    'access-control-request-method': req.headers['access-control-request-method'],
    'access-control-request-headers': req.headers['access-control-request-headers'],
    'access-control-allow-origin': req.headers['access-control-allow-origin']
  });
  next();
});

app.use(express.json());

app.post('/visitedUrls', (req, res) => {
  console.log('Received visited URLs: ', req.body.visitedUrls);
  fs.writeFile('visitedUrls.txt', req.body.visitedUrls.join('\n'), err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// append event to history.txt
app.post('/event', (req, res) => {
  fs.appendFile('history.txt', JSON.stringify(req.body)+"\n\n", err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
