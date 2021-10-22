<template>
	<view class="pics">
		<scroll-view class="left" scroll-y>
			<view :class="active === index ? 'active' : ''" v-for="(item,index) in PicsList" :key="item.id" @click="clickPics(index,item.id)">{{item.title}}</view>
		</scroll-view>
		<view class="right">
			<scroll-view scroll-y>
				<view class="item" v-for="item in seccondData" :key="item.id">
					<image @click="perviewImg(item.img_url)" mode="widthFix" :src="item.img_url"></image>
					<text>
						{{item.title}}
					</text>
				</view>
				<view v-if="seccondData.length === 0">暂无数据</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import img1 from '@/static/image/1.png';
	import img2 from '@/static/image/2.png';
	import img3 from '@/static/image/3.png';
	import img4 from '@/static/image/4.png';
	import img5 from '@/static/image/5.png';
	import img6 from '@/static/image/6.png';
	export default {
		data() {
			return {
				PicsList:[],
				active: 0,
				seccondData: [],
				imgList: [img1,img2,img3,img4,img5,img6]
			}
		},
		onLoad() {
			this.getPics();
		},
		methods: {
			// 导航栏
			async getPics(callback){
				const { message } = await this.$request({
					url: '/api/getimgcategory'
				});
				this.PicsList = message;
				this.clickPics(this.active,message[0].id);
			},
			// 导航栏渲染信息
			async clickPics(index,id){
				this.active = index;
				// 获取右侧数据
				const { message } = await this.$request({
					url: '/api/getimages/' + id
				})
				message.map((ele,index)=>{
					return ele.img_url = this.imgRandom();
				})
				this.seccondData = message;
			},
			imgRandom(){
				return this.imgList[Math.floor(Math.random()*6)]
			},
			perviewImg(current){
				const urls = this.seccondData.map(ele=>{
					return ele.img_url;
				});
				uni.previewImage({
					current,
					urls
				})
			}
		}
	}
</script>

<style lang="scss">
	// ifder MP-WEIXIN
	page{
		height: 100%;
	}
	// endif
	// ifdef H5
	uni-page-body{
		height: 100%;
	}
	// endif
		
	.pics{
		display: flex;
		justify-content: space-between;
		height: 100%;
		.left{
			height: 100%;
			flex: 2;
			border-right: 1rpx solid #eee;
			view{
				height: 110rpx;
				line-height: 110rpx;
				text-align: center;
				font-size: 30rpx;
				border-top: 1rpx solid #eee;
			}
			.active{
				color: white;
				background-color: $show-color;
			}
		}
		.right{
			flex: 5;
			padding: 10rpx;
			box-sizing: border-box;
			height: 100%;
			scroll-view{
				height: 100%;
				.item{
					margin-bottom: 15rpx;
					image{
						width: 100%;
						border-radius: 5rpx;
					}
					text{
						font-size: 30rpx;
						line-height: 60rpx;
					}
				}
			}
		}
	}
</style>
