

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = function () {
    function Observer() {
        _classCallCheck(this, Observer);

        this.listeners = new Map();
    }

    _createClass(Observer, [{
        key: 'addListener',
        value: function addListener(object, label, callback) {
            this.listeners.has(label) || this.listeners.set(label, []);
            this.listeners.get(label).push({
                context: object,
                callback: callback
            });
        }
    }, {
        key: 'removeListener',
        value: function removeListener(object, label, callback) {
            var listeners = this.listeners.get(label),
                index = void 0;

            if (listeners && listeners.length) {
                for (index = 0; index < listeners.length; index++) {
                    if (listeners[index].context === object && listeners[index].callback === callback) {
                        listeners.splice(index, 1);
                        this.listeners.set(label, listeners);
                        return true;
                    }
                }
            }
            return false;
        }
    }, {
        key: 'emit',
        value: function emit(label) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var listeners = this.listeners.get(label);

            if (listeners && listeners.length) {
                listeners.forEach(function (listener) {
                    var _listener$callback;

                    (_listener$callback = listener.callback).call.apply(_listener$callback, [listener.context].concat(args));
                });
                return true;
            }
            return false;
        }
    }]);

    return Observer;
}();