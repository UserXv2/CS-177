const Urgency = require('./urgency');

class Task {
  constructor({
    title,
    deadline,
    urgency = new Urgency
  }) {
    console.log(title);
    this.title = title;
    this.deadline = deadline;
    this.urgency = urgency;
  }
    updateUrgency(urgency) {
        this.urgency = urgency;
        this.priority = urgency.prioritizeTasks();
    }
}

module.exports = Task;
