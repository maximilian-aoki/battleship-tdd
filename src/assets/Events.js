class Events {
  constructor() {
    this.events = {};
  }

  on(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  off(eventName, fn) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i += 1) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
        }
      }
    }
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn(data);
      });
    }
  }
}

const events = new Events();
export { Events, events };
