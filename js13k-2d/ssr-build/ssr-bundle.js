module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/js13k-2d/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Link = exports.Route = exports.Router = exports.route = exports.getCurrentUrl = exports.subscribers = undefined;

var _preact = __webpack_require__("KM04");

var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return (0, _preact.cloneElement)(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(_preact.Component);

var Link = function Link(props) {
	return (0, _preact.h)('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return (0, _preact.h)(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

exports.subscribers = subscribers;
exports.getCurrentUrl = getCurrentUrl;
exports.route = route;
exports.Router = Router;
exports.Route = Route;
exports.Link = Link;
exports.default = Router;
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "E1C8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _preact = __webpack_require__("KM04");

var _js13k2d = __webpack_require__("GBUi");

var _js13k2d2 = _interopRequireDefault(_js13k2d);

var _style = __webpack_require__("ZAL5");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable new-cap */


var Point = _js13k2d2.default.Point,
    Texture = _js13k2d2.default.Texture,
    Frame = _js13k2d2.default.Frame,
    Sprite = _js13k2d2.default.Sprite;

/*
const sprites = document.getElementById('info');

const dbgRenderInfo = gl.getExtension('WEBGL_debug_renderer_info');
const info = gl.getParameter(
    dbgRenderInfo ? dbgRenderInfo.UNMASKED_RENDERER_WEBGL : gl.VENDOR
);
*/

var atlasImg = function atlasImg() {
	var canvas = document.createElement('canvas');
	var size = 32;
	var half = size / 2;
	canvas.width = 96;
	canvas.height = 32;
	var ctx = canvas.getContext('2d');

	var offset = 0;

	ctx.lineWidth = size / 16;
	ctx.fillStyle = '#cccccc';
	ctx.strokeStyle = '#000000';
	ctx.beginPath();

	ctx.moveTo(offset + half, half);
	for (var angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / 5) {
		ctx.lineTo(offset + half - Math.sin(angle) * half * 0.9, half - Math.cos(angle) * half * 0.9);
	}

	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	offset += size;

	ctx.beginPath();

	ctx.moveTo(offset + 3, 3);
	ctx.lineTo(offset + size - 3, 3);
	ctx.lineTo(offset + size - 3, size - 3);
	ctx.lineTo(offset + 3, size - 3);

	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	offset += size;

	ctx.beginPath();

	ctx.moveTo(offset + 3, 3);
	ctx.lineTo(offset + 29, 3);
	ctx.lineTo(offset + 29, 8);
	ctx.lineTo(offset + 8, 8);
	ctx.lineTo(offset + 8, 14);
	ctx.lineTo(offset + 20, 14);
	ctx.lineTo(offset + 20, 18);
	ctx.lineTo(offset + 8, 18);
	ctx.lineTo(offset + 8, 29);
	ctx.lineTo(offset + 3, 29);

	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	return canvas;
};

var _ref = (0, _preact.h)('canvas', { id: 'view' });

var Home = function (_Component) {
	_inherits(Home, _Component);

	function Home() {
		var _temp, _this, _ret;

		_classCallCheck(this, Home);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onmousedown = function (event) {
			_this.add = true;
			event.preventDefault();
		}, _this.ontouchstart = function (event) {
			_this.add = true;
			event.preventDefault();
		}, _this.onmouseup = function (event) {
			_this.add = false;
			event.preventDefault();
		}, _this.ontouchend = function (event) {
			_this.add = false;
			event.preventDefault();
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Home.prototype.componentDidMount = function componentDidMount() {
		var _Texture,
		    _this2 = this;

		var view = document.getElementById('view');

		this.add = false;

		/*
        let add = false;
        view.onmousedown = event => {
            event.preventDefault();
            add = true;
        };
        view.ontouchstart = event => {
            add = true;
            event.preventDefault();
        };
        view.onmouseup = event => {
            add = false;
            event.preventDefault();
        };
        view.ontouchend = event => {
            add = false;
            event.preventDefault();
        };
        */

		var scale = window.devicePixelRatio === 1 ? 1 : 2;
		var scene = (0, _js13k2d2.default)(view, { scale: scale });
		// const scene = Renderer(view, { scale: window.devicePixelRatio });
		// const scene = Renderer(view);
		var gl = scene.gl;


		var maskSize = Math.min(scene.gl.canvas.width, scene.gl.canvas.height);

		scene.background(1, 1, 1, 0);
		scene.camera.at.set(maskSize / 2, maskSize / 2);
		scene.camera.to.set(0.5);

		var logoMask = function logoMask() {
			var canvas = document.createElement('canvas');
			canvas.width = maskSize;
			canvas.height = maskSize;
			var ctx = canvas.getContext('2d');

			ctx.fillStyle = '#ffffff';
			ctx.beginPath();

			ctx.moveTo(maskSize / 2, maskSize / 2);
			for (var angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / 5) {
				ctx.lineTo(maskSize / 2 - Math.sin(angle) * maskSize / 2.5, maskSize / 2 - Math.cos(angle) * maskSize / 2.5);
			}

			ctx.closePath();
			ctx.fill();

			var _ctx$getImageData = ctx.getImageData(0, 0, maskSize, maskSize),
			    data = _ctx$getImageData.data;

			return function (x, y) {
				return data[(y * maskSize + x) * 4] > 0;
			};
		};

		/*
        const logo = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
             ctx.lineWidth = 0;
            ctx.strokeStyle = '#3066a9';
            ctx.fillStyle = '#3066a9';
            ctx.beginPath();
             ctx.moveTo(32, 32);
            for (
                let angle = 0;
                angle < Math.PI * 2;
                angle += (Math.PI * 2) / 5
            ) {
                ctx.lineTo(
                    32 - Math.sin(angle) * 30,
                    32 - Math.cos(angle) * 30
                );
            }
             ctx.closePath();
            ctx.stroke();
            ctx.fill();
             const image = new Image();
            image.src = canvas.toDataURL('image/png');
            document.body.appendChild(image);
        };
         logo();
        */

		var atlas = Texture(scene, atlasImg(), 0.5, (_Texture = {}, _Texture[gl.TEXTURE_MAG_FILTER] = gl.LINEAR, _Texture[gl.TEXTURE_MIN_FILTER] = gl.LINEAR, _Texture));
		atlas.anchor = Point(0.5);

		var bFrame = Frame(atlas, Point(), Point(32));
		var qFrame = Frame(atlas, Point(32, 0), Point(32));
		var fFrame = Frame(atlas, Point(64, 0), Point(32));
		var frames = [atlas, bFrame, qFrame, fFrame];
		// const frames = [bFrame];

		var mask = logoMask();
		var sprs = [];

		var len = 0;
		var cl = 0;

		var addSprite = function addSprite(a) {
			if (len % 250 === 0) {
				cl++;
			}
			len += a;

			var layer = scene.layer(cl);

			for (var i = 0; i < a; i++) {
				var sprite = Sprite(frames[i % 4]);
				//const sprite = Sprite(frames[i % 1]);

				var x = 0;
				var y = 0;

				while (!mask(x, y)) {
					x = ~~(maskSize * Math.random());
					y = ~~(maskSize * Math.random());
				}

				sprite.position.set(x, y);
				sprite.scale.set(maskSize / 1200);
				sprite.tint = Math.random() * 0xffffff;
				sprite.rotation = Math.random() * Math.PI * 2;
				sprite.dr = (0.5 - Math.random()) * 0.1;
				sprite.trans = !Math.round(Math.random() + 0.3);
				// sprite.trans = false;
				sprs.push(sprite);
				layer.add(sprite);
			}
		};

		var loop = function loop() {
			if (len < 3000 || _this2.add) addSprite(25);

			sprs.forEach(function (sprite) {
				sprite.rotation += sprite.dr;
				if (sprite.trans) {
					if (sprite.alpha > 0.6) {
						sprite.alpha -= 0.001;
					} else {
						sprite.trans = false;
					}
				}
			});

			scene.camera.angle += 0.005;

			scene.render();

			return [{
				title: 'sprites',
				value: len < 10000 ? len : Number((len / 1000).toFixed(1)) + 'k'
			}];
		};

		this.props.start(loop);
	};

	/*
                <h1>Home</h1>
                <p>This is the Home component.</p>
    */

	Home.prototype.render = function render() {
		return (0, _preact.h)(
			'div',
			{
				'class': _style2.default.home,
				onMouseDown: this.onmousedown,
				onTouchStart: this.ontouchstart,
				onMouseUp: this.onmouseup,
				onTouchEnd: this.ontouchend
			},
			'Click or touch to add sprites',
			_ref
		);
	};

	return Home;
}(_preact.Component);

exports.default = Home;

/***/ }),

/***/ "GBUi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var t = function t(_t, n, e) {
  this.l = _t, this.c = n, this.n = e, this.p = null;
};t.prototype.r = function () {
  this.p ? this.p.n = this.n : this.l.h = this.n, this.n && (this.n.p = this.p);
};var n = function n() {
  this.h = null;
};n.prototype.add = function (n) {
  var e = new t(this, n, this.h);return this.h && (this.h.p = e), this.h = e, e;
}, n.prototype.i = function (t) {
  for (var n = this.h; n;) {
    t(n.c), n = n.n;
  }
};var e = function e(t) {
  this.z = t, this.o = new n(), this.t = new n();
};e.prototype.add = function (t) {
  t.remove(), t.layer = this, t.n = (function (t) {
    return 1 !== t.alpha || 0 === t.frame.atest;
  }(t) ? this.t : this.o).add(t);
};var i = function i(t, n) {
  var r = _extends({ antialias: !1, alpha: !1, scale: 1 }, n),
      a = r.alpha ? 1 : 770,
      o = r.scale,
      s = t.getContext("webgl", r),
      c = s.getExtension("ANGLE_instanced_arrays"),
      u = function u(t, n) {
    var e = s.createShader(n);return s.shaderSource(e, t), s.compileShader(e), e;
  },
      h = s.createProgram();s.attachShader(h, u("attribute vec2 g;\nattribute vec2 a;\nattribute vec2 t;\nattribute float r;\nattribute vec2 s;\nattribute vec4 u;\nattribute vec4 c;\nattribute float z;\nuniform mat4 m;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nv=u.xy+g*u.zw;\ni=c.abgr;\nvec2 p=(g-a)*s;\nfloat q=cos(r);\nfloat w=sin(r);\np=vec2(p.x*q-p.y*w,p.x*w+p.y*q);\np+=a+t;\ngl_Position=m*vec4(p,z,1);}", 35633)), s.attachShader(h, u("precision mediump float;\nuniform sampler2D x;\nuniform float j;\nvarying vec2 v;\nvarying vec4 i;\nvoid main(){\nvec4 c=texture2D(x,v);\ngl_FragColor=c*i;\nif(j>0.0){\nif(c.a<j)discard;\ngl_FragColor.a=1.0;};}", 35632)), s.linkProgram(h);var f = function f(t, n, e) {
    var i = s.createBuffer();s.bindBuffer(t, i), s.bufferData(t, n, e || 35044);
  },
      l = function l(t, n, e, i, r, a, o) {
    var u = s.getAttribLocation(h, t);s.enableVertexAttribArray(u), s.vertexAttribPointer(u, n, a || 5126, !!o, e || 0, r || 0), i && c.vertexAttribDivisorANGLE(u, i);
  };f(34963, new Uint8Array([0, 1, 2, 2, 1, 3])), f(34962, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1])), l("g", 2);var v = new ArrayBuffer(3407820),
      p = new Float32Array(v),
      x = new Uint32Array(v);f(34962, v, 35048), l("a", 2, 52, 1), l("s", 2, 52, 1, 8), l("r", 1, 52, 1, 16), l("t", 2, 52, 1, 20), l("u", 4, 52, 1, 28), l("c", 4, 52, 1, 44, 5121, !0), l("z", 1, 52, 1, 48);var y,
      d,
      g,
      b,
      m,
      w,
      P = function P(t) {
    return s.getUniformLocation(h, t);
  },
      z = P("m"),
      A = P("x"),
      j = P("j"),
      E = 0,
      F = function F() {
    E && (w && (s.useProgram(h), s.uniformMatrix4fv(z, !1, y), s.viewport(0, 0, d, g), s.clear(16640), s.activeTexture(33984), s.enable(3042), s.enable(2929), w = !1), s.blendFunc(m ? 1 : a, m ? 0 : 771), s.depthFunc(m ? 513 : 515), s.bindTexture(3553, b.tex), s.uniform1i(A, b.tex), s.uniform1f(j, m ? b.atest : 0), s.bufferSubData(34962, 0, p.subarray(0, 13 * E)), c.drawElementsInstancedANGLE(4, 6, 5121, 0, E), E = 0);
  },
      S = function S(t) {
    if (t.visible) {
      65535 === E && F();var n = t.frame,
          e = n.uvs,
          i = t.anchor || n.anchor;b.tex !== n.tex && (b.tex && F(), b = n);var r = 13 * E;p[r++] = i.x, p[r++] = i.y, p[r++] = t.scale.x * n.size.x, p[r++] = t.scale.y * n.size.y, p[r++] = t.rotation, p[r++] = t.position.x, p[r++] = t.position.y, p[r++] = e[0], p[r++] = e[1], p[r++] = e[2], p[r++] = e[3], x[r++] = ((16777215 & t.tint) << 8 | 255 * t.alpha & 255) >>> 0, p[r++] = t.layer.z, E++;
    }
  },
      D = new e(0),
      O = [D],
      L = { gl: s, camera: { at: i.Point(), to: i.Point(), angle: 0 }, background: function background(t, n, e, i) {
      void 0 === i && (i = 1), s.clearColor(t, n, e, i);
    }, layer: function layer(t) {
      var n = O.find(function (n) {
        return n.z === t;
      });return n || (n = new e(t), O.push(n), O.sort(function (t, n) {
        return n.z - t.z;
      })), n;
    }, add: function add(t) {
      D.add(t);
    }, render: function render() {
      g = t.clientHeight * o, t.width = d = t.clientWidth * o, t.height = g;var n = L.camera,
          e = n.at,
          i = n.to,
          r = n.angle,
          a = e.x - d * i.x,
          s = e.y - g * i.y,
          c = Math.cos(r),
          u = Math.sin(r),
          h = 2 / d,
          f = -2 / g;y = [c * h, u * f, 0, 0, -u * h, c * f, 0, 0, 0, 0, -1e-5, 0, (e.x * (1 - c) + e.y * u) * h - 2 * a / d - 1, (e.y * (1 - c) - e.x * u) * f + 2 * s / g + 1, 0, 1], w = !0, b = { tex: null }, m = !0, O.forEach(function (t) {
        return t.o.i(function (t) {
          return S(t);
        });
      }), F(), m = !1;for (var l = O.length - 1; l >= 0; l--) {
        O[l].t.i(function (t) {
          return S(t);
        });
      }F();
    } };return L.render(), L;
};i.Point = function () {
  function t(t, n) {
    if (!(this instanceof i.Point)) return new i.Point(t, n);this.set(t, n);
  }return t.prototype.set = function (t, n) {
    return this.x = t || 0, this.y = n || (0 !== n ? this.x : 0), this;
  }, t.prototype.copy = function (t) {
    return this.x = t.x, this.y = t.y, this;
  }, t;
}();var r = function t(n, e, r, a) {
  if (!(this instanceof t)) return new t(n, e, r, a);this.size = i.Point().copy(r), this.anchor = i.Point().copy(a || n.anchor), this.uvs = [e.x / n.size.x, e.y / n.size.y, r.x / n.size.x, r.y / n.size.y], this.t = n;
},
    a = { atest: { configurable: !0 }, tex: { configurable: !0 } };a.atest.get = function () {
  return this.t.atest;
}, a.tex.get = function () {
  return this.t.tex;
}, Object.defineProperties(r.prototype, a);i.Frame = r, i.Texture = function t(n, e, r, a) {
  if (!(this instanceof t)) return new t(n, e, r, a);this.size = i.Point(e.width, e.height), this.anchor = i.Point(), this.uvs = [0, 0, 1, 1], this.atest = r || (0 === r ? 0 : 1);var o = _extends({ 10240: 9728, 10241: 9728, 10242: 33071, 10243: 33071 }, a),
      s = n.gl;this.tex = s.createTexture(), s.bindTexture(3553, this.tex), Object.keys(o).forEach(function (t) {
    return s.texParameteri(3553, t, o[t]);
  }), s.texImage2D(3553, 0, 6408, 6408, 5121, e);
}, i.Sprite = function () {
  function t(n, e) {
    if (!(this instanceof t)) return new t(n, e);this.frame = n, this.a = 1, _extends(this, { visible: !0, position: i.Point(), rotation: 0, anchor: null, scale: i.Point(1), tint: 16777215 }, e), this.remove();
  }var n = { alpha: { configurable: !0 } };return n.alpha.get = function () {
    return this.a;
  }, n.alpha.set = function (t) {
    var n = this.a;this.a = t, this.n && (t < 1 && 1 === n || 1 === t && n < 1) && this.layer.add(this);
  }, t.prototype.remove = function () {
    this.n && this.n.r(), this.layer = null, this.n = null;
  }, Object.defineProperties(t.prototype, n), t;
}();exports.default = i;

