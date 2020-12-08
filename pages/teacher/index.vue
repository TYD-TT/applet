<template>
	<view class="teacher_index">
		<view class="">
			<view class="top"><image src="../../static/img/2020_bg_logo.jpg" class="top-img"></image></view>
			<view class="welcome">
				<span class="welcome-title">欢迎：{{ teacherMessage.name }} 老师 ~</span>
			</view>
		</view>
		<view class="content">
			<view class="title">服务项目</view>
			<view class="adv"><image src="../../static/img/adv-logo.png" class="avd-img"></image></view>
			<view class="list">
				<view style="display: flex;flex-wrap: wrap; height: 110vw;">
					<view v-for="(item, index) in lists" :key="index" style="width: 33.33%; height: 30vw;  border: 1px soid black;" @click="jump(item.url)">
						<view class="list_logo"><image :src="item.img" class="list_img"></image></view>
						<view class="list_title">{{ item.title }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="teacher_index_bottom">
			<view class="bottom_sy" v-for="item in btm_lists" :key="item.id" @click="btm_nav(item.url)">{{item.title}}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 学生基本信息
			teacherMessage: {
				acount: '',
				name: '',
				sex: '',
				age: '',
				department: '',
				major: '',
				phone: '',
				ID_number: ''
			},
			btm_lists:[
				{
					id:1,
					title:'首页',
					url:'./index'
				},
				{
					id:2,
					title:'基本信息',
					url:'./basic'
				},
				{
					id:3,
					title:'申请进度',
					url:'./steps'
				},
				{
					id:4,
					title:'意见反馈',
					url:'../feedback/feedback'
				}
			],
			// localStorage存储的数据
			Storage_data: '',
			lists: [
				{
					id: 0,
					title: '各系统密码更改',
					img: '../../static/img/mmxg.png',
					url: './password'
				},
				{
					id: 1,
					title: '软件正版化安装预约',
					img: '../../static/img/rjzbh.png',
					url: './software'
				},
				{
					id: 2,
					title: '虚拟服务器开通',
					img: '../../static/img/xnfwqkt.png',
					url: './virtual'
				},
				{
					id: 3,
					title: '托管服务器开通',
					img: '../../static/img/tgfwq.png',
					url: './hosting'
				},
				{
					id: 4,
					title: '教学区网络端口开通',
					img: '../../static/img/dkkt.png',
					url: './port'
				},
				{
					id: 5,
					title: '网络故障上报',
					img: '../../static/img/gzsb.png',
					url: './fault'
				},
				{
					id: 5,
					title: '安装评价',
					img: '../../static/img/pingjia.png',
					url: './appraise'
				}
			]
		};
	},
	created() {
		this.select_teacher();
	},
	methods: {
		// 查询教师信息
		select_teacher() {
			uni.getStorage({
				key: 'teacher_account',
				success: async res => {
					const {data : row} = await this.$http({
						url: `/select_message?account=${res.data}&user=teacher`,
						method: 'GET'
					});
					this.teacherMessage = JSON.parse(row.data)[0];
					this.judge()
				}
			});
		},
		judge() {
			const teacherMessage = this.teacherMessage;
			if(teacherMessage.ID_number == null && teacherMessage.phone == null ){
				uni.showModal({
				    title: '提示',
				    content: '请先完善基本信息',
				    success: (res) => {
				        if (res.confirm) {
				            uni.redirectTo({
				            	url:'./basic'
				            })
				        } else if (res.cancel) {
				            uni.redirectTo({
				            	url:'../index/index'
				            })
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
		},
	}
};
</script>

<style lang="less" scoped>
.teacher_index {
	height: 205vw;
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
		height: 200px;
		.title {
			font-size: 48rpx;
			font-weight: 600;
			width: 90vw;
			margin: 100rpx auto 0 auto;
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
			height: 120vw;
			margin: 30rpx auto;
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
				height: 30%;
			}
		}
	}
	.teacher_index_bottom {
		display: flex;
		flex-wrap: wrap;
		bottom: 0;
		width: 99vw;
		border: 1px solid black;
		border-bottom: none;
		height: 100rpx;
		border-radius: 3px;
		margin: 0 auto;
		text-align: center;
		position: fixed;
		background-color: rgba(120,214,239,0.5);
		.bottom_sy,
		.bottom_xx,
		.bottom_jd,
		.bottom_wd {
			border: 1px solid #eee;
			border-radius: 3px;
			border-bottom: none;
			width: 24.3%;
			height: 100rpx;
			line-height: 100rpx;
		}
	}
}
</style>
