<todo>

  <h3>{ opts.title }</h3>

  <ul>
    <li each={ task in todo.tasks }>
      <todo-item task={ task } ></todo-item>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text } >Add</button>
    <button type="button" disabled={ todo.completed == 0 } onclick={ remove }>Clear</button>  
  </form>

  <script>
    RiotControl = require('../riotcontrol')
    TodoActions = require('../actions/TodoActions')

    var self = this
    self.disabled = true
    self.todo = {}

    self.on('mount', function() {
      TodoActions.fetchTodos()
    })
 
    // Register a listener to store change events
    RiotControl.on('todo_changed', function(todo){
      self.todo = todo
      self.update()
    })

    edit(e) {
      self.text = e.target.value
    }

    add(e) {
      e.preventDefault()
      if(self.text) {
        // Trigger event to all stores registered in central dispache.
        // This allows loosely coupled stores/componets to react same events.
        TodoActions.add(self.text)  
      }
    }

    remove(e) {
      TodoActions.removeCompleted()
    }

  </script>
</todo>
