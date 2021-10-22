<template>
	<view class="login">
		<musichead :title="isLogin ? '登录' : '注册'"  :icon="true" color="black"></musichead>
		<view class="background"></view>
		<view class="login_input">
			<view class="login_account">
				<text>账号： </text>
				<input type="text" @input="handleAccount" v-model="account" placeholder="请输入账号"/>
				<i v-show="accountClose" @click="clearAccount" class="iconfont icon-guanbi1"></i>
			</view>
			<view class="login_password">
				<text>密码： </text>
				<input type="password" @input="handlePassword" v-model="password" placeholder="请输入密码"/>
				<i v-show="passwordClose" @click="clearPassword" class="iconfont icon-guanbi1"></i>
				<text v-show="isLogin" class="forgetPassword" @click="forgetPassword">忘记密码?</text>
			</view>
		</view>
		<view class="login_register" v-if="isLogin">
			<button plain="true" @click="()=>{ isLogin = !isLogin }">注册</button>
			<button :disabled="disabled" @click="login" :style="{'opacity': disabled ? '0.2' : '1'}">登录</button>
		</view>
		<view class="login_register" v-else>
			<button plain="true" @click="()=>{ isLogin = !isLogin }">前往登录</button>
			<button :disabled="disabled" @click="register" :style="{'opacity': disabled ? '0.2' : '1'}">确定注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				password: '',
				accountClose: false,
				passwordClose: false,
				disabled: true,
				isLogin: true,
			}
		},
		methods: {
			handleAccount(ev){
				let value = ev.detail.value;
				if(value){
					this.accountClose = true;
				}
				if(this.account && this.password){
					this.disabled = false;
				} else{
					this.disabled = true;
				}
			},
			handlePassword(ev){
				let value = ev.detail.value;
				if(value){
					this.passwordClose = true;
				}
				if(this.account && this.password){
					this.disabled = false;
				} else{
					this.disabled = true;
				}
			},
			clearAccount(){
				this.account = '';
				this.accountClose = false;
				this.disabled = true;
				
			},
			clearPassword(){
				this.password = '';
				this.passwordClose = false;
				this.disabled = true;
			},
			forgetPassword(){
				uni.showToast({
					title:'请联系管理员',
					icon: 'none'
				})
			},
			login(){
				const { login } = this.$api;
				login(this.account,this.$w_md5.hex_md5_32(this.password)).then(res=>{
					if(res.success){
						uni.setStorageSync('userToken',res.token);
						uni.switchTab({
							url: '../index/index'
						})
						setTimeout(()=>{
							uni.showToast({
								title: res.message
							});
						},100)
					}
				})
			},
			register(){
				const { register } = this.$api;
				register(this.account,this.$w_md5.hex_md5_32(this.password)).then(res=>{
					if(res.success){
						uni.showToast({
							title: res.message
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		.background{
			background: url(../../static/bgc.jpg) no-repeat;
			background-size: cover;
			height: 100vh;
			filter: blur(5px);
			width: 100%;
			position: fixed;
			top: 0;
			z-index: -1;
		}
		height: 100vh;
		.login_input {
			padding: 10rpx 40rpx;
			background-color: #fff;
			.login_account,.login_password {
				display: flex;
				align-items: center;
				text {
					display: inline-block;
					line-height: 90rpx;
					margin-right: 30rpx;
				}

				input {
					flex: 1;
					height: 90rpx;
					display: block;
					vertical-align: bottom;
				}
				i{
					font-size: 34rpx;
					margin-right: 20rpx;
				}
			}
			.login_account{
				input{
					flex: 1;
				}
			}
			.login_password{
				border-top: solid 2rpx #eeeeee;
				.forgetPassword{
					color: #f3627d;
					font-size: 28rpx;
					float: right;
					margin: 0;
				}
			}

		}
		.login_register{
			display: flex;
			button{
				flex: 1;
				margin: 40rpx 20rpx 0;
			}
			button:nth-child(1){
				color: #f3627d;
				border: solid 2rpx #f3627d;;
			}
			button:nth-child(2){
				background-color: #f3627d;
				color: white;
				border: solid 2rpx #f3627d;
			}
		}
	}
</style>
