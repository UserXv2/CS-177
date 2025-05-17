// const category = require('./category');


//functions (for limiting how far some integers can be)
function limit (num, max, min) {
	let newNum = Number(num);
	newNum = Math.min(max, Math.max(min, num));
	return newNum;
}
function colorLim (color) {
	return limit(color, 255, 0)
}
function flexibilityLim (flexibility) {
	return limit(flexibility, 10, 1)
}

//Category Class	variables: type (category name), color (red, blue, green), defaultFlex (defualt flexibility)
class category {
	// Constructor (defualt values are: type = defualt, color = white, default flexibility = 5)
	constructor(type = "defualt", red = 0, green = 0, blue = 0, flexibility = 5) {
		this.categoryType = type;
		this.color = [colorLim(red), colorLim(green), colorLim(blue)];
		this.defualtFlex = flexibilityLim(flexibility);
	}

	//return the category's variables (type, color, defualt fleibility)
	getTypeName() {
		return this.categoryType;
	}
	getColor() {
		return this.color;
	}
	getDefaultFlex() {
		return this.defualtFlex;
	}

	// edits pre-existing variables 
	editTypeName(newCategoryType) {
		this.categoryType = newCategoryType;
	}
	editDefualtFlex(newDefualtFlex) {
		this.defualtFlex = flexibilityLim(newDefualtFlex);
	}
	// edits individual aspects of color variables
	giveColorToCategory(red, green, blue) {
		this.color = [colorLim(red), colorLim(green), colorLim(blue)];
	}

	// edits all attributes of a category at once
	setCategory(type, red, green, blue, flexibility) {
		this.editTypeName(type);
		this.giveColorToCategory(red, green, blue);
		this.editDefualtFlex(flexibility);
	}

	// DEBUG PURPOSES: prints each attribute of a category
	/*
	printCategory() {
		console.log(this.categoryType + "\n" + this.color + "\n" + this.defualtFlex)
	}
	*/

	toJSON() {
		return {
		  cType: this.categoryType,
		  color: this.color,
		  flex: this.defualtFlex
		};
	  }
}
//creates a library for storing each category, by defualt, it will have the defualt category
var categoryLibrary = [ new category() ];

// DEBG PURPOSES: create a library to store each category and see if it works properly
/*
var cat1 = new category();
var cat2 = new category("School work", 255,275, -1, 1);
var cat3 = new category("Work", -200, 255, 300, 20)

var categoryLibraryTest = [cat1, cat2, cat3];

for (let i = 0; i < categoryLibrary.length; i++) {
	categoryLibrary[i].printCategory();
}
*/

module.exports = category;