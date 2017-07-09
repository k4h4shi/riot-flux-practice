Logger = require('../utils/Logger.js')
TodoActions = require('../actions/TodoActions')
riot = require('riot')

TodoApiUtils = function() {

  const apiUri = 'https://simple-todo-rest-api.herokuapp.com/todos/'

  const header = {
    'content-type': 'application/json;charset=UTF-8'
  }

  riot.observable(this)

  this.on('todo_fetch', function() {
    Logger.logging(this.constructor.name, 'todo_fetch')
    fetch(apiUri)
      .then(function(response){
      return response.json() 
    }).then(function(json){
      let todos = parseResponseJson(json)
      TodoActions.fillTodos(todos)
    })
  })

  this.on('todo_add', function(todo) {
    Logger.logging(this.constructor.name, 'todo_add', todo)
    fetch(apiUri, {
      method: 'POST',
      headers: header,
      body: toBody(todo)
    })
  })
  
  this.on('todo_toggle', function(todo) {
    Logger.logging(this.constructor.name, 'todo_toggle', todo)
    fetch(apiUri + todo.id, {
      method: 'PUT',
      headers: header,
      body: toBody(todo)
    })
  })

  this.on('todo_remove', function(todo) {
    Logger.logging(this, 'todo_remove', todo)
    fetch(apiUri + todo.id, {
      method: 'DELETE',
      headers: header
    })
  })

  function parseResponseJson(json) {
    let todos = {}
    for (let resTodo of json._embedded.todos) {
      let todo = {
        id: resTodo.id,
        title: resTodo.name,
        done: resTodo.completed
      }
      todos[resTodo.id] = todo
    }
    return todos
  }
  function toBody(todo) {
    return JSON.stringify({
      name: todo.title,
      completed: todo.done
    })
  }
}
module.exports = TodoApiUtils
