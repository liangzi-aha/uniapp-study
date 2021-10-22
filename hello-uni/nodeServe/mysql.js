const mysql = require('mysql');
const options = {crash:
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '123456',
	database: 'web_vpn'
}

// 创建连接
var connection = mysql.createConnection(options); 

// 判断连接状态
connection.connect(function (err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect]  succeed!');
});

module.exports = connection;

