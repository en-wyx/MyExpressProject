var createError = require('http-errors');
var express = require('express');
var expressWs = require('express-ws');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

//路由信息（接口地址）开始，存放在./routes目录下
//-----------------------------------------------路由引入-----------
var loginRouter = require('./routes/login');//home page接口
var snacksTypeRouter = require('./routes/snacksType')
var snacksRouter = require('./routes/snacks')
var uploadRouter = require('./routes/upload')//上传图片接口
var xshRouter = require('./routes/xsh')
var wsRouter = require('./routes/ws') // webSocker接口
//---------------------------------------------------------------


var app = express();
// NodeJs实现WebSocket——express-ws,在现有的app实例上绑定websocket协议的封装方法
expressWs(app)
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,x-requested-with");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.ws('/socketTest', function (ws, req){
  ws.send('你连接成功了')
  console.log('ws', ws)
  console.log('req', req)
  ws.on('message', function (msg) {
  })
})
//---------模板开始
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');//指定视图引擎为jade
//----------模板结束
app.use(logger('dev'));
app.use(bodyParser.json())
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//提供给express.static函数的路径是相对于启动node进程的目录。
//如果您从另一个目录运行快速应用程序，则使用您要提供的目录的绝对路径更安全：
app.use(express.static(path.join(__dirname, 'public')));
//-----------------------------------------------接口注册---------------------------
app.use('/login', loginRouter);//在app中注册routes接口
app.use('/snacksType',snacksTypeRouter);
app.use('/snacks', snacksRouter);
app.use('/upload', uploadRouter)
app.use('/admin/comprehensive/getExamGradeList',xshRouter)
app.use('/websocket', wsRouter)
//--------------------------------------------------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
