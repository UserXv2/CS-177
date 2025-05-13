// also found in category.js
// /* //functions (for limiting how far some integers can be)
function limit (num, max, min) {
	let newNum = Number(num);
	newNum = Math.min(max, Math.max(min, num));
	return newNum;
}
function colorLim (color) {
	return limit(color, 255, 0)
}
// */

//Tasks Class	
//Variables: recurring (true or false), extra considerations (empty by defualt), progress
//			 currentColor, notes (empty by defualt), detials, timeToComplete (not set by defualt)
//Classes within: categories (category), start date and deadline (date), start and end time (clockTime)
const category = require('./category');


class Tasks {
	constructor(type, red = 0, green = 0, blue = 0, flexibility, details = "No Extra Details", startDate = new date(), endDate = new date(), startTime = new clockTime(), endTime = new clockTime(), progress = 0, recurrs = false) {
		this.recurring = recurrs;
		this.categories = new category(type, red, blue, green, flexibility);
		this.extraConsider = [];
		this.progress = progress

		this.startDate = startDate;
		this.deadline = endDate;
		this.startTime = startTime;
		this.endTime = endTime;

		this.color = [colorLim(red), colorLim(green), colorLim(blue)];
		this.notes = [];
		this.details = details;

		this.timeToComplete = -1;
	}

	// Set variables for progres, dates, clockTimes, current color, detials
	setProgress(progress) {
		this.progress = progress;
	}
	setStartDate(startDate) {
		this.startDate = startDate;
	}
	setDeadline(endDate) {
		this.deadline = endDate;
	}
	setStartTime(startTime) {
		this.startTime = startTime;
	}
	setEndTime(endTime) {
		this.endTime = endTime;
	}
	// is given specific RGB values
	setColor(red, green, blue) {
		this.color = [colorLim(red), colorLim(green), colorLim(blue)];
	}
	setDetails(details) {
		this.detials = detials;
	}

	// Estimate the time of the task (can be more convoluted, but defualt one is just amount of time 
	// between start and end times)		returns time estimated in minutes
	estimateTime() {
		// !! Add more if can think of
		
		// Simple estimation (time from start to end)
		var estimatedHours = this.endTime.getHour();
		if (this.endTime.getAM() ==  this.startTime.getAM()) {
			estimatedHours -= this.startTime.getHour();
		}
		else {
			estimatedHours += (12 - this.startTime.getHour());
		}
		var estimatedMinutes = this.endTime.getMinute() - this.startTime.getMinute();
		this.timeToComplete = estimatedMinutes + (60 * estimatedHours);
		return this.timeToComplete;
	}

	// adds a note (a type of class) to the array called notes
	addNotes(note) {
		this.notes.push(note);
	}
	// removes a note (through index) from an array called notes
	removeNote(index) {
		if ((index == 0) && (this.notes.length > 0)) {
		    this.notes.shift()
		}
		else if (index < this.notes.length) {
			this.notes.splice(index, index);
		}
	}

	// adds on to details (appends)
	addExtraDetails(newAddition) {
		this.details += " " + newAddition;
	}
	// assigns current category and current color
	assignCategoryAndColor(categories) {
		this.categories = categories;
		var newColor = categories.getColor();
		this.color = [colorLim(newColor[0]), colorLim(newColor[1]), colorLim(newColor[2])];
	}
	// sets reccurence (true or false)
	setReccurence(recurrs) {
		this.recurring = recurrs;
	}
	// returns progress
	trackProgress() {
		return this.progress;
	}
	// adding a time consideration (a class) to the extraConsider array
	addTimeConsideration(type, time) {
		var newConsider = new extraConsideration(type, time)
		this.extraConsider.push(newConsider)
	}
	// removes a consideration (through index) from extraConsider array
	removeConsideration(index) {
		if ((index == 0) && (this.extraConsider.length > 0)) {
			this.extraConsider.shift()
		}
		else if (index < this.extraConsider.length) {
			this.extraConsider.splice(index, index)
		}
	}

	// Return varialbes for categories, specific or all considerations, dates, clockTimes, 
	// current color, defualt color (from categories variable), specific or all notes, detials
	getCategory() {
		return this.categories;
	}
	getSpecificConsider(index) {
		if (index < this.extraConsider.length) {
			return this.extraConsider[index];
		}
	}
	getAllConsider() {
		return this.extraConsider;
	}
	getStartDate() {
		return this.startDate;
	}
	getDeadline() {
		return this.deadline;
	}
	getStartTime() {
		return this.startTime;
	}
	getEndTime() {
		return this.endTime;
	}
	getCurrentColor() {
		return this.color;
	}
	getDefualtColor() {
		return this.categories.getColor();
	}
	getSpecificNote(index) {
		if (index < this.notes.length) {
			return this.notes[index];
		}
	}
	getAllNotes() {
		return this.notes;
	}
	getDetails() {
		return this.details;
	}
}
/*
Include
	Variables (from constructors)
		Change individual day and month to startDate
		startTime
		endTime
		startDate
		timeToComplete
	set functions 
		progress
		startDate
		deadline
		startTime
		endTime
		currentColor
		detials
		recurring
	remove note function
	remove time consideration funcction
	get functions 
		category
		startDate
		deadline
		startTime
		endTime
		current color
		defualt color (from category)
		detials
	get functions for specific or all 
		extra considerations array
		notes array
*/

module.exports = Tasks;