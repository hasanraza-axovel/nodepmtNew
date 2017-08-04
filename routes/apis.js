var express = require('express');
var router = express.Router();
var port = process.env.PORT || 8000;

var auth = require('../controllers/authenticate');
var chat = require('../controllers/chat');
var proj = require('../controllers/project');
var label = require('../controllers/label');

router.get('/', function(req, res, next) {
  res.send('Hello The API at http://localhost:'+ port + '/api');
});

router.post('/register', auth.signUp);
router.post('/login', auth.login);
router.post('/createProj', proj.createProj);
router.get('/getProj/:id', proj.getProj);
router.post('/createProjLabel', label.createProjLabel);
router.get('/getProjLabel/:id', label.getProjLabel);
router.post('/saveChat', chat.saveChat);
router.get('/getChat', chat.getChat);

module.exports = router;
