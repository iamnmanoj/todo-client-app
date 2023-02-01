// Import stylesheets
// Write Javascript code!
export function View(eventManager) {

  this.appLayout = {
    container: document.querySelector('.todo-container')
  }

  this.eventManager = eventManager;

  this.init = function () {
    this.eventManager.subscribe('dataLoadCompleted', (data) => {
      this.renderTasks(data)
    })
  };

  this.renderTasks = function (tasks) {
    tasks.forEach(({ name }) => {
      this.insertTaskIntoDOM(name)
    });
  };

  this.prepareTask = function (taskName) {
    const taskNode = document.createElement('span');
    taskNode.innerText = taskName;
    return taskNode;
  };

  this.appendHTMLElemNode = function (node) {
    this.appLayout.container.appendChild(node);
  };

  this.insertTaskIntoDOM = function (taskName) {
    this.appendHTMLElemNode(this.prepareTask(taskName));
  }
}
