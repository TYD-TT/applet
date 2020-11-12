<template>
	<view class="changePassword">
		<view class="changePassword_title">软件正版化安装预约服务</view>
		<!-- <view class="changePassword_logo">
			<view><image src="../../static/img/ay_logo.jpg" mode="aspectFill" class="img"></image></view>
			<view class="changePassword_logo_title">安阳工学院</view>
		</view> -->
		<view class="tishi">请各教职员工根据安装需求，选择安装内容。如有问题，请拨打现教中心信息技术科电话：2909864。<br><span style="font-size: color:#FF0000;">*注：</span>安装系统前，请自行备份电脑内的重要文件！！！</br></view>
		<view class="changePassword_form">
			<view class="evan-form-show">
				<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="software" :model="software" show-message>
								<evan-form-item label="安装操作系统" prop="ios">
									<view class="item-content" @click="handleTap1()">
										<view class="item-value">
											 <view class="item-value">
											          <text class="item-label">{{ label1 }}</text>
											                   <text v-if="!label1"
											                     class="item-placeholder" style="color: #999;font-size: 28rpx;">请选择操作系统</text>
											        </view>
										</view>
									</view>
									<lb-picker
										ref="picker1"
										v-model="value1"
										mode="multiSelector"
										:list="list1"
										:level="1"
										:dataset="{ name: 'label1' }"
										@change="handleChange1"
										@confirm="handleConfirm1"
										@cancel="handleCancel1"
									>
									</lb-picker>
								</evan-form-item>
								<evan-form-item label="安装Office软件" prop="office" >
									<view class="item-content" @click="handleTap2()">
										<view class="item-value">
											 <view class="item-value">
											          <text class="item-label">{{ label2 }}</text>
											          <text v-if="!label2"
											            class="item-placeholder" style="color: #999;font-size: 28rpx;">请选择Office</text>
											        </view>
										</view>
									</view>
									<lb-picker
										ref="picker2"
										v-model="value2"
										mode="multiSelector"
										:list="list2"
										:level="1"
										:dataset="{ name: 'label2' }"
										@change="handleChange2"
										@confirm="handleConfirm2"
										@cancel="handleCancel2"
									>
									</lb-picker>
								</evan-form-item>
								<evan-form-item label="安装时间" prop="time" >
									<view class="item-content" @click="handleTap3()">
										<view class="item-value">
											 <view class="item-value">
											          <text class="item-label">{{ label3 }}</text>
											          <text v-if="!label3"
											            class="item-placeholder" style="color: #999;font-size: 28rpx;">请选择安装时间</text>
											        </view>
										</view>
									</view>
									<lb-picker
										ref="picker3"
										v-model="value3"
										mode="multiSelector"
										:list="list3"
										:level="1"
										:dataset="{ name: 'label3' }"
										@change="handleChange3"
										@confirm="handleConfirm3"
										@cancel="handleCancel3"
									>
									</lb-picker>
								</evan-form-item>
					<evan-form-item label="安装地点" prop="address">
						<input class="form-input" placeholder-class="form-input-placeholder" v-model="software.address" placeholder="请输入安装地点" />
					</evan-form-item>
					<evan-form-item label="请输入所在部门" prop="section">
						<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="software.section" placeholder="请输入所在部门" />
					</evan-form-item>
					<evan-form-item label="联系电话" prop="phone">
						<input class="form-input" type="number" placeholder-class="form-input-placeholder" v-model="software.phone" placeholder="联系电话" />
					</evan-form-item>
					<view style="color: #666;font-size: 28rpx;margin: 24rpx 0;">
						其他要说明的情况
					</view>
					<evan-form-item prop="text">
						<textarea adjust-position="true" style="border: 2rpx solid #eee;width: 100%;height: 150rpx;"  placeholder="请输入..." v-model="software.text" />
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
				<button @click="submit" class="evan-form-show__button edit_button">提交</button>
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
			software:{
				ios:'',
				office:'',
				address:'',
				time:'',
				section:'',
				phone:'',
				creat_time:'',
				text:'',
				account:'',
				people_type:'teacher',
				service_type:'software'
			},
			list1: [
				{ label:'windows 7 32位',value:'1'},
				{label: 'windows 7 64位',value:'2'},
				{label: 'windows 10 32位',value:'3'},
				{label: 'windows 10 64位',value:'4'},
				],
			list2: [
				{label: 'office 2010 32位',value:'1'},
				{label: 'office 2010 64位',value:'2'},
				{label: 'office 2013 32位',value:'3'},
				{label: 'office 2013 64位',value:'4'},
				{label: 'office 2016 32位',value:'5'},
				{label: 'office 2016 64位',value:'6'},
				],
			list3: [
				{label: '周一上午 09:00-11:00',value:'1'},
				{label: '周三下午 16:00-17:00',value:'2'},
				{label: '周四下午 16:00-17:00',value:'3'},
				],
			
			label1:'',
			value1: [],
			label2: '',
			value2: [],
			label3: '',
			value3: [],
			active:0,
			rules: {
				ios:{
					required: true,
					message: '请选择操作系统'
				},
				office:{
					required: true,
					message: '请选择office版本'
				},
				time:{
					required: true,
					message: '请选择安装时间'
				},
				address:{
					required: true,
					message: '请输入安装地点'
				},
				section: {
					required: true,
					message: '请输入所在部门'
				},
				phone:{
					required: true,
					message: '请输入联系电话'
				},
			},
		}
	},
	mounted() {
		// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
		this.$refs.software.setRules(this.rules);
	},
	methods: {
		handleTap1() {
			this.$refs.picker1.show();
		},
		handleTap2() {
			this.$refs.picker2.show();
		},
		handleTap3() {
			this.$refs.picker3.show();
		},
		handleChange1(e) {},
		handleConfirm1(e) {
			if (e) {
				const name = e.dataset.name;
				const label = e.item.map(m => m.label).join('-');
				this.software.ios = label;
				this.value1=label
				if (name && label) {
					this[name] = label;
				}
			}
		},
		handleCancel1(e) {},
		handleChange2(e) {},
		handleConfirm2(e) {
			if (e) {
				const name = e.dataset.name;
				const label = e.item.map(m => m.label).join('-');
				this.software.office = label;
				this.value2=label
				if (name && label) {
					this[name] = label;
				}
			}
		},
		handleCancel2(e) {},
		handleChange3(e) {},
		handleConfirm3(e) {
			if (e) {
				const name = e.dataset.name;
				const label = e.item.map(m => m.label).join('-');
				this.value3=label
				this.software.time = label;
				if (name && label) {
					this[name] = label;
				}
			}
		},

		handleCancel3(e) {},
		submit(){
			this.$refs.software.validate(async res => {
				this.software.creat_time = this.$getFormatDate.getFormatDate()
				if (res) {
					this.active = 1
					uni.getStorage({
						key: 'teacher_account',
						success: async res => {
							this.software.account = res.data
							const {data:row} = await this.$http({
								url:'/teacher/software',
								method:'POST',
								data:this.software
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
    						            uni.navigateTo({
    						            	url:'./software'
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
			width: 100%;
			text-align: right;
			font-size: 28rpx;
		}
		.select-form-input1 {
			width: 70vw !important;
		}
		.select-form-input2 {
			width: 67vw !important;
		}
		.select-form-input3 {
			width: 77vw !important;
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
