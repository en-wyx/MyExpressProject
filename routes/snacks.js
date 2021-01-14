var express = require('express');
var router = express.Router();
var db = require('../utils/databaseOperation')

router.get('/',async function(req, res, next) {
  let size = 10;
  let {snacks_id,star,snacks_name} = req.query
    let sql = 'select * from snackstype,snacks where snacks.snacks_type=snackstype.type_id'
    let sqlParams = []
    if(!snacks_id&&!star&&!snacks_name){
      sql = 'select count(snacks_id) from snacks'
    }
    if(snacks_id){//根据id查询
      sql = sql + ' and snacks.snacks_id=?'
      sqlParams = [snacks_id]
    }
    if(snacks_name){//根据零食名称查询
      sql = sql + ' and snacks.snacks_name like ?'
      sqlParams = ['%'+snacks_name+'%']
    }
    if(star){//分页查询
      sql = sql + ' limit ?,?'
      sqlParams = [parseInt(star),size]
    }
    let result = await db.dql(sql,sqlParams)
    result = Object.values(result)
    res.status(200).json({
      result
    })
});

router.post('/',async function(req, res, next) {
  let message = ''
  let {snacks_name,snacks_type,snacks_img,snacks_price,snacks_unit,snacks_count} = req.body
  let sql = 'insert into snacks(snacks_name,snacks_type,snacks_img,'
      +'snacks_updateTime,snacks_price,snacks_unit,snacks_count) values(?,?,?,now(),?,?,?)'
  let sqlParams = [snacks_name,snacks_type,snacks_img,snacks_price,snacks_unit,snacks_count]
  let result = await db.dml(sql,sqlParams)
  if(!result){
    message = '您已添加过该零食，请勿重复添加！'
  }
  res.status(200).json({
    message
  })
});

router.put('/',async function(req, res, next) {
  let message = ''
  let {snacks_id,snacks_name,snacks_type,snacks_img,snacks_price,snacks_unit,snacks_count} = req.body
  let sql = 'update snacks set snacks_name=?,snacks_type=?,snacks_img=?,snacks_price=?,snacks_unit=?,'
      +'snacks_count=? where snacks_id = ?'
  let sqlParams = [snacks_name,snacks_type,snacks_img,snacks_price,snacks_unit,snacks_count,snacks_id]
  let result = await db.dml(sql,sqlParams)
  if(!result){
    message = '该零食名重复，请核对后修改！'
  }
  res.status(200).json({
    message
  })
});

router.delete('/',async function(req, res, next) {
  let message = ''
    let idList = req.body
    let sql = 'delete from snacks where snacks_id=?'
    for(let id of idList){
      let sqlParams = [id]
      await db.dml(sql,sqlParams)
    }
    res.status(200).json({
      message
    })
});

module.exports = router;