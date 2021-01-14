var express = require('express');
var router = express.Router();
var db = require('../utils/databaseOperation')
//定义一个请求 /为根目录
/* GET home page. */
router.post('/',async function(req, res, next) {
  let message = ''
    let {name,password} = req.body
    let sql = 'select * from admin where admin_name=?'
    let sqlParams = [name]
    let result = await db.dql(sql,sqlParams)
    result = Object.values(result)
    if(0 < result.length){
      if(password !== result[0].admin_password){
        message = '密码错误，请重新输入'
      }else{
        //若登录成功，则将result中的密码属性去除，增加安全性
        delete result[0].admin_password
      }
    }else{
      message = '该用户不存在'
    }
    res.status(200).json({
      result,
      message
    })
});

module.exports = router;
