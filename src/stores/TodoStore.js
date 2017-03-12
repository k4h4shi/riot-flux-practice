riot = require('riot')
TodoStore = function() {
  riot.observable(this) 
  
  this.todo = {}

  this.on('todo_add', function(newTask) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
    newTask['id'] = id
    this.todo.tasks[id] = newTask
    this.trigger('todo_changed', this.todo)
  })
  
  this.on('todo_toggle', function(id) {
    this.todo.tasks[id].done = !this.todo.tasks[id].done
    this.todo.completed = 0
    for (var id in this.todo.tasks) {
        if (this.todo.tasks[id].done) {
          this.todo.completed++
        }
    }
    this.trigger('todo_changed', this.todo)
  })

  this.on('todo_remove', function(id) {
    delete this.todo.tasks[id]

    this.todo.completed = 0
    for (var id in this.todo.tasks) {
        if (this.todo.tasks[id].done) {
          this.todo.completed++
        }
    }
    this.trigger('todo_changed', this.todo)
  }) 

  this.on('todo_removeCompleted', function() {
    for (let id in this.todo.tasks) {
      if (this.todo.tasks[id].done) {
        delete this.todo.tasks[id] 
      }
    }
    this.trigger('todo_changed', this.todo)
  })

  this.on('todo_init', function() {
    this.todo = { tasks: {}, completed: 0 }
    this.trigger('todo_changed', this.todo)
  })

}
module.exports = TodoStore
