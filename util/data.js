export default {
	// 格式化时间 YY-MM--DD
	getFormatDate() {
		var nn = new Date();
		var seperator = "-";
		var year = nn.getFullYear();
		var month = nn.getMonth() + 1;
		var nowDate = nn.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (nowDate >= 0 && nowDate <= 9) {
			nowDate = "0" + nowDate;
		}
		const newDate = year + seperator + month + seperator + nowDate;
		return newDate;
	}
}
