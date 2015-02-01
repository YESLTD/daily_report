var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/ict_daily_report', function (err) {
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
