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
var config = require('../config'); // get config file

var Booking = require('../models/booking');

exports.create = function(req, res) {
  Booking.create({
    store : req.body.store_id,
    payment: req.body.payment_id,
    rent_way: req.body.rent_way_id,
    product: req.body.product_id,
    user: req.userId,
    date: req.body.date,
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
  Booking.find({}, function (err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem finding list of booking." });
    if (!data) return res.status(404).send({ status: 404, message: "No booking found." });
    res.status(200).send({ status: 200, data: data });
  })
}