/***/ }),

/***/ "JkW7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

__webpack_require__("rq4c");

var _app = __webpack_require__("qLaj");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _app2.default;

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = M;for (i = arguments.length; i-- > 2;) {
      T.push(arguments[i]);
    }t && null != t.children && (T.length || T.push(t.children), delete t.children);while (T.length) {
      if ((o = T.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        T.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === M ? l = [o] : l.push(o), n = r;
    }var a = new S();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== L.vnode && L.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function o(e) {
    !e.__d && (e.__d = !0) && 1 == D.push(e) && (L.debounceRendering || P)(r);
  }function r() {
    var e,
        t = D;D = [];while (e = t.pop()) {
      e.__d && C(e);
    }
  }function i(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && l(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function l(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function a(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function p(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function s(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function u(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === W.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, c, l) : e.removeEventListener(t, c, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) {
        try {
          e[t] = null == o ? "" : o;
        } catch (e) {}null != o && !1 !== o || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var a = r && t !== (t = t.replace(/^xlink:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function c(e) {
    return this.__l[e.type](L.event && L.event(e) || e);
  }function _() {
    var e;while (e = E.pop()) {
      L.afterMount && L.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    V++ || (A = null != r && void 0 !== r.ownerSVGElement, H = null != e && !("__preactattr_" in e));var l = f(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --V || (H = !1, i || _()), l;
  }function f(e, t, n, o, r) {
    var i = e,
        a = A;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), m(e, !0))), i.__preactattr_ = !0, i;var s = t.nodeName;if ("function" == typeof s) return x(e, t, n, o);if (A = "svg" === s || "foreignObject" !== s && A, s += "", (!e || !l(e, s)) && (i = p(s, A), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), m(e, !0);
    }var u = i.firstChild,
        c = i.__preactattr_,
        _ = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var d = i.attributes, f = d.length; f--;) {
        c[d[f].name] = d[f].value;
      }
    }return !H && _ && 1 === _.length && "string" == typeof _[0] && null != u && void 0 !== u.splitText && null == u.nextSibling ? u.nodeValue != _[0] && (u.nodeValue = _[0]) : (_ && _.length || null != u) && h(i, _, n, o, H || null != c.dangerouslySetInnerHTML), b(i, t.attributes, c), A = a, i;
  }function h(e, t, n, o, r) {
    var l,
        a,
        p,
        u,
        c,
        _ = e.childNodes,
        d = [],
        h = {},
        v = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (v++, h[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (d[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      u = t[C], c = null;var k = u.key;if (null != k) v && void 0 !== h[k] && (c = h[k], h[k] = void 0, v--);else if (b < g) for (l = b; l < g; l++) {
        if (void 0 !== d[l] && i(a = d[l], u, r)) {
          c = a, d[l] = void 0, l === g - 1 && g--, l === b && b++;break;
        }
      }c = f(c, u, n, o), p = _[C], c && c !== e && c !== p && (null == p ? e.appendChild(c) : c === p.nextSibling ? s(p) : e.insertBefore(c, p));
    }if (v) for (var C in h) {
      void 0 !== h[C] && m(h[C], !1);
    }while (b <= g) {
      void 0 !== (c = d[g--]) && m(c, !1);
    }
  }function m(e, t) {
    var n = e._component;n ? N(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || s(e), v(e));
  }function v(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;m(e, !0), e = t;
    }
  }function b(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || u(e, o, n[o], n[o] = void 0, A);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || u(e, o, n[o], n[o] = t[o], A);
    }
  }function y(e, t, n) {
    var o,
        r = B.length;e.prototype && e.prototype.render ? (o = new e(t, n), k.call(o, t, n)) : (o = new k(t, n), o.constructor = e, o.render = g);while (r--) {
      if (B[r].constructor === e) return o.__b = B[r].__b, B.splice(r, 1), o;
    }return o;
  }function g(e, t, n) {
    return this.constructor(e, n);
  }function w(e, t, n, r, i) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, r)), r && r !== e.context && (e.__c || (e.__c = e.context), e.context = r), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === L.syncComponentUpdates && e.base ? o(e) : C(e, 1, i)), e.__r && e.__r(e));
  }function C(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          p,
          s = e.props,
          u = e.state,
          c = e.context,
          f = e.__p || s,
          h = e.__s || u,
          v = e.__c || c,
          b = e.base,
          g = e.__b,
          x = b || g,
          k = e._component,
          U = !1,
          S = v;if (e.constructor.getDerivedStateFromProps && (u = t(t({}, u), e.constructor.getDerivedStateFromProps(s, u)), e.state = u), b && (e.props = f, e.state = h, e.context = v, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(s, u, c) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(s, u, c), e.props = s, e.state = u, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(s, u, c), e.getChildContext && (c = t(t({}, c), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(f, h));var T,
            M,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = a(i);l = k, l && l.constructor === P && W.key == l.__k ? w(l, W, 1, c, !1) : (T = l, e._component = l = y(P, W, c), l.__b = l.__b || g, l.__u = e, w(l, W, 0, c, !1), C(l, 1, o, !0)), M = l.base;
        } else p = x, T = k, T && (p = e._component = null), (x || 1 === n) && (p && (p._component = null), M = d(p, i, c, o || !b, x && x.parentNode, !0));if (x && M !== x && l !== k) {
          var D = x.parentNode;D && M !== D && (D.replaceChild(M, x), T || (x._component = null, m(x, !1)));
        }if (T && N(T), e.base = M, M && !r) {
          var A = e,
              H = e;while (H = H.__u) {
            (A = H).base = M;
          }M._component = A, M._componentConstructor = A.constructor;
        }
      }!b || o ? E.unshift(e) : U || (e.componentDidUpdate && e.componentDidUpdate(f, h, S), L.afterUpdate && L.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }V || r || _();
    }
  }function x(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        p = r && e._componentConstructor === t.nodeName,
        s = p,
        u = a(t);while (r && !s && (r = r.__u)) {
      s = r.constructor === t.nodeName;
    }return r && s && (!o || r._component) ? (w(r, u, 3, n, o), e = r.base) : (i && !p && (N(i), e = l = null), r = y(t.nodeName, u, n), e && !r.__b && (r.__b = e, l = null), w(r, u, 1, n, o), e = r.base, l && e !== l && (l._component = null, m(l, !1))), e;
  }function N(e) {
    L.beforeUnmount && L.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? N(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, s(t), B.push(e), v(t)), e.__r && e.__r(null);
  }function k(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function U(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }var S = function S() {},
      L = {},
      T = [],
      M = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      W = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      D = [],
      E = [],
      V = 0,
      A = !1,
      H = !1,
      B = [];t(k.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), o(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), C(this, 2);
    }, render: function render() {} });var F = { h: e, createElement: e, cloneElement: n, Component: k, render: U, rerender: r, options: L }; true ? module.exports = F : self.preact = F;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__2Q5nZ"};

/***/ }),

