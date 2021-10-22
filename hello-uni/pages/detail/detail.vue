<template>
	<view>
		<view>详情页面</view>
		<button type="primary" @click="chooseImg">上传图片</button>
		<img v-for="(item,index) in imgArr" @click="previewImg(item)" :src="item" alt="">
		<!-- #ifdef H5 -->
		<view>我希望只在h5页面中看见</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view>我希望只在微信小程序页面看见</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				imgArr:[]
			}
		},
		methods:{
			chooseImg(){
				uni.chooseImage({
					count:5,
					success:res=> {
						console.log(res);
						this.imgArr = res.tempFilePaths;
					}
				})
			},
			previewImg(current){
				uni.previewImage({
					current,
					urls: this.imgArr,
					loop: true,
					indicator: 'number'
				})
			}
		},
		onLoad(option) {
			console.log(option);
			// #ifdef H5
			console.log('我希望h5中打印');
			// #endif
			// #ifdef MP-WEIXIN
			console.log('我希望微信小程序打印')
			// #endif
		}
	}
</script>

<style>
	/* #ifdef H5 */
	view{
		color: pink;
	}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	view{
		color: #0000FF;
	}
	/* #endif */
</style>
