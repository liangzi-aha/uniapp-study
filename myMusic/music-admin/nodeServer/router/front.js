const express = require('express');
// 创建router
const Router = express.Router();
const PoolQuery = require('../mysql');
const Token = require('../token.js');
const fs = require('fs');

// 获取分类数据 和 分类数据下的歌曲信息
Router.post('/classifyList', function (req, res) {
    const sql = 'select * from music_classify';
    PoolQuery(sql, '').then(result => {
        // 没有数据
        if (result.length == 0) {
            res.send({
                success: true,
                data: [],
                message: '获取成功'
            });
        } else {
            // 有数据
            let mapData = []; // 映射数据
            let num = 0;  // 标识用于判断循环请求最后一次
            result.forEach((element, i) => {
                num++;
                // 解析分类绑定内容id数组
                let music_classify_content = element.music_classify_content && JSON.parse(element.music_classify_content) ? JSON.parse(element.music_classify_content) : [];
                // 有分类数据进行查询
                if (music_classify_content.length > 0) {
                    // 拼接生成sql
                    let sql1 = `select * from music where id in (${music_classify_content.join()})`;
                    // 根据分类数组id，查询每一条音乐数据
                    PoolQuery(sql1, '').then(result1 => {
                        num--;
                        element.music_classify_content = result1;
                        mapData.push(element);
                        if (num == 0) {
                            res.send({
                                success: true,
                                data: mapData.sort((a, b) => { return a.id - b.id }),
                                message: '获取成功'
                            })
                        }
                    })
                } else {
                    num--;
                    element.music_classify_content = [];
                    mapData.push(element);
                    if (num == 0 && i == (result.length - 1)) {
                        res.send({
                            success: true,
                            data: mapData.sort((a, b) => { return a.id - b.id }),
                            message: '获取成功'
                        })
                    }
                }
            });
        }
    })
})


// 获取分类详情
Router.post('/classifyMessage', function (req, res) {
    const { id } = req.body;
    const sql = 'select * from music_classify where id = ?';
    PoolQuery(sql, [id]).then(result => {
        if (result) {
            res.send({
                success: true,
                data: result,
                message: '获取成功'
            })
        } else {
            res.send({
                success: false,
                message: '获取失败'
            })
        }
    })
})


// 获取分类下的音乐
Router.post('/classifyMusic', function (req, res) {
    const { idList } = req.body;
    let sql = 'select * from music where ';
    // 拼接sql
    idList.forEach((element, index) => {
        if (index == 0) {
            sql += 'id =' + element;
        } else {
            sql += ' or id =' + element;
        }
    });
    PoolQuery(sql, '').then(result => {
        if (result) {
            res.send({
                success: true,
                data: result,
                message: '获取成功'
            })
        } else {
            res.send({
                success: false,
                message: '获取失败'
            })
        }
    })
})


// 获取音乐详情
Router.post('/musicDetail', function (req, res) {
    const { id } = req.body;
    const sql = 'select * from music where id = ?';
    PoolQuery(sql, [id]).then(result => {
        if (result) {
            res.send({
                success: true,
                data: result,
                message: '获取成功'
            })
        } else {
            res.send({
                success: false,
                message: '获取失败'
            })
        }
    })
})

// 获取歌词
Router.post('/lyric', function (req, res) {
    const { id } = req.body;
    const sql = 'select lyric from music where id = ?';
    PoolQuery(sql, [id]).then(result => {
        if (result && result[0] && result[0].lyric) {
            fs.readFile(result[0].lyric, 'utf8', (err, data) => {
                if (err) throw err;
                res.send({
                    success: true,
                    data: data,
                    message: '获取成功'
                })
            });
        } else {
            res.send({
                success: true,
                message: '该歌曲没有歌词'
            })
        }
    })
})


