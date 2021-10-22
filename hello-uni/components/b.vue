<template>
	<view>
		这是b组件的数据:{{num}}
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num:0
			}
		},
		created() {
			uni.$on('updataNum',(num)=>{
				this.num += num;
			})
			console.log(this);
			console.log(uni);
		}
	}
</script>

<style>
</style>
