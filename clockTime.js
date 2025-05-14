class clockTime {
	constructor(hour = 0, minute = 0, am = true) {
		this.hour = hour;
		this.minute = minute;
		this.am = am
	}
	changeTime(hour, minute, am) {
		this.hour = hour;
		this.minute = minute;
		this.am = am;
	}
	getHour() {
		return this.hour;
	}
	getMinute() {
		return this.minute;
	}
	getAM() {
		return this.am;
	}
}

module.exports = clockTime;