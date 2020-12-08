<template>
	<view class="">
		<view style="padding: 30rpx;">
			<view class="box">
				<t-table>
					<t-tr>
						<t-th>序号</t-th>
						<t-th>工号</t-th>
						<t-th>时间</t-th>
						<t-th>操作</t-th>
					</t-tr>
					<t-tr v-for="(item, index) in tableList" :key="index">
						<t-td>{{ index }}</t-td>
						<t-td>{{ item.account }}</t-td>
						<t-td>{{ item.creat_time }}</t-td>
						<t-td><button @click="open(item.id)" style="font-size: 14px;" :disabled="item.appraise != ''">
						{{
						  item.appraise == '' ? "评价" : "已评价"
						}}
						</button></t-td>
					</t-tr>
				</t-table>
			</view>
		</view>
		<uni-popup ref="popup" type="top">
			<view class="">
				<view style="width: 100%;height: 56px; border-bottom: 3rpx solid #e1e0e3;"><view style="font-size: 24px; font-weight: 500;padding: 24rpx;">软件正版化评价：</view></view>
				<evan-form :hide-required-asterisk="hideRequiredAsterisk" :model="tea_sfw_appraise" show-message>
					<evan-form-item label="安装人:">
						<input class="form-input" placeholder-class="form-input-placeholder" v-model="tea_sfw_appraise.install" placeholder="请输入安装人员姓名" />
					</evan-form-item>
					<evan-form-item label="申请人：">
						<input class="form-input" type="text" placeholder-class="form-input-placeholder" v-model="tea_sfw_appraise.proposer" placeholder="请输入申请人姓名" />
					</evan-form-item>
					<evan-form-item label="意见反馈: ">
						<textarea style="height: 200rpx; margin-top: 24rpx; margin-left: 10rpx; font-size: 14px;" v-model="tea_sfw_appraise.feedback" placeholder="请输入安装反馈意见" />
					</evan-form-item>
					<evan-form-item label="满意度："><uni-rate  v-model="tea_sfw_appraise.value2" @change="onChange"></uni-rate></evan-form-item>
				</evan-form>
				<button type="default" @click="btn_appraise()">提交</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import tTable from '@/components/t-table/t-table.vue';
import tTh from '@/components/t-table/t-th.vue';
import tTr from '@/components/t-table/t-tr.vue';
import tTd from '@/components/t-table/t-td.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniRate from '@/components/uni-rate/uni-rate.vue';
export default {
	components: { tTable, tTh, tTr, tTd, uniPopup, uniRate },

	data() {
		return {
			hideRequiredAsterisk: false,
			active: 1,
			// table表格数据
			tableList: [],
			tea_sfw_appraise: {
				install: '',
				proposer: '',
				value2: 1,
				feedback:''
			}
		};
	},
	created() {
		this.select_message();
	},
	methods: {
		onChange(e) {
			console.log('rate发生改变:' + JSON.stringify(e));
		},
		// 获取数据
		select_message() {
			var data = 'tea_software';
			uni.getStorage({
				key: 'teacher_account',
				success: async res => {
					const { data: row } = await this.$http({
						url: `/teacher/steps?api=${data}&account=${res.data}`,
						method: 'GET'
					});
					console.log(row.data)
					this.tableList = row.data;
				}
			});
		},
		open(e) {
			this.$refs.popup.open();
			this.tea_sfw_appraise.id = e
		},
		async btn_appraise(){
			const {data:res} = await this.$http({
				url:'/teacher/appraise',
				method:'POST',
				data:this.tea_sfw_appraise
			})
			if(res.status == 201){
				uni.showToast({
					title: '评价成功',
					icon: 'none'
				});
				this.$refs.popup.close();
				this.select_message()
			}
		}
	}
};
</script>

<style lang="scss" scoped>
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
</style>
