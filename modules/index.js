var mongoose = require('mongoose');
var config = require('../config');
console.log(config.db);
mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('connect to mongoDB error: '+err);
    process.exit(1);
  }
});

require('./report');
require('./user');
require('./plan');
exports.User = mongoose.model('User');
exports.Report = mongoose.model('Report');
exports.Plan = mongoose.model('Plan');
