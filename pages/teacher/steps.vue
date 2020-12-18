<template>
	<view class="">
		<!-- 手风琴效果 -->
		<uni-collapse accordion="true" @change="change">
			<view style="width: 100%;height: 56px; border-bottom: 3rpx solid #e1e0e3;"><view style="font-size: 24px; font-weight: 500;padding: 24rpx;">申请服务分类：</view></view>
			<uni-collapse-item title="修改密码">
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
								<t-td><button @click="edit(item)" style="font-size: 14px;">查看</button></t-td>
							</t-tr>
						</t-table>
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="软件正版化">
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
								<t-td><button @click="edit(item)" style="font-size: 14px;">查看</button></t-td>
							</t-tr>
						</t-table>
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="虚拟服务器开通">
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
								<t-td><button @click="edit(item)" style="font-size: 14px;">查看</button></t-td>
							</t-tr>
						</t-table>
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="服务器托管">
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
								<t-td><button @click="edit(item)" style="font-size: 14px;">查看</button></t-td>
							</t-tr>
						</t-table>
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="端口开通">
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
								<t-td><button @click="edit(item)" style="font-size: 14px;">查看</button></t-td>
							</t-tr>
						</t-table>
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="网络故障">
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
								<t-td><button @click="edit(item)" style="font-size: 14px;">查看</button></t-td>
							</t-tr>
						</t-table>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<uni-popup ref="popup" type="top">
			<view class="">
				<view style="width: 100%;height: 56px; border-bottom: 3rpx solid #e1e0e3;"><view style="font-size: 24px; font-weight: 500;padding: 24rpx;">申请进度：</view></view>
				<uni-steps :options="options" direction="column" :active="active"></uni-steps>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniRate from '@/components/uni-rate/uni-rate.vue';
export default {
	components: { uniCollapse, uniCollapseItem, uniPopup, uniRate },

	data() {
		return {
			value2: 2,
			// 申请进度步骤
			options: [],
			// 申请进度完成到哪一步
			active: 1,
			// table表格数据
			tableList: [],
			// 记录查看的是哪一个分类
			type_status: 0
		};
	},
	methods: {
		onChange(e) {
			console.log('rate发生改变:' + JSON.stringify(e));
		},
		change(e) {
			var data = 'tea_port';
			this.type_status = e[0];
			switch (e[0]) {
				case 0:
					data = 'tea_password';
					break;
				case 1:
					data = 'tea_software';
					break;
				case 2:
					data = 'tea_virtual';
					break;
				case 3:
					data = 'tea_host';
					break;
				case 4:
					data = 'tea_port';
					break;
				case 5:
					data = 'tea_fault';
					break;
			}
			uni.getStorage({
				key: 'teacher_account',
				success: async res => {
					const { data: row } = await this.$http({
						url: `/teacher/steps?api=${data}&account=${res.data}`,
						method: 'GET'
					});
					this.tableList = row.data;
				}
			});
		},
		async edit(item) {
			this.open();
			uni.showToast({
				title: item.id,
				icon: 'none'
			});
			var data = 'tea_port';
			switch (this.type_status) {
				case 0:
					data = 'tea_password';
					break;
				case 1:
					data = 'tea_software';
					break;
				case 2:
					data = 'tea_virtual';
					break;
				case 3:
					data = 'tea_host';
					break;
				case 4:
					data = 'tea_port';
					break;
				case 5:
					data = 'tea_fault';
					break;
			}
			item.type = data;
			const { data: res } = await this.$http({
				url: `/teacher/step`,
				method: 'POST',
				data: item
			});
			console.log(res.data[0]);
			const row = res.data[0];
			var update_time = row.update_time.slice(0, 10);
			var time = ' ';
			console.log('status:' + row.status);
			switch (row.status) {
				case -1:
					time = ' ';
					this.active = 1;
					break;
				case 0:
					time = ' ';
					this.active = 2;
					break;
				case 1:
					time = update_time;
					this.active = 3;
					break;
			}
			this.options = [
				{ title: '提交申请', desc: row.creat_time },
				{ title: '审核人审核', desc: row.creat_time },
				{ title: '已确认', desc: time },
				{ title: '完成修改/开通', desc: time }
			];
			console.log(this.active);
		},
		open() {
			this.$refs.popup.open();
		}
	}
};
</script>

<style></style>
