var router = require('express').Router();
var users = require ('../models/users.js');


// 返回全部用户
router.route('/').get(
 function(req,res,next){
   res.status(200).send(users);
  }
);

//获取所有人平均年龄,为什么放在后面不能执行？
  router.route('/ageAvg')
    .get(function(req, res, next) {
      var sum=0;
        for (var i = 0; i < users.length; i++) {
            sum += users[i].age;  }
        var ageAvg = sum / users.length;
        console.log('ageAvg');
        res.status(200).send("average age: " + ageAvg.toString());
    });

//搜索，返回公司名称包含搜索字符串的用户列表
    router.route('/search')
        .get(function(req, res, next) {
            var com = req.query.company;
            var regexp = new RegExp(com, 'i');//使用RegExp 对象进行不区分大小写的匹配
            var  fullnamelist = [];
            for (var i = 0; i < users.length; i++) {
                if (regexp.test(users[i].company))   //RegExp test方法检索字符串中指定的值。返回 true 或 false。
                {
                    var fullname = users[i].firstName + " " + users[i].lastName
                    fullnamelist.push(fullname);
                }
            }
            if (fullnamelist.length !== 0) {
                res.status(200).send(fullnamelist);
            } else {
                res.status(404).send('Not Found');
            }
        });

//获取指定索引用户的全名
router.route('/:id').get(
  function(req,res,next){
    var id = req.params.id-1;
    // console.log(id);
    var user=users[id];
    //console.log(user);
    if(user){
      var fullname=user.firstName+ ' ' +user.lastName;
      res.status(200).send(fullname);
    }
    else {
      res.status(404).send('Not Found');
    }
  });



//修改指定索引用户的年龄并返回结果
router.route('/:id').
put(function(req,res,next){
  var id =req.params.id-1;
  var user=users[id];
  if(user){
    var age = parseInt(req.body.age);
     if(age){user.age=req.body.age;
     res.status(200).send(user);
            }
    else {
    console.log('Error:Age must be a number');
    res.status(200).end();
         }
       }
  else{
    res.status(404).send('Not Found');
      }
          }
);

//获取指定性别人数
router.route('/count/:sex')
    .get(function(req, res, next) {
        var sex = req.params.sex;
        var countsex = 0;
        if (sex === 'male' || sex === 'female') {
            for (var i = 0; i < users.length; i++) {
                if (users[i].sex === sex) {
                    countsex++;}
            }
            res.status(200).send(sex + ':'+countsex);
        } else {
            res.status(200).send('sex should be male or female');
        }

    });


module.exports=router;
