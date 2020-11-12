<template>
	<view class="addstudent">

		<view class="evan-form-show">
			<view class="title_1">
				个人信息
			</view>
			<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="studentForm" :model="studentForm" show-message>
				<view class="title_2">
					基础信息
				</view>
				<evan-form-item label="姓名：" prop="name">
					<input class="form-input" disabled  placeholder-class="form-input-placeholder" v-model="studentForm.name" placeholder="请输入姓名" />
				</evan-form-item>
				<evan-form-item label="学号：" prop="account" style="border: none;">
					<input class="form-input" disabled  type="number" placeholder-class="form-input-placeholder" v-model="studentForm.account" placeholder="请输入学号" />
				</evan-form-item>
				<evan-form-item label="性别：" prop="sex">
					<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="studentForm.sex" placeholder="请输入性别" />
				</evan-form-item>
				<evan-form-item label="年龄：" prop="age">
					<input class="form-input" type="number" placeholder-class="form-input-placeholder" v-model="studentForm.age" placeholder="请输入年龄" />
				</evan-form-item>
				<evan-form-item label="联系电话：" prop="phone">
					<input class="form-input" type="number" placeholder-class="form-input-placeholder" v-model="studentForm.phone" placeholder="请输入手机号" />
				</evan-form-item>
				<evan-form-item label="证件类型：" prop="ID_type" style="display: none;">
					<input class="form-input" disabled placeholder-class="form-input-placeholder" v-model="studentForm.ID_type" placeholder="请输入身份证号" />
				</evan-form-item>
				<evan-form-item label="身份证号：" prop="ID_number" style="display: none;">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="studentForm.ID_number" placeholder="请输入身份证号" />
				</evan-form-item>
				<evan-form-item label="年级：" prop="class">
					<input class="form-input" type="number" placeholder-class="form-input-placeholder" v-model="studentForm.class" placeholder="请输入级别:2017/2018/2019" />
				</evan-form-item>
				<evan-form-item label="院系专业："  prop="department_major" >
					<view class="item-content" @click="handleTap()">
						<view class="item-value">
							<text class="item-label">{{ label1 }}</text>
							<text v-if="!label1"
							  class="item-placeholder" style="color: #999;font-size: 28rpx;">请选择院系专业</text>
						</view>
					</view>
					<lb-picker
						ref="picker"
						v-model="value1"
						mode="multiSelector"
						:list="list1"
						:level="2"
						:dataset="{ name: 'label1' }"
						@change="handleChange"
						@confirm="handleConfirm"
						@cancel="handleCancel"
					>
					</lb-picker>
				</evan-form-item>
			</evan-form>
			
			<button @click="back" class="evan-form-show__button">返回</button>
			<button @click="edit" class="evan-form-show__button edit_button">修改</button>
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
		return {
			hideRequiredAsterisk: false,
			// 表单的内容必须初始化
			studentForm: {
				account: '',
				password: '',
				name: '',
				phone: '',
				department_major:'',
				department:'',
				major:'',
				// ID_type: '身份证',
				// ID_number: '',
				class: '',
				creat_time:''
			},
			// 校验规则
			rules: {
				account: [
					{
						required: true,
						message: '请输入学号'
					},
					{
						min: 11,
						max: 11,
						message: '学号长度11位'
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
					children: [
						{
							label: '机械电子工程',
							value: '11'
						},
						{
							label: '材料成型及控制工程',
							value: '12'
						},
						{
							label: '机械设计制造及其自动化',
							value: '13'
						},
						{
							label: '汽车服务工程',
							value: '14'
						},
						{
							label: '工业设计',
							value: '15'
						},
						{
							label: '飞行器制造工程',
							value: '16'
						},
						{
							label: '飞行器适航技术',
							value: '17'
						},
						{
							label: '机电一体化技术',
							value: '18'
						}
					]
				},
				{
					label: '电子信息与电气工程学院',
					value: '2',
					children: [
						{
							label: '自动化',
							value: '21'
						},
						{
							label: '电子信息工程',
							value: '22'
						},
						{
							label: '通信工程',
							value: '23'
						},
						{
							label: '电气工程及其自动化',
							value: '24'
						},
						{
							label: '机器人工程',
							value: '25'
						},
						{
							label: '电气自动化技术',
							value: '26'
						}
					]
				},
				{
					label: '计算机科学与信息工程学院',
					value: '3',
					children: [
						{
							label: '计算机科学与技术',
							value: '31'
						},
						{
							label: '网络工程',
							value: '32'
						},
						{
							label: '软件工程',
							value: '33'
						},
						{
							label: '物联网工程',
							value: '34'
						},
						{
							label: '信息管理与信息系统',
							value: '35'
						},
						{
							label: '数据科学与大数据技术',
							value: '36'
						},
						{
							label: '计算机应用技术',
							value: '37'
						},
						{
							label: '软件技术',
							value: '38'
						}
					]
				},
				{
					label: '土木与建筑工程学院',
					value: '4',
					children: [
						{
							label: '土木工程',
							value: '41'
						},
						{
							label: '工程管理',
							value: '42'
						},
						{
							label: '建筑学',
							value: '43'
						},
						{
							label: '给排水科学与工程',
							value: '44'
						},
						{
							label: '城乡规划',
							value: '45'
						},
						{
							label: '建筑工程技术',
							value: '46'
						}
					]
				},
				{
					label: '化学与环境工程学院',
					value: '5',
					children: [
						{
							label: '化学工程与工艺',
							value: '51'
						},
						{
							label: '应用化学',
							value: '52'
						},
						{
							label: '环境工程',
							value: '53'
						},
						{
							label: '高分子材料与工程',
							value: '54'
						},
						{
							label: '应用化工技术',
							value: '55'
						}
					]
				},
				{
					label: '生物与食品工程学院',
					value: '6',
					children: [
						{
							label: '食品科学与工程',
							value: '61'
						},
						{
							label: '食品质量与安全',
							value: '62'
						},
						{
							label: '生物工程',
							value: '63'
						},
						{
							label: '生物技术',
							value: '64'
						},
						{
							label: '动物医学',
							value: '65'
						},
						{
							label: '农业生物技术',
							value: '66'
						},
						{
							label: '畜牧兽医',
							value: '67'
						}
					]
				},
				{
					label: '数理学院',
					value: '7',
					children: [
						{
							label: '信息与计算科学',
							value: '71'
						},
						{
							label: '应用物理学',
							value: '72'
						},
						{
							label: '新能源材料与器件',
							value: '73'
						}
					]
				},
				{
					label: '飞行学院',
					value: '8',
					children: [
						{
							label: '飞行技术',
							value: '81'
						},
						{
							label: '物流管理',
							value: '82'
						},
						{
							label: '安全工程',
							value: '83'
						},
						{
							label: '交通运输',
							value: '84'
						},
						{
							label: '直升机驾驶技术',
							value: '85'
						},
						{
							label: '民航空中安全保卫',
							value: '86'
						}
					]
				},
				{
					label: '经济管理学院',
					value: '9',
					children: [
						{
							label: '会计学',
							value: '91'
						},
						{
							label: '工商管理',
							value: '92'
						},
						{
							label: '财务管理',
							value: '93'
						},
						{
							label: '国际经济与贸易',
							value: '94'
						},
						{
							label: '市场营销',
							value: '95'
						},
						{
							label: '电子商务',
							value: '96'
						},
						{
							label: '会计',
							value: '97'
						}
					]
				},
				{
					label: '文法学院',
					value: '10',
					children: [
						{
							label: '社会工作',
							value: '101'
						},
						{
							label: '知识产权',
							value: '102'
						},
						{
							label: '播音与主持艺术',
							value: '103'
						},
						{
							label: '广播电视编导',
							value: '104'
						},
						{
							label: '新闻采编与制作',
							value: '105'
						}
					]
				},
				{
					label: '外国语学院',
					value: '11',
					children: [
						{
							label: '英语',
							value: '111'
						},
						{
							label: '商务英语',
							value: '112'
						},
						{
							label: '汉语国际教育',
							value: '113'
						},
						{
							lable: '应用英语',
							value: '114'
						}
					]
				},
				{
					label: '艺术设计学院',
					value: '12',
					children: [
						{
							label: '视觉传达设计',
							value: '121'
						},
						{
							label: '环境设计',
							value: '122'
						},
						{
							label: '产品设计',
							value: '123'
						},
						{
							label: '动画',
							value: '124'
						},
						{
							label: '绘画',
							value: '125'
						},
						{
							label: '视觉传播设计与制作',
							value: '126'
						}
					]
				},
				{
					label: '国际教育学院',
					value: '13',
					children: [
						{
							label: '土木工程',
							value: '131'
						},
						{
							label: '城乡规划',
							value: '132'
						}
					]
				}
			]
		};
	},
	mounted() {
		// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
		this.$refs.studentForm.setRules(this.rules);
		
	},
	created() {
		this.obtain()
	},
	methods: {
		
		// 保存数据 
		edit() {
			this.$refs.studentForm.validate(async res => {
				if (res) {
					const {data:res} = await this.$http({
						url:'/update_message/1',
						method:'PUT',
						data:this.studentForm
					})
					if(res.status == 201){
						uni.redirectTo({
							url:'./index'
						});
					}
				}
			});
		},
		// 从localStorage获取学号并查询学生信息
		obtain(){
			uni.getStorage({
				key: 'student_account',
				success: async res => {
					this.Storage_data = res.data;
					const {data:row} = await this.$http({
						url: `/select_message?account=${res.data}&user=student`,
						method: 'GET'
					});
					this.studentForm = JSON.parse(row.data)[0];
					this.studentForm.ID_type = '身份证'
					console.log(this.studentForm.department == null)
					if(this.studentForm.department == null || this.studentForm.major == null){
						this.label1 = '请选择院系'
					}else{
						this.label1 = this.studentForm.department+'-'+this.studentForm.major
						this.studentForm.department_major = this.studentForm.department+'-'+this.studentForm.major
					}

				}
			});
		},
		back(){
			uni.redirectTo({
				url:'./index'
			})
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
				this.value1 = label
				this.studentForm.department_major = label;
				console.log(label);
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
