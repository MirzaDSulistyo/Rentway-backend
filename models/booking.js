var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    store_id: {type: Schema.ObjectId, ref: 'Store', required: true},
	rent_way_id: {type: Schema.ObjectId, ref: 'RentWay', required: true},
	payment_id: {type: Schema.ObjectId, ref: 'Payment', required: true},
	product_id: {type: Schema.ObjectId, ref: 'Product', required: true},
	user_id: {type: Schema.ObjectId, ref: 'User', required: true},
    date: {type: String, required: false},
    amount: {type: Number, required: false},
    created_at: {type: Date},
    updated_at: {type: Date, default: Date.now}
});

// Virtual for store's URL
FeeSchema.virtual('url')
.get(function () {
  return '/book/' + this._id;
});

module.exports = mongoose.model('Booking', BookingSchema);
