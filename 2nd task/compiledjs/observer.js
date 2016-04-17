
'use strict';

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Observer = function () {
    function Observer() {
        (0, _classCallCheck3.default)(this, Observer);

        this.listeners = new _map2.default();
    }

    (0, _createClass3.default)(Observer, [{
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