var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    store_id: {type: Schema.ObjectId, ref: 'Store', required: true},
    name: {type: String, required: true, max: 100},
    category_id: {type: Schema.ObjectId, ref: 'Category', required: true},
    rent_way_id: {type: Schema.ObjectId, ref: 'RentWay', required: true},
    photo: {type: String, required: false},
    brand: {type: String, required: false},
    dimensions: {type: String, required: false},
    weight: {type: String, required: false},
    material: {type: String, required: false},
    barcode: {type: String, required: false},
    sku: {type: String, required: false},
    description: {type: String, required: true, max: 50},
    price: {type: Number, required: true},
    special_price: {type: Number, required: false},
    purchase_date: {type: String, required: false},
    commission: {type: Number, required: true},
    discount: {type: Number, required: false},
    rating: {type: Number, required: false},
    stock: {type: Number, required: false},
    rented: {type: Number, required: false},
    viewed: {type: Number, required: false},
    liked: {type: Number, required: false},
    notes: {type: String, required: false},
    created_at: {type: Date},
    updated_at: {type: Date, default: Date.now}
});

// Virtual for product's URL
ProductSchema.virtual('url')
.get(function () {
  return '/product/' + this._id;
});

module.exports = mongoose.model('Product', ProductSchema);
