class date {
	constructor(day = 1, month = 1) {
		this.day = day;
		this.month = month;
	}
	changeDate(day, month) {
		this.day = day;
		this.month = month;
	}
	getDay() {
		return this.day;
	}
	getMonth() {
		return this.month;
	}
}

module.exports = date;