// 获取搜索关键词内容
Router.post('/searchKey', function (req, res) {
    const { search } = req.body;
    const sql = 'select * from music where musicName like ? or musicAuthor like ?';
    PoolQuery(sql, ['%' + search + "%", '%' + search + "%"]).then(result => {
        if (result) {
            res.send({
                success: true,
                data: result,
                message: '获取成功'
            })
        } else {
            res.send({
                success: false,
                message: '获取失败'
            })
        }
    })
})

// 根据关键词搜索歌曲
Router.post('/searchMusic', function (req, res) {
    const { search } = req.body;
    const sql = 'select * from music where musicName like ?';
    PoolQuery(sql, ['%' + search + "%"]).then(result => {
        if (result) {

            res.send({
                success: true,
                data: result,
                message: '获取成功'
            })
        } else {
            res.send({
                success: false,
                message: '获取失败'
            })
        }
    })
})

// 搜索热门榜
Router.post('/searchHot', function (req, res) {
    const sql = 'SELECT * from music ORDER BY searchNum DESC limit 10';
    PoolQuery(sql, '').then(result => {
        if (result) {
            res.send({
                success: true,
                data: result,
                message: '获取成功'
            })
        } else {
            res.send({
                success: false,
                message: '获取失败'
            })
        }
    })
})

// 搜索次数增加
Router.post('/searchNum', function (req, res) {
    const { id } = req.body;
    const sql = 'select * from music where id = ?';
    PoolQuery(sql, [id]).then(result => {
        if (result.length > 0) {
            const { searchNum } = result[0];
            const sql1 = 'update music set searchNum = ? where id = ?';
            PoolQuery(sql1, [searchNum + 1, id]).then(result1 => {
                if (result1) {
                    res.send({
                        success: true,
                        data: result,
                        message: '获取成功'
                    })
                }
            })
        } else {
            res.send({
                success: false,
                message: '获取失败'
            })
        }
    })
})


// 登录接口
Router.post('/login', function (req, res) {
    const { userName, password } = req.body;
    const sql = 'select userAccount,id from user where userAccount = ? and password = ?';
    PoolQuery(sql, [userName, password]).then(result => {
        if (result.length == 1) {
            let localToken = Token.create({
                data: result[0]
            });
            // 这里由于本地调试，接口和页面服务跨域，服务端无法存入cookie，等发布同域之后即可使用
            // res.cookie('userToken', localToken);
            res.send({
                success: true,
                data: result,
                token: localToken,
                message: '登录成功'
            })
        } else {
            res.send({
                success: false,
                message: '登录失败'
            })
        }
    })
})

// 注册接口
Router.post('/register', function (req, res) {
    const { userName, password } = req.body;
    const sql = 'select * from user where userAccount = ?';
    PoolQuery(sql, [userName]).then(result => {
        if (result.length == 1) {
            res.send({
                success: false,
                message: '当前账号已被注册'
            });
        } else {
            const sql1 = 'insert into user (userAccount,password) values (?,?)';
            PoolQuery(sql1, [userName, password]).then(result1 => {
                if (result1) {
                    res.send({
                        success: true,
                        message: '注册成功'
                    });
                } else {
                    res.send({
                        success: false,
                        message: '注册失败'
                    });
                }
            })
        }
    })
})

// 获取喜欢歌单列表
Router.post('/song_list', function (req, res) {
    const { userId } = req.body;
    const sql = 'select * from song_list where userId = ?';
    PoolQuery(sql, [userId]).then(result => {
        if (result) {
            // musicIdList: 存放所有歌单第一首歌id数组
            let musicIdList = [];
            if (result.length > 0) {
                let songListCon;
                // 循环歌单结果集，查询每个歌单第一条歌曲数据
                result.forEach(ele => {
                    // 判断songListCon是否为空
                    songListCon = ele.songListCon ? JSON.parse(ele.songListCon) : '';
                    // 判断songListCon length 获取songListCon下的第1个musicId
                    songListCon && songListCon.length > 0 ? (musicIdList.push(songListCon[0])) : musicIdList.push(-1);
                });
                console.log(musicIdList)
                // 拼接sql
                const sql1 = `select * from music where id in (${musicIdList.join()})`;
                PoolQuery(sql1, '').then(result1 => {
                    if (result1) {
                        res.send({
                            success: true,
                            data: result,
                            songListImg: result1, // 歌单结果集添加歌单图片
                            message: '获取成功'
                        })

                    }
                })
            } else {
                res.send({
                    success: true,
                    data: result,
                    message: '获取成功'
                })
            }
        } else {
            res.send({
                success: false,
                message: '获取失败'
            })
        }
    })
})

