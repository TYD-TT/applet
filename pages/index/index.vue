<template>
	<view class="login">
		<!-- 顶部文字以及logo -->
		<view class="login-top bg-active">
			<!-- <image src="../../static/img/ay_logo2.jpg" class="img_logo"></image> -->
			<view class="desc">
				<view class="title">Hi~</view>
				<text>安工现教中心欢迎您</text>
			</view>
		</view>

		<!-- body -->
		<view class="login-type-content">
			<image class="login-bg" src="../../static/img/login-bg.png"></image>
			<view class="main">
				<view class="nav-bar">
					<view
						class="nav-bar-item"
						v-for="(item, index) in typeList"
						:key="index"
						:class="tabCurrentIndex === index ? 'nav-bar-item-active text-active' : ''"
						@tap="tabClick(index)"
					>
						{{ item.text }}
					</view>
				</view>

				<!-- 学生登录 -->
				<block v-if="tabCurrentIndex === 0">
					<view class="login-type-form">
						<view class="input-item">
							<text class="iconfont iconzhanghuffffffpx"></text>
							<input class="login-type-input" type="number" name="account" v-model="studentLogin.account" placeholder="请输入学号" maxlength="11" />
						</view>
						<view class="input-item" v-if="loginByPass">
							<text class="iconfont iconzhanghuffffffpx"></text>
							<input class="login-type-input" type="text" v-model="studentLogin.name" placeholder="请输入姓名" maxlength="20" />
						</view>
						<view class="input-item input-item-sms-code" v-if="!loginByPass"></view>
					</view>
					<button class="confirm-btn bg-active" :disabled="btnLoading" :loading="btnLoading" @tap="toStudentLogin">登录</button>
				</block>

				<!-- 教师登录 -->
				<block v-if="tabCurrentIndex === 1">
					<view class="login-type-form">
						<view class="input-item">
							<text class="iconfont iconzhanghuffffffpx"></text>
							<input class="login-type-input" type="number" name="account" v-model="teacherLogin.account" placeholder="请输入教工号" maxlength="11" />
						</view>
						<view class="input-item">
							<text class="iconfont iconzhanghuffffffpx"></text>
							<input class="login-type-input" type="text" v-model="teacherLogin.name" placeholder="请输入姓名" maxlength="20" />
						</view>
					</view>
					<button class="confirm-btn bg-active" :disabled="btnLoading" :loading="btnLoading" @tap="toTeacherLogin">登录</button>
					<view class="register" @click="register">
						没有账号？立刻注册。
					</view>
				</block>
			</view>
		</view>
		<view class="login-type-bottom text-active">{{ appName }} 版权所有</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			studentLogin: {
				account: '',
				name: ''
			},
			teacherLogin: {
				account: '',
				name: ''
			},
			btnLoading: false,
			reqBody: {},
			loginByPass: true,
			smsCodeBtnDisabled: true,
			userInfo: null,
			appName: '安阳工学院网络中心',
			tabCurrentIndex: 0,
			typeList: [
				{
					text: '学生'
				},
				{
					text: '老师'
				}
			]
		};
	},
	onLoad(options) {
		this.tabCurrentIndex = parseInt(options.type || 0, 10);
	},
	methods: {
		// 学生登录
		async toStudentLogin() {
			const res = await this.$http({
				url: `/login?user=student`,
				method: 'POST',
				data: this.studentLogin
			});
			if (res.data.status == 201) {
				uni.showToast({ title: '登录成功' });
				uni.redirectTo({
					url: '../student/index'
				});
				uni.setStorage({ key: 'student_account', data: this.studentLogin.account });
				uni.setStorage({ key: 'student_name', data: this.studentLogin.name});
			}
		},
		// 切换学生/老师
		tabClick(index) {
			this.tabCurrentIndex = index;
		},
		// 老师登录
		async toTeacherLogin() {
			const res = await this.$http({
				url: `/login?user=teacher`,
				method: 'POST',
				data: this.teacherLogin
			});
			if (res.data.status == 201) {
				uni.showToast({ title: '登录成功' });
				uni.redirectTo({
					url: '../teacher/index'
				});
				uni.setStorage({ key: 'teacher_account', data: this.teacherLogin.account });
				uni.setStorage({ key: 'teacher_name', data: this.teacherLogin.name});
			}
		},
		register(){
			uni.redirectTo({
				url:'../teacher/register'
			})
		}
	}
};
</script>

<style lang="scss">
@import url('../../static/css/font.css');
page {
	background: #fff;
}
.login {
	width: 100%;
	position: relative;
	.img_logo {
		display: block;
		margin: auto;
		width: 300px !important;
		height: 300px !important;
	}
	.bg-active {
		background-color: #1a7fd8;
		color: #fff;
	}
	.text-active,
	.iconfont {
		color: #0b79e6;
	}
	.back-btn {
		position: absolute;
		left: 40rpx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40rpx;
		font-size: 48rpx;
		color: #fff;
	}
	.login-top {
		height: 460rpx;
		position: relative;
		.desc {
			color: #fff;
			position: absolute;
			top: 200rpx;
			left: 40rpx;
			font-size: 48rpx;
			.title {
				font-size: 48rpx;
			}
		}
		.login-pic {
			position: absolute;
			width: 220rpx;
			height: 270rpx;
			right: 30rpx;
			top: 100rpx;
		}
	}
	.login-type-content {
		position: relative;
		top: -72rpx;
		.login-bg {
			width: 94vw;
			height: 94vw;
			margin: 0 3vw;
		}
		.main {
			width: 94vw;
			position: absolute;
			top: 0;
			left: 3vw;
			.nav-bar {
				display: flex;
				height: 100rpx;
				justify-content: center;
				align-items: center;
				position: relative;
				z-index: 10;
				.nav-bar-item {
					flex: 1;
					display: flex;
					height: 100%;
					line-height: 96rpx;
					font-size: 32rpx;
					display: flex;
					margin: 0 120rpx;
					justify-content: center;
				}
				.nav-bar-item-active {
					border-bottom: 5rpx solid;
				}
			}
			.login-type-form {
				width: 80%;
				margin: 50rpx auto;
				.input-item {
					position: relative;
					height: 90rpx;
					line-height: 90rpx;
					margin-bottom: 30rpx;
					.iconfont {
						font-size: 50rpx;
						position: absolute;
						left: 0;
					}
					.login-type-input {
						height: 90rpx;
						padding-left: 80rpx;
						border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					}
					.sms-code-btn,
					sms-code-resend {
						width: 240rpx;
						font-size: 26rpx;
					}
				}
			}
			.login-type-tips {
				padding: 0 50rpx;
				display: flex;
				justify-content: space-between;
				font-size: 28upx;
				color: #666;
			}
			.confirm-btn {
				margin-top: 60upx;
				width: 80%;
				height: 80rpx;
				line-height: 80rpx;
			}
		}
	}
	.login-type-bottom {
		width: 100%;
		padding-bottom: 30rpx;
		text-align: center;
		font-size: 32rpx;
	}
	// 发送验证码样式
	.input-item-sms-code {
		.input-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.sms-code-btn {
			width: 200upx;
			background-color: #fff;
			display: flex;
			padding: 15upx 0;
			justify-content: center;
			align-items: center;
			border-radius: 12upx;
		}

		.sms-code-resend {
			color: #666;
		}
	}
}

.register{
	font-size:28rpx ;
	text-align: right;
	margin: 30rpx 0;
}
</style>
