<template>
	<view class="changePassword">
		<view class="changePassword_title">注册账号</view>
		<!-- <view class="changePassword_logo">
			<view><image src="../../static/img/ay_logo.jpg" mode="aspectFill" class="img"></image></view>
			<view class="changePassword_logo_title">安阳工学院</view>
		</view> -->
		<view class="tishi">注册人信息（我校教职工）。</view>
		<view class="changePassword_form">
			<view class="evan-form-show">
				<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="register" :model="register" show-message>
					<evan-form-item label="姓名" prop="name">
						<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="register.name" placeholder="请输入姓名" />
					</evan-form-item>
					<evan-form-item label="工号" prop="account">
						<input class="form-input" type="number" placeholder-class="form-input-placeholder" v-model="register.account" placeholder="请输入工号" />
					</evan-form-item>
					<evan-form-item label="手机" prop="phone">
						<input class="form-input" type="number" placeholder-class="form-input-placeholder" v-model="register.phone" placeholder="请输入手机号" />
					</evan-form-item>
<!-- 					<evan-form-item label="证件类型" prop="ID_type">
						<input class="form-input" disabled placeholder-class="form-input-placeholder" v-model="register.ID_type" placeholder="请输入证件类型" /> -->
					</evan-form-item>
					<evan-form-item label="证件号" prop="ID_number">
						<input class="form-input"  placeholder-class="form-input-placeholder" v-model="register.ID_number" placeholder="请输入证件号码" />
					</evan-form-item>
					<evan-form-item label="申请院系" prop="department">
						<view class="item-content" @click="handleTap1()">
							<view class="item-value">
								<text class="item-label">{{ label1 }}</text>
								         <text v-if="!label1"
								           class="item-placeholder" style="color: #999;font-size: 28rpx;">请选择院系</text>
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
						></lb-picker>
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
				<button @click="t_register" class="evan-form-show__button edit_button">注册</button>
			</view>
			
		</view>
	</view>
</template>

<script>
import utils from "@/components/evan-form/utils.js";
import LbPicker from "@/components/lb-picker";

export default {
  components: {
    LbPicker,
  },
  data() {
    return {
      hideRequiredAsterisk: false,
      register: {
        name: "",
        phone: "",
				account:'',
				ID_type:'身份证',
        ID_number:'',
				department:'',
				people_type:'teacher',
				service_type:'register'
      },
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
      ],
      label1: "",
      value1: [],
      active: 0,
      // 校验规则
			rules: {
        name: {
          required: true,
          message: "请输入姓名",
        },
				phone: [
					{
						required: true,
						message: '请输入手机号'
					},
					{
						min: 11,
						max: 11,
						message: '手机号长度为11位'
					}
				],
    //     ID_type: {
    //       required: true,
    //       message: "请选择证件类型",
    //     },
        ID_number: [
					{
					  required: true,
					  message: "请输入证件号码",
					},
					{
						min:18,
						max:18,
						message:'证件号长度为18位'
					}
				],
        account: [
					{
					  required: true,
					  message: "请输入工号",
					},
					{
						min: 8,
						max: 8,
						message: '工号长度为6'
					}
				],
        department: {
          required: true,
          message: "请选择申请的院系",
        },
      },
    };
  },
  mounted() {
    // 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
    this.$refs.register.setRules(this.rules);
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
		
    handleTap1() {
      this.$refs.picker1.show();
    },
    handleChange1(e) {},
    handleCancel1(e) {},
    handleConfirm1(e) {
      if (e) {
        const name = e.dataset.name;
        const label = e.item.map((m) => m.label).join("-");
				this.value1=label;
        this.register.department = label;
        if (name && label) {
          this[name] = label;
        }
      }
    },
		
		// 注册
    t_register() {
			this.register.creat_time = this.$getFormatDate.getFormatDate()
      this.$refs.register.validate(async (res) => {
        if (res) {
          this.active = 1;
					const {data:row} = await this.$http({
						url:'/register',
						method:'POST',
						data:this.register
					})
					if(row.status == 201){
						uni.showToast({
							title:row.message,
							icon:"none"
						})
						uni.navigateTo({
							url:'../index/index'
						})
					}
        }
      });
    },
		// 返回按钮
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
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
.changePassword_form {
  margin-top: 20rpx;
  .steps {
    margin-top: 40rpx;
    margin-bottom: 40rpx;
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