// 获取喜欢音乐列表
Router.post('/loveMusic', function (req, res) {
    const { userId } = req.body;
    console.log(userId)
    const sql = 'select * from love_music where userId = ?';
    PoolQuery(sql, [userId]).then(result => {
        if (result) {
            if (result[0] && result[0].loveMusicCon && JSON.parse(result[0].loveMusicCon).length > 0) {
                const idList = JSON.parse(result[0].loveMusicCon).join();
                const sql1 = `select * from music where id in (${idList})`;
                PoolQuery(sql1, '').then(result1 => {
                    if (result1) {
                        res.send({
                            success: true,
                            data: result1,
                            message: '获取成功'
                        })
                    }
                })
            } else {
                res.send({
                    success: true,
                    data: [],
                    message: '获取成功'
                })
            }
        } else {
            res.send({
                success: false,
                message: '获取失败'
            })
        }
    })
})

// 获取当前播放歌曲是否喜欢
Router.post('/playLoveMusic', function (req, res) {
    const { userId, musicId } = req.body;
    const sql = 'select * from love_music where userId = ?';
    PoolQuery(sql, [userId]).then(result => {
        if (result) {
            const loveMusicCon = result[0] && result[0].loveMusicCon ? JSON.parse(result[0].loveMusicCon) : '';
            const isExist = loveMusicCon ? loveMusicCon.filter((e) => {
                return e == musicId
            }) : '';
            console.log(isExist)

            res.send({
                success: true,
                isLove: isExist.length > 0 ? true : false,
                message: '查询成功'
            })
        } else {
            res.send({
                success: false,
                message: '查询失败'
            })
        }
    })
})

// 修改歌曲是否喜欢
Router.post('/changeLoveMusic', function (req, res) {
    const { userId, musicId } = req.body;
    const sql = 'select * from love_music where userId = ?';
    PoolQuery(sql, [userId]).then(result => {
        if (result.length > 0) {
            console.log(result)
            // 获取当期用户喜欢歌曲数组
            let loveMusicCon = result[0] && result[0].loveMusicCon ? JSON.parse(result[0].loveMusicCon) : '';
            // 获取当前歌曲是否已被添加喜欢
            const index = loveMusicCon ? loveMusicCon.indexOf(musicId) : -1;
            // 防止 loveMusicCon 为空报错
            loveMusicCon = loveMusicCon ? loveMusicCon : new Array();
            // 截取下标数组
            index != -1 ? loveMusicCon.splice(index, 1) : loveMusicCon.push(musicId);
            // 更新数据
            const sql = 'update love_music set loveMusicCon = ? where id = ?';
            PoolQuery(sql, [JSON.stringify(loveMusicCon), result[0].id]).then(result1 => {
                if (result1) {
                    res.send({
                        success: true,
                        message: '修改成功'
                    })
                } else {
                    res.send({
                        success: false,
                        message: '修改失败'
                    })
                }
            })
        } else {
            // 数据不存在插入数据
            const sql = 'insert into love_music (loveMusicCon,userId) values (?,?)';
            PoolQuery(sql, [JSON.stringify([musicId]), userId]).then(result1 => {
                if (result1) {
                    res.send({
                        success: true,
                        message: '修改成功'
                    })
                } else {
                    res.send({
                        success: false,
                        message: '修改失败'
                    })
                }
            })
        }
    })
})

