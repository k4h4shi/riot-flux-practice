var RiotControl = {
  _stores: [],
  addStore: function(store) {
    this._stores.push(store)
  },
  trigger() {
    var args = [].slice.call(arguments)
      this._stores.forEach(function(el){
        el.trigger.apply(null, args)
      })
  },
  on(ev, cb) {
    this._stores.forEach(function(el) {
      el.on(ev, cb)
    })
  },
  off(ev, cb) {
    this._stores.forEach(function(el) {
      if (cb) {
        el.off(ev, cb)
      } else {
        el.off(ev)
      }
    })
  },
  one(ev, cb) {
    this._stores.forEach(function(el) {
      el.one(ev, cl)
    })
  },
}
module.exports = RiotControl
