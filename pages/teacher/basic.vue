<template>
	<view class="addstudent">

		<view class="evan-form-show">
			<view class="title_1">
				个人信息
			</view>
			<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="teacherForm" :model="teacherForm" show-message>
				<view class="title_2">
					基础信息
				</view>
				<evan-form-item label="姓名：" prop="name">
					<input class="form-input" disabled  placeholder-class="form-input-placeholder" v-model="teacherForm.name" placeholder="请输入姓名" />
				</evan-form-item>
				<evan-form-item label="工号：" prop="account" style="border: none;">
					<input class="form-input" disabled  type="number" placeholder-class="form-input-placeholder" v-model="teacherForm.account" placeholder="请输入工号" />
				</evan-form-item>
				</evan-form-item>
				<evan-form-item label="手机：" prop="phone">
					<input class="form-input" type="number" placeholder-class="form-input-placeholder" v-model="teacherForm.phone" placeholder="请输入手机号" />
				</evan-form-item>
				<!-- <evan-form-item label="证件类型：" prop="ID_type">
					<input class="form-input" disabled placeholder-class="form-input-placeholder" v-model="teacherForm.ID_type" placeholder="请输入证件类型" />
				</evan-form-item>
				<evan-form-item label="身份证号：" prop="ID_number">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="teacherForm.ID_number" placeholder="请输入身份证号" /> -->
				</evan-form-item>
				<evan-form-item label="所在院系：" prop="department_major">
					<view class="item-content" @click="handleTap()" style="text-align: right;width: 100%;font-size: 28rpx;">
						<view class="item-value">
							<input v-if="!label1" class="form-input select-form-input" placeholder-class="form-input-placeholder" placeholder="选择所在院系">
							{{ label1 }}</input>
						</view>
					</view>
					<lb-picker
						ref="picker"
						v-model="value1"
						mode="multiSelector"
						:list="list1"
						:level="1"
						:dataset="{ name: 'label1' }"
						@change="handleChange"
						@confirm="handleConfirm"
						@cancel="handleCancel"
					></lb-picker>
				</evan-form-item>
			</evan-form>
			
			<button @click="back" class="evan-form-show__button">返回</button>
			<button @click="edit" class="evan-form-show__button edit_button">提交</button>
		</view>
	</view>
</template>

<script>
import utils from '@/components/evan-form/utils.js';
import LbPicker from '@/components/lb-picker';

