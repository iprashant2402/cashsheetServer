const Sheet = require('../database/sheetModel');
const Transaction = require('../database/transactionModel');
const VerifiedSheet = require('../database/verifiedSheetModel');
const uuid = require('uuid/v4');
const moment = require('moment-timezone');

function sub_one_day(date){
    date = date.toString().split('');
    var digits = date.map(Number);
    var year = digits[0]*1000 + digits[1]*100 + digits[2]*10 + digits[3];
    var month = digits[4]*10 + digits[5];
    var day = digits[6]*10 + digits[7];
    day = day - 1;
    if((day)<1){
        var odd = [1,3,5,7,8,10,12];
        var even = [4,6,9,11];
        var feb = [2];
        if(odd.includes(month-1) || (month-1)===0){
            day = 31;
            month = month-1;
            if(month<1){month = 12;year = year - 1;}
        }
        if(even.includes(month-1)){
            day = 30;
            month = month-1;
            if(month<1){month = 12;year = year - 1;}
        }
        if(feb.includes(month-1)){
            day = 28;
            month = month-1;
            if(month<1){month = 12;year = year - 1;}
        }
    }
    year = year.toString();
    month = month.toString();
    day = day.toString();
    return(Number(year+month+day));
    
}

function createSheet(req,res){
    
    var date = Number(moment(req.body.date).tz('America/New_York').format("YYYYMMDD"));
    
    const noteCount = {
        fifty: 0,
        hundred: 0,
        fiveHundred: 0,
        twoThousand: 0
    };
    var openingBal = 0;
    if(req.body.opening){
        openingBal = req.body.opening;
    }

    let sheet = new Sheet({
        cid : uuid(),
        date : date,
        deposited : false,
        verified : false,
        opening : openingBal,
        closing : 0,
        summation : 0,
        difference : 0,
        active: true,
        noteCount: noteCount
    });

    sheet.setNoteCount(0,0,0,0);

    var prevDate = sub_one_day(date);
    Sheet.find({date : prevDate}).exec(function(err,prevSheet){
        let openingBalance = 0;
            if(err){
                console.log(err);
            }
            if(req.body.opening){
                openingBalance = req.body.opening;
            }
            if(prevSheet){
            if(prevSheet.length>0){
                openingBalance = prevSheet[0].closing;
            }
            }
            console.log(openingBalance);
            sheet.setOpening(openingBalance);
            sheet.save(function(err){
                if(err){
                    res.status(200).send({error: true,message:err});
                }
                res.status(200).send({message:"Cash sheet created successfully.",});
            });
        });    

}


module.exports = {
    createSheet : createSheet
};