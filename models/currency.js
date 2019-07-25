var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var CurrencySchema = new Schema({
    name: {type: String, required: false},
    alias: {type: String, required: false},
    prefix: {type: String, required: false},
    created_at: {type: Date},
    updated_at: {type: Date, default: Date.now}
});

// Virtual for store's URL
CurrencySchema.virtual('url')
.get(function () {
  return '/currency/' + this._id;
});

module.exports = mongoose.model('Currency', CurrencySchema);
