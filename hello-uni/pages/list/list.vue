<template>
	<div>
		<button @click="get">发送get请求</button>
		<button type="primary" @click="setStorge">存储数据</button>
		<button type="primary" @click="getStorge">获取数据</button>
		<button type="primary" @click="removeId">删除数据</button>
		<view>这是列表页</view>
		<view class="box-item" v-for="item in list" >
			{{item}}
		</view>
		<!-- <button @click="pullDown">下拉刷新</button> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: ['前端','JAVA','UI','测试','产品','大数据','老板']
			}
		},
		onPullDownRefresh() {
			console.log('触发了下拉刷新');
			setTimeout(()=>{
				this.list = ['JAVA','UI','前端','测试'];
				uni.stopPullDownRefresh();
			},2000)
		},
		onReachBottom() {
			this.list = [...this.list,...['啦啦啦','你好‘']]
			console.log('页面触底了')
		},
		methods:{
			pullDown(){
				uni.startPullDownRefresh();
			},
			get(){
				uni.request({
					url:"http://localhost:8082/api/getlunbo",
					success(res){
						console.log(res);
					}
				})
			},
			setStorge(){
				// uni.setStorage({
				// 	key:"id",
				// 	data:80,
				// 	success() {
				// 		console.log('存储成功');
				// 	}
				// })
				
				uni.setStorageSync('id',100);
			},
			getStorge(){
				uni.getStorage({
					key:'id',
					success(res){
						console.log(res.data);
					}
				});
			},
			removeId(){
				uni.removeStorage({
					key:'id',
					success() {
						console.log('删除成功')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.box-item{
		height: 100px;
	}
</style>
