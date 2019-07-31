const {
  body,
  validationResult
} = require('express-validator/filter');
const bcrypt = require('bcryptjs');
var async = require('async');
const formidable = require('formidable');

var Product = require('../models/product');

exports.create_post = function(req, res) {
  var photo = "https://i1.wp.com/thefrontline.org.uk/wp-content/uploads/2018/10/placeholder.jpg";
  var purchaseDate = Date.parse(req.body.purchase_date);
  Product.create({
    store : req.body.store_id,
    name: req.body.name,
    category: req.body.category_id,
    rent_way: req.body.rent_way_id,
    photo: photo,
    brand: req.body.brand,
    dimensions: req.body.dimensions,
    weight: req.body.weight,
    material: req.body.material,
    description: req.body.description,
    barcode: req.body.barcode,
    sku: req.body.sku,
    price: req.body.price,
    purchase_date: purchaseDate,
    special_price: req.body.special_price,
    discount: req.body.discount,
    commission: req.body.commission,
    notes: req.body.notes,
    rating: 0,
    rented: 0,
    viewed: 0,
    liked: 0,
    created_at: Date.now()
  },
  function (err, data) {
    if (err) return res.status(500).send({
      message: "There was a problem create a new product.",
      error: err
    });

    res.status(200).send({
      status: 200,
      product: data
    });
  });
};

exports.new_post = function(req, res, next) {
  console.log("body " + req.body.satu);
  console.log("file " + req.files);
  var data = req.body.satu;
  var file = req.files;
  res.status(200).send({ status: 200, data: data, file: file});
}

exports.list = function(req, res, next) {
  Product.find({})
    .populate('store')
    .populate('category')
    .populate('rent_way')
    .exec(function (err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem finding list of products." });
    if (!data) return res.status(404).send({ status: 404, message: "No product found." });
    res.status(200).send({ status: 200, data: data });
  })
}

exports.list_products = function(req, res, next) {
  Product.find({store_id: req.params.id}, function (err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem finding list of products." });
    if (!data) return res.status(404).send({ status: 404, message: "No product found." });
    res.status(200).send({ status: 200, data: data });
  })
}

exports.product_detail = function(req, res, next) {
  Product.findById(req.params.id, function(err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem finding product." });
    if (!data) return res.status(404).send({ status: 404, message: "No product found." });
    res.status(200).send({ status: 200, data: data });
  })
}

exports.product_delete = function(req, res, next) {
  Product.findByIdAndRemove(req.params.id, function(err) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to delete a product." });
    res.status(200).send({ status: 200, message: "product was deleted" });
  })
}

exports.product_update = function(req, res, next) {
  var product = new Product({
    store_id : req.body.store_id,
    name: req.body.name,
    category_id: req.body.category_id,
    rent_way_id: req.body.rent_way_id,
    photo: photo,
    brand: req.body.brand,
    dimensions: req.body.dimensions,
    weight: req.body.weight,
    material: req.body.material,
    descriptions: req.body.descriptions,
    barcode: req.body.barcode,
    sku: req.body.sku,
    price: req.body.price,
    purchase_date: req.body.purchase_date,
    special_price: req.body.special_price,
    discount: req.body.discount,
    rating: 0,
    stock: req.body.stock,
    rented: 0,
    viewed: 0,
    liked: 0,
    notes: req.body.notes,
    _id: req.params.id
  });

  Product.findByIdAndUpdate(req.params.id, product, {}, function(err, data) {
    if (err) return res.status(500).send({ status: 500, message: "There was a problem to update product." });
    res.status(200).send({ status: 200, data: product });
  })
}