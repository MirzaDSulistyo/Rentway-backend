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

var PaymentType = require('../models/paymentType');

exports.create = function(req, res) {
  PaymentType.create({
    name: req.body.name,
    created_at: Date.now()
  },
  function (err, data) {
    if (err) return res.status(500).send({
      message: "There was a problem create a new payment type.",
      error: err
    });

    res.status(200).send({
      status: 200,
      data: data
    });
  });
};

exports.list = function(req, res, next) {
  PaymentType.find({}, function (err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem finding list of payment type." });
    if (!data) return res.status(404).send({ status: 404, message: "No payment type found." });
    res.status(200).send({ status: 200, data: data });
  })
}

exports.detail = function(req, res, next) {
	PaymentType.findById(req.params.id)
		.exec(function (err, data) {
	      if (err) return res.status(500).send({ status: 500, message: "There was a problem finding payment type." });
	      if (!data) return res.status(404).send({ status: 404, message: "No payment type found." });
	      
	      res.status(200).send({ status: 200, data: data });
	    });
}

exports.delete = function(req, res, next) {
  PaymentType.findByIdAndRemove(req.params.id, function(err) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to delete a payment type." });
    res.status(200).send({ status: 200, message: "payment type was deleted" });
  })
}

exports.update = function(req, res, next) {
  var paymentType = new PaymentType({
    name: req.body.name,
    _id: req.params.id
  });

  PaymentType.findByIdAndUpdate(req.params.id, category, {}, function(err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to update payment type." });
    res.status(200).send({ status: 200, data: paymentType });
  })
}