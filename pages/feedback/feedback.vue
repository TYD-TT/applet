<template>
	<view>
		<view class="feedback-title">意见反馈</view>
		<view class="feedback-content"><textarea class="feedback-textarea" value="" placeholder="请输入您要反馈的问题" /></view>
		<view class="feedback-title">反馈图片</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item, index) in imageLists" :key="index">
				<view class="close-icon" @click="del(index)"><uni-icons type="closeempty" size="18" color="#FFF"></uni-icons></view>
				<view class="image-box"><image :src="item.url" mode="aspectFill"></image></view>
			</view>
			<view class="feedback-image-item" @click="addImage" v-if="imageLists.length < 6">
				<view class="image-box"><uni-icons type="plusempty" size="50" color="#EEE"></uni-icons></view>
			</view>
		</view>
		<button class="feedback-button" type="primary" @click="submit">提交</button>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
export default {
	components: { uniIcons },
	data() {
		return {
			imageLists: []
		};
	},
	methods: {
		addImage() {
			const count = 6 - this.imageLists.length;
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
					console.log(res);
					console.log(this.imageLists);
				}
			});
		},
		async submit() {
			for (let i = 0; i < this.imageLists.length; i++) {
				await this.uploadFiles(this.imageLists[i].url);
			}
		},
		async uploadFiles(file) {
			const result = await uni.uploadFile({
				url: 'http://127.0.0.1:3000/upload',
				filePath: file,
				name:'file',
				success: uploadFileRes => {
					console.log(uploadFileRes.data);
				}
			});
			return result;
		},
		del(index) {
			this.imageLists.splice(index, 1);
		}
	}
};
</script>

<style lang="scss">
.feedback-title {
	margin: 15px;
	margin-bottom: 0;
	font-size: 14px;
	color: #666;
}
.feedback-content {
	margin: 15px;
	padding: 10px;
	box-sizing: border-box;
	border: 1px #eee solid;
	.feedback-textarea {
		font-size: 12px;
		width: 100%;
		height: 100px;
	}
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
			width: 22px;
			height: 22px;
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
.feedback-button {
	margin: 0 15px;
	background-color: #0078d7;
}
</style>
