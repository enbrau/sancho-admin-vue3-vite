export default function(app) {
  return new Promise((resolve) => {
    app.config.errorHandler = (err, vm, info) => {
      console.error(err)
    }
    app.config.warnHandler = (msg, vm, trace) => {
      console.warn(msg)
    }
    resolve()
  })
}