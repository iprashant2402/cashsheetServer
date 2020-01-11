var express = require('express');
var router = express.Router();
const Sheet = require('../api/database/sheetModel');
const Transaction = require('../api/database/transactionModel');
const VerifiedSheet = require('../api/database/verifiedSheetModel');

var createSheet = require('../api/util/sheet').createSheet;
var fetchOpening = require('../api/util/sheet').fetchOpening;
var transactionAPI = require('../api/util/tansaction');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/createSheet',createSheet);

router.post('/closeSheet',function(req,res,next){
  const cid = req.body.cid;
  const noteCount = {
    fifty: req.body.fifty,
    hundred: req.body.hundred,
    fiveHundred: req.body.fiveHundred,
    twoThousand: req.body.twoThousand
  };
  const cashTotal = 50*noteCount.fifty + 100*noteCount.hundred + 500*noteCount.fiveHundred + 2000*noteCount.twoThousand;
  Transaction.find({cid : cid}).exec(function(err,results){
    if(err){res.status(200).send({error: err});}
    if(results){
      if(results.length>0){
        let summation = 0;
        for(var i=0;i<results.length;i++){
          if(results[i].transactionType==="income" && results[i].mode){
            summation = summation + results[i].amount;
          }
          if((results[i].transactionType==="refund" || results[i].transactionType==="expense") && results[i].mode){
            summation = summation - results[i].amount;
          }
        }
        Sheet.find({cid:cid}).exec(function(err,sheets){
          if(err){res.status(200).send({error: err});}
          if(sheets){
            if(sheets.length>0){
              var openingBal = sheets[0].opening;
              var closingBal = openingBal + summation;
              var difference = 0;
              if(closingBal>=cashTotal){
                difference = closingBal - cashTotal;
              }
              else{
                difference = cashTotal - closingBal;
              }
              sheets[0].closing = closingBal;
              sheets[0].summation = summation;
              sheets[0].difference = difference;
              sheets[0].active = false;
              sheets[0].noteCount = noteCount;
              sheets[0].save(function(err){
                if(err){res.status(200).send({error:err});}
                res.status(200).send({
                  message: 'Sheet successfully closed',
                  sheet: sheets[0]
                });
              });
            }
          }
        });
      }
      else{
        res.status(200).send({message:'Cash Sheet does not contain any transaction',error:true});
      }
    }
  });
});

router.post('/addTransaction',function(req,res,next){
  
  var refNo = "1001"+Math.floor(100000 + Math.random() * 900000);

  
  let transaction = new Transaction({
        refNo : refNo,
        cid: req.body.cid,
        transactionType: req.body.type,
        description: req.body.description,
        amount: req.body.amount,
        mode: req.body.mode,
        verified: false,
    });
    transaction.save(function(err){
        if(err){
          res.status(200).send({error : err});
        }
        const response = {
          refNo : refNo,
          added : true,
          transaction: transaction
        }
        res.status(200).send(response);
    });
});

router.get('/deleteTransaction',function(req,res,next){
  
  Transaction.deleteOne({refNo : req.query.refNo},function(err,result){
    if(err){
      res.status(200).send(err);
    }
    if(result){
      res.status(200).send(result);
    }
  });
});

router.get('/verifyTransaction',function(req,res,next){
  
  Transaction.find({refNo : req.query.refNo}).exec(function(err,transactions){
    if(err){
      res.status(200).send({error : err});
    }
    if(transactions){
      if(transactions.length>0){
        const tran = transactions[0];
        tran.verified = true;
        tran.save(function(err){
        if(err){res.status(200).send({error : err})}
        const cid = tran.cid;
        Transaction.find({cid : cid}).exec(function(err,results){
          if(err){console.log(err);}
          if(results){
            if(results.length>0){
              var flag = true;
              for(var i=0;i<results.length;i++){
                if(!results[i].verified){
                  flag = false;
                  break;
                }
              }
              if(flag){
                Sheet.find({cid:cid}).exec(function(err,arr){
                  if(err){console.log(err);}
                    if(arr){
                      if(arr.length>0){
                        arr[0].verified = true;
                        arr[0].save(function(err){
                          console.log(err);
                        });
                        const v_sheet = new VerifiedSheet({
                          cid : arr[0].cid
                        });
                        v_sheet.save(function(err){console.log(err);});
                      }
                    }
                });
              }
            }
          }
        });
        res.send({message: 'verified',id: tran.refNo,error: false});
      });
      }
      else{
        res.status(200).send({
          message: 'Not Found',error : true
        });
      }
      
    }
  });
  
});



module.exports = router;