/***/ "qLaj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

var _header = __webpack_require__("sIAo");

var _header2 = _interopRequireDefault(_header);

var _home = __webpack_require__("E1C8");

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global PUBLIC_PATH */


var Stats = function Stats(_ref) {
	var title = _ref.title,
	    value = _ref.value;
	return (0, _preact.h)(
		'span',
		null,
		(0, _preact.h)(
			'span',
			{ 'class': 'title' },
			title,
			': '
		),
		value,
		'\xA0'
	);
};

var Footer = function Footer(_ref2) {
	var fps = _ref2.fps,
	    ms = _ref2.ms,
	    stats = _ref2.stats;
	return (0, _preact.h)(
		'footer',
		{ 'class': 'footer' },
		(0, _preact.h)(Stats, { title: 'fps', value: Math.round(fps) }),
		(0, _preact.h)(Stats, { title: 'ms', value: ms.toFixed(1) }),
		(stats || []).map(function (_ref3) {
			var title = _ref3.title,
			    value = _ref3.value;
			return (0, _preact.h)(Stats, { title: title, value: value });
		})
	);
};

var getTime = function getTime() {
	return (performance || Date).now();
};

// <Stat title="ms" value={`${ms.toFixed(1)} (${(ms * 6) | 0}%)`} />

var _ref4 = (0, _preact.h)(_header2.default, null);

