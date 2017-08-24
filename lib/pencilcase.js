(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("pencilcase", [], factory);
	else if(typeof exports === 'object')
		exports["pencilcase"] = factory();
	else
		root["pencilcase"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pencilcase = undefined;

var _Pencilcase = __webpack_require__(6);

var _Pencilcase2 = _interopRequireDefault(_Pencilcase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Pencilcase = _Pencilcase2.default;

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pencilcase = function () {
	function Pencilcase(element, editButton) {
		_classCallCheck(this, Pencilcase);

		this._name = 'Pencilcase';
		this.svg = element;
		this.textEl = null;
		this.pt = this.svg.createSVGPoint();
		this.editButton = editButton;
		this.init();
		this.state = {
			tool: null,
			x: null,
			y: null,
			text: ""
		};
	}

	_createClass(Pencilcase, [{
		key: "text",
		value: function text() {}
	}, {
		key: "init",
		value: function init() {
			var showTools = this.showTools.bind(this);
			this.editButton.addEventListener("click", function (a) {
				showTools();
			});
			var style = document.createElement('style');
			style.type = 'text/css';
			var keyFrames = '\
	.blink {\
	  animation: blink-animation 1s steps(2, start) infinite;\
	  -webkit-animation: blink-animation 1s steps(2, start) infinite;\
	}\
	@keyframes blink-animation {\
	    to {\
	        visibility: hidden;\
	    }\
	}\
	@-webkit-keyframes blink-animation {\
	    to {\
	        visibility: hidden;\
	    }\
	}';
			style.innerHTML = keyFrames;
			//.replace(/A_DYNAMIC_VALUE/g, "180deg");
			document.getElementsByTagName('head')[0].appendChild(style);
		}
	}, {
		key: "toolClick",
		value: function toolClick(evt) {
			var pt = this.pt; // Created once for document
			pt.x = evt.clientX;
			pt.y = evt.clientY;

			// The cursor point, translated into svg coordinates
			var cursorpt = pt.matrixTransform(this.svg.getScreenCTM().inverse());

			this.state.x = cursorpt.x;
			this.state.y = cursorpt.y;

			console.log("(" + cursorpt.x + ", " + cursorpt.y + ")");

			if (this.state.tool === "text") {
				this.state.text = "";
				this.textEl = null;
				// this.createLine(x1, y1, x2, y2, color, w)
				var textInput = document.getElementById('pcase-textblinker');

				if (!textInput) {
					console.log("");
					textInput = document.createElementNS('http://www.w3.org/2000/svg', 'line');
					textInput.setAttribute('stroke', 'black');
					textInput.setAttribute('stroke-width', 1);

					textInput.setAttribute("id", "pcase-textblinker");
				}

				textInput.setAttribute('x1', cursorpt.x);
				textInput.setAttribute('y1', cursorpt.y - 10);
				textInput.setAttribute('x2', cursorpt.x);
				textInput.setAttribute('y2', cursorpt.y + 10);

				this.svg.appendChild(textInput);
				textInput.classList.add('blink');
			}
		}
	}, {
		key: "toolMouseDown",
		value: function toolMouseDown() {}
	}, {
		key: "toolMouseUp",
		value: function toolMouseUp() {}
	}, {
		key: "toolKeyPress",
		value: function toolKeyPress(evt) {
			this.state.text += evt.key;

			this.textEl = this.textEl || document.createElementNS('http://www.w3.org/2000/svg', 'text');
			this.textEl.setAttribute('x', this.state.x);
			this.textEl.setAttribute('y', this.state.y);
			this.textEl.setAttribute('fill', '#000');
			this.textEl.textContent = this.state.text;
			this.svg.appendChild(this.textEl);
		}
	}, {
		key: "toolKeyDown",
		value: function toolKeyDown(evt) {
			console.log(evt.keyCode);
			switch (evt.keyCode) {
				case 8:
					this.state.text = this.state.text.slice(0, -1);
					break;
				case 13:
					var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
					this.textEl.appendChild(tspan);
					// tspan.setAttribute('dy', "-0.5cm");
					// this.textEl =  tspan;
					// this.state.text = 
					break;
				default:
					console.log('default');
			}

			this.textEl = this.textEl || document.createElementNS('http://www.w3.org/2000/svg', 'text');
			this.textEl.setAttribute('x', this.state.x);
			this.textEl.setAttribute('y', this.state.y);
			this.textEl.setAttribute('fill', '#000');
			this.textEl.textContent = this.state.text;
			this.svg.appendChild(this.textEl);
		}
	}, {
		key: "showTools",
		value: function showTools() {
			var _this = this;

			var svg = this.svg;

			var toolClick = this.toolClick.bind(this);
			var toolMouseDown = this.toolMouseDown.bind(this);
			var toolMouseUp = this.toolMouseUp.bind(this);
			var toolKeyDown = this.toolKeyDown.bind(this);
			var toolKeyPress = this.toolKeyPress.bind(this);

			svg.addEventListener("click", toolClick);
			svg.addEventListener("mousedown", toolMouseDown);
			svg.addEventListener("mouseup", toolMouseUp);
			document.addEventListener("keydown", toolKeyDown);
			document.addEventListener("keypress", toolKeyPress);

			document.body.insertAdjacentHTML('afterbegin', '<div style=position:fixed;top:0;left:0;height:100%;width:100%;margin:0;padding:0;background:#d0d0d0 id=pcase-olverlay><div style="border:1px solid;display:flex"><ul id=pcase-tools style="list-style:none;display:flex;border:1px solid;justify-content:space-between;padding:0"><li><button data-tool=text style="border-radius:3px;padding:10px;border:none;margin:5px;box-shadow:1px 1px 5px #343434">Text</button><li><button data-tool=line style="border-radius:3px;padding:10px;border:none;margin:5px;box-shadow:1px 1px 5px #343434">Line</button><li><button data-tool=arrow style="border-radius:3px;padding:10px;border:none;margin:5px;box-shadow:1px 1px 5px #343434">Arrow</button></ul></div><div style=background:#fff id=pcase-svg-container></div><button id=pcase-olverlay-done>Done Editing</button></div>');

			var overlay = document.getElementById('pcase-olverlay');
			var svgContainer = document.getElementById('pcase-svg-container');
			// const svgClone = svg.cloneNode(true)
			var placeholderDiv = document.createElement('div');
			var tools = document.getElementById('pcase-tools');

			var toolButtons = tools.getElementsByTagName('button');

			var clickTool = this.clickTool.bind(this);

			Array.from(toolButtons).forEach(function (button) {
				button.style = 'background: #ededed; border: 1px solid #ccc; -webkit-box-shadow: 1px 1px 2px #ccc; -moz-box-shadow: 1px 1px 2px #ccc; box-shadow: 1px 1px 2px #ccc; padding: 10px 30px; border-radius: 3px; cursor: pointer;';
				button.addEventListener("click", function (evt) {
					evt.target.style = "outline: none; -webkit-box-shadow: inset 0px 0px 4px #ccc; -moz-box-shadow: inset 0px 0px 4px #ccc; box-shadow: inset 0px 0px 4px #ccc;  border: 1px solid #ccc;  padding: 10px 30px; border-radius: 3px;";
					clickTool(evt.target.dataset.tool, svg);
				});
			});

			svg.parentNode.insertBefore(placeholderDiv, svg);

			svgContainer.appendChild(svg);

			document.getElementById('pcase-olverlay-done').addEventListener('click', function () {

				var insertedNode = placeholderDiv.parentNode.insertBefore(svg, placeholderDiv);

				svg.removeEventListener("click", toolClick, false);
				svg.removeEventListener("mousedown", toolMouseDown, false);
				svg.removeEventListener("mouseup", toolMouseUp, false);
				document.removeEventListener("keydown", toolKeyDown, false);
				document.removeEventListener("keypress", toolKeyPress, false);

				_this.state.tool = null;

				overlay.parentNode.removeChild(overlay);
			});
		}
	}, {
		key: "initText",
		value: function initText() {
			this.state.tool = "text";
			this.svg.style.cursor = "text";
		}
	}, {
		key: "initLine",
		value: function initLine() {
			this.state.tool = "line";
			this.svg.style.cursor = "crosshair";
		}
	}, {
		key: "initArrow",
		value: function initArrow() {
			this.state.tool = "arrow";
			this.svg.style.cursor = "all-scroll";
		}
	}, {
		key: "clickTool",
		value: function clickTool(tool, svg) {
			switch (tool) {
				case 'text':
					this.initText();
					break;
				case 'line':
					this.initLine();
					break;
				case 'arrow':
					this.initArrow();
					break;
				default:
					breaks;
			}
		}
	}, {
		key: "name",
		get: function get() {
			return this._name;
		}
	}]);

	return Pencilcase;
}();

exports.default = Pencilcase;
module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=pencilcase.js.map