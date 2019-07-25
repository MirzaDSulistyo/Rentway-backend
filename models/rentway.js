var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var RentWaySchema = new Schema({
    name: {type: String, required: false},
    descriptions: {type: String, required: false},
    level: {type: String, required: false},
    alias: {type: String, required: false},
    created_at: {type: Date},
    updated_at: {type: Date, default: Date.now}
});

// Virtual for store's URL
RentWaySchema.virtual('url')
.get(function () {
  return '/rentway/' + this._id;
});

module.exports = mongoose.model('RentWay', RentWaySchema);
