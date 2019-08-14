const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bcrypt = require('bcryptjs');
var async = require('async');
const formidable = require('formidable');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/jwtConfig'); // get config file

var RentWay = require('../models/rentway');
var PaymentType = require('../models/paymentType');
var Category = require('../models/category');

exports.list = function(req, res, next) {
  async.parallel({
  	rentway: function(callback) {
  		RentWay.find({}).exec(callback)
  	},
  	payments: function(callback) {
  		PaymentType.find({}).exec(callback)
  	},
  	categories: function(callback) {
  		Category.find({}).exec(callback)
  	},
  }, function (err, results) {
  		if (err) return res.status(500).send({ status: 500, message: "There was a problem finding list of data master." });

        // if (results.rentway == null) { // No results.
        //     var err = new Error('RentWay not found');
        //     err.status = 404;
        //     return next(err);
        // }

        // if (results.payments == null) { // No results.
        //     var err = new Error('Payments not found');
        //     err.status = 404;
        //     return next(err);
        // }

        // if (results.categories == null) { // No results.
        //     var err = new Error('Categories not found');
        //     err.status = 404;
        //     return next(err);
        // }

        // Successful
        res.status(200).send({ status: 200, rentway: results.rentway, payments: results.payments, categories: results.categories });
    });
}