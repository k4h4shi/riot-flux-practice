// imports
Logger = require('../utils/Logger.js')
riot = require('riot')

TodoStore = function() {
  riot.observable(this) 

  this.todo = {}

  this.on('todo_fill', function(tasks) {
    Logger.logging(this.constructor.name, 'todo_fill', tasks)
    this.todo = { tasks: tasks, completed: 0 }
    this.trigger('todo_changed', this.todo)
  })

  this.on('todo_add', function(newTask) {
    Logger.logging(this.constructor.name, 'todo_add', newTask)
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
    newTask['id'] = id
    this.todo.tasks[id] = newTask
    this.trigger('todo_changed', this.todo)
  })
  
  this.on('todo_toggle', function(task) {
    Logger.logging(this.constructor.name, 'todo_toggle', task)
    this.todo.tasks[task.id].done = !this.todo.tasks[task.id].done
    this.todo.completed = 0
    for (var id in this.todo.tasks) {
        if (this.todo.tasks[id].done) {
          this.todo.completed++
        }
    }
    this.trigger('todo_changed', this.todo)
  })

  this.on('todo_remove', function(task) {
    Logger.logging(this.constructor.name, 'todo_remove', task)
    delete this.todo.tasks[task.id]

    this.todo.completed = 0
    for (var id in this.todo.tasks) {
        if (this.todo.tasks[id].done) {
          this.todo.completed++
        }
    }
    this.trigger('todo_changed', this.todo)
  }) 

  this.on('todo_removeCompleted', function() {
    Logger.logging(this.constructor.name, 'todo_removeCompleted')
    for (let id in this.todo.tasks) {
      if (this.todo.tasks[id].done) {
        delete this.todo.tasks[id] 
      }
    }
    this.trigger('todo_changed', this.todo)
  })

}
module.exports = TodoStore
