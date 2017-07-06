var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/project';
//跨越
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//abcdddddd
//dfasdfsdffadsf
//adfasfsadfd
//注册			 http://localhost:3000/api/reg
router.get('/reg', function(req, res, next) {
  	//获取到前端传过来的参数
  	var name = req.query.name;
  	var pwd = req.query.pwd;
  	//链接数据库
  	MongoClient.connect(DB_CONN_STR,function(err,db){
  		if(err){
  			console.log('链接数据库失败' + err);
  			res.send({code:-1,mes:'网络异常，请稍后在试'})
  		}else {
  			var conn = db.collection('user');
  			conn.insertOne({name:name,pwd:pwd},function(err,info){
  				if(err){
  					console.log('注册失败');
  					res.send({code:-2,msg:'注册失败'});
  				}else {
  					res.send({code:0,msg:'注册成功'});
  				}
  				//关闭数据库
  				db.close();
  			})
  		}
  	})
});

//登陆        http://localhost:3000/api/login
router.post('/login', function(req, res, next) {
	  //获取到前端传过来的参数
	  	var name = req.body.name;
	  	var pwd = req.body.pwd;
		console.log(req.body)
	  	//链接数据库
	  	MongoClient.connect(DB_CONN_STR,function(err,db){
	  		if(err){
	  			console.log('链接数据库失败'+err);
	  			res.send({code:-1,mes:'网络异常，稍后在试'});
	  		}else {
	  			//成功链接
	  			var conn = db.collection('user');
	  			//查询数据库是否有该人
	  			conn.find({name:name,pwd:pwd}).count(function(err, num){
	  				if(err || num <=0){
	  					console.log('数据库没有这个人'+err);
	  					res.send({code:-2,msg:'用户名密码错误'});
	  				}else{
	  					res.send({code:0,msg:'登陆成功'});
	  				}
	  			})
	  		}
	  	})
});
module.exports = router;
