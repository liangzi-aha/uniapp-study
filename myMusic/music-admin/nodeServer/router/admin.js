const express = require('express');
// 创建router
const Router = express.Router();
const PoolQuery = require('../mysql');
const Token = require('../token.js');
//formidable处理POST方式提交的表单数据
var formidable = require('formidable');
const utils = require('../utils/common');

// 登录接口
Router.post('/login', function (req, res) {
    const { userAccount, userPassword } = req.body;
    const sql = 'select id,userAccount,userPassword from admin where userAccount = ? and userPassword = ?';
    const params = [userAccount, userPassword];
    PoolQuery(sql, params).then(result => {
        if (result.length === 1) {
            let localToken = Token.create({
                data: result[0]
            });
            res.cookie('token', localToken);
            const sql1 = "update admin set sessionId=? where id=?";
            PoolQuery(sql1, [localToken, result[0].id]).then(res => {
                if (res.changedRows == 1) {
                    console.log("sessionId:写入成功");
                }
            })
            res.send({
                success: true,
                data: result,
                message: '登录成功'
            });
        } else {
            res.send({
                success: false,
                message: '账号或密码错误'
            });
        }
    });
});

// 除了/login,其他所有/admin 下面的接口都会校验是否传有token
Router.use(function (req, res, next) {
    const token = req.headers.cookie ? req.cookies.token : '';
    if (token && Token.verify(token).success) {
        const sql1 = "select * from admin where id = ? and sessionId = ?";
        PoolQuery(sql1, [Token.verify(token).decoded.data.id,token]).then(result => {
            if (result.length === 1) {
                next();
            }else{
                res.status(207).send({
                    code: '0000',
                    message: '登录超时，请重新登录'
                })
            }
        })
    } else {
        // 自定义在状态码：表示未登录
        res.status(207).send({
            code: '0000',
            message: '未登录，请前去登录'
        })
    }
});

// 获取音乐列表
Router.post('/musicList', function (req, res) {
    const sql = 'select * from music';
    PoolQuery(sql, '').then(result => {
        if (result) {
            res.send({
                success: true,
                data: result,
                message: '查询成功'
            });
        } else {
            res.send({
                success: false,
                message: '音乐列表数据查询失败'
            });
        }
    });
});

// 上传文件
Router.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //parse 两个参数,第一个参数为req是前台传过来的信息 第二个参数为回调函数,回调函数有三个参数,第一个参数为错误信息,第二个参数为前台传过来的文字信息,第三个参数为前台传过来的文件信息
        console.log(fields);
        if (err) {
            res.send({
                message: '上传失败',
                success: false,
            })
        } else {
            // 根据当前日期创建文件夹，
            let fileName;
            if(fields.type == 'img'){
                fileName = './publicStatic/musicImg/' + utils.getNowTime(true);
            } else if(fields.type == 'mp3'){
                fileName = './publicStatic/music/' + utils.getNowTime(true);
            } else{
                fileName = './publicStatic/lyric/' + utils.getNowTime(true);
            }

            try {
                utils.uploadFile(fileName, files,function(filePath){
                    res.send({
                        success: true,
                        message: '上传成功',
                        filePath: filePath
                    })
                });
            } catch (error) {
                res.send({
                    success: false,
                    message: '上传失败'
                })
            }
        }
    });
});

// 添加音乐
Router.post('/addMusic', function (req, res) {
    const {
        musicAuthor,
        musicName,
        uploadImg,
        uploadMusic,
        uploadLyric
    } = req.body;
    const sql = 'insert into music (musicUrl,musicName,musicImg,musicAuthor,lyric) values (?,?,?,?,?)';
    PoolQuery(sql, [uploadMusic, musicName, uploadImg, musicAuthor,uploadLyric]).then(result => {
        if (result.insertId) {
            res.send({
                success: true,
                data: result,
                message: '添加成功'
            });
        } else {
            res.send({
                success: false,
                message: '添加失败'
            });
        }
    });
});

