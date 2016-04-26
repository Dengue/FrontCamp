'use strict';
module.exports = class Observer {  
    constructor() {
        this.listeners = new Map();
    }
    addListener(object, label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push({
            context:object,
            callback:callback
        });
    }
    removeListener(object, label, callback) {
        let listeners = this.listeners.get(label),
        index;

        if (listeners && listeners.length) {
            for(index = 0; index < listeners.length; index ++){
                if(listeners[index].context === object && listeners[index].callback === callback){
                    listeners.splice(index, 1);
                    this.listeners.set(label, listeners);
                    return true;
                }
            }
        }
        return false;
    }
    emit(label, ...args) {
        let listeners = this.listeners.get(label);

        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener.callback.call(listener.context,...args); 
            });
            return true;
        }
        return false;
    }
}