var express = require('express');
var router = express.Router();
var db = require('../utils/databaseOperation')

router.get('/', async function (req, res, next) {
  const result = {
    "isSuccess": true,
    "message": "查询成功",
    "code": "200",
    "data": {
      "content": [{
        "id": 1,
        "processCode": "lc001",
        "processName": "流程名称",
        "typeCode": "Exam",
        "typeName": "考试",
        "applicationTypeName": "应用类型名称",
        "applicationTypeId": 1,
        "examPersonName": "小张",
        "examTime": "2018-10-11 13:13:15",
        "totalPoint": 70,
        "hasSubjective": true,
        "totalSubjectiveResult": "30",
        "hasSubmit": false
      }, {
        "id": 1,
        "processCode": "lc001",
        "processName": "流程名称",
        "typeCode": "Exam",
        "typeName": "考试",
        "applicationTypeName": "应用类型名称",
        "applicationTypeId": 1,
        "examPersonName": "小张",
        "examTime": "2018-10-11 13:13:15",
        "totalPoint": 70,
        "hasSubjective": true,
        "totalSubjectiveResult": "30",
        "hasSubmit": false
      }, {
        "id": 1,
        "processCode": "lc001",
        "processName": "流程名称",
        "typeCode": "Exam",
        "typeName": "考试",
        "applicationTypeName": "应用类型名称",
        "applicationTypeId": 1,
        "examPersonName": "小张",
        "examTime": "2018-10-11 13:13:15",
        "totalPoint": 70,
        "hasSubjective": true,
        "totalSubjectiveResult": "30",
        "hasSubmit": false
      }, {
        "id": 1,
        "processCode": "lc001",
        "processName": "流程名称",
        "typeCode": "Exam",
        "typeName": "考试",
        "applicationTypeName": "应用类型名称",
        "applicationTypeId": 1,
        "examPersonName": "小张",
        "examTime": "2018-10-11 13:13:15",
        "totalPoint": 70,
        "hasSubjective": true,
        "totalSubjectiveResult": "30",
        "hasSubmit": false
      }, {
        "id": 1,
        "processCode": "lc001",
        "processName": "流程名称",
        "typeCode": "Exam",
        "typeName": "考试",
        "applicationTypeName": "应用类型名称",
        "applicationTypeId": 1,
        "examPersonName": "小张",
        "examTime": "2018-10-11 13:13:15",
        "totalPoint": 70,
        "hasSubjective": true,
        "totalSubjectiveResult": "30",
        "hasSubmit": false
      }],
      "last": true,
      "totalElements": 1,
      "totalPages": 1,
      "first": true,
      "sort": null,
      "numberOfElements": 1,
      "size": 10,
      "number": 0
    }
  }
  res.status(200).json({
    result
  })
});

module.exports = router;