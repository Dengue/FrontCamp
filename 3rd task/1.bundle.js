webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Observer = __webpack_require__(3);
	var CategoryCtrl = __webpack_require__(4);
	var NewsTemplate = __webpack_require__(5);
	var NewsReader = __webpack_require__(6);

	module.exports = function Start() {
		_classCallCheck(this, Start);

		window.Globals = window.Globals || {};
		window.Globals.observer = new Observer();

		var catCtrl = new CategoryCtrl('#category-panel');
		var newsTemplate = new NewsTemplate();
		var newReader = new NewsReader('#news', newsTemplate);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
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

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, ".site{\r\n\twidth:90%;\r\n\tmargin: 0 auto;\r\n}\r\n.category-panel {\r\n\twidth: 70%;\r\n\tmargin: 0 auto;\r\n\tmargin-top: 100px;\r\n}\r\n.category-wrap{\r\n\tposition: absolute;\r\n\twidth: 350px;\r\n}\r\n.controls{\r\n\tmax-width: 350px;\r\n\tmargin: 0 auto;\r\n\tposition: relative;\r\n}\r\n.input{\r\n\tcolor: #777;\r\n\tpadding: 10px;\r\n\tfont-size: 16px;\r\n\tbackground: #fff;\r\n\tdisplay: block;\r\n\tborder: 1px solid #ccc;\r\n\tcursor: pointer;\r\n\t-webkit-box-sizing: border-box;\r\n\t-moz-box-sizing: border-box;\r\n\tbox-sizing: border-box;\r\n\t-webkit-transition: all 0.5s ease;\r\n\t-moz-transition: all 0.5s ease;\r\n\t-o-transition: all 0.5s ease;\r\n\ttransition: all 0.5s ease;\r\n}\r\n.controls:hover .input,\r\n.category:hover{\r\n\tcolor:#7D3B3B;\r\n\tbackground:#D6D6D6;\r\n\ttext-indent: 50%;\r\n}\r\n.tip-1{\r\n\tcursor: pointer;\r\n\tcolor: #777;\r\n\tfont-size: 10px;\r\n\tposition: absolute;\r\n\ttop:15px;\r\n\tleft: 5%;\r\n\topacity: 0;\r\n\t-webkit-transition: all 0.4s ease;\r\n\t-moz-transition: all 0.4s ease;\r\n\t-o-transition: all 0.4s ease;\r\n\ttransition: all 0.4s ease;\t\r\n}\r\n.controls:hover .tip-1{\r\n\t-webkit-transition-delay: 0.5s;\r\n\t-moz-transition-delay: 0.5s;\r\n\t-o-transition-delay: 0.5s;\r\n\ttransition-delay: 0.5s;\r\n\topacity: 1;\r\n}\r\n.categories {\r\n\tmax-height: 0;\r\n\toverflow: hidden;\r\n\tmargin-top:5px;\r\n\tposition: absolute;\r\n\twidth:350px;\r\n\t-webkit-transition: all 1s ease;\r\n\t-moz-transition: all 1s ease;\r\n\t-o-transition: all 1s ease;\r\n\ttransition: all 1s ease;\r\n}\r\n.categories-show{\r\n\tmax-height: 999px;\r\n}\r\n.categories ul {\r\n\tcolor: #777;\r\n\tfont-size: 16px;\r\n\tbackground: #fff;\r\n\tdisplay: block;\r\n\tcursor: pointer;\r\n}\r\n.category{\r\n\tborder-width: 1px 1px 0px;\r\n\tborder-style: solid;\r\n\tborder-color: #ccc;\r\n\tpadding: 10px;\r\n\t-webkit-transition: all 0.5s ease;\r\n\t-moz-transition: all 0.5s ease;\r\n\t-o-transition: all 0.5s ease;\r\n\ttransition: all 0.5s ease;\r\n}\r\n.category:last-child{\r\n\tborder: 1px solid #ccc;\r\n\tpadding: 10px;\r\n}\r\n.news-panel{\r\n\tmargin-top: 150px;\r\n}\r\n.blank{\r\n\tmin-height: 150px;\r\n\tmax-height: 500px;\r\n\ttext-align: center;\r\n\tcolor:#777;\r\n\tfont-size: 60px;\r\n\tline-height: 60px;\r\n}\r\n.news-columns{\r\n\t-moz-column-count: 3;\r\n\t-moz-columns: 3;\r\n\t-webkit-columns:3;\r\n\tcolumns: 3;\r\n}\r\n.event{\r\n\t-webkit-column-break-inside: avoid;\r\n          page-break-inside: avoid;\r\n               break-inside: avoid;\r\n\tborder-top: 1px solid #f2f2f2;\r\n    margin-top: 12px;\r\n    padding-top: 14px;\r\n    margin-bottom: 8px;\r\n    clear: both;\r\n}\r\n.photo{\r\n\tmargin: 0 0 10px 10px;\r\n\tfloat: right;\r\n    clear: right;\r\n    display: inline;\r\n    width: 190px;\r\n}\r\n.credit {\r\n\tfont-size: 8px;\r\n    line-height: 10px;\r\n    color: #999;\r\n    margin-bottom: 7px\r\n}\r\n.caption {\r\n\tfont-size: 10px;\r\n    line-height: 12px;\r\n    color: #666;\r\n}\r\n.story-header {\r\n\tmargin-bottom: 6px;\r\n}\r\n.kicker {\r\n\tfont-size: 10px;\r\n    line-height: 12px;\r\n    color: #000;\r\n    font-weight: 500;\r\n    text-transform: uppercase;\r\n    margin-bottom: 5px;\r\n}\r\n.story-header > h2 {\r\n\tfont-weight: 300;\r\n\tfont-size: 20px;\r\n    line-height: 22px;\r\n    font-family: \"nyt-cheltenham\", georgia, \"times new roman\", times, serif;\r\n}\r\n.story-header > h2 > a{\r\n\tcolor: #999;\r\n}\r\n.byline {\r\n\tmargin: 5px 0 -4px 0;\r\n\tfont-size: 10px;\r\n    line-height: 12px;\r\n    color: #808080;\r\n    font-family: georgia, \"times new roman\", times, serif;\r\n}\r\n.summery {\r\n\tfont-family: georgia, \"times new roman\", times, serif;\r\n\tmargin: 0 0 1em 0;\r\n}\r\n\r\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
]);