const {
  body,
  validationResult
} = require('express-validator/filter');
const bcrypt = require('bcryptjs');
var async = require('async');
const formidable = require('formidable');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/jwtConfig'); // get config file

var Booking = require('../models/booking');

exports.create = function(req, res) {
  Booking.create({
    store : req.body.store_id,
    payment: req.body.payment_id,
    rent_way: req.body.rent_way_id,
    product: req.body.product_id,
    user: req.userId,
    date: Date.parse(req.body.date),
    amount: req.body.amount,
    created_at: Date.now()
  },
  function (err, data) {
    if (err) return res.status(500).send({
      message: "There was a problem create a new booking.",
      error: err
    });

    res.status(200).send({
      status: 200,
      booking: data
    });
  });
};

exports.list = function(req, res, next) {
  Booking.find({})
  	.populate('store', 'name')
    .populate('payment', 'name')
    .populate('rent_way')
    .populate({ path: 'rent_way', select: ['name', 'descriptions', 'level', 'alias'] })
    .populate({ path: 'product', select: ['name', 'photo'] })
    .populate({ path: 'user', select: ['first_name', 'last_name', 'email'] })
    .exec(function (err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem finding list of booking." });
    if (!data) return res.status(404).send({ status: 404, message: "No booking found." });
    res.status(200).send({ status: 200, data: data });
  })
}

exports.delete = function(req, res, next) {
  Booking.findByIdAndRemove(req.params.id, function(err) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to delete a booking." });
    res.status(200).send({ status: 200, message: "booking was deleted" });
  })
}