const connection = require('./mysql.js');

module.exports = {
	userInfo: (req,res)=>{
		var sql = 'select * from tb_user where user_id = ?';
		connection.query(sql,[8002],(err,result)=>{
			if(err){
			  console.log('[SELECT ERROR] - ',err.message);
			  return;
			}
			console.log(result);
			res.send(result);
		})
	}
}