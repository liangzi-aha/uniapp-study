(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"hm_shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!***************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/request/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.request = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // 同时发送异步代码的次数
var ajaxTimes = 0;
var baseUrl = 'http://localhost:8082';

var request = function request(params) {
  ajaxTimes++;

  // 加载框展示
  uni.showLoading({
    title: '加载中...',
    mask: true });


  return new Promise(function (resolve, reject) {
    uni.request(_objectSpread(_objectSpread({},
    params), {}, {
      url: baseUrl + params.url,
      success: function success(res) {
        if (res.data.status !== 0) {
          uni.showToast({
            title: '获取数据失败' });

        } else {
          resolve(res.data);
        }
      },
      fail: function fail(err) {
        uni.showToast({
          title: '请求接口失败' });

        reject(err);
      },
      complete: function complete() {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          // 关闭加载动画
          uni.hideLoading();
        }
      } }));

  });
};exports.request = request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 117:
/*!**************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.esm.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.initVueI18n = initVueI18n;exports.I18n = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isObject = function isObject(val) {return val !== null && typeof val === 'object';};var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format) {
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var _char = format[position++];
    if (_char === '{') {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      _char = format[position++];
      while (_char !== undefined && _char !== '}') {
        sub += _char;
        _char = format[position++];
      }
      var isClosed = _char === '}';
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    } else
    if (_char === '%') {
      // when found rails i18n syntax, skip text capture
      if (format[position] !== '{') {
        text += _char;
      }
    } else
    {
      text += _char;
    }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') !== -1) {
      return 'zh-Hans';
    }
    if (locale.indexOf('-hant') !== -1) {
      return 'zh-Hant';
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return 'zh-Hant';
    }
    return 'zh-Hans';
  }
  var lang = startsWith(locale, ['en', 'fr', 'es']);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref) {var locale = _ref.locale,fallbackLocale = _ref.fallbackLocale,messages = _ref.messages,watcher = _ref.watcher,formater = _ref.formater;_classCallCheck(this, I18n);
    this.locale = 'en';
    this.fallbackLocale = 'en';
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages;
    this.setLocale(locale);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      this.message = this.messages[this.locale];
      this.watchers.forEach(function (watcher) {
        watcher(_this.locale, oldLocale);
      });
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function initLocaleWatcher(appVm, i18n) {
  appVm.$i18n &&
  appVm.$i18n.vm.$watch('locale', function (newLocale) {
    i18n.setLocale(newLocale);
  }, {
    immediate: true });

}
function getDefaultLocale() {
  if (typeof navigator !== 'undefined') {
    return navigator.userLanguage || navigator.language;
  }
  if (typeof plus !== 'undefined') {
    // TODO 待调整为最新的获取语言代码
    return plus.os.language;
  }
  return uni.getSystemInfoSync().language;
}
function initVueI18n(messages) {var fallbackLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';var locale = arguments.length > 2 ? arguments[2] : undefined;
  var i18n = new I18n({
    locale: locale || fallbackLocale,
    fallbackLocale: fallbackLocale,
    messages: messages });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app-plus view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var appVm = getApp().$vm;
      if (!appVm.$t || !appVm.$i18n) {
        if (!locale) {
          i18n.setLocale(getDefaultLocale());
        }
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          return i18n.t(key, values);
        };
      } else
      {
        initLocaleWatcher(appVm, i18n);
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          var $i18n = appVm.$i18n;
          var silentTranslationWarn = $i18n.silentTranslationWarn;
          $i18n.silentTranslationWarn = true;
          var msg = appVm.$t(key, values);
          $i18n.silentTranslationWarn = silentTranslationWarn;
          if (msg !== key) {
            return msg;
          }
          return i18n.t(key, $i18n.locale, values);
        };
      }
    }
    return _t(key, values);
  };
  return {
    t: function t(key, values) {
      return _t(key, values);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    },
    mixin: {
      beforeCreate: function beforeCreate() {var _this3 = this;
        var unwatch = i18n.watchLocale(function () {
          _this3.$forceUpdate();
        });
        this.$once('hook:beforeDestroy', function () {
          unwatch();
        });
      },
      methods: {
        $$t: function $$t(key, values) {
          return _t(key, values);
        } } } };



}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 118:
/*!*************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/components/uni-goods-nav/i18n/index.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 119));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 120));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 121));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 119:
/*!************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/components/uni-goods-nav/i18n/en.json ***!
  \************************************************************************************/
