var express = require('express');
var router = express.Router();
/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/jwtConfig'); // get config file

var fee = require('../controllers/fee');

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

router.post('/new', verifyToken, fee.create);

router.get('/', verifyToken, fee.list);

router.get('/:id', verifyToken, fee.detail);

router.delete('/:id', verifyToken, fee.delete);

router.put('/:id', verifyToken, fee.update);

module.exports = router;
