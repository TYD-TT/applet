<template>
	<view class="changePassword">
		<view class="changePassword_title">教学区网络端口开通服务</view>
		<!-- <view class="changePassword_logo">
			<view><image src="../../static/img/ay_logo.jpg" mode="aspectFill" class="img"></image></view>
			<view class="changePassword_logo_title">安阳工学院</view>
		</view> -->
		<view class="tishi">申请人信息（我校教职工）</view>
		<view class="changePassword_form">
			<view class="evan-form-show">
				<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="port" :model="port" show-message>
					<evan-form-item label="姓名" prop="name">
						<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="port.name" placeholder="请输入姓名" />
					</evan-form-item>
					<evan-form-item label="手机" prop="phone">
						<input class="form-input" type="number" placeholder-class="form-input-placeholder" v-model="port.phone" placeholder="请输入手机号" />
					</evan-form-item>
					<evan-form-item label="开通端口办公地" prop="address">
						<input class="form-input" placeholder-class="form-input-placeholder" v-model="port.address" placeholder="请输入开通端口办公地" />
					</evan-form-item>
					<evan-form-item label="部门类型" prop="section_type">
						<view class="item-content" @click="handleTap1()">
							<view class="item-value">
								<text class="item-label">{{ label1 }}</text>
								         <text v-if="!label1"
								           class="item-placeholder" style="color: #999;font-size: 28rpx;">请选择部门类型</text>
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
					<evan-form-item label="端口数量" prop="port_number">
						 <radio-group class="radio" @change="port_number">
							<label class="radio">
								<radio value="1个" style="transform:scale(0.8)" /><text>1个</text>
								<radio value="2个" style="transform:scale(0.8)"  /><text>2个</text>
							</label>
						 </radio-group>
					</evan-form-item>
					<evan-form-item label="端口用途" prop="port_use">
						<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="port.port_use" placeholder="请输入端口用途" />
					</evan-form-item>
					<evan-form-item label="请输入所在部门" prop="section">
						<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="port.section" placeholder="请输入所在部门" />
					</evan-form-item>
					
					<evan-form-item label="相关规定" prop="stipulate">
						<radio-group class="radio" @change="stipulate">
						<label>
							<radio value="是" style="transform:scale(0.8)" /><text>是</text>
							<radio value="否" style="transform:scale(0.8)" /><text>否</text>
						</label>
						</radio-group>
					</evan-form-item>
					<view style="font-size: 9px;color: #999;">*注:是否遵守《安阳工学院虚拟服务器托管规定》</view>
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
import utils from "@/components/evan-form/utils.js";
import LbPicker from "@/components/lb-picker";

export default {
  components: {
    LbPicker,
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
      port: {
				account:'',
        name: "",
        phone: "",
				address:'',
				section_type:'',
        port_number:'',
				port_use:'',
				section:'',
				stipulate:'',
				creat_time:'',
				people_type:'teacher',
				service_type:'port'
      },
      list1: [
        { label: "党群机构", value: "1" },
        { label: "直属机构", value: "2" },
        { label: "行政机构", value: "3" },
        { label: "教学机构", value: "4" },
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
						message: '手机号格式不正确'
					}
				],
        section_type: {
          required: true,
          message: "请选择部门类型",
        },
        port_number: {
          required: true,
          message: "请选择开通端口个数",
        },
        port_use: {
          required: true,
          message: "请输入端口用途",
        },
        stipulate: {
          required: true,
          message: "是否了解相关规定",
        },
        section: {
          required: true,
          message: "请输入所在部门",
        },
				address: {
				  required: true,
				  message: "请输入办公地址",
				},
        
      },
    };
  },
  mounted() {
    // 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
    this.$refs.port.setRules(this.rules);
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
    handleTap2() {
      this.$refs.picker2.show();
    },

    handleChange1(e) {},
    handleCancel1(e) {},
    handleConfirm1(e) {
      if (e) {
        const name = e.dataset.name;
        const label = e.item.map((m) => m.label).join("-");
				this.value1=label
        this.port.section_type = label;
        if (name && label) {
          this[name] = label;
        }
      }
    },

		submit(){
    	this.$refs.port.validate(async res => {
    		this.port.creat_time = this.$getFormatDate.getFormatDate()
    		if (res) {
    			this.active = 1
    			uni.getStorage({
    				key: 'teacher_account',
    				success: async res => {
    					this.port.account = res.data
    					const {data:row} = await this.$http({
    						url:'/teacher/port',
    						method:'POST',
    						data:this.port
    					})
    					if(row.status == 201){
								const {data:row} = await this.$http({
									url:'/email/admin',
									method:'GET'
								})
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
    						            	url:'./port'
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
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
		port_number(e){this.port.port_number = e.detail.value},
		ram(e){this.port.ram = e.detail.value},
		rom(e){this.port.rom = e.detail.value},
		ios(e){this.port.ios = e.detail.value},
		stipulate(e){this.port.stipulate = e.detail.value},
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
