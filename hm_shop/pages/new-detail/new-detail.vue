<template>
	<view class="news_detail">
		<view class="tit">{{details.title}}</view>
		<view class="info">
			<text>发表时间：{{details.add_time | formatDate}}</text>
			<text>发表次数：{{details.click}}</text>
		</view>
		<rich-text class="content" :nodes="details.content">
		</rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				details:{}
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.getNewsDetail(option.id);
		},
		methods: {
			async getNewsDetail(id){
				const res = await this.$request({
					url:'/api/getnew/' + id
				});
				this.details = res.message[0];
			}
		}
	}
</script>

<style lang="scss">
.news_detail{
	font-size: 30rpx;
	padding:0 20rpx;
	.tit{
		text-align: center;
		margin: 20rpx;
		font-weight: 600;
	}
	.info{
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}
}
</style>
