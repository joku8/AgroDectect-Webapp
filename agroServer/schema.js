var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pestReportSchema = new Schema({
    damage_cause: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    reported_at: {
        type: Date,
        default: Date.now
    }
})

const PestReport = mongoose.model('PestReport', pestReportSchema);

module.exports = PestReport;
