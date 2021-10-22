import React from 'react';
import { PageHeader, Table, Button, Modal, Form, Input, Upload, message, Popconfirm, Tag } from 'antd';
import ImgCrop from 'antd-img-crop';
import Draggable from 'react-draggable';
import fetch from '../../fetch/api';
import './index.less';
import { getBase64, apiBaseUrl, resourceUrl } from '../../utils/common';
import Transfer from '../Transfer/index';

export default class classify extends React.Component {
    state = {
        MusicClassifyList: [],  // 音乐分类列表数据
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
                title: '分类名称',
                dataIndex: 'music_classify_name',
                key: 'music_classify_name',
                render: (data) => {
                    return <Tag style={{ fontSize: '14px' }} color="red">{data}</Tag>
                }
            },
            {
                title: '分类图片',
                dataIndex: 'music_classify_img',
                key: 'music_classify_img',
            },
            {
                title: '操作',
                render: (data) => {
                    return (
                        <div>
                            <Button type="primary" icon={<i className="iconfont icon-xiugai"></i>} style={{ marginRight: '10px' }} onClick={() => {
                                this.EditTable(data);
                            }}> 修改</Button>
                            <Button onClick={() => {
                                this.bindMusic(data)
                            }} style={{ marginRight: '10px' }} type="primary" icon={<i className="iconfont icon-shanchu"></i>}> 绑定</Button>
                            <Popconfirm
                                title="确定要删除当前音乐吗?"
                                onConfirm={() => {
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
            defaultPageSize: 10, // 分页
        },
        visible: false,  // 添加弹出框展示状态
        disabled: true,
        bounds: { left: 0, top: 0, bottom: 0, right: 0 },
        moduleTitle: '',  // 添加修改title
        fileList: [], // 已上传图片
        previewVisible: false,  // 图片预览弹框展示状态
        previewImage: '',  // 预览图片
        previewTitle: '',  // 预览图片弹框title 根据图片名称定义
        moduleStatus: '',  // 弹出框是添加还是修改
        editId: '',  // 修改列id
        classifyName: '',  // 分类名称
        musicList: [],  // 所有音乐
        selectKey: [], // 当前分类已绑定音乐id
        transferVisible: false,  // 穿梭组件弹出框 展示状态
        loading: true, // 表格加载状态
    }

    // 实现 module 弹出框可拖动
    draggleRef = React.createRef();

    // 获取数据
    componentDidMount() {
        this.renderTable();
        this.getMusicList();
    }

    // 获取全部音乐数据
    getMusicList = () => {
        fetch.musicList({}).then(res => {
            this.setState({
                musicList: res.data
            })
        })
    }

    // 渲染分类table表格
    renderTable = () => {
        fetch.getMusicClassify({}).then(res => {
            if (res.success) {
                this.setState({
                    MusicClassifyList: res.data,
                    loading: false,
                })
            }
        })
    }

    // 添加弹出框
    addMusic = () => {
        this.setState({
            visible: true,
            moduleTitle: '添加分类',
            moduleStatus: 'add',
            classifyName: '',
            fileList: [],
        });
    }

    // 编辑弹出框
    EditTable = (data) => {
        console.log(data);
        this.setState({
            visible: true,
            moduleTitle: '修改分类',
            moduleStatus: 'edit',
            editId: data.id,
            classifyName: data.music_classify_name,
            fileList: [{
                uid: '1',
                name: data.music_classify_name,
                status: 'done',
                url: resourceUrl + data.music_classify_img,
                response: {
                    filePath: data.musicImg,
                }
            }]
        });
    }

    // 删除数据
    deleteTable = (data) => {
        console.log(data);
        fetch.delMusicClassify({ id: data.id }).then(res => {
            if (res.success) {
                message.success(res.message);
                this.renderTable();
            }
        })
    }

    // 绑定弹出框
    bindMusic = (data) => {
        this.setState({
            transferVisible: true,
            selectKey: JSON.parse(data.music_classify_content) || [],
            editId: data.id,
        })
    }

    // 修改绑定数据
    getSelectId = (data) => {
        console.log(data);
        fetch.editClassifyBind({
            classifyList: JSON.stringify(data),
            id: this.state.editId
        }).then(res => {
            if (res.success) {
                message.success(res.message);
                this.renderTable();
                this.setState({
                    transferVisible: false
                })
            }
        })
    }

    // 修改分类数据
    handleOk = e => {
        console.log(e);
        // 提交表单数据
        this.musicFrom.validateFields().then(value => {
            console.log(value);
            let params = {
                classifyName: value.classifyName,
                classifyImg: this.state.fileList[0].response.filePath,
            }

            console.log(params)
            if (this.state.moduleStatus === 'add') {
                fetch.addMusicClassify(params).then(res => {
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
                fetch.editMusicClassify(params).then(res => {
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

    // 穿梭组件取消按钮
    handleTransferCancel = () => {
        this.setState({
            transferVisible: false,
        });
    }

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

    // 设置是否运行展开二级table
    rowExpandable = (record) => {
        return record.music_classify_content ? true : false;
    }

    // 设置二级table数据
    expandedRowRender = (record, index, indent, expanded) => {
        console.log(record, index, indent, expanded);
        let list = [];
        JSON.parse(record.music_classify_content).forEach(id => {
            this.state.musicList.forEach(ele => {
                if (ele.id === id) {
                    list.push(ele)
                }
            })
        });

        const columns = [
            {
                title: '歌曲名称', dataIndex: 'musicName', key: 'musicName',
                render: (data) => (
                    <Tag style={{ fontSize: '14px' }} color="#2db7f5">{data}</Tag>
                )
            },
            { title: '作者', dataIndex: 'musicAuthor', key: 'musicAuthor' },
            { title: '音乐地址', dataIndex: 'musicUrl', key: 'musicUrl' },
        ];

        return <Table columns={columns} rowKey="id" dataSource={list} pagination={false} />;
    };

    render() {
        const { bounds, disabled, visible, moduleTitle, previewVisible, previewImage, previewTitle, fileList, classifyName, transferVisible, musicList, selectKey,loading } = this.state;

        return (
            <div className="music_classify_list">
                <PageHeader
                    className="site-page-header"
                    title="音乐列表"
                    subTitle="音乐列表列表查询、操作"
                />
                {/* 表格渲染 */}
                <div className="music_classify_table">
                    <Button type="primary" onClick={this.addMusic}>添加分类</Button>
                    <Table columns={this.state.columns} loading={ loading } bordered={true} dataSource={this.state.MusicClassifyList} expandable={{ expandedRowRender: this.expandedRowRender }} rowKey="id" rowExpandable={this.rowExpandable} pagination={
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
                            classifyName: classifyName
                        }}
                    >
                        <Form.Item
                            label="分类名称"
                            name="classifyName"
                            rules={[{ required: true, message: '请输入分类名称!' }]}
                        >
                            <Input type="text" value={classifyName} />
                        </Form.Item>
                        <Form.Item
                            label="分类图片"
                            name="classifyImg"
                            rules={[
                                {
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
                {/* 图片预览 */}
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handlePriviewCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                {/* 穿梭组件 */}
                <Modal
                    visible={transferVisible}
                    title='选中分类数据'
                    footer={null}
                    onCancel={this.handleTransferCancel}
                    zIndex={1001}
                    destroyOnClose={true}
                >
                    <Transfer musicList={musicList} selectKey={selectKey} getSelectId={this.getSelectId} cancel={this.handleTransferCancel}></Transfer>
                </Modal>

            </div>
        )
    }
}