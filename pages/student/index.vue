<template>
	<view class="student_index" style="background-color: #fafafa;">
		<view class="">
			<view class="top"><image src="../../static/img/2020_bg_logo.jpg" class="top-img"></image></view>
			<view class="welcome">
				<span class="welcome-title">欢迎：{{ studentMessage.name }} 同学 ~</span>
			</view>
		</view>
		<view class="content">
			<view class="title">服务项目</view>
			<view class="adv"><image src="../../static/img/adv-logo.png" class="avd-img"></image></view>
			<view class="list">
				<view style="display: flex;flex-wrap: wrap; height: 42vw;">
					<view v-for="(item, index) in lists" :key="index" style="width: 33.33%; height: 30vw; border: 1px soid black;" @click="jump(item.url)">
						<view class="list_logo"><image :src="item.img" class="list_img"></image></view>
						<view class="list_title">{{ item.title }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="title" style="margin-top: 20px;">服务列表</view>
			<view class="" style="width: 90vw; margin: 20px  auto;background-color: #fafafa;">
				<view class="fw_list" >
					<view class="" style="height: 100%; width: 35vw;"><image src="../../static/img/yysbd.jpg" style="width: 100%;height: 100%;"></image></view>
					<view class="" style="height: 100%; width: 55vw; background-color: #FFF;">运营商绑定</view>
				</view>
				<view class="fw_list" >
					<view class="" style="height: 100%; width: 35vw;"><image src="../../static/img/gzpc.jpg" style="width: 100%;height: 100%;"></image></view>
					<view class="" style="height: 100%; width: 55vw; background-color: #FFF;">网络故障排查</view>
				</view>
				<view class="fw_list" >
					<view class="" style="height: 100%; width: 35vw;"><image src="../../static/img/rjzbh.jpg" style="width: 100%;height: 100%;"></image></view>
					<view class="" style="height: 100%; width: 55vw; background-color: #FFF;">软件正版化</view>
				</view>
			</view>
		</view>
		<view class="teacher_index_bottom">
			<view class="bottom_sy" v-for="item in btm_lists" :key="item.id" @click="btm_nav(item.url)">{{ item.title }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 学生基本信息
			studentMessage: {
				acount: '',
				name: '',
				sex: '',
				age: '',
				department: '',
				major: '',
				phone: '',
				ID_number: ''
			},
			// localStorage存储的数据
			Storage_data: '',
			lists: [
				{
					id: 0,
					title: '基本信息',
					img: '../../static/img/jbxx.png',
					url: './basicInformation'
				},
				{
					id: 1,
					title: '修改密码',
					img: '../../static/img/mmxg.png',
					url: './changePassword'
				},
				{
					id: 2,
					title: '意见反馈',
					img: '../../static/img/yjfk.png',
					url: './student'
				}
			],
			btm_lists: [
				{
					id: 1,
					title: '首页',
					url: './index'
				},
				{
					id: 2,
					title: '基本信息',
					url: './basicInformation'
				},
				{
					id: 3,
					title: '申请进度',
					url: './student'
				},
				{
					id: 4,
					title: '意见反馈',
					url: './student'
				}
			]
		};
	},
	created() {
		this.selectStudent();
	},
	methods: {
		// 查询学生信息
		selectStudent() {
			uni.getStorage({
				key: 'student_account',
				success: async res => {
					const { data: row } = await this.$http({
						url: `/select_message?account=${res.data}&user=student`,
						method: 'GET'
					});
					this.studentMessage = JSON.parse(row.data)[0];
					this.judge();
				}
			});
		},
		judge() {
			const studentMessage = this.studentMessage;
			if (studentMessage.sex == null && studentMessage.age == null) {
				uni.showModal({
					title: '提示',
					content: '请先完善基本信息',
					success: res => {
						if (res.confirm) {
							uni.reLaunch({
								url: './basicInformation'
							});
						} else if (res.cancel) {
							uni.redirectTo({
								url: '../index/index'
							});
						}
					}
				});
			}
		},

		// 点击跳转
		jump(value) {
			uni.navigateTo({
				url: value
			});
		},
		btm_nav(value) {
			uni.navigateTo({
				url: value
			});
		}
	}
};
</script>

<style lang="less" scoped>
.student_index {
	height: 255vw;
	width: 100vw;
	.top {
		height: 45vw;
		width: 100vw;
		background-color: skyblue;
		border-bottom: 2rpx;
		border-bottom-right-radius: 100rpx;
		border-bottom-left-radius: 100rpx;
		overflow: hidden;
		.top-img {
			width: 100%;
			height: 90%;
		}
	}
	.welcome {
		display: block;
		width: 90vw;
		height: 100rpx;
		line-height: 100rpx;
		margin: -10vw 0 0 5vw;
		position: absolute;
		border: 2rpx solid #fafafa;
		border-radius: 8rpx;
		background-color: white;
		box-shadow: 0 9px 10px #999;
		.welcome-title {
			display: block;
			margin-left: 30rpx;
			font-size: 32rpx;
		}
	}
	.content {
		.title {
			font-size: 48rpx;
			font-weight: 600;
			width: 90vw;
			margin: 80rpx auto 0 auto;
		}
		.adv {
			width: 90vw;
			height: 170rpx;
			line-height: 170rpx;
			background-color: blue;
			margin: 40rpx auto 0 auto;
			border-radius: 15rpx;
			.avd-img {
				width: 100%;
				height: 100%;
			}
		}
		.list {
			border: 2rpx solid #e6e6e6;
			width: 90vw;
			height: 42vw;
			margin: 30rpx auto 0 auto;
			.list_logo {
				margin: 30rpx auto 0 auto;
				width: 70%;
				height: 70%;
				border-radius: 50%;
				.list_img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.list_title {
				font-size: 28rpx;
				text-align: center;
				margin: 30rpx auto 0 auto;
				width: 70%;
			}
		}
	}
	.teacher_index_bottom {
		display: flex;
		flex-wrap: wrap;
		bottom: 0;
		width: 100vw;
		height: 100rpx;
		margin: 0 auto;
		text-align: center;
		position: fixed;
		background-color: rgba(250, 245, 254, 1);
		.bottom_sy,
		.bottom_xx,
		.bottom_jd,
		.bottom_wd {
			width: 24.3%;
			height: 100rpx;
			line-height: 100rpx;
		}
	}
}
.fw_list {
	width: 100%;
	height: 180rpx;
	line-height: 180rpx;
	display: flex;
	margin-bottom: 10px;
}
</style>
