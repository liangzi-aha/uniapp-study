<template>
	<view class="news">
		<newsItem @itemCilck="goDetail" :newsList="newsList"></newsItem>
	</view>
</template>

<script>
	import newsItem from '../../components/news_item/news_item.vue'
	export default {
		components:{
			newsItem
		},
		data() {
			return {
				newsList:[]
			}
		},
		onLoad() {
			this.getNews();
		},
		methods: {
			async getNews(){
				const { message } = await this.$request({
					url:'/api/getnewslist'
				});
				
				this.newsList = message;
			},
			goDetail(id){
				uni.navigateTo({
					url: '/pages/new-detail/new-detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss"> 
.news{
	
}
</style>
