const fs = require('fs');
const path = require('path');

module.exports = {
    getNowTime: function (status) {
        let dateTime;
        let date;
        let yy = new Date().getFullYear()
        let mm = new Date().getMonth() + 1
        let dd = new Date().getDate()
        let hh = new Date().getHours()
        let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes()
            :
            new Date().getMinutes()
        let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
            :
            new Date().getSeconds()
        dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
        date = yy + '-' + mm + '-' + dd;

        return status ? date : dateTime;
    },
    // 上传文件
    uploadFile: function(filePath,files,callback){
        let upImgPath;
        fs.exists(filePath, function(bol) {
            // !bol 不存在，创建目录
            !bol ? fs.mkdirSync(filePath) : '';
            //创建可读流读取文件
            var rs = fs.createReadStream(files.file.path);
            upImgPath = path.join(filePath, (new Date().getTime() + '-' + files.file.name));
            //创建可写流写文件
            var ws = fs.createWriteStream(upImgPath);
            // 通过管道写入文件
            rs.pipe(ws);
            callback(upImgPath)
        });
    }
};