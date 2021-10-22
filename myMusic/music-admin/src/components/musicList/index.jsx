import React from 'react';
import { PageHeader, Table, Button, Modal, Form, Input, Upload, message, Popconfirm } from 'antd';
import ImgCrop from 'antd-img-crop';
import Draggable from 'react-draggable';
import fetch from '../../fetch/api';
import './index.less';
import { getBase64,apiBaseUrl,resourceUrl } from '../../utils/common';

export default class musicList extends React.Component {
    state = {
        musicList: [], // 音乐所有数据
        columns: [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                render: text => {
                    return <span>{text}</span>
                },
            },
            {
                title: '音乐名称',
                dataIndex: 'musicName',
                key: 'musicName',
            },
            {
                title: '作者',
                dataIndex: 'musicAuthor',
                key: 'musicAuthor',
            },
            {
                title: '音乐图片',
                key: 'musicImg',
                dataIndex: 'musicImg',
            },
            {
                title: '音乐地址',
                key: 'musicUrl',
                dataIndex: 'musicUrl',
            },
            {
                title: '操作',
                render: (data) => {
                    return (
                        <div>
                            <Button type="primary" icon={<i className="iconfont icon-xiugai"></i>} style={{ marginRight: '10px' }} onClick={() => {
                                this.EditTable(data);
                            }}> 修改</Button>
                            <Popconfirm
                                title="确定要删除当前音乐吗?"
                                onConfirm={()=>{
                                    this.deleteTable(data)
                                }}
                                okText="确定"
                                cancelText="取消"
                                placement="top"
                            >
                                <Button type="primary" danger icon={<i className="iconfont icon-shanchu"></i>}> 删除</Button>
                            </Popconfirm>,

                        </div>
                    )
                }
            }
        ],
        pagination: {
            defaultPageSize: 10,  // 每页大小
        },
        visible: false,  //添加、编辑弹出框 展示状态
        disabled: true,
        bounds: { left: 0, top: 0, bottom: 0, right: 0 },
        moduleTitle: '',  // 添加、编辑 title动态切换
        fileList: [], // 已上传图片
        fileMusicList: [], // 已上传音乐
        fileLyricList: [], // 已上传歌词
        previewVisible: false,  // 图片预览弹出框 展示状态
        previewImage: '',  // 预览图片地址
        previewTitle: '',  // 预览图片 title
        moduleStatus: '',  // 弹出框是添加还是修改
        editId: '',  // 修改列id
        musicName: '',  // 编辑音乐名称
        musicAuthor: '',  // 编辑音乐作者
        loading: true, // 表格加载状态
    }

    // 实现 module 弹出框可拖动
    draggleRef = React.createRef();

    // 获取数据
    componentDidMount() {
        this.renderTable();
    }

    renderTable = () => {
        fetch.musicList({}).then(res => {
            if (res.success) {
                this.setState({
                    musicList: res.data,
                    loading: false
                })
            }
        })
    }

    // 添加弹出框
    addMusic = () => {
        this.setState({
            visible: true,
            moduleTitle: '添加',
            moduleStatus: 'add',
            musicName: '',
            musicAuthor: '',
            fileList: [],
            fileMusicList: [],
            fileLyricList: []
        });
    }

    // 编辑弹出框
    EditTable = (data) => {
        console.log(data);
        this.setState({
            visible: true,
            moduleTitle: '修改',
            moduleStatus: 'edit',
            editId: data.id,
            musicName: data.musicName,
            musicAuthor: data.musicAuthor,
            fileList: [{
                uid: '1',
                name: data.musicImg.split('\\')[data.musicImg.split('\\').length - 1],
                status: 'done',
                url: resourceUrl + data.musicImg,
                response: {
                    filePath: data.musicImg,
                }
            }],
            fileMusicList: [{
                uid: '2',
                name: data.musicUrl.split('\\')[data.musicUrl.split('\\').length - 1],
                status: 'done',
                response: {
                    filePath: data.musicUrl,
                }
            }],
            fileLyricList:  data.lyric ? [{
                uid: '3',
                name: data.lyric.split('\\')[data.lyric.split('\\').length - 1],
                status: 'done',
                response: {
                    filePath: data.lyric,
                }
            }] : []
        });
    }

    // 删除数据
    deleteTable = (data) => {
        console.log(data);
        fetch.delMusic({ id: data.id }).then(res => {
            if (res.success) {
                message.success(res.message);
                this.renderTable();
            }
        })
    }

    // 确定按钮
    handleOk = e => {
        console.log(e);
        // 提交表单数据
        this.musicFrom.validateFields().then(value => {
            console.log(value);
            let params = {
                musicAuthor: value.musicAuthor,
                musicName: value.musicName,
                uploadImg: this.state.fileList[0].response.filePath,
                uploadMusic: this.state.fileMusicList[0].response.filePath,
                uploadLyric: this.state.fileLyricList[0] ? this.state.fileLyricList[0].response.filePath : '',
            }

            if (this.state.moduleStatus === 'add') {
                fetch.addMusic(params).then(res => {
                    if (res.success) {
                        console.log(res);
                        this.setState({
                            visible: false,
                        });
                        message.success(res.message);
                        this.renderTable();
                    }
                })
            } else {
                params.id = this.state.editId;
                fetch.eidtMusic(params).then(res => {
                    if (res.success) {
                        console.log(res);
                        this.setState({
                            visible: false,
                        });
                        message.success(res.message);
                        this.renderTable();
                    }
                })
            }
        }).catch(err => {
            console.log(err)
        })
    };

    // 添加修改弹出框 取消按钮
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    // 图片预览取消按钮
    handlePriviewCancel = e => {
        console.log(e);
        this.setState({
            previewVisible: false,
        });
    };

    // 记录弹出框移动位置
    onStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement;
        const targetRect = this.draggleRef?.current?.getBoundingClientRect();
        this.setState({
            bounds: {
                left: -targetRect?.left + uiData?.x,
                right: clientWidth - (targetRect?.right - uiData?.x),
                top: -targetRect?.top + uiData?.y,
                bottom: clientHeight - (targetRect?.bottom - uiData?.y),
            },
        });
    };

    // 图片上传回调
    onChange = ({ fileList }) => {
        this.setState({
            fileList
        })
    };

    // 音乐上传回调
    onMusicChange = ({ fileList }) => {
        this.setState({
            fileMusicList: fileList
        })
    };

     // 歌词上传回调
     onLyricChange = ({ fileList }) => {
         console.log(fileList);
        this.setState({
            fileLyricList: fileList
        })
    };

    // 图片上传预览
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    // 自定义获取表单数据
    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {
        const { bounds, disabled, visible, moduleTitle, previewVisible, previewImage, previewTitle, fileList, fileMusicList, fileLyricList, musicName, musicAuthor,loading } = this.state;

        return (
            <div className="music_list">
                <PageHeader
                    className="site-page-header"
                    title="音乐列表"
                    subTitle="音乐列表列表查询、操作"
                />
                {/* 表格渲染 */}
                <div className="music_table">
                    <Button type="primary" onClick={this.addMusic}>添加music</Button>
                    <Table loading={loading} columns={this.state.columns} dataSource={this.state.musicList} rowKey="id" bordered={true} pagination={
                        this.state.pagination
                    } />
                </div>
                <Modal
                    title={
                        <div
                            style={{
                                width: '100%',
                                cursor: 'move',
                            }}
                            onMouseOver={() => {
                                if (disabled) {
                                    this.setState({
                                        disabled: false,
                                    });
                                }
                            }}
                            onMouseOut={() => {
                                this.setState({
                                    disabled: true,
                                });
                            }}
                        >
                            {moduleTitle}
                        </div>
                    }
                    destroyOnClose={true}
                    visible={visible}
                    cancelText="取消"
                    okText="确定"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    modalRender={modal => (
                        <Draggable
                            disabled={disabled}
                            bounds={bounds}
                            onStart={(event, uiData) => this.onStart(event, uiData)}
                        >
                            <div ref={this.draggleRef}>{modal}</div>
                        </Draggable>
                    )}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                        ref={com => { this.musicFrom = com }}
                        initialValues={{
                            musicName: musicName,
                            musicAuthor: musicAuthor,
                            uploadMusic: fileMusicList,
                            uploadLyric: fileLyricList,
                        }}
                    >
                        <Form.Item
                            label="音乐名称"
                            name="musicName"
                            rules={[{ required: true, message: '请输入音乐名称!' }]}
                        >
                            <Input type="text" value={musicName} />
                        </Form.Item>

                        <Form.Item
                            label="作者"
                            name="musicAuthor"
                            rules={[{ required: true, message: '请输入音乐作者!' }]}
                        >
                            <Input type="text" value={musicAuthor} />
                        </Form.Item>
                        <Form.Item
                            name="uploadMusic"
                            label="上传音乐"
                            valuePropName="fileList"
                            getValueFromEvent={this.normFile}
                            rules={[
                                {
                                    required: true,
                                    validator: (_, value) => {
                                        return fileMusicList.length > 0 ? Promise.resolve() : Promise.reject(new Error('请上传音乐文件'))
                                    }
                                }
                            ]}
                        >
                            <Upload
                                action={apiBaseUrl + "/admin/upload"}
                                data={{
                                    type: 'mp3'
                                }}
                                multiple={false}
                                defaultFileList={fileMusicList}
                                onChange={this.onMusicChange}
                                maxCount={1}
                                listType="picture"
                                accept="audio/*"
                                >
                                <Button>点击上传音乐文件</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name="uploadLyric"
                            label="上传歌词"
                            valuePropName="fileList"
                            getValueFromEvent={this.normFile}
                            // rules={[
                            //     {
                            //         required: true,
                            //         validator: (_, value) => {
                            //             return fileLyricList.length > 0 ? Promise.resolve() : Promise.reject(new Error('请上传歌词'))
                            //         }
                            //     }
                            // ]}
                        >
                            <Upload
                                action={apiBaseUrl + "/admin/upload"}
                                data={{
                                    type: 'lyric'
                                }}
                                multiple={false}
                                defaultFileList={fileLyricList}
                                onChange={this.onLyricChange}
                                maxCount={1}
                                listType="picture"
                                >
                                <Button>点击上传歌词</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="上传图片"
                            name="uploadImg"
                            rules={[
                                {
                                    required: true,
                                    validator: (_, value) => {
                                        return fileList.length > 0 ? Promise.resolve() : Promise.reject(new Error('请上传图片'))
                                    }
                                }
                            ]}
                            valuePropName="fileList"
                            accept="image/*"
                            getValueFromEvent={this.normFile}
                        >
                            <ImgCrop rotate>
                                <Upload
                                    action={apiBaseUrl + "/admin/upload"}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.onChange}
                                    multiple={false}
                                    maxCount={1}
                                    data={{
                                        type: 'img'
                                    }}
                                >
                                    {fileList.length < 1 && '+ Upload'}
                                </Upload>
                            </ImgCrop>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handlePriviewCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}