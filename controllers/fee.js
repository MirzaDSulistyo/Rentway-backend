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

var Fee = require('../models/fee');

exports.create = function(req, res) {
  Fee.create({
    name: req.body.name,
    descriptions: req.body.descriptions,
    amount: req.body.amount,
    created_at: Date.now()
  },
  function (err, data) {
    if (err) return res.status(500).send({
      message: "There was a problem create a new fee.",
      error: err
    });

    res.status(200).send({
      status: 200,
      data: data
    });
  });
};

exports.list = function(req, res, next) {
  Fee.find({}, function (err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem finding list of fee." });
    if (!data) return res.status(404).send({ status: 404, message: "No categroy found." });
    res.status(200).send({ status: 200, data: data });
  })
}

exports.detail = function(req, res, next) {
	Fee.findById(req.params.id)
		.exec(function (err, data) {
	      if (err) return res.status(500).send({ status: 500, message: "There was a problem finding fee." });
	      if (!data) return res.status(404).send({ status: 404, message: "No fee found." });
	      
	      res.status(200).send({ status: 200, data: data });
	    });
}

exports.delete = function(req, res, next) {
  Fee.findByIdAndRemove(req.params.id, function(err) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to delete a fee." });
    res.status(200).send({ status: 200, message: "fee was deleted" });
  })
}

exports.update = function(req, res, next) {
  var fee = new Fee({
    name: req.body.name,
    descriptions: req.body.descriptions,
    amount: req.body.amount,
    _id: req.params.id
  });

  Fee.findByIdAndUpdate(req.params.id, fee, {}, function(err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to update fee." });
    res.status(200).send({ status: 200, data: fee });
  })
}