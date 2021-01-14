var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
//上传图片的模板
var multer = require('multer');
//生成的图片放在uploads文件夹下
var upload = multer({dest:'uploads/'});

router.post('/',upload.single('test'),(req,res) => {
  //读取文件路径
  fs.readFile(req.file.path,(err,data) => {
    if(err){
      res.status(200).json({
        message:'上传失败'
      })
    }
    //设置图片的名字为时间戳，确保唯一性，防止同名被覆盖
    //let time = Date.now()
    //拓展名
    //let extname = req.file.mimetype.split('/')[1]
    //拼接成图片名
    let keepname = req.file.originalname
    //三个参数 1、图片的绝对路径 2、写入的内容 3、回调函数
    fs.writeFile(path.join(__dirname,'../public/images/'+keepname),data,(err) => {
      if(err){
        res.status(200).json({
          message:'写入失败'
        })
      }
      res.status(200).json({
        message:'上传成功',
        result:'/images/'+keepname
      })
    })
  })
})

module.exports = router;