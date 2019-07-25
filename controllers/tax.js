const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bcrypt = require('bcryptjs');
var async = require('async');
const formidable = require('formidable');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get config file

var Tax = require('../models/tax');

exports.create = function(req, res) {
  Tax.create({
    name: req.body.name,
    descriptions: req.body.descriptions,
    amount: req.body.amount,
    created_at: Date.now()
  },
  function (err, data) {
    if (err) return res.status(500).send({
      message: "There was a problem create a new tax.",
      error: err
    });

    res.status(200).send({
      status: 200,
      data: data
    });
  });
};

exports.list = function(req, res, next) {
  Tax.find({}, function (err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem finding list of tax." });
    if (!data) return res.status(404).send({ status: 404, message: "No categroy found." });
    res.status(200).send({ status: 200, data: data });
  })
}

exports.detail = function(req, res, next) {
	Tax.findById(req.params.id)
		.exec(function (err, data) {
	      if (err) return res.status(500).send({ status: 500, message: "There was a problem finding tax." });
	      if (!data) return res.status(404).send({ status: 404, message: "No tax found." });
	      
	      res.status(200).send({ status: 200, data: data });
	    });
}

exports.delete = function(req, res, next) {
  Tax.findByIdAndRemove(req.params.id, function(err) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to delete a tax." });
    res.status(200).send({ status: 200, message: "tax was deleted" });
  })
}

exports.update = function(req, res, next) {
  var tax = new Tax({
    name: req.body.name,
    descriptions: req.body.descriptions,
    amount: req.body.amount,
    _id: req.params.id
  });

  Tax.findByIdAndUpdate(req.params.id, tax, {}, function(err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to update tax." });
    res.status(200).send({ status: 200, data: tax });
  })
}