<template>
	<view class="music-head" :style="{color:color}">
		<view v-if="icon" class="music-head-icon" :class="{ 'music-head-iconBlack': iconBlack }">
			<text @tap="handleToBack" class="iconfont icon-zuojiantou"></text>
			<text>|</text>
			<text @tap="handleToHome" class="iconfont icon-shouye"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	export default {
		name:"musichead",
		data() {
			return {
				
			};
		},
		props:{
			title:{
				type: String,
				default: ''
			},
			icon:{
				type: Boolean
			},
			color:{
				type: String,
				default:'black'
			},
			iconBlack: '',
		},
		created() {
			console.log(this.color)
		},
		methods:{
			handleToBack(){
				uni.navigateBack()
			},
			handleToHome(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.music-head{
		width: 100%;
		height: 75px;
		font-size: 16px;
		line-height: 80px;
		text-align: center;
		position: relative;
		.music-head-icon{
			position: absolute;
			left: 8px;
			top: 25px;
			width: 90px;
			height: 30px;
			background-color: rgba(0,0,0,0.4);
			color: white;
			line-height: 31px;
			border-radius: 15px;
			display: flex;
			justify-content: space-around;
			text:nth-child(1){
				font-size: 15px;
			}
			text:nth-child(2){
				line-height: 30px;
			}
		}
		.music-head-iconBlack{
			color: black;
			border: solid 1rpx #eaeaea;
			background: white;
		}
	}
</style>
