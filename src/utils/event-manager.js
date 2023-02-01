export function EventManager() {

    this.events = new Map();

    //emit
    this.emit = function (eventName, data) {
        this.events.get(eventName)(data);
    }
    //subscribe
    this.subscribe = function (eventName, callBack) {
        this.events.set(eventName, callBack);
    }
    //unscubscribe
    this.unSubscribe = function (eventName, callBack) {
        this.events.delete(eventName);
    }
}