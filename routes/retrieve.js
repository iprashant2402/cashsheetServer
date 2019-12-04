var express = require('express');
var router = express.Router();
const Sheet = require('../api/database/sheetModel');
const Transaction = require('../api/database/transactionModel');
const VerifiedSheet = require('../api/database/verifiedSheetModel');

router.get('/', function(req, res, next) {
  res.send("NEED TO BE CHECKED");
});

router.get('/sheet',function(req,res,next){
    Sheet.find({cid:req.query.cid}).exec(function(err,sheets){
        if(err){
            res.status(200).send({
                error : true,
                message: err
            });
        }
        if(sheets){
            if(sheets.length>0){
                res.status(200).send({
                    error : false,
                    sheet : sheets
                });
            }
            else{
                res.status(200).send({
                    error : false,
                    sheet : []
                });
            }
        }
        else{
            res.status(200).send({
                error : true,
                message : 'No sheets found'
            });
        }
    });
});

router.get('/sheets',function(req, res, next){
    Sheet.find().exec(function(err,sheets){
        if(err){
            res.status(200).send({
                error : true,
                message: err
            });
        }
        if(sheets){
            if(sheets.length>0){
                res.status(200).send({
                    error : false,
                    sheets : sheets
                });
            }
            else{
                res.status(200).send({
                    error : false,
                    sheets : []
                });
            }
        }
        else{
            res.status(200).send({
                error : true,
                message : 'No sheets found'
            });
        }
    });
});

router.get('/transactions',function(req, res, next){
    Transaction.find({cid : req.query.cid}).exec(function(err,results){
        if(err){
            res.status(200).send({
                error : true,
                message: err
            });
        }
        if(results){
            if(results.length>0){
                res.status(200).send({
                    error : false,
                    transactions : results
                });
            }
            else{
                res.status(200).send({
                    error : false,
                    transactions : []
                });
            }
        }
        else{
            res.status(200).send({
                error : true,
                message : 'No transactions found'
            });
        }
    });
});

router.get('/verifiedSheets',function(req, res, next){
    Sheet.find({verified:true}).exec(function(err,sheets){
        if(err){
            res.status(200).send({
                error : true,
                message: err
            });
        }
        if(sheets){
            if(sheets.length>0){
                res.status(200).send({
                    error : false,
                    sheets : sheets
                });
            }
            else{
                res.status(200).send({
                    error : false,
                    sheets : []
                });
            }
        }
        else{
            res.status(200).send({
                error : true,
                message : 'No sheets found'
            });
        }
    });
});

module.exports = router;
