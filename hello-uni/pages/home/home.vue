<template>
	<view>
		数据绑定的学习
		<view>{{msg}}</view>
		<view>{{ 1+1+'你好' }}</view>
		<view>{{flga ? '真' : '假'}}</view>
		<image :src="imgUrl"></image>
		<view v-for="(item,index) in arr" :key="item.id">
			序号：{{index}}名字:{{item.name}},年龄:{{item.age}}
		</view>
		<button type="primary" @click="clickHandle($event,'啦啦啦')">按钮</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				msg: 'hello',
				flga: true,
				imgUrl:'../../static/icon/_home.png',
				arr:[
					{
						name:'宋小宝',
						age:20,
						id:1
					},{
						name:'刘能',
						age:21,
						id:2
					},{
						name:'赵四',
						age:22,
						id:3
					},{
						name:'小沈阳',
						age:23,
						id:4
					}
				]
			}
		},
		methods:{
			clickHandle(e,msg){
				console.log(e,msg);
				console.log('点击我了')
			}
		}
	}
</script>

<style>
</style>
