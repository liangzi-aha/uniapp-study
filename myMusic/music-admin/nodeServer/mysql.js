var mysql = require('mysql');
// 创建连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456', 
    database: 'music',
    port: '3306',
    connectionLimit: 10,
});

// 封装连接池查询
const PoolQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) throw err; // 获取连接池失败

            // 获取连接池进行查询
            connection.query(sql, params, function (error, results, fields) {
                // 释放连接池
                connection.release();
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    })
}

module.exports = PoolQuery;