/*! exports provided: uni-goods-nav.options.shop, uni-goods-nav.options.cart, uni-goods-nav.buttonGroup.addToCart, uni-goods-nav.buttonGroup.buyNow, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-goods-nav.options.shop\":\"shop\",\"uni-goods-nav.options.cart\":\"cart\",\"uni-goods-nav.buttonGroup.addToCart\":\"add to cart\",\"uni-goods-nav.buttonGroup.buyNow\":\"buy now\"}");

/***/ }),

/***/ 120:
/*!*****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/components/uni-goods-nav/i18n/zh-Hans.json ***!
  \*****************************************************************************************/
/*! exports provided: uni-goods-nav.options.shop, uni-goods-nav.options.cart, uni-goods-nav.buttonGroup.addToCart, uni-goods-nav.buttonGroup.buyNow, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-goods-nav.options.shop\":\"店铺\",\"uni-goods-nav.options.cart\":\"购物车\",\"uni-goods-nav.buttonGroup.addToCart\":\"加入购物车\",\"uni-goods-nav.buttonGroup.buyNow\":\"立即购买\"}");

/***/ }),

/***/ 121:
/*!*****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/components/uni-goods-nav/i18n/zh-Hant.json ***!
  \*****************************************************************************************/
/*! exports provided: uni-goods-nav.options.shop, uni-goods-nav.options.cart, uni-goods-nav.buttonGroup.addToCart, uni-goods-nav.buttonGroup.buyNow, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-goods-nav.options.shop\":\"店鋪\",\"uni-goods-nav.options.cart\":\"購物車\",\"uni-goods-nav.buttonGroup.addToCart\":\"加入購物車\",\"uni-goods-nav.buttonGroup.buyNow\":\"立即購買\"}");

/***/ }),

/***/ 129:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/components/uni-icons/icons.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 18:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 19);

/***/ }),

/***/ 19:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 20);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"hm_shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"hm_shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"hm_shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"hm_shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*********************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/pages.json ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 65:
/*!*****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/static/image/1.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/image/1.png";

/***/ }),

/***/ 66:
/*!*****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/static/image/2.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/image/2.png";

/***/ }),

/***/ 67:
/*!*****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/static/image/3.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/image/3.png";

/***/ }),

/***/ 68:
/*!*****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/static/image/4.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/image/4.png";

/***/ }),

/***/ 69:
/*!*****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/static/image/5.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/image/5.png";

/***/ }),

/***/ 70:
/*!*****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/static/image/6.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/image/6.png";

/***/ }),

