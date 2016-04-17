'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CategoryCtrl = function () {
	function CategoryCtrl(view) {
		(0, _classCallCheck3.default)(this, CategoryCtrl);

		this.view = document.querySelector(view);
		this.bindObject();
		this.events();
	}

	(0, _createClass3.default)(CategoryCtrl, [{
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