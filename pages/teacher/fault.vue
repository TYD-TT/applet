<template>
	<view class="changePassword">
		<view class="changePassword_title">网络故障上报服务</view>
		<!-- <view class="changePassword_logo">
			<view><image src="../../static/img/ay_logo.jpg" mode="aspectFill" class="img"></image></view>
			<view class="changePassword_logo_title">安阳工学院</view>
		</view> -->
		<view class="tishi">各教职员工如有其他问题，请拨打现教中心信息技术科电话：2909864。</view>
		<view class="changePassword_form">
			<view class="evan-form-show">
				<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="fault" :model="fault" show-message>
					<evan-form-item label="工号" prop="account">
						<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="fault.account" placeholder="请输入工号" />
					</evan-form-item>
					<evan-form-item label="手机" prop="phone">
						<input class="form-input" type="number" placeholder-class="form-input-placeholder" v-model="fault.phone" placeholder="请输入手机号" />
					</evan-form-item>
					<evan-form-item label="故障类型" prop="fault_type">
						<view class="item-content" @click="handleTap1()">
							<view class="item-value">
								 <text class="item-label">{{ label1 }}</text>
								          <text v-if="!label1"
								            class="item-placeholder" style="color: #999;font-size: 28rpx;">请选择故障类型</text>
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
					<evan-form-item label="故障地点" prop="address">
						<input class="form-input" placeholder-class="form-input-placeholder" v-model="fault.address" placeholder="请输入故障地点" />
					</evan-form-item>
					<evan-form-item label="故障描述" prop="fault_message">
						<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="fault.fault_message" placeholder="请输入故障描述" />
					</evan-form-item>
					<evan-form-item label="请输入所在部门" prop="section">
						<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="fault.section" placeholder="请输入所在部门" />
					</evan-form-item>
				</evan-form>
			</view>
			<view class="feedback-title">故障图片</view>
			<view class="feedback-image-box">
				<view class="feedback-image-item" v-for="(item, index) in imageLists" :key="index">
					<view class="close-icon" @click="del(index)"><uni-icons type="closeempty" size="18" color="#FFF"></uni-icons></view>
					<view class="image-box"><image :src="item.url" mode="aspectFill"></image></view>
				</view>
				<view class="feedback-image-item" @click="addImage" v-if="imageLists.length < 4">
					<view class="image-box"><uni-icons type="plusempty" size="50" color="#EEE"></uni-icons></view>
				</view>
			</view>
			<view style="margin-top: 30rpx;">
				流程：
			</view>
			<view class="steps">
				<uni-steps :options="[{title: '填写信息'}, {title: '提交申请'}, {title: '审批人审批'}, {title: '修改成功'}]" :active="this.active"></uni-steps>
			</view>
			<view class="button">
				<button @click="back" class="evan-form-show__button">返回</button>
				<button @click="submit1" class="evan-form-show__button edit_button">提交</button>
			</view>
			
		</view>
	</view>
</template>

<script>
import utils from "@/components/evan-form/utils.js";
import LbPicker from "@/components/lb-picker";
import uniIcons from '@/components/uni-icons/uni-icons.vue';

export default {
  components: {
    LbPicker,
		uniIcons
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
			imgURL:[],
      fault: {
        account: "",
        phone: "",
				address:'',
				fault_type:'',
				fault_message:'',
				section:'',
				imgURL:[],
				creat_time:'',
				people_type:'teacher',
				service_type:'fault'
      },
			imageLists: [],
      list1: [
        { label: "网络接口问题", value: "1" },
        { label: "各信息化系统", value: "2" },
        { label: "校园网站群", value: "3" },
      ],
      label1: "",
      value1: [],
      active: 0,
      // 校验规则
			rules: {
        account: {
          required: true,
          message: "请输入工号",
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
        fault_type: {
          required: true,
          message: "请选择部门类型",
        },
        fault_message: {
          required: true,
          message: "请输入故障描述",
        },
        section: {
          required: true,
          message: "请输入所在部门",
        },
				address: {
				  required: true,
				  message: "请输入故障地址",
				},
        
      },
    };
  },
  mounted() {
    // 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
    this.$refs.fault.setRules(this.rules);
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
				this.value1 = label
        this.fault.fault_type = label;
        console.log(label);
        if (name && label) {
          this[name] = label;
        }
      }
    },
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
		// 添加图片
		addImage() {
			const count = 4 - this.imageLists.length;
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
				name:'file',
				success: uploadFileRes => {
					this.imgURL.push(uploadFileRes.data)
				}
			});
			return result;
		},
		del(index) {
			this.imageLists.splice(index, 1);
		},
		save() {
		  this.$refs.fault.validate(async (res) => {
		    this.fault.creat_time = this.$getFormatDate.getFormatDate();
				this.fault.people_type = 'teacher',
				this.fault.service_type = 'fault'
		    if (res) {
		      this.active = 1;
							const {data:row} = await this.$http({
								url:'/teacher/fault',
								method:'POST',
								data:this.fault
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
    						            	url:'./fault'
    						            })
    						        }
    						    }
    						});
							}
		    }
		  });
		},
  submit1(){
		new Promise((resolve,reject)=>{
			this.submit()
			resolve()
		}).then(()=>{
			this.fault.imgURL = this.imgURL
			 setTimeout(()=>{
			        this.save() //代码正常执行！
			    }, 5000);
			
		})
	} 
	},
};
</script>

<style lang="scss" scoped>
	.feedback-title {
		margin: 15rpx;
		margin-bottom: 0;
		font-size: 14px;
		color: #666;
	}
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
