import React from 'react';
import { PageHeader } from 'antd';
import themeImg from '../../static/img/1.jpg';
import './index.less';

export default class theme extends React.Component{
    render(){

        return(
            <div className="theme">
                <PageHeader
                    className="site-page-header"
                    title="主题"
                    subTitle="音乐数据展示"
                />
                <div className="theme_con">
                    <img src={themeImg} alt="" />
                </div>
            </div>
        )
    }
}