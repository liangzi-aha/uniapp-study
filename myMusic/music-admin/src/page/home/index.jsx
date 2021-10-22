import { Menu,Dropdown } from 'antd';
import React from 'react';
import './index.less';
import headImg from '../../static/img/3.jpg';
import { Route,Redirect,Switch } from "react-router-dom";
import musicList from '../../components/musicList';
import classify from '../../components/classify';
import userList from '../../components/userList';
import theme from '../../components/theme';
import { delCookie } from '../../utils/common'

const { SubMenu } = Menu;

export default class Sider extends React.Component {
    state = {
        theme: 'light',
        current: '',
        openKeys:[],
    };

    componentDidMount(){
        console.log(this.props);
        this.setState({
            current: this.props.location.pathname
        });
        if(this.props.location.pathname === '/home/musicList' || this.props.location.pathname === '/home/classify'){
            this.setState({
                openKeys: ['music']
            })
        }else if(this.props.location.pathname === '/home/userList'){
            this.setState({
                openKeys: ['user']
            })
        }
    }

    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
        this.props.history.push(e.key);
    };

    onOpenChange = keys => {
        this.setState({
            openKeys: [keys[keys.length-1 < 0 ? 0 : keys.length-1]]
        });
        
    };

    logOut = ()=>{
        delCookie('token');
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="home">
                <div className="home_title">
                    <span>良子音乐</span>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key="1" onClick={this.logOut}>
                                <span>退出登录</span>
                            </Menu.Item>
                        </Menu>
                    } placement="bottomLeft" arrow>
                        <span className="home_headImg">
                            <img src={headImg} alt="" />
                        </span>
                    </Dropdown>
                </div>
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ width: 256 }}
                    openKeys={this.state.openKeys}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                    className="home_menu"
                    onOpenChange={this.onOpenChange}
                >
                    <Menu.Item key="/home" icon={<i className="iconfont icon-31shouyexuanzhong"></i>}>
                        主题
                    </Menu.Item>
                    <SubMenu key="music" icon={<i className="iconfont icon-yinle"></i>} title="音乐管理">
                        <Menu.Item key="/home/musicList">音乐列表</Menu.Item>
                        <Menu.Item key="/home/classify">音乐分类</Menu.Item>
                    </SubMenu>
                    <SubMenu key="user" icon={<i className="iconfont icon-yonghu"></i>} title="用户管理">
                        <Menu.Item key="/home/userList">用户列表</Menu.Item>
                    </SubMenu>
                </Menu>
                <div className="home_content">
                    {/* 子路由 */}
                    <Switch>
                        <Route path='/home' exact component={theme}></Route>
                        <Route path='/home/musicList' exact component={musicList}></Route>
                        <Route path='/home/classify' exact component={classify}></Route>
                        <Route path='/home/userList' exact component={userList}></Route>
                        {/* /home/*: /home下的子路由路由不合法时跳转404页面 */}
                        <Redirect from="/home/*" to="/404"></Redirect>
                    </Switch>
                </div>
            </div>
        );
    }
}