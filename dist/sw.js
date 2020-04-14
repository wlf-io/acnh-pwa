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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sw.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/StaticAssets.json":
/*!*******************************!*\
  !*** ./src/StaticAssets.json ***!
  \*******************************/
/*! exports provided: 0, 1, 2, 3, 4, default */
/***/ (function(module) {

module.exports = JSON.parse("[\"./\",\"./index.html\",\"./app.js\",\"./app.css\",\"./manifest.webmanifest\"]");

/***/ }),

/***/ "./src/services/WebRequest.ts":
/*!************************************!*\
  !*** ./src/services/WebRequest.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class WebRequest {
    static queryParams(params) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }
    static addQueryParamsToUrl(url, params) {
        return url + (url.indexOf('?') === -1 ? '?' : '&') + WebRequest.queryParams(params);
    }
    ;
    static requestResponseCast(response) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            try {
                return response.json();
            }
            catch (e) {
            }
        }
        return response.text();
    }
    static fetch(url, params) {
        return new Promise((resolve, reject) => {
            fetch(url, params)
                .then(WebRequest.successCheck)
                .then(WebRequest.requestResponseCast)
                .then(resolve)
                .catch(reject);
        });
    }
    static get(url) {
        return WebRequest.fetch(url);
    }
    static generic(url, method = "GET", body = "", headers = {}) {
        return WebRequest.fetch(url, { method: method, body: body, headers: headers });
    }
    static methodGeneric(url, method, body = "", json = false) {
        return WebRequest.generic(url, method, (typeof body === "string" ? body : (json ? JSON.stringify(body) : WebRequest.queryParams(body))), { 'Content-Type': json ? 'application/json' : 'application/x-www-form-urlencoded' });
    }
    static post(url, body = "", json = false) {
        return WebRequest.methodGeneric(url, "POST", body, json);
    }
    static delete(url, body = "", json = false) {
        return WebRequest.methodGeneric(url, "DELETE", body, json);
    }
    static successCheck(response) {
        if (response.status >= 400) {
            throw response;
        }
        return response;
    }
}
exports.default = WebRequest;


/***/ }),

/***/ "./src/sw.ts":
/*!*******************!*\
  !*** ./src/sw.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StaticAssets_json_1 = __importDefault(__webpack_require__(/*! ./StaticAssets.json */ "./src/StaticAssets.json"));
const WebRequest_1 = __importDefault(__webpack_require__(/*! ./services/WebRequest */ "./src/services/WebRequest.ts"));
(function () {
    class Worker {
        constructor() {
            console.log("SW CONSTRUCT");
            self.addEventListener("install", async () => await this.install());
            self.addEventListener("activate", (e) => this.activate(e));
            self.addEventListener("fetch", async (e) => await this.onFetch(e));
        }
        static Factory() {
            if (Worker.instance === null) {
                Worker.instance = new Worker();
            }
            return Worker.instance;
        }
        run() {
            console.log("SW BOOT");
            this.updateCheck();
        }
        activate(e) {
            console.log("SW activate");
            self.clients.claim();
            this.cleanOldCaches(e);
        }
        cleanOldCaches(e) {
            e.waitUntil(caches.keys().then(keys => {
                return Promise.all(keys
                    .filter(key => key.startsWith(Worker.CachePrefix) && key !== Worker.CacheName)
                    .map(key => caches.delete(key)));
            }));
        }
        updateCheck() {
            WebRequest_1.default.get("/")
                .then(() => {
                this.install();
            })
                .catch(console.error);
        }
        async install() {
            console.log("install");
            const cache = await caches.open(Worker.CacheName);
            await cache.addAll(StaticAssets_json_1.default);
            return self.skipWaiting();
        }
        async onFetch(e) {
            const req = e.request;
            const url = new URL(req.url);
            if (url.origin === location.origin) {
                e.respondWith(this.cacheFirst(req));
            }
            else {
                e.respondWith(this.networkAndCache(req));
            }
        }
        async cacheFirst(req) {
            const cache = await caches.open(Worker.CacheName);
            const cached = await cache.match(req);
            return cached || fetch(req);
        }
        async networkAndCache(req) {
            const cache = await caches.open(Worker.CacheName);
            try {
                const fresh = await fetch(req);
                await cache.put(req, fresh.clone());
                return fresh;
            }
            catch (e) {
                const cached = await cache.match(req);
                return cached;
            }
        }
    }
    Worker.instance = null;
    Worker.CachePrefix = "pwaCache";
    Worker.CacheName = Worker.CachePrefix + "1586835192669";
    Worker.Factory().run();
})();


/***/ })

/******/ });
//# sourceMappingURL=sw.js.map