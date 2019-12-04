const mongoose = require('mongoose');
const uuid = require('uuid/v4'); 

var verifiedSheetSchema = new mongoose.Schema({
    cid : {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('VerifiedSheetModel', verifiedSheetSchema);