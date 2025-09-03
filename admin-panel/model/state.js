const mongoose = require('mongoose');
const constants = require("../config/constants");
const StateSchema = mongoose.Schema({
 
    name: { 
        type: String,
        required: true,
        // unique: true,
        maxLength: 150 
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('State', StateSchema);