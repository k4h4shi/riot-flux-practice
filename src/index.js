// modules
riot = require('riot')
TodoStore = require('./stores/TodoStore.js')
TodoApiUtils = require('./apis/TodoApiUtils.js')
RiotControl = require('./riotcontrol.js')

// tags
require('./tag/app.tag')
require('./tag/todo.tag')
require('./tag/todo-item.tag')

// add store to RiotControl then mount riot
RiotControl.addStore(new TodoStore)
RiotControl.addStore(new TodoApiUtils)
riot.mount('*');
