<todo-item>
  <label>
    <input type="checkbox" onclick={ toggle } checked={ opts.task.done }>
    <span>{ opts.task.title }</span>
    <button type="button" onclick={ remove }>x</button>
  </label>
  <script>
    RiotControl = require('../riotcontrol')
    TodoActions = require('../actions/TodoActions')
  
    toggle(e) {
      TodoActions.toggle(opts.task)
      return true
    }

    remove(e) {
      TodoActions.destroy(opts.task)
    }

  </script>
</todo-item>
