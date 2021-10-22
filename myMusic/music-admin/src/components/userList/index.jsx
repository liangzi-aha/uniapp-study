import React from 'react';
import { PageHeader, Table, Popconfirm, Tag, Button,message } from 'antd';
import fetch from '../../fetch/api';
import './index.less';

export default class userList extends React.Component {
    state = {
        data: [],
        pagination: {
            defaultPageSize: 10, // 分页
        },
        loading: true,
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
                title: '用户账号',
                dataIndex: 'userAccount',
                key: 'userAccount',
                render: (data) => {
                    return <Tag style={{ fontSize: '14px' }} color="red">{data}</Tag>
                }
            },
            {
                title: '操作',
                render: (data) => {
                    return (
                        <div>
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
        ]
    }

    componentDidMount() {
        this.renderTable();
    }

    renderTable = ()=>{
        fetch.userList({}).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data,
                    loading: false
                })
            }
        })
    }

    deleteTable = (data) => {
        fetch.delUser({
            id: data.id
        }).then(res=>{
            if(res.success){
                this.renderTable();
                message.success(res.message);
            }
        })
        console.log(data);
    }

    render() {
        return (
            <div className="userList">
                <PageHeader
                    className="site-page-header"
                    title="用户列表"
                    subTitle="用户列表列表查询、操作"
                />
                <div className="userTable">
                    <Table columns={this.state.columns} loading={this.state.loading} bordered={true} dataSource={this.state.data} rowKey="id" pagination={
                        this.state.pagination
                    } />
                </div>

            </div>
        )
    }
}