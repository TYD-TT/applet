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
		<!-- 文章列表 -->
		<view class="container999"  @touchmove="refreshMove" >
			<view class="title">文章列表</view>
			<view class="nav">
				<!-- 导航栏 agents导航栏标题 -->
				<navTab ref="navTab" :tabTitle="tabTitle" @changeTab="changeTab"></navTab>
			</view>
			<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
			<swiper style="min-height: 100vh;" :current="currentTab" @change="swiperTab">
				<swiper-item v-for="(listItem, listIndex) in list" :key="listIndex">
					<scroll-view style="height: 100%;" scroll-y="true"  scroll-with-animation :scroll-into-view="toView">
						<view class="content">
							<view class="card" v-for="(item, index) in listItem" v-if="listItem.length > 0" :key="index">
							<view class="" style="height: 100%; width: 35vw;">
								<image src="../../static/img/yysbd.jpg" mode="aspectFill"></image>
							</view>
							<view style="height: 100%; width: 55vw; background-color: #FFF;">
								<view style="margin-left: 20px;font-size: 18px;" @click="jump_list(items.id)">{{ item }}</view>
							</view>
							</view>
						<view class="more">
							<view style="display: block;float: right;">{{listIndex}}more&gt;&gt;</view>				
						</view>
						</view>
						<view class="noCard" v-if="listItem.length === 0">暂无信息</view>
					</scroll-view>

				</swiper-item>
			</swiper>
		</view>
		<view class="teacher_index_bottom"><bottom-menu></bottom-menu></view>
	</view>
</template>

<script>
const util = require('../../util/util.js');
import refresh from '@/components/content-list/refresh.vue';
import navTab from '@/components/content-list/navTab.vue';
import tabBar from '@/components/content-list/tabBar.vue';
export default {
	components: { refresh, navTab, tabBar },
	data() {
		return {
			currentPage: 'index',
			toView: '', //回到顶部id
			tabTitle: ['通知公告', '常见问题'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			pages: [1, 1, 1, 1], //第几个swiper的第几页
			list: [[1, 2, 3], ['a', 'b', 'c']], //数据格式
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
					id: 6,
					title: '安装评价',
					img: '../../static/img/pingjia.png',
					url: './appraise'
				},
				{
					id: 7,
					title: '网站群技术咨询',
					img: '../../static/img/zx.png',
					url: './advisory'
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
					const { data: row } = await this.$http({
						url: `/select_message?account=${res.data}&user=teacher`,
						method: 'GET'
					});
					this.teacherMessage = JSON.parse(row.data)[0];
					this.judge();
				}
			});
		},
		judge() {
			const teacherMessage = this.teacherMessage;
			if (teacherMessage.ID_number == null && teacherMessage.phone == null) {
				uni.showModal({
					title: '提示',
					content: '请先完善基本信息',
					success: res => {
						if (res.confirm) {
							uni.redirectTo({
								url: './basic'
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
		},
		toTop() {
			this.toView = '';
			setTimeout(() => {
				this.toView = 'top' + this.currentTab;
			}, 10);
		},
		changeTab(index) {
			this.currentTab = index;
		},
		// swiper 滑动
		swiperTab: function(e) {
			var index = e.detail.current; //获取索引
			this.$refs.navTab.longClick(index);
		},
		// 刷新touch监听
		refreshMove(e) {
			this.$refs.refresh.refreshMove(e);
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
			height: 115vw;
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
		height: 100rpx;
		margin: 0 auto;
		text-align: center;
		position: fixed;
		background-color: rgba(120, 214, 239, 0.5);
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
.container999 {
	.title {
		color: #000000;
		font-size: 48rpx;
		font-weight: 600;
		width: 90vw;
		margin: 40rpx auto ;
	}
	width: 100vw;
	font-size: 28upx;
	height: 75vh;
	overflow: hidden;
	color: #6b8082;
	position: relative;
	background-color: #f5f5f5;
}

.card {
	width: 90%;
	display: flex;
	height: 150rpx;
	line-height: 150rpx;
	background-color: white;
	margin: 10rpx auto 2upx auto;
	background: #ffffff;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
	position: relative;
	image {
		width: 35vw;
		height: 100%;
	}
}

.noCard {
	width: 90%;
	height: 200upx;
	margin: auto;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #999999;
	box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.1);
	border-radius: 10upx;
}

.nav {
	left: 0;
	color: white;
	width: 90vw;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	background-color: #50b7ea;
	z-index: 996;
}

.searchInput999 {
	width: 90%;
	margin: 0 auto;
	background: white;
	border-radius: 30upx;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 56upx;
}

.search999 {
	width: 32upx;
	height: 32upx;
}

.searchBox999 {
	width: 56upx;
	height: 56upx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.input999 {
	color: #999;
	width: 80%;
}
.more{
	width: 90vw;
	margin: 10rpx auto;
	height: 30px;
	color: #000000;
	line-height: 30px;
	background-color: #fff;
}
</style>
