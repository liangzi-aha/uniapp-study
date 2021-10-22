<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError:function(err){
			console.log('出现异常了',err);
		}
	}
</script>

<style>
	/*每个页面公共css */ 
	@import url("~@/static/iconFont/iconfont.css");
	@font-face
	{
	font-family: myFirstFont;
	src: url('~@/static/font/webfont.ttf'); /* IE9 */
	}
	.box1{
		background-color: red;
		font-family: myFirstFont;
	}
</style>
