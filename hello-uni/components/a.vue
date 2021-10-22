<template>
	<view>
		这是a组件
		<button @click="addNum">a修改b组件的数据</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			addNum(){
				uni.$emit('updataNum',10);
			}
		}
	}
</script>

<style>
</style>
