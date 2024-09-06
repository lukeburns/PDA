const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: 'chrome-extension://hidffbikffohmhaknmmcldfeojmoobdn',
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
    'access-control-request-headers': req.headers['access-control-request-headers']
  });
  next();
});

app.use(express.json());

app.post('/visitedUrls', (req, res) => {
  console.log('Received visited URLs: ', req.body.visitedUrls);
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
