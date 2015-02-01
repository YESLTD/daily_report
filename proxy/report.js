var Modules = require('../modules');
var Plan = Modules.Plan;
var Report = Modules.Report;
var User = Modules.User;
//save plan on morning
exports.save = function (req,res,next) {
  var name = req.body.name;
  var content = req.body['report[]'];
  console.log(req.body);
  if(name === null || name.trim().length === 0){
    return res.json({flag:false});
  }
  if(content.size === 0){
    return res.json({flag:false});
  }
  content = content.filter(function (item) {
    if(item === null || item.trim().length === 0 )
      return false;
      return true;
    });
    console.log('content.length' + content.length);
  if(content.length === 0){
    return res.json({flag:false});
  }
  console.log(name + content);
  var dateHours = (new Date()).getHours();
  var obj = null;
  // console.log('dataHours = ' + dateHours);
  if(dateHours > 12){
    obj = new Report({user:name,conetxt:content});
  }else{
    obj = new Plan({user:name,conetxt:content});
  }

  // var user = new User({name:name},{upsert:true});
  User.update({name:name},{name:name},{upsert:true},function (err) {
    // console.log('update uesr');
    if(err)
      return res.json({flag:false});

  });
  // console.log('point');
  obj.save(function (err) {
    if(err)
      res.json({flag:false});
    res.json({flag:true});
  });

};
