Logger = require('../utils/Logger.js')
RiotControl = require('../riotcontrol')

TodoActions = {
  name:  "TodoActions",

  fetchTodos() {
    Logger.logging(this.name, 'todo_fetch')
    RiotControl.trigger('todo_fetch')
  },
  fillTodos(todos) {
    Logger.logging(this.name, 'todo_fill', todos)
    RiotControl.trigger('todo_fill', todos)
  },
  add(text) {
    Logger.logging(this.name, 'todo_add', text)
    RiotControl.trigger('todo_add', { title: text, done: false })
  },
  toggle(task) {
    Logger.logging(this.name, 'todo_toggle', task)
    RiotControl.trigger('todo_toggle', task)
  },
  destroy(task) {
    Logger.logging(this.name, 'todo_remove', task)
    RiotControl.trigger('todo_remove', task)
  },
  removeCompleted() {
    Logger.logging(this.name, 'todo_removeCompleted')
    RiotControl.trigger('todo_removeCompleted')
  }
  
}
module.exports = TodoActions
