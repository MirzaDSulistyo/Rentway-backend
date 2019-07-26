var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var AvailabilitySchema = new Schema({
    store: {type: Schema.ObjectId, ref: 'Store', required: true},
	dates: [{ type: Date, required: true }],
    created_at: {type: Date},
    updated_at: {type: Date, default: Date.now}
});

// Virtual for store's URL
AvailabilitySchema.virtual('url')
.get(function () {
  return '/availability/' + this._id;
});

module.exports = mongoose.model('Availability', AvailabilitySchema);
