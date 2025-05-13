const Task = require('./task');

class Urgency {
    constructor(importanceValue = 5, deadline = new Date(), constraints = []) {
        this.initImportance(importanceValue);
        this.deadline = new Date(deadline);
        this.constraints = constraints; // e.g., ['time limit', 'must finish today']
        // console.log(importanceValue);
        console.log(this.importance);

        
    }

    initImportance(value) {
        // console.log(value);

        if (value >= 1 && value <= 10) {
            this.updateImportance(value)
        } else {
            this.updateImportance(5)
        }
    }

    getImportance() {
        return this.importance;
    }

    updateImportance(value) {
        // console.log(value);

        if (value >= 1 && value <= 10) {
          this.importance = value;
        //   console.log(this.importance);
        } else {
          throw new Error("Importance must be between 0 and 10.");
        }
    }

    updateImportanceByDeadline() {
        const today = new Date();
        value = this.deadline - today;
        updateImportance(value);
    }
    
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }

    rankManageability(task) {
        const urgency = task.urgency();
        const flexibility = task.getCategory().getDefaultFlex();
    }

    prioritizeTasks(tasks) {
        // Example: Sort tasks based on 'deadline' property
        return tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
}

module.exports = Urgency;
