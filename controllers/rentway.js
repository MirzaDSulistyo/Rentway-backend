const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bcrypt = require('bcryptjs');
var async = require('async');
const formidable = require('formidable');

var RentWay = require('../models/rentway');

exports.create = function(req, res) {
  RentWay.create({
    name: req.body.name,
    descriptions: req.body.descriptions,
    level: req.body.level,
    alias: req.body.alias,
    created_at: Date.now()
  },
  function (err, data) {
    if (err) return res.status(500).send({
      message: "There was a problem create a new rentway.",
      error: err
    });

    res.status(200).send({
      status: 200,
      data: data
    });
  });
};

exports.list = function(req, res, next) {
  RentWay.find({}, function (err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem finding list of rentway." });
    if (!data) return res.status(404).send({ status: 404, message: "No categroy found." });
    res.status(200).send({ status: 200, data: data });
  })
}

exports.detail = function(req, res, next) {
	RentWay.findById(req.params.id)
		.exec(function (err, data) {
	      if (err) return res.status(500).send({ status: 500, message: "There was a problem finding rentway." });
	      if (!data) return res.status(404).send({ status: 404, message: "No rentway found." });
	      
	      res.status(200).send({ status: 200, data: data });
	    });
}

exports.delete = function(req, res, next) {
  RentWay.findByIdAndRemove(req.params.id, function(err) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to delete a rentway." });
    res.status(200).send({ status: 200, message: "rentway was deleted" });
  })
}

exports.update = function(req, res, next) {
  var rentway = new RentWay({
    name: req.body.name,
    descriptions: req.body.descriptions,
    level: req.body.level,
    alias: req.body.alias,
    _id: req.params.id
  });

  RentWay.findByIdAndUpdate(req.params.id, rentway, {}, function(err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to update rentway." });
    res.status(200).send({ status: 200, data: rentway });
  })
}