
export default class EventEmitter {
  constructor() {
    this._events = {}
  }

  on(event, listener) {
    if (!(this._events[event])) {
      this._events[event] = []
    }
    this._events[event].push(listener)
  }

  emit(event, ...args) {
    if (!(this._events[event])) {
      return
    }

    this._events[event].map((listener) => {
      listener.apply(this, args)
    })
  }

  removeListener(event, listener) {
    if (!(this._events[event])) {
      return
    }

    if (typeof this._events[event] === 'object') {
      const idx = this._events[event].indexOf(listener)

      if (idx > -1) {
        this._events[event].splice(idx, 1)
      }
    }
  }

  once(event, listener) {
    this.on(event, function handler(...args) {
      this.removeListener(event, handler)
      listener.apply(this, args)
    })
  }
}
