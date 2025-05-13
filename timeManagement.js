class TimeManagement {
	constructor() {
		this.tips = {
			breaks: [
				"Use the Pomodoro technique: 25 minutes focus, 5 minutes break.",
				"Take a 15-minute walk after every 90 minutes of work.",
				"Stretch your body during breaks to improve blood flow and reset focus."
			],
			adjustments: [
				"Review your schedule weekly to adapt for new tasks or shifting priorities.",
				"Prioritize tasks using urgency and importance.",
				"Use time blocking to allocate chunks of time to related tasks."
			]
		};
	}

	// Method to provide all tips or category-specific tips
	provideTips(category = "all") {
		if (category === "all") {
			return [...this.tips.breaks, ...this.tips.adjustments];
		} else if (this.tips[category]) {
			return this.tips[category];
		} else {
			return ["No tips available for that category."];
		}
	}

	// Optionally allow adding tips dynamically
	addTip(category, tip) {
		if (this.tips[category]) {
			this.tips[category].push(tip);
		} else {
			this.tips[category] = [tip];
		}
	}
}
