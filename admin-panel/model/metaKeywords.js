const mongoose = require('mongoose');
const constants = require("../config/constants");
const MetaKeywordSchema = mongoose.Schema({
 
    keyword: { 
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [constants.CONST_DB_STATUS_ACTIVE, constants.CONST_DB_STATUS_INACTIVE],
        default: constants.CONST_DB_STATUS_ACTIVE
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('metakeyword', MetaKeywordSchema);