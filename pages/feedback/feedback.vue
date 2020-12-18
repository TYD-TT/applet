<template>
	<view class="feedback">
		<view class="feedback_title">意见反馈</view>
		<view class="tishi">各教职员工/同学如有其他问题，请拨打现教中心信息技术科电话：2909864。</view>
		<view class="feedback_form">
			<view class="evan-form-show">
				<view class="feedback-title">反馈意见</view>
				<view class="feedback-image-box">
					<textarea  placeholder="反馈意见" v-model="fb_msg.msg"  style="width: 100%; border: 1px solid #e1e0e3;" />
					</view>
			</view>
			<view class="feedback-title">反馈图片</view>
			<view class="feedback-image-box">
				<view class="feedback-image-item" v-for="(item, index) in imageLists" :key="index">
					<view class="close-icon" @click="del(index)">
						<uni-icons type="closeempty" size="18" color="#FFF"></uni-icons>
					</view>
					<view class="image-box">
						<image :src="item.url" mode="aspectFill"></image>
					</view>
				</view>
				<view class="feedback-image-item" @click="addImage" v-if="imageLists.length < 4">
					<view class="image-box">
						<uni-icons type="plusempty" size="50" color="#EEE"></uni-icons>
					</view>
				</view>
			</view>
			<view class="button">
				<button @click="back" class="evan-form-show__button">返回</button>
				<button @click="submit1" class="evan-form-show__button edit_button" @tap="openLoading">提交</button>
			</view>
		</view>
		<mi-loading ref="Loading" title="上传中" hasMask="true"></mi-loading>
	</view>
</template>

<script>
import utils from '@/components/evan-form/utils.js';
import LbPicker from '@/components/lb-picker';
import uniIcons from '@/components/uni-icons/uni-icons.vue';

export default {
	components: {
		LbPicker,
		uniIcons
	},
	data() {
		return {
			hideRequiredAsterisk: false,
			fb_msg: {msg:''},
			imgURL: [],
			imageLists: [],
			active: 0
		};
	},
	methods: {
		// 上传中
		openLoading() {
			this.$refs.Loading.show();
			setTimeout(() => {
				this.$refs.Loading.hide();
			}, 3000);
		},
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 添加图片
		addImage() {
			const count = 3 - this.imageLists.length;
			uni.chooseImage({
				count: count,
				success: res => {
					const tempfilepaths = res.tempFilePaths;
					tempfilepaths.forEach((item, index) => {
						if (index < count) {
							this.imageLists.push({
								url: item
							});
						}
					});
				}
			});
		},
		// 提交
		async submit() {
			for (let i = 0; i < this.imageLists.length; i++) {
				await this.uploadFiles(this.imageLists[i].url);
			}
		},
		async uploadFiles(file) {
			const result = await uni.uploadFile({
				url: 'https://tianyudong.picp.vip/upload',
				filePath: file,
				name: 'file',
				success: uploadFileRes => {
					this.imgURL.push(uploadFileRes.data);
				}
			});
			return result;
		},
		del(index) {
			this.imageLists.splice(index, 1);
		},
		async save() {
				this.fb_msg.creat_time = this.$getFormatDate.getFormatDate();
				this.fb_msg.people_type = 'teacher'
				this.fb_msg.service_type = 'feedback'
					this.active = 1;
					const { data: row } = await this.$http({
						url: '/feedback',
						method: 'POST',
						data: this.fb_msg
					});
					if (row.status == 201) {
						uni.showModal({
							title: '提示',
							content: row.message,
							success: res => {
								if (res.confirm ) {
									uni.navigateBack({
									    delta: 1
									});
								} else if (res.cancel) {
									uni.navigateTo({
										url: './feedback'
									});
								}
							}
						});
					}
		},
		// 上传图片
		async submit1() {
			if (this.imageLists.length == '0') {
				this.fb_msg.imgURL = this.imgURL;
				this.save();
			} else {
				new Promise((resolve, reject) => {
					this.submit();
					resolve();
				}).then(() => {
					this.fb_msg.imgURL = this.imgURL;
					setTimeout(() => {
						this.save(); //代码正常执行！
					}, 3000);
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.feedback-title {
	margin: 15rpx;
	margin-bottom: 0;
	font-size: 14px;
	color: #666;
}
.feedback {
	width: 95vw;
	margin: 20rpx auto;
	.feedback_title {
		font-size: 48rpx;
		font-weight: 600;
		height: 10vw;
		line-height: 10vw;
	}
	.feedback_logo {
		height: 60rpx;
		line-height: 60rpx;
		display: flex;
		margin-top: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx #cccccc dashed;
		.img {
			width: 60rpx;
			height: 60rpx;
		}
		.feedback_logo_title {
			margin-left: 10rpx;
			color: #bababa;
		}
	}
	.tishi {
		margin-top: 20rpx;
		color: #bababa;
		font-size: 28rpx;
		padding-bottom: 20rpx;
	}
}
.feedback_form {
	margin-top: 20rpx;
	.steps {
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}
	.feedback-image-box {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		.feedback-image-item {
			position: relative; //相对定位
			width: 33.33%;
			height: 0;
			padding-top: 33.33%;
			box-sizing: border-box;
			.close-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute; //绝对定位
				top: 0;
				right: 0;
				width: 20px;
				height: 20px;
				border-radius: 50%;
				background-color: #ff5a5f;
				z-index: 2;
			}
			.image-box {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute; //绝对定位
				top: 5px;
				left: 5px;
				bottom: 5px;
				right: 5px;
				border: 1px solid #eee;
				border-radius: 5px;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.button {
		margin-top: 30rpx;
		.edit_button {
			background-color: #d01b27 !important;
		}
	}

	.evan-form-show {
		width: 95vw;
		margin: auto;
		margin-top: 2vw;
		.radio {
			font-size: 28rpx;
			width: 100%;
			text-align: right;
			radio {
				margin-left: 10rpx;
			}
		}
		.item-content {
			width: 100%;
			text-align: right;
			font-size: 28rpx;
		}
		.form-input {
			font-size: 28rpx;
			color: #333;
			text-align: right;
			width: 100%;
			box-sizing: border-box;
			height: 60rpx;
			&.textarea {
				height: 240rpx;
				padding: 24rpx 0;
				text-align: left;
			}
		}

		.form-input-placeholder {
			font-size: 28rpx;
			color: #999;
		}

		&__button {
			width: 100%;
			height: 88rpx;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			font-size: 36rpx;
			color: #fff;
			margin-top: 20rpx;
			background-color: #2d87d5;

			&::before,
			&::after {
				border: none;
			}
		}
	}
}
</style>
