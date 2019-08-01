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

var Currency = require('../models/currency');

exports.create = function(req, res) {
  Currency.create({
    name: req.body.name,
    alias: req.body.alias,
    prefix: req.body.prefix,
    created_at: Date.now()
  },
  function (err, data) {
    if (err) return res.status(500).send({
      message: "There was a problem create a new currency.",
      error: err
    });

    res.status(200).send({
      status: 200,
      data: data
    });
  });
};

exports.list = function(req, res, next) {
  Currency.find({}, function (err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem finding list of currency." });
    if (!data) return res.status(404).send({ status: 404, message: "No categroy found." });
    res.status(200).send({ status: 200, data: data });
  })
}

exports.detail = function(req, res, next) {
	Currency.findById(req.params.id)
		.exec(function (err, data) {
	      if (err) return res.status(500).send({ status: 500, message: "There was a problem finding currency." });
	      if (!data) return res.status(404).send({ status: 404, message: "No currency found." });
	      
	      res.status(200).send({ status: 200, data: data });
	    });
}

exports.delete = function(req, res, next) {
  Currency.findByIdAndRemove(req.params.id, function(err) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to delete a currency." });
    res.status(200).send({ status: 200, message: "currency was deleted" });
  })
}

exports.update = function(req, res, next) {
  var currency = new Currency({
    name: req.body.name,
    alias: req.body.alias,
    prefix: req.body.prefix,
    _id: req.params.id
  });

  Currency.findByIdAndUpdate(req.params.id, currency, {}, function(err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to update currency." });
    res.status(200).send({ status: 200, data: currency });
  })
}