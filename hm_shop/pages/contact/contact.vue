<template>
	<view class="contact">
		<image mode="widthFix" class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="info">
			<view @click="phone">联系电话：400-611-9090（点击拨打）</view>
			<view>校区地址：浙江省杭州市下沙区</view>
		</view>
		<!-- 114.068355,33.291433 -->
		<map :longitude="longitude" :scale="scale" :latitude="latitude" class="map" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude:114.066404,
				latitude:33.293258,
				scale: 14,
				markers:[
					{
						longitude:114.066404,
						latitude:33.293258,
						iconPath: '../../static/icon/home-active.png',
						width: 30,
						height: 30,
					}
				]
			}
		},
		methods: {
			phone(){
				console.log('拨打电话')
				uni.makePhoneCall({
					phoneNumber: '400-611-9090'
				})
			}
		}
	}
</script>

<style lang="scss">
.contact{
	// 750 * 294
	.img{
		width: 750rpx;
		height: calc(750rpx / 750 * 294);
	}
	.info{
		padding: 10rpx 20rpx;
		font-size: 30rpx;
		view{
			line-height: 80rpx;
			border-bottom: solid 1rpx #ccc;
		}
	}
	.map{
		width: 720rpx;
		height: 720rpx;
		padding: 15rpx;
	}
}
</style>
