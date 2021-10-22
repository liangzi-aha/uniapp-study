<template>
	<view>
		<view>
			<text>hello-uni</text>
		</view>
		<view>
			<text selectable space="emsp">啦   啦啦</text>
		</view>
		<text selectable space="emsp" style="font-size: 50px;">啦   啦啦</text>
		<view>
			<text>&amp;</text>
		</view>
		<view class="box2" hover-class="box2-active">
			<view class="box" hover-stay-time="2000" hover-start-time="2000" hover-stop-propagation="" hover-class="box-action">我是一个大盒子</view>
		</view>
		<button>按钮</button>
		<button size="mini">按钮</button>
		<button type="primary" plain>按钮</button>
		<button type="primary" disabled>按钮</button>
		<button loading>loading</button>
		<image src="http://destiny001.gitee.io/image/cxk.gif"></image>
		<image mode="aspectFit" src="http://destiny001.gitee.io/image/cxk.gif"></image>
		<image mode="aspectFill" src="http://destiny001.gitee.io/image/cxk.gif"></image>
	</view>
</template>

<script>
</script>

<style>
	.box{
		width: 100px;
		height: 100px;
		background-color: green;
	}
	.box2{
		width: 200px;
		height: 200px;
		background-color: yellow;
	}
	.box2-active{
		width: 200px;
		height: 200px;
		background-color: #4CD964;
	}
	.box-action{
		width: 100px;
		height: 100px;
		background-color: red;
	}
</style>