var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		_classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			loop: null,
			fps: 0,
			ms: 0,
			stats: null
		}, _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
			_this.setState({
				loop: null,
				fps: 0,
				ms: 0,
				stats: null
			});
		}, _this.start = function (loop) {
			_this.setState({ loop: loop });
			_this.loop();
		}, _this.loop = function () {
			if (_this.state.loop) {
				_this.begin();
				var stats = _this.state.loop();
				_this.setState({ stats: stats });
				_this.end();
				requestAnimationFrame(_this.loop);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	App.prototype.begin = function begin() {
		this.beginTime = getTime();
	};

	App.prototype.end = function end() {
		this.frames++;

		var now = getTime();
		var passed = now - this.prevTime;

		if (passed >= 1000) {
			var ms = now - this.beginTime;
			var fps = this.frames * 1000 / passed;
			this.setState({ fps: fps, ms: ms });

			this.prevTime = now;
			this.frames = 0;
		}

		/*
  if (now - this.prevTime >= 1000) {
  	const ms = now - this.beginTime;
  	const fps = (this.frames * 1000) / (now - this.prevTime);
  	this.setState({ fps, ms });
  		this.prevTime = now;
  	this.frames = 0;
  }
  */
	};

	App.prototype.componentDidMount = function componentDidMount() {
		this.beginTime = getTime();
		this.prevTime = this.beginTime;
		this.frames = 0;
	};

	/*
 				<Home path={PUBLIC_PATH} start={this.start} />
     				<Profile path="/profile/" user="me" />
    				<Profile path="/profile/:user" />
 */

	App.prototype.render = function render() {
		var _state = this.state,
		    fps = _state.fps,
		    ms = _state.ms,
		    stats = _state.stats,
		    loop = _state.loop;

		return (0, _preact.h)(
			'div',
			{ id: 'app' },
			_ref4,
			(0, _preact.h)(
				_preactRouter.Router,
				{ onChange: this.handleRoute },
				(0, _preact.h)(_home2.default, { path: "/js13k-2d/", start: this.start })
			),
			loop && (0, _preact.h)(Footer, { fps: fps, ms: ms, stats: stats })
		);
	};

	return App;
}(_preact.Component);

exports.default = App;

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sIAo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _preact = __webpack_require__("KM04");

var _match = __webpack_require__("sw5u");

var _style = __webpack_require__("u3et");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
class Stars extends Component {
    async componentDidMount() {
        const response = await fetch(
            'https://api.github.com/repos/kutuluk/js13k-2d'
        );
        const json = await response.json();
        const stars = json.stargazers_count;

        this.setState({ stars });
    }

    render(props, { stars = 0 }) {
        let url = `//github.com/kutuluk/js13k-2d`;
        return (
            //<a href={url} class="stars">
            <div>
                <img src="assets/githubw.png" align="middle" />
                {stars} ⭐️
            </div>
            //</a>
        );
    }
}
*/

/*
            <Link
                activeClassName={style.active}
                href="//github.com/kutuluk/js13k-2d"
            >
                <Stars />
            </Link>

*/

/*
            <Link activeClassName={style.active} href="/">
                Home
            </Link>
            <Link activeClassName={style.active} href="/example/1">
                example1
            </Link>
            <Link activeClassName={style.active} href="/example/2">
                example2
            </Link>
*/

// <img class={style.logo} src="assets/logo.png" />
/*
            <Link
                native
                activeClassName={style.active}
                href="//github.com/kutuluk/js13k-2d"
            >
*/
var _ref = (0, _preact.h)(
    'h1',
    null,
    'js13k-2d'
);

var _ref2 = (0, _preact.h)(
    'h5',
    null,
    'A ~2kb webgl 2d sprite renderer'
);

var _ref3 = (0, _preact.h)(
    'nav',
    null,
    (0, _preact.h)(
        'a',
        { href: '//github.com/kutuluk/js13k-2d' },
        (0, _preact.h)('img', { whidth: '32', height: '32', src: 'assets/github.png' })
    )
);

var Header = function Header() {
    return (0, _preact.h)(
        'header',
        { 'class': _style2.default.header },
        (0, _preact.h)(
            'div',
            { 'class': _style2.default.brand },
            _ref,
            _ref2
        ),
        _ref3
    );
};

exports.default = Header;

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__2MqSo","brand":"brand__CwE_Z","logo":"logo__1Ig25","active":"active__27Q54"};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map