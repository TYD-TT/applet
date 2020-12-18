<template>
	<view class="stu_content">
		<view class="title"><h2>{{content_data.title}}</h2></view>
		<view class="content">
			<view class="grace-rich-text">
						<rich-text type="text" :nodes="content_data.content"></rich-text>
					</view>
			<view class="img">
				<p
					style="font-size: 15px;
			font-weight: 600;"
				>
					详情步骤请查看微信公众号：
				</p>
				<p><image src="../../static/img/ewm.jpg" mode="" style="width: 200px; height: 200px;display: block;margin: 5px auto;"></image></p>
			</view>
		</view>
	</view>
</template>

<script>
	var graceRichText = require("../../static/richText.js");
	export default{
		data(){
			return{
				content_data:{
					title:'',
					content:''
				},
				id:'',
			}
		},
		methods:{
			
		},
		created() {
			
		},
		mounted() {
		},
		onLoad: async function (options) {
			var that = this
			that.id = options.id

				const {data:res} = await that.$http({
					url:`/select/content/${that.id}`,
					methods:'GET'
				})
				that.content_data = res.data[0]
		}
	}
</script>

<style lang="scss" scoped>
	
.stu_content {
	width: 98vw;
	margin: 5px auto;
	.title {
		width: 100%;
		text-align: center;
	}
	.content {
		width: 98%;
		margin: 10px auto;
		.img{
			width: 100%;
		}
	}
}
p {
	line-height: 30px;
}
._h1 {
	font-size: 20px;
	font-weight: 600;
}
._h2 {
	font-size: 18px;
	font-weight: 600;
}
._h3 {
	font-size: 16px;
	font-weight: 600;
}
._h4 {
	font-size: 15px;
	font-weight: 600;
}
._h5 {
	font-size: 14px;
	font-weight: 500;
}
._h6 {
	font-size: 13px;
	font-weight: 500;
}
._p {
	font-size: 15px;
}
._span {
	margin-left: 24px;
}
</style>
