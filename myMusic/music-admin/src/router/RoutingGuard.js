import React from 'react';
import { Route,Redirect } from "react-router-dom";
import { getCookie } from '../utils/common';

export default class RoutingGuard extends React.Component{
    render() {
        const { routerList, location } = this.props;

        const { pathname } = location;
        
        const token = getCookie('token');
        // 检索路由
        const targetRouterConfig = routerList.find(item => {
            return '/' + pathname.split('/')[1] === item.path.replace(/\s*/g,"")
        });

        if (token) {
            // 如果是登陆状态，想要跳转到登陆，重定向到主页
            if (pathname === "/login" || pathname === '/') {
              return <Redirect to="/home" />;
            } else {
              // 如果路由合法，就跳转到相应的路由
              if (targetRouterConfig) {
                return <Route path={pathname} exact={true} component={targetRouterConfig.component} />;
              } else {
                // 如果路由不合法，重定向到 404 页面
                return <Redirect to="/404" />;
              }
            }
          } else {
            // 没有登录
            if(pathname === '/'){  // 没有登录,默认 / 路由跳转 /login 页面
                return <Redirect to="/login" />;
              } else if (targetRouterConfig && !targetRouterConfig.auth) {  // 合法路由 and （auth：false）该路由不需要登录
                const { component } = targetRouterConfig;
                return <Route exact path={pathname} component={component} />
              } else if (targetRouterConfig && targetRouterConfig.auth) {  // 合法路由 and （auth：false）该路由需要登录
                return <Redirect to="/login" />;
              } else {
                // 非登陆状态下，路由不合法时，重定向至 404
                return <Redirect to="/404" />;
              }
          }
    }
}