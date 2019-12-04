const Sheet = require('../database/sheetModel');
const Transaction = require('../database/transactionModel');
const VerifiedSheet = require('../database/verifiedSheetModel');
const uuid = require('uuid/v4');

function add_transaction(cid,type,description,amount,mode){
    var refNo = "1001"+Math.floor(100000 + Math.random() * 900000);
    let transaction = new Transaction({
        refNo : refNo,
        cid: cid,
        transactionType: type,
        description: description,
        amount: amount,
        mode: mode,
        verified: false
    });
    transaction.save(function(err){
        console.log(err);
    });
}

async function delete_transaction(refNo){
    const res = Transaction.remove({refNo: refNo});
    console.log("DELETED: "+ res.deletedCount);
}


module.exports = {
    add_transaction : add_transaction,
    delete_transaction : delete_transaction
}