Logger = require('../utils/Logger.js')
TodoActions = require('../actions/TodoActions')
riot = require('riot')

TodoApiUtils = function() {

  const apiUri = 'https:/simple-todo-rest-api.herokuapp.com/todos/'

  const headers = {
    'content-type': 'application/json;charset=UTF-8'
  }

  riot.observable(this)

  this.on('todo_fetch', function() {
    Logger.logging(this.constructor.name, 'todo_fetch')
    fetch(apiUri)
      .then(function(response){
      return response.json() 
    }).then(function(json){
      let todos = parseResponseJsonAsMap(json)
      TodoActions.fillTodos(todos)
    })
  }),

  this.on('todo_removeCompleted', function(){
    Logger.logging(this.constructor.name, 'todo_removeCompleted')
    fetch(apiUri + '/search/completed?completed=true')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      let completedTodos = parseResponseJsonAsList(json)
      console.log(completedTodos)
      return completedTodos
    }).then(function(completedTodos){
      for(let todo of completedTodos) {
        TodoActions.destroy(todo)  
      }
    })
  }) 

  this.on('todo_add', function(todo) {
    Logger.logging(this.constructor.name, 'todo_add', todo)
    fetch(apiUri, {
      method: 'POST',
      headers: headers,
      body: toBody(todo)
    }).then(function(response) {
      console.log('responce:')
      console.log(response)
    })
  })
  
  this.on('todo_toggle', function(todo) {
    console.log(toBody(todo))
    Logger.logging(this.constructor.name, 'todo_toggle', todo)
    fetch(apiUri + todo.id, {
      method: 'PUT',
      headers: headers,
      body: toBody(todo)
    }).then(function(response){
      console.log('responce:')
      console.log(response)
    })
  })

  this.on('todo_remove', function(todo) {
    Logger.logging(this.constructor.name, 'todo_remove', todo)
    fetch(apiUri + todo.id, {
      method: 'DELETE',
      headers: headers,
    }).then(function(response) {
      console.log('responce:')
      console.log(response)
   })
  })

  function parseResponseJsonAsMap(json) {
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

  function parseResponseJsonAsList(json) {
    let todos = [] 
    for (let resTodo of json._embedded.todos) {
      let todo = {
        id: resTodo.id,
        title: resTodo.name,
        done: resTodo.completed
      }
      todos.push(todo)
    }
    return todos
  }
  function toBody(todo) {
    return JSON.stringify({
      id: todo.id,
      name: todo.title,
      completed: todo.done
    })
  }
  function toBodyWithOutId(todo) {
    return JSON.stringify({
      name: todo.title,
      completed: todo.done
    })
  }
}
module.exports = TodoApiUtils
