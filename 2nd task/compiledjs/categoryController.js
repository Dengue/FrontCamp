'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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