const mongoose = require('mongoose');
const uuid = require('uuid/v4'); 

var transactionSchema = new mongoose.Schema({
    refNo : {
        type: String,
        unique: true,
        required: true
    },
    cid : {
        type: String,
        unique: false,
        required: true
    },
    transactionType : {
        type: String,
        unique: false,
        required: true
    },
    description : {
        type: String,
        unique: false,
        required: true
    },
    amount : {
        type: Number,
        unique: false,
        required: true
    },
    mode : {
        type: Boolean,
        unique: false,
        required: true
    },
    verified: {
        type: Boolean,
        unique: false,
        required: true
    }
});

module.exports = mongoose.model('transactionModel',transactionSchema);