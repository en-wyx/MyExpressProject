var express = require('express');
var router = express.Router();
var db = require('../utils/databaseOperation')

router.get('/',async function(req, res, next) {
    let sql = 'select * from snackstype '
    let sqlParams = []
    let result = await db.dql(sql,sqlParams)
    result = Object.values(result)
    res.status(200).json({
      result
    })
});

router.post('/',async function(req, res, next) {
  let message = ''
  let {type_snacksName} = req.body
  let sql = 'insert into snackstype(type_snacksName) values(?)'
  let sqlParams = [type_snacksName]
  let result = await db.dml(sql,sqlParams)
  if(!result){
    message = '您已添加过该类型，请勿重复添加！'
  }
  res.status(200).json({
    message
  })
});

router.put('/',async function(req, res, next) {
  let message = ''
  let {type_id,type_snacksName} = req.body
  let sql = 'update snackstype set type_snacksName = ? where type_id = ?'
  let sqlParams = [type_snacksName,type_id]
  let result = await db.dml(sql,sqlParams)
  if(!result){
    message = '该类型名重复，请核对后修改！'
  }
  res.status(200).json({
    message
  })
});

router.delete('/',async function(req, res, next) {
  let message = ''
    let idList = req.body
    console.log(idList)
    let sql = 'delete from snackstype where type_id=?'
    for(let id of idList){
      let sqlParams = [id]
      await db.dml(sql,sqlParams)
    }
    res.status(200).json({
      message
    })
});

module.exports = router;