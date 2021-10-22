<template>
	<view>
		<view>导航跳转的学习</view>
		<navigator url="/pages/detail/detail?id=80&code=12">跳转详情页</navigator>
		<navigator open-type="switchTab" url="/pages/message/message">跳转信息页</navigator>
		<navigator open-type="redirect" url="/pages/detail/detail">跳转详情页</navigator>
		<button @click="goDetail">跳转详情页</button>
		<button @click="goMessage">跳转信息tabbar</button>
		<button type="primary" @click="rediceDetail">跳转详情页面关闭当前页面</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onUnload() {
			console.log('导航页面卸载了')
		},
		methods:{
			goDetail(){
				uni.navigateTo({
					url:'/pages/detail/detail'
				})
			},
			goMessage(){
				uni.switchTab({
					url:"/pages/message/message"
				})
			},
			rediceDetail(){
				uni.redirectTo({
					url:"/pages/detail/detail"
				})
			}
		}
	}
</script>

<style>
</style>
