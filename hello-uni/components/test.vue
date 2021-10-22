<template>
	<view id="myView">
		测试组件{{num}}
		<slot></slot>
		这是父组件传递过来的数据“{{title}}”
		<button @click="sendNum">给父组件传值</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num:3,
				intId: null
			}
		},
		props:{
			title: {
				type: String,
				default: ''
			}
		},
		beforeCreate() {
			console.log('实例开始初始化');
			console.log(this.num);
		},
		created() {
			console.log('实例开始初始化完成');
			console.log(this.num);
			// this.intId = setInterval(function(){
			// 	console.log('执行定时器')
			// },1000)
			console.log(this);
		},
		beforeMount() {
			console.log('dom加载前');
			// console.log(document.getElementById('myView'))
		},
		mounted() {
			console.log('dom加载后');
			// console.log(document.getElementById('myView'))
		},
		destroyed() {
			console.log('组件销毁后');
			// clearInterval(this.intId)
		},
		methods:{
			sendNum(){
				console.log('给父组件传值');
				this.$emit('myEven',this.num);
			}
		}
	}
</script>

<style>
</style>
