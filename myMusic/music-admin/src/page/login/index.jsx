import React from 'react';
import './index.less';
import { Form, Input, Button, Checkbox, message } from 'antd';
import fetch from '../../fetch/api';
import md5 from 'md5';
import { getCookie, setCookie, delCookie } from '../../utils/common';
import token from '../../token'


export default class login extends React.Component {
    state = {
        checked: false,
        userAccount: '',
        userPassword: '',
        loginFrom: '',
    }

    componentDidMount() {
        if (getCookie('userAccount') && getCookie('userPassword')) {
            this.setState({
                userAccount: getCookie('userAccount'),
                userPassword: getCookie('userPassword'),
                checked: true,
            },()=>{
                this.loginFrom.setFieldsValue({
                    username: this.state.userAccount,
                    password: this.state.userPassword,
                    remember: this.state.checked
                })
            })
            
           
        }
    }

    onFinish = (values) => {
        fetch.login({
            userAccount: values.username,
            userPassword: this.state.userPassword || md5(values.password)
        }).then(res => {
            if (res.success) {
                this.props.history.push('/home');
                message.success(res.message);
                if (this.state.checked === true) {
                    const localToken = getCookie('token');
                    const userCookie = token.verify(localToken, '李勇良');
                    setCookie('userAccount', userCookie.decoded.data.userAccount);
                    setCookie('userPassword', userCookie.decoded.data.userPassword);
                } else {
                    delCookie('userAccount');
                    delCookie('userPassword');
                }
            }
        })
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const { userAccount, userPassword,checked } = this.state;
        console.log(userAccount, userPassword,checked)

        return (
            <div className="login">
                <div className="login_center">
                    <p>良子音乐</p>
                    <Form
                        name="basic"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                        ref={com => { this.loginFrom = com }}
                    >
                        <Form.Item
                            label="账号"
                            name="username"
                            validateTrigger={['onBlur']}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入账号!',
                                },
                            ]}
                        >
                            <Input type="text"  placeholder="请输入账号" />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            validateTrigger={['onBlur']}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                placeholder="请输入密码"
                            />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox onChange={() => {
                                this.setState({
                                    checked: !this.state.checked
                                })
                            }}>记住密码</Checkbox>
                        </Form.Item>

                        <Form.Item className="subButton">
                            <Button type="primary" htmlType="submit" size="large">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
