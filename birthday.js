class Birthday {
	constructor(type, red = 255, green = 192, blue = 203, flexibility = 5, day = 1, month = 1, details = "No extra details") {
		this.categories = new category(type, red, green, blue, flexibility);
		this.color = [this.colorLim(red), this.colorLim(green), this.colorLim(blue)];
		this.day = day;
		this.month = month;
		this.details = details;
		this.notes = [];
		this.extraConsider = []; // e.g., transportation, sleep, eating
	}

	// Limit colors to 0–255
	colorLim(num) {
		return Math.min(255, Math.max(0, Number(num)));
	}

	// Add a note to the birthday
	addNotes(note) {
		this.notes.push(note);
	}

	// Add extra details (append string)
	addExtraDetails(extra) {
		this.details += " " + extra;
	}

	// Assign category and update color based on it
	assignCategoryAndColor(category) {
		this.categories = category;
		this.color = this.categories.getColor().map(this.colorLim);
	}

	// Add extra consideration (class or object with type and time/description)
	addTimeConsiderations(type, time) {
		const newConsider = new extraConsideration(type, time);
		this.extraConsider.push(newConsider);
	}

	// Getters
	getCategory() {
		return this.categories;
	}

	getColor() {
		return this.color;
	}

	getNotes() {
		return this.notes;
	}

	getExtraConsiderations() {
		return this.extraConsider;
	}

	getDetails() {
		return this.details;
	}

	getDay() {
		return this.day;
	}

	getMonth() {
		return this.month;
	}
}