/***/ 93:
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/heima_shop_server/src/public/images/hx1.jpg ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/7QBAUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAACQcAgAAAgACHAI8AAsxMjUwMTMrMDAwMBwCNwAIMjAxMzAxMTn/4QO2RXhpZgAATU0AKgAAAAgADwEAAAMAAAABEMAAAAEBAAMAAAABCyAAAAECAAMAAAADAAAAwgEDAAMAAAABAAUAAAEPAAIAAAASAAAAyAEQAAIAAAAKAAAA2gESAAMAAAABAAEAAAEVAAMAAAABAAMAAAEaAAUAAAABAAAA5AEbAAUAAAABAAAA7AEcAAMAAAABAAEAAAEoAAMAAAABAAIAAAExAAIAAAAcAAAA9AEyAAIAAAAUAAABEIdpAAQAAAABAAABJAAAAAAACAAIAAhOSUtPTiBDT1JQT1JBVElPTgBOSUtPTiBEOTAAAC3GwAAAJxAALcbAAAAnEEFkb2JlIFBob3Rvc2hvcCBDUzMgV2luZG93cwAyMDEzOjAyOjA3IDEwOjQ2OjA0AAAogpoABQAAAAEAAAMKgp0ABQAAAAEAAAMSiCIAAwAAAAEAAwAAiCcAAwAAAAEAyAAAkAAABwAAAAQwMjIxkAMAAgAAABQAAAMakAQAAgAAABQAAAMukQEABwAAAAQBAgMAkQIABQAAAAEAAANCkgEACgAAAAEAAANKkgIABQAAAAEAAANSkgQACgAAAAEAAANakgUABQAAAAEAAANikgcAAwAAAAEABQAAkggAAwAAAAEAAAAAkgkAAwAAAAEAAAAAkgoABQAAAAEAAANqkoYABwAAACwAAANykpAAAgAAAAMwMAAAkpEAAgAAAAMwMAAAkpIAAgAAAAMwMAAAoAAABwAAAAQwMTAwoAEAAwAAAAEAAQAAoAIABAAAAAEAABDAoAMABAAAAAEAAAsgohcAAwAAAAEAAgAAowAABwAAAAEDAAAAowEABwAAAAEBAAAAowIABwAAAAgAAAOepAEAAwAAAAEAAAAApAIAAwAAAAEAAAAApAMAAwAAAAEAAAAApAQABQAAAAEAAAOmpAUAAwAAAAEAMwAApAYAAwAAAAEAAAAApAcAAwAAAAEAAAAApAgAAwAAAAEAAAAApAkAAwAAAAEAAAAApAoAAwAAAAEAAAAApAwAAwAAAAEAAAAAAAAAAAAAAAoAAE4gAAAALQAAAAoyMDEzOjAxOjE5IDEyOjUwOjEzADIwMTM6MDE6MTkgMTI6NTA6MTMAAAAABAAAAAEAp1MYAA9CQAAGn0EAAYag/////gAAAAYAAAAqAAAACgAAAVQAAAAKQVNDSUkAAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAAAgACAQIAAQAAAAEAAAAB/+EY+VhNUAA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmF1eD0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC9hdXgvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhhcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iIHhhcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTMyBXaW5kb3dzIiB4YXA6TW9kaWZ5RGF0ZT0iMjAxMy0wMi0wN1QxMDo0NjowNCswODowMCIgeGFwOkNyZWF0ZURhdGU9IjIwMTMtMDItMDdUMTA6NDY6MDQrMDg6MDAiIHhhcDpNZXRhZGF0YURhdGU9IjIwMTMtMDItMDdUMTA6NDY6MDQrMDg6MDAiIGF1eDpTZXJpYWxOdW1iZXI9IjkzNDQwNzYiIGF1eDpMZW5zSW5mbz0iMTgwLzEwIDEwNTAvMTAgMzUvMTAgNTYvMTAiIGF1eDpMZW5zPSIxOC4wLTEwNS4wIG1tIGYvMy41LTUuNiIgYXV4OkxlbnNJRD0iMTU4IiBhdXg6SW1hZ2VOdW1iZXI9IjYxODkzIiBhdXg6QXBwcm94aW1hdGVGb2N1c0Rpc3RhbmNlPSI0Mjk0OTY3Mjk1LzEiIHBob3Rvc2hvcDpEYXRlQ3JlYXRlZD0iMjAxMy0wMS0xOSIgcGhvdG9zaG9wOkxlZ2FjeUlQVENEaWdlc3Q9IjQwOUEyQTlDNzZCQzAzM0RFOEZEMTU0NjU5NjcxMDNFIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHBob3Rvc2hvcDpIaXN0b3J5PSIiIHhhcE1NOkRvY3VtZW50SUQ9InV1aWQ6QjUwOTdBNzdEMDcwRTIxMTk4QjJDOTk1ODE4MzZFRjAiIHhhcE1NOkluc3RhbmNlSUQ9InV1aWQ6QjYwOTdBNzdEMDcwRTIxMTk4QjJDOTk1ODE4MzZFRjAiIHhhcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iRjhENjNGNTVBOTQyMDc2ODJCRDkwMTE1QzMyMjU4NzMiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgdGlmZjpJbWFnZVdpZHRoPSI0Mjg4IiB0aWZmOkltYWdlTGVuZ3RoPSIyODQ4IiB0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb249IjIiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6U2FtcGxlc1BlclBpeGVsPSIzIiB0aWZmOlhSZXNvbHV0aW9uPSIzMDAwMDAwLzEwMDAwIiB0aWZmOllSZXNvbHV0aW9uPSIzMDAwMDAwLzEwMDAwIiB0aWZmOlJlc29sdXRpb25Vbml0PSIyIiB0aWZmOk1ha2U9Ik5JS09OIENPUlBPUkFUSU9OIiB0aWZmOk1vZGVsPSJOSUtPTiBEOTAiIHRpZmY6TmF0aXZlRGlnZXN0PSIyNTYsMjU3LDI1OCwyNTksMjYyLDI3NCwyNzcsMjg0LDUzMCw1MzEsMjgyLDI4MywyOTYsMzAxLDMxOCwzMTksNTI5LDUzMiwzMDYsMjcwLDI3MSwyNzIsMzA1LDMxNSwzMzQzMjtCRjdENzFDNzUxQTJCNTVCODY1QUZBNTk3OUZBMzJBOCIgdGlmZjpDb21wcmVzc2lvbj0iNSIgdGlmZjpQbGFuYXJDb25maWd1cmF0aW9uPSIxIiBleGlmOkV4aWZWZXJzaW9uPSIwMjIxIiBleGlmOkZsYXNocGl4VmVyc2lvbj0iMDEwMCIgZXhpZjpDb2xvclNwYWNlPSIxIiBleGlmOkNvbXByZXNzZWRCaXRzUGVyUGl4ZWw9IjQvMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjQyODgiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyODQ4IiBleGlmOkRhdGVUaW1lT3JpZ2luYWw9IjIwMTMtMDEtMTlUMTI6NTA6MTMrMDg6MDAiIGV4aWY6RGF0ZVRpbWVEaWdpdGl6ZWQ9IjIwMTMtMDEtMTlUMTI6NTA6MTMrMDg6MDAiIGV4aWY6RXhwb3N1cmVUaW1lPSIxMC8yMDAwMCIgZXhpZjpGTnVtYmVyPSI0NS8xMCIgZXhpZjpFeHBvc3VyZVByb2dyYW09IjMiIGV4aWY6U2h1dHRlclNwZWVkVmFsdWU9IjEwOTY1Nzg0LzEwMDAwMDAiIGV4aWY6QXBlcnR1cmVWYWx1ZT0iNDMzOTg1LzEwMDAwMCIgZXhpZjpFeHBvc3VyZUJpYXNWYWx1ZT0iLTIvNiIgZXhpZjpNYXhBcGVydHVyZVZhbHVlPSI0Mi8xMCIgZXhpZjpNZXRlcmluZ01vZGU9IjUiIGV4aWY6TGlnaHRTb3VyY2U9IjAiIGV4aWY6Rm9jYWxMZW5ndGg9IjM0MC8xMCIgZXhpZjpTZW5zaW5nTWV0aG9kPSIyIiBleGlmOkZpbGVTb3VyY2U9IjMiIGV4aWY6U2NlbmVUeXBlPSIxIiBleGlmOkN1c3RvbVJlbmRlcmVkPSIwIiBleGlmOkV4cG9zdXJlTW9kZT0iMCIgZXhpZjpXaGl0ZUJhbGFuY2U9IjAiIGV4aWY6RGlnaXRhbFpvb21SYXRpbz0iMS8xIiBleGlmOkZvY2FsTGVuZ3RoSW4zNW1tRmlsbT0iNTEiIGV4aWY6U2NlbmVDYXB0dXJlVHlwZT0iMCIgZXhpZjpHYWluQ29udHJvbD0iMCIgZXhpZjpDb250cmFzdD0iMCIgZXhpZjpTYXR1cmF0aW9uPSIwIiBleGlmOlNoYXJwbmVzcz0iMCIgZXhpZjpTdWJqZWN0RGlzdGFuY2VSYW5nZT0iMCIgZXhpZjpOYXRpdmVEaWdlc3Q9IjM2ODY0LDQwOTYwLDQwOTYxLDM3MTIxLDM3MTIyLDQwOTYyLDQwOTYzLDM3NTEwLDQwOTY0LDM2ODY3LDM2ODY4LDMzNDM0LDMzNDM3LDM0ODUwLDM0ODUyLDM0ODU1LDM0ODU2LDM3Mzc3LDM3Mzc4LDM3Mzc5LDM3MzgwLDM3MzgxLDM3MzgyLDM3MzgzLDM3Mzg0LDM3Mzg1LDM3Mzg2LDM3Mzk2LDQxNDgzLDQxNDg0LDQxNDg2LDQxNDg3LDQxNDg4LDQxNDkyLDQxNDkzLDQxNDk1LDQxNzI4LDQxNzI5LDQxNzMwLDQxOTg1LDQxOTg2LDQxOTg3LDQxOTg4LDQxOTg5LDQxOTkwLDQxOTkxLDQxOTkyLDQxOTkzLDQxOTk0LDQxOTk1LDQxOTk2LDQyMDE2LDAsMiw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwyMCwyMiwyMywyNCwyNSwyNiwyNywyOCwzMDs2RkMwNDc3NjdFRDUwNEQ5Njk3RkQ5MkVFQzM2NTA5RSI+IDx4YXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjkwM0QwRUYxMUY2MkUyMTFCQkE3OEYzNjVCQUVFODgyIiBzdEV2dDp3aGVuPSIyMDEzLTAxLTE5VDE4OjEwOjAxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MUY4M0U1MjcyMzYyRTIxMUJCQTc4RjM2NUJBRUU4ODIiIHN0RXZ0OndoZW49IjIwMTMtMDEtMTlUMjA6MTk6NDkrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94YXBNTTpIaXN0b3J5PiA8eGFwTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0idXVpZDo5QjZBNzQ4RjcxNkFFMjExQTMzMTkwQjMwMjUyMTUxOSIgc3RSZWY6ZG9jdW1lbnRJRD0idXVpZDo5QTZBNzQ4RjcxNkFFMjExQTMzMTkwQjMwMjUyMTUxOSIvPiA8dGlmZjpCaXRzUGVyU2FtcGxlPiA8cmRmOlNlcT4gPHJkZjpsaT44PC9yZGY6bGk+IDxyZGY6bGk+ODwvcmRmOmxpPiA8cmRmOmxpPjg8L3JkZjpsaT4gPC9yZGY6U2VxPiA8L3RpZmY6Qml0c1BlclNhbXBsZT4gPGV4aWY6Q29tcG9uZW50c0NvbmZpZ3VyYXRpb24+IDxyZGY6U2VxPiA8cmRmOmxpPjE8L3JkZjpsaT4gPHJkZjpsaT4yPC9yZGY6bGk+IDxyZGY6bGk+MzwvcmRmOmxpPiA8cmRmOmxpPjA8L3JkZjpsaT4gPC9yZGY6U2VxPiA8L2V4aWY6Q29tcG9uZW50c0NvbmZpZ3VyYXRpb24+IDxleGlmOklTT1NwZWVkUmF0aW5ncz4gPHJkZjpTZXE+IDxyZGY6bGk+MjAwPC9yZGY6bGk+IDwvcmRmOlNlcT4gPC9leGlmOklTT1NwZWVkUmF0aW5ncz4gPGV4aWY6Rmxhc2ggZXhpZjpGaXJlZD0iRmFsc2UiIGV4aWY6UmV0dXJuPSIwIiBleGlmOk1vZGU9IjAiIGV4aWY6RnVuY3Rpb249IkZhbHNlIiBleGlmOlJlZEV5ZU1vZGU9IkZhbHNlIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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"

/***/ }),

/***/ 94:
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/heima_shop_server/src/public/images/hx2.jpg ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 95:
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/hm_shop/heima_shop_server/src/public/images/hx3.jpg ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/heima_shop_server/src/public/images/hx3.jpg";

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map