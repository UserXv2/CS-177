class extraConsideration {
	constructor(type = 'none', minutes = 0) {
		this.type = type;
		this.minutes = minutes;
	}
	setType() {
		this.type = type;
	}
	setMinutes() {
		this.miute = minutes;
	}
	getType(){
		return this.type;
	}
	getMinutes() {
		return this.minutes;
	}
}

module.exports = extraConsideration;