// 添加歌单
Router.post('/addSongList', function (req, res) {
    const { userId, songListName } = req.body;
    const sql = 'insert into song_list (songListName,userId) values (?,?)';
    PoolQuery(sql, [songListName, userId]).then(result => {
        if (result) {
            res.send({
                success: true,
                message: '添加成功'
            })
        } else {
            res.send({
                success: false,
                message: '添加失败'
            })
        }
    })
})

// 删除歌单
Router.post('/delSongList', function (req, res) {
    const { songListId } = req.body;
    console.log(songListId)
    const sql = 'delete from song_list where id = ?';
    PoolQuery(sql, [songListId]).then(result => {
        if (result) {
            res.send({
                success: true,
                message: '删除成功'
            })
        } else {
            res.send({
                success: false,
                message: '删除失败'
            })
        }
    })
})

// 添加音乐到歌单
Router.post('/addMusicToSongList', function (req, res) {
    const { musicId, SongListId } = req.body;
    const sql = 'select * from song_list where id = ?';
    PoolQuery(sql, [SongListId]).then(result => {
        console.log(result.length)
        if (result.length > 0) {
            // 获取歌单数组
            let songListCon = result[0].songListCon ? JSON.parse(result[0].songListCon) : '';
            // 判断歌单里是否存在该歌曲
            const index = songListCon ? songListCon.indexOf(musicId) : -1;
            // 防止 songListCon 为空报错
            songListCon ? songListCon : (songListCon = []);
            // 截取下标数组
            if (index == -1) {
                songListCon.push(musicId);
                // 更新数据
                const sql = 'update song_list set songListCon = ? where id = ?';
                PoolQuery(sql, [JSON.stringify(songListCon), SongListId]).then(result1 => {
                    if (result1) {
                        res.send({
                            success: true,
                            message: '添加成功'
                        })
                    } else {
                        res.send({
                            success: false,
                            message: '添加失败'
                        })
                    }
                })
            } else {
                res.send({
                    success: false,
                    message: '该歌曲已存在当前歌单'
                })
            }
        } else {
            res.send({
                success: false,
                message: '找不到当前歌单'
            })
        }
    })
})

// 获取歌单详情
Router.post('/songListDetail', function (req, res) {
    const { songListId } = req.body;
    const sql = 'select * from song_list where id = ?';
    PoolQuery(sql, [songListId]).then(result => {
        if (result) {
            // 有歌单数据 and 歌单里有songListCon and 歌单songListCon可以解析出数据
            if (result.length > 0 && result[0].songListCon && JSON.parse(result[0].songListCon).length > 0) {
                const musicIdList = JSON.parse(result[0].songListCon).join();
                const sql1 = `select * from music where id in (${musicIdList})`;
                PoolQuery(sql1, '').then(result1 => {
                    res.send({
                        success: true,
                        message: '获取成功',
                        data: result1
                    })
                })
            } else {
                res.send({
                    success: true,
                    message: '获取成功',
                    data: []
                })
            }
        } else {
            res.send({
                success: false,
                message: '获取失败'
            })
        }
    })
})

// 删除歌单详情内容
Router.post('/delSongListMusic', function (req, res) {
    const { songListId,musicId } = req.body;
    const sql = 'select * from song_list where id = ?';
    // 查询歌单列表
    PoolQuery(sql, [songListId]).then(result => {
        if (result) {
            console.log(result[0])
            let songListCon = JSON.parse(result[0].songListCon);
            let index = songListCon.indexOf(musicId);
            songListCon.splice(index,1);
            console.log(songListCon)
            // 修改歌单列表数据
            const sql1 = `update song_list set songListCon = ? where id = ?`;
            PoolQuery(sql1, [JSON.stringify(songListCon),songListId]).then(result1 => {
                res.send({
                    success: true,
                    message: '删除成功'
                })
            })
            
        } else {
            res.send({
                success: false,
                message: '删除失败'
            })
        }
    })
})

module.exports = Router;