var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;



var ReportSchema = new Schema({
  date:{type:Date,default:Date.now},
  conetxt:{type:Array,default:[]},
  user:{type:String},
});

mongoose.model('Report', ReportSchema);
