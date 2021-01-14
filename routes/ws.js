var express = require('express');
var expressWs = require('express-ws');
var router = express.Router();

expressWs(router);

const wsObj = {} // 记录各个webSocker连接

router
  .ws('/test', function (ws, req){
    ws.send('你连接成功了')
    // 将当前的连接记录
    const uid = req.params.uid;
    wsObj[uid] = ws;
    console.log('ws', ws)
    ws.on('message', function (msg) {
        // 业务代码
        console.log('msg', msg)
    })
   })
   .get('/test', function (req, res, next){
    console.log('get------------')
   })

module.exports = router;