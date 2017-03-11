riot = require('riot')
TodoStore = function() {
  riot.observable(this) 
  
  this.todos = {}

  this.on('todo_add', function(newTodo) {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
    newTodo['id'] = id
    this.todos[id] = newTodo
    this.trigger('todo_changed', this.todos)
  })
  
  this.on('todo_toggle', function(id) {
    this.todos[id].done = !this.todos[id].done
    this.trigger('todo_changed', this.todos)
  })

  this.on('todo_remove', function(id) {
    delete this.todos[id]
    this.trigger('todo_changed', this.todos)
  }) 

  this.on('todo_removeCompleted', function() {
    for (let id in this.todos) {
      if (this.todos[id].done) {
        delete this.todos[id] 
      }
    }
    this.trigger('todo_changed', this.todos)
  })

  this.on('todo_init', function() {
    this.trigger('todo_changed', this.todos)
  })

}
module.exports = TodoStore