// 编辑音乐
Router.post('/eidtMusic', function (req, res) {
    const {
        musicAuthor,
        musicName,
        uploadImg,
        uploadMusic,
        id,
        uploadLyric
    } = req.body;
    const sql = 'update music set musicUrl=?,musicName=?,musicImg=?,musicAuthor=?,lyric=? where id = ?';
    PoolQuery(sql, [uploadMusic, musicName, uploadImg, musicAuthor,uploadLyric, id]).then(result => {
        console.log(result);
        if (result.changedRows == 1) {
            res.send({
                success: true,
                data: result,
                message: '修改成功'
            });
        } else {
            res.send({
                success: false,
                message: '修改失败'
            });
        }
    });
});


// 删除音乐
Router.post('/delMusic', function (req, res) {
    const { id } = req.body;
    let sql = 'delete from music where id = ?';
    PoolQuery(sql, [id]).then(result => {
        console.log(result);
        if (result) {
            res.send({
                success: true,
                data: result,
                message: '删除成功'
            });
        } else {
            res.send({
                success: false,
                message: '删除失败'
            });
        }
    })
})

// 获取音乐分类
Router.post('/getMusicClassify', function (req, res) {
    let sql = 'select * from music_classify';
    PoolQuery(sql, '').then(result => {
        console.log(result);
        if (result) {
            res.send({
                success: true,
                data: result,
                message: '查询成功'
            });
        } else {
            res.send({
                success: false,
                message: '音乐列表数据查询失败'
            });
        }
    })
})


// 添加音乐分类
Router.post('/addMusicClassify', function (req, res) {
    const { classifyName, classifyImg } = req.body;
    let sql = 'insert into music_classify (music_classify_name,music_classify_img) values (?,?)';
    PoolQuery(sql, [classifyName, classifyImg]).then(result => {
        if (result.insertId) {
            res.send({
                success: true,
                data: result,
                message: '添加成功'
            });
        } else {
            res.send({
                success: false,
                message: '添加失败'
            });
        }
    })
})

// 修改音乐分类绑定内容
Router.post('/editClassifyBind', function (req, res) {
    const { classifyList, id } = req.body;
    let sql = 'update music_classify set music_classify_content = ? where id = ?';
    PoolQuery(sql, [classifyList, id]).then(result => {
        if (result.changedRows == 1) {
            res.send({
                success: true,
                data: result,
                message: '修改成功'
            });
        } else {
            res.send({
                success: false,
                message: '修改失败'
            });
        }
    })
})

// 修改音乐分类
Router.post('/editMusicClassify', function (req, res) {
    const { classifyName, classifyImg, id } = req.body;
    let sql = 'update music_classify set music_classify_name = ?,music_classify_img = ? where id = ?';
    PoolQuery(sql, [classifyName, classifyImg, id]).then(result => {
        if (result.changedRows == 1) {
            res.send({
                success: true,
                data: result,
                message: '修改成功'
            });
        } else {
            res.send({
                success: false,
                message: '修改失败'
            });
        }
    })
})

// 删除音乐分类
Router.post('/delMusicClassify', function (req, res) {
    const { id } = req.body;
    let sql = 'delete from music_classify where id = ?';
    PoolQuery(sql, [id]).then(result => {
        if (result) {
            res.send({
                success: true,
                data: result,
                message: '删除成功'
            });
        } else {
            res.send({
                success: false,
                message: '删除失败'
            });
        }
    })
})

// 获取用户列表
Router.post('/userList', function (req, res) {
    let sql = 'select * from user';
    PoolQuery(sql, '').then(result => {
        if (result) {
            res.send({
                success: true,
                data: result,
                message: '查询成功'
            });
        } else {
            res.send({
                success: false,
                message: '查询失败'
            });
        }
    })
})

// 删除用户
Router.post('/delUser', function (req, res) {
    const { id } = req.body;
    let sql = 'delete from user where id = ?';
    PoolQuery(sql, [id]).then(result => {
        if (result) {
            res.send({
                success: true,
                data: result,
                message: '删除成功'
            });
        } else {
            res.send({
                success: false,
                message: '删除失败'
            });
        }
    })
})

module.exports = Router;