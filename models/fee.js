var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var FeeSchema = new Schema({
    name: {type: String, required: false},
    descriptions: {type: String, required: false},
    amount: {type: Number, required: false},
    created_at: {type: Date},
    updated_at: {type: Date, default: Date.now}
});

// Virtual for store's URL
FeeSchema.virtual('url')
.get(function () {
  return '/fees/' + this._id;
});

module.exports = mongoose.model('Fee', TaxSchema);
