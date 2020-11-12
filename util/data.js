export default {
	// 格式化时间 YY-MM--DD
	getFormatDate() {
		var nn = new Date();
		var seperator = "-";
		var year = nn.getFullYear();
		var month = nn.getMonth() + 1;
		var nowDate = nn.getDate();
		var hours  = nn.getHours()
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (nowDate >= 0 && nowDate <= 9) {
			nowDate = "0" + nowDate;
		}
		if (hours >= 0 && hours <= 9) {
			hours = "0" + hours;
		}
		const newDate = year + seperator + month + seperator + nowDate + ' ' +hours;
		return newDate;
	}
}
