// 封装生成token，解析token方法
var jwt = require('jsonwebtoken');

module.exports = {
    verify:function(token,secret){
        if(token){
            // 返回加密的token
            return jwt.verify(token,secret,function(err,decoded){
                if(err){
                    return {'success':false};
                }else{
                    return {
                        'success':true,
                        'decoded':decoded
                    }
                }
            })
        }
    }
}