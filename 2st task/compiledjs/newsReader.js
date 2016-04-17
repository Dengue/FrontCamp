'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewsReader = function () {
	function NewsReader(view, template) {
		(0, _classCallCheck3.default)(this, NewsReader);

		this.view = document.querySelector(view);
		this.template = template;
		this.events();
	}

	(0, _createClass3.default)(NewsReader, [{
		key: 'events',
		value: function events() {
			Globals.observer.addListener(this, 'category-changed', this.fetchNews);
			Globals.observer.addListener(this, 'update-news', this.updateView);
		}
	}, {
		key: 'fetchNews',
		value: function fetchNews(category) {
			var url = this.getUrl(category, this.defaults.type, this.defaults.apiKey);
			fetch(url).then(function (response) {
				return response.json();
			}).then(this.fillNews.bind(this));
		}
	}, {
		key: 'getUrl',
		value: function getUrl(category, type, key) {
			return 'http://api.nytimes.com/svc/topstories/v1/' + category + '.' + type + '?api-key=' + key;
		}
	}, {
		key: 'fillNews',
		value: function fillNews(_ref) {
			var num_results = _ref.num_results;
			var results = _ref.results;

			if (num_results === 0) {
				return;
			}
			var newsColumns = document.createElement('div');
			newsColumns.classList.add('news-columns');
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = (0, _getIterator3.default)(results), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var event = _step.value;

					console.log(event);
					newsColumns.innerHTML += this.template.returnEvent(event);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			Globals.observer.emit('update-news', newsColumns);
		}
	}, {
		key: 'updateView',
		value: function updateView(news) {
			this.view.innerHTML = '';
			this.view.appendChild(news);
		}
	}, {
		key: 'defaults',
		get: function get() {
			return {
				type: 'json',
				apiKey: '0a17a254e77a1b706036d559a65f98c7:14:74945871'
			};
		}
	}]);
	return NewsReader;
}();