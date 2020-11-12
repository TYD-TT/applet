<template>
	<view class="changePassword">
		<view class="changePassword_title">虚拟服务器开通服务</view>
		<!-- <view class="changePassword_logo">
			<view><image src="../../static/img/ay_logo.jpg" mode="aspectFill" class="img"></image></view>
			<view class="changePassword_logo_title">安阳工学院</view>
		</view> -->
		<view class="tishi">系统负责人</view>
		<view class="changePassword_form">
			<view class="evan-form-show">
				<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="virtual" :model="virtual" show-message>
					<evan-form-item label="姓名" prop="name">
						<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="virtual.name" placeholder="请输入姓名" />
					</evan-form-item>
					<evan-form-item label="手机" prop="phone">
						<input class="form-input" type="number" placeholder-class="form-input-placeholder" v-model="virtual.phone" placeholder="请输入手机号" />
					</evan-form-item>
					<evan-form-item label="办公地址" prop="address">
						<input class="form-input" placeholder-class="form-input-placeholder" v-model="virtual.address" placeholder="请输入办公地址" />
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
					<evan-form-item label="请输入所在部门" prop="section">
						<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="virtual.section" placeholder="请输入所在部门" />
					</evan-form-item>
					<view class="tishi">系统需求</view>
					
					<evan-form-item label="CPU类型" prop="cpu">
						 <radio-group class="radio" @change="cpu">
							<label class="radio">
								<radio value="8核" style="transform:scale(0.8)" /><text>8核</text>
								<radio value="16核" style="transform:scale(0.8)"  /><text>16核</text>
								<radio value="32核" style="transform:scale(0.8)" /><text>32核</text>
							</label>
						 </radio-group>
					</evan-form-item>
					<evan-form-item label="内存大小" prop="rom">
						<radio-group class="radio" @change="rom">
							<label>
								<radio value="8G" style="transform:scale(0.8)" /><text>8G</text>
								<radio value="16G" style="transform:scale(0.8)" /><text>16G</text>
								<radio value="32G" style="transform:scale(0.8)" /><text>32G</text>
							</label>
						</radio-group>
						
					</evan-form-item>
					
					<evan-form-item label="硬盘大小" prop="ram">
						<radio-group class="radio" @change="ram">
							<label>
								<radio value="100G" style="transform:scale(0.8)" /><text>100G</text>
								<radio value="200G" style="transform:scale(0.8)" /><text>200G</text>
								<radio value="300G" style="transform:scale(0.8)" /><text>500G</text>
							</label>
						</radio-group>
					</evan-form-item>
					
					<evan-form-item label="预装系统" prop="ios">
						<radio-group class="radio" @change="ios">
						<label>
							<radio value="Linux" style="transform:scale(0.8)" /><text>Linux</text>
							<radio value="Windows server2012" style="transform:scale(0.8)" /><text>Windows server2012</text>
						</label>
						</radio-group>
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
      virtual: {
				account:'',
        name: "",
        phone: "",
				address:'',
				section_type:'',
				section:'',
        cpu:'',
				rom:'',
				ram:'',
				ios:'',
				stipulate:'',
				creat_time:'',
				people_type:'teacher',
				service_type:'virtual'
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
        section_type: {
          required: true,
          message: "请选择部门类型",
        },
        cpu: {
          required: true,
          message: "请选择cpu核数",
        },
        ram: {
          required: true,
          message: "请选择内存大小",
        },
        rom: {
          required: true,
          message: "请选择硬盘大小",
        },
        ios: {
          required: true,
          message: "请选择预装系统",
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
      },
    };
  },
  mounted() {
    // 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
    this.$refs.virtual.setRules(this.rules);
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
        this.virtual.section_type = label;
        if (name && label) {
          this[name] = label;
        }
      }
    },

    submit(){
    	this.$refs.virtual.validate(async res => {
    		this.virtual.creat_time = this.$getFormatDate.getFormatDate()
    		if (res) {
    			this.active = 1
    			uni.getStorage({
    				key: 'teacher_account',
    				success: async res => {
    					this.virtual.account = res.data
    					const {data:row} = await this.$http({
    						url:'/teacher/virtual',
    						method:'POST',
    						data:this.virtual
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
    						            uni.redirectTo({
    						            	url:'./virtual'
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
      uni.redirectTo({
      	url:'./index'
      });
    },
		cpu(e){this.virtual.cpu = e.detail.value},
		ram(e){this.virtual.ram = e.detail.value},
		rom(e){this.virtual.rom = e.detail.value},
		ios(e){this.virtual.ios = e.detail.value},
		stipulate(e){this.virtual.stipulate = e.detail.value},
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
