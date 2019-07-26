var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    store: {type: Schema.ObjectId, ref: 'Store', required: true},
	rent_way: {type: Schema.ObjectId, ref: 'RentWay', required: true},
	payment: {type: Schema.ObjectId, ref: 'Payment', required: true},
	product: {type: Schema.ObjectId, ref: 'Product', required: true},
	user: {type: Schema.ObjectId, ref: 'User', required: true},
    date: {type: String, required: false},
    amount: {type: Number, required: false},
    created_at: {type: Date},
    updated_at: {type: Date, default: Date.now}
});

// Virtual for store's URL
BookingSchema.virtual('url')
.get(function () {
  return '/book/' + this._id;
});

module.exports = mongoose.model('Booking', BookingSchema);
