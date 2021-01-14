var mysql = require('mysql');

/**
 * mysql连接时使用连接池，防止每次连接时断开不可重连
 *    pool.getConnection(function(err,connection){
           if(err){
               reject( err )
           }
            connection.query(sql, function (err,result) {}
        })
 */
var pool = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'123456',
  port:'3306',
  database:'xly'
});

const dql = (sql,sqlParams) => {
  const promise = new Promise((resolve,reject) => {
    pool.getConnection(function(err,connection){
      if(err){
          reject( err )
      }
      connection.query(sql,sqlParams, function (err,result) {
        if(err){
          console.log('[DQL ERROR]:',err.message);
          reject( err )
        }else{
          resolve(result)
        }
      });
      connection.release();
   })
  }).catch(() => { }) 
  return promise
}

const dml = (sql,sqlParams) => {
  const promise = new Promise((resolve,reject) => {
    pool.getConnection(function(err,connection){
      if(err){
          reject( err )
      }
      connection.query(sql,sqlParams, function (err,result) {
        if(err){
          console.log('[DML ERROR]:',err.message);
          reject( err )
        }else{
          resolve(result)
        }
      });
      connection.release();
   })
  }).catch(() => { }) 
  return promise
}

exports.dql = dql;
exports.dml = dml;