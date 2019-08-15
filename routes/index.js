const path = require('path');
const express = require('express');
const router = express.Router();
var session = new Date(Date.now());
const sessionTimeOut = 600000;
const frames = [{
  "frame_id": 1,
  "video": "test.mp4",
  "frame_link": "1.jpg"
},
{
  "frame_id": 2,
  "video": "test.mp4",
  "frame_link": "2.jpg"
},
{
  "frame_id": 3,
  "video": "test.mp4",
  "frame_link": "3.jpg"
}];

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/api/giris', (req, res) => {
  if (req.body.kadi == 'fawzy' && req.body.sifre == 'fawzysifre') {
    res.cookie('rememberme', '1', { maxAge: sessionTimeOut });
    res.sendStatus(200);
  }
  else {
    res.sendStatus(400);
  }
});

router.get('/api/cikis', (req, res) => {
  res.sendStatus(200);
});

router.get('/api/frame_listesi', (req, res) => {
  if (req.cookies.rememberme == 1) {
    res.status(200).json(frames);
  }
  else {
    res.sendStatus(401);
  }
});

router.post('/api/cevap_gonder', (req, res) => {
  if (req.cookies.rememberme == 1) {
    console.log(req.body);
    res.sendStatus(200);
  }
  else {
    res.sendStatus(401);
  }
});

router.get('/img/:name', (req, res) => {
  if (req.cookies.rememberme == 1) {
    res.status(200).sendfile(path.join(path.resolve('img'), req.params.name)); 
  }
  else {
    res.sendStatus(401);
  }
});

module.exports = router;
