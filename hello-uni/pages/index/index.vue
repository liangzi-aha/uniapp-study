<template>
	<view class="content">
		index组件
		<Test v-if="flag" @myEven="getNum" :title="title">
			默认插槽
		</Test>
		<button type="primary" @click="checkTest">切换test组件</button>
		这是子组件传递过来的值{{num}}
		<Testa></Testa>
		<Testb></Testb>
		<!-- 插件市场安装 uni-calendar，会把该插件的方法放到全局上，不需用引入 -->
		<view>
			<uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
			<button @click="open">打开日历</button>
		</view>
	</view>
</template>

<script>
	import Test from '../../components/test.vue';
	import Testa from '../../components/a.vue';
	import Testb from '../../components/b.vue';
	export default {
		components: {
			Test,
			Testa,
			Testb
		},
		data() {
			return {
				title: 'Hello',
				flag: true,
				num: null
			}
		},
		onLoad(option) {
			console.log(this);
			console.log('页面加载了', option)
		},
		onShow() {
			console.log('页面显示了');
		},
		onReady() {
			console.log('页面初次渲染完成了')
		},
		onHide() {
			console.log('页面隐藏了');
		},
		methods: {
			checkTest() {
				this.flag = !this.flag;
			},
			getNum(num) {
				this.num = num;
				console.log(num);
			},
			open() {
				this.$refs.calendar.open();
			},
			confirm(e) {
				console.log(e);
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
