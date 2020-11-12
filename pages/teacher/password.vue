<template>
	<view class="changePassword">
		<view class="changePassword_title">各系统密码修改服务</view>
		<!-- <view class="changePassword_logo">
			<view><image src="../../static/img/ay_logo.jpg" mode="aspectFill" class="img"></image></view>
			<view class="changePassword_logo_title">安阳工学院</view>
		</view> -->
		<view class="tishi">请选择需要修改密码的相关系统账号。(工作时间同步处理，其他时间，略有延迟)。<br>修改后默认密码为：Ay111111</br></view>
		<view class="changePassword_form">
			<view class="evan-form-show">
				<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="teaChangePassword" :model="teaChangePassword" show-message>
								<evan-form-item label="需要修改的密码：" prop="password_type">
									<view class="item-content" @click="handleTap()">
										<view class="item-value">
											<text class="item-label">{{ label1 }}</text>
											         <text v-if="!label1"
											           class="item-placeholder" style="color: #999;font-size: 28rpx;">请选择要修改密码的类型</text>
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
					<evan-form-item label="相关账号(工号)" prop="account">
						<input class="form-input" placeholder-class="form-input-placeholder" v-model="teaChangePassword.account" placeholder="请输入教工号" />
					</evan-form-item>
					<evan-form-item label="所在部门：" prop="section">
						<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="teaChangePassword.section" placeholder="请输入所在部门" />
					</evan-form-item>
				</evan-form>
			</view>
			<view style="margin-top: 30rpx;">
				流程：
			</view>
			<view class="steps">
				<uni-steps :options="[{title: '填写信息'}, {title: '提交申请'}, {title: '审批人审批'}, {title: '修改成功'}]" :active="this.active"></uni-steps>
			</view>
			<view class="button">
				<button @click="back" class="evan-form-show__button">返回</button>
				<button @click="submit" class="evan-form-show__button edit_button">修改</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	import utils from '@/components/evan-form/utils.js';
	import LbPicker from '@/components/lb-picker';

export default {	
	components: {
			LbPicker,
		},
	data() {
		return {
			hideRequiredAsterisk: false,
			teaChangePassword:{
				password_type:'',
				account:'',
				section:'',
				creat_time:''
			},
			list1: [
				{ label:'OA办公系统账号',value:'1'},
				{label: '数字化校园账号',value:'2'},
				{label: 'edu邮箱系统账号',value:'3'},
				{label: '校园网上网账号',value:'4'},
				
				],
			label1: '',
			value1: [],
			active:0,
			rules: {
				account: [
					{
						required: true,
						message: '请输入工号'
					},
					{
						min: 8,
						max: 8,
						message: '工号长度8位'
					}
				],
				password_type: [
					{
						required: true,
						message: '请输入选择要修改的密码的类型'
					}
				],
				section: {
					required: true,
					message: '请输入所在部门'
				},
			},
		}
	},
	mounted() {
		// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
		this.$refs.teaChangePassword.setRules(this.rules);
	},
	methods: {
		handleTap() {
			this.$refs.picker.show();
		},
		// 选择专业进行改变时
		handleChange(e) {},
		handleConfirm(e) {
			if (e) {
				const name = e.dataset.name;
				const label = e.item.map(m => m.label).join('-');
				this.value1=label
				this.teaChangePassword.password_type = label;
				if (name && label) {
					this[name] = label;
				}
			}
		},
		// 取消时
		handleCancel(e) {},
		// 提交表单
    submit(){
    	this.$refs.teaChangePassword.validate(async res => {
    		this.teaChangePassword.creat_time = this.$getFormatDate.getFormatDate()
				this.teaChangePassword.service_type = 'pwd'
				this.teaChangePassword.people_type = 'teacher'
    		if (res) {
    			this.active = 1
    			uni.getStorage({
    				key: 'teacher_account',
    				success: async res => {
    					this.teaChangePassword.account = res.data
    					const {data:row} = await this.$http({
    						url:'/teacher/password',
    						method:'POST',
    						data:this.teaChangePassword
    					})
    					if(row.status == 201){
    						uni.showModal({
    						    title: '提示',
    						    content: row.message,
    						    success: (res) => {
    						        if (res.confirm) {
    						            uni.reLaunch({
    						            	url:'./index'
    						            })
    						        } else if (res.cancel) {
    						            uni.reLaunch({
    						            	url:'./teaChangePassword'
    						            })
    						        }
    						    }
    						});
    					}
    				}
    			});
    		}
    	});
    },
		back(){
			uni.navigateBack({
			    delta: 1
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.changePassword {
	width: 95vw;
	margin: 20rpx auto;
	.changePassword_title {
		font-size: 48rpx;
		font-weight: 600;
		height: 10vw;
		line-height: 10vw;
	}
	.changePassword_logo {
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
		.changePassword_logo_title {
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
.changePassword_form{
	margin-top:20rpx;
	.steps{
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}
	.button{
		margin-top: 30rpx;
		.edit_button{
			background-color: #d01b27 !important;
		}
	}

	.evan-form-show {
		width: 95vw;
		margin: auto;
		margin-top: 2vw;
		.item-content{
			width: 65vw;
			text-align: right;
			font-size: 28rpx;
		}
	
		.select-form-input1 {
			width: 62vw !important;
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
