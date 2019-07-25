var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var PaymentTypeSchema = new Schema({
    name: {type: String, required: false},
    created_at: {type: Date},
    updated_at: {type: Date, default: Date.now}
});

// Virtual for store's URL
PaymentTypeSchema.virtual('url')
.get(function () {
  return '/paymenttype/' + this._id;
});

module.exports = mongoose.model('PaymentType', PaymentTypeSchema);
