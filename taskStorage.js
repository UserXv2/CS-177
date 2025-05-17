const fs = require('fs');
const path = './tasks.json';

function loadTasks() {
  if (!fs.existsSync(path)) return { tasks: [] };
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function saveTasks(taskList) {
  fs.writeFileSync(path, JSON.stringify({ tasks: taskList }, null, 2));
}

function addTask(task) {
  console.log(task.startTime)
  const all = loadTasks();
  // console.log(all)
  task.startDate = task.startDate['month'] + '-' + task.startDate['day'];
  task.deadline = task.deadline['month'] + '-' + task.deadline['day'];
  if(task.startTime['am'] === false) {
    // hour: 8, minute: 31
    task.startTime = task.startTime['hour'] + ': ' + task.startTime['minute'] + ' ' + 'pm';
  } else {
    task.startTime = task.startTime['hour'] + ': ' + task.startTime['minute'] + ' ' + 'am';
  }
  if(task.endTime['am'] === false) {
    task.endTime = task.endTime['hour'] + ': ' + task.endTime['minute'] + ' ' + 'pm';
  } else {
    task.endTime = task.endTime['hour'] + ': ' + task.endTime['minute'] + ' ' + 'am';
    
  }

  all.tasks.push(task.toJSON());
  saveTasks(all.tasks);
}

function getTasksByCategory(categoryName) {
  const all = loadTasks();
  return all.tasks.filter(task => task.category === categoryName);
}

module.exports = {
  loadTasks,
  saveTasks,
  addTask,
  getTasksByCategory
};
