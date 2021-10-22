<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import '@/common/iconfont.css';
	uni-page-body{
		height: 100%;
	}
	/*每个页面公共css */
	.container{
		width: 100%;
		// #ifdef MP-WEIXIN
		height: calc(100vh - 75px);
		// #endif
		// #ifdef H5
		height: calc(100vh - 75px - 50px);
		// #endif
		box-sizing: border-box;
		overflow: hidden;
		scroll-view {
			height: 100%;
			box-sizing: border-box;
		}
	}
	.fixbg{
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		background-size: cover;
		background-position: center 0;
		filter: blur(20px);
		transform: scale(1.2);
		z-index: -10;
	}
	.bing-progress{
		margin: 60rpx auto 0;
	}
</style>