export default {
	components: {
		LbPicker
	},
	data() {
		// 自定义手机号校验
		var checkphone = (rule, value, callback) => {
			// let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
			if (value == '') {
				callback(new Error('请输入手机号'));
			} else if (!this.isCellPhone(value)) {
				//引入methods中封装的检查手机格式的方法
				callback(new Error('请输入正确的手机号!'));
			} else {
				callback();
			}
		};
		return {
			hideRequiredAsterisk: false,
			// 表单的内容必须初始化
			teacherForm: {
				account: '',
				name: '',
				phone: '',
				department:'',
				ID_type: '身份证',
				ID_number: ''
			},
			// 校验规则
			rules: {
				account: [
					{
						required: true,
						message: '请输入学号'
					},
					{
						min: 8,
						max: 8,
						message: '工号长度8位'
					}
				],
				name: {
					required: true,
					message: '请输入姓名'
				},
				sex: {
					required: true,
					message: '请输入性别'
				},				
				age: {
					required: true,
					message: '请输入年龄'
				},
				// ID_number: [
				// 	{
				// 		required: true,
				// 		message: '请输入身份证号'
				// 	},
				// 	{
				// 		max: 18,
				// 		min: 18,
				// 		message: '身份证号长度为18位'
				// 	}
				// ],
				// ID_type: {
				// 	required: true,
				// 	message: '请输入证件类型'
				// },
				class: {
					required: true,
					message: '请输入级别'
				},
				department_major: {
					required: true,
					message: '请选择院系专业'
				},
				phone: [
					{
						required: true,
						message: '请输入手机号'
					},
					{
						
						min: 11,
						max: 11,
						message: '手机号格式不正确'
					}
				]
			},
			value1: [],
			label1: '',
			list1: [
				{
					label: '机械工程学院',
					value: '1',
				},
				{
					label: '电子信息与电气工程学院',
					value: '2',
				},
				{
					label: '计算机科学与信息工程学院',
					value: '3',
				},
				{
					label: '土木与建筑工程学院',
					value: '4',
				},
				{
					label: '化学与环境工程学院',
					value: '5',
				},
				{
					label: '生物与食品工程学院',
					value: '6',
				},
				{
					label: '数理学院',
					value: '7',
				},
				{
					label: '飞行学院',
					value: '8',
				},
				{
					label: '经济管理学院',
					value: '9',
				},
				{
					label: '文法学院',
					value: '10',
				},
				{
					label: '外国语学院',
					value: '11',
				},
				{
					label: '艺术设计学院',
					value: '12',
				},
				{
					label: '国际教育学院',
					value: '13',
				}
			]
		
		};
	},
	mounted() {
		// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
		this.$refs.teacherForm.setRules(this.rules);
		
	},
	created() {
		this.obtain()
	},
	methods: {
		//检查手机号
		isCellPhone(val) {
			if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
				return false;
			} else {
				return true;
			} 
		},
		
		// 保存数据 
		edit() {
			this.$refs.teacherForm.validate(async res => {
				if (res) {
					const res = await this.$http({
						url:'/update_message/1',
						method:'PUT',
						data:this.teacherForm
					})
					if(res.data.status == 201){
    						uni.showModal({
    						    title: '提示',
    						    content: row.message,
    						    success: (res) => {
    						        if (res.confirm) {
    						            uni.reLaunch({
    						            	url:'./index'
    						            })
    						        } else if (res.cancel) {
    						            uni.navigateTo({
    						            	url:'./basic'
    						            })
    						        }
    						    }
    						});
					}
				}
			});
		},
		// 从localStorage获取学号并查询学生信息
		obtain(){
			uni.getStorage({
				key: 'teacher_account',
				success: async res => {
					this.Storage_data = res.data;
					const {data:row} = await this.$http({
						url: `/select_message?account=${res.data}&user=teacher`,
						method: 'GET'
					});
					this.teacherForm = JSON.parse(row.data)[0];
					this.teacherForm.ID_type = '身份证'
					this.label1 = this.teacherForm.department
				}
			});
		},
		back(){
			uni.navigateBack({
			    delta: 1
			});
		},
		// 显示院系选择栏
		handleTap() {
			this.$refs.picker.show();
		},
		// 选择专业进行改变时
		handleChange(e) {},
		handleConfirm(e) {
			if (e) {
				const name = e.dataset.name;
				const label = e.item.map(m => m.label).join('-');
				this.teacherForm.department_major = label;
				if (name && label) {
					this[name] = label;
				}
			}
		},
		// 取消时
		handleCancel(e) {}
	}
};
</script>

<style lang="scss" scoped>
	.title_1{
		font-size: 50rpx;
		color: black;
		font-weight: 700;
		margin-bottom: 15rpx;
	}
	
	.title_2{
		font-size: 40rpx;
		color: black;
		font-weight: 600;
		margin-bottom: 15rpx;
	}
	
.evan-form-show {
	padding: 0 30rpx 2vw 30rpx;
	width: 87vw;
	margin: auto;
	margin-top: 2vw;

	.select-form-input {
		width: 65vw !important;
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
	
	.edit_button{
		background-color: #d01b27;
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

	.customize-form-item {
		&__label {
			font-size: 28rpx;
			color: #333;
			margin-bottom: 16rpx;
		}

		&__radio {
			display: flex;
			align-items: center;
			margin-bottom: 16rpx;

			&__text {
				font-size: 28rpx;
				color: #333;
			}
		}
	}
}
</style>
