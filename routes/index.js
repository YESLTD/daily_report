var express = require('express');
var router = express.Router();
var report = require('../proxy/report');
/* GET home page. */
router.get('/', function(req, res, next) {
  var morning = 'ICT 今日工作计划';
  var noon = 'ICT 今日工作总结';
  var dateHours = (new Date()).getHours();
  if(dateHours < 12){
     res.render('index',{title: morning});
  }else{
     res.render('index', { title: noon });
   }
});


router.post('/save',report.save);
module.exports = router;
