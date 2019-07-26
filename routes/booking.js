var express = require('express');
var router = express.Router();
var multer  = require('multer')
// text format
var textForm = multer()
/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get config file

var booking = require('../controllers/booking');

function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['token'];
  if (!token)
    return res.status(403).send({ status: 403, auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res.status(500).send({ status: 500, auth: false, message: 'Failed to authenticate token.' });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });

}

router.post('/new', verifyToken, textForm.none(), booking.create);

router.get('/', verifyToken, booking.list);

//router.get('/:id', verifyToken, booking.detail);

router.delete('/:id', verifyToken, booking.delete);

//router.put('/:id', verifyToken, booking.update);

module.exports = router;
