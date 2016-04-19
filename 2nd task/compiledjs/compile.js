'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CategoryCtrl = function () {
	function CategoryCtrl(view) {
		_classCallCheck(this, CategoryCtrl);

		this.view = document.querySelector(view);
		this.bindObject();
		this.events();
	}

	_createClass(CategoryCtrl, [{
		key: 'bindObject',
		value: function bindObject() {
			this.objects = {};
			for (var object in this.__objects) {
				var selector = this.__objects[object];
				this.objects[object] = this.view.querySelector(selector);
			}
		}
	}, {
		key: 'toggleShow',
		value: function toggleShow(event) {
			var categories = this.objects.categories;
			if (categories.classList.contains('categories-show')) {
				categories.classList.remove('categories-show');
			} else {
				categories.classList.add('categories-show');
			}
		}
	}, {
		key: 'changeCategory',
		value: function changeCategory(_ref) {
			var target = _ref.target;

			if (!target.classList.contains('category')) {
				return;
			}
			if (target.innerHTML === this.objects.input.innerHTML) {
				return;
			}
			this.objects.input.innerHTML = target.innerHTML;
			Globals.observer.emit('category-changed', target.innerHTML.toLowerCase());
		}
	}, {
		key: 'events',
		value: function events() {
			var _this = this;

			var self = this;
			this.objects.controls.addEventListener('click', this.toggleShow.bind(this));
			this.objects.categories.addEventListener('mouseleave', function (event) {
				return _this.objects.categories.classList.remove('categories-show');
			});
			this.objects.categories.addEventListener('click', this.changeCategory.bind(this));
		}
	}, {
		key: '__objects',
		get: function get() {
			return {
				controls: '.controls',
				input: '.input',
				categories: '.categories'
			};
		}
	}, {
		key: 'options',
		get: function get() {
			return {
				category: '.category'
			};
		}
	}]);

	return CategoryCtrl;
}();

'use strict';

var NewsReader = function () {
	function NewsReader(view, template) {
		_classCallCheck(this, NewsReader);

		this.view = document.querySelector(view);
		this.template = template;
		this.events();
	}

	_createClass(NewsReader, [{
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
		value: function fillNews(_ref2) {
			var num_results = _ref2.num_results;
			var results = _ref2.results;

			if (num_results === 0) {
				return;
			}
			var newsColumns = document.createElement('div');
			newsColumns.classList.add('news-columns');
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

var NewsTemplate = function () {
	function NewsTemplate() {
		_classCallCheck(this, NewsTemplate);
	}

	_createClass(NewsTemplate, [{
		key: 'returnEvent',
		value: function returnEvent(event) {
			return '<div class=\'event\'>\n\t\t\t\t\t' + this.returnPhoto(event.multimedia) + '\n\t\t\t\t\t' + this.returnText(event) + '\n\t\t\t\t</div>\n\t\t\t';
		}
	}, {
		key: 'returnPhoto',
		value: function returnPhoto(multimedia) {
			var photoGroup = multimedia[2];
			if (photoGroup) {
				return '<div class=\'photo\'>\n\t\t\t\t\t\t<div class=\'image\'><img height=\'127\' width=\'190\' src = ' + photoGroup.url + '></img></div>\n\t\t\t\t\t\t<h4 class=\'credit\'>' + photoGroup.copyright + '<h4>\n\t\t\t\t\t\t<p class=\'caption\'>' + photoGroup.caption + '</p>\n\t\t\t\t\t</div>\n\t\t\t\t';
			}
			return '';
		}
	}, {
		key: 'returnText',
		value: function returnText(event) {
			return '<div class=\'story-header\'>\n\t\t\t\t\t<h3 class=\'kicker\'>' + event.kicker + '</h3>\n\t\t\t\t\t<h2><a href= ' + event.url + '>' + event.title + '</a></h2>\n\t\t\t\t\t<h3 class=\'byline\'>' + event.byline + '</h3>\n\t\t\t\t</div>\n\t\t\t\t<p class=\'summery\'>\n\t\t\t\t\t' + event.abstract + '\n\t\t\t\t</p>\n\t\t\t';
		}
	}]);

	return NewsTemplate;
}();

'use strict';

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

var Globals = Globals || {};

document.addEventListener("DOMContentLoaded", function (event) {
	Globals.observer = new Observer();

	var catCtrl = new CategoryCtrl('#category-panel');
	var newsTemplate = new NewsTemplate();
	var newReader = new NewsReader('#news', newsTemplate);
});
