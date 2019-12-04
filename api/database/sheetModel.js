const mongoose = require("mongoose");
const uuid = require("uuid/v4");

// var noteCountSchema = {
//   fiftyNote: Number,
//   hundredNote: Number,
//   fiveHundredNote: Number,
//   twoThousandNote: Number
// });

var sheetSchema = new mongoose.Schema({
  cid: {
    type: String,
    unique: true,
    required: true
  },
  date: {
    type: Number,
    unique: true,
    required: true
  },
  deposited: {
    type: Boolean,
    unique: false,
    required: true
  },
  verified: {
    type: Boolean,
    unique: false,
    required: true
  },
  opening: {
    type: Number,
    unique: false,
    required: true
  },
  closing: {
    type: Number,
    unique: false,
    required: true
  },
  summation: {
    type: Number,
    unique: false,
    required: true
  },
  difference: {
    type: Number,
    unique: false,
    required: true
  },
  active: {
    type: Boolean,
    unique: false,
    required: true
  },
  noteCount: {
    type: Map,
    of: Number,
    required: true
}
});

sheetSchema.methods.setOpening = function(balance) {
  this.opening = balance;
};

sheetSchema.methods.setNoteCount = function(
  fifty,
  hundred,
  fiveHundred,
  twoThosand
) {
  
  var count = {
    fifty: fifty,
    hundred: hundred,
    fiveHundred: fiveHundred,
    twoThousand: twoThosand
  }
  this.noteCount = count;
};

module.exports = mongoose.model("SheetModel", sheetSchema);
