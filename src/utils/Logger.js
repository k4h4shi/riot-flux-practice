Logger = {
  logging: function(clazz, action, resource = undefined) {
    let message = clazz + ' ' + action + ' is executed:'  
    console.log(message)
    if (resource !== undefined) {
      console.log(resource)
    }
  }
}
module.exports = Logger
