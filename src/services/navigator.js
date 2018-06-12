import EventEmitter from './event-emitter'

class Navigator extends EventEmitter {
  eventTypes = {
    stack: 'stack',
    networkFailed: 'network-failed'
  }
  navigateStack(screen, params) {
    this.emit(this.eventTypes.stack, screen, params)
  }

  showNetworkError() {
    this.emit(this.eventTypes.networkFailed)
  }
}

export default new Navigator()
