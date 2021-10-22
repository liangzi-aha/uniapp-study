import { Transfer, Button } from 'antd';
import React from 'react';

export default class transfer extends React.Component {
    state = {
        disabled: false,
        allList: this.props.musicList,  // 全部数据
        targetKeys: this.props.selectKey.map(Number)  // 当前选中数据
    };

    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeys: nextTargetKeys });

        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    };

    // 映射数据
    mapData = (data) => {
        return data.map(ele => {
            return {
                key: ele.id,
                title: ele.musicName,
                disabled: false,
            }
        })
    }

    // 获取选中数据的key
    getSelectId = () => {
        this.props.getSelectId(this.state.targetKeys);
    }

    render() {
        const { targetKeys, disabled, allList } = this.state;
        return (
            <>
                <Transfer
                    showSearch
                    dataSource={this.mapData(allList)}  // 全部数据
                    titles={['未选数据', '选中数据']}
                    targetKeys={targetKeys}
                    locale={{
                        itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容'
                    }}
                    onChange={this.handleChange}
                    onSelectChange={this.handleSelectChange}
                    render={item => item.title}
                    disabled={disabled}
                    oneWay
                    listStyle={{
                        height: 300,
                        width: 'auto'
                    }}
                    style={{ marginBottom: 16 }}
                />
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" style={{ marginRight: '10px' }} onClick={this.getSelectId}>确定</Button>
                    <Button onClick={() => {
                        this.props.cancel();
                    }}>取消</Button>
                </div>
            </>
        );
    }
}