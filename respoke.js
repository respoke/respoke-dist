(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["respoke"] = factory();
	else
		root["respoke"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */
	"use strict";
	/*jshint bitwise: false*/

	// var Airbrake = require('airbrake-js');
	var log = __webpack_require__(2);
	log.setLevel(log.levels.WARN);

	var originalFactory = log.methodFactory;
	log.methodFactory = function logMethodFactory(methodName, logLevel) {
	    var logMethod = originalFactory(methodName, logLevel);
	    var errorReporter;

	    // if (!window.skipErrorReporting && methodName === 'error') {
	    //     var airbrake = new Airbrake({
	    //         projectId: '98133',
	    //         projectKey: 'cd3e085acc5e554658ebcdabd112a6f4'
	    //     });
	    //     errorReporter = function (message) {
	    //         airbrake.push({ error: { message: message } });
	    //     };
	    // } else {
	    //     errorReporter = function () { };
	    // }
	    errorReporter = function () { };

	    return function (message) {
	        var args = Array.prototype.slice.call(arguments);
	        var reporterMessage = args.join(' ');

	        args.unshift('[Respoke]');
	        logMethod.apply(this, args);
	        errorReporter(reporterMessage);
	    };
	};

	__webpack_require__(3);

	/**
	 * `respoke` is a global static class.
	 *
	 *
	 * Include the [latest version](https://cdn.respoke.io/respoke.min.js) or
	 * [choose a previous release](http://cdn.respoke.io/list.html).
	 *
	 * Or use `npm install --save respoke`.
	 *
	 * Interact with Respoke primarily via [`respoke.Client`](respoke.Client.html):
	 *
	 *      var client = respoke.createClient();
	 *
	 *
	 * **Development mode without brokered auth**
	 *
	 *      var client = respoke.createClient({
	 *          appId: "XXXXXXX-my-app-id-XXXXXX",
	 *          developmentMode: true,
	 *          endpointId: "daveops"
	 *      });
	 *
	 *      client.connect({
	 *          onSuccess: function () { ... },
	 *          onError: function (err) { ... }
	 *      });
	 *
	 *
	 * **Production mode with brokered auth**
	 *
	 *      var client = respoke.createClient();
	 *
	 *      // Respoke auth token obtained by your server.
	 *      // This is how you control who can connect to Respoke app.
	 *      // See API docs for POST [base]/tokens
	 *      var tokenId = "XXXX-XXXX-brokered-auth-token-XXXXX";
	 *
	 *      // connect to respoke with the token
	 *      client.connect({
	 *          token: tokenId
	 *          onSuccess: function () { ... },
	 *          onError: function (err) { ... }
	 *      });
	 *
	 *      // fetch a new token from your server if it expires
	 *      client.listen('disconnect', function (evt) {
	 *          // fetch another token from your server.
	 *          var newTokenId = "XXXX-XXXX-brokered-auth-token2-XXXXX";
	 *          client.connect({
	 *              token: newTokenId
	 *          });
	 *      });
	 *
	 *
	 *
	 * ### Event listeners vs callback handlers
	 *
	 * There are two ways to attach listeners. It is highly recommended that you choose one pattern
	 * and stick to it throughout your app.
	 *
	 * For every `event-name`, there is a corresponding callback `onEventName`.
	 *
	 * **With a listener**
	 *
	 *      var client = respoke.createClient();
	 *      client.listen('connect', function () { });
	 *
	 * **or with a callback**
	 *
	 *      var client = respoke.createClient({
	 *          // other options go here
	 *
	 *          onConnect: function () { }
	 *      });
	 *
	 *
	 * @namespace respoke
	 * @class respoke
	 * @global
	 * @link https://cdn.respoke.io/respoke.min.js
	 */

	var EventEmitter = __webpack_require__(4);
	var respoke = module.exports = EventEmitter({
	    ridiculous: false, // print every websocket tx/rx
	    buildNumber: 'v2.1.1',
	    io: __webpack_require__(6),
	    Q: __webpack_require__(8)
	});

	respoke.Q.longStackSupport = true;
	respoke.Q.stackJumpLimit = 5;
	respoke.Q.longStackJumpLimit = 20;
	respoke.Q.stopUnhandledRejectionTracking();

	/**
	 * A map of respoke.Client instances available for use. This is useful if you would like to separate some
	 * functionality of your app into a separate Respoke app which would require a separate appId.
	 * @type {boolean}
	 */
	respoke.instances = {};

	/**
	 * Indicate whether the user's browser is Chrome and requires the Respoke Chrome extension to do screen sharing.
	 * @type {boolean}
	 * @private
	 */
	respoke.needsChromeExtension = !!(window.chrome && !window.opera && navigator.webkitGetUserMedia);

	/**
	 * Indicate whether the user's browser is Firefox and requires the Respoke Firefox extension to do screen sharing.
	 * @type {boolean}
	 * @private
	 */
	respoke.needsFirefoxExtension = window.webrtcDetectedBrowser === 'firefox';

	/**
	 * Indicate whether the user has a Respoke Chrome extension installed and running correcty on this domain.
	 * @type {boolean}
	 * @private
	 */
	respoke.hasChromeExtension = false;

	/**
	 * Indicate whether the user has a Respoke Firefox extension installed and running correcty on this domain.
	 * @type {boolean}
	 * @private
	 */
	respoke.hasFirefoxExtension = false;

	/**
	 * This method will be overridden in the case that an extension or plugin is available for screen sharing.
	 *
	 * @static
	 * @private
	 * @memberof respoke
	 */
	respoke.chooseDesktopMedia = function () {
	    log.warn("Screen sharing is not implemented for this browser.");
	};

	/**
	 * Indicate whether we are dealing with node-webkit, and expose chooseDesktopMedia if so
	 * @type {boolean}
	 * @private
	 */
	respoke.isNwjs = (function () {
	    var gui;
	    var isNwjs = !!((typeof process !== 'undefined') && (typeof global !== 'undefined') &&
	        global.window && global.window.nwDispatcher);

	    if (isNwjs) {
	        // expose native node-webkit chooseDesktopMedia (requires nw.js 0.12+)
	        gui = window.nwDispatcher.requireNwGui();
	        gui.Screen.Init();

	        respoke.chooseDesktopMedia = function (data, callback) {
	            // make data param optional
	            if (!callback && (typeof data === 'function')) {
	                callback = data;
	                data = null;
	            }

	            /*
	             * mediaSources can be one of 'window', 'screen', or 'tab', or an array with multiples
	             * https://developer.chrome.com/extensions/desktopCapture
	             */
	            var mediaSources = data && data.source ? [data.source] : ['window', 'screen'];

	            gui.Screen.chooseDesktopMedia(mediaSources, function (sourceId) {
	                callback({
	                    type: 'respoke-source-id',
	                    sourceId: sourceId
	                });
	            });
	        };
	    }

	    return isNwjs;
	})();

	/**
	 * Create an Event. This is used in the Chrome/Firefox extensions to communicate between the library and extension.
	 * @type {function}
	 * @private
	 */
	respoke.extEvent = function (type, data) {
	    var evt = document.createEvent("CustomEvent");
	    evt.initCustomEvent(type, true, true, data);
	    return evt;
	};

	/**
	 * `"v0.0.0"`
	 *
	 * The respoke.min.js version.
	 *
	 * Past versions can be found at [cdn.respoke.io/list.html](http://cdn.respoke.io/list.html)
	 * @type {string}
	 */
	respoke.version = respoke.buildNumber + "";

	respoke.log = log;
	respoke.Class = __webpack_require__(5);
	respoke.EventEmitter = EventEmitter;
	respoke.Client = __webpack_require__(9);
	respoke.Connection = __webpack_require__(10);
	respoke.Endpoint = __webpack_require__(11);
	respoke.TextMessage = __webpack_require__(12);
	respoke.SignalingMessage = __webpack_require__(13);
	respoke.Group = __webpack_require__(14);
	respoke.SignalingChannel = __webpack_require__(15);
	respoke.DirectConnection = __webpack_require__(17);
	respoke.PeerConnection = __webpack_require__(18);
	respoke.CallState = __webpack_require__(20);
	respoke.Call = __webpack_require__(21);
	respoke.LocalMedia = __webpack_require__(22);
	respoke.RemoteMedia = __webpack_require__(23);
	respoke.Conference = __webpack_require__(24);

	/**
	 * Get information from the Respoke Screen Sharing Chrome extension if it is installed.
	 * @private
	 */
	function chromeScreenSharingExtensionReady(evt) {
	    var data = evt.detail;
	    if (data.available !== true) {
	        return;
	    }

	    respoke.hasChromeExtension = true;
	    respoke.chooseDesktopMedia = function (params, callback) {
	        if (!callback) {
	            throw new Error("Can't choose desktop media without callback parameter.");
	        }

	        function sourceIdListener(evt) {
	            var data = evt.detail;

	            respoke.screenSourceId = data.sourceId;
	            callback(data);
	            document.removeEventListener("respoke-source-id", sourceIdListener);
	        }

	        document.dispatchEvent(respoke.extEvent('ct-respoke-source-id', {
	            source: params.source ? [params.source] : ['screen', 'window']
	        }));

	        document.addEventListener("respoke-source-id", sourceIdListener);
	    };

	    respoke.fire('extension-loaded', {
	        type: 'screen-sharing'
	    });

	    log.info("Respoke Screen Share Chrome extension available for use.");
	}

	// TODO: remove 'respoke-available' event listener on next major version bump
	document.addEventListener('respoke-available', chromeScreenSharingExtensionReady);
	document.addEventListener('respoke-chrome-screen-sharing-available', chromeScreenSharingExtensionReady);
	document.addEventListener('respoke-firefox-screen-sharing-available', function (evt) {

	    var data = evt.detail;
	    if (data !== 'available') {
	        return;
	    }

	    respoke.hasFirefoxExtension = true;

	    respoke.fire('extension-loaded', {
	        type: 'screen-sharing'
	    });

	    log.info("Respoke Screen Share Firefox extension available for use.");
	});

	/**
	 * This is one of two possible entry points for interating with the library.
	 *
	 * This method creates a new Client object
	 * which represents your user's connection to your Respoke app.
	 *
	 * This method **automatically calls client.connect(params)** after the client is created.
	 *
	 * @static
	 * @memberof respoke
	 * @param {object} params Parameters to the respoke.Client constructor.
	 * @param {string} [params.appId]
	 * @param {string} [params.baseURL]
	 * @param {string} [params.token]
	 * @param {string|number|object|Array} [params.presence] The initial presence to set once connected.
	 * @param {boolean} [params.developmentMode=false] - Indication to obtain an authentication token from the service.
	 * Note: Your app must be in developer mode to use this feature. This is not intended as a long-term mode of
	 * operation and will limit the services you will be able to use.
	 * @param {boolean} [params.reconnect=false] - Whether or not to automatically reconnect to the Respoke service
	 * when a disconnect occurs.
	 * @param {function} [params.onSuccess] - Success handler for this invocation of this method only.
	 * @param {function} [params.onError] - Error handler for this invocation of this method only.
	 * @param {function} [params.onJoin] - Callback for when this client's endpoint joins a group.
	 * @param {function} [params.onLeave] - Callback for when this client's endpoint leaves a group.
	 * @param {function} [params.onMessage] - Callback for when any message is received from anywhere on the system.
	 * @param {function} [params.onDisconnect] - Callback for Client disconnect.
	 * @param {function} [params.onReconnect] - Callback for Client reconnect. Not Implemented.
	 * @param {function} [params.onCall] - Callback for when this client's user receives a call.
	 * @param {function} [params.onDirectConnection] - Callback for when this client's user receives a request for a
	 * direct connection.
	 * @param {boolean} [params.enableCallDebugReport=true] - Optional flag defaulting to true which allows sending
	 * debugging information.
	 * @returns {respoke.Client}
	 */
	respoke.connect = function (params) {
	    var client = respoke.Client(params);
	    client.connect(params);
	    return client;
	};

	/**
	 * Getter for the respoke client.
	 *
	 * You can have more than one active client, so this method provides a way to retrieve a specific instance.
	 *
	 * @static
	 * @memberof respoke
	 * @param {string} id The Client ID.
	 * @returns {respoke.Client}
	 */
	respoke.getClient = function (id) {
	    if (id === undefined) {
	        log.debug("Can't call getClient with no client ID.", new Error().stack);
	    }
	    if (!respoke.instances[id]) {
	        log.debug("No client instance with id", id);
	    }
	    return respoke.instances[id];
	};

	/**
	 * This is one of two possible entry points for interating with the library.
	 *
	 * This method creates a new Client object which represents your user's connection to your Respoke app.
	 *
	 * It **does NOT automatically call the client.connect() method** after the client is created.
	 *
	 * The `params` argument is the same as `respoke.connect(params)`.
	 *
	 * @static
	 * @memberof respoke
	 * @param {object} [params] Parameters to respoke.Client - same as respoke.connect()
	 * @returns {respoke.Client}
	 */
	respoke.createClient = function (params) {
	    var client;
	    params = params || {};
	    if (params.instanceId) {
	        client = respoke.getClient(params.instanceId);
	        if (client) {
	            return client;
	        }
	    }
	    return respoke.Client(params);
	};

	/**
	 * Build a closure from a listener that will ensure the listener can only be called once.
	 * @static
	 * @private
	 * @memberof respoke
	 * @param {function} func
	 * @return {function}
	 */
	respoke.callOnce = function (func) {
	    return (function () {
	        var called = false;
	        return function () {
	            if (called === false) {
	                func.apply(null, arguments);
	                called = true;
	            }
	        };
	    })();
	};

	/**
	 * @static
	 * @private
	 * @memberof respoke
	 * @returns {number}
	 */
	respoke.makeGUID = function () {
	    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	    var uuid = new Array(36);
	    var rnd = 0;
	    var r;
	    for (var i = 0; i < 36; i += 1) {
	        if (i === 8 || i === 13 ||  i === 18 || i === 23) {
	            uuid[i] = '-';
	        } else if (i === 14) {
	            uuid[i] = '4';
	        } else {
	            if (rnd <= 0x02) {
	                rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
	            }
	            r = rnd & 0xf;
	            rnd = rnd >> 4;
	            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
	        }
	    }
	    return uuid.join('');
	};

	/**
	 * This method is used internally to attach handlers to promises that are returned by many methods in the library.
	 * It's not recommended that this method be used by developers and apps.
	 * @private
	 * @static
	 * @memberof respoke
	 * @param {Promise} promise
	 * @param {function} onSuccess
	 * @param {function} onError
	 * @returns {Promise|undefined}
	 */
	respoke.handlePromise = function (promise, onSuccess, onError) {
	    var returnUndef = false;
	    if (onSuccess || onError) {
	        returnUndef = true;
	    }

	    onSuccess = typeof onSuccess === 'function' ? onSuccess : function () {};
	    onError = typeof onError === 'function' ? onError : function () {};
	    promise.done(onSuccess, onError);
	    return (returnUndef ? undefined : promise);
	};

	/**
	 * Does the browser support `UserMedia`?
	 * @static
	 * @memberof respoke
	 * @returns {boolean}
	 */
	respoke.hasUserMedia = function () {
	    return (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) instanceof Function;
	};

	/**
	 * Does the browser support `RTCPeerConnection`?
	 * @static
	 * @memberof respoke
	 * @returns {boolean}
	 */
	respoke.hasRTCPeerConnection = function () {
	    return (window.RTCPeerConnection || window.webkitRTCPeerConnection ||
	            window.mozRTCPeerConnection) instanceof Function;
	};

	/**
	 * Does the browser support `WebSocket`?
	 * @static
	 * @memberof respoke
	 * @returns {boolean}
	 */
	respoke.hasWebsocket = function () {
	    return (window.WebSocket || window.webkitWebSocket || window.MozWebSocket) instanceof Function;
	};

	/**
	 * Does the browser have Screen Sharing enabled via browser extensions?
	 * @static
	 * @memberof respoke
	 * @returns {boolean}
	 */
	respoke.hasScreenShare = function () {
	    return respoke.hasChromeExtension || respoke.hasFirefoxExtension;
	};

	/**
	 * Clone an object.
	 * @static
	 * @memberof respoke
	 * @private
	 * @param {Object} source - The object to clone
	 * @returns {Object}
	 */
	respoke.clone = function (source) {
	    if (source) {
	        return JSON.parse(JSON.stringify(source));
	    }
	    return source;
	};

	/**
	 * Compares two objects for equality
	 * @static
	 * @memberof respoke
	 * @private
	 * @param {Object} a
	 * @param {Object} b
	 * @returns {boolean}
	 */
	respoke.isEqual = function (a, b) {
	    var aKeys;
	    var i;

	    //check if arrays
	    if (a && b && a.hasOwnProperty('length') && b.hasOwnProperty('length') && a.splice && b.splice) {
	        if (a.length !== b.length) {
	            //short circuit if arrays are different length
	            return false;
	        }

	        for (i = 0; i < a.length; i += 1) {
	            if (!respoke.isEqual(a[i], b[i])) {
	                return false;
	            }
	        }
	        return true;
	    }

	    if (typeof a === 'object' && typeof b === 'object' && Object.keys(a).length === Object.keys(b).length) {
	        aKeys = Object.keys(a);
	        for (i = 0; i < aKeys.length; i += 1) {
	            if (!respoke.isEqual(a[aKeys[i]], b[aKeys[i]])) {
	                return false;
	            }
	        }
	        return true;
	    }

	    return a === b;
	};

	/**
	 * Does the sdp indicate an audio stream?
	 * @static
	 * @memberof respoke
	 * @params {string}
	 * @returns {boolean}
	 * @private
	 */
	respoke.sdpHasAudio = function (sdp) {
	    if (!sdp) {
	        throw new Error("respoke.sdpHasAudio called with no parameters.");
	    }
	    return (sdp.indexOf('m=audio') !== -1 && sdp.indexOf('a=recvonly') === -1);
	};

	/**
	 * Does the sdp indicate a video stream?
	 * @static
	 * @memberof respoke
	 * @params {string}
	 * @returns {boolean}
	 * @private
	 */
	respoke.sdpHasVideo = function (sdp) {
	    if (!sdp) {
	        throw new Error("respoke.sdpHasVideo called with no parameters.");
	    }
	    return (sdp.indexOf('m=video') !== -1 && sdp.indexOf('a=recvonly') === -1);
	};

	/**
	 * Does the sdp indicate a data channel?
	 * @static
	 * @memberof respoke
	 * @params {string}
	 * @returns {boolean}
	 * @private
	 */
	respoke.sdpHasDataChannel = function (sdp) {
	    if (!sdp) {
	        throw new Error("respoke.sdpHasDataChannel called with no parameters.");
	    }
	    return sdp.indexOf('m=application') !== -1;
	};

	/**
	 * Does the sdp indicate the creator is sendOnly?
	 * @static
	 * @memberof respoke
	 * @params {string}
	 * @returns {boolean}
	 * @private
	 */
	respoke.sdpHasSendOnly = function (sdp) {
	    if (!sdp) {
	        throw new Error("respoke.sdpHasSendOnly called with no parameters.");
	    }
	    return sdp.indexOf('a=sendonly') !== -1;
	};

	/**
	 * Does the sdp indicate the creator is receiveOnly?
	 * @static
	 * @memberof respoke
	 * @params {string}
	 * @returns {boolean}
	 * @private
	 */
	respoke.sdpHasReceiveOnly = function (sdp) {
	    if (!sdp) {
	        throw new Error("respoke.sdpHasReceiveOnly called with no parameters.");
	    }
	    return sdp.indexOf('a=recvonly') !== -1;
	};

	/**
	 * Do the constraints indicate an audio stream?
	 * @static
	 * @memberof respoke
	 * @params {RTCConstraints}
	 * @returns {boolean}
	 * @private
	 */
	respoke.constraintsHasAudio = function (constraints) {
	    if (!constraints) {
	        throw new Error("respoke.constraintsHasAudio called with no parameters.");
	    }
	    return (constraints.audio === true);
	};

	/**
	 * Does the constraints indicate a video stream?
	 * @static
	 * @memberof respoke
	 * @params {RTCConstraints}
	 * @returns {boolean}
	 * @private
	 */
	respoke.constraintsHasVideo = function (constraints) {
	    if (!constraints) {
	        throw new Error("respoke.constraintsHasVideo called with no parameters.");
	    }
	    return (constraints.video === true || typeof constraints.video === 'object');
	};

	/**
	 * Does the constraints indicate a screenshare?
	 * @static
	 * @memberof respoke
	 * @params {RTCConstraints}
	 * @returns {boolean}
	 * @private
	 */
	respoke.constraintsHasScreenShare = function (constraints) {
	    if (!constraints) {
	        throw new Error("respoke.constraintsHasScreenShare called with no parameters.");
	    }

	    return (constraints.video && constraints.video.mandatory &&
	            (constraints.video.mandatory.chromeMediaSource || constraints.video.mediaSource));
	};

	/**
	 * Convert old-style constraints parameter into a constraints array.
	 * @static
	 * @memberof respoke
	 * @params {Array<RTCConstraints>|RTCConstraints} [constraints]
	 * @params {Array<RTCConstraints>} [defaults]
	 * @returns {Array<RTCConstraints>}
	 * @private
	 */
	respoke.convertConstraints = function (constraints, defaults) {
	    constraints = constraints || [];
	    defaults = defaults || [];

	    if (!constraints.splice) {
	        if (typeof constraints === 'object') {
	            constraints = [constraints];
	        } else {
	            constraints = [];
	        }
	    }

	    if (constraints.length === 0 && defaults.length > 0) {
	        return defaults;
	    }

	    return constraints;
	};

	/**
	 * Queue items until a trigger is called, then process them all with an action. Before trigger, hold items for
	 * processing. After trigger, process new items immediately.
	 * @static
	 * @memberof respoke
	 * @returns {Array}
	 * @private
	 */
	respoke.queueFactory = function () {
	    var queue = [];
	    // action replaces Array.push when trigger is called. Thrown errors will be caught and logged.
	    queue.trigger = function (action) {
	        if (!action) {
	            throw new Error("Trigger function requires an action parameter.");
	        }

	        function safeAction(item) {
	            try {
	                action(item);
	            } catch (err) {
	                log.error("Error calling queue action.", err);
	            }
	        }
	        queue.forEach(safeAction);
	        queue.length = 0;
	        queue.push = safeAction;
	    };

	    return queue;
	};

	/**
	 * Retrieve browser-specific WebRTC getUserMedia constraints needed to start a screen sharing call. Takes a set of
	 * optional override constraints and amends them for screen sharing.
	 *
	 * @memberof respoke
	 * @static
	 * @param {object} [params]
	 * @param {string} [params.source] The media source name to pass to firefox
	 * @param {RTCConstraints} [params.constraints] constraints to use as a base
	 * @returns {RTCConstraints}
	 * @private
	 */
	respoke.getScreenShareConstraints = function (params) {
	    params = params || {};

	    var screenConstraint = params.constraints || {
	        audio: false,
	        video: {
	            mandatory: {},
	            optional: []
	        }
	    };
	    screenConstraint.audio = false;
	    screenConstraint.video = typeof screenConstraint.video === 'object' ? screenConstraint.video : {};
	    screenConstraint.video.optional = Array.isArray(screenConstraint.video.optional) ?
	        screenConstraint.video.optional : [];
	    screenConstraint.video.mandatory = typeof screenConstraint.video.mandatory === 'object' ?
	        screenConstraint.video.mandatory : {};

	    if (respoke.needsChromeExtension || respoke.isNwjs) {
	        screenConstraint.audio = false;
	        screenConstraint.video.mandatory.chromeMediaSource = 'desktop';
	        screenConstraint.video.mandatory.maxWidth = typeof screenConstraint.video.mandatory.maxWidth === 'number' ?
	            screenConstraint.video.mandatory.maxWidth : 2000;
	        screenConstraint.video.mandatory.maxHeight = typeof screenConstraint.video.mandatory.maxHeight === 'number' ?
	            screenConstraint.video.mandatory.maxHeight : 2000;

	        if (screenConstraint.video.optional.length > 0) {
	            screenConstraint.video.optional.forEach(function (thing) {
	                thing.googTemporalLayeredScreencast = true;
	            });
	        } else {
	            screenConstraint.video.optional[0] = {
	                googTemporalLayeredScreencast: true
	            };
	        }
	    } else {
	        // firefox, et. al.
	        screenConstraint.video.mediaSource = params.source || 'screen';
	    }

	    return screenConstraint;
	};

	/**
	 * Retrieve a started instance of `respoke.LocalMedia` containing a screen share stream. Useful if you
	 * want to prepare the stream prior to starting a screen share.
	 *
	 *     respoke.getScreenShareMedia().then(function (localMedia) {
	 *         document.getElementById('#video').appendChild(localMedia.element);
	 *         group.listen('join', function (evt) {
	 *             evt.connection.startScreenShare({
	 *                 outgoingMedia: localMedia
	 *             });
	 *         });
	 *     }).catch(function (err) {
	 *         console.log(err);
	 *     });
	 *
	 * @static
	 * @memberof respoke
	 * @param {object} params
	 * @param {string} [params.source] - The source you would like to use for your screen share. Values vary by browser.
	 *  In Chrome, acceptable values are one of 'screen', 'window', or 'tab'.
	 *  In Firefox, acceptable values are one of 'screen', 'window', or 'application'.
	 * @param {RTCConstraints|Array<RTCConstraints>} [params.constraints] - constraints to use as a base
	 * @param {HTMLVideoElement} [params.element] - Pass in an optional html video element to have local
	 *  video attached to it.
	 * @param {function} [params.onSuccess] Upon success, called with instance of `respoke.LocalMedia`
	 * @param {function} [params.onError] Upon failure, called with the error that occurred.
	 * @returns {Promise|undefined}
	 * @private
	 */
	respoke.getScreenShareMedia = function (params) {
	    params = params || {};

	    var deferred = respoke.Q.defer();
	    var criteria = {
	        source: params.source,
	        constraints: respoke.clone(params.constraints)
	    };
	    var localMedia = respoke.LocalMedia({
	        hasScreenShare: true,
	        constraints: respoke.getScreenShareConstraints(criteria),
	        source: params.source,
	        element: params.element
	    });

	    localMedia.start().done(function () {
	        deferred.resolve(localMedia);
	    }, function (err) {
	        deferred.reject(err);
	    });

	    return respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	* loglevel - https://github.com/pimterry/loglevel
	*
	* Copyright (c) 2013 Tim Perry
	* Licensed under the MIT license.
	*/
	(function (root, definition) {
	    "use strict";
	    if (typeof module === 'object' && module.exports && "function" === 'function') {
	        module.exports = definition();
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        root.log = definition();
	    }
	}(this, function () {
	    "use strict";
	    var noop = function() {};
	    var undefinedType = "undefined";

	    function realMethod(methodName) {
	        if (typeof console === undefinedType) {
	            return false; // We can't build a real method without a console to log to
	        } else if (console[methodName] !== undefined) {
	            return bindMethod(console, methodName);
	        } else if (console.log !== undefined) {
	            return bindMethod(console, 'log');
	        } else {
	            return noop;
	        }
	    }

	    function bindMethod(obj, methodName) {
	        var method = obj[methodName];
	        if (typeof method.bind === 'function') {
	            return method.bind(obj);
	        } else {
	            try {
	                return Function.prototype.bind.call(method, obj);
	            } catch (e) {
	                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
	                return function() {
	                    return Function.prototype.apply.apply(method, [obj, arguments]);
	                };
	            }
	        }
	    }

	    // these private functions always need `this` to be set properly

	    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
	        return function () {
	            if (typeof console !== undefinedType) {
	                replaceLoggingMethods.call(this, level, loggerName);
	                this[methodName].apply(this, arguments);
	            }
	        };
	    }

	    function replaceLoggingMethods(level, loggerName) {
	        /*jshint validthis:true */
	        for (var i = 0; i < logMethods.length; i++) {
	            var methodName = logMethods[i];
	            this[methodName] = (i < level) ?
	                noop :
	                this.methodFactory(methodName, level, loggerName);
	        }
	    }

	    function defaultMethodFactory(methodName, level, loggerName) {
	        /*jshint validthis:true */
	        return realMethod(methodName) ||
	               enableLoggingWhenConsoleArrives.apply(this, arguments);
	    }

	    var logMethods = [
	        "trace",
	        "debug",
	        "info",
	        "warn",
	        "error"
	    ];

	    function Logger(name, defaultLevel, factory) {
	      var self = this;
	      var currentLevel;
	      var storageKey = "loglevel";
	      if (name) {
	        storageKey += ":" + name;
	      }

	      function persistLevelIfPossible(levelNum) {
	          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

	          // Use localStorage if available
	          try {
	              window.localStorage[storageKey] = levelName;
	              return;
	          } catch (ignore) {}

	          // Use session cookie as fallback
	          try {
	              window.document.cookie =
	                encodeURIComponent(storageKey) + "=" + levelName + ";";
	          } catch (ignore) {}
	      }

	      function getPersistedLevel() {
	          var storedLevel;

	          try {
	              storedLevel = window.localStorage[storageKey];
	          } catch (ignore) {}

	          if (typeof storedLevel === undefinedType) {
	              try {
	                  var cookie = window.document.cookie;
	                  var location = cookie.indexOf(
	                      encodeURIComponent(storageKey) + "=");
	                  if (location) {
	                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
	                  }
	              } catch (ignore) {}
	          }

	          // If the stored level is not valid, treat it as if nothing was stored.
	          if (self.levels[storedLevel] === undefined) {
	              storedLevel = undefined;
	          }

	          return storedLevel;
	      }

	      /*
	       *
	       * Public API
	       *
	       */

	      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
	          "ERROR": 4, "SILENT": 5};

	      self.methodFactory = factory || defaultMethodFactory;

	      self.getLevel = function () {
	          return currentLevel;
	      };

	      self.setLevel = function (level, persist) {
	          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
	              level = self.levels[level.toUpperCase()];
	          }
	          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
	              currentLevel = level;
	              if (persist !== false) {  // defaults to true
	                  persistLevelIfPossible(level);
	              }
	              replaceLoggingMethods.call(self, level, name);
	              if (typeof console === undefinedType && level < self.levels.SILENT) {
	                  return "No console available for logging";
	              }
	          } else {
	              throw "log.setLevel() called with invalid level: " + level;
	          }
	      };

	      self.setDefaultLevel = function (level) {
	          if (!getPersistedLevel()) {
	              self.setLevel(level, false);
	          }
	      };

	      self.enableAll = function(persist) {
	          self.setLevel(self.levels.TRACE, persist);
	      };

	      self.disableAll = function(persist) {
	          self.setLevel(self.levels.SILENT, persist);
	      };

	      // Initialize with the right level
	      var initialLevel = getPersistedLevel();
	      if (initialLevel == null) {
	          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
	      }
	      self.setLevel(initialLevel, false);
	    }

	    /*
	     *
	     * Package-level API
	     *
	     */

	    var defaultLogger = new Logger();

	    var _loggersByName = {};
	    defaultLogger.getLogger = function getLogger(name) {
	        if (typeof name !== "string" || name === "") {
	          throw new TypeError("You must supply a name when creating a logger.");
	        }

	        var logger = _loggersByName[name];
	        if (!logger) {
	          logger = _loggersByName[name] = new Logger(
	            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
	        }
	        return logger;
	    };

	    // Grab the current global log variable in case of overwrite
	    var _log = (typeof window !== undefinedType) ? window.log : undefined;
	    defaultLogger.noConflict = function() {
	        if (typeof window !== undefinedType &&
	               window.log === defaultLogger) {
	            window.log = _log;
	        }

	        return defaultLogger;
	    };

	    return defaultLogger;
	}));


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*!
	 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the same directory as
	 *  this source file.
	 * @ignore
	 */

	/* More information about these options at jshint.com/docs/options */

	/* jshint browser: true, camelcase: true, curly: true, devel: true,
	eqeqeq: true, forin: false, globalstrict: true, quotmark: single,
	undef: true, unused: strict */

	/* global mozRTCIceCandidate, mozRTCPeerConnection,
	mozRTCSessionDescription, webkitRTCPeerConnection */

	/* exported trace */

	'use strict';

	var RTCPeerConnection = null;
	var getUserMedia = null;
	var attachMediaStream = null;
	var reattachMediaStream = null;
	var webrtcDetectedBrowser = null;
	var webrtcDetectedVersion = null;

	function trace(text) {
	  // This function is used for logging.
	  if (text[text.length - 1] === '\n') {
	    text = text.substring(0, text.length - 1);
	  }
	  console.log((window.performance.now() / 1000).toFixed(3) + ': ' + text);
	}

	function maybeFixConfiguration(pcConfig) {
	  if (!pcConfig) {
	    return;
	  }
	  for (var i = 0; i < pcConfig.iceServers.length; i++) {
	    if (pcConfig.iceServers[i].hasOwnProperty('urls')) {
	      pcConfig.iceServers[i].url = pcConfig.iceServers[i].urls;
	      delete pcConfig.iceServers[i].urls;
	    }
	  }
	}

	if (navigator.mozGetUserMedia) {
	  console.log('This appears to be Firefox');

	  webrtcDetectedBrowser = 'firefox';

	  webrtcDetectedVersion =
	    parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);

	  // The RTCPeerConnection object.
	  RTCPeerConnection = function(pcConfig, pcConstraints) {
	    // .urls is not supported in FF yet.
	    maybeFixConfiguration(pcConfig);
	    return new mozRTCPeerConnection(pcConfig, pcConstraints);
	  };

	  // The RTCSessionDescription object.
	  window.RTCSessionDescription = mozRTCSessionDescription;

	  // The RTCIceCandidate object.
	  window.RTCIceCandidate = mozRTCIceCandidate;

	  // getUserMedia shim (only difference is the prefix).
	  // Code from Adam Barth.
	  getUserMedia = navigator.mozGetUserMedia.bind(navigator);
	  navigator.getUserMedia = getUserMedia;

	  // Creates ICE server from the URL for FF.
	  window.createIceServer = function(url, username, password) {
	    var iceServer = null;
	    var urlParts = url.split(':');
	    if (urlParts[0].indexOf('stun') === 0) {
	      // Create ICE server with STUN URL.
	      iceServer = {
	        'url': url
	      };
	    } else if (urlParts[0].indexOf('turn') === 0) {
	      if (webrtcDetectedVersion < 27) {
	        // Create iceServer with turn url.
	        // Ignore the transport parameter from TURN url for FF version <=27.
	        var turnUrlParts = url.split('?');
	        // Return null for createIceServer if transport=tcp.
	        if (turnUrlParts.length === 1 ||
	          turnUrlParts[1].indexOf('transport=udp') === 0) {
	          iceServer = {
	            'url': turnUrlParts[0],
	            'credential': password,
	            'username': username
	          };
	        }
	      } else {
	        // FF 27 and above supports transport parameters in TURN url,
	        // So passing in the full url to create iceServer.
	        iceServer = {
	          'url': url,
	          'credential': password,
	          'username': username
	        };
	      }
	    }
	    return iceServer;
	  };

	  window.createIceServers = function(urls, username, password) {
	    var iceServers = [];
	    // Use .url for FireFox.
	    for (var i = 0; i < urls.length; i++) {
	      var iceServer =
	        window.createIceServer(urls[i], username, password);
	      if (iceServer !== null) {
	        iceServers.push(iceServer);
	      }
	    }
	    return iceServers;
	  };

	  // Attach a media stream to an element.
	  attachMediaStream = function(element, stream) {
	    //console.log('Attaching media stream');
	    element.mozSrcObject = stream;
	    setTimeout(function () {
	      element.play();
	    }, 100);
	  };

	  reattachMediaStream = function(to, from) {
	    //console.log('Reattaching media stream');
	    to.mozSrcObject = from.mozSrcObject;
	  };

	} else if (navigator.webkitGetUserMedia) {
	  console.log('This appears to be Chrome');

	  webrtcDetectedBrowser = 'chrome';
	  // Temporary fix until crbug/374263 is fixed.
	  // Setting Chrome version to 999, if version is unavailable.
	  var result = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
	  if (result !== null) {
	    webrtcDetectedVersion = parseInt(result[2], 10);
	  } else {
	    webrtcDetectedVersion = 999;
	  }

	  // Creates iceServer from the url for Chrome M33 and earlier.
	  window.createIceServer = function(url, username, password) {
	    var iceServer = null;
	    var urlParts = url.split(':');
	    if (urlParts[0].indexOf('stun') === 0) {
	      // Create iceServer with stun url.
	      iceServer = {
	        'url': url
	      };
	    } else if (urlParts[0].indexOf('turn') === 0) {
	      // Chrome M28 & above uses below TURN format.
	      iceServer = {
	        'url': url,
	        'credential': password,
	        'username': username
	      };
	    }
	    return iceServer;
	  };

	  // Creates iceServers from the urls for Chrome M34 and above.
	  window.createIceServers = function(urls, username, password) {
	    var iceServers = [];
	    if (webrtcDetectedVersion >= 34) {
	      // .urls is supported since Chrome M34.
	      iceServers = {
	        'urls': urls,
	        'credential': password,
	        'username': username
	      };
	    } else {
	      for (var i = 0; i < urls.length; i++) {
	        var iceServer =
	          window.createIceServer(urls[i], username, password);
	        if (iceServer !== null) {
	          iceServers.push(iceServer);
	        }
	      }
	    }
	    return iceServers;
	  };

	  // The RTCPeerConnection object.
	  RTCPeerConnection = function(pcConfig, pcConstraints) {
	    // .urls is supported since Chrome M34.
	    if (webrtcDetectedVersion < 34) {
	      maybeFixConfiguration(pcConfig);
	    }
	    return new webkitRTCPeerConnection(pcConfig, pcConstraints);
	  };

	  // Get UserMedia (only difference is the prefix).
	  // Code from Adam Barth.
	  getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
	  navigator.getUserMedia = getUserMedia;

	  // Attach a media stream to an element.
	  attachMediaStream = function(element, stream) {
	    if (typeof element.srcObject !== 'undefined') {
	      element.srcObject = stream;
	    } else if (typeof element.mozSrcObject !== 'undefined') {
	      element.mozSrcObject = stream;
	    } else if (typeof element.src !== 'undefined') {
	      element.src = URL.createObjectURL(stream);
	    } else {
	      console.log('Error attaching stream to element.');
	    }
	  };

	  reattachMediaStream = function(to, from) {
	    to.src = from.src;
	  };
	} else {
	  console.log('Browser does not appear to be WebRTC-capable');
	}


	window.RTCPeerConnection = RTCPeerConnection;
	window.getUserMedia = getUserMedia;
	window.attachMediaStream = attachMediaStream;
	window.reattachMediaStream = reattachMediaStream;
	window.webrtcDetectedBrowser = webrtcDetectedBrowser;
	window.webrtcDetectedVersion = webrtcDetectedVersion;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	var log = __webpack_require__(2);
	var respokeClass = __webpack_require__(5);

	/**
	 * Higher order function to wrap a passed in function. The returned function will only execute
	 * the passed in function the first time it is called, then be a no-op any subsequent tries.
	 *
	 * @private
	 */
	var callOnce = function (func) {
	    "use strict";
	    return (function () {
	        var called = false;
	        return function () {
	            if (!called) {
	                func.apply(null, arguments);
	                called = true;
	            }
	        };
	    })();
	};

	/**
	 * A generic class for emitting and listening to events. This is used internally by respoke.js
	 * to provide evented behavior. You can add custom events and inherit your own objects from
	 * the EventEmitter.
	 *
	 * ```
	 * // Adding a custom event to a respoke.Client instance
	 * client.listen('my-event', function (evt) { });
	 * client.fire('my-event', { name: 'my-event', asdf: 'jkl' });
	 * ```
	 *
	 * ```
	 * // Custom EventEmitter
	 * var MyCustomEmitter = respoke.EventEmitter();
	 * var emitterInstance = MyCustomEmitter();
	 * emitterInstance.fire('hi', { name: 'hi', message: 'hello' });
	 * emitterInstance.listen('hi', function (evt) { });
	 * ```
	 *
	 * @class respoke.EventEmitter
	 * @inherits respoke.Class
	 * @constructor
	 * @param {object} params
	 * @param {string} params.instanceId
	 * @returns {respoke.EventEmitter}
	 */
	var EventEmitter = module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    var that = respokeClass(params);
	    /**
	     * A name to identify the type of this object.
	     * @memberof! respoke.EventEmitter
	     * @name className
	     * @type {string}
	     * @private
	     */
	    that.className = 'respoke.EventEmitter';

	    /**
	     * @memberof! respoke.EventEmitter
	     * @name eventList
	     * @private
	     * @type {object}
	     */
	    var eventList = {};

	    /**
	     * Add a listener that will only be called once to an object.  This method adds the given listener to the given
	     * event in the case that the same
	     * listener is not already registered to this event and the listener is a function.  The third argument 'isInternal'
	     * is used only internally by the library to indicate that this listener is a library-used listener and should not
	     * count when we are trying to determine if an event has listeners placed by the developer.
	     *
	     *     client.once('connect', function (evt) {
	     *         console.log("This is the first time we connected.");
	     *     });
	     *
	     * @memberof! respoke.EventEmitter
	     * @method respoke.EventEmitter.listen
	     * @param {string} eventType - A developer-specified string identifying the event.
	     * @param {respoke.EventEmitter.eventListener} listener - A function to call when the event is fire.
	     * @param {boolean} [isInternal] - A flag to indicate this listener was added by the library. This parameter should
	     * not be used by developers who are using the library, only by developers who are working on the library itself.
	     */
	    that.once = function (eventType, listener, isInternal) {
	        var string = listener.toString();
	        listener = callOnce(listener);
	        listener.toString = function () { return string; };
	        listener.once = true;
	        that.listen(eventType, listener, isInternal);
	    };

	    /**
	     * Add a `listener` function to an object.
	     *
	     * This method adds the `listener` to the event `eventName`.
	     *
	     * If an identical listener already registered to this event, it will **not** be added.
	     *
	     * ##### Example of adding an event listener.
	     *
	     *     client.listen('connect', function (evt) {
	     *         console.log("We've connected!", evt);
	     *     });
	     *
	     * @memberof! respoke.EventEmitter
	     * @method respoke.EventEmitter.listen
	     * @param {string} eventType - The name of the event.
	     * @param {respoke.EventEmitter.eventListener} listener - A function to call when the event is
	     * fired.
	     * @arg {boolean} isInternal - Internal use only. A flag to indicate this listener was
	     * added by the library. This parameter should not be used by developers who are using
	     * the library, only by developers who are working on the library itself.
	     */
	    that.listen = function (eventType, listener, isInternal) {
	        if (listener === undefined) {
	            return;
	        }
	        var invalidEventType = typeof eventType !== 'string' || !eventType;
	        var invalidListener = typeof listener !== 'function';
	        if (invalidEventType || invalidListener) {
	            log.error("Invalid request to add event listener to", eventType, listener);
	            return;
	        }

	        eventList[eventType] = eventList[eventType] || [];
	        listener.isInternal = !!isInternal; // boolify

	        var toString = function (fn) {
	            return fn.toString();
	        };
	        var isNotAlreadyAdded = eventList[eventType].map(toString).indexOf(listener.toString()) === -1;

	        if (isNotAlreadyAdded) {
	            eventList[eventType].push(listener);
	        } else {
	            log.warn("Not adding duplicate listener to", eventType, listener);
	        }
	    };

	    /**
	     * Remove a listener from an object. If no eventType is specified, all eventTypes will be
	     * cleared. If an eventType is specified but no listener is specified, all listeners will be
	     * removed from the specified eventType.  If a listener is also specified, only that listener
	     * will be removed.
	     *
	     *     client.ignore('connect', connectHandler);
	     *
	     * @memberof! respoke.EventEmitter
	     * @method respoke.EventEmitter.ignore
	     * @param {string} [eventType] - An optional developer-specified string identifying the event.
	     * @param {function} [listener] - An optional function to remove from the specified event.
	     */
	    that.ignore = function (eventType, listener) {
	        // Remove all events from this object
	        if (eventType === undefined) {
	            eventList = {};
	            return;
	        }

	        // Remove all listeners from this event.
	        if (listener === undefined || !eventList[eventType]) {
	            eventList[eventType] = [];
	            return;
	        }

	        // Remove only one listener from this event.
	        for (var i = eventList[eventType].length - 1; i >= 0; i -= 1) {
	            if (listener === eventList[eventType][i]) {
	                eventList[eventType].splice(i, 1);
	                return;
	            }
	        }
	    };

	    /**
	     * Trigger an event on an object. All listeners for the specified eventType will be called.
	     * Listeners will be bound to the object ('this' will refer to the object), and additional
	     * arguments to fire() will be passed into each listener.
	     * @memberof! respoke.EventEmitter
	     * @method respoke.EventEmitter.fire
	     * @param {string} eventType - A developer-specified string identifying the event to fire.
	     * @param {string|number|object|array} evt - Any number of optional parameters to be passed to
	     * the listener
	     * @private
	     */
	    that.fire = function (eventType, evt) {
	        var args = null;
	        var count = 0;
	        var toRemove = [];
	        var i;

	        evt = evt || {};
	        evt.name = eventType;
	        evt.target = that;

	        if (!eventType) {
	            return;
	        }

	        if (!eventList[eventType]) {
	            log.debug("fired " + that.className + "#" + eventType + " 0 listeners called with params", evt);
	            return;
	        }

	        for (i = 0; i < eventList[eventType].length; i += 1) {
	            var listener = eventList[eventType][i];
	            if (typeof listener === 'function') {
	                setTimeout(listenerBuilder(listener, evt, eventType));

	                count += 1;
	                if (listener.once === true) {
	                    toRemove.push(i);
	                }
	            }
	        }

	        for (i = (toRemove.length - 1); i >= 0; i -= 1) {
	            eventList[eventType].splice(toRemove[i], 1);
	        }

	        log.debug("fired " + that.className + "#" + eventType + " " + count + " listeners called with params", evt);
	    };

	    function listenerBuilder(listener, evt, eventType) {
	        return function () {
	            try {
	                listener.call(that, evt);
	            } catch (e) {
	                log.error('Error in ' + that.className + "#" + eventType, e.message, e.stack);
	            }
	        };
	    }

	    /**
	     * Determine if an object has had any listeners registered for a given event outside the library. This method
	     * checks for the isInternal flag on each listener and doesn't count it toward an event being listened to. This
	     * method is used in the library to handle situations where an action is needed if an event won't be acted on.
	     * For instance, if a call comes in for the logged-in user, but the developer isn't listening to
	     * {respoke.Client#call}, we'll need to reject the call immediately.
	     *
	     *     if (client.hasListeners('call')) {
	     *         // already handled!
	     *     }
	     *
	     * @memberof! respoke.EventEmitter
	     * @method respoke.EventEmitter.hasListeners
	     * @param {string} eventType - The name of the event
	     * @returns {boolean} Whether this event has any listeners that are external to this library.
	     */
	    that.hasListeners = function (eventType) {
	        if (eventType === undefined) {
	            throw new Error("Missing required parameter event type.");
	        }

	        if (!eventList[eventType]) {
	            return false;
	        }

	        return !eventList[eventType].every(function eachListener(listener) {
	            return listener.isInternal;
	        });
	    };

	    return that;
	}; // End respoke.EventEmitter
	/**
	 * @callback respoke.EventEmitter.eventListener
	 * @param {respoke.Event} evt
	 */


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	/**
	 * Empty base class. Use params.that (if exists) for the base object, but delete it from the instance.
	 * Copy all params that were passed in onto the base object. Add the class name.
	 * @class respoke.Class
	 * @private
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    var that = params.that || {};

	    that.className = 'respoke.Class';
	    delete params.that;
	    delete that.client;

	    Object.keys(params).forEach(function copyParam(name) {
	        that[name] = params[name];
	    });

	    return that;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/*! Socket.IO.js build:0.9.17, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */

	var io = ( false ? {} : module.exports);
	(function() {

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, global) {

	  /**
	   * IO namespace.
	   *
	   * @namespace
	   */

	  var io = exports;

	  /**
	   * Socket.IO version
	   *
	   * @api public
	   */

	  io.version = '0.9.17';

	  /**
	   * Protocol implemented.
	   *
	   * @api public
	   */

	  io.protocol = 1;

	  /**
	   * Available transports, these will be populated with the available transports
	   *
	   * @api public
	   */

	  io.transports = [];

	  /**
	   * Keep track of jsonp callbacks.
	   *
	   * @api private
	   */

	  io.j = [];

	  /**
	   * Keep track of our io.Sockets
	   *
	   * @api private
	   */
	  io.sockets = {};


	  /**
	   * Manages connections to hosts.
	   *
	   * @param {String} uri
	   * @Param {Boolean} force creation of new socket (defaults to false)
	   * @api public
	   */

	  io.connect = function (host, details) {
	    var uri = io.util.parseUri(host)
	      , uuri
	      , socket;

	    if (global && global.location) {
	      uri.protocol = uri.protocol || global.location.protocol.slice(0, -1);
	      uri.host = uri.host || (global.document
	        ? global.document.domain : global.location.hostname);
	      uri.port = uri.port || global.location.port;
	    }

	    uuri = io.util.uniqueUri(uri);

	    var options = {
	        host: uri.host
	      , secure: 'https' == uri.protocol
	      , port: uri.port || ('https' == uri.protocol ? 443 : 80)
	      , query: uri.query || ''
	    };

	    io.util.merge(options, details);

	    if (options['force new connection'] || !io.sockets[uuri]) {
	      socket = new io.Socket(options);
	    }

	    if (!options['force new connection'] && socket) {
	      io.sockets[uuri] = socket;
	    }

	    socket = socket || io.sockets[uuri];

	    // if path is different from '' or /
	    return socket.of(uri.path.length > 1 ? uri.path : '');
	  };

	})( true ? module.exports : (this.io = {}), this);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, global) {

	  /**
	   * Utilities namespace.
	   *
	   * @namespace
	   */

	  var util = exports.util = {};

	  /**
	   * Parses an URI
	   *
	   * @author Steven Levithan <stevenlevithan.com> (MIT license)
	   * @api public
	   */

	  var re = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

	  var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password',
	               'host', 'port', 'relative', 'path', 'directory', 'file', 'query',
	               'anchor'];

	  util.parseUri = function (str) {
	    var m = re.exec(str || '')
	      , uri = {}
	      , i = 14;

	    while (i--) {
	      uri[parts[i]] = m[i] || '';
	    }

	    return uri;
	  };

	  /**
	   * Produces a unique url that identifies a Socket.IO connection.
	   *
	   * @param {Object} uri
	   * @api public
	   */

	  util.uniqueUri = function (uri) {
	    var protocol = uri.protocol
	      , host = uri.host
	      , port = uri.port;

	    if ('document' in global) {
	      host = host || document.domain;
	      port = port || (protocol == 'https'
	        && document.location.protocol !== 'https:' ? 443 : document.location.port);
	    } else {
	      host = host || 'localhost';

	      if (!port && protocol == 'https') {
	        port = 443;
	      }
	    }

	    return (protocol || 'http') + '://' + host + ':' + (port || 80);
	  };

	  /**
	   * Mergest 2 query strings in to once unique query string
	   *
	   * @param {String} base
	   * @param {String} addition
	   * @api public
	   */

	  util.query = function (base, addition) {
	    var query = util.chunkQuery(base || '')
	      , components = [];

	    util.merge(query, util.chunkQuery(addition || ''));
	    for (var part in query) {
	      if (query.hasOwnProperty(part)) {
	        components.push(part + '=' + query[part]);
	      }
	    }

	    return components.length ? '?' + components.join('&') : '';
	  };

	  /**
	   * Transforms a querystring in to an object
	   *
	   * @param {String} qs
	   * @api public
	   */

	  util.chunkQuery = function (qs) {
	    var query = {}
	      , params = qs.split('&')
	      , i = 0
	      , l = params.length
	      , kv;

	    for (; i < l; ++i) {
	      kv = params[i].split('=');
	      if (kv[0]) {
	        query[kv[0]] = kv[1];
	      }
	    }

	    return query;
	  };

	  /**
	   * Executes the given function when the page is loaded.
	   *
	   *     io.util.load(function () { console.log('page loaded'); });
	   *
	   * @param {Function} fn
	   * @api public
	   */

	  var pageLoaded = false;

	  util.load = function (fn) {
	    if ('document' in global && document.readyState === 'complete' || pageLoaded) {
	      return fn();
	    }

	    util.on(global, 'load', fn, false);
	  };

	  /**
	   * Adds an event.
	   *
	   * @api private
	   */

	  util.on = function (element, event, fn, capture) {
	    if (element.attachEvent) {
	      element.attachEvent('on' + event, fn);
	    } else if (element.addEventListener) {
	      element.addEventListener(event, fn, capture);
	    }
	  };

	  /**
	   * Generates the correct `XMLHttpRequest` for regular and cross domain requests.
	   *
	   * @param {Boolean} [xdomain] Create a request that can be used cross domain.
	   * @returns {XMLHttpRequest|false} If we can create a XMLHttpRequest.
	   * @api private
	   */

	  util.request = function (xdomain) {

	    if (xdomain && 'undefined' != typeof XDomainRequest && !util.ua.hasCORS) {
	      return new XDomainRequest();
	    }

	    if ('undefined' != typeof XMLHttpRequest && (!xdomain || util.ua.hasCORS)) {
	      return new XMLHttpRequest();
	    }

	    if (!xdomain) {
	      try {
	        return new window[(['Active'].concat('Object').join('X'))]('Microsoft.XMLHTTP');
	      } catch(e) { }
	    }

	    return null;
	  };

	  /**
	   * XHR based transport constructor.
	   *
	   * @constructor
	   * @api public
	   */

	  /**
	   * Change the internal pageLoaded value.
	   */

	  if ('undefined' != typeof window) {
	    util.load(function () {
	      pageLoaded = true;
	    });
	  }

	  /**
	   * Defers a function to ensure a spinner is not displayed by the browser
	   *
	   * @param {Function} fn
	   * @api public
	   */

	  util.defer = function (fn) {
	    if (!util.ua.webkit || 'undefined' != typeof importScripts) {
	      return fn();
	    }

	    util.load(function () {
	      setTimeout(fn, 100);
	    });
	  };

	  /**
	   * Merges two objects.
	   *
	   * @api public
	   */

	  util.merge = function merge (target, additional, deep, lastseen) {
	    var seen = lastseen || []
	      , depth = typeof deep == 'undefined' ? 2 : deep
	      , prop;

	    for (prop in additional) {
	      if (additional.hasOwnProperty(prop) && util.indexOf(seen, prop) < 0) {
	        if (typeof target[prop] !== 'object' || !depth) {
	          target[prop] = additional[prop];
	          seen.push(additional[prop]);
	        } else {
	          util.merge(target[prop], additional[prop], depth - 1, seen);
	        }
	      }
	    }

	    return target;
	  };

	  /**
	   * Merges prototypes from objects
	   *
	   * @api public
	   */

	  util.mixin = function (ctor, ctor2) {
	    util.merge(ctor.prototype, ctor2.prototype);
	  };

	  /**
	   * Shortcut for prototypical and static inheritance.
	   *
	   * @api private
	   */

	  util.inherit = function (ctor, ctor2) {
	    function f() {};
	    f.prototype = ctor2.prototype;
	    ctor.prototype = new f;
	  };

	  /**
	   * Checks if the given object is an Array.
	   *
	   *     io.util.isArray([]); // true
	   *     io.util.isArray({}); // false
	   *
	   * @param Object obj
	   * @api public
	   */

	  util.isArray = Array.isArray || function (obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]';
	  };

	  /**
	   * Intersects values of two arrays into a third
	   *
	   * @api public
	   */

	  util.intersect = function (arr, arr2) {
	    var ret = []
	      , longest = arr.length > arr2.length ? arr : arr2
	      , shortest = arr.length > arr2.length ? arr2 : arr;

	    for (var i = 0, l = shortest.length; i < l; i++) {
	      if (~util.indexOf(longest, shortest[i]))
	        ret.push(shortest[i]);
	    }

	    return ret;
	  };

	  /**
	   * Array indexOf compatibility.
	   *
	   * @see bit.ly/a5Dxa2
	   * @api public
	   */

	  util.indexOf = function (arr, o, i) {

	    for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0;
	         i < j && arr[i] !== o; i++) {}

	    return j <= i ? -1 : i;
	  };

	  /**
	   * Converts enumerables to array.
	   *
	   * @api public
	   */

	  util.toArray = function (enu) {
	    var arr = [];

	    for (var i = 0, l = enu.length; i < l; i++)
	      arr.push(enu[i]);

	    return arr;
	  };

	  /**
	   * UA / engines detection namespace.
	   *
	   * @namespace
	   */

	  util.ua = {};

	  /**
	   * Whether the UA supports CORS for XHR.
	   *
	   * @api public
	   */

	  util.ua.hasCORS = 'undefined' != typeof XMLHttpRequest && (function () {
	    try {
	      var a = new XMLHttpRequest();
	    } catch (e) {
	      return false;
	    }

	    return a.withCredentials != undefined;
	  })();

	  /**
	   * Detect webkit.
	   *
	   * @api public
	   */

	  util.ua.webkit = 'undefined' != typeof navigator
	    && /webkit/i.test(navigator.userAgent);

	   /**
	   * Detect iPad/iPhone/iPod.
	   *
	   * @api public
	   */

	  util.ua.iDevice = 'undefined' != typeof navigator
	      && /iPad|iPhone|iPod/i.test(navigator.userAgent);

	})('undefined' != typeof io ? io : module.exports, this);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.EventEmitter = EventEmitter;

	  /**
	   * Event emitter constructor.
	   *
	   * @api public.
	   */

	  function EventEmitter () {};

	  /**
	   * Adds a listener
	   *
	   * @api public
	   */

	  EventEmitter.prototype.on = function (name, fn) {
	    if (!this.$events) {
	      this.$events = {};
	    }

	    if (!this.$events[name]) {
	      this.$events[name] = fn;
	    } else if (io.util.isArray(this.$events[name])) {
	      this.$events[name].push(fn);
	    } else {
	      this.$events[name] = [this.$events[name], fn];
	    }

	    return this;
	  };

	  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	  /**
	   * Adds a volatile listener.
	   *
	   * @api public
	   */

	  EventEmitter.prototype.once = function (name, fn) {
	    var self = this;

	    function on () {
	      self.removeListener(name, on);
	      fn.apply(this, arguments);
	    };

	    on.listener = fn;
	    this.on(name, on);

	    return this;
	  };

	  /**
	   * Removes a listener.
	   *
	   * @api public
	   */

	  EventEmitter.prototype.removeListener = function (name, fn) {
	    if (this.$events && this.$events[name]) {
	      var list = this.$events[name];

	      if (io.util.isArray(list)) {
	        var pos = -1;

	        for (var i = 0, l = list.length; i < l; i++) {
	          if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
	            pos = i;
	            break;
	          }
	        }

	        if (pos < 0) {
	          return this;
	        }

	        list.splice(pos, 1);

	        if (!list.length) {
	          delete this.$events[name];
	        }
	      } else if (list === fn || (list.listener && list.listener === fn)) {
	        delete this.$events[name];
	      }
	    }

	    return this;
	  };

	  /**
	   * Removes all listeners for an event.
	   *
	   * @api public
	   */

	  EventEmitter.prototype.removeAllListeners = function (name) {
	    if (name === undefined) {
	      this.$events = {};
	      return this;
	    }

	    if (this.$events && this.$events[name]) {
	      this.$events[name] = null;
	    }

	    return this;
	  };

	  /**
	   * Gets all listeners for a certain event.
	   *
	   * @api publci
	   */

	  EventEmitter.prototype.listeners = function (name) {
	    if (!this.$events) {
	      this.$events = {};
	    }

	    if (!this.$events[name]) {
	      this.$events[name] = [];
	    }

	    if (!io.util.isArray(this.$events[name])) {
	      this.$events[name] = [this.$events[name]];
	    }

	    return this.$events[name];
	  };

	  /**
	   * Emits an event.
	   *
	   * @api public
	   */

	  EventEmitter.prototype.emit = function (name) {
	    if (!this.$events) {
	      return false;
	    }

	    var handler = this.$events[name];

	    if (!handler) {
	      return false;
	    }

	    var args = Array.prototype.slice.call(arguments, 1);

	    if ('function' == typeof handler) {
	      handler.apply(this, args);
	    } else if (io.util.isArray(handler)) {
	      var listeners = handler.slice();

	      for (var i = 0, l = listeners.length; i < l; i++) {
	        listeners[i].apply(this, args);
	      }
	    } else {
	      return false;
	    }

	    return true;
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	/**
	 * Based on JSON2 (http://www.JSON.org/js.html).
	 */

	(function (exports, nativeJSON) {
	  "use strict";

	  // use native JSON if it's available
	  if (nativeJSON && nativeJSON.parse){
	    return exports.JSON = {
	      parse: nativeJSON.parse
	    , stringify: nativeJSON.stringify
	    };
	  }

	  var JSON = exports.JSON = {};

	  function f(n) {
	      // Format integers to have at least two digits.
	      return n < 10 ? '0' + n : n;
	  }

	  function date(d, key) {
	    return isFinite(d.valueOf()) ?
	        d.getUTCFullYear()     + '-' +
	        f(d.getUTCMonth() + 1) + '-' +
	        f(d.getUTCDate())      + 'T' +
	        f(d.getUTCHours())     + ':' +
	        f(d.getUTCMinutes())   + ':' +
	        f(d.getUTCSeconds())   + 'Z' : null;
	  };

	  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	      gap,
	      indent,
	      meta = {    // table of character substitutions
	          '\b': '\\b',
	          '\t': '\\t',
	          '\n': '\\n',
	          '\f': '\\f',
	          '\r': '\\r',
	          '"' : '\\"',
	          '\\': '\\\\'
	      },
	      rep;


	  function quote(string) {

	// If the string contains no control characters, no quote characters, and no
	// backslash characters, then we can safely slap some quotes around it.
	// Otherwise we must also replace the offending characters with safe escape
	// sequences.

	      escapable.lastIndex = 0;
	      return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	          var c = meta[a];
	          return typeof c === 'string' ? c :
	              '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	      }) + '"' : '"' + string + '"';
	  }


	  function str(key, holder) {

	// Produce a string from holder[key].

	      var i,          // The loop counter.
	          k,          // The member key.
	          v,          // The member value.
	          length,
	          mind = gap,
	          partial,
	          value = holder[key];

	// If the value has a toJSON method, call it to obtain a replacement value.

	      if (value instanceof Date) {
	          value = date(key);
	      }

	// If we were called with a replacer function, then call the replacer to
	// obtain a replacement value.

	      if (typeof rep === 'function') {
	          value = rep.call(holder, key, value);
	      }

	// What happens next depends on the value's type.

	      switch (typeof value) {
	      case 'string':
	          return quote(value);

	      case 'number':

	// JSON numbers must be finite. Encode non-finite numbers as null.

	          return isFinite(value) ? String(value) : 'null';

	      case 'boolean':
	      case 'null':

	// If the value is a boolean or null, convert it to a string. Note:
	// typeof null does not produce 'null'. The case is included here in
	// the remote chance that this gets fixed someday.

	          return String(value);

	// If the type is 'object', we might be dealing with an object or an array or
	// null.

	      case 'object':

	// Due to a specification blunder in ECMAScript, typeof null is 'object',
	// so watch out for that case.

	          if (!value) {
	              return 'null';
	          }

	// Make an array to hold the partial results of stringifying this object value.

	          gap += indent;
	          partial = [];

	// Is the value an array?

	          if (Object.prototype.toString.apply(value) === '[object Array]') {

	// The value is an array. Stringify every element. Use null as a placeholder
	// for non-JSON values.

	              length = value.length;
	              for (i = 0; i < length; i += 1) {
	                  partial[i] = str(i, value) || 'null';
	              }

	// Join all of the elements together, separated with commas, and wrap them in
	// brackets.

	              v = partial.length === 0 ? '[]' : gap ?
	                  '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
	                  '[' + partial.join(',') + ']';
	              gap = mind;
	              return v;
	          }

	// If the replacer is an array, use it to select the members to be stringified.

	          if (rep && typeof rep === 'object') {
	              length = rep.length;
	              for (i = 0; i < length; i += 1) {
	                  if (typeof rep[i] === 'string') {
	                      k = rep[i];
	                      v = str(k, value);
	                      if (v) {
	                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                      }
	                  }
	              }
	          } else {

	// Otherwise, iterate through all of the keys in the object.

	              for (k in value) {
	                  if (Object.prototype.hasOwnProperty.call(value, k)) {
	                      v = str(k, value);
	                      if (v) {
	                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                      }
	                  }
	              }
	          }

	// Join all of the member texts together, separated with commas,
	// and wrap them in braces.

	          v = partial.length === 0 ? '{}' : gap ?
	              '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
	              '{' + partial.join(',') + '}';
	          gap = mind;
	          return v;
	      }
	  }

	// If the JSON object does not yet have a stringify method, give it one.

	  JSON.stringify = function (value, replacer, space) {

	// The stringify method takes a value and an optional replacer, and an optional
	// space parameter, and returns a JSON text. The replacer can be a function
	// that can replace values, or an array of strings that will select the keys.
	// A default replacer method can be provided. Use of the space parameter can
	// produce text that is more easily readable.

	      var i;
	      gap = '';
	      indent = '';

	// If the space parameter is a number, make an indent string containing that
	// many spaces.

	      if (typeof space === 'number') {
	          for (i = 0; i < space; i += 1) {
	              indent += ' ';
	          }

	// If the space parameter is a string, it will be used as the indent string.

	      } else if (typeof space === 'string') {
	          indent = space;
	      }

	// If there is a replacer, it must be a function or an array.
	// Otherwise, throw an error.

	      rep = replacer;
	      if (replacer && typeof replacer !== 'function' &&
	              (typeof replacer !== 'object' ||
	              typeof replacer.length !== 'number')) {
	          throw new Error('JSON.stringify');
	      }

	// Make a fake root object containing our value under the key of ''.
	// Return the result of stringifying the value.

	      return str('', {'': value});
	  };

	// If the JSON object does not yet have a parse method, give it one.

	  JSON.parse = function (text, reviver) {
	  // The parse method takes a text and an optional reviver function, and returns
	  // a JavaScript value if the text is a valid JSON text.

	      var j;

	      function walk(holder, key) {

	  // The walk method is used to recursively walk the resulting structure so
	  // that modifications can be made.

	          var k, v, value = holder[key];
	          if (value && typeof value === 'object') {
	              for (k in value) {
	                  if (Object.prototype.hasOwnProperty.call(value, k)) {
	                      v = walk(value, k);
	                      if (v !== undefined) {
	                          value[k] = v;
	                      } else {
	                          delete value[k];
	                      }
	                  }
	              }
	          }
	          return reviver.call(holder, key, value);
	      }


	  // Parsing happens in four stages. In the first stage, we replace certain
	  // Unicode characters with escape sequences. JavaScript handles many characters
	  // incorrectly, either silently deleting them, or treating them as line endings.

	      text = String(text);
	      cx.lastIndex = 0;
	      if (cx.test(text)) {
	          text = text.replace(cx, function (a) {
	              return '\\u' +
	                  ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	          });
	      }

	  // In the second stage, we run the text against regular expressions that look
	  // for non-JSON patterns. We are especially concerned with '()' and 'new'
	  // because they can cause invocation, and '=' because it can cause mutation.
	  // But just to be safe, we want to reject all unexpected forms.

	  // We split the second stage into 4 regexp operations in order to work around
	  // crippling inefficiencies in IE's and Safari's regexp engines. First we
	  // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
	  // replace all simple value tokens with ']' characters. Third, we delete all
	  // open brackets that follow a colon or comma or that begin the text. Finally,
	  // we look to see that the remaining characters are only whitespace or ']' or
	  // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

	      if (/^[\],:{}\s]*$/
	              .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
	                  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
	                  .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

	  // In the third stage we use the eval function to compile the text into a
	  // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
	  // in JavaScript: it can begin a block or an object literal. We wrap the text
	  // in parens to eliminate the ambiguity.

	          j = eval('(' + text + ')');

	  // In the optional fourth stage, we recursively walk the new structure, passing
	  // each name/value pair to a reviver function for possible transformation.

	          return typeof reviver === 'function' ?
	              walk({'': j}, '') : j;
	      }

	  // If the text is not JSON parseable, then a SyntaxError is thrown.

	      throw new SyntaxError('JSON.parse');
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , typeof JSON !== 'undefined' ? JSON : undefined
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Parser namespace.
	   *
	   * @namespace
	   */

	  var parser = exports.parser = {};

	  /**
	   * Packet types.
	   */

	  var packets = parser.packets = [
	      'disconnect'
	    , 'connect'
	    , 'heartbeat'
	    , 'message'
	    , 'json'
	    , 'event'
	    , 'ack'
	    , 'error'
	    , 'noop'
	  ];

	  /**
	   * Errors reasons.
	   */

	  var reasons = parser.reasons = [
	      'transport not supported'
	    , 'client not handshaken'
	    , 'unauthorized'
	  ];

	  /**
	   * Errors advice.
	   */

	  var advice = parser.advice = [
	      'reconnect'
	  ];

	  /**
	   * Shortcuts.
	   */

	  var JSON = io.JSON
	    , indexOf = io.util.indexOf;

	  /**
	   * Encodes a packet.
	   *
	   * @api private
	   */

	  parser.encodePacket = function (packet) {
	    var type = indexOf(packets, packet.type)
	      , id = packet.id || ''
	      , endpoint = packet.endpoint || ''
	      , ack = packet.ack
	      , data = null;

	    switch (packet.type) {
	      case 'error':
	        var reason = packet.reason ? indexOf(reasons, packet.reason) : ''
	          , adv = packet.advice ? indexOf(advice, packet.advice) : '';

	        if (reason !== '' || adv !== '')
	          data = reason + (adv !== '' ? ('+' + adv) : '');

	        break;

	      case 'message':
	        if (packet.data !== '')
	          data = packet.data;
	        break;

	      case 'event':
	        var ev = { name: packet.name };

	        if (packet.args && packet.args.length) {
	          ev.args = packet.args;
	        }

	        data = JSON.stringify(ev);
	        break;

	      case 'json':
	        data = JSON.stringify(packet.data);
	        break;

	      case 'connect':
	        if (packet.qs)
	          data = packet.qs;
	        break;

	      case 'ack':
	        data = packet.ackId
	          + (packet.args && packet.args.length
	              ? '+' + JSON.stringify(packet.args) : '');
	        break;
	    }

	    // construct packet with required fragments
	    var encoded = [
	        type
	      , id + (ack == 'data' ? '+' : '')
	      , endpoint
	    ];

	    // data fragment is optional
	    if (data !== null && data !== undefined)
	      encoded.push(data);

	    return encoded.join(':');
	  };

	  /**
	   * Encodes multiple messages (payload).
	   *
	   * @param {Array} messages
	   * @api private
	   */

	  parser.encodePayload = function (packets) {
	    var decoded = '';

	    if (packets.length == 1)
	      return packets[0];

	    for (var i = 0, l = packets.length; i < l; i++) {
	      var packet = packets[i];
	      decoded += '\ufffd' + packet.length + '\ufffd' + packets[i];
	    }

	    return decoded;
	  };

	  /**
	   * Decodes a packet
	   *
	   * @api private
	   */

	  var regexp = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;

	  parser.decodePacket = function (data) {
	    var pieces = data.match(regexp);

	    if (!pieces) return {};

	    var id = pieces[2] || ''
	      , data = pieces[5] || ''
	      , packet = {
	            type: packets[pieces[1]]
	          , endpoint: pieces[4] || ''
	        };

	    // whether we need to acknowledge the packet
	    if (id) {
	      packet.id = id;
	      if (pieces[3])
	        packet.ack = 'data';
	      else
	        packet.ack = true;
	    }

	    // handle different packet types
	    switch (packet.type) {
	      case 'error':
	        var pieces = data.split('+');
	        packet.reason = reasons[pieces[0]] || '';
	        packet.advice = advice[pieces[1]] || '';
	        break;

	      case 'message':
	        packet.data = data || '';
	        break;

	      case 'event':
	        try {
	          var opts = JSON.parse(data);
	          packet.name = opts.name;
	          packet.args = opts.args;
	        } catch (e) { }

	        packet.args = packet.args || [];
	        break;

	      case 'json':
	        try {
	          packet.data = JSON.parse(data);
	        } catch (e) { }
	        break;

	      case 'connect':
	        packet.qs = data || '';
	        break;

	      case 'ack':
	        var pieces = data.match(/^([0-9]+)(\+)?(.*)/);
	        if (pieces) {
	          packet.ackId = pieces[1];
	          packet.args = [];

	          if (pieces[3]) {
	            try {
	              packet.args = pieces[3] ? JSON.parse(pieces[3]) : [];
	            } catch (e) { }
	          }
	        }
	        break;

	      case 'disconnect':
	      case 'heartbeat':
	        break;
	    };

	    return packet;
	  };

	  /**
	   * Decodes data payload. Detects multiple messages
	   *
	   * @return {Array} messages
	   * @api public
	   */

	  parser.decodePayload = function (data) {
	    // IE doesn't like data[i] for unicode chars, charAt works fine
	    if (data.charAt(0) == '\ufffd') {
	      var ret = [];

	      for (var i = 1, length = ''; i < data.length; i++) {
	        if (data.charAt(i) == '\ufffd') {
	          ret.push(parser.decodePacket(data.substr(i + 1).substr(0, length)));
	          i += Number(length) + 1;
	          length = '';
	        } else {
	          length += data.charAt(i);
	        }
	      }

	      return ret;
	    } else {
	      return [parser.decodePacket(data)];
	    }
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.Transport = Transport;

	  /**
	   * This is the transport template for all supported transport methods.
	   *
	   * @constructor
	   * @api public
	   */

	  function Transport (socket, sessid) {
	    this.socket = socket;
	    this.sessid = sessid;
	  };

	  /**
	   * Apply EventEmitter mixin.
	   */

	  io.util.mixin(Transport, io.EventEmitter);


	  /**
	   * Indicates whether heartbeats is enabled for this transport
	   *
	   * @api private
	   */

	  Transport.prototype.heartbeats = function () {
	    return true;
	  };

	  /**
	   * Handles the response from the server. When a new response is received
	   * it will automatically update the timeout, decode the message and
	   * forwards the response to the onMessage function for further processing.
	   *
	   * @param {String} data Response from the server.
	   * @api private
	   */

	  Transport.prototype.onData = function (data) {
	    this.clearCloseTimeout();

	    // If the connection in currently open (or in a reopening state) reset the close
	    // timeout since we have just received data. This check is necessary so
	    // that we don't reset the timeout on an explicitly disconnected connection.
	    if (this.socket.connected || this.socket.connecting || this.socket.reconnecting) {
	      this.setCloseTimeout();
	    }

	    if (data !== '') {
	      // todo: we should only do decodePayload for xhr transports
	      var msgs = io.parser.decodePayload(data);

	      if (msgs && msgs.length) {
	        for (var i = 0, l = msgs.length; i < l; i++) {
	          this.onPacket(msgs[i]);
	        }
	      }
	    }

	    return this;
	  };

	  /**
	   * Handles packets.
	   *
	   * @api private
	   */

	  Transport.prototype.onPacket = function (packet) {
	    this.socket.setHeartbeatTimeout();

	    if (packet.type == 'heartbeat') {
	      return this.onHeartbeat();
	    }

	    if (packet.type == 'connect' && packet.endpoint == '') {
	      this.onConnect();
	    }

	    if (packet.type == 'error' && packet.advice == 'reconnect') {
	      this.isOpen = false;
	    }

	    this.socket.onPacket(packet);

	    return this;
	  };

	  /**
	   * Sets close timeout
	   *
	   * @api private
	   */

	  Transport.prototype.setCloseTimeout = function () {
	    if (!this.closeTimeout) {
	      var self = this;

	      this.closeTimeout = setTimeout(function () {
	        self.onDisconnect();
	      }, this.socket.closeTimeout);
	    }
	  };

	  /**
	   * Called when transport disconnects.
	   *
	   * @api private
	   */

	  Transport.prototype.onDisconnect = function () {
	    if (this.isOpen) this.close();
	    this.clearTimeouts();
	    this.socket.onDisconnect();
	    return this;
	  };

	  /**
	   * Called when transport connects
	   *
	   * @api private
	   */

	  Transport.prototype.onConnect = function () {
	    this.socket.onConnect();
	    return this;
	  };

	  /**
	   * Clears close timeout
	   *
	   * @api private
	   */

	  Transport.prototype.clearCloseTimeout = function () {
	    if (this.closeTimeout) {
	      clearTimeout(this.closeTimeout);
	      this.closeTimeout = null;
	    }
	  };

	  /**
	   * Clear timeouts
	   *
	   * @api private
	   */

	  Transport.prototype.clearTimeouts = function () {
	    this.clearCloseTimeout();

	    if (this.reopenTimeout) {
	      clearTimeout(this.reopenTimeout);
	    }
	  };

	  /**
	   * Sends a packet
	   *
	   * @param {Object} packet object.
	   * @api private
	   */

	  Transport.prototype.packet = function (packet) {
	    this.send(io.parser.encodePacket(packet));
	  };

	  /**
	   * Send the received heartbeat message back to server. So the server
	   * knows we are still connected.
	   *
	   * @param {String} heartbeat Heartbeat response from the server.
	   * @api private
	   */

	  Transport.prototype.onHeartbeat = function (heartbeat) {
	    this.packet({ type: 'heartbeat' });
	  };

	  /**
	   * Called when the transport opens.
	   *
	   * @api private
	   */

	  Transport.prototype.onOpen = function () {
	    this.isOpen = true;
	    this.clearCloseTimeout();
	    this.socket.onOpen();
	  };

	  /**
	   * Notifies the base when the connection with the Socket.IO server
	   * has been disconnected.
	   *
	   * @api private
	   */

	  Transport.prototype.onClose = function () {
	    var self = this;

	    /* FIXME: reopen delay causing a infinit loop
	    this.reopenTimeout = setTimeout(function () {
	      self.open();
	    }, this.socket.options['reopen delay']);*/

	    this.isOpen = false;
	    this.socket.onClose();
	    this.onDisconnect();
	  };

	  /**
	   * Generates a connection url based on the Socket.IO URL Protocol.
	   * See <https://github.com/learnboost/socket.io-node/> for more details.
	   *
	   * @returns {String} Connection url
	   * @api private
	   */

	  Transport.prototype.prepareUrl = function () {
	    var options = this.socket.options;

	    return this.scheme() + '://'
	      + options.host + ':' + options.port + '/'
	      + options.resource + '/' + io.protocol
	      + '/' + this.name + '/' + this.sessid;
	  };

	  /**
	   * Checks if the transport is ready to start a connection.
	   *
	   * @param {Socket} socket The socket instance that needs a transport
	   * @param {Function} fn The callback
	   * @api private
	   */

	  Transport.prototype.ready = function (socket, fn) {
	    fn.call(this);
	  };
	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {

	  /**
	   * Expose constructor.
	   */

	  exports.Socket = Socket;

	  /**
	   * Create a new `Socket.IO client` which can establish a persistent
	   * connection with a Socket.IO enabled server.
	   *
	   * @api public
	   */

	  function Socket (options) {
	    this.options = {
	        port: 80
	      , secure: false
	      , document: 'document' in global ? document : false
	      , resource: 'socket.io'
	      , transports: io.transports
	      , 'connect timeout': 10000
	      , 'try multiple transports': true
	      , 'reconnect': true
	      , 'reconnection delay': 500
	      , 'reconnection limit': Infinity
	      , 'reopen delay': 3000
	      , 'max reconnection attempts': 10
	      , 'sync disconnect on unload': false
	      , 'auto connect': true
	      , 'flash policy port': 10843
	      , 'manualFlush': false
	    };

	    io.util.merge(this.options, options);

	    this.connected = false;
	    this.open = false;
	    this.connecting = false;
	    this.reconnecting = false;
	    this.namespaces = {};
	    this.buffer = [];
	    this.doBuffer = false;

	    if (this.options['sync disconnect on unload'] &&
	        (!this.isXDomain() || io.util.ua.hasCORS)) {
	      var self = this;
	      io.util.on(global, 'beforeunload', function () {
	        self.disconnectSync();
	      }, false);
	    }

	    if (this.options['auto connect']) {
	      this.connect();
	    }
	};

	  /**
	   * Apply EventEmitter mixin.
	   */

	  io.util.mixin(Socket, io.EventEmitter);

	  /**
	   * Returns a namespace listener/emitter for this socket
	   *
	   * @api public
	   */

	  Socket.prototype.of = function (name) {
	    if (!this.namespaces[name]) {
	      this.namespaces[name] = new io.SocketNamespace(this, name);

	      if (name !== '') {
	        this.namespaces[name].packet({ type: 'connect' });
	      }
	    }

	    return this.namespaces[name];
	  };

	  /**
	   * Emits the given event to the Socket and all namespaces
	   *
	   * @api private
	   */

	  Socket.prototype.publish = function () {
	    this.emit.apply(this, arguments);

	    var nsp;

	    for (var i in this.namespaces) {
	      if (this.namespaces.hasOwnProperty(i)) {
	        nsp = this.of(i);
	        nsp.$emit.apply(nsp, arguments);
	      }
	    }
	  };

	  /**
	   * Performs the handshake
	   *
	   * @api private
	   */

	  function empty () { };

	  Socket.prototype.handshake = function (fn) {
	    var self = this
	      , options = this.options;

	    function complete (data) {
	      if (data instanceof Error) {
	        self.connecting = false;
	        self.onError(data.message);
	      } else {
	        fn.apply(null, data.split(':'));
	      }
	    };

	    var url = [
	          'http' + (options.secure ? 's' : '') + ':/'
	        , options.host + ':' + options.port
	        , options.resource
	        , io.protocol
	        , io.util.query(this.options.query, 't=' + +new Date)
	      ].join('/');

	    if (this.isXDomain() && !io.util.ua.hasCORS) {
	      var insertAt = document.getElementsByTagName('script')[0]
	        , script = document.createElement('script');

	      script.src = url + '&jsonp=' + io.j.length;
	      insertAt.parentNode.insertBefore(script, insertAt);

	      io.j.push(function (data) {
	        complete(data);
	        script.parentNode.removeChild(script);
	      });
	    } else {
	      var xhr = io.util.request();

	      xhr.open('GET', url, true);
	      if (this.isXDomain()) {
	        xhr.withCredentials = true;
	      }
	      xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4) {
	          xhr.onreadystatechange = empty;

	          if (xhr.status == 200) {
	            complete(xhr.responseText);
	          } else if (xhr.status == 403) {
	            self.onError(xhr.responseText);
	          } else {
	            self.connecting = false;            
	            !self.reconnecting && self.onError(xhr.responseText);
	          }
	        }
	      };
	      xhr.send(null);
	    }
	  };

	  /**
	   * Find an available transport based on the options supplied in the constructor.
	   *
	   * @api private
	   */

	  Socket.prototype.getTransport = function (override) {
	    var transports = override || this.transports, match;

	    for (var i = 0, transport; transport = transports[i]; i++) {
	      if (io.Transport[transport]
	        && io.Transport[transport].check(this)
	        && (!this.isXDomain() || io.Transport[transport].xdomainCheck(this))) {
	        return new io.Transport[transport](this, this.sessionid);
	      }
	    }

	    return null;
	  };

	  /**
	   * Connects to the server.
	   *
	   * @param {Function} [fn] Callback.
	   * @returns {io.Socket}
	   * @api public
	   */

	  Socket.prototype.connect = function (fn) {
	    if (this.connecting) {
	      return this;
	    }

	    var self = this;
	    self.connecting = true;
	    
	    this.handshake(function (sid, heartbeat, close, transports) {
	      self.sessionid = sid;
	      self.closeTimeout = close * 1000;
	      self.heartbeatTimeout = heartbeat * 1000;
	      if(!self.transports)
	          self.transports = self.origTransports = (transports ? io.util.intersect(
	              transports.split(',')
	            , self.options.transports
	          ) : self.options.transports);

	      self.setHeartbeatTimeout();

	      function connect (transports){
	        if (self.transport) self.transport.clearTimeouts();

	        self.transport = self.getTransport(transports);
	        if (!self.transport) return self.publish('connect_failed');

	        // once the transport is ready
	        self.transport.ready(self, function () {
	          self.connecting = true;
	          self.publish('connecting', self.transport.name);
	          self.transport.open();

	          if (self.options['connect timeout']) {
	            self.connectTimeoutTimer = setTimeout(function () {
	              if (!self.connected) {
	                self.connecting = false;

	                if (self.options['try multiple transports']) {
	                  var remaining = self.transports;

	                  while (remaining.length > 0 && remaining.splice(0,1)[0] !=
	                         self.transport.name) {}

	                    if (remaining.length){
	                      connect(remaining);
	                    } else {
	                      self.publish('connect_failed');
	                    }
	                }
	              }
	            }, self.options['connect timeout']);
	          }
	        });
	      }

	      connect(self.transports);

	      self.once('connect', function (){
	        clearTimeout(self.connectTimeoutTimer);

	        fn && typeof fn == 'function' && fn();
	      });
	    });

	    return this;
	  };

	  /**
	   * Clears and sets a new heartbeat timeout using the value given by the
	   * server during the handshake.
	   *
	   * @api private
	   */

	  Socket.prototype.setHeartbeatTimeout = function () {
	    clearTimeout(this.heartbeatTimeoutTimer);
	    if(this.transport && !this.transport.heartbeats()) return;

	    var self = this;
	    this.heartbeatTimeoutTimer = setTimeout(function () {
	      self.transport.onClose();
	    }, this.heartbeatTimeout);
	  };

	  /**
	   * Sends a message.
	   *
	   * @param {Object} data packet.
	   * @returns {io.Socket}
	   * @api public
	   */

	  Socket.prototype.packet = function (data) {
	    if (this.connected && !this.doBuffer) {
	      this.transport.packet(data);
	    } else {
	      this.buffer.push(data);
	    }

	    return this;
	  };

	  /**
	   * Sets buffer state
	   *
	   * @api private
	   */

	  Socket.prototype.setBuffer = function (v) {
	    this.doBuffer = v;

	    if (!v && this.connected && this.buffer.length) {
	      if (!this.options['manualFlush']) {
	        this.flushBuffer();
	      }
	    }
	  };

	  /**
	   * Flushes the buffer data over the wire.
	   * To be invoked manually when 'manualFlush' is set to true.
	   *
	   * @api public
	   */

	  Socket.prototype.flushBuffer = function() {
	    this.transport.payload(this.buffer);
	    this.buffer = [];
	  };
	  

	  /**
	   * Disconnect the established connect.
	   *
	   * @returns {io.Socket}
	   * @api public
	   */

	  Socket.prototype.disconnect = function () {
	    if (this.connected || this.connecting) {
	      if (this.open) {
	        this.of('').packet({ type: 'disconnect' });
	      }

	      // handle disconnection immediately
	      this.onDisconnect('booted');
	    }

	    return this;
	  };

	  /**
	   * Disconnects the socket with a sync XHR.
	   *
	   * @api private
	   */

	  Socket.prototype.disconnectSync = function () {
	    // ensure disconnection
	    var xhr = io.util.request();
	    var uri = [
	        'http' + (this.options.secure ? 's' : '') + ':/'
	      , this.options.host + ':' + this.options.port
	      , this.options.resource
	      , io.protocol
	      , ''
	      , this.sessionid
	    ].join('/') + '/?disconnect=1';

	    xhr.open('GET', uri, false);
	    xhr.send(null);

	    // handle disconnection immediately
	    this.onDisconnect('booted');
	  };

	  /**
	   * Check if we need to use cross domain enabled transports. Cross domain would
	   * be a different port or different domain name.
	   *
	   * @returns {Boolean}
	   * @api private
	   */

	  Socket.prototype.isXDomain = function () {

	    var port = global.location.port ||
	      ('https:' == global.location.protocol ? 443 : 80);

	    return this.options.host !== global.location.hostname 
	      || this.options.port != port;
	  };

	  /**
	   * Called upon handshake.
	   *
	   * @api private
	   */

	  Socket.prototype.onConnect = function () {
	    if (!this.connected) {
	      this.connected = true;
	      this.connecting = false;
	      if (!this.doBuffer) {
	        // make sure to flush the buffer
	        this.setBuffer(false);
	      }
	      this.emit('connect');
	    }
	  };

	  /**
	   * Called when the transport opens
	   *
	   * @api private
	   */

	  Socket.prototype.onOpen = function () {
	    this.open = true;
	  };

	  /**
	   * Called when the transport closes.
	   *
	   * @api private
	   */

	  Socket.prototype.onClose = function () {
	    this.open = false;
	    clearTimeout(this.heartbeatTimeoutTimer);
	  };

	  /**
	   * Called when the transport first opens a connection
	   *
	   * @param text
	   */

	  Socket.prototype.onPacket = function (packet) {
	    this.of(packet.endpoint).onPacket(packet);
	  };

	  /**
	   * Handles an error.
	   *
	   * @api private
	   */

	  Socket.prototype.onError = function (err) {
	    if (err && err.advice) {
	      if (err.advice === 'reconnect' && (this.connected || this.connecting)) {
	        this.disconnect();
	        if (this.options.reconnect) {
	          this.reconnect();
	        }
	      }
	    }

	    this.publish('error', err && err.reason ? err.reason : err);
	  };

	  /**
	   * Called when the transport disconnects.
	   *
	   * @api private
	   */

	  Socket.prototype.onDisconnect = function (reason) {
	    var wasConnected = this.connected
	      , wasConnecting = this.connecting;

	    this.connected = false;
	    this.connecting = false;
	    this.open = false;

	    if (wasConnected || wasConnecting) {
	      this.transport.close();
	      this.transport.clearTimeouts();
	      if (wasConnected) {
	        this.publish('disconnect', reason);

	        if ('booted' != reason && this.options.reconnect && !this.reconnecting) {
	          this.reconnect();
	        }
	      }
	    }
	  };

	  /**
	   * Called upon reconnection.
	   *
	   * @api private
	   */

	  Socket.prototype.reconnect = function () {
	    this.reconnecting = true;
	    this.reconnectionAttempts = 0;
	    this.reconnectionDelay = this.options['reconnection delay'];

	    var self = this
	      , maxAttempts = this.options['max reconnection attempts']
	      , tryMultiple = this.options['try multiple transports']
	      , limit = this.options['reconnection limit'];

	    function reset () {
	      if (self.connected) {
	        for (var i in self.namespaces) {
	          if (self.namespaces.hasOwnProperty(i) && '' !== i) {
	              self.namespaces[i].packet({ type: 'connect' });
	          }
	        }
	        self.publish('reconnect', self.transport.name, self.reconnectionAttempts);
	      }

	      clearTimeout(self.reconnectionTimer);

	      self.removeListener('connect_failed', maybeReconnect);
	      self.removeListener('connect', maybeReconnect);

	      self.reconnecting = false;

	      delete self.reconnectionAttempts;
	      delete self.reconnectionDelay;
	      delete self.reconnectionTimer;
	      delete self.redoTransports;

	      self.options['try multiple transports'] = tryMultiple;
	    };

	    function maybeReconnect () {
	      if (!self.reconnecting) {
	        return;
	      }

	      if (self.connected) {
	        return reset();
	      };

	      if (self.connecting && self.reconnecting) {
	        return self.reconnectionTimer = setTimeout(maybeReconnect, 1000);
	      }

	      if (self.reconnectionAttempts++ >= maxAttempts) {
	        if (!self.redoTransports) {
	          self.on('connect_failed', maybeReconnect);
	          self.options['try multiple transports'] = true;
	          self.transports = self.origTransports;
	          self.transport = self.getTransport();
	          self.redoTransports = true;
	          self.connect();
	        } else {
	          self.publish('reconnect_failed');
	          reset();
	        }
	      } else {
	        if (self.reconnectionDelay < limit) {
	          self.reconnectionDelay *= 2; // exponential back off
	        }

	        self.connect();
	        self.publish('reconnecting', self.reconnectionDelay, self.reconnectionAttempts);
	        self.reconnectionTimer = setTimeout(maybeReconnect, self.reconnectionDelay);
	      }
	    };

	    this.options['try multiple transports'] = false;
	    this.reconnectionTimer = setTimeout(maybeReconnect, this.reconnectionDelay);

	    this.on('connect', maybeReconnect);
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.SocketNamespace = SocketNamespace;

	  /**
	   * Socket namespace constructor.
	   *
	   * @constructor
	   * @api public
	   */

	  function SocketNamespace (socket, name) {
	    this.socket = socket;
	    this.name = name || '';
	    this.flags = {};
	    this.json = new Flag(this, 'json');
	    this.ackPackets = 0;
	    this.acks = {};
	  };

	  /**
	   * Apply EventEmitter mixin.
	   */

	  io.util.mixin(SocketNamespace, io.EventEmitter);

	  /**
	   * Copies emit since we override it
	   *
	   * @api private
	   */

	  SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;

	  /**
	   * Creates a new namespace, by proxying the request to the socket. This
	   * allows us to use the synax as we do on the server.
	   *
	   * @api public
	   */

	  SocketNamespace.prototype.of = function () {
	    return this.socket.of.apply(this.socket, arguments);
	  };

	  /**
	   * Sends a packet.
	   *
	   * @api private
	   */

	  SocketNamespace.prototype.packet = function (packet) {
	    packet.endpoint = this.name;
	    this.socket.packet(packet);
	    this.flags = {};
	    return this;
	  };

	  /**
	   * Sends a message
	   *
	   * @api public
	   */

	  SocketNamespace.prototype.send = function (data, fn) {
	    var packet = {
	        type: this.flags.json ? 'json' : 'message'
	      , data: data
	    };

	    if ('function' == typeof fn) {
	      packet.id = ++this.ackPackets;
	      packet.ack = true;
	      this.acks[packet.id] = fn;
	    }

	    return this.packet(packet);
	  };

	  /**
	   * Emits an event
	   *
	   * @api public
	   */
	  
	  SocketNamespace.prototype.emit = function (name) {
	    var args = Array.prototype.slice.call(arguments, 1)
	      , lastArg = args[args.length - 1]
	      , packet = {
	            type: 'event'
	          , name: name
	        };

	    if ('function' == typeof lastArg) {
	      packet.id = ++this.ackPackets;
	      packet.ack = 'data';
	      this.acks[packet.id] = lastArg;
	      args = args.slice(0, args.length - 1);
	    }

	    packet.args = args;

	    return this.packet(packet);
	  };

	  /**
	   * Disconnects the namespace
	   *
	   * @api private
	   */

	  SocketNamespace.prototype.disconnect = function () {
	    if (this.name === '') {
	      this.socket.disconnect();
	    } else {
	      this.packet({ type: 'disconnect' });
	      this.$emit('disconnect');
	    }

	    return this;
	  };

	  /**
	   * Handles a packet
	   *
	   * @api private
	   */

	  SocketNamespace.prototype.onPacket = function (packet) {
	    var self = this;

	    function ack () {
	      self.packet({
	          type: 'ack'
	        , args: io.util.toArray(arguments)
	        , ackId: packet.id
	      });
	    };

	    switch (packet.type) {
	      case 'connect':
	        this.$emit('connect');
	        break;

	      case 'disconnect':
	        if (this.name === '') {
	          this.socket.onDisconnect(packet.reason || 'booted');
	        } else {
	          this.$emit('disconnect', packet.reason);
	        }
	        break;

	      case 'message':
	      case 'json':
	        var params = ['message', packet.data];

	        if (packet.ack == 'data') {
	          params.push(ack);
	        } else if (packet.ack) {
	          this.packet({ type: 'ack', ackId: packet.id });
	        }

	        this.$emit.apply(this, params);
	        break;

	      case 'event':
	        var params = [packet.name].concat(packet.args);

	        if (packet.ack == 'data')
	          params.push(ack);

	        this.$emit.apply(this, params);
	        break;

	      case 'ack':
	        if (this.acks[packet.ackId]) {
	          this.acks[packet.ackId].apply(this, packet.args);
	          delete this.acks[packet.ackId];
	        }
	        break;

	      case 'error':
	        if (packet.advice){
	          this.socket.onError(packet);
	        } else {
	          if (packet.reason == 'unauthorized') {
	            this.$emit('connect_failed', packet.reason);
	          } else {
	            this.$emit('error', packet.reason);
	          }
	        }
	        break;
	    }
	  };

	  /**
	   * Flag interface.
	   *
	   * @api private
	   */

	  function Flag (nsp, name) {
	    this.namespace = nsp;
	    this.name = name;
	  };

	  /**
	   * Send a message
	   *
	   * @api public
	   */

	  Flag.prototype.send = function () {
	    this.namespace.flags[this.name] = true;
	    this.namespace.send.apply(this.namespace, arguments);
	  };

	  /**
	   * Emit an event
	   *
	   * @api public
	   */

	  Flag.prototype.emit = function () {
	    this.namespace.flags[this.name] = true;
	    this.namespace.emit.apply(this.namespace, arguments);
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {

	  /**
	   * Expose constructor.
	   */

	  exports.websocket = WS;

	  /**
	   * The WebSocket transport uses the HTML5 WebSocket API to establish an
	   * persistent connection with the Socket.IO server. This transport will also
	   * be inherited by the FlashSocket fallback as it provides a API compatible
	   * polyfill for the WebSockets.
	   *
	   * @constructor
	   * @extends {io.Transport}
	   * @api public
	   */

	  function WS (socket) {
	    io.Transport.apply(this, arguments);
	  };

	  /**
	   * Inherits from Transport.
	   */

	  io.util.inherit(WS, io.Transport);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  WS.prototype.name = 'websocket';

	  /**
	   * Initializes a new `WebSocket` connection with the Socket.IO server. We attach
	   * all the appropriate listeners to handle the responses from the server.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  WS.prototype.open = function () {
	    var query = io.util.query(this.socket.options.query)
	      , self = this
	      , Socket


	    if (!Socket) {
	      Socket = global.MozWebSocket || global.WebSocket;
	    }

	    this.websocket = new Socket(this.prepareUrl() + query);

	    this.websocket.onopen = function () {
	      self.onOpen();
	      self.socket.setBuffer(false);
	    };
	    this.websocket.onmessage = function (ev) {
	      self.onData(ev.data);
	    };
	    this.websocket.onclose = function () {
	      self.onClose();
	      self.socket.setBuffer(true);
	    };
	    this.websocket.onerror = function (e) {
	      self.onError(e);
	    };

	    return this;
	  };

	  /**
	   * Send a message to the Socket.IO server. The message will automatically be
	   * encoded in the correct message format.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  // Do to a bug in the current IDevices browser, we need to wrap the send in a 
	  // setTimeout, when they resume from sleeping the browser will crash if 
	  // we don't allow the browser time to detect the socket has been closed
	  if (io.util.ua.iDevice) {
	    WS.prototype.send = function (data) {
	      var self = this;
	      setTimeout(function() {
	         self.websocket.send(data);
	      },0);
	      return this;
	    };
	  } else {
	    WS.prototype.send = function (data) {
	      this.websocket.send(data);
	      return this;
	    };
	  }

	  /**
	   * Payload
	   *
	   * @api private
	   */

	  WS.prototype.payload = function (arr) {
	    for (var i = 0, l = arr.length; i < l; i++) {
	      this.packet(arr[i]);
	    }
	    return this;
	  };

	  /**
	   * Disconnect the established `WebSocket` connection.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  WS.prototype.close = function () {
	    this.websocket.close();
	    return this;
	  };

	  /**
	   * Handle the errors that `WebSocket` might be giving when we
	   * are attempting to connect or send messages.
	   *
	   * @param {Error} e The error.
	   * @api private
	   */

	  WS.prototype.onError = function (e) {
	    this.socket.onError(e);
	  };

	  /**
	   * Returns the appropriate scheme for the URI generation.
	   *
	   * @api private
	   */
	  WS.prototype.scheme = function () {
	    return this.socket.options.secure ? 'wss' : 'ws';
	  };

	  /**
	   * Checks if the browser has support for native `WebSockets` and that
	   * it's not the polyfill created for the FlashSocket transport.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  WS.check = function () {
	    return ('WebSocket' in global && !('__addTask' in WebSocket))
	          || 'MozWebSocket' in global;
	  };

	  /**
	   * Check if the `WebSocket` transport support cross domain communications.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  WS.xdomainCheck = function () {
	    return true;
	  };

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('websocket');

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.flashsocket = Flashsocket;

	  /**
	   * The FlashSocket transport. This is a API wrapper for the HTML5 WebSocket
	   * specification. It uses a .swf file to communicate with the server. If you want
	   * to serve the .swf file from a other server than where the Socket.IO script is
	   * coming from you need to use the insecure version of the .swf. More information
	   * about this can be found on the github page.
	   *
	   * @constructor
	   * @extends {io.Transport.websocket}
	   * @api public
	   */

	  function Flashsocket () {
	    io.Transport.websocket.apply(this, arguments);
	  };

	  /**
	   * Inherits from Transport.
	   */

	  io.util.inherit(Flashsocket, io.Transport.websocket);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  Flashsocket.prototype.name = 'flashsocket';

	  /**
	   * Disconnect the established `FlashSocket` connection. This is done by adding a 
	   * new task to the FlashSocket. The rest will be handled off by the `WebSocket` 
	   * transport.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  Flashsocket.prototype.open = function () {
	    var self = this
	      , args = arguments;

	    WebSocket.__addTask(function () {
	      io.Transport.websocket.prototype.open.apply(self, args);
	    });
	    return this;
	  };
	  
	  /**
	   * Sends a message to the Socket.IO server. This is done by adding a new
	   * task to the FlashSocket. The rest will be handled off by the `WebSocket` 
	   * transport.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  Flashsocket.prototype.send = function () {
	    var self = this, args = arguments;
	    WebSocket.__addTask(function () {
	      io.Transport.websocket.prototype.send.apply(self, args);
	    });
	    return this;
	  };

	  /**
	   * Disconnects the established `FlashSocket` connection.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  Flashsocket.prototype.close = function () {
	    WebSocket.__tasks.length = 0;
	    io.Transport.websocket.prototype.close.call(this);
	    return this;
	  };

	  /**
	   * The WebSocket fall back needs to append the flash container to the body
	   * element, so we need to make sure we have access to it. Or defer the call
	   * until we are sure there is a body element.
	   *
	   * @param {Socket} socket The socket instance that needs a transport
	   * @param {Function} fn The callback
	   * @api private
	   */

	  Flashsocket.prototype.ready = function (socket, fn) {
	    function init () {
	      var options = socket.options
	        , port = options['flash policy port']
	        , path = [
	              'http' + (options.secure ? 's' : '') + ':/'
	            , options.host + ':' + options.port
	            , options.resource
	            , 'static/flashsocket'
	            , 'WebSocketMain' + (socket.isXDomain() ? 'Insecure' : '') + '.swf'
	          ];

	      // Only start downloading the swf file when the checked that this browser
	      // actually supports it
	      if (!Flashsocket.loaded) {
	        if (typeof WEB_SOCKET_SWF_LOCATION === 'undefined') {
	          // Set the correct file based on the XDomain settings
	          WEB_SOCKET_SWF_LOCATION = path.join('/');
	        }

	        if (port !== 843) {
	          WebSocket.loadFlashPolicyFile('xmlsocket://' + options.host + ':' + port);
	        }

	        WebSocket.__initialize();
	        Flashsocket.loaded = true;
	      }

	      fn.call(self);
	    }

	    var self = this;
	    if (document.body) return init();

	    io.util.load(init);
	  };

	  /**
	   * Check if the FlashSocket transport is supported as it requires that the Adobe
	   * Flash Player plug-in version `10.0.0` or greater is installed. And also check if
	   * the polyfill is correctly loaded.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  Flashsocket.check = function () {
	    if (
	        typeof WebSocket == 'undefined'
	      || !('__initialize' in WebSocket) || !swfobject
	    ) return false;

	    return swfobject.getFlashPlayerVersion().major >= 10;
	  };

	  /**
	   * Check if the FlashSocket transport can be used as cross domain / cross origin 
	   * transport. Because we can't see which type (secure or insecure) of .swf is used
	   * we will just return true.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  Flashsocket.xdomainCheck = function () {
	    return true;
	  };

	  /**
	   * Disable AUTO_INITIALIZATION
	   */

	  if (typeof window != 'undefined') {
	    WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = true;
	  }

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('flashsocket');
	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);
	/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
		is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
	*/
	if ('undefined' != typeof window) {
	var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O[(['Active'].concat('Object').join('X'))]!=D){try{var ad=new window[(['Active'].concat('Object').join('X'))](W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?(['Active'].concat('').join('X')):"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
	}
	// Copyright: Hiroshi Ichikawa <http://gimite.net/en/>
	// License: New BSD License
	// Reference: http://dev.w3.org/html5/websockets/
	// Reference: http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol

	(function() {
	  
	  if ('undefined' == typeof window || window.WebSocket) return;

	  var console = window.console;
	  if (!console || !console.log || !console.error) {
	    console = {log: function(){ }, error: function(){ }};
	  }
	  
	  if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
	    console.error("Flash Player >= 10.0.0 is required.");
	    return;
	  }
	  if (location.protocol == "file:") {
	    console.error(
	      "WARNING: web-socket-js doesn't work in file:///... URL " +
	      "unless you set Flash Security Settings properly. " +
	      "Open the page via Web server i.e. http://...");
	  }

	  /**
	   * This class represents a faux web socket.
	   * @param {string} url
	   * @param {array or string} protocols
	   * @param {string} proxyHost
	   * @param {int} proxyPort
	   * @param {string} headers
	   */
	  WebSocket = function(url, protocols, proxyHost, proxyPort, headers) {
	    var self = this;
	    self.__id = WebSocket.__nextId++;
	    WebSocket.__instances[self.__id] = self;
	    self.readyState = WebSocket.CONNECTING;
	    self.bufferedAmount = 0;
	    self.__events = {};
	    if (!protocols) {
	      protocols = [];
	    } else if (typeof protocols == "string") {
	      protocols = [protocols];
	    }
	    // Uses setTimeout() to make sure __createFlash() runs after the caller sets ws.onopen etc.
	    // Otherwise, when onopen fires immediately, onopen is called before it is set.
	    setTimeout(function() {
	      WebSocket.__addTask(function() {
	        WebSocket.__flash.create(
	            self.__id, url, protocols, proxyHost || null, proxyPort || 0, headers || null);
	      });
	    }, 0);
	  };

	  /**
	   * Send data to the web socket.
	   * @param {string} data  The data to send to the socket.
	   * @return {boolean}  True for success, false for failure.
	   */
	  WebSocket.prototype.send = function(data) {
	    if (this.readyState == WebSocket.CONNECTING) {
	      throw "INVALID_STATE_ERR: Web Socket connection has not been established";
	    }
	    // We use encodeURIComponent() here, because FABridge doesn't work if
	    // the argument includes some characters. We don't use escape() here
	    // because of this:
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Functions#escape_and_unescape_Functions
	    // But it looks decodeURIComponent(encodeURIComponent(s)) doesn't
	    // preserve all Unicode characters either e.g. "\uffff" in Firefox.
	    // Note by wtritch: Hopefully this will not be necessary using ExternalInterface.  Will require
	    // additional testing.
	    var result = WebSocket.__flash.send(this.__id, encodeURIComponent(data));
	    if (result < 0) { // success
	      return true;
	    } else {
	      this.bufferedAmount += result;
	      return false;
	    }
	  };

	  /**
	   * Close this web socket gracefully.
	   */
	  WebSocket.prototype.close = function() {
	    if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) {
	      return;
	    }
	    this.readyState = WebSocket.CLOSING;
	    WebSocket.__flash.close(this.__id);
	  };

	  /**
	   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
	   *
	   * @param {string} type
	   * @param {function} listener
	   * @param {boolean} useCapture
	   * @return void
	   */
	  WebSocket.prototype.addEventListener = function(type, listener, useCapture) {
	    if (!(type in this.__events)) {
	      this.__events[type] = [];
	    }
	    this.__events[type].push(listener);
	  };

	  /**
	   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
	   *
	   * @param {string} type
	   * @param {function} listener
	   * @param {boolean} useCapture
	   * @return void
	   */
	  WebSocket.prototype.removeEventListener = function(type, listener, useCapture) {
	    if (!(type in this.__events)) return;
	    var events = this.__events[type];
	    for (var i = events.length - 1; i >= 0; --i) {
	      if (events[i] === listener) {
	        events.splice(i, 1);
	        break;
	      }
	    }
	  };

	  /**
	   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
	   *
	   * @param {Event} event
	   * @return void
	   */
	  WebSocket.prototype.dispatchEvent = function(event) {
	    var events = this.__events[event.type] || [];
	    for (var i = 0; i < events.length; ++i) {
	      events[i](event);
	    }
	    var handler = this["on" + event.type];
	    if (handler) handler(event);
	  };

	  /**
	   * Handles an event from Flash.
	   * @param {Object} flashEvent
	   */
	  WebSocket.prototype.__handleEvent = function(flashEvent) {
	    if ("readyState" in flashEvent) {
	      this.readyState = flashEvent.readyState;
	    }
	    if ("protocol" in flashEvent) {
	      this.protocol = flashEvent.protocol;
	    }
	    
	    var jsEvent;
	    if (flashEvent.type == "open" || flashEvent.type == "error") {
	      jsEvent = this.__createSimpleEvent(flashEvent.type);
	    } else if (flashEvent.type == "close") {
	      // TODO implement jsEvent.wasClean
	      jsEvent = this.__createSimpleEvent("close");
	    } else if (flashEvent.type == "message") {
	      var data = decodeURIComponent(flashEvent.message);
	      jsEvent = this.__createMessageEvent("message", data);
	    } else {
	      throw "unknown event type: " + flashEvent.type;
	    }
	    
	    this.dispatchEvent(jsEvent);
	  };
	  
	  WebSocket.prototype.__createSimpleEvent = function(type) {
	    if (document.createEvent && window.Event) {
	      var event = document.createEvent("Event");
	      event.initEvent(type, false, false);
	      return event;
	    } else {
	      return {type: type, bubbles: false, cancelable: false};
	    }
	  };
	  
	  WebSocket.prototype.__createMessageEvent = function(type, data) {
	    if (document.createEvent && window.MessageEvent && !window.opera) {
	      var event = document.createEvent("MessageEvent");
	      event.initMessageEvent("message", false, false, data, null, null, window, null);
	      return event;
	    } else {
	      // IE and Opera, the latter one truncates the data parameter after any 0x00 bytes.
	      return {type: type, data: data, bubbles: false, cancelable: false};
	    }
	  };
	  
	  /**
	   * Define the WebSocket readyState enumeration.
	   */
	  WebSocket.CONNECTING = 0;
	  WebSocket.OPEN = 1;
	  WebSocket.CLOSING = 2;
	  WebSocket.CLOSED = 3;

	  WebSocket.__flash = null;
	  WebSocket.__instances = {};
	  WebSocket.__tasks = [];
	  WebSocket.__nextId = 0;
	  
	  /**
	   * Load a new flash security policy file.
	   * @param {string} url
	   */
	  WebSocket.loadFlashPolicyFile = function(url){
	    WebSocket.__addTask(function() {
	      WebSocket.__flash.loadManualPolicyFile(url);
	    });
	  };

	  /**
	   * Loads WebSocketMain.swf and creates WebSocketMain object in Flash.
	   */
	  WebSocket.__initialize = function() {
	    if (WebSocket.__flash) return;
	    
	    if (WebSocket.__swfLocation) {
	      // For backword compatibility.
	      window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation;
	    }
	    if (!window.WEB_SOCKET_SWF_LOCATION) {
	      console.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
	      return;
	    }
	    var container = document.createElement("div");
	    container.id = "webSocketContainer";
	    // Hides Flash box. We cannot use display: none or visibility: hidden because it prevents
	    // Flash from loading at least in IE. So we move it out of the screen at (-100, -100).
	    // But this even doesn't work with Flash Lite (e.g. in Droid Incredible). So with Flash
	    // Lite, we put it at (0, 0). This shows 1x1 box visible at left-top corner but this is
	    // the best we can do as far as we know now.
	    container.style.position = "absolute";
	    if (WebSocket.__isFlashLite()) {
	      container.style.left = "0px";
	      container.style.top = "0px";
	    } else {
	      container.style.left = "-100px";
	      container.style.top = "-100px";
	    }
	    var holder = document.createElement("div");
	    holder.id = "webSocketFlash";
	    container.appendChild(holder);
	    document.body.appendChild(container);
	    // See this article for hasPriority:
	    // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
	    swfobject.embedSWF(
	      WEB_SOCKET_SWF_LOCATION,
	      "webSocketFlash",
	      "1" /* width */,
	      "1" /* height */,
	      "10.0.0" /* SWF version */,
	      null,
	      null,
	      {hasPriority: true, swliveconnect : true, allowScriptAccess: "always"},
	      null,
	      function(e) {
	        if (!e.success) {
	          console.error("[WebSocket] swfobject.embedSWF failed");
	        }
	      });
	  };
	  
	  /**
	   * Called by Flash to notify JS that it's fully loaded and ready
	   * for communication.
	   */
	  WebSocket.__onFlashInitialized = function() {
	    // We need to set a timeout here to avoid round-trip calls
	    // to flash during the initialization process.
	    setTimeout(function() {
	      WebSocket.__flash = document.getElementById("webSocketFlash");
	      WebSocket.__flash.setCallerUrl(location.href);
	      WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
	      for (var i = 0; i < WebSocket.__tasks.length; ++i) {
	        WebSocket.__tasks[i]();
	      }
	      WebSocket.__tasks = [];
	    }, 0);
	  };
	  
	  /**
	   * Called by Flash to notify WebSockets events are fired.
	   */
	  WebSocket.__onFlashEvent = function() {
	    setTimeout(function() {
	      try {
	        // Gets events using receiveEvents() instead of getting it from event object
	        // of Flash event. This is to make sure to keep message order.
	        // It seems sometimes Flash events don't arrive in the same order as they are sent.
	        var events = WebSocket.__flash.receiveEvents();
	        for (var i = 0; i < events.length; ++i) {
	          WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i]);
	        }
	      } catch (e) {
	        console.error(e);
	      }
	    }, 0);
	    return true;
	  };
	  
	  // Called by Flash.
	  WebSocket.__log = function(message) {
	    console.log(decodeURIComponent(message));
	  };
	  
	  // Called by Flash.
	  WebSocket.__error = function(message) {
	    console.error(decodeURIComponent(message));
	  };
	  
	  WebSocket.__addTask = function(task) {
	    if (WebSocket.__flash) {
	      task();
	    } else {
	      WebSocket.__tasks.push(task);
	    }
	  };
	  
	  /**
	   * Test if the browser is running flash lite.
	   * @return {boolean} True if flash lite is running, false otherwise.
	   */
	  WebSocket.__isFlashLite = function() {
	    if (!window.navigator || !window.navigator.mimeTypes) {
	      return false;
	    }
	    var mimeType = window.navigator.mimeTypes["application/x-shockwave-flash"];
	    if (!mimeType || !mimeType.enabledPlugin || !mimeType.enabledPlugin.filename) {
	      return false;
	    }
	    return mimeType.enabledPlugin.filename.match(/flashlite/i) ? true : false;
	  };
	  
	  if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
	    if (window.addEventListener) {
	      window.addEventListener("load", function(){
	        WebSocket.__initialize();
	      }, false);
	    } else {
	      window.attachEvent("onload", function(){
	        WebSocket.__initialize();
	      });
	    }
	  }
	  
	})();

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {

	  /**
	   * Expose constructor.
	   *
	   * @api public
	   */

	  exports.XHR = XHR;

	  /**
	   * XHR constructor
	   *
	   * @costructor
	   * @api public
	   */

	  function XHR (socket) {
	    if (!socket) return;

	    io.Transport.apply(this, arguments);
	    this.sendBuffer = [];
	  };

	  /**
	   * Inherits from Transport.
	   */

	  io.util.inherit(XHR, io.Transport);

	  /**
	   * Establish a connection
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  XHR.prototype.open = function () {
	    this.socket.setBuffer(false);
	    this.onOpen();
	    this.get();

	    // we need to make sure the request succeeds since we have no indication
	    // whether the request opened or not until it succeeded.
	    this.setCloseTimeout();

	    return this;
	  };

	  /**
	   * Check if we need to send data to the Socket.IO server, if we have data in our
	   * buffer we encode it and forward it to the `post` method.
	   *
	   * @api private
	   */

	  XHR.prototype.payload = function (payload) {
	    var msgs = [];

	    for (var i = 0, l = payload.length; i < l; i++) {
	      msgs.push(io.parser.encodePacket(payload[i]));
	    }

	    this.send(io.parser.encodePayload(msgs));
	  };

	  /**
	   * Send data to the Socket.IO server.
	   *
	   * @param data The message
	   * @returns {Transport}
	   * @api public
	   */

	  XHR.prototype.send = function (data) {
	    this.post(data);
	    return this;
	  };

	  /**
	   * Posts a encoded message to the Socket.IO server.
	   *
	   * @param {String} data A encoded message.
	   * @api private
	   */

	  function empty () { };

	  XHR.prototype.post = function (data) {
	    var self = this;
	    this.socket.setBuffer(true);

	    function stateChange () {
	      if (this.readyState == 4) {
	        this.onreadystatechange = empty;
	        self.posting = false;

	        if (this.status == 200){
	          self.socket.setBuffer(false);
	        } else {
	          self.onClose();
	        }
	      }
	    }

	    function onload () {
	      this.onload = empty;
	      self.socket.setBuffer(false);
	    };

	    this.sendXHR = this.request('POST');

	    if (global.XDomainRequest && this.sendXHR instanceof XDomainRequest) {
	      this.sendXHR.onload = this.sendXHR.onerror = onload;
	    } else {
	      this.sendXHR.onreadystatechange = stateChange;
	    }

	    this.sendXHR.send(data);
	  };

	  /**
	   * Disconnects the established `XHR` connection.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  XHR.prototype.close = function () {
	    this.onClose();
	    return this;
	  };

	  /**
	   * Generates a configured XHR request
	   *
	   * @param {String} url The url that needs to be requested.
	   * @param {String} method The method the request should use.
	   * @returns {XMLHttpRequest}
	   * @api private
	   */

	  XHR.prototype.request = function (method) {
	    var req = io.util.request(this.socket.isXDomain())
	      , query = io.util.query(this.socket.options.query, 't=' + +new Date);

	    req.open(method || 'GET', this.prepareUrl() + query, true);

	    if (method == 'POST') {
	      try {
	        if (req.setRequestHeader) {
	          req.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        } else {
	          // XDomainRequest
	          req.contentType = 'text/plain';
	        }
	      } catch (e) {}
	    }

	    return req;
	  };

	  /**
	   * Returns the scheme to use for the transport URLs.
	   *
	   * @api private
	   */

	  XHR.prototype.scheme = function () {
	    return this.socket.options.secure ? 'https' : 'http';
	  };

	  /**
	   * Check if the XHR transports are supported
	   *
	   * @param {Boolean} xdomain Check if we support cross domain requests.
	   * @returns {Boolean}
	   * @api public
	   */

	  XHR.check = function (socket, xdomain) {
	    try {
	      var request = io.util.request(xdomain),
	          usesXDomReq = (global.XDomainRequest && request instanceof XDomainRequest),
	          socketProtocol = (socket && socket.options && socket.options.secure ? 'https:' : 'http:'),
	          isXProtocol = (global.location && socketProtocol != global.location.protocol);
	      if (request && !(usesXDomReq && isXProtocol)) {
	        return true;
	      }
	    } catch(e) {}

	    return false;
	  };

	  /**
	   * Check if the XHR transport supports cross domain requests.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  XHR.xdomainCheck = function (socket) {
	    return XHR.check(socket, true);
	  };

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.htmlfile = HTMLFile;

	  /**
	   * The HTMLFile transport creates a `forever iframe` based transport
	   * for Internet Explorer. Regular forever iframe implementations will 
	   * continuously trigger the browsers buzy indicators. If the forever iframe
	   * is created inside a `htmlfile` these indicators will not be trigged.
	   *
	   * @constructor
	   * @extends {io.Transport.XHR}
	   * @api public
	   */

	  function HTMLFile (socket) {
	    io.Transport.XHR.apply(this, arguments);
	  };

	  /**
	   * Inherits from XHR transport.
	   */

	  io.util.inherit(HTMLFile, io.Transport.XHR);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  HTMLFile.prototype.name = 'htmlfile';

	  /**
	   * Creates a new Ac...eX `htmlfile` with a forever loading iframe
	   * that can be used to listen to messages. Inside the generated
	   * `htmlfile` a reference will be made to the HTMLFile transport.
	   *
	   * @api private
	   */

	  HTMLFile.prototype.get = function () {
	    this.doc = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
	    this.doc.open();
	    this.doc.write('<html></html>');
	    this.doc.close();
	    this.doc.parentWindow.s = this;

	    var iframeC = this.doc.createElement('div');
	    iframeC.className = 'socketio';

	    this.doc.body.appendChild(iframeC);
	    this.iframe = this.doc.createElement('iframe');

	    iframeC.appendChild(this.iframe);

	    var self = this
	      , query = io.util.query(this.socket.options.query, 't='+ +new Date);

	    this.iframe.src = this.prepareUrl() + query;

	    io.util.on(window, 'unload', function () {
	      self.destroy();
	    });
	  };

	  /**
	   * The Socket.IO server will write script tags inside the forever
	   * iframe, this function will be used as callback for the incoming
	   * information.
	   *
	   * @param {String} data The message
	   * @param {document} doc Reference to the context
	   * @api private
	   */

	  HTMLFile.prototype._ = function (data, doc) {
	    // unescape all forward slashes. see GH-1251
	    data = data.replace(/\\\//g, '/');
	    this.onData(data);
	    try {
	      var script = doc.getElementsByTagName('script')[0];
	      script.parentNode.removeChild(script);
	    } catch (e) { }
	  };

	  /**
	   * Destroy the established connection, iframe and `htmlfile`.
	   * And calls the `CollectGarbage` function of Internet Explorer
	   * to release the memory.
	   *
	   * @api private
	   */

	  HTMLFile.prototype.destroy = function () {
	    if (this.iframe){
	      try {
	        this.iframe.src = 'about:blank';
	      } catch(e){}

	      this.doc = null;
	      this.iframe.parentNode.removeChild(this.iframe);
	      this.iframe = null;

	      CollectGarbage();
	    }
	  };

	  /**
	   * Disconnects the established connection.
	   *
	   * @returns {Transport} Chaining.
	   * @api public
	   */

	  HTMLFile.prototype.close = function () {
	    this.destroy();
	    return io.Transport.XHR.prototype.close.call(this);
	  };

	  /**
	   * Checks if the browser supports this transport. The browser
	   * must have an `Ac...eXObject` implementation.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  HTMLFile.check = function (socket) {
	    if (typeof window != "undefined" && (['Active'].concat('Object').join('X')) in window){
	      try {
	        var a = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
	        return a && io.Transport.XHR.check(socket);
	      } catch(e){}
	    }
	    return false;
	  };

	  /**
	   * Check if cross domain requests are supported.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  HTMLFile.xdomainCheck = function () {
	    // we can probably do handling for sub-domains, we should
	    // test that it's cross domain but a subdomain here
	    return false;
	  };

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('htmlfile');

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {

	  /**
	   * Expose constructor.
	   */

	  exports['xhr-polling'] = XHRPolling;

	  /**
	   * The XHR-polling transport uses long polling XHR requests to create a
	   * "persistent" connection with the server.
	   *
	   * @constructor
	   * @api public
	   */

	  function XHRPolling () {
	    io.Transport.XHR.apply(this, arguments);
	  };

	  /**
	   * Inherits from XHR transport.
	   */

	  io.util.inherit(XHRPolling, io.Transport.XHR);

	  /**
	   * Merge the properties from XHR transport
	   */

	  io.util.merge(XHRPolling, io.Transport.XHR);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  XHRPolling.prototype.name = 'xhr-polling';

	  /**
	   * Indicates whether heartbeats is enabled for this transport
	   *
	   * @api private
	   */

	  XHRPolling.prototype.heartbeats = function () {
	    return false;
	  };

	  /** 
	   * Establish a connection, for iPhone and Android this will be done once the page
	   * is loaded.
	   *
	   * @returns {Transport} Chaining.
	   * @api public
	   */

	  XHRPolling.prototype.open = function () {
	    var self = this;

	    io.Transport.XHR.prototype.open.call(self);
	    return false;
	  };

	  /**
	   * Starts a XHR request to wait for incoming messages.
	   *
	   * @api private
	   */

	  function empty () {};

	  XHRPolling.prototype.get = function () {
	    if (!this.isOpen) return;

	    var self = this;

	    function stateChange () {
	      if (this.readyState == 4) {
	        this.onreadystatechange = empty;

	        if (this.status == 200) {
	          self.onData(this.responseText);
	          self.get();
	        } else {
	          self.onClose();
	        }
	      }
	    };

	    function onload () {
	      this.onload = empty;
	      this.onerror = empty;
	      self.retryCounter = 1;
	      self.onData(this.responseText);
	      self.get();
	    };

	    function onerror () {
	      self.retryCounter ++;
	      if(!self.retryCounter || self.retryCounter > 3) {
	        self.onClose();  
	      } else {
	        self.get();
	      }
	    };

	    this.xhr = this.request();

	    if (global.XDomainRequest && this.xhr instanceof XDomainRequest) {
	      this.xhr.onload = onload;
	      this.xhr.onerror = onerror;
	    } else {
	      this.xhr.onreadystatechange = stateChange;
	    }

	    this.xhr.send(null);
	  };

	  /**
	   * Handle the unclean close behavior.
	   *
	   * @api private
	   */

	  XHRPolling.prototype.onClose = function () {
	    io.Transport.XHR.prototype.onClose.call(this);

	    if (this.xhr) {
	      this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = empty;
	      try {
	        this.xhr.abort();
	      } catch(e){}
	      this.xhr = null;
	    }
	  };

	  /**
	   * Webkit based browsers show a infinit spinner when you start a XHR request
	   * before the browsers onload event is called so we need to defer opening of
	   * the transport until the onload event is called. Wrapping the cb in our
	   * defer method solve this.
	   *
	   * @param {Socket} socket The socket instance that needs a transport
	   * @param {Function} fn The callback
	   * @api private
	   */

	  XHRPolling.prototype.ready = function (socket, fn) {
	    var self = this;

	    io.util.defer(function () {
	      fn.call(self);
	    });
	  };

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('xhr-polling');

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {
	  /**
	   * There is a way to hide the loading indicator in Firefox. If you create and
	   * remove a iframe it will stop showing the current loading indicator.
	   * Unfortunately we can't feature detect that and UA sniffing is evil.
	   *
	   * @api private
	   */

	  var indicator = global.document && "MozAppearance" in
	    global.document.documentElement.style;

	  /**
	   * Expose constructor.
	   */

	  exports['jsonp-polling'] = JSONPPolling;

	  /**
	   * The JSONP transport creates an persistent connection by dynamically
	   * inserting a script tag in the page. This script tag will receive the
	   * information of the Socket.IO server. When new information is received
	   * it creates a new script tag for the new data stream.
	   *
	   * @constructor
	   * @extends {io.Transport.xhr-polling}
	   * @api public
	   */

	  function JSONPPolling (socket) {
	    io.Transport['xhr-polling'].apply(this, arguments);

	    this.index = io.j.length;

	    var self = this;

	    io.j.push(function (msg) {
	      self._(msg);
	    });
	  };

	  /**
	   * Inherits from XHR polling transport.
	   */

	  io.util.inherit(JSONPPolling, io.Transport['xhr-polling']);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  JSONPPolling.prototype.name = 'jsonp-polling';

	  /**
	   * Posts a encoded message to the Socket.IO server using an iframe.
	   * The iframe is used because script tags can create POST based requests.
	   * The iframe is positioned outside of the view so the user does not
	   * notice it's existence.
	   *
	   * @param {String} data A encoded message.
	   * @api private
	   */

	  JSONPPolling.prototype.post = function (data) {
	    var self = this
	      , query = io.util.query(
	             this.socket.options.query
	          , 't='+ (+new Date) + '&i=' + this.index
	        );

	    if (!this.form) {
	      var form = document.createElement('form')
	        , area = document.createElement('textarea')
	        , id = this.iframeId = 'socketio_iframe_' + this.index
	        , iframe;

	      form.className = 'socketio';
	      form.style.position = 'absolute';
	      form.style.top = '0px';
	      form.style.left = '0px';
	      form.style.display = 'none';
	      form.target = id;
	      form.method = 'POST';
	      form.setAttribute('accept-charset', 'utf-8');
	      area.name = 'd';
	      form.appendChild(area);
	      document.body.appendChild(form);

	      this.form = form;
	      this.area = area;
	    }

	    this.form.action = this.prepareUrl() + query;

	    function complete () {
	      initIframe();
	      self.socket.setBuffer(false);
	    };

	    function initIframe () {
	      if (self.iframe) {
	        self.form.removeChild(self.iframe);
	      }

	      try {
	        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	        iframe = document.createElement('<iframe name="'+ self.iframeId +'">');
	      } catch (e) {
	        iframe = document.createElement('iframe');
	        iframe.name = self.iframeId;
	      }

	      iframe.id = self.iframeId;

	      self.form.appendChild(iframe);
	      self.iframe = iframe;
	    };

	    initIframe();

	    // we temporarily stringify until we figure out how to prevent
	    // browsers from turning `\n` into `\r\n` in form inputs
	    this.area.value = io.JSON.stringify(data);

	    try {
	      this.form.submit();
	    } catch(e) {}

	    if (this.iframe.attachEvent) {
	      iframe.onreadystatechange = function () {
	        if (self.iframe.readyState == 'complete') {
	          complete();
	        }
	      };
	    } else {
	      this.iframe.onload = complete;
	    }

	    this.socket.setBuffer(true);
	  };

	  /**
	   * Creates a new JSONP poll that can be used to listen
	   * for messages from the Socket.IO server.
	   *
	   * @api private
	   */

	  JSONPPolling.prototype.get = function () {
	    var self = this
	      , script = document.createElement('script')
	      , query = io.util.query(
	             this.socket.options.query
	          , 't='+ (+new Date) + '&i=' + this.index
	        );

	    if (this.script) {
	      this.script.parentNode.removeChild(this.script);
	      this.script = null;
	    }

	    script.async = true;
	    script.src = this.prepareUrl() + query;
	    script.onerror = function () {
	      self.onClose();
	    };

	    var insertAt = document.getElementsByTagName('script')[0];
	    insertAt.parentNode.insertBefore(script, insertAt);
	    this.script = script;

	    if (indicator) {
	      setTimeout(function () {
	        var iframe = document.createElement('iframe');
	        document.body.appendChild(iframe);
	        document.body.removeChild(iframe);
	      }, 100);
	    }
	  };

	  /**
	   * Callback function for the incoming message stream from the Socket.IO server.
	   *
	   * @param {String} data The message
	   * @api private
	   */

	  JSONPPolling.prototype._ = function (msg) {
	    this.onData(msg);
	    if (this.isOpen) {
	      this.get();
	    }
	    return this;
	  };

	  /**
	   * The indicator hack only works after onload
	   *
	   * @param {Socket} socket The socket instance that needs a transport
	   * @param {Function} fn The callback
	   * @api private
	   */

	  JSONPPolling.prototype.ready = function (socket, fn) {
	    var self = this;
	    if (!indicator) return fn.call(this);

	    io.util.load(function () {
	      fn.call(self);
	    });
	  };

	  /**
	   * Checks if browser supports this transport.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  JSONPPolling.check = function () {
	    return 'document' in global;
	  };

	  /**
	   * Check if cross domain requests are supported
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  JSONPPolling.xdomainCheck = function () {
	    return true;
	  };

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('jsonp-polling');

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);

	if (true) {
	  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return io; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// vim:ts=4:sts=4:sw=4:
	/*!
	 *
	 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
	 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
	 *
	 * With parts by Tyler Close
	 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
	 * at http://www.opensource.org/licenses/mit-license.html
	 * Forked at ref_send.js version: 2009-05-11
	 *
	 * With parts by Mark Miller
	 * Copyright (C) 2011 Google Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */

	(function (definition) {
	    "use strict";

	    // This file will function properly as a <script> tag, or a module
	    // using CommonJS and NodeJS or RequireJS module formats.  In
	    // Common/Node/RequireJS, the module exports the Q API and when
	    // executed as a simple <script>, it creates a Q global instead.

	    // Montage Require
	    if (typeof bootstrap === "function") {
	        bootstrap("promise", definition);

	    // CommonJS
	    } else if (true) {
	        module.exports = definition();

	    // RequireJS
	    } else if (typeof define === "function" && define.amd) {
	        define(definition);

	    // SES (Secure EcmaScript)
	    } else if (typeof ses !== "undefined") {
	        if (!ses.ok()) {
	            return;
	        } else {
	            ses.makeQ = definition;
	        }

	    // <script>
	    } else if (typeof window !== "undefined" || typeof self !== "undefined") {
	        // Prefer window over self for add-on scripts. Use self for
	        // non-windowed contexts.
	        var global = typeof window !== "undefined" ? window : self;

	        // Get the `window` object, save the previous Q global
	        // and initialize Q as a global.
	        var previousQ = global.Q;
	        global.Q = definition();

	        // Add a noConflict function so Q can be removed from the
	        // global namespace.
	        global.Q.noConflict = function () {
	            global.Q = previousQ;
	            return this;
	        };

	    } else {
	        throw new Error("This environment was not anticipated by Q. Please file a bug.");
	    }

	})(function () {
	"use strict";

	var hasStacks = false;
	try {
	    throw new Error();
	} catch (e) {
	    hasStacks = !!e.stack;
	}

	// All code after this point will be filtered from stack traces reported
	// by Q.
	var qStartingLine = captureLine();
	var qFileName;

	// shims

	// used for fallback in "allResolved"
	var noop = function () {};

	// Use the fastest possible means to execute a task in a future turn
	// of the event loop.
	var nextTick =(function () {
	    // linked list of tasks (single, with head node)
	    var head = {task: void 0, next: null};
	    var tail = head;
	    var flushing = false;
	    var requestTick = void 0;
	    var isNodeJS = false;
	    // queue for late tasks, used by unhandled rejection tracking
	    var laterQueue = [];

	    function flush() {
	        /* jshint loopfunc: true */
	        var task, domain;

	        while (head.next) {
	            head = head.next;
	            task = head.task;
	            head.task = void 0;
	            domain = head.domain;

	            if (domain) {
	                head.domain = void 0;
	                domain.enter();
	            }
	            runSingle(task, domain);

	        }
	        while (laterQueue.length) {
	            task = laterQueue.pop();
	            runSingle(task);
	        }
	        flushing = false;
	    }
	    // runs a single function in the async queue
	    function runSingle(task, domain) {
	        try {
	            task();

	        } catch (e) {
	            if (isNodeJS) {
	                // In node, uncaught exceptions are considered fatal errors.
	                // Re-throw them synchronously to interrupt flushing!

	                // Ensure continuation if the uncaught exception is suppressed
	                // listening "uncaughtException" events (as domains does).
	                // Continue in next event to avoid tick recursion.
	                if (domain) {
	                    domain.exit();
	                }
	                setTimeout(flush, 0);
	                if (domain) {
	                    domain.enter();
	                }

	                throw e;

	            } else {
	                // In browsers, uncaught exceptions are not fatal.
	                // Re-throw them asynchronously to avoid slow-downs.
	                setTimeout(function () {
	                    throw e;
	                }, 0);
	            }
	        }

	        if (domain) {
	            domain.exit();
	        }
	    }

	    nextTick = function (task) {
	        tail = tail.next = {
	            task: task,
	            domain: isNodeJS && process.domain,
	            next: null
	        };

	        if (!flushing) {
	            flushing = true;
	            requestTick();
	        }
	    };

	    if (typeof process === "object" &&
	        process.toString() === "[object process]" && process.nextTick) {
	        // Ensure Q is in a real Node environment, with a `process.nextTick`.
	        // To see through fake Node environments:
	        // * Mocha test runner - exposes a `process` global without a `nextTick`
	        // * Browserify - exposes a `process.nexTick` function that uses
	        //   `setTimeout`. In this case `setImmediate` is preferred because
	        //    it is faster. Browserify's `process.toString()` yields
	        //   "[object Object]", while in a real Node environment
	        //   `process.nextTick()` yields "[object process]".
	        isNodeJS = true;

	        requestTick = function () {
	            process.nextTick(flush);
	        };

	    } else if (typeof setImmediate === "function") {
	        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
	        if (typeof window !== "undefined") {
	            requestTick = setImmediate.bind(window, flush);
	        } else {
	            requestTick = function () {
	                setImmediate(flush);
	            };
	        }

	    } else if (typeof MessageChannel !== "undefined") {
	        // modern browsers
	        // http://www.nonblocking.io/2011/06/windownexttick.html
	        var channel = new MessageChannel();
	        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
	        // working message ports the first time a page loads.
	        channel.port1.onmessage = function () {
	            requestTick = requestPortTick;
	            channel.port1.onmessage = flush;
	            flush();
	        };
	        var requestPortTick = function () {
	            // Opera requires us to provide a message payload, regardless of
	            // whether we use it.
	            channel.port2.postMessage(0);
	        };
	        requestTick = function () {
	            setTimeout(flush, 0);
	            requestPortTick();
	        };

	    } else {
	        // old browsers
	        requestTick = function () {
	            setTimeout(flush, 0);
	        };
	    }
	    // runs a task after all other tasks have been run
	    // this is useful for unhandled rejection tracking that needs to happen
	    // after all `then`d tasks have been run.
	    nextTick.runAfter = function (task) {
	        laterQueue.push(task);
	        if (!flushing) {
	            flushing = true;
	            requestTick();
	        }
	    };
	    return nextTick;
	})();

	// Attempt to make generics safe in the face of downstream
	// modifications.
	// There is no situation where this is necessary.
	// If you need a security guarantee, these primordials need to be
	// deeply frozen anyway, and if you don’t need a security guarantee,
	// this is just plain paranoid.
	// However, this **might** have the nice side-effect of reducing the size of
	// the minified code by reducing x.call() to merely x()
	// See Mark Miller’s explanation of what this does.
	// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
	var call = Function.call;
	function uncurryThis(f) {
	    return function () {
	        return call.apply(f, arguments);
	    };
	}
	// This is equivalent, but slower:
	// uncurryThis = Function_bind.bind(Function_bind.call);
	// http://jsperf.com/uncurrythis

	var array_slice = uncurryThis(Array.prototype.slice);

	var array_reduce = uncurryThis(
	    Array.prototype.reduce || function (callback, basis) {
	        var index = 0,
	            length = this.length;
	        // concerning the initial value, if one is not provided
	        if (arguments.length === 1) {
	            // seek to the first value in the array, accounting
	            // for the possibility that is is a sparse array
	            do {
	                if (index in this) {
	                    basis = this[index++];
	                    break;
	                }
	                if (++index >= length) {
	                    throw new TypeError();
	                }
	            } while (1);
	        }
	        // reduce
	        for (; index < length; index++) {
	            // account for the possibility that the array is sparse
	            if (index in this) {
	                basis = callback(basis, this[index], index);
	            }
	        }
	        return basis;
	    }
	);

	var array_indexOf = uncurryThis(
	    Array.prototype.indexOf || function (value) {
	        // not a very good shim, but good enough for our one use of it
	        for (var i = 0; i < this.length; i++) {
	            if (this[i] === value) {
	                return i;
	            }
	        }
	        return -1;
	    }
	);

	var array_map = uncurryThis(
	    Array.prototype.map || function (callback, thisp) {
	        var self = this;
	        var collect = [];
	        array_reduce(self, function (undefined, value, index) {
	            collect.push(callback.call(thisp, value, index, self));
	        }, void 0);
	        return collect;
	    }
	);

	var object_create = Object.create || function (prototype) {
	    function Type() { }
	    Type.prototype = prototype;
	    return new Type();
	};

	var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

	var object_keys = Object.keys || function (object) {
	    var keys = [];
	    for (var key in object) {
	        if (object_hasOwnProperty(object, key)) {
	            keys.push(key);
	        }
	    }
	    return keys;
	};

	var object_toString = uncurryThis(Object.prototype.toString);

	function isObject(value) {
	    return value === Object(value);
	}

	// generator related shims

	// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
	function isStopIteration(exception) {
	    return (
	        object_toString(exception) === "[object StopIteration]" ||
	        exception instanceof QReturnValue
	    );
	}

	// FIXME: Remove this helper and Q.return once ES6 generators are in
	// SpiderMonkey.
	var QReturnValue;
	if (typeof ReturnValue !== "undefined") {
	    QReturnValue = ReturnValue;
	} else {
	    QReturnValue = function (value) {
	        this.value = value;
	    };
	}

	// long stack traces

	var STACK_JUMP_SEPARATOR = "From previous event:";

	function makeStackTraceLong(error, promise) {
	    // If possible, transform the error stack trace by removing Node and Q
	    // cruft, then concatenating with the stack trace of `promise`. See #57.
	    if (hasStacks &&
	        promise.stack &&
	        typeof error === "object" &&
	        error !== null &&
	        error.stack &&
	        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
	    ) {
	        var stacks = [];
	        for (var p = promise; !!p; p = p.source) {
	            if (p.stack) {
	                stacks.unshift(p.stack);
	            }
	        }
	        stacks.unshift(error.stack);

	        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
	        error.stack = filterStackString(concatedStacks);
	    }
	}

	function filterStackString(stackString) {
	    var lines = stackString.split("\n");
	    var desiredLines = [];
	    for (var i = 0; i < lines.length; ++i) {
	        var line = lines[i];

	        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
	            desiredLines.push(line);
	        }
	    }
	    return desiredLines.join("\n");
	}

	function isNodeFrame(stackLine) {
	    return stackLine.indexOf("(module.js:") !== -1 ||
	           stackLine.indexOf("(node.js:") !== -1;
	}

	function getFileNameAndLineNumber(stackLine) {
	    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
	    // In IE10 function name can have spaces ("Anonymous function") O_o
	    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
	    if (attempt1) {
	        return [attempt1[1], Number(attempt1[2])];
	    }

	    // Anonymous functions: "at filename:lineNumber:columnNumber"
	    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
	    if (attempt2) {
	        return [attempt2[1], Number(attempt2[2])];
	    }

	    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
	    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
	    if (attempt3) {
	        return [attempt3[1], Number(attempt3[2])];
	    }
	}

	function isInternalFrame(stackLine) {
	    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

	    if (!fileNameAndLineNumber) {
	        return false;
	    }

	    var fileName = fileNameAndLineNumber[0];
	    var lineNumber = fileNameAndLineNumber[1];

	    return fileName === qFileName &&
	        lineNumber >= qStartingLine &&
	        lineNumber <= qEndingLine;
	}

	// discover own file name and line number range for filtering stack
	// traces
	function captureLine() {
	    if (!hasStacks) {
	        return;
	    }

	    try {
	        throw new Error();
	    } catch (e) {
	        var lines = e.stack.split("\n");
	        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
	        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
	        if (!fileNameAndLineNumber) {
	            return;
	        }

	        qFileName = fileNameAndLineNumber[0];
	        return fileNameAndLineNumber[1];
	    }
	}

	function deprecate(callback, name, alternative) {
	    return function () {
	        if (typeof console !== "undefined" &&
	            typeof console.warn === "function") {
	            console.warn(name + " is deprecated, use " + alternative +
	                         " instead.", new Error("").stack);
	        }
	        return callback.apply(callback, arguments);
	    };
	}

	// end of shims
	// beginning of real work

	/**
	 * Constructs a promise for an immediate reference, passes promises through, or
	 * coerces promises from different systems.
	 * @param value immediate reference or promise
	 */
	function Q(value) {
	    // If the object is already a Promise, return it directly.  This enables
	    // the resolve function to both be used to created references from objects,
	    // but to tolerably coerce non-promises to promises.
	    if (value instanceof Promise) {
	        return value;
	    }

	    // assimilate thenables
	    if (isPromiseAlike(value)) {
	        return coerce(value);
	    } else {
	        return fulfill(value);
	    }
	}
	Q.resolve = Q;

	/**
	 * Performs a task in a future turn of the event loop.
	 * @param {Function} task
	 */
	Q.nextTick = nextTick;

	/**
	 * Controls whether or not long stack traces will be on
	 */
	Q.longStackSupport = false;

	// enable long stacks if Q_DEBUG is set
	if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
	    Q.longStackSupport = true;
	}

	/**
	 * Constructs a {promise, resolve, reject} object.
	 *
	 * `resolve` is a callback to invoke with a more resolved value for the
	 * promise. To fulfill the promise, invoke `resolve` with any value that is
	 * not a thenable. To reject the promise, invoke `resolve` with a rejected
	 * thenable, or invoke `reject` with the reason directly. To resolve the
	 * promise to another thenable, thus putting it in the same state, invoke
	 * `resolve` with that other thenable.
	 */
	Q.defer = defer;
	function defer() {
	    // if "messages" is an "Array", that indicates that the promise has not yet
	    // been resolved.  If it is "undefined", it has been resolved.  Each
	    // element of the messages array is itself an array of complete arguments to
	    // forward to the resolved promise.  We coerce the resolution value to a
	    // promise using the `resolve` function because it handles both fully
	    // non-thenable values and other thenables gracefully.
	    var messages = [], progressListeners = [], resolvedPromise;

	    var deferred = object_create(defer.prototype);
	    var promise = object_create(Promise.prototype);

	    promise.promiseDispatch = function (resolve, op, operands) {
	        var args = array_slice(arguments);
	        if (messages) {
	            messages.push(args);
	            if (op === "when" && operands[1]) { // progress operand
	                progressListeners.push(operands[1]);
	            }
	        } else {
	            Q.nextTick(function () {
	                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
	            });
	        }
	    };

	    // XXX deprecated
	    promise.valueOf = function () {
	        if (messages) {
	            return promise;
	        }
	        var nearerValue = nearer(resolvedPromise);
	        if (isPromise(nearerValue)) {
	            resolvedPromise = nearerValue; // shorten chain
	        }
	        return nearerValue;
	    };

	    promise.inspect = function () {
	        if (!resolvedPromise) {
	            return { state: "pending" };
	        }
	        return resolvedPromise.inspect();
	    };

	    if (Q.longStackSupport && hasStacks) {
	        try {
	            throw new Error();
	        } catch (e) {
	            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
	            // accessor around; that causes memory leaks as per GH-111. Just
	            // reify the stack trace as a string ASAP.
	            //
	            // At the same time, cut off the first line; it's always just
	            // "[object Promise]\n", as per the `toString`.
	            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
	        }
	    }

	    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
	    // consolidating them into `become`, since otherwise we'd create new
	    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

	    function become(newPromise) {
	        resolvedPromise = newPromise;
	        promise.source = newPromise;

	        array_reduce(messages, function (undefined, message) {
	            Q.nextTick(function () {
	                newPromise.promiseDispatch.apply(newPromise, message);
	            });
	        }, void 0);

	        messages = void 0;
	        progressListeners = void 0;
	    }

	    deferred.promise = promise;
	    deferred.resolve = function (value) {
	        if (resolvedPromise) {
	            return;
	        }

	        become(Q(value));
	    };

	    deferred.fulfill = function (value) {
	        if (resolvedPromise) {
	            return;
	        }

	        become(fulfill(value));
	    };
	    deferred.reject = function (reason) {
	        if (resolvedPromise) {
	            return;
	        }

	        become(reject(reason));
	    };
	    deferred.notify = function (progress) {
	        if (resolvedPromise) {
	            return;
	        }

	        array_reduce(progressListeners, function (undefined, progressListener) {
	            Q.nextTick(function () {
	                progressListener(progress);
	            });
	        }, void 0);
	    };

	    return deferred;
	}

	/**
	 * Creates a Node-style callback that will resolve or reject the deferred
	 * promise.
	 * @returns a nodeback
	 */
	defer.prototype.makeNodeResolver = function () {
	    var self = this;
	    return function (error, value) {
	        if (error) {
	            self.reject(error);
	        } else if (arguments.length > 2) {
	            self.resolve(array_slice(arguments, 1));
	        } else {
	            self.resolve(value);
	        }
	    };
	};

	/**
	 * @param resolver {Function} a function that returns nothing and accepts
	 * the resolve, reject, and notify functions for a deferred.
	 * @returns a promise that may be resolved with the given resolve and reject
	 * functions, or rejected by a thrown exception in resolver
	 */
	Q.Promise = promise; // ES6
	Q.promise = promise;
	function promise(resolver) {
	    if (typeof resolver !== "function") {
	        throw new TypeError("resolver must be a function.");
	    }
	    var deferred = defer();
	    try {
	        resolver(deferred.resolve, deferred.reject, deferred.notify);
	    } catch (reason) {
	        deferred.reject(reason);
	    }
	    return deferred.promise;
	}

	promise.race = race; // ES6
	promise.all = all; // ES6
	promise.reject = reject; // ES6
	promise.resolve = Q; // ES6

	// XXX experimental.  This method is a way to denote that a local value is
	// serializable and should be immediately dispatched to a remote upon request,
	// instead of passing a reference.
	Q.passByCopy = function (object) {
	    //freeze(object);
	    //passByCopies.set(object, true);
	    return object;
	};

	Promise.prototype.passByCopy = function () {
	    //freeze(object);
	    //passByCopies.set(object, true);
	    return this;
	};

	/**
	 * If two promises eventually fulfill to the same value, promises that value,
	 * but otherwise rejects.
	 * @param x {Any*}
	 * @param y {Any*}
	 * @returns {Any*} a promise for x and y if they are the same, but a rejection
	 * otherwise.
	 *
	 */
	Q.join = function (x, y) {
	    return Q(x).join(y);
	};

	Promise.prototype.join = function (that) {
	    return Q([this, that]).spread(function (x, y) {
	        if (x === y) {
	            // TODO: "===" should be Object.is or equiv
	            return x;
	        } else {
	            throw new Error("Can't join: not the same: " + x + " " + y);
	        }
	    });
	};

	/**
	 * Returns a promise for the first of an array of promises to become settled.
	 * @param answers {Array[Any*]} promises to race
	 * @returns {Any*} the first promise to be settled
	 */
	Q.race = race;
	function race(answerPs) {
	    return promise(function (resolve, reject) {
	        // Switch to this once we can assume at least ES5
	        // answerPs.forEach(function (answerP) {
	        //     Q(answerP).then(resolve, reject);
	        // });
	        // Use this in the meantime
	        for (var i = 0, len = answerPs.length; i < len; i++) {
	            Q(answerPs[i]).then(resolve, reject);
	        }
	    });
	}

	Promise.prototype.race = function () {
	    return this.then(Q.race);
	};

	/**
	 * Constructs a Promise with a promise descriptor object and optional fallback
	 * function.  The descriptor contains methods like when(rejected), get(name),
	 * set(name, value), post(name, args), and delete(name), which all
	 * return either a value, a promise for a value, or a rejection.  The fallback
	 * accepts the operation name, a resolver, and any further arguments that would
	 * have been forwarded to the appropriate method above had a method been
	 * provided with the proper name.  The API makes no guarantees about the nature
	 * of the returned object, apart from that it is usable whereever promises are
	 * bought and sold.
	 */
	Q.makePromise = Promise;
	function Promise(descriptor, fallback, inspect) {
	    if (fallback === void 0) {
	        fallback = function (op) {
	            return reject(new Error(
	                "Promise does not support operation: " + op
	            ));
	        };
	    }
	    if (inspect === void 0) {
	        inspect = function () {
	            return {state: "unknown"};
	        };
	    }

	    var promise = object_create(Promise.prototype);

	    promise.promiseDispatch = function (resolve, op, args) {
	        var result;
	        try {
	            if (descriptor[op]) {
	                result = descriptor[op].apply(promise, args);
	            } else {
	                result = fallback.call(promise, op, args);
	            }
	        } catch (exception) {
	            result = reject(exception);
	        }
	        if (resolve) {
	            resolve(result);
	        }
	    };

	    promise.inspect = inspect;

	    // XXX deprecated `valueOf` and `exception` support
	    if (inspect) {
	        var inspected = inspect();
	        if (inspected.state === "rejected") {
	            promise.exception = inspected.reason;
	        }

	        promise.valueOf = function () {
	            var inspected = inspect();
	            if (inspected.state === "pending" ||
	                inspected.state === "rejected") {
	                return promise;
	            }
	            return inspected.value;
	        };
	    }

	    return promise;
	}

	Promise.prototype.toString = function () {
	    return "[object Promise]";
	};

	Promise.prototype.then = function (fulfilled, rejected, progressed) {
	    var self = this;
	    var deferred = defer();
	    var done = false;   // ensure the untrusted promise makes at most a
	                        // single call to one of the callbacks

	    function _fulfilled(value) {
	        try {
	            return typeof fulfilled === "function" ? fulfilled(value) : value;
	        } catch (exception) {
	            return reject(exception);
	        }
	    }

	    function _rejected(exception) {
	        if (typeof rejected === "function") {
	            makeStackTraceLong(exception, self);
	            try {
	                return rejected(exception);
	            } catch (newException) {
	                return reject(newException);
	            }
	        }
	        return reject(exception);
	    }

	    function _progressed(value) {
	        return typeof progressed === "function" ? progressed(value) : value;
	    }

	    Q.nextTick(function () {
	        self.promiseDispatch(function (value) {
	            if (done) {
	                return;
	            }
	            done = true;

	            deferred.resolve(_fulfilled(value));
	        }, "when", [function (exception) {
	            if (done) {
	                return;
	            }
	            done = true;

	            deferred.resolve(_rejected(exception));
	        }]);
	    });

	    // Progress propagator need to be attached in the current tick.
	    self.promiseDispatch(void 0, "when", [void 0, function (value) {
	        var newValue;
	        var threw = false;
	        try {
	            newValue = _progressed(value);
	        } catch (e) {
	            threw = true;
	            if (Q.onerror) {
	                Q.onerror(e);
	            } else {
	                throw e;
	            }
	        }

	        if (!threw) {
	            deferred.notify(newValue);
	        }
	    }]);

	    return deferred.promise;
	};

	Q.tap = function (promise, callback) {
	    return Q(promise).tap(callback);
	};

	/**
	 * Works almost like "finally", but not called for rejections.
	 * Original resolution value is passed through callback unaffected.
	 * Callback may return a promise that will be awaited for.
	 * @param {Function} callback
	 * @returns {Q.Promise}
	 * @example
	 * doSomething()
	 *   .then(...)
	 *   .tap(console.log)
	 *   .then(...);
	 */
	Promise.prototype.tap = function (callback) {
	    callback = Q(callback);

	    return this.then(function (value) {
	        return callback.fcall(value).thenResolve(value);
	    });
	};

	/**
	 * Registers an observer on a promise.
	 *
	 * Guarantees:
	 *
	 * 1. that fulfilled and rejected will be called only once.
	 * 2. that either the fulfilled callback or the rejected callback will be
	 *    called, but not both.
	 * 3. that fulfilled and rejected will not be called in this turn.
	 *
	 * @param value      promise or immediate reference to observe
	 * @param fulfilled  function to be called with the fulfilled value
	 * @param rejected   function to be called with the rejection exception
	 * @param progressed function to be called on any progress notifications
	 * @return promise for the return value from the invoked callback
	 */
	Q.when = when;
	function when(value, fulfilled, rejected, progressed) {
	    return Q(value).then(fulfilled, rejected, progressed);
	}

	Promise.prototype.thenResolve = function (value) {
	    return this.then(function () { return value; });
	};

	Q.thenResolve = function (promise, value) {
	    return Q(promise).thenResolve(value);
	};

	Promise.prototype.thenReject = function (reason) {
	    return this.then(function () { throw reason; });
	};

	Q.thenReject = function (promise, reason) {
	    return Q(promise).thenReject(reason);
	};

	/**
	 * If an object is not a promise, it is as "near" as possible.
	 * If a promise is rejected, it is as "near" as possible too.
	 * If it’s a fulfilled promise, the fulfillment value is nearer.
	 * If it’s a deferred promise and the deferred has been resolved, the
	 * resolution is "nearer".
	 * @param object
	 * @returns most resolved (nearest) form of the object
	 */

	// XXX should we re-do this?
	Q.nearer = nearer;
	function nearer(value) {
	    if (isPromise(value)) {
	        var inspected = value.inspect();
	        if (inspected.state === "fulfilled") {
	            return inspected.value;
	        }
	    }
	    return value;
	}

	/**
	 * @returns whether the given object is a promise.
	 * Otherwise it is a fulfilled value.
	 */
	Q.isPromise = isPromise;
	function isPromise(object) {
	    return object instanceof Promise;
	}

	Q.isPromiseAlike = isPromiseAlike;
	function isPromiseAlike(object) {
	    return isObject(object) && typeof object.then === "function";
	}

	/**
	 * @returns whether the given object is a pending promise, meaning not
	 * fulfilled or rejected.
	 */
	Q.isPending = isPending;
	function isPending(object) {
	    return isPromise(object) && object.inspect().state === "pending";
	}

	Promise.prototype.isPending = function () {
	    return this.inspect().state === "pending";
	};

	/**
	 * @returns whether the given object is a value or fulfilled
	 * promise.
	 */
	Q.isFulfilled = isFulfilled;
	function isFulfilled(object) {
	    return !isPromise(object) || object.inspect().state === "fulfilled";
	}

	Promise.prototype.isFulfilled = function () {
	    return this.inspect().state === "fulfilled";
	};

	/**
	 * @returns whether the given object is a rejected promise.
	 */
	Q.isRejected = isRejected;
	function isRejected(object) {
	    return isPromise(object) && object.inspect().state === "rejected";
	}

	Promise.prototype.isRejected = function () {
	    return this.inspect().state === "rejected";
	};

	//// BEGIN UNHANDLED REJECTION TRACKING

	// This promise library consumes exceptions thrown in handlers so they can be
	// handled by a subsequent promise.  The exceptions get added to this array when
	// they are created, and removed when they are handled.  Note that in ES6 or
	// shimmed environments, this would naturally be a `Set`.
	var unhandledReasons = [];
	var unhandledRejections = [];
	var reportedUnhandledRejections = [];
	var trackUnhandledRejections = true;

	function resetUnhandledRejections() {
	    unhandledReasons.length = 0;
	    unhandledRejections.length = 0;

	    if (!trackUnhandledRejections) {
	        trackUnhandledRejections = true;
	    }
	}

	function trackRejection(promise, reason) {
	    if (!trackUnhandledRejections) {
	        return;
	    }
	    if (typeof process === "object" && typeof process.emit === "function") {
	        Q.nextTick.runAfter(function () {
	            if (array_indexOf(unhandledRejections, promise) !== -1) {
	                process.emit("unhandledRejection", reason, promise);
	                reportedUnhandledRejections.push(promise);
	            }
	        });
	    }

	    unhandledRejections.push(promise);
	    if (reason && typeof reason.stack !== "undefined") {
	        unhandledReasons.push(reason.stack);
	    } else {
	        unhandledReasons.push("(no stack) " + reason);
	    }
	}

	function untrackRejection(promise) {
	    if (!trackUnhandledRejections) {
	        return;
	    }

	    var at = array_indexOf(unhandledRejections, promise);
	    if (at !== -1) {
	        if (typeof process === "object" && typeof process.emit === "function") {
	            Q.nextTick.runAfter(function () {
	                var atReport = array_indexOf(reportedUnhandledRejections, promise);
	                if (atReport !== -1) {
	                    process.emit("rejectionHandled", unhandledReasons[at], promise);
	                    reportedUnhandledRejections.splice(atReport, 1);
	                }
	            });
	        }
	        unhandledRejections.splice(at, 1);
	        unhandledReasons.splice(at, 1);
	    }
	}

	Q.resetUnhandledRejections = resetUnhandledRejections;

	Q.getUnhandledReasons = function () {
	    // Make a copy so that consumers can't interfere with our internal state.
	    return unhandledReasons.slice();
	};

	Q.stopUnhandledRejectionTracking = function () {
	    resetUnhandledRejections();
	    trackUnhandledRejections = false;
	};

	resetUnhandledRejections();

	//// END UNHANDLED REJECTION TRACKING

	/**
	 * Constructs a rejected promise.
	 * @param reason value describing the failure
	 */
	Q.reject = reject;
	function reject(reason) {
	    var rejection = Promise({
	        "when": function (rejected) {
	            // note that the error has been handled
	            if (rejected) {
	                untrackRejection(this);
	            }
	            return rejected ? rejected(reason) : this;
	        }
	    }, function fallback() {
	        return this;
	    }, function inspect() {
	        return { state: "rejected", reason: reason };
	    });

	    // Note that the reason has not been handled.
	    trackRejection(rejection, reason);

	    return rejection;
	}

	/**
	 * Constructs a fulfilled promise for an immediate reference.
	 * @param value immediate reference
	 */
	Q.fulfill = fulfill;
	function fulfill(value) {
	    return Promise({
	        "when": function () {
	            return value;
	        },
	        "get": function (name) {
	            return value[name];
	        },
	        "set": function (name, rhs) {
	            value[name] = rhs;
	        },
	        "delete": function (name) {
	            delete value[name];
	        },
	        "post": function (name, args) {
	            // Mark Miller proposes that post with no name should apply a
	            // promised function.
	            if (name === null || name === void 0) {
	                return value.apply(void 0, args);
	            } else {
	                return value[name].apply(value, args);
	            }
	        },
	        "apply": function (thisp, args) {
	            return value.apply(thisp, args);
	        },
	        "keys": function () {
	            return object_keys(value);
	        }
	    }, void 0, function inspect() {
	        return { state: "fulfilled", value: value };
	    });
	}

	/**
	 * Converts thenables to Q promises.
	 * @param promise thenable promise
	 * @returns a Q promise
	 */
	function coerce(promise) {
	    var deferred = defer();
	    Q.nextTick(function () {
	        try {
	            promise.then(deferred.resolve, deferred.reject, deferred.notify);
	        } catch (exception) {
	            deferred.reject(exception);
	        }
	    });
	    return deferred.promise;
	}

	/**
	 * Annotates an object such that it will never be
	 * transferred away from this process over any promise
	 * communication channel.
	 * @param object
	 * @returns promise a wrapping of that object that
	 * additionally responds to the "isDef" message
	 * without a rejection.
	 */
	Q.master = master;
	function master(object) {
	    return Promise({
	        "isDef": function () {}
	    }, function fallback(op, args) {
	        return dispatch(object, op, args);
	    }, function () {
	        return Q(object).inspect();
	    });
	}

	/**
	 * Spreads the values of a promised array of arguments into the
	 * fulfillment callback.
	 * @param fulfilled callback that receives variadic arguments from the
	 * promised array
	 * @param rejected callback that receives the exception if the promise
	 * is rejected.
	 * @returns a promise for the return value or thrown exception of
	 * either callback.
	 */
	Q.spread = spread;
	function spread(value, fulfilled, rejected) {
	    return Q(value).spread(fulfilled, rejected);
	}

	Promise.prototype.spread = function (fulfilled, rejected) {
	    return this.all().then(function (array) {
	        return fulfilled.apply(void 0, array);
	    }, rejected);
	};

	/**
	 * The async function is a decorator for generator functions, turning
	 * them into asynchronous generators.  Although generators are only part
	 * of the newest ECMAScript 6 drafts, this code does not cause syntax
	 * errors in older engines.  This code should continue to work and will
	 * in fact improve over time as the language improves.
	 *
	 * ES6 generators are currently part of V8 version 3.19 with the
	 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
	 * for longer, but under an older Python-inspired form.  This function
	 * works on both kinds of generators.
	 *
	 * Decorates a generator function such that:
	 *  - it may yield promises
	 *  - execution will continue when that promise is fulfilled
	 *  - the value of the yield expression will be the fulfilled value
	 *  - it returns a promise for the return value (when the generator
	 *    stops iterating)
	 *  - the decorated function returns a promise for the return value
	 *    of the generator or the first rejected promise among those
	 *    yielded.
	 *  - if an error is thrown in the generator, it propagates through
	 *    every following yield until it is caught, or until it escapes
	 *    the generator function altogether, and is translated into a
	 *    rejection for the promise returned by the decorated generator.
	 */
	Q.async = async;
	function async(makeGenerator) {
	    return function () {
	        // when verb is "send", arg is a value
	        // when verb is "throw", arg is an exception
	        function continuer(verb, arg) {
	            var result;

	            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
	            // engine that has a deployed base of browsers that support generators.
	            // However, SM's generators use the Python-inspired semantics of
	            // outdated ES6 drafts.  We would like to support ES6, but we'd also
	            // like to make it possible to use generators in deployed browsers, so
	            // we also support Python-style generators.  At some point we can remove
	            // this block.

	            if (typeof StopIteration === "undefined") {
	                // ES6 Generators
	                try {
	                    result = generator[verb](arg);
	                } catch (exception) {
	                    return reject(exception);
	                }
	                if (result.done) {
	                    return Q(result.value);
	                } else {
	                    return when(result.value, callback, errback);
	                }
	            } else {
	                // SpiderMonkey Generators
	                // FIXME: Remove this case when SM does ES6 generators.
	                try {
	                    result = generator[verb](arg);
	                } catch (exception) {
	                    if (isStopIteration(exception)) {
	                        return Q(exception.value);
	                    } else {
	                        return reject(exception);
	                    }
	                }
	                return when(result, callback, errback);
	            }
	        }
	        var generator = makeGenerator.apply(this, arguments);
	        var callback = continuer.bind(continuer, "next");
	        var errback = continuer.bind(continuer, "throw");
	        return callback();
	    };
	}

	/**
	 * The spawn function is a small wrapper around async that immediately
	 * calls the generator and also ends the promise chain, so that any
	 * unhandled errors are thrown instead of forwarded to the error
	 * handler. This is useful because it's extremely common to run
	 * generators at the top-level to work with libraries.
	 */
	Q.spawn = spawn;
	function spawn(makeGenerator) {
	    Q.done(Q.async(makeGenerator)());
	}

	// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
	/**
	 * Throws a ReturnValue exception to stop an asynchronous generator.
	 *
	 * This interface is a stop-gap measure to support generator return
	 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
	 * generators like Chromium 29, just use "return" in your generator
	 * functions.
	 *
	 * @param value the return value for the surrounding generator
	 * @throws ReturnValue exception with the value.
	 * @example
	 * // ES6 style
	 * Q.async(function* () {
	 *      var foo = yield getFooPromise();
	 *      var bar = yield getBarPromise();
	 *      return foo + bar;
	 * })
	 * // Older SpiderMonkey style
	 * Q.async(function () {
	 *      var foo = yield getFooPromise();
	 *      var bar = yield getBarPromise();
	 *      Q.return(foo + bar);
	 * })
	 */
	Q["return"] = _return;
	function _return(value) {
	    throw new QReturnValue(value);
	}

	/**
	 * The promised function decorator ensures that any promise arguments
	 * are settled and passed as values (`this` is also settled and passed
	 * as a value).  It will also ensure that the result of a function is
	 * always a promise.
	 *
	 * @example
	 * var add = Q.promised(function (a, b) {
	 *     return a + b;
	 * });
	 * add(Q(a), Q(B));
	 *
	 * @param {function} callback The function to decorate
	 * @returns {function} a function that has been decorated.
	 */
	Q.promised = promised;
	function promised(callback) {
	    return function () {
	        return spread([this, all(arguments)], function (self, args) {
	            return callback.apply(self, args);
	        });
	    };
	}

	/**
	 * sends a message to a value in a future turn
	 * @param object* the recipient
	 * @param op the name of the message operation, e.g., "when",
	 * @param args further arguments to be forwarded to the operation
	 * @returns result {Promise} a promise for the result of the operation
	 */
	Q.dispatch = dispatch;
	function dispatch(object, op, args) {
	    return Q(object).dispatch(op, args);
	}

	Promise.prototype.dispatch = function (op, args) {
	    var self = this;
	    var deferred = defer();
	    Q.nextTick(function () {
	        self.promiseDispatch(deferred.resolve, op, args);
	    });
	    return deferred.promise;
	};

	/**
	 * Gets the value of a property in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of property to get
	 * @return promise for the property value
	 */
	Q.get = function (object, key) {
	    return Q(object).dispatch("get", [key]);
	};

	Promise.prototype.get = function (key) {
	    return this.dispatch("get", [key]);
	};

	/**
	 * Sets the value of a property in a future turn.
	 * @param object    promise or immediate reference for object object
	 * @param name      name of property to set
	 * @param value     new value of property
	 * @return promise for the return value
	 */
	Q.set = function (object, key, value) {
	    return Q(object).dispatch("set", [key, value]);
	};

	Promise.prototype.set = function (key, value) {
	    return this.dispatch("set", [key, value]);
	};

	/**
	 * Deletes a property in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of property to delete
	 * @return promise for the return value
	 */
	Q.del = // XXX legacy
	Q["delete"] = function (object, key) {
	    return Q(object).dispatch("delete", [key]);
	};

	Promise.prototype.del = // XXX legacy
	Promise.prototype["delete"] = function (key) {
	    return this.dispatch("delete", [key]);
	};

	/**
	 * Invokes a method in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of method to invoke
	 * @param value     a value to post, typically an array of
	 *                  invocation arguments for promises that
	 *                  are ultimately backed with `resolve` values,
	 *                  as opposed to those backed with URLs
	 *                  wherein the posted value can be any
	 *                  JSON serializable object.
	 * @return promise for the return value
	 */
	// bound locally because it is used by other methods
	Q.mapply = // XXX As proposed by "Redsandro"
	Q.post = function (object, name, args) {
	    return Q(object).dispatch("post", [name, args]);
	};

	Promise.prototype.mapply = // XXX As proposed by "Redsandro"
	Promise.prototype.post = function (name, args) {
	    return this.dispatch("post", [name, args]);
	};

	/**
	 * Invokes a method in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of method to invoke
	 * @param ...args   array of invocation arguments
	 * @return promise for the return value
	 */
	Q.send = // XXX Mark Miller's proposed parlance
	Q.mcall = // XXX As proposed by "Redsandro"
	Q.invoke = function (object, name /*...args*/) {
	    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
	};

	Promise.prototype.send = // XXX Mark Miller's proposed parlance
	Promise.prototype.mcall = // XXX As proposed by "Redsandro"
	Promise.prototype.invoke = function (name /*...args*/) {
	    return this.dispatch("post", [name, array_slice(arguments, 1)]);
	};

	/**
	 * Applies the promised function in a future turn.
	 * @param object    promise or immediate reference for target function
	 * @param args      array of application arguments
	 */
	Q.fapply = function (object, args) {
	    return Q(object).dispatch("apply", [void 0, args]);
	};

	Promise.prototype.fapply = function (args) {
	    return this.dispatch("apply", [void 0, args]);
	};

	/**
	 * Calls the promised function in a future turn.
	 * @param object    promise or immediate reference for target function
	 * @param ...args   array of application arguments
	 */
	Q["try"] =
	Q.fcall = function (object /* ...args*/) {
	    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
	};

	Promise.prototype.fcall = function (/*...args*/) {
	    return this.dispatch("apply", [void 0, array_slice(arguments)]);
	};

	/**
	 * Binds the promised function, transforming return values into a fulfilled
	 * promise and thrown errors into a rejected one.
	 * @param object    promise or immediate reference for target function
	 * @param ...args   array of application arguments
	 */
	Q.fbind = function (object /*...args*/) {
	    var promise = Q(object);
	    var args = array_slice(arguments, 1);
	    return function fbound() {
	        return promise.dispatch("apply", [
	            this,
	            args.concat(array_slice(arguments))
	        ]);
	    };
	};
	Promise.prototype.fbind = function (/*...args*/) {
	    var promise = this;
	    var args = array_slice(arguments);
	    return function fbound() {
	        return promise.dispatch("apply", [
	            this,
	            args.concat(array_slice(arguments))
	        ]);
	    };
	};

	/**
	 * Requests the names of the owned properties of a promised
	 * object in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @return promise for the keys of the eventually settled object
	 */
	Q.keys = function (object) {
	    return Q(object).dispatch("keys", []);
	};

	Promise.prototype.keys = function () {
	    return this.dispatch("keys", []);
	};

	/**
	 * Turns an array of promises into a promise for an array.  If any of
	 * the promises gets rejected, the whole array is rejected immediately.
	 * @param {Array*} an array (or promise for an array) of values (or
	 * promises for values)
	 * @returns a promise for an array of the corresponding values
	 */
	// By Mark Miller
	// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
	Q.all = all;
	function all(promises) {
	    return when(promises, function (promises) {
	        var pendingCount = 0;
	        var deferred = defer();
	        array_reduce(promises, function (undefined, promise, index) {
	            var snapshot;
	            if (
	                isPromise(promise) &&
	                (snapshot = promise.inspect()).state === "fulfilled"
	            ) {
	                promises[index] = snapshot.value;
	            } else {
	                ++pendingCount;
	                when(
	                    promise,
	                    function (value) {
	                        promises[index] = value;
	                        if (--pendingCount === 0) {
	                            deferred.resolve(promises);
	                        }
	                    },
	                    deferred.reject,
	                    function (progress) {
	                        deferred.notify({ index: index, value: progress });
	                    }
	                );
	            }
	        }, void 0);
	        if (pendingCount === 0) {
	            deferred.resolve(promises);
	        }
	        return deferred.promise;
	    });
	}

	Promise.prototype.all = function () {
	    return all(this);
	};

	/**
	 * Returns the first resolved promise of an array. Prior rejected promises are
	 * ignored.  Rejects only if all promises are rejected.
	 * @param {Array*} an array containing values or promises for values
	 * @returns a promise fulfilled with the value of the first resolved promise,
	 * or a rejected promise if all promises are rejected.
	 */
	Q.any = any;

	function any(promises) {
	    if (promises.length === 0) {
	        return Q.resolve();
	    }

	    var deferred = Q.defer();
	    var pendingCount = 0;
	    array_reduce(promises, function (prev, current, index) {
	        var promise = promises[index];

	        pendingCount++;

	        when(promise, onFulfilled, onRejected, onProgress);
	        function onFulfilled(result) {
	            deferred.resolve(result);
	        }
	        function onRejected() {
	            pendingCount--;
	            if (pendingCount === 0) {
	                deferred.reject(new Error(
	                    "Can't get fulfillment value from any promise, all " +
	                    "promises were rejected."
	                ));
	            }
	        }
	        function onProgress(progress) {
	            deferred.notify({
	                index: index,
	                value: progress
	            });
	        }
	    }, undefined);

	    return deferred.promise;
	}

	Promise.prototype.any = function () {
	    return any(this);
	};

	/**
	 * Waits for all promises to be settled, either fulfilled or
	 * rejected.  This is distinct from `all` since that would stop
	 * waiting at the first rejection.  The promise returned by
	 * `allResolved` will never be rejected.
	 * @param promises a promise for an array (or an array) of promises
	 * (or values)
	 * @return a promise for an array of promises
	 */
	Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
	function allResolved(promises) {
	    return when(promises, function (promises) {
	        promises = array_map(promises, Q);
	        return when(all(array_map(promises, function (promise) {
	            return when(promise, noop, noop);
	        })), function () {
	            return promises;
	        });
	    });
	}

	Promise.prototype.allResolved = function () {
	    return allResolved(this);
	};

	/**
	 * @see Promise#allSettled
	 */
	Q.allSettled = allSettled;
	function allSettled(promises) {
	    return Q(promises).allSettled();
	}

	/**
	 * Turns an array of promises into a promise for an array of their states (as
	 * returned by `inspect`) when they have all settled.
	 * @param {Array[Any*]} values an array (or promise for an array) of values (or
	 * promises for values)
	 * @returns {Array[State]} an array of states for the respective values.
	 */
	Promise.prototype.allSettled = function () {
	    return this.then(function (promises) {
	        return all(array_map(promises, function (promise) {
	            promise = Q(promise);
	            function regardless() {
	                return promise.inspect();
	            }
	            return promise.then(regardless, regardless);
	        }));
	    });
	};

	/**
	 * Captures the failure of a promise, giving an oportunity to recover
	 * with a callback.  If the given promise is fulfilled, the returned
	 * promise is fulfilled.
	 * @param {Any*} promise for something
	 * @param {Function} callback to fulfill the returned promise if the
	 * given promise is rejected
	 * @returns a promise for the return value of the callback
	 */
	Q.fail = // XXX legacy
	Q["catch"] = function (object, rejected) {
	    return Q(object).then(void 0, rejected);
	};

	Promise.prototype.fail = // XXX legacy
	Promise.prototype["catch"] = function (rejected) {
	    return this.then(void 0, rejected);
	};

	/**
	 * Attaches a listener that can respond to progress notifications from a
	 * promise's originating deferred. This listener receives the exact arguments
	 * passed to ``deferred.notify``.
	 * @param {Any*} promise for something
	 * @param {Function} callback to receive any progress notifications
	 * @returns the given promise, unchanged
	 */
	Q.progress = progress;
	function progress(object, progressed) {
	    return Q(object).then(void 0, void 0, progressed);
	}

	Promise.prototype.progress = function (progressed) {
	    return this.then(void 0, void 0, progressed);
	};

	/**
	 * Provides an opportunity to observe the settling of a promise,
	 * regardless of whether the promise is fulfilled or rejected.  Forwards
	 * the resolution to the returned promise when the callback is done.
	 * The callback can return a promise to defer completion.
	 * @param {Any*} promise
	 * @param {Function} callback to observe the resolution of the given
	 * promise, takes no arguments.
	 * @returns a promise for the resolution of the given promise when
	 * ``fin`` is done.
	 */
	Q.fin = // XXX legacy
	Q["finally"] = function (object, callback) {
	    return Q(object)["finally"](callback);
	};

	Promise.prototype.fin = // XXX legacy
	Promise.prototype["finally"] = function (callback) {
	    callback = Q(callback);
	    return this.then(function (value) {
	        return callback.fcall().then(function () {
	            return value;
	        });
	    }, function (reason) {
	        // TODO attempt to recycle the rejection with "this".
	        return callback.fcall().then(function () {
	            throw reason;
	        });
	    });
	};

	/**
	 * Terminates a chain of promises, forcing rejections to be
	 * thrown as exceptions.
	 * @param {Any*} promise at the end of a chain of promises
	 * @returns nothing
	 */
	Q.done = function (object, fulfilled, rejected, progress) {
	    return Q(object).done(fulfilled, rejected, progress);
	};

	Promise.prototype.done = function (fulfilled, rejected, progress) {
	    var onUnhandledError = function (error) {
	        // forward to a future turn so that ``when``
	        // does not catch it and turn it into a rejection.
	        Q.nextTick(function () {
	            makeStackTraceLong(error, promise);
	            if (Q.onerror) {
	                Q.onerror(error);
	            } else {
	                throw error;
	            }
	        });
	    };

	    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
	    var promise = fulfilled || rejected || progress ?
	        this.then(fulfilled, rejected, progress) :
	        this;

	    if (typeof process === "object" && process && process.domain) {
	        onUnhandledError = process.domain.bind(onUnhandledError);
	    }

	    promise.then(void 0, onUnhandledError);
	};

	/**
	 * Causes a promise to be rejected if it does not get fulfilled before
	 * some milliseconds time out.
	 * @param {Any*} promise
	 * @param {Number} milliseconds timeout
	 * @param {Any*} custom error message or Error object (optional)
	 * @returns a promise for the resolution of the given promise if it is
	 * fulfilled before the timeout, otherwise rejected.
	 */
	Q.timeout = function (object, ms, error) {
	    return Q(object).timeout(ms, error);
	};

	Promise.prototype.timeout = function (ms, error) {
	    var deferred = defer();
	    var timeoutId = setTimeout(function () {
	        if (!error || "string" === typeof error) {
	            error = new Error(error || "Timed out after " + ms + " ms");
	            error.code = "ETIMEDOUT";
	        }
	        deferred.reject(error);
	    }, ms);

	    this.then(function (value) {
	        clearTimeout(timeoutId);
	        deferred.resolve(value);
	    }, function (exception) {
	        clearTimeout(timeoutId);
	        deferred.reject(exception);
	    }, deferred.notify);

	    return deferred.promise;
	};

	/**
	 * Returns a promise for the given value (or promised value), some
	 * milliseconds after it resolved. Passes rejections immediately.
	 * @param {Any*} promise
	 * @param {Number} milliseconds
	 * @returns a promise for the resolution of the given promise after milliseconds
	 * time has elapsed since the resolution of the given promise.
	 * If the given promise rejects, that is passed immediately.
	 */
	Q.delay = function (object, timeout) {
	    if (timeout === void 0) {
	        timeout = object;
	        object = void 0;
	    }
	    return Q(object).delay(timeout);
	};

	Promise.prototype.delay = function (timeout) {
	    return this.then(function (value) {
	        var deferred = defer();
	        setTimeout(function () {
	            deferred.resolve(value);
	        }, timeout);
	        return deferred.promise;
	    });
	};

	/**
	 * Passes a continuation to a Node function, which is called with the given
	 * arguments provided as an array, and returns a promise.
	 *
	 *      Q.nfapply(FS.readFile, [__filename])
	 *      .then(function (content) {
	 *      })
	 *
	 */
	Q.nfapply = function (callback, args) {
	    return Q(callback).nfapply(args);
	};

	Promise.prototype.nfapply = function (args) {
	    var deferred = defer();
	    var nodeArgs = array_slice(args);
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.fapply(nodeArgs).fail(deferred.reject);
	    return deferred.promise;
	};

	/**
	 * Passes a continuation to a Node function, which is called with the given
	 * arguments provided individually, and returns a promise.
	 * @example
	 * Q.nfcall(FS.readFile, __filename)
	 * .then(function (content) {
	 * })
	 *
	 */
	Q.nfcall = function (callback /*...args*/) {
	    var args = array_slice(arguments, 1);
	    return Q(callback).nfapply(args);
	};

	Promise.prototype.nfcall = function (/*...args*/) {
	    var nodeArgs = array_slice(arguments);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.fapply(nodeArgs).fail(deferred.reject);
	    return deferred.promise;
	};

	/**
	 * Wraps a NodeJS continuation passing function and returns an equivalent
	 * version that returns a promise.
	 * @example
	 * Q.nfbind(FS.readFile, __filename)("utf-8")
	 * .then(console.log)
	 * .done()
	 */
	Q.nfbind =
	Q.denodeify = function (callback /*...args*/) {
	    var baseArgs = array_slice(arguments, 1);
	    return function () {
	        var nodeArgs = baseArgs.concat(array_slice(arguments));
	        var deferred = defer();
	        nodeArgs.push(deferred.makeNodeResolver());
	        Q(callback).fapply(nodeArgs).fail(deferred.reject);
	        return deferred.promise;
	    };
	};

	Promise.prototype.nfbind =
	Promise.prototype.denodeify = function (/*...args*/) {
	    var args = array_slice(arguments);
	    args.unshift(this);
	    return Q.denodeify.apply(void 0, args);
	};

	Q.nbind = function (callback, thisp /*...args*/) {
	    var baseArgs = array_slice(arguments, 2);
	    return function () {
	        var nodeArgs = baseArgs.concat(array_slice(arguments));
	        var deferred = defer();
	        nodeArgs.push(deferred.makeNodeResolver());
	        function bound() {
	            return callback.apply(thisp, arguments);
	        }
	        Q(bound).fapply(nodeArgs).fail(deferred.reject);
	        return deferred.promise;
	    };
	};

	Promise.prototype.nbind = function (/*thisp, ...args*/) {
	    var args = array_slice(arguments, 0);
	    args.unshift(this);
	    return Q.nbind.apply(void 0, args);
	};

	/**
	 * Calls a method of a Node-style object that accepts a Node-style
	 * callback with a given array of arguments, plus a provided callback.
	 * @param object an object that has the named method
	 * @param {String} name name of the method of object
	 * @param {Array} args arguments to pass to the method; the callback
	 * will be provided by Q and appended to these arguments.
	 * @returns a promise for the value or error
	 */
	Q.nmapply = // XXX As proposed by "Redsandro"
	Q.npost = function (object, name, args) {
	    return Q(object).npost(name, args);
	};

	Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
	Promise.prototype.npost = function (name, args) {
	    var nodeArgs = array_slice(args || []);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	    return deferred.promise;
	};

	/**
	 * Calls a method of a Node-style object that accepts a Node-style
	 * callback, forwarding the given variadic arguments, plus a provided
	 * callback argument.
	 * @param object an object that has the named method
	 * @param {String} name name of the method of object
	 * @param ...args arguments to pass to the method; the callback will
	 * be provided by Q and appended to these arguments.
	 * @returns a promise for the value or error
	 */
	Q.nsend = // XXX Based on Mark Miller's proposed "send"
	Q.nmcall = // XXX Based on "Redsandro's" proposal
	Q.ninvoke = function (object, name /*...args*/) {
	    var nodeArgs = array_slice(arguments, 2);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	    return deferred.promise;
	};

	Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
	Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
	Promise.prototype.ninvoke = function (name /*...args*/) {
	    var nodeArgs = array_slice(arguments, 1);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	    return deferred.promise;
	};

	/**
	 * If a function would like to support both Node continuation-passing-style and
	 * promise-returning-style, it can end its internal promise chain with
	 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
	 * elects to use a nodeback, the result will be sent there.  If they do not
	 * pass a nodeback, they will receive the result promise.
	 * @param object a result (or a promise for a result)
	 * @param {Function} nodeback a Node.js-style callback
	 * @returns either the promise or nothing
	 */
	Q.nodeify = nodeify;
	function nodeify(object, nodeback) {
	    return Q(object).nodeify(nodeback);
	}

	Promise.prototype.nodeify = function (nodeback) {
	    if (nodeback) {
	        this.then(function (value) {
	            Q.nextTick(function () {
	                nodeback(null, value);
	            });
	        }, function (error) {
	            Q.nextTick(function () {
	                nodeback(error);
	            });
	        });
	    } else {
	        return this;
	    }
	};

	Q.noConflict = function() {
	    throw new Error("Q.noConflict only works when Q is used as a global");
	};

	// All code before this point will be filtered from stack traces.
	var qEndingLine = captureLine();

	return Q;

	});


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	var Q = __webpack_require__(8);
	var respoke = __webpack_require__(1);
	var log = respoke.log;

	/**
	 * `respoke.Client` is the top-level interface to the API. Interacting with Respoke should be done using
	 * a `respoke.Client` instance.
	 *
	 * There are two ways to get a client:
	 *
	 *      var client = respoke.createClient(clientParams);
	 *      // . . . set stuff up, then . . .
	 *      client.connect(connectParams);
	 *
	 * or
	 *
	 *      // creates client and connects to Respoke all at once
	 *      var client = respoke.connect(allParams);
	 *
	 * A client does the following things:
	 *
	 * 1. authentication with the Respoke API
	 * 1. receives server-side app-specific information
	 * 1. tracks connections and presence
	 * 1. provides methods to get and interact with tracked entities (like groups and endpoints)
	 * 1. stores default settings for calls and direct connections
	 * 1. automatically reconnects to the API when network activity is lost*
	 *
	 * *If `developmentMode` is set to true. If not using `developmentMode`, disable automatic
	 * reconnect by sending `reconnect: false` and listening to the Client's disconnect event
	 * to fetch a new brokered auth token, then call `client.connect()` with the new token.
	 *
	 * @class respoke.Client
	 * @constructor
	 * @augments respoke.EventEmitter
	 * @param {object} params
	 * @param {string} [params.appId] - The ID of your Respoke app. This must be passed either to
	 * respoke.connect, respoke.createClient, or to client.connect.
	 * @param {string} [params.token] - The endpoint's authentication token.
	 * @param {string} [params.endpointId] - An identifier to use when creating an authentication token for this
	 * endpoint. This is only used when `developmentMode` is set to `true`.
	 * @param {boolean} [params.developmentMode=false] - Indication to obtain an authentication token from the service.
	 * Note: Your app must be in developer mode to use this feature. This is not intended as a long-term mode of
	 * operation and will limit the services you will be able to use.
	 * @param {string|number|object|Array} [params.presence=unavailable] The initial presence to set once connected.
	 * @param {boolean} [params.reconnect=true] - Whether or not to automatically reconnect to the Respoke service
	 * when a disconnect occurs.
	 * @proprety {number} [connectTimeoutMillis=10000] - Number of milliseconds before considering the connect operation timed out.
	 * @param {respoke.Client.onJoin} [params.onJoin] - Callback for when this client's endpoint joins a group.
	 * @param {respoke.Client.onLeave} [params.onLeave] - Callback for when this client's endpoint leaves a group.
	 * @param {respoke.Client.onClientMessage} [params.onMessage] - Callback for when any message is received
	 * from anywhere on the system.
	 * @param {respoke.Client.onConnect} [params.onConnect] - Callback for Client connect.
	 * @param {respoke.Client.onDisconnect} [params.onDisconnect] - Callback for Client disconnect.
	 * @param {respoke.Client.onReconnect} [params.onReconnect] - Callback for Client reconnect.
	 * @param {respoke.Client.onCall} [params.onCall] - Callback for when this client's user receives a call.
	 * @param {respoke.Client.onDirectConnection} [params.onDirectConnection] - Callback for when this client's user
	 * receives a request for a direct connection.
	 * @returns {respoke.Client}
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    /**
	     * @memberof! respoke.Client
	     * @name instanceId
	     * @private
	     * @type {string}
	     */
	    var instanceId = params.instanceId || respoke.makeGUID();
	    params.instanceId = instanceId;
	    var that = respoke.EventEmitter(params);
	    respoke.instances[instanceId] = that;
	    delete that.instanceId;
	    that.connectTries = 0;
	    /**
	     * A name to identify this class
	     * @memberof! respoke.Client
	     * @name className
	     * @type {string}
	     */
	    that.className = 'respoke.Client';
	    /**
	     * @memberof! respoke.Client
	     * @name host
	     * @type {string}
	     * @private
	     */
	    var host = window.location.hostname;
	    /**
	     * @memberof! respoke.Client
	     * @name port
	     * @type {number}
	     * @private
	     */
	    var port = window.location.port;

	    /**
	     * A container for baseURL, token, and appId so they won't be accidentally viewable in any JavaScript debugger.
	     * @memberof! respoke.Client
	     * @name clientSettings
	     * @type {object}
	     * @private
	     * @property {string} [baseURL] - the URL of the cloud infrastructure's REST API.
	     * @property {string} [token] - The endpoint's authentication token.
	     * @property {string} [appId] - The id of your Respoke app.
	     * @property {string} [endpointId] - An identifier to use when creating an authentication token for this
	     * endpoint. This is only used when `developmentMode` is set to `true`.
	     * @property {boolean} [developmentMode=false] - Indication to obtain an authentication token from the service.
	     * Note: Your app must be in developer mode to use this feature. This is not intended as a long-term mode of
	     * operation and will limit the services you will be able to use.
	     * @property {boolean} [reconnect=false] - Whether or not to automatically reconnect to the Respoke service
	     * when a disconnect occurs.
	     * @proprety {number} [connectTimeoutMillis=10000] - Number of milliseconds before considering the connect
	     * timed out.
	     * @param {respoke.Client.onJoin} [params.onJoin] - Callback for when this client's endpoint joins a group.
	     * @param {respoke.Client.onLeave} [params.onLeave] - Callback for when this client's endpoint leaves a group.
	     * @property {respoke.Client.onClientMessage} [onMessage] - Callback for when any message is received
	     * from anywhere on the system.
	     * @property {respoke.Client.onConnect} [onConnect] - Callback for Client connect.
	     * @property {respoke.Client.onDisconnect} [onDisconnect] - Callback for Client disconnect.
	     * @property {respoke.Client.onReconnect} [onReconnect] - Callback for Client reconnect. Not Implemented.
	     * @property {respoke.Client.onCall} [onCall] - Callback for when this client receives a call.
	     * @property {respoke.Client.onDirectConnection} [onDirectConnection] - Callback for when this client
	     * receives a request for a direct connection.
	     * @property {boolean} enableCallDebugReport=true - Upon finishing a call, should the client send debugging
	     * information to the API? Defaults to `true`.
	     */
	    var clientSettings = that.clientSettings = {};

	    delete that.appId;
	    delete that.baseURL;
	    delete that.developmentMode;
	    delete that.token;
	    delete that.resolveEndpointPresence;

	    /**
	     * Internal list of known groups.
	     * @memberof! respoke.Client
	     * @name groups
	     * @type {Array<respoke.Group>}
	     * @private
	     */
	    var groups = [];
	    /**
	     * Internal list of known endpoints.
	     * @memberof! respoke.Client
	     * @name endpoints
	     * @type {Array<respoke.Endpoint>}
	     * @private
	     */
	    var endpoints = [];
	    /**
	     * Array of calls in progress, made accessible for informational purposes only.
	     * **Never modify this array directly.**
	     *
	     * @memberof! respoke.Client
	     * @name calls
	     * @type {array}
	     */
	    that.calls = [];
	    log.debug("Client ID is ", instanceId);

	    /**
	     * @memberof! respoke.Client
	     * @name signalingChannel
	     * @type {respoke.SignalingChannel}
	     * @private
	     */
	    that.signalingChannel = respoke.SignalingChannel({
	        instanceId: instanceId,
	        clientSettings: clientSettings
	    });

	    /**
	     * Represents the presence status. Typically a string, but other types are supported.
	     * Defaults to `'unavailable'`.
	     *
	     * **Do not modify this directly** - it won't update presence with Respoke. Use `setPresence()`.
	     *
	     * @memberof! respoke.Client
	     * @name presence
	     * @type {string|number|object|Array}
	     */
	    that.presence = params.presence || 'unavailable';

	    /**
	     * Deprecated: use endpoint.presence instead.
	     *
	     * Return the presence.
	     * @memberof! respoke.Client
	     * @deprecated
	     * @name presence
	     * @type {string|number|object|Array}
	     */
	    that.getPresence = function () {
	        return that.presence;
	    };

	    /**
	     * Save parameters of the constructor or client.connect() onto the clientSettings object
	     * @memberof! respoke.Client
	     * @method respoke.saveParameters
	     * @param {object} params
	     * @param {respoke.Client.connectSuccessHandler} [params.onSuccess] - Success handler for this invocation
	     * of this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @param {string} [params.appId] - The ID of your Respoke app. This must be passed either to
	     * respoke.connect, respoke.createClient, or to client.connect.
	     * @param {string} [params.token] - The endpoint's authentication token.
	     * @param {string} [params.endpointId] - An identifier to use when creating an authentication token for this
	     * endpoint. This is only used when `developmentMode` is set to `true`.
	     * @param {string|number|object|Array} [params.presence] The initial presence to set once connected.
	     * @param {respoke.client.resolveEndpointPresence} [params.resolveEndpointPresence] An optional function for
	     * resolving presence for an endpoint.  An endpoint can have multiple Connections this function will be used
	     * to decide which Connection's presence gets precedence for the Endpoint.
	     * @param {boolean} [params.developmentMode=false] - Indication to obtain an authentication token from the service.
	     * Note: Your app must be in developer mode to use this feature. This is not intended as a long-term mode of
	     * operation and will limit the services you will be able to use.
	     * @param {boolean} [params.reconnect=true] - Whether or not to automatically reconnect to the Respoke service
	     * when a disconnect occurs.
	     * @proprety {number} [paramsconnectTimeoutMillis=10000] - Number of milliseconds before considering the connect
	     * timed out.
	     * @param {respoke.Client.onJoin} [params.onJoin] - Callback for when this client's endpoint joins a group.
	     * @param {respoke.Client.onLeave} [params.onLeave] - Callback for when this client's endpoint leaves
	     * a group.
	     * @param {respoke.Client.onClientMessage} [params.onMessage] - Callback for when any message is
	     * received from anywhere on the system.
	     * @param {respoke.Client.onConnect} [params.onConnect] - Callback for Client connect.
	     * @param {respoke.Client.onDisconnect} [params.onDisconnect] - Callback for Client disconnect.
	     * @param {respoke.Client.onReconnect} [params.onReconnect] - Callback for Client reconnect. Not Implemented.
	     * @param {respoke.Client.onCall} [params.onCall] - Callback for when this client receives a call.
	     * @param {respoke.Client.onDirectConnection} [params.onDirectConnection] - Callback for when this
	     * client receives a request for a direct connection.
	     * @private
	     */
	    function saveParameters(params) {
	        Object.keys(params).forEach(function eachParam(key) {
	            if (['onSuccess', 'onError', 'reconnect', 'presence'].indexOf(key) === -1 && params[key] !== undefined) {
	                clientSettings[key] = params[key];
	            }
	        });

	        clientSettings.developmentMode = !!clientSettings.developmentMode;
	        clientSettings.enableCallDebugReport = typeof clientSettings.enableCallDebugReport === 'boolean' ?
	            clientSettings.enableCallDebugReport : true;

	        if (typeof clientSettings.connectTimeoutMillis !== 'number') {
	            clientSettings.connectTimeoutMillis = 10000;
	        }

	        if (typeof params.reconnect !== 'boolean') {
	            clientSettings.reconnect = typeof clientSettings.developmentMode === 'boolean' ?
	                clientSettings.developmentMode : false;
	        } else {
	            clientSettings.reconnect = !!params.reconnect;
	        }
	    }
	    saveParameters(params);

	    /**
	     * Connect to the Respoke infrastructure and authenticate using `params.token`.
	     *
	     * After `connect`, the app auth session token is stored so it can be used in API requests.
	     *
	     * This method attaches quite a few event listeners for things like group joining and connection status changes.
	     *
	     * #### Usage
	     *
	     *      client.connect({
	     *          appId: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXX",
	     *          token: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXX", // if not developmentMode
	     *          developmentMode: false || true,
	     *          // if developmentMode, otherwise your server will set endpointId
	     *          endpointId: "daveops"
	     *      });
	     *      client.listen("connect", function () { } );
	     *
	     *
	     * If no `params.token` is given and `developmentMode` is set to true, it will attempt to obtain a token
	     * automatically. You must set an `endpointId`.
	     *
	     *
	     * #### App auth session token expiration
	     *
	     * If `params.reconnect` is set to true (which it is by default for `developmentMode`), the `client`
	     * will attempt to keep reconnecting each time the app auth session expires.
	     *
	     * If not using `developmentMode`, automatic reconnect will be disabled. You will need to
	     * listen to the Client's `disconnect` event to fetch a new brokered auth token and call
	     * `client.connect()` with the new token.
	     *
	     *      client.listen('disconnect', function () {
	     *
	     *          // example method you implemented to get a new token from your server
	     *          myServer.getNewRespokeAccessToken(function (newToken) {
	     *              // reconnect with respoke.Client
	     *              client.connect({ token: newToken });
	     *          });
	     *
	     *      });
	     *
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.connect
	     * @param {object} params
	     * @param {respoke.Client.connectSuccessHandler} [params.onSuccess] - Success handler for this invocation
	     * of this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @param {string} [params.appId] - The ID of your Respoke app. This must be passed either to
	     * respoke.connect, respoke.createClient, or to client.connect.
	     * @param {string} [params.token] - The endpoint's authentication token.
	     * @param {string} [params.endpointId] - An identifier to use when creating an authentication token for this
	     * endpoint. This is only used when `developmentMode` is set to `true`.
	     * @param {string|number|object|Array} [params.presence] The initial presence to set once connected.
	     * @param {respoke.client.resolveEndpointPresence} [params.resolveEndpointPresence] An optional function for
	     * resolving presence for an endpoint.  An endpoint can have multiple Connections this function will be used
	     * to decide which Connection's presence gets precedence for the Endpoint.
	     * @param {boolean} [params.developmentMode=false] - Indication to obtain an authentication token from the service.
	     * Note: Your app must be in developer mode to use this feature. This is not intended as a long-term mode of
	     * operation and will limit the services you will be able to use.
	     * @param {boolean} [params.reconnect=true] - Whether or not to automatically reconnect to the Respoke service
	     * when a disconnect occurs.
	     * @proprety {number} [connectTimeoutMillis=10000] - Number of milliseconds before considering the connect
	     * timed out.
	     * @param {respoke.Client.onJoin} [params.onJoin] - Callback for when this client's endpoint joins a group.
	     * @param {respoke.Client.onLeave} [params.onLeave] - Callback for when this client's endpoint leaves
	     * a group.
	     * @param {respoke.Client.onClientMessage} [params.onMessage] - Callback for when any message is
	     * received from anywhere on the system.
	     * @param {respoke.Client.onConnect} [params.onConnect] - Callback for Client connect.
	     * @param {respoke.Client.onDisconnect} [params.onDisconnect] - Callback for Client disconnect.
	     * @param {respoke.Client.onReconnect} [params.onReconnect] - Callback for Client reconnect. Not Implemented.
	     * @param {respoke.Client.onCall} [params.onCall] - Callback for when this client receives a call.
	     * @param {respoke.Client.onDirectConnection} [params.onDirectConnection] - Callback for when this
	     * client receives a request for a direct connection.
	     * @returns {Promise|undefined}
	     * @fires respoke.Client#connect
	     */
	    that.connect = function (params) {
	        var promise;
	        var retVal;
	        params = params || {};
	        log.debug('Client.connect');
	        that.connectTries += 1;

	        saveParameters(params);
	        that.presence = params.presence || that.presence;
	        that.endpointId = clientSettings.endpointId;
	        promise = actuallyConnect(params);
	        retVal = respoke.handlePromise(promise, params.onSuccess, params.onError);
	        promise.then(function successHandler() {
	            /**
	             * This event is fired the first time the library connects to the cloud infrastructure.
	             * @event respoke.Client#connect
	             * @type {respoke.Event}
	             * @property {string} name - the event name.
	             * @property {respoke.Client} target
	             */
	            that.fire('connect');
	        });
	        return retVal;
	    };

	    /**
	     * This function contains the meat of the connection, the portions which can be repeated again on reconnect.
	     *
	     * When `reconnect` is true, this function will be added in an event listener to the Client#disconnect event.
	     *
	     * **Using callbacks** by passing `params.onSuccess` or `params.onError` will disable promises.
	     * @memberof! respoke.Client
	     * @method respoke.Client.actuallyConnect
	     * @private
	     * @param {object} params
	     * @param {connectSuccessHandler} [params.onSuccess] - Success handler for this invocation of this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @returns {Promise|undefined}
	     */
	    function actuallyConnect(params) {
	        params = params || {};
	        var deferred = Q.defer();

	        if (!clientSettings.token &&
	                (!clientSettings.appId || !clientSettings.endpointId || clientSettings.developmentMode !== true)) {
	            deferred.reject(new Error("Must pass either endpointID & appId & developmentMode=true, or a token, " +
	                "to client.connect()."));
	            return deferred.promise;
	        }

	        that.signalingChannel.open({
	            actuallyConnect: actuallyConnect,
	            endpointId: that.endpointId,
	            token: clientSettings.token
	        }).then(function successHandler() {
	            return that.signalingChannel.authenticate();
	        }).done(function successHandler() {
	            // set initial presence for the connection
	            if (that.presence) {
	                that.setPresence({presence: that.presence});
	            }

	            /*
	             * These rely on the EventEmitter checking for duplicate event listeners in order for these
	             * not to be duplicated on reconnect.
	             */

	            /**
	             * This event provides notification for when an incoming call is being received.  If the user wishes
	             * to allow the call, `evt.call.answer()`.
	             * @event respoke.Client#call
	             * @type {respoke.Event}
	             * @property {respoke.Call} call
	             * @property {respoke.Endpoint} endpoint
	             * @property {string} name - The event name.
	             * @property {respoke.Client} target
	             */
	            that.listen('call', clientSettings.onCall);
	            /**
	             * This event is fired when the local end of the directConnection is available. It still will not be
	             * ready to send and receive messages until the 'open' event fires.
	             * @event respoke.Client#direct-connection
	             * @type {respoke.Event}
	             * @property {respoke.DirectConnection} directConnection
	             * @property {respoke.Endpoint} endpoint
	             * @property {string} name - the event name.
	             * @property {respoke.Call} target
	             */
	            that.listen('direct-connection', clientSettings.onDirectConnection);
	            that.listen('join', clientSettings.onJoin);
	            /**
	             * This event is fired every time the client leaves a group.
	             * @event respoke.Client#leave
	             * @type {respoke.Event}
	             * @property {respoke.Group} group
	             * @property {string} name - the event name.
	             */
	            that.listen('leave', clientSettings.onLeave);
	            /**
	             * A generic message handler when a message was received by the client.
	             *
	             * @event respoke.Client#message
	             * @type {respoke.Event}
	             * @property {string} name - The event name.
	             * @property {respoke.Endpoint} endpoint - If the message was private, this is the Endpoint who sent it.
	             * @property {respoke.Group} group - If the message was to a group, this is the group.
	             * @property {respoke.TextMessage} message - The generic message object.
	             * @property {string} message.connectionId
	             * @property {string} message.endpointId
	             * @property {string} message.message - Message body text.
	             * @property {respoke.Client} target
	             */
	            that.listen('message', clientSettings.onMessage);
	            that.listen('connect', clientSettings.onConnect);
	            /**
	             * Client has disconnected from Respoke.
	             *
	             * @event respoke.Client#disconnect
	             * @type {respoke.Event}
	             * @property {string} name - The event name.
	             * @property {respoke.Client} target
	             */
	            that.listen('disconnect', clientSettings.onDisconnect);
	            that.listen('disconnect', function () {
	                that.calls.forEach(function (call) {
	                    call.hangup({signal: false});
	                });
	            }, true);
	            /**
	             * Client has reconnected to Respoke.
	             *
	             * @event respoke.Client#reconnect
	             * @type {respoke.Event}
	             * @property {string} name - The event name.
	             * @property {respoke.Client} target
	             */
	            that.listen('reconnect', clientSettings.onReconnect);

	            log.info('logged in as ' + that.endpointId, that);
	            deferred.resolve();
	        }, function errorHandler(err) {
	            deferred.reject(err);
	            if (err.message && err.message.match(/Connection limit exceeded/)) {
	                log.error(
	                    'You have reached the connection limit on the account associated with this appId. ' +
	                    'Please upgrade your account from the developer portal at https://portal.respoke.io ' +
	                    'if you need more concurrent connections.', err);
	            } else {
	                log.error(err.message, err.stack);
	            }
	        });

	        return deferred.promise;
	    }

	    /**
	     * Disconnect from the Respoke infrastructure, leave all groups, invalidate the token, and disconnect the websocket.
	     * **Using callbacks** by passing `params.onSuccess` or `params.onError` will disable promises.
	     * @memberof! respoke.Client
	     * @method respoke.Client.disconnect
	     * @returns {Promise|undefined}
	     * @param {object} params
	     * @param {disconnectSuccessHandler} [params.onSuccess] - Success handler for this invocation of this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @fires respoke.Client#disconnect
	     */
	    that.disconnect = function (params) {
	        // TODO: also call this on socket disconnect
	        params = params || {};
	        var deferred = Q.defer();
	        var retVal = respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);

	        try {
	            that.verifyConnected();
	        } catch (e) {
	            deferred.reject(e);
	            return retVal;
	        }

	        var leaveGroups = groups.map(function eachGroup(group) {
	            if (group.isJoined()) {
	                return group.leave();
	            }
	        });

	        Q.all(leaveGroups).fin(function successHandler() {
	            return that.signalingChannel.close();
	        }).fin(function finallyHandler() {
	            that.presence = 'unavailable';
	            endpoints = [];
	            groups = [];
	            /**
	             * This event is fired when the library has disconnected from the cloud infrastructure.
	             * @event respoke.Client#disconnect
	             * @property {string} name - the event name.
	             * @property {respoke.Client} target
	             */
	            that.fire('disconnect');
	            deferred.resolve();
	        }).done();

	        return retVal;
	    };

	    /**
	     * Set the presence for this client.
	     *
	     * The value of presence can be a string, number, object, or array - in any format -
	     * depending on the needs of your application. The only requirement is that
	     * `JSON.stringify()` must work (no circular references).
	     *
	     *      var myPresence = 'At lunch'
	     *                      || 4
	     *                      || { status: 'Away', message: 'At lunch' }
	     *                      || ['Away', 'At lunch'];
	     *
	     *      client.setPresence({
	     *          presence: myPresence,
	     *          onSuccess: function (evt) {
	     *              // successfully updated my presence
	     *          }
	     *      });
	     *
	     * **Using callbacks** by passing `params.onSuccess` or `params.onError` will disable promises.
	     *
	     * ### Resolving presence
	     *
	     * When not using a custom endpoint presence resolver
	     * (see `respoke.createClient({ resolveEndpointPresence: <Function> })`)
	     * these are the supported presence values. Values not below will be put at the end of the
	     * list when resolving an endpoint's presence across the presence of its connections.
	     *
	     * ```
	     * ['chat', 'available', 'away', 'dnd', 'xa', 'unavailable']
	     * ```
	     *
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.setPresence
	     * @param {object} params
	     * @param {string|number|object|array} params.presence
	     * @param {respoke.Client.successHandler} [params.onSuccess] - Success handler for this invocation of
	     * this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @return {Promise|undefined}
	     */
	    that.setPresence = function (params) {
	        var promise;
	        var retVal;
	        params = params || {};
	        params.presence = params.presence || 'available';

	        try {
	            that.verifyConnected();
	        } catch (e) {
	            promise = Q.reject(e);
	            return respoke.handlePromise(promise, params.onSuccess, params.onError);
	        }

	        log.info('sending my presence update ' + params.presence);

	        promise = that.signalingChannel.sendPresence({
	            presence: params.presence
	        }).then(function successHandler(p) {
	            that.presence = params.presence;

	            /**
	             * This event indicates that the presence for this endpoint has been updated.
	             * @event respoke.Client#presence
	             * @type {respoke.Event}
	             * @property {string|number|object|Array} presence
	             * @property {string} name - the event name.
	             * @property {respoke.Client} target
	             */
	            that.fire('presence', {
	                presence: that.presence
	            });
	        });
	        retVal = respoke.handlePromise(promise, params.onSuccess, params.onError);
	        return retVal;
	    };

	    /**
	     * Get the Call with the endpoint specified.
	     *
	     *     // hang up on chad
	     *     var call = client.getCall({
	     *         endpointId: 'chad'
	     *     });
	     *
	     *     if (call) {
	     *         call.hangup()
	     *     }
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.getCall
	     * @param {object} params
	     * @param {string} [params.id] - Call ID.
	     * @param {string} [params.endpointId] - Endpoint ID. Warning: If you pass only the endpointId, this method
	     * will just return the first call that matches. If you are placing multiple calls to the same endpoint,
	     * pass in the call ID, too.
	     * @arg {boolean} [params.create] - whether or not to create a new call if the specified endpointId isn't found
	     * @arg {string} [params.fromType] - fromType from the signal, tells us if this is a SIP or DID call.
	     * @arg {string} [params.target] - target from the signal, tells us if this is a screenshare or conference call.
	     * @arg {*} [params.metadata] - Metadata to be attached to the call if created, accessible by the callee.
	     * @returns {respoke.Call}
	     */
	    that.getCall = function (params) {
	        var call = null;
	        var methods = {
	            screenshare: "startScreenShare",
	            did: "startPhoneCall",
	            web: "startCall",
	            sip: "startSIPCall",
	            conference: "joinConference"
	        };
	        var callParams = {};
	        params.fromType = params.type || "web";
	        var switchType = params.type;

	        that.calls.every(function findCall(one) {
	            if (params.id && one.id === params.id) {
	                call = one;
	                return false;
	            }

	            if (!params.id && params.endpointId && one.remoteEndpoint.id === params.endpointId) {
	                call = one;
	                return false;
	            }
	            return true;
	        });

	        if (call || params.create !== true) {
	            return call;
	        }

	        callParams.id = params.id;
	        callParams.caller = false;
	        callParams.fromType = "web";
	        callParams.callerId = params.callerId;
	        callParams.target = params.target;
	        callParams.metadata = params.metadata;

	        if (params.target === "conference") {
	            callParams.id = params.conferenceId;
	            switchType = params.target;
	        } else if (params.target === "screenshare") {
	            switchType = params.target;
	        }

	        switch (switchType) {
	            case "screenshare":
	            case "web":
	                callParams.toType = "web"; // overwrite "screenshare"
	                callParams.endpointId = params.endpointId;
	                break;
	            case "did":
	                callParams.number = params.endpointId;
	                callParams.toType = "did";
	                break;
	            case "sip":
	                callParams.uri = params.endpointId;
	                callParams.toType = "sip";
	                break;
	        }

	        try {
	            call = that[methods[params.type]](callParams);
	        } catch (e) {
	            log.error("Couldn't create Call.", e.message, e.stack);
	        }
	        return call;
	    };

	    /**
	     * Add the call to internal record-keeping.
	     * @memberof! respoke.Client
	     * @method respoke.Client.addCall
	     * @param {object} evt
	     * @param {respoke.Call} evt.call
	     * @private
	     */
	    function addCall(evt) {
	        log.debug('addCall');
	        if (!evt.call) {
	            throw new Error("Can't add call without a call parameter.");
	        }
	        if (that.calls.indexOf(evt.call) === -1) {
	            that.calls.push(evt.call);
	        }

	        evt.call.listen('hangup', function () {
	            removeCall({ call: evt.call });
	        }, true);
	    }

	    /**
	     * Remove the call or direct connection from internal record-keeping.
	     * @memberof! respoke.Client
	     * @method respoke.Client.removeCall
	     * @param {object} evt
	     * @param {respoke.Call} evt.call
	     * @private
	     */
	    function removeCall(evt) {
	        var match = 0;
	        if (!evt.call) {
	            throw new Error("Can't remove call without a call parameter.");
	        }

	        // Loop backward since we're modifying the array in place.
	        for (var i = that.calls.length - 1; i >= 0; i -= 1) {
	            if (that.calls[i].id === evt.call.id) {
	                that.calls.splice(i, 1);
	                match += 1;
	            }
	        }

	        if (match !== 1) {
	            log.warn("Something went wrong.", match, "calls were removed!");
	        }
	    }

	    /**
	     * Convenience method for setting presence to `"available"`.
	     *
	     * **Using callbacks** by passing `params.onSuccess` or `params.onError` will disable promises.
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.setOnline
	     * @param {object} params
	     * @param {string|number|object|Array} [params.presence=available] - The presence to set.
	     * @param {respoke.Client.successHandler} [params.onSuccess] - Success handler for this invocation of
	     * this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @returns {Promise|undefined}
	     */
	    that.setOnline = function (params) {
	        var promise;

	        params = params || {};
	        params.presence = params.presence || 'available';

	        try {
	            that.verifyConnected();
	        } catch (e) {
	            promise = Q.reject(e);
	            return respoke.handlePromise(promise, params.onSuccess, params.onError);
	        }

	        return that.setPresence(params);
	    };

	    /**
	     * Convenience method for setting presence to `"unavailable"`.
	     *
	     * **Using callbacks** by passing `params.onSuccess` or `params.onError` will disable promises.
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.setOffline
	     * @param {object} params
	     * @param {string|number|object|Array} [params.presence=unavailable] - The presence to set.
	     * @param {respoke.Client.successHandler} [params.onSuccess] - Success handler for this invocation of
	     * this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @returns {Promise|undefined}
	     */
	    that.setOffline = function (params) {
	        var promise;

	        params = params || {};
	        params.presence = params.presence || 'unavailable';

	        try {
	            that.verifyConnected();
	        } catch (e) {
	            promise = Q.reject(e);
	            return respoke.handlePromise(promise, params.onSuccess, params.onError);
	        }

	        return that.setPresence(params);
	    };

	    /**
	     * Send a message to an endpoint.
	     *
	     *     client.sendMessage({
	     *         endpointId: 'dan',
	     *         message: "Jolly good."
	     *     });
	     *
	     *
	     * **Using callbacks** by passing `params.onSuccess` or `params.onError` will disable promises.
	     * @memberof! respoke.Client
	     * @method respoke.Client.sendMessage
	     * @param {object} params
	     * @param {string} params.endpointId - The endpoint id of the recipient.
	     * @param {string} [params.connectionId] - The optional connection id of the receipient. If not set, message will be
	     * broadcast to all connections for this endpoint.
	     * @param {string} params.message - a string message.
	     * @param {sendHandler} [params.onSuccess] - Success handler for this invocation of this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @returns {Promise|undefined}
	     */
	    that.sendMessage = function (params) {
	        var promise;
	        var retVal;
	        var endpoint;
	        try {
	            that.verifyConnected();
	        } catch (e) {
	            promise = Q.reject(e);
	            retVal = respoke.handlePromise(promise, params.onSuccess, params.onError);
	            return retVal;
	        }
	        endpoint = that.getEndpoint({
	            skipPresence: true,
	            id: params.endpointId
	        });
	        delete params.endpointId;
	        return endpoint.sendMessage(params);
	    };

	    /**
	     * Experimental. Create a new conference call with the specified id.
	     *
	     *     client.joinConference({
	     *         id: "javascript-meetup",
	     *         onConnect: function (evt) {}
	     *     });
	     *
	     * @memberof respoke.Client
	     * @method respoke.Client.joinConference
	     * @private
	     * @param {object} params
	     * @param {string} params.id - The id that should be used to create the conference call or the ID
	     * of the call to join.
	     * @param {string|boolean} params.audio - Whether participant should send and receive audio. Boolean `true`
	     * indicates send and receive. Boolean `false` indicates neither send nor receive. Strings `send` and `receive`
	     * indicate send only and receive only respectively.
	     * @param {string|boolean} params.video - Whether participant should send and receive audio. Boolean `true`
	     * indicates send and receive. Boolean `false` indicates neither send nor receive. Strings `send` and `receive`
	     * indicate send only and receive only respectively.
	     * @param {boolean} params.mixAudio - Whether Respoke should mix all the audio streams together to save bandwidth
	     * for this one participant.
	     * @param {Array<RTCConstraints>} [params.constraints]
	     * @arg {respoke.Conference.onJoin} [params.onJoin] - Callback for when a participant joins the conference.
	     * @arg {respoke.Conference.onLeave} [params.onLeave] - Callback for when a participant leaves the conference.
	     * @arg {respoke.Conference.onMessage} [params.onMessage] - Callback for when a message is sent to the conference.
	     * @param {respoke.Conference.onMute} [params.onMute] - Callback for when local or remote media is muted or unmuted.
	     * @arg {respoke.Conference.onTopic} [params.onTopic] - Callback for the conference topic changes.
	     * @arg {respoke.Conference.onPresenter} [params.onPresenter] - Callback for when the presenter changes.
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for when the screenshare is connected
	     * and the remote party has received the video.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been
	     * hung up.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {*} [params.metadata] - Metadata to be attached to the conference call, accessible by the callee.
	     * @returns {respoke.Conference}
	     */
	    that.joinConference = function (params) {
	        var conference;
	        var recipient;

	        that.verifyConnected();

	        params = params || {};
	        params.open = !!params.open;

	        if (!params.id) {
	            params.id = respoke.makeGUID();
	        }

	        recipient = {id: params.id};

	        if (params.open) {
	            params.key = undefined;
	        } else if (!params.key) {
	            params.key = respoke.makeGUID();
	        }

	        params.instanceId = instanceId;
	        params.target = "conference";
	        params.constraints = respoke.convertConstraints(params.constraints, [{
	            video: false,
	            audio: true,
	            mandatory: {},
	            optional: []
	        }]);

	        params.signalOffer = function (signalParams) {
	            var onSuccess = signalParams.onSuccess;
	            var onError = signalParams.onError;
	            delete signalParams.onSuccess;
	            delete signalParams.onError;

	            signalParams.signalType = 'offer';
	            signalParams.target = params.target;
	            signalParams.id = params.id;
	            signalParams.key = params.key;
	            signalParams.open = params.open;
	            signalParams.recipient = recipient;
	            signalParams.toType = "conference";
	            signalParams.metadata = params.metadata;

	            that.signalingChannel.sendSDP(signalParams).done(onSuccess, onError);
	        };
	        params.signalAnswer = function (signalParams) {
	            var onSuccess = signalParams.onSuccess;
	            var onError = signalParams.onError;
	            delete signalParams.onSuccess;
	            delete signalParams.onError;

	            signalParams.signalType = 'answer';
	            signalParams.target = params.target;
	            signalParams.recipient = recipient;
	            signalParams.sessionId = signalParams.call.sessionId;
	            signalParams.toType = "conference";
	            that.signalingChannel.sendSDP(signalParams).then(onSuccess, onError).done(null, function errorHandler(err) {
	                signalParams.call.hangup({signal: false});
	            });
	        };
	        params.signalConnected = function (signalParams) {
	            signalParams.target = params.target;
	            signalParams.connectionId = signalParams.call.connectionId;
	            signalParams.sessionId = signalParams.call.sessionId;
	            signalParams.recipient = recipient;
	            signalParams.toType = "conference";
	            that.signalingChannel.sendConnected(signalParams).done(null, function errorHandler(err) {
	                signalParams.call.hangup();
	            });
	        };
	        params.signalModify = function (signalParams) {
	            signalParams.target = params.target;
	            signalParams.recipient = recipient;
	            signalParams.sessionId = signalParams.call.sessionId;
	            signalParams.toType = "conference";
	            that.signalingChannel.sendModify(signalParams).done();
	        };
	        params.signalCandidate = function (signalParams) {
	            signalParams.target = params.target;
	            signalParams.recipient = recipient;
	            signalParams.sessionId = signalParams.call.sessionId;
	            signalParams.toType = "conference";
	            return that.signalingChannel.sendCandidate(signalParams);
	        };
	        params.signalHangup = function (signalParams) {
	            signalParams.target = params.target;
	            signalParams.recipient = recipient;
	            signalParams.sessionId = signalParams.call.sessionId;
	            signalParams.toType = "conference";
	            that.signalingChannel.sendHangup(signalParams).done();
	        };
	        params.signalReport = function (signalParams) {
	            log.debug("Sending debug report", signalParams.report);
	            that.signalingChannel.sendReport(signalParams).done();
	        };

	        params.signalingChannel = that.signalingChannel;
	        conference = respoke.Conference(params);
	        addCall({ call: conference.call });
	        return conference;
	    };

	    /**
	     * Create a new screen sharing call. Screenshares are inherently unidirectional video only. This may change
	     * in the future when Chrome adds the ability to obtain screen video and microphone audio at the same time. For
	     * now, if you also need audio, place a second audio only call.
	     *
	     * The endpoint who calls `client.startScreenShare` will be the one whose screen is shared. If you'd like to
	     * implement this as a screenshare request in which the endpoint who starts the call is the watcher and
	     * not the sharer, it is recommened that you use `endpoint.sendMessage` to send a control message to the user
	     * whose screenshare is being requested so that user's app can call `client.startScreenShare`.
	     *
	     * NOTE: At this time, screen sharing only works with Chrome, and Chrome requires a Chrome extension to
	     * access screen sharing features. Please see instructions at https://github.com/respoke/respoke-chrome-extension.
	     * Support for additional browsers will be added in the future.
	     *
	     *     client.startScreenShare({
	     *         endpointId: 'tian',
	     *         onConnect: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.startScreenShare
	     * @param {object} params
	     * @param {string} params.endpointId - The id of the endpoint that should be called.
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for when the screenshare is connected
	     * and the remote party has received the video.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been
	     * hung up.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRemoteMedia} [params.onRemoteMedia] - Callback called every time a remote
	     * stream is added to the call. Corresponds to 'remote-stream-received' event.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {string} [params.connectionId] - The connection ID of the remoteEndpoint, if it is not desired to call
	     * all connections belonging to this endpoint.
	     * @param {string} [params.source] - Pass in what type of mediaSource you want. If omitted, you'll have access
	     * to both the screen and windows. In firefox, you'll have access to the screen only.
	     * @param {*} [params.metadata] - Metadata to be attached to the screenShare, accessible by the callee.
	     * @returns {respoke.Call}
	     */
	    that.startScreenShare = function (params) {
	        that.verifyConnected();
	        var endpoint = that.getEndpoint({
	            skipPresence: true,
	            id: params.endpointId
	        });
	        delete params.endpointId;
	        return endpoint.startScreenShare(params);
	    };

	    /**
	     * Place an audio and/or video call to an endpoint.
	     *
	     *     // defaults to video when no constraints are supplied
	     *     client.startCall({
	     *         endpointId: 'erin',
	     *         onConnect: function (evt) { },
	     *         onLocalMedia: function (evt) { }
	     *     });
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.startCall
	     * @param {object} params
	     * @param {string} params.endpointId - The id of the endpoint that should be called.
	     * @param {Array<RTCConstraints>} [params.constraints]
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video element
	     * with the local audio and/or video attached.
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for receiving an HTML5 Video element
	     * with the remote audio and/or video attached.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been hung
	     * up.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRemoteMedia} [params.onRemoteMedia] - Callback called every time a remote
	     * stream is added to the call. Corresponds to 'remote-stream-received' event.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {boolean} [params.receiveOnly] - whether or not we accept media
	     * @param {boolean} [params.sendOnly] - whether or not we send media
	     * @param {boolean} [params.needDirectConnection] - flag to enable skipping media & opening direct connection.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	     * wants to perform an action between local media becoming available and calling approve().
	     * @param {string} [params.connectionId] - The connection ID of the remoteEndpoint, if it is not desired to call
	     * all connections belonging to this endpoint.
	     * @param {HTMLVideoElement} [params.videoLocalElement] - Pass in an optional html video element to have
	     * local video attached to it.
	     * @param {HTMLVideoElement} [params.videoRemoteElement] - Pass in an optional html video element to have
	     * remote video attached to it.
	     * @param {*} [params.metadata] - Metadata to be attached to the call, accessible by the callee.
	     * @return {respoke.Call}
	     */
	    that.startCall = function (params) {
	        that.verifyConnected();
	        var endpoint = that.getEndpoint({
	            skipPresence: true,
	            id: params.endpointId
	        });
	        delete params.endpointId;
	        return endpoint.startCall(params);
	    };

	    /**
	     * Place an audio only call to an endpoint.
	     *
	     *     client.startAudioCall({
	     *         endpointId: 'erin',
	     *         onConnect: function (evt) { },
	     *         onLocalMedia: function (evt) { }
	     *     });
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.startAudioCall
	     * @param {object} params
	     * @param {string} params.endpointId - The id of the endpoint that should be called.
	     * @param {string} [params.connectionId]
	     * @param {Array<RTCConstraints>} [params.constraints]
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 element
	     * with the local audio and/or video attached.
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for receiving an HTML5 element
	     * with the remote audio and/or video attached.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been hung
	     * up.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRemoteMedia} [params.onRemoteMedia] - Callback called every time a remote
	     * stream is added to the call. Corresponds to 'remote-stream-received' event.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {boolean} [params.receiveOnly] - whether or not we accept media
	     * @param {boolean} [params.sendOnly] - whether or not we send media
	     * @param {boolean} [params.needDirectConnection] - flag to enable skipping media & opening direct connection.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	     * wants to perform an action between local media becoming available and calling approve().
	     * @param {string} [params.connectionId] - The connection ID of the remoteEndpoint, if it is not desired to call
	     * all connections belonging to this endpoint.
	     * @param {HTMLVideoElement} [params.videoLocalElement] - Pass in an optional html video element to have local
	     * video attached to it.
	     * @param {HTMLVideoElement} [params.videoRemoteElement] - Pass in an optional html video element to have remote
	     * video attached to it.
	     * @param {*} [params.metadata] - Metadata to be attached to the audio call, accessible by the callee.
	     * @return {respoke.Call}
	     */
	    that.startAudioCall = function (params) {
	        that.verifyConnected();
	        var endpoint = that.getEndpoint({
	            skipPresence: true,
	            id: params.endpointId
	        });
	        delete params.endpointId;
	        return endpoint.startAudioCall(params);
	    };

	    /**
	     * Place a video call to an endpoint.
	     *
	     *     client.startVideoCall({
	     *         endpointId: 'erin',
	     *         onConnect: function (evt) { },
	     *         onLocalMedia: function (evt) { }
	     *     });
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.startVideoCall
	     * @param {object} params
	     * @param {string} params.endpointId - The id of the endpoint that should be called.
	     * @param {Array<RTCConstraints>} [params.constraints]
	     * @param {string} [params.connectionId]
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video element
	     * with the local audio and/or video attached.
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for receiving an HTML5 Video element
	     * with the remote audio and/or video attached.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been hung
	     * up.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRemoteMedia} [params.onRemoteMedia] - Callback called every time a remote
	     * stream is added to the call. Corresponds to 'remote-stream-received' event.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {boolean} [params.receiveOnly] - whether or not we accept media
	     * @param {boolean} [params.sendOnly] - whether or not we send media
	     * @param {boolean} [params.needDirectConnection] - flag to enable skipping media & opening direct connection.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	     * wants to perform an action between local media becoming available and calling approve().
	     * @param {string} [params.connectionId] - The connection ID of the remoteEndpoint, if it is not desired to call
	     * all connections belonging to this endpoint.
	     * @param {HTMLVideoElement} [params.videoLocalElement] - Pass in an optional html video element to have local
	     * video attached to it.
	     * @param {HTMLVideoElement} [params.videoRemoteElement] - Pass in an optional html video element to have remote
	     * video attached to it.
	     * @param {*} [params.metadata] - Metadata to be attached to the video call, accessible by the callee.
	     * @return {respoke.Call}
	     */
	    that.startVideoCall = function (params) {
	        that.verifyConnected();
	        var endpoint = that.getEndpoint({
	            skipPresence: true,
	            id: params.endpointId
	        });
	        delete params.endpointId;
	        return endpoint.startVideoCall(params);
	    };

	    /**
	     * Place an audio call with a phone number.
	     * @memberof! respoke.Client
	     * @method respoke.Client.startPhoneCall
	     * @param {object} params
	     * @param {string} params.number - The phone number that should be called.
	     * @param {string} params.callerId - The phone number to use as the caller ID for this phone call. This must
	     * be a phone number listed in your Respoke account, associated with your app, and allowed by the role
	     * that this client is authenticated with. If the role contains a list of numbers and the token does not contain
	     * callerId, this field must be used to set caller ID selected from the list of numbers or no caller ID will be set.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video element
	     * with the local audio and/or video attached.
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for receiving an HTML5 Video element
	     * with the remote audio and/or video attached.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been hung
	     * up.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRemoteMedia} [params.onRemoteMedia] - Callback called every time a remote
	     * stream is added to the call. Corresponds to 'remote-stream-received' event.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {boolean} [params.receiveOnly] - whether or not we accept media
	     * @param {boolean} [params.sendOnly] - whether or not we send media
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {*} [params.metadata] - Metadata to be attached to the phone call, accessible by the callee.
	     * @return {respoke.Call}
	     */
	    that.startPhoneCall = function (params) {
	        var call;
	        var recipient = {};
	        params = params || {};
	        params.constraints = [{
	            video: false,
	            audio: true,
	            mandatory: {},
	            optional: []
	        }];

	        that.verifyConnected();

	        if (!params.number) {
	            throw new Error("Can't start a phone call without a number.");
	        }

	        if (typeof params.caller !== 'boolean') {
	            params.caller = true;
	        }

	        recipient.id = params.number;

	        params.instanceId = instanceId;
	        params.remoteEndpoint = recipient;

	        params.toType = params.toType || 'did';
	        params.fromType = params.fromType || 'web';

	        params.signalOffer = function (signalParams) {
	            var onSuccess = signalParams.onSuccess;
	            var onError = signalParams.onError;
	            delete signalParams.onSuccess;
	            delete signalParams.onError;

	            signalParams.signalType = 'offer';
	            signalParams.target = 'call';
	            signalParams.recipient = recipient;
	            signalParams.toType = params.toType;
	            signalParams.fromType = params.fromType;
	            signalParams.metadata = params.metadata;

	            // using hasOwnProperty here because callerId could be explicitly set to null or empty string
	            if (params.hasOwnProperty('callerId')) {
	                signalParams.callerId = {number: params.callerId};
	            }
	            that.signalingChannel.sendSDP(signalParams).done(onSuccess, onError);
	        };
	        params.signalAnswer = function (signalParams) {
	            var onSuccess = signalParams.onSuccess;
	            var onError = signalParams.onError;
	            delete signalParams.onSuccess;
	            delete signalParams.onError;

	            signalParams.signalType = 'answer';
	            signalParams.target = 'call';
	            signalParams.recipient = recipient;
	            signalParams.toType = params.toType;
	            signalParams.fromType = params.fromType;
	            that.signalingChannel.sendSDP(signalParams).then(onSuccess, onError).done(null, function errorHandler(err) {
	                log.error("Couldn't answer the call.", err.message, err.stack);
	                signalParams.call.hangup({signal: false});
	            });
	        };
	        params.signalConnected = function (signalParams) {
	            signalParams.target = 'call';
	            signalParams.recipient = recipient;
	            signalParams.toType = params.toType;
	            signalParams.fromType = params.fromType;
	            that.signalingChannel.sendConnected(signalParams).done(null, function errorHandler(err) {
	                log.error("Couldn't send connected.", err.message, err.stack);
	                signalParams.call.hangup();
	            });
	        };
	        params.signalModify = function (signalParams) {
	            signalParams.target = 'call';
	            signalParams.recipient = recipient;
	            signalParams.toType = params.toType;
	            signalParams.fromType = params.fromType;
	            that.signalingChannel.sendModify(signalParams).done(null, function errorHandler(err) {
	                log.error("Couldn't send modify.", err.message, err.stack);
	            });
	        };
	        params.signalCandidate = function (signalParams) {
	            signalParams.target = 'call';
	            signalParams.recipient = recipient;
	            signalParams.toType = params.toType;
	            signalParams.fromType = params.fromType;
	            return that.signalingChannel.sendCandidate(signalParams);
	        };
	        params.signalHangup = function (signalParams) {
	            signalParams.target = 'call';
	            signalParams.recipient = recipient;
	            signalParams.toType = params.toType;
	            signalParams.fromType = params.fromType;
	            that.signalingChannel.sendHangup(signalParams).done(null, function errorHandler(err) {
	                log.error("Couldn't send hangup.", err.message, err.stack);
	            });
	        };
	        params.signalReport = function (signalParams) {
	            log.debug("Sending debug report", signalParams.report);
	            that.signalingChannel.sendReport(signalParams);
	        };

	        params.signalingChannel = that.signalingChannel;
	        call = respoke.Call(params);
	        addCall({ call: call });
	        return call;
	    };

	    /**
	     * Place an audio call to a SIP URI.
	     * @memberof! respoke.Client
	     * @method respoke.Client.startSIPCall
	     * @param {object} params
	     * @param {string} [params.uri] - The fully qualified SIP URI to call.
	     * @param {string} [params.trunk] - The SIP trunk to call. This is not necessary if `uri` is set. If `uri` is not
	     * set, both `trunk` and `user` are required, and `trunk` must be the ID of a Respoke SIP trunk. `user` is a
	     * SIP username or extension.
	     * @param {string} [params.user] - The SIP user to call. This is not necessary if `uri` is set. If `uri` is not
	     * set, both `trunk` and `user` are required, and `trunk` must be the ID of a Respoke SIP trunk. `user` is a
	     * SIP username or extension.
	     * @param {object} [params.callerId] - Caller ID information for this call.
	     * @param {string} [params.callerId.name] - Caller ID name.
	     * @param {string} [params.callerId.number] - Caller ID number, extension, or SIP username.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video element
	     * with the local audio and/or video attached.
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for receiving an HTML5 Video element
	     * with the remote audio and/or video attached.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been hung
	     * up.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRemoteMedia} [params.onRemoteMedia] - Callback called every time a remote
	     * stream is added to the call. Corresponds to 'remote-stream-received' event.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {boolean} [params.receiveOnly] - whether or not we accept media
	     * @param {boolean} [params.sendOnly] - whether or not we send media
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {*} [params.metadata] - Metadata to be attached to the SIP call, accessible by the callee.
	     * @return {respoke.Call}
	     */
	    that.startSIPCall = function (params) {
	        var call;
	        var recipient = {};
	        params = params || {};
	        params.constraints = [{
	            video: false,
	            audio: true,
	            mandatory: {},
	            optional: []
	        }];

	        that.verifyConnected();

	        if (!params.uri && !(params.trunk && params.user)) {
	            throw new Error("Can't start a phone call without a SIP URI or a SIP trunk and user.");
	        }

	        if (typeof params.caller !== 'boolean') {
	            params.caller = true;
	        }

	        params.uri = params.uri || (params.trunk + "/" + params.user);
	        recipient.id = params.uri;

	        params.instanceId = instanceId;
	        params.remoteEndpoint = recipient;

	        params.toType = params.toType || 'sip';
	        params.fromType = params.fromType || 'web';

	        params.signalOffer = function (signalParams) {
	            var onSuccess = signalParams.onSuccess;
	            var onError = signalParams.onError;
	            delete signalParams.onSuccess;
	            delete signalParams.onError;

	            signalParams.signalType = 'offer';
	            signalParams.target = 'call';
	            signalParams.recipient = recipient;
	            signalParams.toType = params.toType;
	            signalParams.fromType = params.fromType;
	            signalParams.metadata = params.metadata;

	            // using hasOwnProperty here because callerId could be explicitly set to null or empty string
	            if (params.hasOwnProperty('callerId')) {
	                signalParams.callerId = params.callerId;
	            }
	            that.signalingChannel.sendSDP(signalParams).done(onSuccess, onError);
	        };
	        params.signalAnswer = function (signalParams) {
	            var onSuccess = signalParams.onSuccess;
	            var onError = signalParams.onError;
	            delete signalParams.onSuccess;
	            delete signalParams.onError;

	            signalParams.signalType = 'answer';
	            signalParams.target = 'call';
	            signalParams.recipient = recipient;
	            signalParams.toType = params.toType;
	            signalParams.fromType = params.fromType;
	            that.signalingChannel.sendSDP(signalParams).then(onSuccess, onError).done(null, function errorHandler(err) {
	                log.error("Couldn't answer the call.", err.message, err.stack);
	                signalParams.call.hangup({signal: false});
	            });
	        };
	        params.signalConnected = function (signalParams) {
	            signalParams.target = 'call';
	            signalParams.recipient = recipient;
	            signalParams.toType = params.toType;
	            signalParams.fromType = params.fromType;
	            that.signalingChannel.sendConnected(signalParams).done(null, function errorHandler(err) {
	                log.error("Couldn't send connected.", err.message, err.stack);
	                signalParams.call.hangup();
	            });
	        };
	        params.signalModify = function (signalParams) {
	            signalParams.target = 'call';
	            signalParams.recipient = recipient;
	            signalParams.toType = params.toType;
	            signalParams.fromType = params.fromType;
	            that.signalingChannel.sendModify(signalParams).done(null, function errorHandler(err) {
	                log.error("Couldn't send modify.", err.message, err.stack);
	            });
	        };
	        params.signalCandidate = function (signalParams) {
	            signalParams.target = 'call';
	            signalParams.recipient = recipient;
	            signalParams.toType = params.toType;
	            signalParams.fromType = params.fromType;
	            return that.signalingChannel.sendCandidate(signalParams);
	        };
	        params.signalHangup = function (signalParams) {
	            signalParams.target = 'call';
	            signalParams.recipient = recipient;
	            signalParams.toType = params.toType;
	            signalParams.fromType = params.fromType;
	            that.signalingChannel.sendHangup(signalParams).done(null, function errorHandler(err) {
	                log.error("Couldn't send hangup.", err.message, err.stack);
	            });
	        };
	        params.signalReport = function (signalParams) {
	            log.debug("Sending debug report", signalParams.report);
	            that.signalingChannel.sendReport(signalParams);
	        };

	        params.signalingChannel = that.signalingChannel;
	        call = respoke.Call(params);
	        addCall({ call: call });
	        return call;
	    };

	    /**
	     * Assert that we are connected to the backend infrastructure.
	     * @memberof! respoke.Client
	     * @method respoke.Client.verifyConnected
	     * @throws {Error}
	     * @private
	     */
	    that.verifyConnected = function () {
	        if (!that.signalingChannel.isConnected()) {
	            throw new Error("Can't complete request when not connected. Please reconnect!");
	        }
	    };

	    /**
	     * Check whether this client is connected to the Respoke API.
	     * @memberof! respoke.Client
	     * @method respoke.Client.isConnected
	     * @returns boolean
	     */
	    that.isConnected = function () {
	        return that.signalingChannel.isConnected();
	    };

	    /**
	     * Join a group and begin keeping track of it. If this method is called multiple times synchronously, it will
	     * batch requests and only make one API call to Respoke.
	     *
	     * You can leave the group by calling `group.leave()`;
	     *
	     * ##### Joining and leaving a group
	     *
	     *      var group;
	     *
	     *      client.join({
	     *          id: "book-club",
	     *          onSuccess: function (evt) {
	     *              console.log('I joined', evt.group.id);
	     *              // "I joined book-club"
	     *              group = evt.group;
	     *              group.sendMessage({
	     *                  message: 'sup'
	     *              });
	     *          }
	     *      });
	     *
	     *      // . . .
	     *      // Some time later, leave the group.
	     *      // . . .
	     *      group.leave({
	     *          onSuccess: function (evt) {
	     *              console.log('I left', evt.group.id);
	     *              // "I left book-club"
	     *          }
	     *      });
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.join
	     * @param {object} params
	     * @param {string} params.id - The name of the group.
	     * @param {respoke.Client.joinHandler} [params.onSuccess] - Success handler for this invocation of
	     * this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @param {respoke.Group.onMessage} [params.onMessage] - Message handler for messages from this group only.
	     * @param {respoke.Group.onJoin} [params.onJoin] - Join event listener for endpoints who join this group only.
	     * @param {respoke.Group.onLeave} [params.onLeave] - Leave event listener for endpoints who leave
	     * this group only.
	     * @returns {Promise<respoke.Group>|undefined} The instance of the respoke.Group which the client joined.
	     * @fires respoke.Client#join
	     */
	    that.join = function (params) {
	        var deferred = Q.defer();
	        var retVal = respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);
	        try {
	            that.verifyConnected();
	        } catch (e) {
	            deferred.reject(e);
	            return retVal;
	        }

	        if (!params.id) {
	            deferred.reject(new Error("Can't join a group with no group id."));
	            return retVal;
	        }

	        log.trace('requested to join group', params.id);

	        that.signalingChannel.joinGroup({
	            groupList: [params.id]
	        }).done(function successHandler() {
	            var group;
	            params.signalingChannel = that.signalingChannel;
	            params.instanceId = instanceId;

	            group = that.getGroup({id: params.id});

	            if (!group) {
	                group = respoke.Group(params);
	                that.addGroup(group);
	            }

	            group.listen('join', params.onJoin);
	            group.listen('leave', params.onLeave);
	            group.listen('message', params.onMessage);

	            group.addMember({
	                connection: that.getConnection({
	                    endpointId: that.endpointId,
	                    connectionId: that.connectionId
	                })
	            });

	            /**
	             * This event is fired every time the client joins a group. If the client leaves
	             * a group, this event will be fired again on the next time the client joins the group.
	             * @event respoke.Client#join
	             * @type {respoke.Event}
	             * @property {respoke.Group} group
	             * @property {string} name - the event name.
	             */
	            that.fire('join', {
	                group: group
	            });
	            deferred.resolve(group);
	        }, function errorHandler(err) {
	            deferred.reject(err);
	        });
	        return retVal;
	    };

	    /**
	     * Add a Group. This is called when we join a group and need to begin keeping track of it.
	     * @memberof! respoke.Client
	     * @method respoke.Client.addGroup
	     * @param {respoke.Group}
	     * @private
	     */
	    that.addGroup = function (newGroup) {
	        if (!newGroup || newGroup.className !== 'respoke.Group') {
	            throw new Error("Can't add group to internal tracking without a group.");
	        }

	        newGroup.listen('leave', function leaveHandler(evt) {
	            var endpointThatLeft = evt.connection.getEndpoint();

	            if (!endpointThatLeft.hasListeners('presence') && endpointThatLeft.groupConnectionCount === 0) {
	                // No one is listening, and it's not in any more groups.
	                endpoints.every(function eachEndpoint(ept, index) {
	                    if (ept.id === endpointThatLeft.id) {
	                        endpoints.splice(index, 1);
	                        return false;
	                    }
	                    return true;
	                });
	            }
	        }, true);

	        groups.push(newGroup);
	    };

	    /**
	     * Get a list of all the groups the client is currently a member of.
	     * @memberof! respoke.Client
	     * @method respoke.Client.getGroups
	     * @returns {Array<respoke.Group>} All of the groups the library is aware of.
	     */
	    that.getGroups = function () {
	        return groups;
	    };

	    /**
	     * Find a group by id and return it.
	     *
	     *     var group = client.getGroup({
	     *         id: "resistance"
	     *     });
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.getGroup
	     * @param {object} params
	     * @param {string} params.id
	     * @param {respoke.Group.onJoin} [params.onJoin] - Receive notification that an endpoint has joined this group.
	     * @param {respoke.Group.onLeave} [params.onLeave] - Receive notification that an endpoint has left this group.
	     * @param {respoke.Group.onMessage} [params.onMessage] - Receive notification that a message has been
	     * received to a group.
	     * @returns {respoke.Group|undefined} The group whose ID was specified.
	     */
	    that.getGroup = function (params) {
	        var group;
	        if (!params || !params.id) {
	            throw new Error("Can't get a group without group id.");
	        }

	        groups.every(function eachGroup(grp) {
	            if (grp.id === params.id) {
	                group = grp;
	                return false;
	            }
	            return true;
	        });

	        if (group) {
	            group.listen('join', params.onJoin);
	            group.listen('leave', params.onLeave);
	            group.listen('message', params.onMessage);
	        }

	        return group;
	    };

	    /**
	     * Find an endpoint by id and return the `respoke.Endpoint` object.
	     *
	     * If it is not already cached locally, will be added to the local cache of tracked endpoints,
	     * its presence will be determined, and will be available in `client.getEndpoints()`.
	     *
	     *     var endpoint = client.getEndpoint({
	     *         id: "dlee"
	     *     });
	     *
	     * @ignore If the endpoint is not found in the local cache of endpoint objects (see `client.getEndpoints()`),
	     * it will be created. This is useful, for example, in the case of dynamic endpoints where groups are
	     * not in use. Override dynamic endpoint creation by setting `params.skipCreate = true`.
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.getEndpoint
	     * @param {object} params
	     * @param {string} params.id
	     * @param {respoke.Endpoint.onMessage} [params.onMessage] - Handle messages sent to the logged-in user
	     * from this one Endpoint.
	     * @param {respoke.Endpoint.onPresence} [params.onPresence] - Handle presence notifications from this one
	     * Endpoint.
	     * @arg {boolean} [params.skipCreate] - Skip the creation step and return undefined if we don't yet
	     * @arg {boolean} [params.skipPresence] - Skip registering for this endpoint's presence.
	     * @returns {respoke.Endpoint} The endpoint whose ID was specified.
	     */
	    that.getEndpoint = function (params) {
	        var endpoint;
	        if (!params || !params.id) {
	            throw new Error("Can't get an endpoint without endpoint id.");
	        }

	        endpoints.every(function eachEndpoint(ept) {
	            if (ept.id === params.id) {
	                endpoint = ept;
	                return false;
	            }
	            return true;
	        });

	        if (!endpoint && params && !params.skipCreate) {
	            params.instanceId = instanceId;
	            params.signalingChannel = that.signalingChannel;
	            params.resolveEndpointPresence = clientSettings.resolveEndpointPresence;
	            params.addCall = addCall;

	            endpoint = respoke.Endpoint(params);
	            endpoints.push(endpoint);
	        }

	        if (!endpoint) {
	            return;
	        }

	        if (params.skipPresence !== true) {
	            that.signalingChannel.registerPresence({
	                endpointList: [endpoint.id]
	            }).done(null, function (err) {
	                log.error("Couldn't register for presence on", endpoint.id, err.message);
	            });
	        }
	        endpoint.listen('presence', params.onPresence);
	        endpoint.listen('message', params.onMessage);

	        return endpoint;
	    };

	    /**
	     * Find a Connection by id and return it.
	     *
	     *     var connection = client.getConnection({
	     *         id: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXX"
	     *     });
	     *
	     * @ignore In most cases, if we don't find it we will create it. This is useful
	     * in the case of dynamic endpoints where groups are not in use. Set skipCreate=true
	     * to return undefined if the Connection is not already known.
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.getConnection
	     * @param {object} params
	     * @param {string} params.connectionId
	     * @param {string} [params.endpointId] - An endpointId to use in the creation of this connection.
	     * @param {respoke.Endpoint.onMessage} [params.onMessage] - Handle messages sent to the logged-in user
	     * from this one Connection.
	     * @param {respoke.Endpoint.onPresence} [params.onPresence] - Handle presence notifications from this one
	     * Connection.
	     * @returns {respoke.Connection} The connection whose ID was specified.
	     */
	    that.getConnection = function (params) {
	        var connection;
	        var endpoint;
	        var endpointsToSearch = endpoints;

	        params = params || {};
	        if (!params.connectionId) {
	            throw new Error("Can't get a connection without connection id.");
	        }
	        if (!params.endpointId && !params.skipCreate) {
	            throw new Error("Can't create a connection without endpoint id.");
	        }

	        if (params.endpointId) {
	            endpoint = that.getEndpoint({
	                id: params.endpointId,
	                skipPresence: true,
	                skipCreate: params.skipCreate
	            });

	            endpointsToSearch = [];
	            if (endpoint) {
	                endpointsToSearch = [endpoint];
	            }
	        }

	        endpointsToSearch.every(function eachEndpoint(ept) {
	            connection = ept.getConnection(params);
	            return !connection;
	        });

	        if (!connection && !params.skipCreate) {
	            params.instanceId = instanceId;
	            connection = respoke.Connection(params);
	            endpoint.connections.push(connection);
	        }

	        return connection;
	    };

	    /**
	     * Get the list of **all endpoints** that the library has knowledge of.
	     * These are `respoke.Endpoint` objects, not just the endpointIds.
	     *
	     * The library gains knowledge of an endpoint in two ways:
	     * 1. when an endpoint joins a group that the user (currently logged-in endpoint) is a member of (if group presence is enabled)
	     * 2. when an endpoint that the user (currently logged-in endpoint) is watching*
	     *
	     * *If an endpoint that the library does not know about sends a message to the client, you
	     * can immediately call the `client.getEndpoint()` method on the sender of the message to enable
	     * watching of the sender's endpoint.
	     *
	     *      client.on('message', function (data) {
	     *          if (data.endpoint) {
	     *              // start tracking this endpoint.
	     *              client.getEndpoint({ id: data.endpoint.id });
	     *          }
	     *      });
	     *
	     *
	     * @memberof! respoke.Client
	     * @method respoke.Client.getEndpoints
	     * @returns {Array<respoke.Endpoint>}
	     */
	    that.getEndpoints = function () {
	        return endpoints;
	    };

	    /**
	     * Get conference participants by conference id.
	     *
	     * ```
	     * client.getConferenceParticipants({ id: 'mygroup' }).done(function (participants) {
	     *     var ids = participants.map(function (p) { return p.endpointId; });
	     *     console.log(ids); // ['person1', 'person2']
	     * });
	     * ```
	     * @memberof respoke.Client
	     * @method respoke.Client.getConferenceParticipants
	     * @private
	     * @param object {params}
	     * @param string {params.id}
	     * @returns {Promise}
	     */
	    that.getConferenceParticipants = that.signalingChannel.getConferenceParticipants;

	    return that;
	}; // End respoke.Client

	/**
	 * Handle sending successfully.
	 * @callback respoke.Client.successHandler
	 */
	/**
	 * Handle joining a group successfully. This callback is called only once when Client.join() is called.
	 * @callback respoke.Client.joinHandler
	 * @param {respoke.Group} group
	 */
	/**
	 * Receive notification that the client has joined a group. This callback is called everytime
	 * respoke.Client#join is fired.
	 * @callback respoke.Client.onJoin
	 * @param {respoke.Event} evt
	 * @param {respoke.Group} evt.group
	 * @param {string} evt.name - the event name.
	 */
	/**
	 * Receive notification that the client has left a group. This callback is called everytime
	 * respoke.Client#leave is fired.
	 * @callback respoke.Client.onLeave
	 * @param {respoke.Event} evt
	 * @param {respoke.Group} evt.group
	 * @param {string} evt.name - the event name.
	 */
	/**
	 * Receive notification that a message has been received. This callback is called every time
	 * respoke.Client#message is fired.
	 * @callback respoke.Client.onClientMessage
	 * @param {respoke.Event} evt
	 * @param {respoke.TextMessage} evt.message
	 * @param {respoke.Group} [evt.group] - If the message is to a group we already know about,
	 * this will be set. If null, the developer can use client.join({id: evt.message.header.channel}) to join
	 * the group. From that point forward, Group#message will fire when a message is received as well. If
	 * group is undefined instead of null, the message is not a group message at all.
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Client} evt.target
	 */
	/**
	 * Receive notification that the client is receiving a call from a remote party. This callback is called every
	 * time respoke.Client#call is fired.
	 * @callback respoke.Client.onCall
	 * @param {respoke.Event} evt
	 * @param {respoke.Call} evt.call
	 * @param {respoke.Endpoint} evt.endpoint
	 * @param {string} evt.name - the event name.
	 */
	/**
	 * Receive notification that the client is receiving a request for a direct connection from a remote party.
	 * This callback is called every time respoke.Client#direct-connection is fired.
	 * @callback respoke.Client.onDirectConnection
	 * @param {respoke.Event} evt
	 * @param {respoke.DirectConnection} evt.directConnection
	 * @param {respoke.Endpoint} evt.endpoint
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Call} evt.target
	 */
	/**
	 * Receive notification Respoke has successfully connected to the cloud. This callback is called every time
	 * respoke.Client#connect is fired.
	 * @callback respoke.Client.onConnect
	 * @param {respoke.Event} evt
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Client} evt.target
	 */
	/**
	 * Receive notification Respoke has successfully disconnected from the cloud. This callback is called every time
	 * respoke.Client#disconnect is fired.
	 * @callback respoke.Client.onDisconnect
	 * @param {respoke.Event} evt
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Client} evt.target
	 */
	/**
	 * Receive notification Respoke has successfully reconnected to the cloud. This callback is called every time
	 * respoke.Client#reconnect is fired.
	 * @callback respoke.Client.onReconnect
	 * @param {respoke.Event} evt
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Client} evt.target
	 */
	/**
	 * Handle disconnection to the cloud successfully.
	 * @callback respoke.Client.disconnectSuccessHandler
	 */
	/**
	 * Handle an error that resulted from a method call.
	 * @callback respoke.Client.errorHandler
	 * @params {Error} err
	 */
	/**
	 * Handle connection to the cloud successfully.
	 * @callback respoke.Client.connectSuccessHandler
	 */


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	var respoke = __webpack_require__(1);

	/**
	 * A `respoke.Connection` always belongs to an Endpoint.
	 *
	 * There is a distinction between Endpoint and Connection because an Endpoint can be authenticated
	 * from multiple devices, browsers, or browser tabs. Each of these separate authentications is a Connection.
	 * A Client can choose to interact with connections of the same endpoint in different ways.
	 *
	 * @constructor
	 * @class respoke.Connection
	 * @augments respoke.EventEmitter
	 * @param {object} params
	 * @param {string} params.id
	 * @returns {respoke.Connection}
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    /**
	     * @memberof! respoke.Connection
	     * @name instanceId
	     * @private
	     * @type {string}
	     */
	    var instanceId = params.instanceId;
	    var that = respoke.EventEmitter(params);
	    /**
	     * @memberof! respoke.DirectConnection
	     * @name client
	     * @type {respoke.Client}
	     * @private
	     */
	    var client = respoke.getClient(instanceId);

	    /**
	     * The connection id.
	     * @memberof! respoke.Connection
	     * @name id
	     * @type {string}
	     */
	    that.id = that.id || that.connectionId;
	    if (!that.id) {
	        throw new Error("Can't make a connection without an id.");
	    }
	    delete that.instanceId;
	    delete that.connectionId;

	    /**
	     * A name to identify the type of this object.
	     * @memberof! respoke.Connection
	     * @name className
	     * @type {string}
	     */
	    that.className = 'respoke.Connection';

	    /**
	     * Represents the presence status. Typically a string, but other types are supported.
	     * Defaults to `'unavailable'`.
	     *
	     * **Do not modify this directly** - it won't update presence with Respoke. Presence must be updated
	     * by the remote endpoint.
	     *
	     * @memberof! respoke.Connection
	     * @name presence
	     * @type {string|number|object|Array}
	     */
	    that.presence = 'unavailable';

	    /**
	     * Deprecated: use endpoint.presence instead.
	     *
	     * Return the presence.
	     * @memberof! respoke.Connection
	     * @deprecated
	     * @name presence
	     * @type {string|number|object|Array}
	     */
	    that.getPresence = function () {
	        return that.presence;
	    };

	    /**
	     * Send a message to this connection of an endpoint. If the endpoint has multiple connections,
	     * it will only receive the message at this connection.
	     *
	     *     connection.sendMessage({
	     *         message: "PJ, put that PBR down!"
	     *     });
	     *
	     * **Using callbacks** will disable promises.
	     * @memberof! respoke.Connection
	     * @method respoke.Connection.sendMessage
	     * @param {object} params
	     * @param {string} params.message
	     * @param {boolean} [params.ccSelf=false] Copy this client's own endpoint on this message so that they arrive
	     * at other devices it might be logged into elsewhere.
	     * @param {boolean} [params.push=false] Whether or not the message should be considered for push notifications to
	     * mobile devices.
	     * @param {respoke.Client.successHandler} [params.onSuccess] - Success handler for this invocation
	     * of this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @returns {Promise|undefined}
	     */
	    that.sendMessage = function (params) {
	        params = params || {};
	        params.connectionId = that.id;
	        params.ccSelf = (typeof params.ccSelf === "boolean" ? params.ccSelf : false);
	        return that.getEndpoint().sendMessage(params);
	    };

	    /**
	     * Create a new screen sharing call. Screenshares are inherently unidirectional video only. This may change
	     * in the future when Chrome adds the ability to obtain screen video and microphone audio at the same time. For
	     * now, if you also need audio, place a second audio only call.
	     *
	     * The endpoint who calls `connection.startScreenShare` will be the one whose screen is shared. If you'd like to
	     * implement this as a screenshare request in which the endpoint who starts the call is the watcher and
	     * not the sharer, it is recommened that you use `endpoint.sendMessage` to send a control message to the user
	     * whose screenshare is being requested so that user's app can call `connection.startScreenShare`.
	     *
	     * NOTE: At this time, screen sharing only works with Chrome, and Chrome requires a Chrome extension to
	     * access screen sharing features. Please see instructions at https://github.com/respoke/respoke-chrome-extension.
	     * Support for additional browsers will be added in the future.
	     *
	     *     connection.startScreenShare({
	     *         onConnect: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.Connection
	     * @method respoke.Connection.startScreenShare
	     * @param {object} params
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for when the screenshare is connected
	     * and the remote party has received the video.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been
	     * hung up.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @returns {respoke.Call}
	     */
	    that.startScreenShare = function (params) {
	        client.verifyConnected();
	        params.connectionId = that.id;
	        return that.getEndpoint().startScreenShare(params);
	    };

	    /**
	     * Create a new Call for a voice and/or video call this particular connection, only. The Call cannot be answered
	     * by another connection of this Endpoint.
	     *
	     *     connection.startCall({
	     *         onConnect: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.Connection
	     * @method respoke.Connection.startCall
	     * @param {object} params
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for receiving an HTML5 Video
	     * element with the remote
	     * audio and/or video attached.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been
	     * hung up.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	     * wants to perform an action between local media becoming available and calling approve().
	     * @param {RTCConstraints} [params.constraints]
	     * @param {boolean} [params.receiveOnly] - whether or not we accept media
	     * @param {boolean} [params.sendOnly] - whether or not we send media
	     * @param {boolean} [params.needDirectConnection] - flag to enable skipping media & opening direct connection.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {HTMLVideoElement} [params.videoLocalElement] - Pass in an optional html video element to have local
	     * video attached to it.
	     * @param {HTMLVideoElement} [params.videoRemoteElement] - Pass in an optional html video element to have remote
	     * video attached to it.
	     * @returns {respoke.Call}
	     */
	    that.startCall = function (params) {
	        params = params || {};
	        params.connectionId = that.id;
	        return that.getEndpoint().startCall(params);
	    };

	    /**
	     * Create a new audio-only call.
	     *
	     *     connection.startAudioCall({
	     *         onConnect: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.Connection
	     * @method respoke.Connection.startAudioCall
	     * @param {object} params
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for receiving an HTML5 Video
	     * element with the remote
	     * audio and/or video attached.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been
	     * hung up.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	     * wants to perform an action between local media becoming available and calling approve().
	     * @param {boolean} [params.receiveOnly] - whether or not we accept media
	     * @param {boolean} [params.sendOnly] - whether or not we send media
	     * @param {boolean} [params.needDirectConnection] - flag to enable skipping media & opening direct connection.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @returns {respoke.Call}
	     */
	    that.startAudioCall = function (params) {
	        client.verifyConnected();
	        params.connectionId = that.id;
	        return that.getEndpoint().startAudioCall(params);
	    };

	    /**
	     * Create a new call with audio and video.
	     *
	     *     connection.startVideoCall({
	     *         onConnect: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.Connection
	     * @method respoke.Connection.startVideoCall
	     * @param {object} params
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for receiving an HTML5 Video
	     * element with the remote
	     * audio and/or video attached.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has
	     * been hung up.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {boolean} [params.receiveOnly] - whether or not we accept media
	     * @param {boolean} [params.sendOnly] - whether or not we send media
	     * @param {boolean} [params.needDirectConnection] - flag to enable skipping media & opening direct connection.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @returns {respoke.Call}
	     */
	    that.startVideoCall = function (params) {
	        client.verifyConnected();
	        params.connectionId = that.id;
	        return that.getEndpoint().startVideoCall(params);
	    };

	    /**
	     * Create a new DirectConnection with this particular connection, only. The DirectConnection cannot be answered
	     * by another connection of this Endpoint.  This method creates a new Call as well, attaching this
	     * DirectConnection to it for the purposes of creating a peer-to-peer link for sending data such as messages to
	     * the other endpoint. Information sent through a DirectConnection is not handled by the cloud infrastructure.
	     *
	     *     connection.startDirectConnection({
	     *         onOpen: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.Connection
	     * @method respoke.Connection.startDirectConnection
	     * @param {object} params
	     * @param {respoke.Call.directConnectionSuccessHandler} [params.onSuccess] - Success handler for this
	     * invocation of this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @param {respoke.DirectConnection.onStart} [params.onStart] - A callback for when setup of the direct
	     * connection begins. The direct connection will not be open yet.
	     * @param {respoke.DirectConnection.onOpen} [params.onOpen] - A callback for receiving notification of when
	     * the DirectConnection is open and ready to be used.
	     * @param {respoke.DirectConnection.onError} [params.onError] - Callback for errors setting up the direct
	     * connection.
	     * @param {respoke.DirectConnection.onClose} [params.onClose] - A callback for receiving notification of
	     * when the DirectConnection is closed and the two Endpoints are disconnected.
	     * @param {respoke.DirectConnection.onMessage} [params.onMessage] - A callback for receiving messages sent
	     * through the DirectConnection.
	     * @param {respoke.DirectConnection.onAccept} [params.onAccept] - Callback for when the user accepts the
	     * request for a direct connection and setup begins.
	     * @returns {respoke.DirectConnection} The DirectConnection which can be used to send data and messages
	     * directly to the other endpoint.
	     */
	    that.startDirectConnection = function (params) {
	        var retVal;
	        var deferred;
	        params = params || {};

	        try {
	            client.verifyConnected();
	        } catch (err) {
	            deferred = respoke.Q.defer();
	            retVal = respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);
	            deferred.reject(err);
	            return retVal;
	        }

	        params.connectionId = that.id;
	        return that.getEndpoint().startDirectConnection(params);
	    };

	    /**
	     * Get the Endpoint that this Connection belongs to.
	     * @memberof! respoke.Connection
	     * @method respoke.Connection.getEndpoint
	     * @returns {respoke.Endpoint}
	     */
	    that.getEndpoint = function () {
	        return client.getEndpoint({
	            id: that.endpointId,
	            skipPresence: true
	        });
	    };

	    return that;
	}; // End respoke.Connection


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	var Q = __webpack_require__(8);
	var respoke = __webpack_require__(1);
	var log = respoke.log;

	/**
	 * `respoke.Endpoint`s are users of a Respoke app.
	 * An Endpoint can be a person in a browser or device, or an app using Respoke APIs from a server.
	 * A Client can interact with endpoints through messages, audio or video calls, or direct connections.
	 * An Endpoint may be authenticated from multiple devices to the same app (each of which is
	 * represented by a Connection).
	 *
	 * ```
	 * var jim = client.getEndpoint({ id: 'jim' });
	 * ```
	 *
	 * @constructor
	 * @class respoke.Endpoint
	 * @augments respoke.EventEmitter
	 * @param {object} params
	 * @param {string} params.id
	 * @param {string} params.instanceId
	 * @param {respoke.client.resolvePresence} [params.resolvePresence] An optional function for resolving presence
	 * for an endpoint.
	 * @returns {respoke.Endpoint}
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    /**
	     * @memberof! respoke.Endpoint
	     * @name instanceId
	     * @private
	     * @type {string}
	     */
	    var instanceId = params.instanceId;
	    var that = respoke.EventEmitter(params);
	    /**
	     * @memberof! respoke.DirectConnection
	     * @name client
	     * @type {respoke.Client}
	     * @private
	     */
	    var client = respoke.getClient(instanceId);
	    /**
	     * @memberof! respoke.DirectConnection
	     * @name signalingChannel
	     * @type {respoke.SignalingChannel}
	     * @private
	     */
	    var signalingChannel = params.signalingChannel;
	    /**
	     * The number this endpoint's connections that are joined to groups. So if
	     * an endpoint has 3 connections in the same group, the
	     * `groupConnectionCount` for that endpoint would be 3.
	     *
	     * @memberof! respoke.DirectConnection
	     * @name groupConnectionCount
	     * @type {number}
	     */
	    that.groupConnectionCount = 0;

	    var addCall = params.addCall;

	    delete that.signalingChannel;
	    delete that.instanceId;
	    delete that.connectionId;
	    delete that.addCall;
	    /**
	     * A name to identify the type of this object.
	     * @memberof! respoke.Endpoint
	     * @name className
	     * @type {string}
	     */
	    that.className = 'respoke.Endpoint';
	    /**
	     * A direct connection to this endpoint. This can be used to send direct messages.
	     * @memberof! respoke.Endpoint
	     * @name directConnection
	     * @type {respoke.DirectConnection}
	     */
	    that.directConnection = null;

	    /**
	     * Array of connections for this endpoint.
	     * @memberof! respoke.Endpoint
	     * @name connections
	     * @type {Array<respoke.Connection>}
	     */
	    that.connections = [];
	    client.listen('disconnect', function disconnectHandler() {
	        that.connections = [];
	    }, true);

	    var resolveEndpointPresence = params.resolveEndpointPresence;
	    delete that.resolveEndpointPresence;

	    /**
	     * Represents the presence status. Typically a string, but other types are supported.
	     * Defaults to `'unavailable'`.
	     *
	     * **Do not modify this directly** - it won't update presence with Respoke. Presence must be updated
	     * by the remote endpoint.
	     *
	     * @memberof! respoke.Endpoint
	     * @name presence
	     * @type {string|number|object|Array}
	     */
	    that.presence = 'unavailable';

	    /**
	     * Deprecated: use endpoint.presence instead.
	     *
	     * Return the presence.
	     * @memberof! respoke.Endpoint
	     * @deprecated
	     * @name presence
	     * @type {string|number|object|Array}
	     */
	    that.getPresence = function () {
	        return that.presence;
	    };

	    /**
	     * Internally set the presence on the object for this session upon receipt of a presence notification from
	     * the backend. Respoke developers shouldn't use this.
	     *
	     * While technically available on an Endpoint or Connection, this will not trigger
	     * any API changes. The changes will only be reflected locally.
	     *
	     * @memberof! respoke.Endpoint
	     * @method respoke.Endpoint.setPresence
	     * @param {object} params
	     * @param {string|number|object|Array} [params.presence=available]
	     * @param {string} params.connectionId
	     * @fires respoke.Endpoint#presence
	     * @private
	     */
	    that.setPresence = function (params) {
	        var connection;
	        params = params || {};
	        params.presence = params.presence || 'available';
	        params.connectionId = params.connectionId || that.connectionId;

	        if (!params.connectionId) {
	            throw new Error("Can't set Endpoint presence without a connectionId.");
	        }

	        connection = that.getConnection({connectionId: params.connectionId}) || client.getConnection({
	            connectionId: params.connectionId,
	            skipCreate: false,
	            endpointId: that.id
	        });

	        connection.presence = params.presence;
	        that.resolvePresence();

	        /**
	         * This event indicates that the presence for this endpoint has been updated.
	         * @event respoke.Endpoint#presence
	         * @type {respoke.Event}
	         * @property {string|number|object|Array} presence
	         * @property {string} name - the event name.
	         * @property {respoke.Endpoint} target
	         */
	        that.fire('presence', {
	            presence: that.presence
	        });
	    };

	    /**
	     * Send a message to the endpoint through the infrastructure.
	     *
	     * ```
	     * endpoint.sendMessage({
	     *     message: "wassuuuuup"
	     * });
	     * ```
	     *
	     * **Using callbacks** will disable promises.
	     * @memberof! respoke.Endpoint
	     * @method respoke.Endpoint.sendMessage
	     * @param {object} params
	     * @param {string} params.message
	     * @param {string} [params.connectionId]
	     * @param {boolean} [params.ccSelf=true] Copy this client's own endpoint on this message so that they arrive
	     * at other devices it might be logged into elsewhere.
	     * @param {boolean} [params.push=false] Whether or not to consider the message for push notifications to mobile
	     * devices.
	     * @param {respoke.Client.successHandler} [params.onSuccess] - Success handler for this invocation of this
	     * method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this method
	     * only.
	     * @returns {Promise|undefined}
	     */
	    that.sendMessage = function (params) {
	        var promise;
	        var retVal;
	        params = params || {};
	        params.ccSelf = (typeof params.ccSelf === "boolean" ? params.ccSelf : true);

	        promise = signalingChannel.sendMessage({
	            ccSelf: params.ccSelf,
	            connectionId: params.connectionId,
	            message: params.message,
	            push: !!params.push,
	            recipient: that
	        });

	        retVal = respoke.handlePromise(promise, params.onSuccess, params.onError);
	        return retVal;
	    };

	    /**
	     * Create a new audio-only call.
	     *
	     *     endpoint.startAudioCall({
	     *         onConnect: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.Endpoint
	     * @method respoke.Endpoint.startAudioCall
	     * @param {object} params
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for receiving an HTML5 Video
	     * element with the remote
	     * audio and/or video attached.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been
	     * hung up.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRemoteMedia} [params.onRemoteMedia] - Callback called every time a remote
	     * stream is added to the call. Corresponds to 'remote-stream-received' event.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	     * wants to perform an action between local media becoming available and calling approve().
	     * @param {boolean} [params.receiveOnly] - whether or not we accept media
	     * @param {boolean} [params.sendOnly] - whether or not we send media
	     * @param {boolean} [params.needDirectConnection] - flag to enable skipping media & opening direct connection.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {string} [params.connectionId] - The connection ID of the remoteEndpoint, if it is not desired to call
	     * all connections belonging to this endpoint.
	     * @param {*} [params.metadata] - Metadata to be attached to the audio call, accessible by the callee.
	     * @returns {respoke.Call}
	     */
	    that.startAudioCall = function (params) {
	        params = params || {};

	        params.constraints = respoke.convertConstraints(params.constraints, [{
	            video: false,
	            audio: true,
	            optional: [],
	            mandatory: {}
	        }]);

	        return that.startCall(params);
	    };

	    /**
	     * Create a new call with audio and video.
	     *
	     *     endpoint.startVideoCall({
	     *         onConnect: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.Endpoint
	     * @method respoke.Endpoint.startVideoCall
	     * @param {object} params
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for receiving an HTML5 Video
	     * element with the remote
	     * audio and/or video attached.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been
	     * hung up.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRemoteMedia} [params.onRemoteMedia] - Callback called every time a remote
	     * stream is added to the call. Corresponds to 'remote-stream-received' event.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	     * wants to perform an action between local media becoming available and calling approve().
	     * @param {boolean} [params.receiveOnly] - whether or not we accept media
	     * @param {boolean} [params.sendOnly] - whether or not we send media
	     * @param {boolean} [params.needDirectConnection] - flag to enable skipping media & opening direct connection.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {string} [params.connectionId] - The connection ID of the remoteEndpoint, if it is not desired to call
	     * all connections belonging to this endpoint.
	     * @param {*} [params.metadata] - Metadata to be attached to the video call, accessible by the callee.
	     * @returns {respoke.Call}
	     */
	    that.startVideoCall = function (params) {
	        params = params || {};

	        params.constraints = respoke.convertConstraints(params.constraints, [{
	            video: true,
	            audio: true,
	            optional: [],
	            mandatory: {}
	        }]);

	        return that.startCall(params);
	    };

	    /**
	     * The endpoint who calls `endpoint.startScreenShare` will be the one whose screen is shared. If you'd like to
	     * implement this as a screenshare request in which the endpoint who starts the call is the watcher and
	     * not the sharer, it is recommended that you use `endpoint.sendMessage` to send a control message to the user
	     * whose screenshare is being requested so that user's app can call `endpoint.startScreenShare`.
	     *
	     * By default, the call will be one-way screen share only, with the recipient sending nothing. To turn it into
	     * a bidirectional call with the recipient sending video and both parties sending audio, set `params.sendOnly`
	     * to false.
	     *
	     * NOTE: At this time, screen sharing only works with Chrome and Firefox, and both require browser extensions to
	     * access screen sharing features. Please see instructions at https://github.com/respoke/respoke-chrome-extension
	     * and https://github.com/respoke/respoke-firefox-screen-sharing-extension.
	     *
	     *     endpoint.startScreenShare({
	     *         onConnect: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.Endpoint
	     * @method respoke.Endpoint.startScreenShare
	     * @param {object} params
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for when the screenshare is connected
	     * and the remote party has received the video.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been
	     * hung up.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRemoteMedia} [params.onRemoteMedia] - Callback called every time a remote
	     * stream is added to the call. Corresponds to 'remote-stream-received' event.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {Array<RTCConstraints>} [params.constraints] - Additional media to add to the call.
	     * @param {RTCConstraints} [params.screenConstraints] - Overrides for the screen media.
	     * @param {boolean} [params.sendOnly=true] - Whether the call should be unidirectional.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {string} [params.connectionId] - The connection ID of the remoteEndpoint, if it is not desired to call
	     * all connections belonging to this endpoint.
	     * @param {string} [params.source] - Pass in what type of mediaSource you want. If omitted, you'll have access
	     * to both the screen and windows. In firefox, you'll have access to the screen only.
	     * @param {*} [params.metadata] - Metadata to be attached to the screenShare, accessible by the callee.
	     * @returns {respoke.Call}
	     */
	    that.startScreenShare = function (params) {
	        params = params || {};
	        var hasAudio;
	        var addAudio;
	        params.target = 'screenshare';

	        if (typeof params.caller !== 'boolean') {
	            params.caller = true;
	        }

	        // true and undefined -> true
	        // receiveOnly will be set in call.js by respoke.sdpHasSendOnly
	        params.sendOnly = (params.caller && (params.sendOnly || (params.sendOnly === undefined)));
	        addAudio = (!params.sendOnly && (!params.screenConstraints ||
	            (params.screenConstraints && params.screenConstraints.audio)));

	        if (params.caller) {
	            params.constraints = respoke.convertConstraints(params.constraints);
	            params.constraints.push(respoke.getScreenShareConstraints({
	                constraints: params.screenConstraints
	            }));
	            delete params.screenConstraints;

	            params.constraints.forEach(function (con) {
	                if (con.audio) {
	                    hasAudio = true;
	                }
	            });

	            /* If they didn't override screensharing constraints and no constraints so far have included audio,
	             * add audio to the call. If they overrode the default screensharing constraints, we'll assume they
	             * know what they are doing and didn't want audio.
	             */
	            if (addAudio && !hasAudio) {
	                params.constraints.push({
	                    audio: true,
	                    video: false
	                });
	            }
	        }

	        return that.startCall(params);
	    };

	    /**
	     * Create a new call.
	     *
	     *     endpoint.startCall({
	     *         onConnect: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.Endpoint
	     * @method respoke.Endpoint.startCall
	     * @param {object} params
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for receiving an HTML5 Video
	     * element with the remote
	     * audio and/or video attached.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been
	     * hung up.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRemoteMedia} [params.onRemoteMedia] - Callback called every time a remote
	     * stream is added to the call. Corresponds to 'remote-stream-received' event.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	     * wants to perform an action between local media becoming available and calling approve().
	     * @param {Array<RTCConstraints>} [params.constraints]
	     * @param {boolean} [params.receiveOnly] - whether or not we accept media
	     * @param {boolean} [params.sendOnly] - whether or not we send media
	     * @param {boolean} [params.needDirectConnection] - flag to enable skipping media & opening direct connection.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {string} [params.connectionId] - The connection ID of the remoteEndpoint, if it is not desired to call
	     * all connections belonging to this endpoint.
	     * @param {HTMLVideoElement} [params.videoLocalElement] - Pass in an optional html video element to have local
	     * video attached to it.
	     * @param {HTMLVideoElement} [params.videoRemoteElement] - Pass in an optional html video element to have remote
	     * video attached to it.
	     * @param {*} [params.metadata] - Metadata to be attached to the call, accessible by the callee.
	     * @returns {respoke.Call}
	     */
	    that.startCall = function (params) {
	        var call;
	        params = params || {};

	        params.constraints = respoke.convertConstraints(params.constraints, [{
	            video: true,
	            audio: true,
	            mandatory: {},
	            optional: []
	        }]);

	        // If they are requesting a screen share by constraints without having called startScreenShare
	        if (params.target !== 'screenshare' && params.constraints[0] &&
	                respoke.constraintsHasScreenShare(params.constraints[0])) {
	            return that.startScreenShare(params);
	        }

	        params.target = params.target || "call";

	        log.debug('Endpoint.call', params);
	        client.verifyConnected();
	        if (typeof params.caller !== 'boolean') {
	            params.caller = true;
	        }

	        if (!that.id) {
	            log.error("Can't start a call without endpoint ID!");
	            return;
	        }

	        params.instanceId = instanceId;
	        params.remoteEndpoint = that;

	        params.signalOffer = function (signalParams) {
	            var onSuccess = signalParams.onSuccess;
	            var onError = signalParams.onError;
	            delete signalParams.onSuccess;
	            delete signalParams.onError;

	            signalParams.signalType = 'offer';
	            signalParams.target = params.target;
	            signalParams.recipient = that;
	            signalParams.metadata = params.metadata;

	            signalingChannel.sendSDP(signalParams).done(onSuccess, onError);
	        };
	        params.signalAnswer = function (signalParams) {
	            var onSuccess = signalParams.onSuccess;
	            var onError = signalParams.onError;
	            delete signalParams.onSuccess;
	            delete signalParams.onError;

	            signalParams.signalType = 'answer';
	            signalParams.target = params.target;
	            signalParams.recipient = that;
	            signalParams.sessionId = signalParams.call.sessionId;
	            signalingChannel.sendSDP(signalParams).then(onSuccess, onError).done(null, function errorHandler(err) {
	                signalParams.call.hangup({signal: false});
	            });
	        };
	        params.signalConnected = function (signalParams) {
	            signalParams.target = params.target;
	            signalParams.connectionId = signalParams.call.connectionId;
	            signalParams.sessionId = signalParams.call.sessionId;
	            signalParams.recipient = that;
	            signalingChannel.sendConnected(signalParams).done(null, function errorHandler(err) {
	                signalParams.call.hangup();
	            });
	        };
	        params.signalModify = function (signalParams) {
	            signalParams.target = params.target;
	            signalParams.recipient = that;
	            signalParams.sessionId = signalParams.call.sessionId;
	            signalingChannel.sendModify(signalParams).done();
	        };
	        params.signalCandidate = function (signalParams) {
	            signalParams.target = params.target;
	            signalParams.recipient = that;
	            signalParams.sessionId = signalParams.call.sessionId;
	            return signalingChannel.sendCandidate(signalParams);
	        };
	        params.signalHangup = function (signalParams) {
	            signalParams.target = params.target;
	            signalParams.recipient = that;
	            signalParams.sessionId = signalParams.call.sessionId;
	            signalingChannel.sendHangup(signalParams).done();
	        };
	        params.signalReport = function (signalParams) {
	            log.debug("Sending debug report", signalParams.report);
	            signalingChannel.sendReport(signalParams).done();
	        };

	        params.signalingChannel = signalingChannel;
	        call = respoke.Call(params);
	        addCall({call: call});
	        return call;
	    };

	    /**
	     * Create a new DirectConnection.  This method creates a new Call as well, attaching this DirectConnection to
	     * it for the purposes of creating a peer-to-peer link for sending data such as messages to the other endpoint.
	     * Information sent through a DirectConnection is not handled by the cloud infrastructure.  If there is already
	     * a direct connection open, this method will resolve the promise with that direct connection instead of
	     * attempting to create a new one.
	     *
	     *     endpoint.startDirectConnection({
	     *         onOpen: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.Endpoint
	     * @method respoke.Endpoint.startDirectConnection
	     * @param {object} params
	     * @param {respoke.Call.directConnectionSuccessHandler} [params.onSuccess] - Success handler for this
	     * invocation of this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @param {respoke.DirectConnection.onStart} [params.onStart] - A callback for when setup of the direct
	     * connection begins. The direct connection will not be open yet.
	     * @param {respoke.DirectConnection.onOpen} [params.onOpen] - A callback for receiving notification of when
	     * the DirectConnection is open and ready to be used.
	     * @param {respoke.DirectConnection.onError} [params.onError] - Callback for errors setting up the direct
	     * connection.
	     * @param {respoke.DirectConnection.onClose} [params.onClose] - A callback for receiving notification of
	     * when the DirectConnection is closed and the two Endpoints are disconnected.
	     * @param {respoke.DirectConnection.onAccept} [params.onAccept] - Callback for when the user accepts the
	     * request for a direct connection and setup begins.
	     * @param {respoke.DirectConnection.onMessage} [params.onMessage] - A callback for receiving messages sent
	     * through the DirectConnection.
	     * @param {string} [params.connectionId] - An optional connection ID to use for this connection. This allows
	     * the connection to be made to a specific instance of an endpoint in the case that the same endpoint is logged
	     * in from multiple locations.
	     * @returns {Promise<respoke.DirectConnection>} The DirectConnection which can be used to send data and messages
	     * directly to the other endpoint.
	     */
	    that.startDirectConnection = function (params) {
	        params = params || {};
	        var deferred = Q.defer();
	        var retVal = respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);
	        var call;

	        try {
	            client.verifyConnected();
	        } catch (err) {
	            deferred.reject(err);
	            return retVal;
	        }

	        if (that.directConnection || params.create === false) {
	            deferred.resolve(that.directConnection);
	            return retVal;
	        }

	        if (typeof params.caller !== 'boolean') {
	            params.caller = true;
	        }

	        if (!that.id) {
	            deferred.reject(new Error("Can't start a direct connection without endpoint ID!"));
	            return retVal;
	        }

	        params.instanceId = instanceId;
	        params.remoteEndpoint = that;

	        params.signalOffer = function (signalParams) {
	            var onSuccess = signalParams.onSuccess;
	            var onError = signalParams.onError;
	            delete signalParams.onSuccess;
	            delete signalParams.onError;

	            signalParams.signalType = 'offer';
	            signalParams.target = 'directConnection';
	            signalParams.recipient = that;
	            signalParams.metadata = params.metadata;

	            signalingChannel.sendSDP(signalParams).done(onSuccess, onError);
	        };
	        params.signalConnected = function (signalParams) {
	            signalParams.target = 'directConnection';
	            signalParams.recipient = that;
	            signalingChannel.sendConnected(signalParams).done(null, function errorHandler(err) {
	                signalParams.call.hangup();
	            });
	        };
	        params.signalAnswer = function (signalParams) {
	            var onSuccess = signalParams.onSuccess;
	            var onError = signalParams.onError;
	            delete signalParams.onSuccess;
	            delete signalParams.onError;

	            signalParams.target = 'directConnection';
	            signalParams.recipient = that;
	            signalParams.signalType = 'answer';
	            signalingChannel.sendSDP(signalParams).then(onSuccess, onError).done(null, function errorHandler(err) {
	                signalParams.call.hangup({signal: false});
	            });
	        };
	        params.signalCandidate = function (signalParams) {
	            signalParams.target = 'directConnection';
	            signalParams.recipient = that;
	            return signalingChannel.sendCandidate(signalParams);
	        };
	        params.signalHangup = function (signalParams) {
	            signalParams.target = 'directConnection';
	            signalParams.recipient = that;
	            signalingChannel.sendHangup(signalParams).done();
	        };
	        params.signalReport = function (signalParams) {
	            signalParams.report.target = 'directConnection';
	            log.debug("Not sending report");
	            log.debug(signalParams.report);
	        };
	        params.needDirectConnection = true;
	        // Don't include audio in the offer SDP
	        params.offerOptions = {
	            mandatory: {
	                OfferToReceiveAudio: false
	            }
	        };

	        params.signalingChannel = signalingChannel;
	        call = respoke.Call(params);
	        addCall({call: call});
	        call.listen('direct-connection', function directConnectionHandler(evt) {
	            that.directConnection = evt.directConnection;
	            if (params.caller !== true) {
	                if (!client.hasListeners('direct-connection') &&
	                        !client.hasListeners('direct-connection') &&
	                        !call.hasListeners('direct-connection')) {
	                    that.directConnection.reject();
	                    deferred.reject(new Error("Got an incoming direct connection with no handlers to accept it!"));
	                    return;
	                }

	                deferred.resolve(that.directConnection);
	                that.directConnection.listen('close', function closeHandler(evt) {
	                    that.directConnection = undefined;
	                }, true);
	            }
	        }, true);

	        return retVal;
	    };

	    /**
	     * Default presence list.
	     * @private
	     */
	    var PRESENCE_CONSTANTS = ['chat', 'available', 'away', 'dnd', 'xa', 'unavailable'];

	    /**
	     * Find the presence out of all known connections with the highest priority (most availability)
	     * and set it as the endpoint's resolved presence.
	     * @memberof! respoke.Endpoint
	     * @method respoke.Endpoint.resolvePresence
	     * @private
	     */
	    that.resolvePresence = function () {

	        var presenceList = that.connections.map(function (connection) {
	            return connection.presence;
	        });

	        if (resolveEndpointPresence !== undefined) {
	            that.presence = resolveEndpointPresence(presenceList);
	        } else {
	            var idList;

	            /*
	             * Sort the connections array by the priority of the value of the presence of that
	             * connectionId. This will cause the first element in the list to be the id of the
	             * session with the highest priority presence so we can access it by the 0 index.
	             * TODO: If we don't really care about the sorting and only about the highest priority
	             * we could use Array.prototype.every to improve this algorithm.
	             */
	            idList = that.connections.sort(function sorter(a, b) {
	                var indexA = PRESENCE_CONSTANTS.indexOf(a.presence);
	                var indexB = PRESENCE_CONSTANTS.indexOf(b.presence);
	                // Move it to the end of the list if it isn't one of our accepted presence values
	                indexA = indexA === -1 ? 1000 : indexA;
	                indexB = indexB === -1 ? 1000 : indexB;
	                return indexA < indexB ? -1 : (indexB < indexA ? 1 : 0);
	            });

	            if (idList[0]) {
	                that.presence = idList[0].presence;
	            } else {
	                that.presence = 'unavailable';
	            }
	        }
	    };

	    /**
	     * Get the Connection with the specified id. The connection ID is optional if only one connection exists.
	     *
	     *     var connection = endpoint.getConnection({
	     *         connectionId: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXX"
	     *     });
	     *
	     * @memberof! respoke.Endpoint
	     * @method respoke.Endpoint.getConnection
	     * @private
	     * @param {object} params
	     * @param {string} [params.connectionId]
	     * @return {respoke.Connection}
	     */
	    that.getConnection = function (params) {
	        var connection = null;
	        params = params || {};
	        if (that.connections.length === 1 &&
	                (!params.connectionId || that.connections[0] === params.connectionId)) {
	            return that.connections[0];
	        }

	        if (!params || !params.connectionId) {
	            throw new Error("Can't find a connection without the connectionId.");
	        }

	        that.connections.every(function eachConnection(conn) {
	            if (conn.id === params.connectionId) {
	                connection = conn;
	                return false;
	            }
	            return true;
	        });

	        return connection;
	    };

	    /**
	     * Called to indicate that a connection for this endpoint has joined a
	     * group.
	     *
	     * @private
	     * @returns {number} Number of groups this endpoint is a member of.
	     */
	    that.joinedGroup = function () {
	        ++that.groupConnectionCount;
	    };

	    /**
	     * Called to indicate that a connection for this endpoint has left a
	     * group.
	     *
	     * @private
	     * @returns {number} Number of groups this endpoint is a member of.
	     */
	    that.leftGroup = function () {
	        --that.groupConnectionCount;
	    };

	    return that;
	}; // End respoke.Endpoint
	/**
	 * Handle messages sent to the logged-in user from this one Endpoint.  This callback is called every time
	 * respoke.Endpoint#message fires.
	 * @callback respoke.Endpoint.onMessage
	 * @param {respoke.Event} evt
	 * @param {respoke.TextMessage} evt.message - the message
	 * @param {respoke.Endpoint} evt.target
	 * @param {string} evt.name - the event name
	 */
	/**
	 * Handle presence notifications from this one Endpoint.  This callback is called every time
	 * respoke.Endpoint#message fires.
	 * @callback respoke.Endpoint.onPresence
	 * @param {respoke.Event} evt
	 * @param {string|number|object|Array} evt.presence - the Endpoint's presence
	 * @param {respoke.Endpoint} evt.target
	 * @param {string} evt.name - the event name
	 */
	 /**
	 * Handle resolving presence for this endpoint
	 * @callback respoke.Client.resolveEndpointPresence
	 * @param {Array<object>} connectionPresence
	 * @returns {object|string|number}
	 */


/***/ },
/* 12 */
/***/ function(module, exports) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	/**
	 * A text message and the information needed to route it.
	 * @class respoke.TextMessage
	 * @constructor
	 * @param {object} params
	 * @param {string} [params.endpointId] - If sending, endpoint ID of the thing we're sending a message to.
	 * @param {string} [params.cSelf] - Copy this client's own endpoint on this message so that they arrive
	 * at other devices it might be logged into elsewhere.
	 * @param {string} [params.connectionId] - If sending, connection ID of the thing we're sending a message to.
	 * @param {string} [params.message] - If sending, a message to send
	 * @param {object} [params.rawMessage] - If receiving, the parsed JSON we got from the server
	 * @private
	 * @returns {respoke.TextMessage}
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    var that = {};

	    /**
	     * Parse rawMessage and set attributes required for message delivery.
	     * @memberof! respoke.TextMessage
	     * @method respoke.TextMessage.parse
	     * @private
	     */
	    function parse() {
	        if (params.rawMessage) {
	            try {
	                that.endpointId = params.rawMessage.header.from;
	                that.originalRecipient = params.rawMessage.header.toOriginal;
	                that.connectionId = params.rawMessage.header.fromConnection;
	                that.timestamp = params.rawMessage.header.timestamp;
	            } catch (e) {
	                throw new Error(e);
	            }
	            that.message = params.rawMessage.message || params.rawMessage.body;
	            if (params.rawMessage.header.channel) {
	                that.recipient = params.rawMessage.header.channel;
	            }
	        } else {
	            try {
	                that.to = params.endpointId;
	                that.ccSelf = params.ccSelf;
	                that.toConnection = params.connectionId;
	                that.requestConnectionReply = (params.requestConnectionReply === true);
	                that.push = (params.push === true);
	            } catch (e) {
	                throw new Error(e);
	            }
	            that.message = params.message;
	        }
	    }

	    parse();
	    return that;
	}; // End respoke.TextMessage


/***/ },
/* 13 */
/***/ function(module, exports) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	/**
	 * A signaling message and the information needed to route it.
	 * @class respoke.SignalingMessage
	 * @constructor
	 * @param {object} params
	 * @param {string} [params.fromEndpoint] - If sending, the endpoint ID of the recipient
	 * @param {string} [params.fromConnection] - If sending, the connection ID of the recipient
	 * @param {string} [params.connectionId] - The connectionId of the endpoint whose answer signal has been accepted.
	 * @param {string} [params.signal] - If sending, a message to send
	 * @param {respoke.Endpoint} [params.recipient]
	 * @param {string} [params.signalType]
	 * @param {string} [params.sessionId] - A globally unique ID to identify this call.
	 * @param {string} [params.target] - Either 'call' or 'directConnection', TODO remove the need for this.
	 * @param {string} [params.callerId] - Human readable caller ID. Not implemented.
	 * @param {RTCSessionDescription} [params.sdp]
	 * @param {Array<RTCIceCandidate>} [params.iceCandidates]
	 * @param {object} [params.offering] - Object describing the media we're offering to send the remote party in a more
	 * usable way than SDP. Not implemented.
	 * @param {object} [params.requesting] - Object describing the media we're requesting from the remote party in a more
	 * usable way than SDP. Not implemented.
	 * @param {string} [params.reason] - Human readable reason for hanging up.
	 * @param {string} [params.error] - String indicating that a previous signal was malformed or received in the wrong
	 * state. Not implemented.
	 * @param {string} [params.status] - "Ringing". Not implemented.
	 * @param {object} [params.rawMessage] - If receiving, the parsed JSON we got from the server
	 * @private
	 * @returns {respoke.SignalingMessage}
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    var that = {};

	    /**
	     * Attributes without which we cannot build a signaling message.
	     * @memberof! respoke.SignalingMessage
	     * @name required
	     * @private
	     */
	    var required = ['signalType', 'sessionId', 'target', 'signalId'];

	    /**
	     * Attributes which we will copy onto the signal if defined.
	     * @memberof! respoke.SignalingMessage
	     * @name required
	     * @private
	     */
	    var optional = [
	        'sessionDescription', 'iceCandidates', 'offering', 'callerId', 'requesting',
	        'reason', 'error', 'status', 'connectionId', 'finalCandidates', 'metadata',
	        'action'
	    ];

	    /**
	     * Parse rawMessage and set attributes required for message delivery.
	     * @memberof! respoke.SignalingMessage
	     * @method respoke.SignalingMessage.parse
	     * @private
	     */
	    function parse() {
	        if (params.rawMessage) {
	            try {
	                that = JSON.parse(params.rawMessage.body); // Incoming message
	            } catch (e) {
	                that = params.rawMessage.body;
	            }
	            that.fromType = params.rawMessage.header.fromType;
	            that.fromEndpoint = params.rawMessage.header.from;
	            that.fromConnection = params.rawMessage.header.fromConnection;
	            that.timestamp = params.rawMessage.header.timestamp;

	            if (!that.target) {
	                that.target = 'call';
	            }
	        } else {
	            required.forEach(function eachAttr(attr) {
	                if (!params.hasOwnProperty(attr)) {
	                    throw new Error("Can't build a signaling without " + attr);
	                }
	                that[attr] = params[attr];
	            });

	            optional.forEach(function eachAttr(attr) {
	                if (params.hasOwnProperty(attr)) {
	                    that[attr] = params[attr];
	                }
	            });
	        }
	    }

	    parse();

	    that.version = '1.0';

	    return that;
	}; // End respoke.SignalingMessage


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	var Q = __webpack_require__(8);
	var respoke = __webpack_require__(1);

	/**
	 * A `respoke.Group` represents a collection of endpoints.
	 *
	 * There are methods to communicate with the endpoints at the group level and track
	 * their presence in the group.
	 *
	 * @class respoke.Group
	 * @augments respoke.EventEmitter
	 * @constructor
	 * @param {object} params
	 * @param {string} params.instanceId
	 * @param {respoke.Group.onJoin} params.onJoin - A callback to receive notifications every time a new
	 * endpoint has joined the group. This callback does not get called when the client joins the group.
	 * @param {respoke.Group.onMessage} params.onMessage - A callback to receive messages sent to the group from
	 * remote endpoints.
	 * @param {respoke.Group.onLeave} params.onLeave - A callback to receive notifications every time a new
	 * endpoint has left the group. This callback does not get called when the client leaves the group.
	 * @returns {respoke.Group}
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};

	    var that = respoke.EventEmitter(params);
	    /**
	     * @memberof! respoke.Group
	     * @name instanceId
	     * @private
	     * @type {string}
	     */
	    var instanceId = params.instanceId;
	    var client = respoke.getClient(instanceId);

	    if (!that.id) {
	        throw new Error("Can't create a group without an ID.");
	    }

	    /**
	     * Indicates whether there have been group membership changes since the last time we performed
	     * a network request to list group members.
	     * @memberof! respoke.Group
	     * @name cacheIsValid
	     * @private
	     * @type {boolean}
	     */
	    var cacheIsValid = false;

	    /**
	     * Internal reference to the api signaling channel.
	     * @memberof! respoke.Group
	     * @name signalingChannel
	     * @type respoke.SignalingChannel
	     * @private
	     */
	    var signalingChannel = params.signalingChannel;
	    delete params.signalingChannel;

	    /**
	     * The connections to members of this group.
	     * @memberof! respoke.Group
	     * @name endpoints
	     * @type {array<respoke.Connection>}
	     */
	    that.connections = [];
	    /**
	     * A name to identify the type of this object.
	     * @memberof! respoke.Group
	     * @name className
	     * @type {string}
	     */
	    that.className = 'respoke.Group';
	    that.listen('join', params.onJoin);
	    /**
	     * Indicates that a message has been sent to this group.
	     * @event respoke.Group#message
	     * @type {respoke.Event}
	     * @property {respoke.TextMessage} message
	     * @property {string} name - The event name.
	     * @property {respoke.Group} target
	     */
	    that.listen('message', params.onMessage);
	    that.listen('leave', params.onLeave);

	    /**
	     * Clear out the connections within this group. Called when we're no longer
	     * connected to the group.
	     * @private
	     */
	    function clearConnections() {
	        that.connections.forEach(function (connection) {
	            connection.getEndpoint().leftGroup();
	        });
	        that.connections = [];
	    }

	    client.listen('disconnect', function disconnectHandler() {
	        cacheIsValid = false;
	        clearConnections();
	    }, true);

	    delete that.instanceId;
	    delete that.onMessage;
	    delete that.onPresence;
	    delete that.onJoin;
	    delete that.onLeave;

	    /**
	     * Join this group.
	     *
	     *     group.join().done(function () {
	     *         group.sendMessage({
	     *             message: "Hey, ppl! I'm here!"
	     *         });
	     *     }, function (err) {
	     *         // Couldn't join the group, possibly permissions error
	     *     });
	     *
	     * **Using callbacks** will disable promises.
	     *
	     * @memberof! respoke.Group
	     * @method respoke.Group.join
	     * @return {Promise|undefined}
	     * @param {object} params
	     * @param {respoke.Client.joinHandler} [params.onSuccess] - Success handler for this invocation of
	     * this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @fires respoke.Client#join
	     */
	    that.join = function () {
	        var params = {
	            id: that.id
	        };
	        var promise;
	        var deferred;
	        var retVal;
	        cacheIsValid = false;

	        try {
	            validateConnection();
	        } catch (err) {
	            deferred = Q.defer();
	            retVal = respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);
	            deferred.reject(err);
	            return retVal;
	        }

	        promise = client.join(params);
	        retVal = respoke.handlePromise(promise, params.onSuccess, params.onError);
	        return retVal;
	    };

	    /**
	     * Leave this group. If this method is called multiple times synchronously, it will batch requests and
	     * only make one API call to Respoke.
	     *
	     *     group.leave({
	     *         onSuccess: function () {
	     *             // good riddance
	     *         },
	     *         onError: function (err) {
	     *             // Couldn't leave the group, possibly a permissions error
	     *         }
	     *     });
	     *
	     * @memberof! respoke.Group
	     * @method respoke.Group.leave
	     * @param {object} params
	     * @param {respoke.Client.joinHandler} [params.onSuccess] - Success handler for this invocation of
	     * this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @return {Promise|undefined}
	     * @fires respoke.Client#leave
	     */
	    that.leave = function (params) {
	        params = params || {};
	        var deferred = Q.defer();
	        var retVal = respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);

	        try {
	            validateConnection();
	            validateMembership();
	        } catch (err) {
	            deferred.reject(err);
	            return retVal;
	        }

	        signalingChannel.leaveGroup({
	            groupList: [that.id]
	        }).done(function successHandler() {
	            clearConnections();
	            deferred.resolve();
	            cacheIsValid = false;

	            /**
	             * This event is fired when the client leaves a group.
	             * @event respoke.Client#leave
	             * @type {respoke.Event}
	             * @property {respoke.Group} group
	             * @property {string} name - the event name.
	             * @property {respoke.Client} target
	             * @private
	             */
	            client.fire('leave', {
	                group: that
	            });
	        }, function errorHandler(err) {
	            deferred.reject();
	        });
	        return retVal;
	    };

	    /**
	     * Remove a Connection from a Group. This does not change the status of the remote Endpoint, it only changes the
	     * internal representation of the Group membership. This method should only be used internally.
	     * @private
	     * @memberof! respoke.Group
	     * @method respoke.Group.removeMember
	     * @param {object} params
	     * @param {string} [params.connectionId] - Endpoint's connection id
	     * @fires respoke.Group#leave
	     */
	    that.removeMember = function (params) {
	        params = params || {};

	        try {
	            validateConnection();
	            validateMembership();
	        } catch (err) {
	            return;
	        }

	        if (!params.connectionId) {
	            throw new Error("Can't remove a member to the group without it's Connection id.");
	        }

	        cacheIsValid = false;

	        that.connections.every(function eachConnection(conn, index) {
	            if (conn.id === params.connectionId) {
	                that.connections.splice(index, 1);
	                conn.getEndpoint().leftGroup();

	                /**
	                 * This event is fired when a member leaves a group the client is a member of.
	                 * @event respoke.Group#leave
	                 * @type {respoke.Event}
	                 * @property {respoke.Connection} connection - The connection that left the group.
	                 * @property {string} name - The event name.
	                 * @property {respoke.Group} target
	                 */
	                that.fire('leave', {
	                    connection: conn
	                });
	                return false;
	            }
	            return true;
	        });
	    };

	    /**
	     * Return true if the logged-in user is a member of this group and false if not.
	     *
	     *     if (group.isJoined()) {
	     *         // I'm a member!
	     *     } else {
	     *         // Maybe join here
	     *     }
	     *
	     * @memberof! respoke.Group
	     * @method respoke.Group.isJoined
	     * @returns {boolean}
	     */
	    that.isJoined = function () {
	        // connections array contains some connections and ours is among them.
	        return (that.connections.length > 0 && !that.connections.every(function (conn) {
	            return conn.id !== client.connectionId;
	        }));
	    };

	    /**
	     * Add a Connection to a group. This does not change the status of the remote Endpoint, it only changes the
	     * internal representation of the Group membership. This method should only be used internally.
	     * @memberof! respoke.Group
	     * @private
	     * @method respoke.Group.addMember
	     * @param {object} params
	     * @param {respoke.Connection} params.connection
	     * @fires respoke.Group#join
	     */
	    that.addMember = function (params) {
	        params = params || {};
	        var absent;

	        validateConnection();

	        if (!params.connection) {
	            throw new Error("Can't add a member to the group without it's Connection object.");
	        }

	        cacheIsValid = false;

	        absent = that.connections.every(function eachConnection(conn) {
	            return (conn.id !== params.connection.id);
	        });

	        if (absent) {
	            that.connections.push(params.connection);
	            params.connection.getEndpoint().joinedGroup();
	            if (params.skipEvent) {
	                return;
	            }

	            /**
	             * This event is fired when a member joins a Group that the currently logged-in endpoint is a member
	             * of.
	             * @event respoke.Group#join
	             * @type {respoke.Event}
	             * @property {respoke.Connection} connection - The connection that joined the group.
	             * @property {string} name - The event name.
	             * @property {respoke.Group} target
	             */
	            that.fire('join', {
	                connection: params.connection
	            });
	        }
	    };

	    /**
	     * Validate that the client is connected to the Respoke infrastructure.
	     * @memberof! respoke.Group
	     * @method respoke.Group.validateConnection
	     * @private
	     */
	    function validateConnection() {
	        if (!signalingChannel || !signalingChannel.isConnected()) {
	            throw new Error("Can't complete request when not connected. Please reconnect!");
	        }
	    }

	    /**
	     * Validate that the client is a member of this group.
	     * @memberof! respoke.Group
	     * @method respoke.Group.validateMembership
	     * @private
	     */
	    function validateMembership() {
	        if (!that.isJoined()) {
	            throw new Error("Not a member of this group anymore.");
	        }
	    }

	    /**
	     *
	     * Send a message to all of the endpoints in the group.
	     *
	     *      var group = client.getGroup({ id: 'js-enthusiasts'});
	     *
	     *      group.sendMessage({
	     *          message: "Cat on keyboard",
	     *          onSuccess: function (evt) {
	     *              console.log('Message was sent');
	     *          }
	     *      });
	     *
	     * @memberof! respoke.Group
	     * @method respoke.Group.sendMessage
	     * @param {object} params
	     * @param {string} params.message - The message.
	     * @param {boolean} [params.push=false] - Whether or not the message should be considered for push notifications to
	     * mobile devices.
	     * @param {function} params.onSuccess - Success handler indicating that the message was delivered.
	     * @param {function} params.onError - Error handler indicating that the message was not delivered.
	     * @returns {Promise|undefined}
	     */
	    that.sendMessage = function (params) {
	        params = params || {};
	        params.id = that.id;
	        var promise;

	        try {
	            validateConnection();
	            validateMembership();
	        } catch (err) {
	            promise = Q.reject(err);
	        }

	        return respoke.handlePromise(promise ? promise : signalingChannel.publish(params),
	                params.onSuccess, params.onError);
	    };

	    /**
	     * Get group members
	     *
	     * Get an array containing all connections subscribed to the group. Accepts onSuccess or onError parameters,
	     * or it returns a promise that you can observe. An endpoint may have more than one connection subscribed to
		 * a group, so if you're interested in unique endpoints, you may want to filter the connections by endpointId.
	     *
	     *     group.getMembers({
	     *         onSuccess: function (connections) {
	     *             connections.forEach(function (connection) {
	     *                 console.log(connection.endpointId);
	     *             });
	     *         }
	     *     });
	     *
	     * @memberof! respoke.Group
	     * @method respoke.Group.getMembers
	     * @param {object} params
	     * @param {respoke.Client.joinHandler} [params.onSuccess] - Success handler for this invocation of this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Success handler for this invocation of this method only.
	     * @returns {Promise<Array>} A promise to an array of Connections.
	     */
	    that.getMembers = function (params) {
	        params = params || {};
	        var deferred = Q.defer();
	        var retVal = respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);

	        try {
	            validateConnection();
	            validateMembership();
	        } catch (err) {
	            deferred.reject(err);
	            return retVal;
	        }

	        if (that.connections.length > 0 && cacheIsValid) {
	            deferred.resolve(that.connections);
	            return retVal;
	        }

	        signalingChannel.getGroupMembers({
	            id: that.id
	        }).done(function successHandler(list) {
	            var endpointList = [];
	            list.forEach(function eachMember(params) {
	                var connection = client.getConnection({
	                    endpointId: params.endpointId,
	                    connectionId: params.connectionId,
	                    skipCreate: true
	                });

	                if (!connection) {
	                    // Create the connection
	                    connection = client.getConnection({
	                        endpointId: params.endpointId,
	                        connectionId: params.connectionId
	                    });
	                }

	                if (endpointList.indexOf(params.endpointId) === -1) {
	                    endpointList.push(params.endpointId);
	                }
	                that.addMember({
	                    connection: connection,
	                    skipEvent: true
	                });
	            });

	            cacheIsValid = true;

	            deferred.resolve(that.connections);
	        }, function errorHandler(err) {
	            deferred.reject(err);
	        });
	        return retVal;
	    };

	    /**
	     * Experimental. Create a new conference call. The ID will be the group name. Only members of this group will
	     * be permitted to participate in the conference call.
	     *
	     *     group.joinConference({
	     *         onConnect: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.Group
	     * @method respoke.Group.joinConference
	     * @private
	     * @param {object} params
	     * @param {string|boolean} params.audio - Whether participant should send and receive audio. Boolean `true`
	     * indicates send and receive. Boolean `false` indicates neither send nor receive. Strings `send` and `receive`
	     * indicate send only and receive only respectively.
	     * @param {string|boolean} params.video - Whether participant should send and receive audio. Boolean `true`
	     * indicates send and receive. Boolean `false` indicates neither send nor receive. Strings `send` and `receive`
	     * indicate send only and receive only respectively.
	     * @param {boolean} params.mixAudio - Whether Respoke should mix all the audio streams together to save bandwidth
	     * for this one participant.
	     * @arg {respoke.Conference.onJoin} [params.onJoin] - Callback for when a participant joins the conference.
	     * @arg {respoke.Conference.onLeave} [params.onLeave] - Callback for when a participant leaves the conference.
	     * @arg {respoke.Conference.onMessage} [params.onMessage] - Callback for when a message is sent to the conference.
	     * @param {respoke.Conference.onMute} [params.onMute] - Callback for when local or remote media is muted or unmuted.
	     * @arg {respoke.Conference.onTopic} [params.onTopic] - Callback for the conference topic changes.
	     * @arg {respoke.Conference.onPresenter} [params.onPresenter] - Callback for when the presenter changes.
	     * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	     * media renegotiation.
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for when the screenshare is connected
	     * and the remote party has received the video.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for being notified when the call has been
	     * hung up.
	     * @param {respoke.Call.onAllow} [params.onAllow] - When setting up a call, receive notification that the
	     * browser has granted access to media.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for receiving statistical
	     * information.
	     * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	     * relay servers. If it cannot flow through relay servers, the call will fail.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @returns {respoke.Conference}
	     */
	    that.joinConference = function (params) {
	        var conference = null;
	        params = params || {};
	        params.id = that.id;

	        conference = client.joinConference(params);
	        return conference;
	    };

	    return that;
	}; // End respoke.Group
	/**
	 * Receive notification that an endpoint has joined this group. This callback is called everytime
	 * respoke.Group#join is fired.
	 * @callback respoke.Group.onJoin
	 * @param {respoke.Event} evt
	 * @param {respoke.Connection} evt.connection
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Group} evt.target
	 */
	/**
	 * Receive notification that an endpoint has left this group. This callback is called everytime
	 * respoke.Group#leave is fired.
	 * @callback respoke.Group.onLeave
	 * @param {respoke.Event} evt
	 * @param {respoke.Connection} evt.connection
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Group} evt.target
	 */
	/**
	 * Receive notification that a message has been received to a group. This callback is called every time
	 * respoke.Group#message is fired.
	 * @callback respoke.Group.onMessage
	 * @param {respoke.Event} evt
	 * @param {respoke.TextMessage} evt.message
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Group} evt.target
	 */
	/**
	 * Get a list of the Connections which are members of this Group.
	 * @callback respoke.Group.connectionsHandler
	 * @param {Array<respoke.Connection>} connections
	 */


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */
	'use strict';

	var Q = __webpack_require__(8);
	var respoke = __webpack_require__(1);
	var template = __webpack_require__(16);
	var log = respoke.log;

	var sdkHeaderValue = 'Respoke.js/' + respoke.version;

	var billingSuspensionErrorMessage = "Can't perform this action: Not Authorized. Your account is suspended due to a " +
	    "billing issue. Please visit the Respoke Developer Portal (https://www.respoke.io) or contact customer support " +
	    "(support@respoke.io) to address this issue.";

	var suspensionErrorMessage = "Canot perform this action: Not Authorized. Your account is suspended. Please visit " +
	    "the Respoke Developer Portal (https://www.respoke.io) or contact customer support (support@respoke.io) to " +
	    "address this issue.";

	/**
	 * Returns a timestamp, measured in milliseconds.
	 *
	 * This method will use high resolution time, if available. Otherwise it falls back to just
	 * using the wall clock.
	 *
	 * @return {number} Number of milliseconds that have passed since some point in the past.
	 * @private
	 */
	var now;
	if (window.performance && window.performance.now) {
	    now = window.performance.now.bind(window.performance);
	} else if (Date.now) {
	    now = Date.now.bind(Date);
	} else {
	    now = function () {
	        return new Date().getTime();
	    };
	}

	/**
	 * Container for holding requests that are currently waiting on responses.
	 * @returns {PendingRequests}
	 * @private
	 * @constructor
	 */
	var PendingRequests = function () {
	    /**
	     * Pending requests.
	     * @private
	     * @type {Array}
	     */
	    var contents = [];
	    /**
	     * Counter to provide the next id.
	     * @private
	     * @type {number}
	     */
	    var counter = 0;
	    var that = {};

	    /**
	     * Add a new pending request.
	     *
	     * @memberof PendingRequests
	     * @param obj
	     * @returns {*} The key to use for the `remove` method.
	     */
	    that.add = function (obj) {
	        contents[counter] = obj;
	        counter++;
	        return counter;
	    };

	    /**
	     * Remove a pending request.
	     *
	     * @param {*} key Key returned from `add` method.
	     */
	    that.remove = function (key) {
	        delete contents[key];
	    };

	    /**
	     * Disposes of any currently pending requests, synchronously invoking the provided function on
	     * each.
	     *
	     * @param {function} [fn] Callback for pending requests.
	     */
	    that.reset = function (fn) {
	        if (fn) {
	            contents.forEach(fn);
	        }
	        contents = [];
	    };

	    return that;
	};

	/**
	 * The purpose of this class is to make a method call for each API call
	 * to the backend REST interface.  This class takes care of App authentication, websocket connection,
	 * Endpoint authentication, and all App interactions thereafter.  Almost all methods return a Promise.
	 * @class respoke.SignalingChannel
	 * @constructor
	 * @augments respoke.EventEmitter
	 * @param {object} params
	 * @param {string} params.instanceId - client id
	 * @private
	 * @returns {respoke.SignalingChannel}
	 */
	module.exports = function (params) {
	    params = params || {};
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name instanceId
	     * @private
	     * @type {string}
	     */
	    var instanceId = params.instanceId;
	    var that = respoke.EventEmitter(params);
	    delete that.instanceId;
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name className
	     * @type {string}
	     * @private
	     */
	    that.className = 'respoke.SignalingChannel';

	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name client
	     * @private
	     * @type {respoke.Client}
	     */
	    var client = respoke.getClient(instanceId);
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name socket
	     * @private
	     * @type {Socket.io.Socket}
	     */
	    that.socket = null;
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name clientSettings
	     * @private
	     * @type {object}
	     */
	    var clientSettings = params.clientSettings;
	    delete that.clientSettings;
	    clientSettings.baseURL = clientSettings.baseURL || 'https://api.respoke.io';
	    /**
	     * A map to avoid duplicate endpoint presence registrations.
	     * @memberof! respoke.SignalingChannel
	     * @name presenceRegistered
	     * @private
	     * @type {object}
	     */
	    var presenceRegistered = {};
	    /**
	     * A reference to the private function Client.actuallyConnect that gets set in SignalingChannel.open() so we
	     * don't have to make it public.
	     * @memberof! respoke.SignalingChannel
	     * @name actuallyConnect
	     * @private
	     * @type {function}
	     */
	    var actuallyConnect = null;
	    /**
	     * Set of promises for any pending requests on the WebSocket.
	     * @private
	     * @type {PendingRequests}
	     */
	    var pendingRequests = PendingRequests();
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name reconnectTimeout
	     * @private
	     * @type {number}
	     */
	    var reconnectTimeout = null;
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name maxReconnectTimeout
	     * @private
	     * @type {number}
	     */
	    var maxReconnectTimeout = 5 * 60 * 1000;
	    /**
	     * Rejects a message if the body size is greater than this. It is enforced servcer side, so changing this
	     * won't make the bodySizeLimit any bigger, this just gives you a senseable error if it's too big.
	     * @memberof! respoke.signalingChannel
	     * @name bodySizeLimit
	     * @private
	     * @type {number}
	     */
	    var bodySizeLimit = 20000;
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name appId
	     * @private
	     * @type {string}
	     */
	    var appId = null;
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name endpointId
	     * @private
	     * @type {string}
	     */
	    var endpointId = null;
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name token
	     * @private
	     * @type {string}
	     */
	    var token = null;
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name appToken
	     * @private
	     * @type {string}
	     */
	    var appToken = null;
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name xhr
	     * @private
	     * @type {XMLHttpRequest}
	     */
	    var xhr = new XMLHttpRequest();
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name routingMethods
	     * @private
	     * @type {object}
	     * @desc The methods contained in this object are statically defined methods that are called by constructing
	     * their names dynamically. 'do' + $className + $signalType == 'doCallOffer', et. al.
	     */
	    var routingMethods = {};
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name handlerQueue
	     * @private
	     * @type {object}
	     */
	    var handlerQueue = {
	        'message': [],
	        'signal': [],
	        'presence': []
	    };
	    /**
	     * @memberof! respoke.SignalingChannel
	     * @name errors
	     * @private
	     * @type {object}
	     */
	    var errors = {
	        400: "Can't perform this action: missing or invalid parameters.",
	        401: "Can't perform this action: not authenticated.",
	        403: "Can't perform this action: not authorized.",
	        404: "Item not found.",
	        409: "Can't perform this action: item in the wrong state.",
	        429: "API rate limit was exceeded.",
	        500: "Can't perform this action: server problem."
	    };

	    /**
	     * Indicate whether the signaling channel has a valid connection to Respoke.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.isConnected
	     * @return {boolean}
	     */
	    that.isConnected = function () {
	        return !!(that.socket && that.socket.socket.connected);
	    };

	    /**
	     * Indicate whether the signaling channel is currently waiting on a websocket to connect.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.isConnecting
	     * @private
	     * @return {boolean}
	     */
	    function isConnecting() {
	        return !!(that.socket && that.socket.socket.connecting);
	    }

	    /**
	     * Get the call debug preference.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.isSendingReport
	     * @private
	     * @return {boolean}
	     */
	    that.isSendingReport = function (params) {
	        return clientSettings.enableCallDebugReport;
	    };

	    /**
	     * Open a connection to the REST API and validate the app, creating a session token.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.open
	     * @private
	     * @param {object} params
	     * @param {string} [params.token] - The Endpoint's auth token
	     * @param {string} [params.endpointId] - An identifier to use when creating an authentication token for this
	     * endpoint. This is only used when `developmentMode` is set to `true`.
	     * @return {Promise}
	     */
	    that.open = function (params) {
	        params = params || {};
	        var deferred = Q.defer();
	        log.debug('SignalingChannel.open', params, clientSettings);
	        token = params.token || token;
	        actuallyConnect = typeof params.actuallyConnect === 'function' ? params.actuallyConnect : actuallyConnect;

	        Q.fcall(function tokenPromise() {
	            if (clientSettings.developmentMode === true && clientSettings.appId && params.endpointId) {
	                return that.getToken({
	                    appId: clientSettings.appId,
	                    endpointId: params.endpointId
	                });
	            }
	            return null;
	        }).then(function successHandler(newToken) {
	            token = newToken || token;
	            return doOpen({token: token});
	        }).done(function successHandler() {
	            deferred.resolve();
	            log.debug('client', client);
	        }, function errorHandler(err) {
	            deferred.reject(err);
	        });

	        return deferred.promise;
	    };

	    /**
	     * Get a developer mode token for an endpoint. App must be in developer mode.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.getToken
	     * @private
	     * @param {object} params
	     * @param {string} [params.endpointId] - An identifier to use when creating an authentication token for this
	     * endpoint. This is only used when `developmentMode` is set to `true`.
	     * @return {Promise<String>}
	     */
	    that.getToken = function (params) {
	        params = params || {};
	        var deferred = Q.defer();
	        log.debug('SignalingChannel.getToken', params);

	        var callParams = {
	            path: '/v1/tokens',
	            httpMethod: 'POST',
	            parameters: {
	                appId: clientSettings.appId,
	                endpointId: params.endpointId,
	                ttl: 60 * 60 * 6
	            }
	        };

	        call(callParams).done(function (response) {
	            if (response.statusCode === 200 && response.body && response.body.tokenId) {
	                token = response.body.tokenId;
	                deferred.resolve(response.body.tokenId);
	                return;
	            }

	            var errorMessage = "Couldn't get a developer mode token. ";
	            if (isBillingSuspensionUnauthorizedResponse(response)) {
	                errorMessage += billingSuspensionErrorMessage;
	            } else if (isSuspensionUnauthorizedResponse(response)) {
	                errorMessage += suspensionErrorMessage;
	            } else {
	                errorMessage += response.error;
	            }

	            deferred.reject(buildResponseError(response, errorMessage));
	        }, function (err) {
	            deferred.reject(new Error("Couldn't get a developer mode token. " + err.message));
	        });
	        return deferred.promise;
	    };

	    /**
	     * Open a connection to the REST API and validate the app, creating a session token.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.doOpen
	     * @param {object} params
	     * @param {string} params.token - The Endpoint's auth token
	     * @return {Promise}
	     * @private
	     */
	    function doOpen(params) {
	        params = params || {};
	        var deferred = Q.defer();
	        log.debug('SignalingChannel.doOpen', params);

	        if (!params.token) {
	            deferred.reject(new Error("Can't open connection to Respoke without a token."));
	            return deferred.promise;
	        }

	        call({
	            path: '/v1/session-tokens',
	            httpMethod: 'POST',
	            parameters: {
	                tokenId: params.token
	            }
	        }).done(function (response) {
	            if (response.statusCode === 200) {
	                appToken = response.body.token;
	                deferred.resolve();
	                log.debug("Signaling connection open to", clientSettings.baseURL);
	                return;
	            }

	            var errorMessage = "Couldn't authenticate app. ";
	            if (isBillingSuspensionUnauthorizedResponse(response)) {
	                errorMessage += billingSuspensionErrorMessage;
	            } else if (isSuspensionUnauthorizedResponse(response)) {
	                errorMessage += suspensionErrorMessage;
	            } else {
	                errorMessage += response.error;
	            }

	            deferred.reject(buildResponseError(response, errorMessage));
	        }, function (err) {
	            log.error("Network call failed:", err.message);
	            deferred.reject(new Error("Couldn't authenticate app. " + err.message));
	        });

	        return deferred.promise;
	    }

	    /**
	     * Close a connection to the REST API. Invalidate the session token.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.close
	     * @private
	     * @return {Promise}
	     */
	    that.close = function () {
	        var deferred = Q.defer();

	        wsCall({
	            path: '/v1/connections/{id}/',
	            httpMethod: 'DELETE',
	            urlParams: {
	                id: client.endpointId
	            }
	        }).fin(function finallyHandler() {
	            return call({
	                path: '/v1/session-tokens',
	                httpMethod: 'DELETE'
	            });
	        }).fin(function finallyHandler() {
	            if (that.socket) {
	                that.socket.removeAllListeners();
	                that.socket.disconnect();
	            }
	            that.socket = null;
	            deferred.resolve();
	        }).done();

	        return deferred.promise;
	    };

	    /**
	     * Generate and send a presence message representing the client's current status. This triggers
	     * the server to send the client's endpoint's presence.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.sendPresence
	     * @private
	     * @param {object} params
	     * @param {string|number|object|Array} [params.presence=available]
	     * @param {string} [params.status] - Non-enumeration human-readable status.
	     * @param {string} [params.show] - I can't remember what this is.
	     * @returns {Promise}
	     */
	    that.sendPresence = function (params) {
	        params = params || {};
	        var deferred = Q.defer();
	        log.debug("Signaling sendPresence");

	        if (!that.isConnected()) {
	            deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            return deferred.promise;
	        }

	        wsCall({
	            path: '/v1/presence',
	            httpMethod: 'POST',
	            parameters: {
	                'presence': {
	                    show: params.show,
	                    'status': params.status,
	                    type: params.presence || "available"
	                }
	            }
	        }).done(function successHandler() {
	            deferred.resolve();
	        }, function errorHandler(err) {
	            deferred.reject(err);
	        });
	        return deferred.promise;
	    };

	    /**
	     * If the logged-in endpoint has permission through its Respoke role, forcibly remove another participant
	     * from the conference, ending its conference call.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.removeConferenceParticipant
	     * @private
	     * @param {object} params
	     * @param {string} [endpointId] - The endpoint id of the endpoint to be removed
	     * @param {string} [connectionId] - The connection id of the connection to be removed
	     * @returns {Promise}
	     */
	    that.removeConferenceParticipant = function (params) {
	        params = params || {};
	        var deferred = Q.defer();
	        var endpointId = params.endpointId;

	        if (!that.isConnected()) {
	            deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            return deferred.promise;
	        }

	        if (!endpointId && params.connectionId) {
	            try {
	                endpointId = client.getConnection({
	                    connectionId: params.connectionId
	                }).getEndpoint().id;
	            } catch (err) {}

	            if (!endpointId) {
	                deferred.reject(new Error("conference.removeParticipant can't figure out what endpoint to remove!"));
	                return deferred.promise;
	            }
	        }

	        wsCall({
	            httpMethod: 'DELETE',
	            path: '/v1/conferences/{id}/participants/{endpointId}',
	            urlParams: {
	                id: params.conferenceId,
	                endpointId: endpointId
	            },
	            parameters: {
	                connectionId: params.connectionId // Optional; It's OK if it's undefined here.
	            }
	        }).then(function successHandler() {
	            deferred.resolve();
	        }, function errorHandler(err) {
	            deferred.reject(err);
	        });

	        return deferred.promise;
	    };

	    /**
	     * If the logged-in endpoint has permission through its Respoke role, close down the conference, removing all
	     * participants.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.destroyConference
	     * @param {object} params
	     * @param {string} params.id
	     * @private
	     * @returns {Promise}
	     */
	    that.destroyConference = function (params) {
	        var deferred = Q.defer();

	        if (!that.isConnected()) {
	            deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            return deferred.promise;
	        }

	        wsCall({
	            httpMethod: 'DELETE',
	            path: '/v1/conferences/{id}/',
	            urlParams: { id: params.conferenceId }
	        }).then(function successHandler() {
	            deferred.resolve();
	        }, function errorHandler(err) {
	            deferred.reject(err);
	        });

	        return deferred.promise;
	    };

	    /**
	     * Retrieve the list of participants in the specified conference.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.getConferenceParticipants
	     * @private
	     * @returns {Promise<respoke.Connection>}
	     * @param {object} params
	     * @param {string} params.id
	     */
	    that.getConferenceParticipants = function (params) {
	        params = params || {};
	        var deferred = Q.defer();

	        if (!that.isConnected()) {
	            deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            return deferred.promise;
	        }

	        wsCall({
	            httpMethod: 'GET',
	            path: '/v1/conferences/{id}/participants/',
	            urlParams: { id: params.id }
	        }).then(function successHandler(participants) {
	            deferred.resolve(participants.map(function (par) {
	                return client.getConnection({
	                    connectionId: par.connectionId,
	                    endpointId: par.endpointId
	                });
	            }));
	        }, function errorHandler(err) {
	            deferred.reject(err);
	        });

	        return deferred.promise;
	    };

	    /**
	     * Get or create a group in the infrastructure.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.getGroup
	     * @private
	     * @returns {Promise<respoke.Group>}
	     * @param {object} params
	     * @param {string} params.name
	     */
	    that.getGroup = function (params) {
	        params = params || {};
	        var deferred = Q.defer();

	        if (!that.isConnected()) {
	            deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            return deferred.promise;
	        }

	        wsCall({
	            httpMethod: 'POST',
	            path: '/v1/channels/',
	            parameters: {
	                name: params.name
	            }
	        }).then(function successHandler(group) {
	            deferred.resolve(group);
	        }, function errorHandler(err) {
	            // Group was already created, just return back the same params we were given.
	            deferred.resolve({id: params.name});
	        });

	        return deferred.promise;
	    };

	    /**
	     * Leave a group. In order to aggregate subsequent repeated requests, this function, when called synchronously,
	     * will continue to accumulate group ids until the next tick of the event loop, when the request will be
	     * issued. The same instance of Promise is returned each time.
	     * @memberof! respoke.SignalingChannel
	     * @private
	     * @method respoke.SignalingChannel.leaveGroup
	     * @returns {Promise}
	     * @param {object} params
	     * @param {array} params.groupList
	     */
	    that.leaveGroup = (function () {
	        var groups = {};
	        var deferred = Q.defer();

	        return function (params) {
	            params = params || {};
	            params.groupList = params.groupList || [];

	            var toRun = (Object.keys(groups).length === 0);

	            if (!that.isConnected()) {
	                deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	                return deferred.promise;
	            }

	            params.groupList.forEach(function (id) {
	                if (typeof id === 'string') {
	                    groups[id] = true;
	                }
	            });

	            if (!toRun) {
	                return deferred.promise;
	            }

	            setTimeout(function () {
	                // restart accumulation
	                var groupList = Object.keys(groups);
	                groups = {};
	                var saveDeferred = deferred;
	                deferred = Q.defer();

	                if (groupList.length === 0) {
	                    saveDeferred.resolve();
	                    return;
	                }

	                wsCall({
	                    path: '/v1/groups/',
	                    parameters: {
	                        groups: groupList
	                    },
	                    httpMethod: 'DELETE'
	                }).done(function successHandler() {
	                    saveDeferred.resolve();
	                }, function errorHandler(err) {
	                    saveDeferred.reject(err);
	                });
	            });
	            return deferred.promise;
	        };
	    })();

	    /**
	     * Join a group. In order to aggregate subsequent repeated requests, this function, when called synchronously,
	     * will continue to accumulate group ids until the next tick of the event loop, when the request will be
	     * issued. The same instance of Promise is returned each time.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.joinGroup
	     * @private
	     * @returns {Promise}
	     * @param {object} params
	     * @param {array} params.groupList
	     */
	    that.joinGroup = (function () {
	        var groups = {};
	        var deferred = Q.defer();//i think this needs to go in actualJoinGroup

	        return function actualJoinGroup(params) {
	            params = params || {};
	            params.groupList = params.groupList || [];

	            log.trace('been asked to join groups', params.groupList);

	            var needsToRun = (Object.keys(groups).length === 0);

	            if (!that.isConnected()) {
	                deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	                return deferred.promise;
	            }

	            params.groupList.forEach(function (id) {
	                if (typeof id === 'string') {
	                    log.trace('put group', id, 'in the join queue');
	                    groups[id] = true;
	                }
	            });

	            if (!needsToRun) {
	                return deferred.promise;
	            }

	            setTimeout(function requestJoinsForGroupQueue() {
	                // restart accumulation
	                var groupList = Object.keys(groups);
	                log.trace('list of groups to be requested', groupList);
	                //reset the groups object
	                groups = {};
	                var saveDeferred = deferred;
	                deferred = Q.defer();

	                if (groupList.length === 0) {
	                    log.trace('list of groups was empty so not sending queue');
	                    saveDeferred.resolve();
	                    return;
	                }

	                wsCall({
	                    path: '/v1/groups/',
	                    parameters: {
	                        groups: groupList
	                    },
	                    httpMethod: 'POST'
	                }).done(function successHandler() {
	                    saveDeferred.resolve();
	                }, function errorHandler(err) {
	                    saveDeferred.reject(err);
	                });
	            });
	            return deferred.promise;
	        };
	    })();

	    /**
	     * Publish a message to a group.
	     * @memberof! respoke.SignalingChannel
	     * @private
	     * @method respoke.SignalingChannel.publish
	     * @returns {Promise}
	     * @param {object} params
	     * @param {string} params.id
	     * @param {string} params.message
	     * @param {boolean} [params.push=false]
	     */
	    that.publish = function (params) {
	        params = params || {};
	        var deferred = Q.defer();
	        var message = respoke.TextMessage({
	            endpointId: params.id,
	            message: params.message,
	            push: !!params.push
	        });

	        if (!that.isConnected()) {
	            deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            return deferred.promise;
	        }

	        wsCall({
	            path: '/v1/channels/{id}/publish/',
	            urlParams: { id: params.id },
	            httpMethod: 'POST',
	            parameters: message
	        }).done(function successHandler() {
	            deferred.resolve();
	        }, function errorHandler(err) {
	            deferred.reject(err);
	        });
	        return deferred.promise;
	    };

	    /**
	     * Register as an observer of presence for the specified endpoint ids. In order to aggregate subsequent repeated
	     * requests, this function, when called synchronously, will continue to accumulate endpoint ids until the next
	     * tick of the event loop, when the request will be issued. The same instance of Promise is returned each time.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.registerPresence
	     * @private
	     * @param {object} params
	     * @param {Array<string>} params.endpointList
	     * @returns {Promise}
	     */
	    that.registerPresence = (function () {
	        var endpoints = {};
	        var deferred = Q.defer();

	        return function (params) {
	            params = params || {};
	            params.endpointList = params.endpointList || [];
	            var toRun = (Object.keys(endpoints).length === 0);

	            if (!that.isConnected()) {
	                return Q.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            }

	            params.endpointList.forEach(function (ep) {
	                if (typeof ep === 'string' && presenceRegistered[ep] !== true) {
	                    endpoints[ep] = true;
	                }
	            });

	            if (!toRun) {
	                return deferred.promise;
	            }

	            setTimeout(function () {
	                // restart accumulation
	                var endpointList = Object.keys(endpoints);
	                endpoints = {};
	                var saveDeferred = deferred;
	                deferred = Q.defer();

	                if (endpointList.length === 0) {
	                    saveDeferred.resolve();
	                    return;
	                }

	                wsCall({
	                    httpMethod: 'POST',
	                    path: '/v1/presenceobservers',
	                    parameters: {
	                        endpointList: endpointList
	                    }
	                }).done(function successHandler() {
	                    params.endpointList.forEach(function eachId(id) {
	                        presenceRegistered[id] = true;
	                    });
	                    saveDeferred.resolve();
	                }, function (err) {
	                    saveDeferred.reject(err);
	                });
	                // We could even add a tiny delay like 10ms if we want to get more conservative and
	                // catch asychronous calls to client.getEndpoint() and other methods which call
	                // this method.
	            });

	            return deferred.promise;
	        };
	    })();

	    /**
	     * Join a group.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.getGroupMembers
	     * @private
	     * @returns {Promise<Array>}
	     * @param {object} params
	     * @param {string} params.id
	     */
	    that.getGroupMembers = function (params) {
	        var deferred = Q.defer();

	        if (!that.isConnected()) {
	            deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            return deferred.promise;
	        }

	        if (!params.id) {
	            deferred.reject(new Error("Can't get group's endpoints without group ID."));
	            return deferred.promise;
	        }

	        return wsCall({
	            path: '/v1/channels/{id}/subscribers/',
	            urlParams: { id: params.id },
	            httpMethod: 'GET'
	        });
	    };

	    /**
	     * Send a chat message.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.sendMessage
	     * @private
	     * @param {object} params
	     * @param {respoke.SignalingMessage} params.message - The string text message to send.
	     * @param {respoke.Endpoint} params.recipient
	     * @param {string} [params.connectionId]
	     * @param {boolean} [params.push=false]
	     * @returns {Promise}
	     */
	    that.sendMessage = function (params) {
	        params = params || {};
	        var deferred = Q.defer();
	        var message = respoke.TextMessage({
	            endpointId: params.recipient.id,
	            ccSelf: params.ccSelf,
	            connectionId: params.connectionId,
	            message: params.message,
	            push: !!params.push
	        });

	        if (!that.isConnected()) {
	            deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            return deferred.promise;
	        }

	        wsCall({
	            path: '/v1/messages',
	            httpMethod: 'POST',
	            parameters: message
	        }).done(function successHandler() {
	            deferred.resolve();
	        }, function errorHandler(err) {
	            deferred.reject(err);
	        });
	        return deferred.promise;
	    };

	    /**
	     * Send an ACK signal to acknowlege reception of a signal.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.sendACK
	     * @private
	     * @param {object} params
	     * @param {respoke.SignalingMessage} params.signal
	     * @return {Promise}
	     */
	    that.sendACK = function (params) {
	        var endpoint;
	        params = params || {};

	        if (!that.isConnected()) {
	            return Q.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	        }

	        if (!params.signal) {
	            return Q.reject(new Error("Can't send ACK, no signal was given."));
	        }

	        endpoint = client.getEndpoint({
	            id: params.signal.fromEndpoint,
	            skipPresence: true
	        });
	        if (!endpoint) {
	            return Q.reject(new Error("Can't send ACK, can't get endpoint."));
	        }

	        return that.sendSignal({
	            recipient: endpoint,
	            signalType: 'ack',
	            signalId: params.signal.signalId,
	            sessionId: params.signal.sessionId,
	            target: params.signal.target,
	            ackedSignalType: params.signal.signalType
	        });
	    };

	    /**
	     * Send a signaling message.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.sendSignal
	     * @private
	     * @param {object} params
	     * @param {respoke.Call} [params.call] - For getting the sessionId & connectionId. Not required for 'ack'.
	     * @return {Promise}
	     */
	    that.sendSignal = function (params) {
	        params = params || {};
	        var deferred = Q.defer();
	        var signal;
	        var to;
	        var toConnection;
	        var toType;

	        if (!that.isConnected()) {
	            deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            return deferred.promise;
	        }

	        if (params.call) {
	            params.sessionId = params.call.id;
	            if (params.call.connectionId) { // the recipient's connectionId
	                params.connectionId = params.call.connectionId;
	            }
	        }

	        to = params.recipient.id;
	        toConnection = params.connectionId;
	        toType = params.toType || 'web';

	        try {
	            params.signalId = respoke.makeGUID();
	            // This will strip off non-signaling attributes.
	            signal = respoke.SignalingMessage(params);
	        } catch (e) {
	            deferred.reject(e);
	            return deferred.promise;
	        }

	        wsCall({
	            path: '/v1/signaling',
	            httpMethod: 'POST',
	            parameters: {
	                ccSelf: params.ccSelf,
	                signal: JSON.stringify(signal),
	                to: to,
	                toConnection: toConnection,
	                toType: toType
	            }
	        }).done(function successHandler() {
	            deferred.resolve();
	        }, function errorHandler(err) {
	            deferred.reject(err);
	        });

	        return deferred.promise;
	    };

	    /**
	     * Send an ICE candidate.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.sendCandidate
	     * @private
	     * @param {object} params
	     * @param {respoke.Endpoint} params.recipient - The recipient.
	     * @param {string} [params.connectionId]
	     * @param {Array<RTCIceCandidate>} params.iceCandidates - An array of ICE candidate.
	     * @return {Promise}
	     */
	    that.sendCandidate = function (params) {
	        params = params || {};
	        params.signalType = 'iceCandidates';

	        if (!that.isConnected()) {
	            return Q.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	        }

	        if (typeof params.finalCandidates !== 'undefined') {
	            log.debug('Sending final', params.iceCandidates.length, 'of', params.finalCandidates.length, 'ice candidates');
	        } else {
	            log.debug('Sending', params.iceCandidates.length, 'ice candidates');
	        }

	        return that.sendSignal(params);
	    };

	    /**
	     * Send an SDP.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.sendSDP
	     * @private
	     * @param {object} params
	     * @param {respoke.Endpoint} params.recipient - The recipient.
	     * @param {string} [params.connectionId]
	     * @param {RTCSessionDescription} params.sessionDescription - An SDP to JSONify and send.
	     * @return {Promise}
	     */
	    that.sendSDP = function (params) {
	        params = params || {};

	        if (!that.isConnected()) {
	            return Q.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	        }

	        if (['offer', 'answer'].indexOf(params.signalType) === -1) {
	            return Q.reject("Not an SDP type signal.");
	        }

	        return that.sendSignal(params);
	    };

	    /**
	     * Send a call report to the cloud infrastructure.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.sendReport
	     * @private
	     * @param {object} params
	     * @todo TODO document the params.
	     * @return {Promise}
	     */
	    that.sendReport = function (params) {
	        params = params || {};
	        var deferred = Q.defer();
	        var message = {
	            debugData: params
	        };

	        if (!clientSettings.enableCallDebugReport) {
	            log.debug('not sending call debugs - disabled');
	            deferred.resolve();
	            return deferred.promise;
	        }

	        if (!that.isConnected()) {
	            deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            return deferred.promise;
	        }

	        wsCall({
	            path: '/v1/call-debugs',
	            httpMethod: 'POST',
	            parameters: message
	        }).done(function () {
	            deferred.resolve();
	        }, function (err) {
	            deferred.reject(err);
	        });

	        return deferred.promise;
	    };

	    /**
	     * Send a message hanging up the WebRTC session.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.sendHangup
	     * @private
	     * @param {object} params
	     * @param {respoke.Endpoint} params.recipient - The recipient.
	     * @param {string} [params.connectionId]
	     * @param {string} params.reason - The reason the session is being hung up.
	     * @return {Promise}
	     */
	    that.sendHangup = function (params) {
	        params = params || {};
	        params.signalType = 'bye';
	        params.ccSelf = true;

	        if (!that.isConnected()) {
	            return Q.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	        }

	        return that.sendSignal(params);
	    };

	    /**
	     * Send a message to all connection ids indicating we have negotiated a call with one connection.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.sendConnected
	     * @private
	     * @param {object} params
	     * @param {respoke.Endpoint} params.recipient - The recipient.
	     * @return {Promise}
	     */
	    that.sendConnected = function (params) {
	        params = params || {};
	        params.signalType = 'connected';

	        if (!that.isConnected()) {
	            return Q.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	        }

	        return that.sendSignal(params);
	    };

	    /**
	     * Send a message to the remote party indicating a desire to renegotiate media.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.sendModify
	     * @private
	     * @param {object} params
	     * @param {respoke.Endpoint} params.recipient - The recipient.
	     * @param {string} params.action - The state of the modify request, one of: 'initiate', 'accept', 'reject'
	     * @return {Promise}
	     */
	    that.sendModify = function (params) {
	        params = params || {};
	        params.signalType = 'modify';

	        if (['initiate', 'accept', 'reject'].indexOf(params.action) === -1) {
	            return Q.reject("No valid action in modify signal.");
	        }

	        if (!that.isConnected()) {
	            return Q.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	        }

	        return that.sendSignal(params);
	    };

	    /**
	     * Uppercase the first letter of the word.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.firstUpper
	     * @private
	     */
	    function firstUpper(str) {
	        return str[0].toUpperCase() + str.slice(1);
	    }

	    /**
	     * Route different types of signaling messages via events.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.routeSignal
	     * @private
	     * @param {respoke.SignalingMessage} signal - A message to route
	     * @fires respoke.Call#offer
	     * @fires respoke.Call#connected
	     * @fires respoke.Call#answer
	     * @fires respoke.Call#iceCandidates
	     * @fires respoke.Call#hangup
	     * @fires respoke.DirectConnection#offer
	     * @fires respoke.DirectConnection#connected
	     * @fires respoke.DirectConnection#answer
	     * @fires respoke.DirectConnection#iceCandidates
	     * @fires respoke.DirectConnection#hangup
	     */
	    that.routeSignal = function (signal) {
	        var target = null;
	        var method = 'do';

	        if (signal.signalType !== 'iceCandidates' || respoke.ridiculous) { // Too many of these!
	            log.debug(signal.signalType, signal);
	        }

	        // Only create if this signal is an offer.
	        return Q().then(function () {
	            var endpoint;

	            if (signal.target === undefined) {
	                throw new Error("target undefined");
	            }

	            /*
	             * This will return calls regardless of whether they are associated
	             * with a direct connection or not, and it will create a call if no
	             * call is found and this signal is an offer. Direct connections get
	             * created in the next step.
	             *
	             * signal.toOriginal will be undefined except in the case that another connection
	             * with our same endpointId has just hung up on the call.
	             */
	            target = client.getCall({
	                id: signal.sessionId,
	                endpointId: signal.toOriginal || signal.fromEndpoint,
	                target: signal.target,
	                conferenceId: signal.conferenceId,
	                type: signal.fromType,
	                create: (signal.target !== 'directConnection' && signal.signalType === 'offer'),
	                callerId: signal.callerId,
	                metadata: signal.metadata
	            });
	            if (target) {
	                return target;
	            }

	            if (signal.target === 'directConnection') {
	                // return a promise
	                endpoint = client.getEndpoint({
	                    id: signal.fromEndpoint,
	                    skipPresence: true
	                });

	                if (endpoint.directConnection && endpoint.directConnection.call.id === signal.sessionId) {
	                    return endpoint.directConnection;
	                }

	                return endpoint.startDirectConnection({
	                    id: signal.sessionId,
	                    create: (signal.signalType === 'offer'),
	                    caller: (signal.signalType !== 'offer'),
	                    metadata: signal.metadata
	                });
	            }
	        }).then(function successHandler(target) {
	            // target might be null, a Call, or a DirectConnection.
	            if (target) {
	                target = target.call || target;
	            }
	            if (!target || target.id !== signal.sessionId) {
	                // orphaned signal
	                log.warn("Couldn't associate signal with a call. This is usually OK.", signal);
	                return;
	            }

	            method += firstUpper(signal.signalType);
	            routingMethods[method]({
	                call: target,
	                signal: signal
	            });
	        });
	    };

	    /**
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.routingMethods.doOffer
	     * @private
	     * @params {object} params
	     * @params {object} params.signal
	     * @fires respoke.Call#signal-offer
	     */
	    routingMethods.doOffer = function (params) {
	        params.call.connectionId = params.signal.fromConnection;
	        /**
	         * Send the `offer` signal into the Call.
	         * @event respoke.Call#signal-offer
	         * @type {respoke.Event}
	         * @property {object} signal
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         */
	        params.call.fire('signal-offer', {
	            signal: params.signal
	        });
	    };

	    /**
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.routingMethods.doConnected
	     * @private
	     * @params {object} params
	     * @params {object} params.signal
	     * @fires respoke.Call#signal-connected
	     */
	    routingMethods.doConnected = function (params) {
	        /**
	         * Send the `connected` signal into the Call.
	         * @event respoke.Call#signal-connected
	         * @type {respoke.Event}
	         * @property {object} signal
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         */
	        params.call.fire('signal-connected', {
	            signal: params.signal
	        });
	    };

	    /**
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.routingMethods.dModify
	     * @private
	     * @params {object} params
	     * @params {object} params.signal
	     * @fires respoke.Call#signal-modify
	     */
	    routingMethods.doModify = function (params) {
	        /**
	         * Send the `modify` signal into the Call.
	         * @event respoke.Call#signal-modify
	         * @type {respoke.Event}
	         * @property {object} signal
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         */
	        params.call.fire('signal-modify', {
	            signal: params.signal
	        });
	    };

	    /**
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.routingMethods.doAnswer
	     * @private
	     * @params {object} params
	     * @params {object} params.signal
	     * @fires respoke.Call#signal-answer
	     */
	    routingMethods.doAnswer = function (params) {
	        params.call.connectionId = params.signal.fromConnection;
	        /**
	         * Send the `answer` signal into the Call.
	         * @event respoke.Call#signal-answer
	         * @type {respoke.Event}
	         * @property {object} signal
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         */
	        params.call.fire('signal-answer', {
	            signal: params.signal
	        });
	    };

	    /**
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.routingMethods.doIceCandidates
	     * @private
	     * @params {object} params
	     * @params {object} params.signal
	     * @fires respoke.Call#signal-icecandidates
	     */
	    routingMethods.doIceCandidates = function (params) {
	        /**
	         * Send the `icecandidates` signal into the Call.
	         * @event respoke.Call#signal-icecandidates
	         * @type {respoke.Event}
	         * @property {object} signal
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         */
	        params.call.fire('signal-icecandidates', {
	            signal: params.signal
	        });
	    };

	    /**
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.routingMethods.doBye
	     * @private
	     * @params {object} params
	     * @params {object} params.signal
	     * @fires respoke.Call#signal-hangup
	     */
	    routingMethods.doBye = function (params) {
	        /**
	         *  The caller may receive hangup from one or more parties after connectionId is set if the call is rejected
	         *  by a connection that didn't win the call. In this case, we have to ignore the signal since
	         *  we are already on a call.
	         *
	         *  The callee's connectionId is always set.
	         */
	        if (params.call.caller && params.call.connectionId &&
	                params.call.connectionId !== params.signal.fromConnection) {
	            return;
	        }
	        /**
	         * Send the `hangup` signal into the Call.
	         * @event respoke.Call#signal-hangup
	         * @type {respoke.Event}
	         * @property {object} signal
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         */
	        params.call.fire('signal-hangup', {
	            signal: params.signal
	        });
	    };

	    /**
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.routingMethods.doUnknown
	     * @private
	     * @params {object} params
	     * @params {object} params.signal
	     */
	    routingMethods.doUnknown = function (params) {
	        log.error("Don't know what to do with", params.signal.target, "msg of unknown type", params.signal.signalType);
	    };

	    /**
	     * Add a handler to the connection for messages of different types.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.addHandler
	     * @private
	     * @param {object} params
	     * @param {string} params.type - The type of socket message, i. e., 'message', 'presence', 'join'
	     * @param {function} params.handler - A function to which to pass the message
	     * @todo TODO See if this is necessary anymore
	     */
	    that.addHandler = function (params) {
	        if (that.socket.socket && that.socket.socket.open) {
	            that.socket.on(params.type, params.handler);
	        } else {
	            handlerQueue[params.type].push(params.handler);
	        }
	    };

	    function socketOnSignal(message) {
	        var knownSignals = ['offer', 'answer', 'connected', 'modify', 'iceCandidates', 'bye'];
	        var signal = respoke.SignalingMessage({
	            rawMessage: message
	        });

	        if (signal.signalType === 'ack') {
	            return;
	        }

	        if (!signal.target || !signal.signalType || knownSignals.indexOf(signal.signalType) === -1) {
	            log.error("Got malformed signal.", signal);
	            throw new Error("Can't route signal without target or type.");
	        }

	        that.routeSignal(signal).done();
	    }
	    that.socketOnSignal = socketOnSignal;

	    /**
	     * Socket handler for pub-sub messages.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.socketOnPubSub
	     * @param {object} message The Socket.io message.
	     * @private
	     * @fires respoke.Group#message
	     * @fires respoke.Client#message
	     */
	    function socketOnPubSub(message) {
	        var group;
	        var groupMessage = respoke.TextMessage({
	            rawMessage: message
	        });

	        group = client.getGroup({id: message.header.channel});
	        if (group) {
	            /**
	             * Indicate that a message has been received to a group.
	             * @event respoke.Group#message
	             * @type {respoke.Event}
	             * @property {respoke.TextMessage} message
	             * @property {string} name - the event name.
	             * @property {respoke.Group} target
	             */
	            group.fire('message', {
	                message: groupMessage
	            });
	        }
	        /**
	         * Indicate that a message has been received.
	         * @event respoke.Client#message
	         * @type {respoke.Event}
	         * @property {respoke.TextMessage} message
	         * @property {respoke.Group} [group] - If the message is to a group we already know about,
	         * this will be set. If null, the developer can use client.join({id: evt.message.header.channel}) to join
	         * the group. From that point forward, Group#message will fire when a message is received as well. If
	         * group is undefined instead of null, the message is not a group message at all.
	         * @property {string} name - the event name.
	         * @property {respoke.Client} target
	         */
	        client.fire('message', {
	            message: groupMessage,
	            group: group || null
	        });
	    }
	    that.socketOnPubSub = socketOnPubSub;

	    /**
	     * Socket handler for join messages.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.socketOnJoin
	     * @param {object} message The Socket.io message.
	     * @private
	     */
	    function socketOnJoin(message) {
	        var group;
	        var presenceMessage;
	        var endpoint;
	        var connection;

	        if (message.connectionId === client.connectionId) {
	            connection = client.getConnection({connectionId: message.connectionId, endpointId: message.endpointId});
	            group = client.getGroup({id: message.header.channel});
	            if (!group) {
	                group = respoke.Group({
	                    id: message.header.channel,
	                    instanceId: instanceId,
	                    signalingChannel: that
	                });
	                client.addGroup(group);
	            }
	            if (!group.isJoined()) {
	                group.addMember({connection: connection});
	                client.fire('join', {
	                    group: group
	                });
	            }
	        } else {

	            endpoint = client.getEndpoint({
	                skipPresence: true,
	                id: message.endpointId,
	                instanceId: instanceId,
	                name: message.endpointId
	            });

	            // Handle presence not associated with a channel
	            if (!connection) {
	                endpoint.setPresence({
	                    connectionId: message.connectionId
	                });
	                connection = client.getConnection({
	                    connectionId: message.connectionId,
	                    endpointId: message.endpointId
	                });
	            }

	            group = client.getGroup({id: message.header.channel});

	            if (group && connection) {
	                group.addMember({connection: connection});
	            } else {
	                log.error("Can't add endpoint to group:", message, group, endpoint, connection);
	            }
	        }
	    }
	    that.socketOnJoin = socketOnJoin;

	    /**
	     * Socket handler for leave messages.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.socketOnLeave
	     * @param {object} message The Socket.io message.
	     * @private
	     */
	    function socketOnLeave(message) {
	        var group;
	        var presenceMessage;
	        var endpoint;
	        if (message.connectionId === client.connectionId) {
	            group = client.getGroup({id: message.header.channel});
	            client.fire('leave', {
	                group: group
	            });
	        } else {

	            endpoint = client.getEndpoint({
	                skipPresence: true,
	                id: message.endpointId
	            });

	            endpoint.connections.every(function eachConnection(conn, index) {
	                if (conn.id === message.connectionId) {
	                    endpoint.connections.splice(index, 1);
	                    return false;
	                }
	                return true;
	            });

	            group = client.getGroup({id: message.header.channel});
	            if (group) {
	                group.removeMember({connectionId: message.connectionId});
	            }
	        }
	    }
	    that.socketOnLeave = socketOnLeave;

	    /**
	     * Socket handler for presence messages.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.onMessage
	     * @param {object} message The Socket.io message.
	     * @private
	     * @fires respoke.Endpoint#message
	     * @fires respoke.Client#message
	     */
	    function socketOnMessage(message) {
	        var endpoint;
	        message = respoke.TextMessage({rawMessage: message});
	        if (message.originalRecipient || message.endpointId) {
	            endpoint = client.getEndpoint({
	                id: message.originalRecipient || message.endpointId,
	                skipCreate: true
	            });
	        }
	        if (endpoint) {
	            /**
	             * Indicate that a message has been received.
	             * @event respoke.Endpoint#message
	             * @type {respoke.Event}
	             * @property {respoke.TextMessage} message
	             * @property {string} name - the event name.
	             * @property {respoke.Endpoint} target
	             */
	            endpoint.fire('message', {
	                message: message
	            });
	        }
	        /**
	         * Indicate that a message has been received.
	         * @event respoke.Client#message
	         * @type {respoke.Event}
	         * @property {respoke.TextMessage} message
	         * @property {respoke.Endpoint} [endpoint] - If the message is from an endpoint we already know about,
	         * this will be set. If null, the developer can use client.getEndpoint({id: evt.message.endpointId}) to get
	         * the Endpoint. From that point forward, Endpoint#message will fire when a message is received as well.
	         * @property {string} name - the event name.
	         * @property {respoke.Client} target
	         */
	        client.fire('message', {
	            endpoint: endpoint || null,
	            message: message
	        });
	    }
	    that.socketOnMessage = socketOnMessage;

	    /**
	     * Create a socket handler for the onConnect event with all the right things in scope.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.generateConnectHandler
	     * @param {respoke.Client.successHandler} [onSuccess] - Success handler for this invocation of
	     * this method only.
	     * @param {respoke.Client.errorHandler} [onError] - Error handler for this invocation of this
	     * method only.
	     * @private
	     */
	    var generateConnectHandler = function generateConnectHandler(onSuccess, onError) {
	        onSuccess = onSuccess || function () {};
	        onError = onError || function () {};
	        return function onConnect() {
	            Object.keys(handlerQueue).forEach(function addEachHandlerType(category) {
	                if (!handlerQueue[category]) {
	                    return;
	                }

	                handlerQueue[category].forEach(function addEachHandler(handler) {
	                    that.socket.on(category, handler);
	                });
	                handlerQueue[category] = [];
	            });

	            wsCall({
	                path: '/v1/connections',
	                httpMethod: 'POST',
	                parameters: {
	                    capabilities: {
	                        iceFinalCandidates: true
	                    }
	                }
	            }).done(function successHandler(res) {
	                log.debug('connections result', res);
	                client.endpointId = res.endpointId;
	                client.connectionId = res.id;
	                onSuccess();
	            }, onError);
	        };
	    };

	    /**
	     * Socket handler for presence messages.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.socketOnPresence
	     * @param {object} message The Socket.io message.
	     * @private
	     */
	    function socketOnPresence(message) {
	        var endpoint;
	        var groups;

	        if (message.header.from === client.endpointId) {
	            log.debug('socket.on presence for self ignored', message);
	            // Skip ourselves
	            return;
	        }
	        log.debug('socket.on presence', message);

	        endpoint = client.getEndpoint({
	            skipPresence: true,
	            id: message.header.from,
	            instanceId: instanceId,
	            // TODO: find out what this is for? should it be message.header.type?
	            name: message.header.from,
	            connection: message.header.fromConnection
	        });

	        endpoint.setPresence({
	            connectionId: message.header.fromConnection,
	            presence: message.type
	        });

	        if (endpoint.presence === 'unavailable') {
	            groups = client.getGroups();
	            if (groups) {
	                groups.forEach(function eachGroup(group) {
	                    group.removeMember({connectionId: message.header.fromConnection});
	                });
	            }
	        }
	    }
	    that.socketOnPresence = socketOnPresence;

	    /**
	     * On reconnect, start with a reconnect interval of 2000ms. Every time reconnect fails, the interval
	     * is doubled up to a maximum of 5 minutes. From then on, it will attempt to reconnect every 5 minutes forever.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.reconnect
	     * @private
	     */
	    function reconnect() {
	        if (clientSettings.reconnect !== true) {
	            return;
	        }
	        // Reconnects within reconnects is ungood
	        clientSettings.reconnect = false;

	        appToken = null;
	        token = null;

	        if (that.socket) {
	            that.socket.removeAllListeners();
	            that.socket.disconnect();
	            that.socket = null;
	        }

	        reconnectTimeout = (reconnectTimeout === null) ? 2500 : 2 * reconnectTimeout;

	        if (reconnectTimeout > (maxReconnectTimeout)) {
	            reconnectTimeout = maxReconnectTimeout;
	        }

	        setTimeout(function doReconnect() {
	            log.debug('Reconnecting...');

	            actuallyConnect().then(function successHandler() {
	                reconnectTimeout = null;
	                log.debug('socket reconnected');
	                return Q.all(client.getGroups().map(function iterGroups(group) {
	                    client.join({
	                        id: group.id,
	                        onMessage: clientSettings.onMessage,
	                        onJoin: clientSettings.onJoin,
	                        onLeave: clientSettings.onLeave
	                    }).catch(function (err) {
	                        log.error("Couldn't rejoin previous group.", { id: group.id, message: err.message, stack: err.stack });
	                        throw err;
	                    });
	                }));
	            }).then(function successHandler() {
	                log.debug('groups rejoined after reconnect');
	                /**
	                 * Indicate that a reconnect has succeeded.
	                 * @event respoke.Client#reconnect
	                 * @property {string} name - the event name.
	                 * @property {respoke.Client}
	                 */
	                client.fire('reconnect');
	            }).fin(function finHandler() {
	                // re-enable reconnects
	                clientSettings.reconnect = true;
	            }).done(null, function errHandler(err) {
	                log.error("Couldn't reconnect. Retrying...", { message: err.message, stack: err.stack });
	                reconnect();
	            });
	        }, reconnectTimeout);
	    }

	    /**
	     * Authenticate to the cloud and call the handler on state change.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.authenticate
	     * @private
	     * @param {object} params
	     * @return {Promise}
	     */
	    that.authenticate = function authenticate(params) {
	        params = params || {};
	        var deferred = Q.defer();
	        var pieces = [];
	        var protocol = null;
	        var host = null;
	        var port = null;

	        if (!appToken) {
	            deferred.reject(new Error("Can't open a websocket without an app token."));
	        }

	        pieces = clientSettings.baseURL.split(/:\/\//);
	        protocol = pieces[0];
	        pieces = pieces[1].split(/:/);
	        host = pieces[0];
	        port = pieces[1];

	        var connectParams = {
	            'connect timeout': clientSettings.connectTimeoutMillis,
	            'force new connection': true, // Don't try to reuse old connection.
	            'sync disconnect on unload': true, // have Socket.io call disconnect() on the browser unload event.
	            reconnect: false,
	            host: host,
	            port: port || '443',
	            protocol: protocol,
	            secure: (protocol === 'https'),
	            query: '__sails_io_sdk_version=0.10.0&app-token=' + appToken + '&Respoke-SDK=' + sdkHeaderValue
	        };

	        if (that.isConnected() || isConnecting()) {
	            return;
	        }

	        that.socket = respoke.io.connect(clientSettings.baseURL, connectParams);

	        that.socket.on('connect', generateConnectHandler(function onSuccess() {
	            deferred.resolve();
	        }, function onError(err) {
	            deferred.reject(err);
	        }));

	        that.socket.on('join', socketOnJoin);
	        that.socket.on('leave', socketOnLeave);
	        that.socket.on('pubsub', socketOnPubSub);
	        that.socket.on('message', socketOnMessage);
	        that.socket.on('presence', socketOnPresence);
	        that.socket.on('signal', socketOnSignal);

	        // connection timeout
	        that.socket.on('connect_failed', function connectFailedHandler(res) {
	            deferred.reject(new Error("WebSocket connection failed."));
	            log.error('Socket.io connect timeout.', res || "");
	            reconnect();
	        });

	        // handshake error, 403, socket disconnects on FireFox
	        that.socket.on('error', function errorHandler(res) {
	            log.error('Socket.io error.', res || "");
	            reconnect();
	        });

	        that.socket.on('disconnect', function onDisconnect() {
	            log.debug('Socket.io disconnect.');
	            pendingRequests.reset(function (pendingRequest) {
	                log.debug('Failing pending requests');
	                pendingRequest.reject(new Error("WebSocket disconnected"));
	            });

	            /**
	             * Indicate that this client has been disconnected from the Respoke service.
	             * @event respoke.Client#disconnect
	             * @property {string} name - the event name.
	             * @property {respoke.Client} target
	             */
	            client.fire('disconnect');

	            reconnect();
	        });

	        return deferred.promise;
	    };

	    /**
	     * Get ephemeral TURN credentials.  This method is called whenever a call is either
	     * sent or received, prior to creating a PeerConnection
	     *
	     * @memberof! respoke.SignalingChannel
	     * @private
	     * @method respoke.SignalingChannel.getTurnCredentials
	     * @return {Promise<Array>}
	     */
	    that.getTurnCredentials = function getTurnCredentials() {
	        var deferred = Q.defer();

	        if (!that.isConnected()) {
	            deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            return deferred.promise;
	        }

	        wsCall({
	            httpMethod: 'GET',
	            path: '/v1/turn'
	        }).done(function successHandler(creds) {
	            var result = [];

	            if (!creds || !creds.uris) {
	                deferred.reject(new Error("Turn credentials empty."));
	                return;
	            }

	            creds.uris.forEach(function saveTurnUri(uri) {
	                var cred = null;

	                if (!uri) {
	                    return;
	                }

	                cred = createIceServer(uri, creds.username, creds.password);
	                result.push(cred);
	            });

	            if (result.length === 0) {
	                deferred.reject(new Error("Got no TURN credentials."));
	            }

	            log.debug('TURN creds', result);
	            deferred.resolve(result);
	        }, function errorHandler(err) {
	            deferred.reject(err);
	        });

	        return deferred.promise;
	    };

	    /**
	     * Construct a websocket API call and return the formatted response and errors. The 'success'
	     * attribute indicates the success or failure of the API call. The 'response' attribute
	     * is an associative array constructed by json.decode. The 'error' attriute is a message.
	     * If the API call is successful but the server returns invalid JSON, error will be
	     * "Invalid JSON." and response will be the unchanged content of the response body.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.wsCall
	     * @private
	     * @param {object} params
	     * @param {string} params.httpMethod
	     * @param {string} params.path
	     * @param {string} params.objectId
	     * @param {object} params.parameters - These are request body parameters that get converted to JSON before
	     * being sent over the websocket. Undefined parameters and functions are removed by JSON.stringify.
	     * @return {Promise<object>}
	     */
	    function wsCall(params) {
	        params = params || {};
	        var deferred = Q.defer();
	        var start = now();
	        // Too many of these!
	        var logRequest = (params.path.indexOf('messages') === -1 && params.path.indexOf('signaling') === -1) ||
	            respoke.ridiculous;
	        var request;
	        var bodyLength = 0;
	        if (params.parameters) {
	            bodyLength = encodeURI(JSON.stringify(params.parameters)).split(/%..|./).length - 1;
	        }

	        if (!that.isConnected()) {
	            deferred.reject(new Error("Can't complete request when not connected. Please reconnect!"));
	            return deferred.promise;
	        }

	        if (!params) {
	            deferred.reject(new Error('No params.'));
	            return deferred.promise;
	        }

	        if (!params.path) {
	            deferred.reject(new Error('No request path.'));
	            return deferred.promise;
	        }

	        if (bodyLength > bodySizeLimit) {
	            deferred.reject(new Error('Request body exceeds maximum size of ' + bodySizeLimit + ' bytes'));
	            return deferred.promise;
	        }

	        params.httpMethod = (params.httpMethod || 'get').toLowerCase();

	        if (params.urlParams) {
	            params.path = template.parse(params.path).expand(params.urlParams);
	        }

	        if (logRequest) {
	            log.debug('socket request', {
	                method: params.httpMethod,
	                path: params.path,
	                parameters: params.parameters
	            });
	        }

	        request = {
	            method: params.httpMethod,
	            path: params.path,
	            parameters: params.parameters,
	            tries: 0,
	            durationMillis: 0
	        };

	        request.id = pendingRequests.add(deferred);

	        function handleResponse(response) {
	            var thisHandler = this; // jshint ignore:line
	            /*
	             * Response:
	             *  {
	             *      body: {},
	             *      headers: {},
	             *      statusCode: 200
	             *  }
	             */
	            try {
	                response.body = JSON.parse(response.body);
	            } catch (e) {
	                if (typeof response.body !== 'object') {
	                    deferred.reject(new Error("Server response could not be parsed!" + response.body));
	                    return;
	                }
	            }

	            if (response.statusCode === 429) {
	                if (request.tries < 3 && deferred.promise.isPending()) {
	                    setTimeout(function () {
	                        start = now();
	                        sendWebsocketRequest(request, handleResponse);
	                    }, 1000); // one day this will be response.interval or something
	                } else {
	                    request.durationMillis = now() - start;
	                    pendingRequests.remove(request.id);
	                    failWebsocketRequest(request, response,
	                            "Too many retries after rate limit exceeded.", deferred);
	                }
	                return;
	            }

	            request.durationMillis = now() - start;
	            pendingRequests.remove(request.id);

	            if (logRequest) {
	                log.debug('socket response', {
	                    method: request.method,
	                    path: request.path,
	                    durationMillis: request.durationMillis,
	                    response: response
	                });
	            }

	            if (isBillingSuspensionUnauthorizedResponse(response)) {
	                failWebsocketRequest(request, response, billingSuspensionErrorMessage, deferred);
	                return;
	            }

	            if (isSuspensionUnauthorizedResponse(response)) {
	                failWebsocketRequest(request, response, suspensionErrorMessage, deferred);
	                return;
	            }

	            if ([200, 204, 205, 302, 401, 403, 404, 418].indexOf(thisHandler.status) === -1) {
	                failWebsocketRequest(request, response,
	                        response.body.error || errors[thisHandler.status] || "Unknown error", deferred);
	                return;
	            }

	            deferred.resolve(response.body);
	        }

	        start = now();
	        sendWebsocketRequest(request, handleResponse);
	        return deferred.promise;
	    }
	    that.wsCall = wsCall;

	    function failWebsocketRequest(request, response, error, deferred) {
	        if (response && response.body && response.body.error) {
	            deferred.reject(buildResponseError(response, error + ' (' + request.method + ' ' + request.path + ')'));
	        } else {
	            deferred.resolve(response.body);
	        }
	    }

	    function sendWebsocketRequest(request, handleResponse) {
	        request.tries += 1;
	        that.socket.emit(request.method, JSON.stringify({
	            url: request.path,
	            data: request.parameters,
	            headers: {
	                'App-Token': appToken,
	                'Respoke-SDK': sdkHeaderValue }
	        }), handleResponse);
	    }

	    /**
	     * Construct an API call and return the formatted response and errors. The 'success'
	     * attribute indicates the success or failure of the API call. The 'response' attribute
	     * is an associative array constructed by json.decode. The 'error' attribute is a message.
	     * If the API call is successful but the server returns invalid JSON, error will be
	     * "Invalid JSON." and response will be the unchanged content of the response body.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.call
	     * @private
	     * @param {object} params
	     * @param {string} params.httpMethod
	     * @param {string} params.objectId
	     * @param {string} params.path
	     * @param {object} params.parameters
	     * @returns {Promise}
	     */
	    function call(params) {
	        /* Params go in the URI for GET, DELETE, same format for
	         * POST and PUT, but they must be sent separately after the
	         * request is opened. */
	        var deferred = Q.defer();
	        var paramString = null;
	        var uri = null;
	        var response = {
	            body: null,
	            statusCode: null
	        };
	        var start = now();

	        uri = clientSettings.baseURL + params.path;

	        if (!params) {
	            deferred.reject(new Error('No params.'));
	            return;
	        }

	        if (!params.httpMethod) {
	            deferred.reject(new Error('No HTTP method.'));
	            return;
	        }

	        if (!params.path) {
	            deferred.reject(new Error('No request path.'));
	            return;
	        }

	        if (params.urlParams) {
	            uri = template.parse(uri).expand(params.urlParams);
	        }

	        if (['GET', 'DELETE'].indexOf(params.httpMethod) > -1) {
	            uri += makeParamString(params.parameters);
	        }

	        xhr.open(params.httpMethod, uri);
	        xhr.setRequestHeader('Respoke-SDK', sdkHeaderValue);
	        if (appToken) {
	            xhr.setRequestHeader("App-Token", appToken);
	        }
	        if (['POST', 'PUT'].indexOf(params.httpMethod) > -1) {
	            paramString = JSON.stringify(params.parameters);
	            if (paramString.length > bodySizeLimit) {
	                deferred.reject(new Error('Request body exceeds maximum size of ' + bodySizeLimit + ' bytes'));
	                return;
	            }
	            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	        } else if (['GET', 'DELETE'].indexOf(params.httpMethod) === -1) {
	            deferred.reject(new Error('Illegal HTTP request method ' + params.httpMethod));
	            return;
	        }
	        log.debug('request', {
	            method: params.httpMethod,
	            uri: uri,
	            params: paramString
	        });

	        try {
	            xhr.send(paramString);
	        } catch (err) {
	            deferred.reject(err);
	            return;
	        }

	        xhr.onreadystatechange = function () {
	            var durationMillis = now() - start;
	            var limit;
	            var unit;

	            if (this.readyState !== 4) {
	                return;
	            }

	            if (this.status === 0) {
	                deferred.reject(new Error("Status is 0: Incomplete request, SSL error, or CORS error."));
	                return;
	            }

	            response.statusCode = this.status;
	            response.headers = getAllResponseHeaders(this);
	            response.uri = uri;
	            response.params = params.parameters;
	            response.error = errors[this.status];

	            if (this.response) {
	                try {
	                    response.body = JSON.parse(this.response);
	                } catch (e) {
	                    response.body = this.response;
	                    response.error = "Invalid JSON.";
	                }
	            }

	            log.debug('response', {
	                method: params.httpMethod,
	                durationMillis: durationMillis,
	                response: response
	            });

	            if ([200, 204, 205, 302, 401, 403, 404, 418].indexOf(this.status) > -1) {
	                deferred.resolve(response);
	            } else if (this.status === 429) {
	                unit = getResponseHeader(this, 'RateLimit-Time-Units');
	                limit = getResponseHeader(this, 'RateLimit-Limit');
	                deferred.reject(buildResponseError(response, "Rate limit of " + limit + "/" + unit +
	                    " exceeded. Try again in 1 " + unit + "."));
	            } else {
	                deferred.reject(buildResponseError(response, 'unexpected response code ' + this.status));
	            }
	        };

	        return deferred.promise;
	    }

	    function isSuspensionUnauthorizedResponse(response) {
	        return (response.statusCode === 401) && response.body && response.body.details &&
	            (typeof response.body.details.message === 'string') &&
	            (response.body.details.message.indexOf('suspended') > -1);
	    }

	    function isBillingSuspensionUnauthorizedResponse(response) {
	        return isSuspensionUnauthorizedResponse(response) &&
	            (typeof response.body.details.reason === 'string') &&
	            (response.body.details.reason.indexOf('billing suspension') > -1);
	    }

	    /**
	     * Turn key/value and key/list pairs into an HTTP URL parameter string.
	     * var1=value1&var2=value2,value3,value4
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.makeParamString
	     * @private
	     * @param {object} params - Arbitrary collection of strings and arrays to serialize.
	     * @returns {string}
	     */
	    function makeParamString(params) {
	        var strings = [];
	        if (!params) {
	            return '';
	        }

	        Object.keys(params).forEach(function formatParam(name) {
	            var value = params[name];
	            /* Skip objects -- We won't know how to name these. */
	            if (value instanceof Array) {
	                strings.push([name, value.join(',')].join('='));
	            } else if (typeof value !== 'object' && typeof value !== 'function') {
	                strings.push([name, value].join('='));
	            }
	        });

	        if (strings.length > 0) {
	            return '?' + strings.join('&');
	        } else {
	            return '';
	        }
	    }

	    /**
	     * Tries to retrieve a single header value from an XHR response. If the header is disallowed,
	     * or does not exist, will return null. Otherwise returns the value of the header.
	     *
	     * The CORS spec does not define what the browser should do in the case of a request for a
	     * disallowed header, but at least Chrome throws an exception.
	     *
	     * @param {object} xhrResponse The response of an XMLHttpRequest
	     * @param {string} header The name of the header to retrieve the value for
	     * @returns {string|null} The value(s) of the header, or null if disallowed or unavailable.
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.getResponseHeader
	     * @private
	     */
	    function getResponseHeader(xhrResponse, header) {
	        try {
	            return xhrResponse.getResponseHeader(header);
	        } catch (e) {
	            return null;
	        }
	    }

	    /**
	     * Retrieves all headers from an XHR response as key/val pairs
	     *
	     * @param {object} xhrResponse The response of an XMLHttpRequest
	     * @returns {*} the key/val pairs of the response headers
	     * @memberof! respoke.SignalingChannel
	     * @method respoke.SignalingChannel.getAllResponseHeaders
	     * @private
	     */
	    function getAllResponseHeaders(xhrResponse) {
	        var result = {};
	        var headers;
	        var pairs;

	        headers = xhrResponse.getAllResponseHeaders();
	        if (!headers) {
	            return result;
	        }

	        // 1 header per line (cr+lf)
	        pairs = headers.split('\u000d\u000a');
	        pairs.forEach(function (pair) {
	            var key;
	            var val;

	            // key separated from value by ': '
	            // value may contain ': ', so using indexOf instead of split
	            var index = pair.indexOf('\u003a\u0020');
	            if (index > 0) {
	                key = pair.substring(0, index);
	                val = pair.substring(index + 2);
	                result[key] = val;
	            }
	        });

	        return result;
	    }

	    /**
	     * Creates an Error with the supplied `message` and, if available, the `Request-Id` header
	     * from the supplied `response`.
	     *
	     * @param {object} res
	     * @param {object} [res.headers]
	     * @param {string} [res.headers.Request-Id] The requestId to append to the Error message
	     * @param {string} message The message the Error should be constructed with
	     * @returns {Error} the constructed Error object
	     * @memberof respoke.SignalingChannel
	     * @method respoke.SignalingChannel.buildResponseError
	     * @api private
	     */
	    function buildResponseError(res, message) {
	        var requestId = res && res.headers && res.headers['Request-Id'];
	        if (requestId) {
	            message += ' [Request-Id: ' + requestId + ']';
	        }

	        return new Error(message);
	    }

	    return that;
	}; // End respoke.SignalingChannel
	/**
	 * Handle an error that resulted from a method call.
	 * @callback respoke.SignalingChannel.errorHandler
	 * @params {Error} err
	 */
	/**
	 * Handle sending successfully.
	 * @callback respoke.SignalingChannel.sendHandler
	 */
	/**
	 * Receive a group.
	 * @callback respoke.SignalingChannel.groupHandler
	 * @param {respoke.Group}
	 */
	/**
	 * Receive a list of groups.
	 * @callback respoke.SignalingChannel.groupListHandler
	 * @param {Array}
	 */
	/**
	 * Receive a list of TURN credentials.
	 * @callback respoke.SignalingChannel.turnSuccessHandler
	 * @param {Array}
	 */


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	(function (root, factory) {
	    if (true) {
	        module.exports = factory();
	    } else if (typeof define === 'function' && define.amd) {
	        define([], factory);
	    } else {
	        root.urltemplate = factory();
	    }
	}(this, function () {
	  /**
	   * @constructor
	   */
	  function UrlTemplate() {
	  }

	  /**
	   * @private
	   * @param {string} str
	   * @return {string}
	   */
	  UrlTemplate.prototype.encodeReserved = function (str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	      if (!/%[0-9A-Fa-f]/.test(part)) {
	        part = encodeURI(part);
	      }
	      return part;
	    }).join('');
	  };

	  /**
	   * @private
	   * @param {string} operator
	   * @param {string} value
	   * @param {string} key
	   * @return {string}
	   */
	  UrlTemplate.prototype.encodeValue = function (operator, value, key) {
	    value = (operator === '+' || operator === '#') ? this.encodeReserved(value) : encodeURIComponent(value);

	    if (key) {
	      return encodeURIComponent(key) + '=' + value;
	    } else {
	      return value;
	    }
	  };

	  /**
	   * @private
	   * @param {*} value
	   * @return {boolean}
	   */
	  UrlTemplate.prototype.isDefined = function (value) {
	    return value !== undefined && value !== null;
	  };

	  /**
	   * @private
	   * @param {string}
	   * @return {boolean}
	   */
	  UrlTemplate.prototype.isKeyOperator = function (operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	  };

	  /**
	   * @private
	   * @param {Object} context
	   * @param {string} operator
	   * @param {string} key
	   * @param {string} modifier
	   */
	  UrlTemplate.prototype.getValues = function (context, operator, key, modifier) {
	    var value = context[key],
	        result = [];

	    if (this.isDefined(value) && value !== '') {
	      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	        value = value.toString();

	        if (modifier && modifier !== '*') {
	          value = value.substring(0, parseInt(modifier, 10));
	        }

	        result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
	      } else {
	        if (modifier === '*') {
	          if (Array.isArray(value)) {
	            value.filter(this.isDefined).forEach(function (value) {
	              result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
	            }, this);
	          } else {
	            Object.keys(value).forEach(function (k) {
	              if (this.isDefined(value[k])) {
	                result.push(this.encodeValue(operator, value[k], k));
	              }
	            }, this);
	          }
	        } else {
	          var tmp = [];

	          if (Array.isArray(value)) {
	            value.filter(this.isDefined).forEach(function (value) {
	              tmp.push(this.encodeValue(operator, value));
	            }, this);
	          } else {
	            Object.keys(value).forEach(function (k) {
	              if (this.isDefined(value[k])) {
	                tmp.push(encodeURIComponent(k));
	                tmp.push(this.encodeValue(operator, value[k].toString()));
	              }
	            }, this);
	          }

	          if (this.isKeyOperator(operator)) {
	            result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	          } else if (tmp.length !== 0) {
	            result.push(tmp.join(','));
	          }
	        }
	      }
	    } else {
	      if (operator === ';') {
	        result.push(encodeURIComponent(key));
	      } else if (value === '' && (operator === '&' || operator === '?')) {
	        result.push(encodeURIComponent(key) + '=');
	      } else if (value === '') {
	        result.push('');
	      }
	    }
	    return result;
	  };

	  /**
	   * @param {string} template
	   * @return {function(Object):string}
	   */
	  UrlTemplate.prototype.parse = function (template) {
	    var that = this;
	    var operators = ['+', '#', '.', '/', ';', '?', '&'];

	    return {
	      expand: function (context) {
	        return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	          if (expression) {
	            var operator = null,
	                values = [];

	            if (operators.indexOf(expression.charAt(0)) !== -1) {
	              operator = expression.charAt(0);
	              expression = expression.substr(1);
	            }

	            expression.split(/,/g).forEach(function (variable) {
	              var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	              values.push.apply(values, that.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	            });

	            if (operator && operator !== '+') {
	              var separator = ',';

	              if (operator === '?') {
	                separator = '&';
	              } else if (operator !== '#') {
	                separator = operator;
	              }
	              return (values.length !== 0 ? operator : '') + values.join(separator);
	            } else {
	              return values.join(',');
	            }
	          } else {
	            return that.encodeReserved(literal);
	          }
	        });
	      }
	    };
	  };

	  return new UrlTemplate();
	}));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	var Q = __webpack_require__(8);
	var respoke = __webpack_require__(1);
	var log = respoke.log;

	/**
	 * A direct connection via RTCDataChannel, including state and path negotation.
	 * @class respoke.DirectConnection
	 * @constructor
	 * @augments respoke.EventEmitter
	 * @param {string} params
	 * @param {string} params.instanceId - client id
	 * @param {respoke.Call} params.call - The call that is handling state for this direct connection.
	 * @param {boolean} [params.forceTurn] - If true, force the data to flow through relay servers instead of allowing
	 * it to flow peer-to-peer. The relay acts like a blind proxy.
	 * @param {string} params.connectionId - The connection ID of the remoteEndpoint.
	 * @param {function} params.signalOffer - Signaling action from SignalingChannel.
	 * @param {function} params.signalConnected - Signaling action from SignalingChannel.
	 * @param {function} params.signalAnswer - Signaling action from SignalingChannel.
	 * @param {function} params.signalHangup - Signaling action from SignalingChannel.
	 * @param {function} params.signalReport - Signaling action from SignalingChannel.
	 * @param {function} params.signalCandidate - Signaling action from SignalingChannel.
	 * @param {respoke.DirectConnection.onStart} [params.onStart] - Callback for when setup of the direct connection
	 * begins. The direct connection will not be open yet.
	 * @param {respoke.DirectConnection.onError} [params.onError] - Callback for errors that happen during
	 * direct connection setup or media renegotiation.
	 * @param {respoke.DirectConnection.onClose} [params.onClose] - Callback for closing the direct connection.
	 * @param {respoke.DirectConnection.onOpen} [params.onOpen] - Callback for opening the direct connection.
	 * @param {respoke.DirectConnection.onAccept} [params.onAccept] - Callback for when the user accepts the request
	 * for a direct connection and setup is about to begin.
	 * @param {respoke.DirectConnection.onMessage} [params.onMessage] - Callback for incoming messages. Not usually
	 * necessary to listen to this event if you are already listening to respoke.Endpoint#message.
	 * @returns {respoke.DirectConnection}
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    /**
	     * @memberof! respoke.Client
	     * @name instanceId
	     * @private
	     * @type {string}
	     */
	    var instanceId = params.instanceId;
	    var that = respoke.EventEmitter(params);
	    delete that.instanceId;

	    /**
	     * A name to identify this class
	     * @memberof! respoke.DirectConnection
	     * @name className
	     * @type {string}
	     */
	    that.className = 'respoke.DirectConnection';
	    /**
	     * The unique identifier of the direct connection.
	     *
	     * @memberof! respoke.DirectConnection
	     * @name id
	     * @type {string}
	     */
	    that.id = respoke.makeGUID();

	    /**
	     * @memberof! respoke.DirectConnection
	     * @name call
	     * @type {respoke.Call}
	     */
	    if (!that.call.caller) {
	        that.call.caller = false;
	    }

	    /**
	     * @memberof! respoke.DirectConnection
	     * @name dataChannel
	     * @type {RTCDataChannel}
	     * @private
	     */
	    var dataChannel = null;

	    /**
	     * @memberof! respoke.DirectConnection
	     * @name pc
	     * @type {RTCPeerConnection}
	     * @private
	     */
	    var pc = params.pc;
	    delete params.pc;

	    /**
	     * When the datachannel is availble, we need to attach the callbacks. The event this function is attached to
	     * only fires for the callee.
	     * @memberof! respoke.DirectConnection
	     * @method respoke.DirectConnection.listenDataChannel
	     * @param {respoke.Event} evt
	     * @private
	     */
	    function listenDataChannel(evt) {
	        dataChannel = evt.channel;
	        dataChannel.onerror = onDataChannelError;
	        dataChannel.onmessage = onDataChannelMessage;
	        if (dataChannel.readyState === 'open') {
	            dataChannel.onopen = null;
	            onDataChannelOpen();
	        } else {
	            dataChannel.onopen = onDataChannelOpen;
	        }
	    }

	    /**
	     * Register any event listeners passed in as callbacks
	     * @memberof! respoke.DirectConnection
	     * @method respoke.DirectConnection.saveParameters
	     * @param {object} params
	     * @param {respoke.DirectConnection.onClose} [params.onClose] - Callback for when the direct connection
	     * is closed.
	     * @param {respoke.DirectConnection.onOpen} [params.onOpen] - Callback for when the direct connection
	     * is open.
	     * @param {respoke.DirectConnection.onMessage} [params.onMessage] - Callback for incoming messages.
	     * @param {respoke.DirectConnection.onError} [params.onError] - Callback for errors setting up the direct
	     * connection.
	     * @param {respoke.DirectConnection.onStart} [params.onStart] - Callback for when the direct connection
	     * is being set up. The direct connection will not be open yet.
	     * @param {boolean} [params.forceTurn] - If true, force the data to flow through relay servers instead of allowing
	     * it to flow peer-to-peer. The relay acts like a blind proxy.
	     * @private
	     */
	    function saveParameters(params) {
	        /**
	         * The direct connection is open.
	         * @event respoke.DirectConnection#open
	         * @type {respoke.Event}
	         * @property {string} name - the event name.
	         * @property {respoke.DirectConnection} target
	         */
	        that.listen('open', params.onOpen);
	        /**
	         * The direct connection is closed.
	         * @event respoke.DirectConnection#close
	         * @type {respoke.Event}
	         * @property {string} name - the event name.
	         * @property {respoke.DirectConnection} target
	         */
	        that.listen('close', params.onClose);
	        /**
	         * Incoming message on this direct connection.
	         * @event respoke.DirectConnection#message
	         * @type {respoke.Event}
	         * @property {respoke.TextMessage} message
	         * @property {respoke.Endpoint} endpoint
	         * @property {string} name - the event name.
	         * @property {respoke.DirectConnection} target
	         */
	        that.listen('message', params.onMessage);
	        // documented elsewhere
	        that.listen('start', params.onStart);
	        /**
	         * An error occurred while setting up the direct connection.
	         * @event respoke.DirectConnection#error
	         * @type {respoke.Event}
	         * @property {string} reason - A human-readable description of the error.
	         * @property {string} name - the event name.
	         * @property {respoke.DirectConnection} target
	         */
	        that.listen('error', params.onError);
	        pc.listen('direct-connection', listenDataChannel, true);
	        pc.listen('stats', function fireStats(evt) {
	            /**
	             * This event is fired every time statistical information about the direct connection
	             * becomes available.
	             * @event respoke.DirectConnection#stats
	             * @type {respoke.Event}
	             * @property {object} stats - an object with stats in it.
	             * @property {respoke.DirectConnection} target
	             * @property {string} name - the event name.
	             */
	            that.fire('stats', {stats: evt.stats});
	        }, true);

	    }
	    saveParameters(params);

	    delete that.onOpen;
	    delete that.onClose;
	    delete that.onMessage;

	    /**
	     * Return media stats. Since we have to wait for both the answer and offer to be available before starting
	     * statistics, we'll return a promise for the stats object.
	     *
	     *     directConnection.getStats({
	     *         onStats: function (evt) {
	     *             console.log('Stats', evt.stats);
	     *         }
	     *     }).done(function () {
	     *         console.log('Stats started.');
	     *     }, function (err) {
	     *         console.log('Direct connection is already closed.');
	     *     });
	     *
	     * **Using callbacks** by passing `params.onSuccess` or `params.onError` will disable promises.
	     * @memberof! respoke.DirectConnection
	     * @method respoke.DirectConnection.getStats
	     * @returns {Promise<object>|undefined}
	     * @param {object} params
	     * @param {number} [params.interval=5000] - How often in milliseconds to fetch statistics.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - An optional callback to receive the
	     * stats if the Respoke stats module is loaded. If no callback is provided, the connection's report will
	     * contain stats but the developer will not receive them on the client-side.
	     * @param {respoke.DirectConnection.statsSuccessHandler} [params.onSuccess] - Success handler for this
	     * invocation of this method only.
	     * @param {respoke.DirectConnection.errorHandler} [params.onError] - Error handler for this invocation of
	     * this method only.
	     */
	    that.getStats = function (params) {
	        if (pc && pc.getStats) {
	            that.listen('stats', params.onStats);
	            delete params.onStats;
	            return pc.getStats(params);
	        }
	        return null;
	    };

	    if (!respoke.MediaStats) {
	        delete that.getStats;
	    }

	    /**
	     * Detect datachannel errors for internal state.
	     * @memberof! respoke.DirectConnection
	     * @private
	     * @method respoke.DirectConnection.onDataChannelError
	     */
	    function onDataChannelError(error) {
	        /**
	         * Indicate that an error has occurred setting up the direct connection.
	         * @event respoke.DirectConnection#error
	         * @type {respoke.Event}
	         * @property {object} error
	         * @property {respoke.DirectConnection} directConnection
	         * @property {string} name - the event name.
	         * @property {respoke.DirectConnection} target
	         */
	        that.fire('error', {
	            error: error
	        });
	        that.close();
	    }

	    /**
	     * Receive and route messages to the Endpoint.
	     * @memberof! respoke.DirectConnection
	     * @method respoke.DirectConnection.onDataChannelMessage
	     * @private
	     * @param {MessageEvent}
	     * @fires respoke.DirectConnection#message
	     */
	    function onDataChannelMessage(evt) {
	        var message;
	        try {
	            message = JSON.parse(evt.data);
	        } catch (e) {
	            message = evt.data;
	        }
	        /**
	         * A message has been received over the direct connection.
	         * @event respoke.Endpoint#message
	         * @type {respoke.Event}
	         * @property {object} message
	         * @property {respoke.DirectConnection} directConnection
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         */
	        that.call.remoteEndpoint.fire('message', {
	            message: message,
	            directConnection: that
	        });
	        /**
	         * A message has been received over the direct connection.
	         * @event respoke.DirectConnection#message
	         * @type {respoke.Event}
	         * @property {object} message
	         * @property {respoke.Endpoint} endpoint
	         * @property {string} name - the event name.
	         * @property {respoke.DirectConnection} target
	         */
	        that.fire('message', {
	            message: message,
	            endpoint: that.call.remoteEndpoint
	        });
	    }

	    /**
	     * Detect when the channel is open.
	     * @memberof! respoke.DirectConnection
	     * @method respoke.DirectConnection.onDataChannelOpen
	     * @private
	     * @param {MessageEvent}
	     * @fires respoke.DirectConnection#open
	     */
	    function onDataChannelOpen(evt) {
	        //dataChannel = evt.target || evt.channel;
	        /**
	         * The direct connection is open.
	         * @event respoke.DirectConnection#open
	         * @type {respoke.Event}
	         * @property {string} name - the event name.
	         * @property {respoke.DirectConnection} target
	         */
	        that.fire('open');
	    }

	    /**
	     * Detect when the channel is closed.
	     * @memberof! respoke.DirectConnection
	     * @method respoke.DirectConnection.onDataChannelClose
	     * @private
	     * @param {MessageEvent}
	     * @fires respoke.DirectConnection#close
	     */
	    function onDataChannelClose(evt) {
	        //dataChannel = evt.target || evt.channel;
	        /**
	         * The direct connection is closed.
	         * @event respoke.DirectConnection#close
	         * @type {respoke.Event}
	         * @property {string} name - the event name.
	         * @property {respoke.DirectConnection} target
	         */
	        that.fire('close');
	    }

	    /**
	     * Create the datachannel. For the caller, set up all the handlers we'll need to keep track of the
	     * datachannel's state and to receive messages.
	     * @memberof! respoke.DirectConnection
	     * @method respoke.DirectConnection.createDataChannel
	     * @private
	     */
	    function createDataChannel() {
	        dataChannel = pc.createDataChannel("respokeDataChannel");
	        dataChannel.binaryType = 'arraybuffer';
	        dataChannel.onerror = onDataChannelError;
	        dataChannel.onmessage = onDataChannelMessage;
	        dataChannel.onopen = onDataChannelOpen;

	        /**
	         * The direct connection setup has begun. This does NOT mean it's ready to send messages yet. Listen to
	         * DirectConnection#open for that notification.
	         * @event respoke.DirectConnection#start
	         * @type {respoke.Event}
	         * @property {string} name - the event name.
	         * @property {respoke.DirectConnection} target
	         */
	        that.fire('start');
	    }

	    /**
	     * Start the process of obtaining media. saveParameters will only be meaningful for the callee,
	     * since the library calls this method for the caller. Developers will use this method to pass in
	     * callbacks for the callee.
	     *
	     *     directConnection.accept({
	     *         onOpen: function (evt) {}
	     *     });
	     *
	     * @memberof! respoke.DirectConnection
	     * @method respoke.DirectConnection.accept
	     * @fires respoke.DirectConnection#accept
	     * @param {object} params
	     * @param {respoke.DirectConnection.onOpen} [params.onOpen]
	     * @param {respoke.DirectConnection.onClose} [params.onClose]
	     * @param {respoke.DirectConnection.onMessage} [params.onMessage]
	     */
	    that.accept = function (params) {
	        params = params || {};
	        log.debug('DirectConnection.accept');
	        saveParameters(params);

	        log.debug("I am " + (pc.state.caller ? '' : 'not ') + "the caller.");

	        if (pc.state.caller === true) {
	            createDataChannel();
	        }
	        that.call.answer();

	        /**
	         * The request to open a direct connection has been accepted.
	         * @event respoke.DirectConnection#accept
	         * @type {respoke.Event}
	         * @property {string} name - the event name.
	         * @property {respoke.DirectConnection} target
	         */
	        that.fire('accept');
	    };

	    /**
	     * Tear down the connection.
	     * @memberof! respoke.DirectConnection
	     * @method respoke.DirectConnection.close
	     * @fires respoke.DirectConnection#close
	     */
	    that.close = function (params) {
	        params = params || {};
	        log.debug("DirectConnection.close");

	        if (that.call && that.call.remoteEndpoint) {
	            that.call.remoteEndpoint.directConnection = null;
	        }

	        if (dataChannel) {
	            dataChannel.close();
	        }

	        /**
	         * The direct connection has been closed.
	         * @event respoke.DirectConnection#close
	         * @type {respoke.Event}
	         * @property {string} name - the event name.
	         * @property {respoke.DirectConnection} target
	         */
	        that.fire('close');

	        that.ignore();

	        if (that.call && params.skipRemove !== true) {
	            that.call.removeDirectConnection();
	        }

	        dataChannel = null;
	        that.call = null;
	        pc = null;
	    };

	    /**
	     * Send a message over the datachannel in the form of a JSON-encoded plain old JavaScript object. Only one
	     * attribute may be given: either a string 'message' or an object 'object'.
	     * **Using callbacks** by passing `params.onSuccess` or `params.onError` will disable promises.
	     *
	     *     directConnection.sendMessage({
	     *         message: "And they say HTTP is stateless!"
	     *     });
	     *
	     * @memberof! respoke.DirectConnection
	     * @method respoke.DirectConnection.sendMessage
	     * @param {object} params
	     * @param {string} [params.message] - The message to send.
	     * @param {object} [params.object] - An object to send.
	     * @param {respoke.DirectConnection.sendHandler} [params.onSuccess] - Success handler for this invocation
	     * of this method only.
	     * @param {respoke.DirectConnection.errorHandler} [params.onError] - Error handler for this invocation
	     * of this method only.
	     * @returns {Promise|undefined}
	     */
	    that.sendMessage = function (params) {
	        var deferred = Q.defer();
	        var retVal = respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);
	        if (that.isActive()) {
	            dataChannel.send(JSON.stringify(params.object || {
	                message: params.message
	            }));
	            deferred.resolve();
	        } else {
	            deferred.reject(new Error("dataChannel not in an open state."));
	        }
	        return retVal;
	    };

	    /**
	     * Expose close as reject for approve/reject workflow.
	     *
	     *     client.listen('direct-connection, function (evt) {
	     *         if (iDontLikeThisPerson()) {
	     *             evt.directConnection.reject();
	     *         }
	     *     });
	     *
	     * @memberof! respoke.DirectConnection
	     * @method respoke.DirectConnection.reject
	     * @param {boolean} signal - Optional flag to indicate whether to send or suppress sending
	     * a hangup signal to the remote side.
	     */
	    that.reject = that.close;

	    /**
	     * Indicate whether a datachannel is being setup or is in progress.
	     * @memberof! respoke.DirectConnection
	     * @method respoke.DirectConnection.isActive
	     * @returns {boolean}
	     */
	    that.isActive = function () {
	        // Why does pc.iceConnectionState not transition into 'connected' even though media is flowing?
	        //return (pc && pc.isActive() && dataChannel && dataChannel.readyState === 'open');
	        return (dataChannel && dataChannel.readyState === 'open');
	    };

	    return that;
	}; // End respoke.DirectConnection

	/**
	 * Called when the direct connection is closed.  This callback is called every time respoke.DirectConnection#close
	 * fires.
	 * @callback respoke.DirectConnection.onClose
	 * @param {respoke.Event} evt
	 * @param {string} evt.name - the event name.
	 * @param {respoke.DirectConnection} evt.target
	 */
	/**
	 * Called when the setup of the direct connection has begun. The direct connection will not be open yet. This
	 * callback is called every time respoke.DirectConnection#start fires.
	 * @callback respoke.DirectConnection.onStart
	 * @param {respoke.Event} evt
	 * @param {string} evt.name - the event name.
	 * @param {respoke.DirectConnection} evt.target
	 */
	/**
	 * Called when the direct connection is opened.  This callback is called every time respoke.DirectConnection#open
	 * fires.
	 * @callback respoke.DirectConnection.onOpen
	 * @param {respoke.Event} evt
	 * @param {string} evt.name - the event name.
	 * @param {respoke.DirectConnection} evt.target
	 */
	/**
	 * Called when a message is received over the direct connection.  This callback is called every time
	 * respoke.DirectConnection#message fires.
	 * @callback respoke.DirectConnection.onMessage
	 * @param {respoke.Event} evt
	 * @param {object} evt.message
	 * @param {respoke.Endpoint} evt.endpoint
	 * @param {string} evt.name - the event name.
	 * @param {respoke.DirectConnection} evt.target
	 */
	/**
	 * Handle an error that resulted from a specific method call. This handler will not fire more than once.
	 * @callback respoke.DirectConnection.errorHandler
	 * @param {Error} err
	 */
	/**
	 * When a call is in setup or media renegotiation happens. This callback will be called every time
	 * respoke.DirectConnection#error.
	 * @callback respoke.DirectConnection.onError
	 * @param {respoke.Event} evt
	 * @param {boolean} evt.reason - A human-readable description of the error.
	 * @param {string} evt.name - the event name.
	 * @param {respoke.DirectConnection} evt.target
	 */
	/**
	 * Called when the callee accepts the direct connection. This callback is called every time
	 * respoke.DirectConnection#accept is fired.
	 * @callback respoke.DirectConnection.onAccept
	 * @param {respoke.Event} evt
	 * @param {respoke.DirectConnection} evt.target
	 */
	/**
	 * Handle the successful kick-off of stats on a call.
	 * @callback respoke.DirectConnection.statsSuccessHandler
	 * @param {respoke.Event} evt
	 * @param {object} evt.stats - an object with stats in it.
	 * @param {respoke.DirectConnection} evt.target
	 * @param {string} evt.name - the event name.
	 */
	/**
	 * Handle sending successfully.
	 * @callback respoke.DirectConnection.sendHandler
	 */


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	var Q = __webpack_require__(8);
	var respoke = __webpack_require__(1);
	var log = respoke.log;
	var Statechart = __webpack_require__(19);

	/**
	 * WebRTC PeerConnection. This class handles all the state and connectivity for Call and DirectConnection.
	 * This class cannot be used alone, but is instantiated by and must be given media by either Call, DirectConnection,
	 * or the not-yet-implemented ScreenShare.
	 * @class respoke.PeerConnection
	 * @constructor
	 * @augments respoke.EventEmitter
	 * @param {object} params
	 * @param {string} params.instanceId - client id
	 * @param {boolean} [params.forceTurn] - If true, delete all 'host' and 'srvflx' candidates and send only 'relay'
	 * candidates.
	 * @param {boolean} [params.disableTurn] - If true, delete all 'relay' candidates and send only 'host' and 'srvflx'
	 * candidates.
	 * @param {respoke.Call} params.call
	 * @param {string} params.connectionId - The connection ID of the remoteEndpoint.
	 * @param {function} params.signalOffer - Signaling action from SignalingChannel.
	 * @param {function} params.signalConnected - Signaling action from SignalingChannel.
	 * @param {function} params.signalModify - Signaling action from SignalingChannel.
	 * @param {function} params.signalAnswer - Signaling action from SignalingChannel.
	 * @param {function} params.signalHangup - Signaling action from SignalingChannel.
	 * @param {function} params.signalReport - Signaling action from SignalingChannel.
	 * @param {function} params.signalCandidate - Signaling action from SignalingChannel.
	 * @param {respoke.Call.onHangup} [params.onHangup] - Callback for the developer to be notified about hangup.
	 * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - Callback for the developer to receive
	 * statistics about the call. This is only used if call.getStats() is called and the stats module is loaded.
	 * @param {object} [params.pcOptions]
	 * @param {object} [params.offerOptions]
	 * @returns {respoke.PeerConnection}
	 */

	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name instanceId
	     * @private
	     * @type {string}
	     */
	    var instanceId = params.instanceId;
	    var that = respoke.EventEmitter(params);
	    delete that.instanceId;
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name className
	     * @type {string}
	     */
	    that.className = 'respoke.PeerConnection';

	    /**
	     * Whether or not we will send a 'hangup' signal to the other side during hangup.
	     * @memberof! respoke.PeerConnection
	     * @name toSendHangup
	     * @type {respoke.Endpoint}
	     */
	    var toSendHangup;

	    /**
	     * @memberof! respoke.PeerConnection
	     * @private
	     * @name pc
	     * @type RTCPeerConnection
	     * @desc The RTCPeerConnection as provided by the browser API. All internal state, networking functionality, and
	     * raw data transfer occurs within the PeerConnection.
	     */
	    var pc = null;
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name defModify
	     * @private
	     * @type {Promise}
	     * @desc Used in the state machine to trigger methods or functions whose execution depends on the reception,
	     * handling, or sending of some information.
	     */
	    var defModify;
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name previewLocalMedia
	     * @private
	     * @type {respoke.Call.previewLocalMedia}
	     * @desc A callback provided by the developer that we'll call after receiving local media and before
	     * approve() is called.
	     */
	    var previewLocalMedia = typeof params.previewLocalMedia === 'function' ? params.previewLocalMedia : undefined;
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name candidateReceivingQueue
	     * @private
	     * @type {array}
	     * @desc An array to save candidates between offer and answer so that both parties can process them simultaneously.
	     */
	    var candidateReceivingQueue = respoke.queueFactory();
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name client
	     * @private
	     * @type {respoke.Client}
	     */
	    var client = respoke.getClient(instanceId);
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name signalOffer
	     * @private
	     * @type {function}
	     * @desc A signaling function constructed by the signaling channel.
	     */
	    var signalOffer = params.signalOffer;
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name signalConnected
	     * @private
	     * @type {function}
	     * @desc A signaling function constructed by the signaling channel.
	     */
	    var signalConnected = params.signalConnected;
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name signalModify
	     * @private
	     * @type {function}
	     * @desc A signaling function constructed by the signaling channel.
	     */
	    var signalModify = params.signalModify;
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name signalAnswer
	     * @private
	     * @type {function}
	     * @desc A signaling function constructed by the signaling channel.
	     */
	    var signalAnswer = params.signalAnswer;
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name signalHangup
	     * @private
	     * @type {function}
	     * @desc A signaling function constructed by the signaling channel.
	     */
	    var signalHangup = respoke.callOnce(params.signalHangup);
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name signalReport
	     * @private
	     * @type {function}
	     * @desc A signaling function constructed by the signaling channel.
	     */
	    var signalReport = params.signalReport;
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name signalCandidateOrig
	     * @private
	     * @type {function}
	     * @desc A temporary function saved from params in order to construct the candidate signaling function.
	     */
	    var signalCandidateOrig = params.signalCandidate;

	    /**
	     * The RTCDTMFSender as provided by the browser API.
	     * @memberof! respoke.PeerConnection
	     * @private
	     * @name digitSender
	     * @type RTCDigitSender
	     */

	    var digitSender = null;

	    /**
	     * A temporary variable to define if we're in the middle of cancelling any tones on a peer connection
	     * @memberof! respoke.PeerConnection
	     * @private
	     * @name cancellingTones
	     * @type boolean
	     */

	    var cancellingTones = false;

	    /**
	     * @memberof! respoke.PeerConnection
	     * @name signalCandidates
	     * @private
	     * @type {function}
	     * @desc A signaling function constructed from the one passed to us by the signaling channel with additions
	     * to facilitate candidate logging.
	     */

	    function signalCandidates(params) {
	        if (!pc) {
	            return Q.resolve();
	        }

	        params.call = that.call;
	        that.report.candidatesSent = that.report.candidatesSent.concat(params.iceCandidates);

	        return signalCandidateOrig(params);
	    }

	    /**
	     * @memberof! respoke.PeerConnection
	     * @name offerOptions
	     * @private
	     * @type {object}
	     */
	    var offerOptions = params.offerOptions || {};
	    /**
	     * @memberof! respoke.PeerConnection
	     * @name pcOptions
	     * @private
	     * @type {object}
	     */
	    var pcOptions = params.pcOptions || {
	        optional: [
	            { DtlsSrtpKeyAgreement: true },
	            { RtpDataChannels: false }
	        ]
	    };

	    /**
	     * @memberof! respoke.PeerConnection
	     * @name report
	     * @type {object}
	     */
	    that.report = {
	        callStarted: 0,
	        callStopped: 0,
	        callerendpoint: that.call.caller ? client.name : that.call.remoteEndpoint.id,
	        callerconnection: that.call.caller ? client.id : that.call.connectionId,
	        calleeendpoint: that.call.caller ? that.call.remoteEndpoint.id : client.id,
	        calleeconnection: that.call.caller ? that.call.connectionId : client.connectionId,
	        sessionId: that.call.id,
	        lastSDPString: '',
	        sdpsSent: [],
	        sdpsReceived: [],
	        candidatesSent: [],
	        candidatesReceived: [],
	        userAgent: navigator.userAgent,
	        os: navigator.platform
	    };

	    /**
	     * Start the process of network and media negotiation. Called after local video approved.
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.initOffer
	     * @fires respoke.PeerConnection#initOffer
	     * @private
	     */
	    function initOffer() {
	        if (!pc) {
	            return;
	        }

	        if (that.state.receiveOnly) {
	            makeOptionsReceiveOnly(offerOptions);
	        }

	        if (that.state.sendOnly) {
	            makeOptionsSendOnly(offerOptions);
	        }

	        log.info('creating offer', offerOptions);

	        pc.createOffer(function saveOfferAndSend(oSession) {
	            oSession.type = 'offer';
	            if (!pc) {
	                return;
	            }
	            log.debug('setting and sending offer', oSession);
	            that.report.sdpsSent.push(oSession);

	            pc.setLocalDescription(oSession, function successHandler(p) {
	                oSession.type = 'offer';
	                signalOffer({
	                    call: that.call,
	                    sessionDescription: oSession,
	                    onSuccess: function () {
	                        that.state.sentSDP = true;
	                        localCandidatesFSM.dispatch('ready');
	                    },
	                    onError: function (err) {
	                        log.error('offer could not be sent', err);
	                        that.call.hangup({signal: false});
	                    }
	                });
	            }, function errorHandler(p) {
	                var errorMessage = 'Error calling setLocalDescription on offer I created.';
	                var err = new Error(errorMessage);
	                log.error(errorMessage, p);
	                /**
	                 * This event is fired on errors that occur during call setup or media negotiation.
	                 * @event respoke.Call#error
	                 * @type {respoke.Event}
	                 * @property {string} reason - A human readable description about the error.
	                 * @property {respoke.Call} target
	                 * @property {string} name - the event name.
	                 */
	                that.call.fire('error', {
	                    message: err.message
	                });
	            });
	        }, function errorHandler(e) {
	            log.error('createOffer failed', e);
	        }, offerOptions);
	    }

	    function makeOptionsReceiveOnly(options) {
	        if (navigator.webkitGetUserMedia) {
	            options.mandatory = {
	                OfferToReceiveVideo: true,
	                OfferToReceiveAudio: true,
	                OfferToSendVideo: false,
	                OfferToSendAudio: false
	            };
	        } else {
	            options.offerToReceiveVideo = true;
	            options.offerToReceiveAudio = true;
	            options.offerToSendVideo = false;
	            options.offerToSendAudio = false;
	        }
	    }

	    function makeOptionsSendOnly(options) {
	        if (navigator.webkitGetUserMedia) {
	            options.mandatory = {
	                OfferToSendVideo: true,
	                OfferToSendAudio: true,
	                OfferToReceiveVideo: false,
	                OfferToReceiveAudio: false
	            };
	        } else {
	            options.offerToSendVideo = true;
	            options.offerToSendAudio = true;
	            options.offerToReceiveVideo = false;
	            options.offerToReceiveAudio = false;
	        }
	    }

	    /**
	     * @memberof! respoke.PeerConnection
	     * @name localCandidates
	     * @private
	     * @type {array}
	     * @desc An array to save local candidates, to retransmit for peers that
	     *       don't support trickle ice.
	     */
	    var localCandidates = [];

	    /**
	     * @memberof! respoke.PeerConnection
	     * @name localCandidatesComplete
	     * @private
	     * @type {boolean}
	     * @desc Whether all the local candidates have been received.
	     */
	    var localCandidatesComplete = false;

	    /**
	     * @memberof! respoke.PeerConnection
	     * @name localCandidatesSent
	     * @private
	     * @type {number}
	     * @desc The number of local candidates that have been sent to the remote.
	     */
	    var localCandidatesSent = 0;

	    /**
	     * @memberof! respoke.PeerConnection
	     * @name localCandidatesSent
	     * @private
	     * @type {Statechart}
	     * @desc FSM for managing local ICE candidates.
	     */
	    var localCandidatesFSM;

	    /**
	     * @memberof! respoke.PeerConnection
	     * @name localCandidatesTimeout
	     * @private
	     * @type {number}
	     * @desc timeoutId for the ice gathering timeout. Fires when no ice candidate
	     *  received in a specified period of time, to speed up finalCandidates signal.
	     */
	    var localCandidatesTimeout;

	    /**
	     * The number of local candidates that have not yet been sent.
	     * @returns {number}
	     * @private
	     */
	    function localCandidatesRemaining() {
	        return localCandidates.length - localCandidatesSent;
	    }

	    /**
	     * Throw another local ICE candidate on the pile
	     * @param params
	     * @param params.candidate ICE candidate
	     * @private
	     */
	    function collectLocalIceCandidate(params) {
	        if (params && params.candidate) {
	            localCandidates.push(params.candidate);
	        }
	    }

	    /**
	     * Send the remaining local candidates that have not yet been sent.
	     * @private
	     */
	    function sendRemainingCandidates(params) {
	        var remainingCandidates = localCandidates.slice(localCandidatesSent);
	        var signalParams = {iceCandidates: remainingCandidates};

	        localCandidatesSent += remainingCandidates.length;

	        if (localCandidatesComplete && !(params && params.suppressFinalCandidates)) {
	            signalParams.finalCandidates = localCandidates;
	        }

	        if (!signalParams.iceCandidates.length && !signalParams.finalCandidates) {
	            // Nothing to send. Happens if we receive the null "end of ice" ice candidate
	            // after we've already sent the finalCandidates signal.
	            return;
	        }

	        signalCandidates(signalParams)
	            .finally(function () {
	                localCandidatesFSM.dispatch('iceSent');
	            }).done();
	    }

	    localCandidatesFSM = respoke.Class({
	        that: Object.create(Statechart),
	        initialState: 'buffering',
	        states: {
	            buffering: {
	                localIceCandidate: {action: collectLocalIceCandidate},
	                ready: [{
	                    guard: function () {
	                        return localCandidatesRemaining() === 0 && localCandidatesComplete;
	                    },
	                    target: 'finished',
	                    action: function () {
	                        log.error('ice completed without any candidates');
	                    }
	                }, {
	                    guard: function () {
	                        return localCandidatesRemaining() === 0 && !localCandidatesComplete;
	                    },
	                    target: 'waiting'
	                }, {
	                    guard: function () {
	                        return localCandidatesRemaining() !== 0;
	                    },
	                    target: 'sending',
	                    action: sendRemainingCandidates
	                }]
	            },
	            sending: {
	                localIceCandidate: {action: collectLocalIceCandidate},
	                iceSent: [{
	                    guard: function () {
	                        return localCandidatesRemaining() === 0 && localCandidatesComplete;
	                    },
	                    target: 'finished'
	                }, {
	                    guard: function () {
	                        return localCandidatesRemaining() === 0 && !localCandidatesComplete;
	                    },
	                    target: 'waiting'
	                }, {
	                    guard: function () {
	                        return localCandidatesRemaining() !== 0;
	                    },
	                    action: sendRemainingCandidates
	                }]
	            },
	            waiting: {
	                entry: {
	                    action: function () {
	                        localCandidatesTimeout = setTimeout(function () {
	                            log.debug('ice gathering has timed out. sending final candidate signal.');
	                            localCandidatesComplete = true;
	                            localCandidatesFSM.dispatch('localIceCandidate');
	                        }, 2000);
	                    }
	                },
	                exit: {
	                    action: function () {
	                        clearTimeout(localCandidatesTimeout);
	                    }
	                },
	                localIceCandidate: {
	                    action: function (params) {
	                        collectLocalIceCandidate(params);
	                        sendRemainingCandidates();
	                    },
	                    target: 'sending'
	                }
	            },
	            finished: {
	                localIceCandidate: {
	                    // helps trickleIce-compatible clients
	                    action: function (params) {
	                        collectLocalIceCandidate(params);
	                        sendRemainingCandidates({ suppressFinalCandidates: true });
	                    }
	                }
	            }
	        }
	    });

	    localCandidatesFSM.run();

	    /**
	     * Process a remote offer if we are not the caller. This is necessary because we don't process the offer until
	     * the callee has answered the call.
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.processOffer
	     * @param {RTCSessionDescriptor}
	     * @returns {Promise}
	     */
	    that.processOffer = function (oOffer) {

	        function onSetRemoteDescriptionSuccess() {
	            if (!pc) {
	                return;
	            }

	            log.debug('set remote desc of offer succeeded');

	            processReceivingQueue();

	            pc.createAnswer(function saveAnswerAndSend(oSession) {
	                if (!pc) {
	                    return;
	                }

	                that.state.processedRemoteSDP = true;

	                if (!that.state.caller) {
	                    that.report.callerconnection = that.call.connectionId;
	                }

	                oSession.type = 'answer';
	                log.debug('setting and sending answer', oSession);
	                that.report.sdpsSent.push(oSession);

	                pc.setLocalDescription(oSession, function successHandler(p) {
	                    oSession.type = 'answer';
	                    signalAnswer({
	                        sessionDescription: oSession,
	                        call: that.call,
	                        onSuccess: function () {
	                            localCandidatesFSM.dispatch('ready');
	                        }
	                    });
	                    that.state.sentSDP = true;
	                }, function errorHandler(p) {
	                    var errorMessage = 'Error calling setLocalDescription on answer I created.';
	                    var err = new Error(errorMessage);
	                    log.error(errorMessage, p);
	                    /**
	                     * This event is fired on errors that occur during call setup or media negotiation.
	                     * @event respoke.Call#error
	                     * @type {respoke.Event}
	                     * @property {string} reason - A human readable description about the error.
	                     * @property {respoke.Call} target
	                     * @property {string} name - the event name.
	                     */
	                    that.call.fire('error', {
	                        message: err.message
	                    });
	                });
	            }, function errorHandler(err) {
	                log.error('create answer failed', err);

	                err = new Error("Error creating SDP answer. " + err);
	                that.report.callStoppedReason = err.message;

	                /**
	                 * This event is fired on errors that occur during call setup or media negotiation.
	                 * @event respoke.Call#error
	                 * @type {respoke.Event}
	                 * @property {string} reason - A human readable description about the error.
	                 * @property {respoke.Call} target
	                 * @property {string} name - the event name.
	                 */
	                that.call.fire('error', {
	                    message: err.message
	                });
	                that.report.callStoppedReason = 'setRemoteDescription failed at answer.';
	                that.close();
	            });
	        }

	        function onSetRemoteDescriptionInitialError(err) {
	            log.debug('Error calling setRemoteDescription on offer I received.', err);

	            if (!pc) {
	                return;
	            }

	            /*
	             * Attempt to remove the dtls transport protocol from the offer sdp. This has been observed
	             * to cause setRemoteDescription failures when Chrome 46+ is placing calls to Chrome <= 41.
	             * This is a particularly acute issue when using nw.js 0.12.x or lower.
	             */
	            var alteredSdp = oOffer.sdp.replace(/UDP\/TLS\/RTP\/SAVPF/g, 'RTP/SAVPF');
	            if (oOffer.sdp !== alteredSdp) {
	                oOffer.sdp = alteredSdp;
	                log.debug('Retrying setRemoteDescription with legacy transport in offer sdp', oOffer);
	                pc.setRemoteDescription(new RTCSessionDescription(oOffer),
	                    onSetRemoteDescriptionSuccess, onSetRemoteDescriptionFinalError);
	                return;
	            }

	            onSetRemoteDescriptionFinalError(err);
	        }

	        function onSetRemoteDescriptionFinalError(p) {
	            var errorMessage = 'Error calling setRemoteDescription on offer I received.';
	            var err = new Error(errorMessage);
	            log.error(errorMessage, p);
	            that.report.callStoppedReason = err.message;

	            /**
	             * This event is fired on errors that occur during call setup or media negotiation.
	             * @event respoke.Call#error
	             * @type {respoke.Event}
	             * @property {string} reason - A human readable description about the error.
	             * @property {respoke.Call} target
	             * @property {string} name - the event name.
	             */
	            that.call.fire('error', {
	                message: err.message
	            });
	        }

	        if (!pc) {
	            return;
	        }

	        log.debug('processOffer', oOffer);

	        that.report.sdpsReceived.push(oOffer);
	        that.report.lastSDPString = oOffer.sdp;

	        //set flags for audio / video being offered
	        that.call.hasDataChannel = respoke.sdpHasDataChannel(oOffer.sdp);

	        try {
	            pc.setRemoteDescription(new RTCSessionDescription(oOffer),
	                onSetRemoteDescriptionSuccess, onSetRemoteDescriptionInitialError);
	        } catch (err) {
	            var newErr = new Error("Exception calling setRemoteDescription on offer I received." + err.message);
	            that.report.callStoppedReason = newErr.message;

	            /**
	             * This event is fired on errors that occur during call setup or media negotiation.
	             * @event respoke.Call#error
	             * @type {respoke.Event}
	             * @property {string} reason - A human readable description about the error.
	             * @property {respoke.Call} target
	             * @property {string} name - the event name.
	             */
	            that.call.fire('error', {
	                message: newErr.message
	            });
	        }
	    };

	    /**
	     * Return media stats. Since we have to wait for both the answer and offer to be available before starting
	     * statistics, we'll return a promise for the stats object.
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.getStats
	     * @returns {Promise<{respoke.MediaStatsParser}>|undefined}
	     * @param {object} params
	     * @param {number} [params.interval=5000] - How often in milliseconds to fetch statistics.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onSuccess] - Success handler for this
	     * invocation of this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @fires respoke.PeerConnection#stats
	     */
	    function getStats(params) {
	        var deferred = Q.defer();
	        var retVal = respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);

	        if (!respoke.MediaStats) {
	            deferred.reject(new Error("Statistics module is not loaded."));
	            return retVal;
	        }

	        function onConnect() {
	            var stats = respoke.MediaStatsParser({
	                peerConnection: pc,
	                interval: params.interval,
	                onStats: function statsHandler(stats) {
	                    if (!pc) {
	                        return;
	                    }

	                    /**
	                     * This event is fired every 5 seconds by default, configurable by the 'interval' property to
	                     * `call.startStats` and reports the current state of media statistics.
	                     * @event respoke.PeerConnection#stats
	                     * @type {respoke.Event}
	                     * @property {object} stats - an object with stats in it.
	                     * @property {string} name - the event name.
	                     * @property {respoke.PeerConnection}
	                     */
	                    that.fire('stats', {
	                        stats: stats
	                    });
	                }
	            });
	            that.listen('close', function closeHandler(evt) {

	                stats.stopStats();
	            }, true);
	            deferred.resolve();
	        }

	        if (!pc) {
	            that.once('stream-received', onConnect);
	        } else {
	            onConnect();
	        }

	        return retVal;
	    }

	    if (respoke.MediaStats) {
	        that.getStats = getStats;
	    }

	    /**
	     * Create the RTCPeerConnection and add handlers. Process any offer we have already received.
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.init
	     */
	    that.init = function init() {
	        log.debug('PC.init');

	        if (pc) {
	            return;
	        }

	        that.report.callStarted = new Date().getTime();

	        pc = new RTCPeerConnection(that.servers, pcOptions);

	        /**
	         * Process a local ICE Candidate
	         *
	         * @param {RTCIceCandidate} oCan
	         */
	        pc.onicecandidate = function onIceCandidate(oCan) {
	                var candidate = oCan.candidate; // {candidate: ..., sdpMLineIndex: ... }
	                if (!pc) {
	                    return;
	                }

	                // From http://www.w3.org/TR/webrtc/#operation
	                // If the intent of the ICE Agent is to notify the script that:
	                //  [snip]
	                //  * The gathering process is done.
	                //    Set connection's ice gathering state to completed and let newCandidate be null.
	                if (!candidate || !candidate.candidate) {
	                    if (pc.iceGatheringState === 'complete') {
	                        localCandidatesComplete = true;
	                        localCandidatesFSM.dispatch('localIceCandidate');
	                    }
	                    return;
	                }

	                if (that.forceTurn === true && candidate.candidate.indexOf("typ relay") === -1) {
	                    log.debug("Dropping candidate because forceTurn is on.");
	                    return;
	                } else if (that.disableTurn === true && candidate.candidate.indexOf("typ relay") !== -1) {
	                    log.debug("Dropping candidate because disableTurn is on.");
	                    return;
	                }

	                localCandidatesFSM.dispatch('localIceCandidate', {candidate: candidate});
	            }
	        ;

	        /**
	         * Handle ICE state change
	         */
	        pc.oniceconnectionstatechange = function onIceConnectionStateChange(/* evt */) {
	                if (!pc) {
	                    return;
	                }

	                if (pc.iceConnectionState === 'connected') {
	                    /**
	                     * Indicate that we've successfully connected to the remote side. This is only helpful for the
	                     * outgoing connection.
	                     * @event respoke.PeerConnection#connect
	                     * @type {respoke.Event}
	                     * @property {string} name - the event name.
	                     * @property {respoke.PeerConnection}
	                     */
	                    that.fire('connect');
	                }
	            }
	        ;

	        pc.onaddstream = function onaddstream(evt) {
	            /**
	             * Indicate the RTCPeerConnection has received remote media.
	             * @event respoke.PeerConnection#stream-added
	             * @type {respoke.Event}
	             * @property {string} name - the event name.
	             * @property {respoke.PeerConnection}
	             */
	            that.fire('stream-added', {
	                stream: evt.stream
	            });
	        };

	        pc.onremovestream = function onremovestream(evt) {
	            /**
	             * Indicate the remote side has stopped sending media.
	             * @event respoke.PeerConnection#stream-removed
	             * @type {respoke.Event}
	             * @property {string} name - the event name.
	             * @property {respoke.PeerConnection}
	             */
	            that.fire('stream-removed', {
	                stream: evt.stream
	            });
	        };

	        pc.ondatachannel = function ondatachannel(evt) {
	            /**
	             * CAUTION: This event is only called for the callee because RTCPeerConnection#ondatachannel
	             * is only called for the callee.
	             * @event respoke.PeerConnection#direct-connection
	             * @type {respoke.Event}
	             * @property {string} name - the event name.
	             * @property {respoke.PeerConnection}
	             */
	            that.fire('direct-connection', {
	                channel: evt.channel
	            });
	        };

	        that.state.listen('offering:entry', function (evt) {
	            if (that.state.caller) {
	                initOffer();
	            }
	        });
	    };

	    /**
	     * Return an array of remote media streams.
	     * @muremberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.getRemoteStreams
	     */
	    that.getRemoteStreams = function () {
	        if (!pc) {
	            return [];
	        }
	        return pc.getRemoteStreams.apply(pc, Array.prototype.slice.call(arguments));
	    };

	    /**
	     * Return an array of local media streams.
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.getLocalStreams
	     */
	    that.getLocalStreams = function () {
	        if (!pc) {
	            return [];
	        }
	        return pc.getLocalStreams.apply(pc, Array.prototype.slice.call(arguments));
	    };

	    /**
	     * Create a data channel.
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.createDataChannel
	     */
	    that.createDataChannel = function () {
	        if (!pc) {
	            return;
	        }
	        return pc.createDataChannel.apply(pc, Array.prototype.slice.call(arguments));
	    };

	    /**
	     * Add any tracks from the provided stream to the peer connection.
	     *
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.addLocalTracksFromStream
	     */
	    that.addLocalTracksFromStream = function (stream) {
	        if (!pc) {
	            /**
	             * This event is fired on errors that occur during call setup or media negotiation.
	             * @event respoke.Call#error
	             * @type {respoke.Event}
	             * @property {string} reason - A human readable description about the error.
	             * @property {respoke.Call} target
	             * @property {string} name - the event name.
	             */
	            that.call.fire('error', {
	                message: "Got local stream in a precall state."
	            });
	            return;
	        }

	        if (webrtcDetectedBrowser === 'firefox') {
	            stream.getTracks().forEach(function (track) {
	                pc.addTrack(track, stream);
	            });
	        } else {
	            pc.addStream(stream);
	        }
	    };

	    /**
	     * Remove and stop any local streams that are already added to the peer connection.
	     * This releases the resources used by those streams when renegotiating media.
	     *
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.removeLocalTracks
	     */
	    that.removeLocalTracks = function () {
	        if (webrtcDetectedBrowser === 'firefox') {
	            pc.getLocalStreams().forEach(function (stream) {
	                stream.getTracks().forEach(function (track) {
	                    track.stop();
	                });
	            });
	            pc.getSenders().forEach(function (sender) {
	                pc.removeTrack(sender);
	            });
	        } else {
	            pc.getLocalStreams().forEach(function (stream) {
	                stream.getTracks().forEach(function (track) {
	                    track.stop();
	                });
	                pc.removeStream(stream);
	            });
	        }
	    };

	    /**
	     * Process any ICE candidates that we received from the other side while we were waiting on the other
	     * party's SDP to arrive and be processed.
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.processReceivingQueue
	     * @private
	     */
	    function processReceivingQueue() {
	        candidateReceivingQueue.trigger(function processIce(can) {
	            if (!pc) {
	                return;
	            }

	            pc.addIceCandidate(new RTCIceCandidate(can.candidate), function onSuccess() {
	                log.debug((that.state.caller ? 'caller' : 'callee'), 'got a remote candidate.', can.candidate);
	                that.report.candidatesReceived.push(can.candidate);
	            }, function onError(e) {
	                log.error("Couldn't add ICE candidate", e, can.candidate);
	            });
	        });
	    }

	    /**
	     * Send DTMF tones to the first audio track on the call. This allows interaction with a phone system expecting keys
	     * to be pressed on a normal phone, such as when calling a company for customer support and having to "Press 1 for English".
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.sendTones
	     * @param {object} params
	     * @param {string} params.tones - The tones to send. Can be any combination of the characters '0123456789ABCD#*', or
	     *  a ',' (comma) to insert a 2 second pause before sending the next tone.
	     * @param {number} [params.duration] - Optional number in milliseconds to indicate how long to play each tone. This
	     *  value needs to be between 40 and 6000. Defaults to 100.
	     * @param {number} [params.gap] - Optional number in mlliseconds to indicate the gap between playing the tones.
	     *  This value needs to be larger than 30. Defaults to 70.
	     * @param {respoke.Call.onSuccess} [params.onSuccess] - Callback called when all requested DTMF tones have been played.
	     * @param {respoke.Call.onError} [params.onError] - Callback called when an error occurs while playing back the DTMF
	     *  tones, or when the request has been cancelled.
	     * @fires respoke.PeerConnection#tone-sent
	     * @fires respoke.PeerConnection#tone-sending-complete
	     * @returns {Promise|null} Returns a promise if no onSuccess nor onError callbacks are specified. Otherwise, returns null.
	     */
	    that.sendTones = function (params) {
	        var deferred = Q.defer();

	        var retVal = respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);

	        params = typeof params === 'object' ? params : {};

	        params.duration = params.duration || 100;
	        params.gap = params.gap || 50;//chrome says minimum is 50 not 30 like the spec

	        var err;

	        if (!pc) {
	            err = new Error('No Peer Connection available');
	        }
	        if (!params.tones) {
	            err = new Error('Unable to send tones as none passed in');
	        }

	        if (params.duration > 6000 || params.duration < 40) {
	            err = new Error('Unable to send tones as duration needs to be between 40 and 6000 milliseconds');
	        }

	        if (params.gap < 50 ) {
	            err = new Error('Unable to send tones as gap needs to be greater than 50 milliseconds');
	        }

	        if (params.tones && !params.tones.match(/^([A-D0-9,#*])+$/ig)) {
	            err = new Error('Unable to send tones as tones passed in were not in correct format');
	        }

	        if (pc && !pc.createDTMFSender) {
	            err = new Error('Unable to send tones in this browser');
	        }

	        if (err) {
	            log.warn(err);
	            deferred.reject(err);
	            return retVal;
	        }

	        if (digitSender) {
	            err = new Error('Unable to queue tones on audio track as a digitSender already exists');
	            log.warn(err);
	            deferred.reject(err);
	            return retVal;
	        }

	        var audioTracks = that.call.outgoingMedia.getAudioTracks();
	        if (!audioTracks || audioTracks.length < 1) {
	            err = new Error('Could not send tones "' + params.tones + '". No audio track available.');
	            log.warn(err);
	            deferred.reject(err);
	            return retVal;
	        }

	        digitSender = pc.createDTMFSender(audioTracks[0]);

	        digitSender.ontonechange = function onToneChange(evt) {
	            if (evt.tone !== '') {
	                /**
	                 * Indicate the RTCPeerConnection has sent a tone.
	                 * @event respoke.PeerConnection#tone-sent
	                 * @type {respoke.Event}
	                 * @property {string} evt.tone
	                 * @property {number} evt.duration
	                 * @property {number} evt.gap
	                 */
	                that.call.fire('tone-sent', {
	                    tone: evt.tone,
	                    duration: digitSender.duration,
	                    gap: digitSender.interToneGap
	                });
	                return;
	            }

	            /*
	             * The tone string is empty, which is how the DTMFSender represents the end
	             * of the tone queue. Cleanup our handlers, wrap up the promises, and fire
	             * the appropriate events.
	             */
	            digitSender = null;

	            if (cancellingTones) {
	                cancellingTones = false;
	                deferred.reject(new Error('Tone playback cancelled'));
	                return;
	            }

	            /**
	             * Indicate the RTCPeerConnection has finished sending tones, unless they were cancelled.
	             * @event respoke.PeerConnection#tone-sending-complete
	             * @type {respoke.Event}
	             * @property {string} name - the event name.
	             */
	            deferred.resolve();
	            that.call.fire('tone-sending-complete');
	        };

	        if (!digitSender.canInsertDTMF) {
	            err = new Error('Unable to insert tones into audio track');
	            log.warn(err);
	            deferred.reject(err);
	            return retVal;
	        }

	        try {
	            digitSender.insertDTMF(params.tones, params.duration, params.gap);
	        } catch (e) {
	            err = new Error('Unable to queue tones on audio track due to an error');
	            log.warn(err, params, e);
	            deferred.reject(err);
	            return retVal;
	        }
	        log.debug('successfully queued playback of tones', {
	            tones: digitSender.toneBuffer,
	            duration: digitSender.duration,
	            gap: digitSender.interToneGap
	        });

	        return retVal;
	    };

	    /**
	     * Cancel any tones currently being sent via sendTones.
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.cancelTones
	     * @param {object} params
	     * @param {function} [params.onSuccess] - Success handler for this invocation of this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this method only.
	     * @fires respoke.PeerConnection#tone-sending-cancelled
	     * @returns {Promise|null} Returns a promise if no onSuccess nor onError callbacks are specified. Otherwise, returns null.
	     */
	    that.cancelTones = function (params) {
	        var deferred = Q.defer();
	        var retVal = respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);
	        var err;

	        if (!pc) {
	            err = new Error('No Peer Connection available');
	            log.warn(err);
	            deferred.reject(err);
	            return retVal;
	        }

	        if (!digitSender) {
	            err = new Error('Unable to queue tones on audio track as a digitSender does not exist');
	            log.warn(err);
	            deferred.reject(err);
	            return retVal;
	        }

	        if (!digitSender.canInsertDTMF) {
	            err = new Error('Unable to cancel playback of tones as cannot change tones on audio track');
	            log.warn(err);
	            deferred.reject(err);
	            return retVal;
	        }

	        cancellingTones = true;
	        var tonesToCancel = digitSender.toneBuffer;

	        try {
	            digitSender.insertDTMF('');
	        } catch (e) {
	            err = new Error('Unable to cancel playback of tones');
	            log.warn(err, e);
	            deferred.reject(err);
	            return retVal;
	        }

	        /**
	         * Indicate the RTCPeerConnection has finished cancelling tones.
	         * @event respoke.PeerConnection#tone-sending-cancelled
	         * @type {respoke.Event}
	         * @property {string} name - the event name.
	         */
	        deferred.resolve();
	        that.call.fire('tone-sending-cancelled', {
	            cancelledTones: tonesToCancel
	        });

	        return retVal;
	    };

	    /**
	     * Tear down the call, release user media.  Send a hangup signal to the remote party if
	     * signal is not false and we have not received a hangup signal from the remote party.
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.close
	     * @param {object} params
	     * @param {boolean} [params.signal] - Optional flag to indicate whether to send or suppress sending
	     *  a hangup signal to the remote side. This is set to false by the library if we're responding to a
	     *  hangup signal.
	     * @fires respoke.PeerConnection#close
	     */
	    that.close = function (params) {
	        params = params || {};
	        toSendHangup = true;

	        if (that.state.caller === true) {
	            if (!that.state.sentSDP) {
	                // Never send hangup if we are the caller but we haven't sent any other signal yet.
	                toSendHangup = false;
	            }
	        }

	        toSendHangup = (typeof params.signal === 'boolean' ? params.signal : toSendHangup);
	        if (toSendHangup) {
	            log.info('sending hangup');
	            signalHangup({
	                call: that.call
	            });
	        }

	        that.report.callStopped = new Date().getTime();

	        /**
	         * Indicate that the RTCPeerConnection is closed.
	         * @event respoke.PeerConnection#close
	         * @type {respoke.Event}
	         * @property {boolean} sentSignal - Whether or not we sent a 'hangup' signal to the other party.
	         * @property {string} name - the event name.
	         * @property {respoke.PeerConnection}
	         */
	        that.fire('close', {
	            sentSignal: toSendHangup
	        });
	        that.ignore();

	        if (pc && that.report) {
	            pc.close();
	        }
	        pc = null;

	        if (that.call.enableCallDebugReport) {
	            signalReport({
	                report: that.report
	            });
	        }
	        that.report = null;
	    };
	    that.close = respoke.callOnce(that.close);

	    /**
	     * Indicate whether a call is being setup or is in progress.
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.isActive
	     * @returns {boolean}
	     */
	    that.isActive = function () {
	        return !!(pc && ['completed', 'connected', 'new', 'checking'].indexOf(pc.iceConnectionState) > -1);
	    };

	    /**
	     * Send the initiate signal to start the modify process. This method is only called by the caller of the
	     * renegotiation.
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.startModify
	     * @param {object} params
	     * @param {object} [params.constraints] - Indicate this is a request for media and what type of media.
	     * @param {boolean} [params.directConnection] - Indicate this is a request for a direct connection.
	     */
	    that.startModify = function (params) {
	        defModify = Q.defer();
	        signalModify({
	            action: 'initiate',
	            call: that.call,
	            constraints: params.constraints,
	            directConnection: params.directConnection
	        });
	        that.state.dispatch('modify');
	    };

	    /**
	     * Save the candidate. If we initiated the call, place the candidate into the queue so
	     * we can process them after we receive the answer.
	     * @memberof! respoke.PeerConnection
	     * @method respoke.PeerConnection.addRemoteCandidate
	     * @param {object} params
	     * @param {RTCIceCandidate} params.candidate
	     */
	    that.addRemoteCandidate = function (params) {
	        if (!pc && (that.state.sentSDP || that.state.receivedSDP)) { // we hung up.
	            return;
	        }

	        if (!params || !params.candidate || !params.candidate.hasOwnProperty('sdpMLineIndex')) {
	            log.warn("addRemoteCandidate got wrong format!", params);
	            return;
	        }

	        candidateReceivingQueue.push(params);
	    };

	    /**
	     * Save the answer and tell the browser about it.
	     */
	    that.call.listen('signal-answer', function handleAnswerSignal(evt) {
	        log.debug('PC handleAnswerSignal', evt);

	        if (!pc) {
	            return;
	        }

	        log.debug('got answer', evt.signal);

	        that.report.sdpsReceived.push(evt.signal.sessionDescription);
	        that.state.sendOnly = respoke.sdpHasReceiveOnly(evt.signal.sessionDescription.sdp);
	        that.report.lastSDPString = evt.signal.sessionDescription.sdp;

	        if (that.state.caller) {
	            that.report.calleeconnection = evt.signal.fromConnection;
	        }

	        that.call.connectionId = evt.signal.fromConnection;
	        // TODO don't signal connected more than once.
	        signalConnected({
	            call: that.call
	        });

	        pc.setRemoteDescription(
	            new RTCSessionDescription(evt.signal.sessionDescription),
	            function successHandler() {
	                processReceivingQueue();
	                that.state.dispatch('receiveAnswer');
	            }, function errorHandler(p) {
	                var errorMessage = 'Exception calling setRemoteDescription on answer I received.';
	                var newErr = new Error(errorMessage);
	                log.error(errorMessage, p);
	                that.report.callStoppedReason = newErr.message;
	                /**
	                 * This event is fired on errors that occur during call setup or media negotiation.
	                 * @event respoke.Call#error
	                 * @type {respoke.Event}
	                 * @property {string} reason - A human readable description about the error.
	                 * @property {respoke.Call} target
	                 * @property {string} name - the event name.
	                 */
	                that.call.fire('error', {
	                    message: newErr.message
	                });
	                log.error('set remote desc of answer failed', evt.signal.sessionDescription, p);
	                that.report.callStoppedReason = 'setRemoteDescription failed at answer.';
	                that.close();
	            }
	        );
	    }, true);

	    /**
	     * Figure out who won the call. This necessary to prevent two connections of
	     * the same endpoint from thinking they are both on the same call.
	     */
	    that.call.listen('signal-connected', function handleConnectedSignal(evt) {
	        log.debug('PC handleConnectedSignal', evt);

	        if (evt.signal.connectionId !== client.connectionId) {
	            log.debug("Hanging up because I didn't win the call.", evt.signal, client);
	            that.call.hangup({signal: false});
	        }
	    }, true);

	    /**
	     * Indicate a desire from the other side to renegotiate media.
	     */
	    that.call.listen('signal-modify', function handleModifySignal(evt) {
	        var err;
	        log.debug('PC handleModifySignal', evt);

	        if (evt.signal.action === 'accept') {
	            if (defModify.promise.isPending()) {
	                defModify.resolve();
	                /**
	                 * Indicate that the remote party has accepted our invitation to begin renegotiating media.
	                 * @event respoke.PeerConnection#modify-accept
	                 * @type {respoke.Event}
	                 * @property {string} name - the event name.
	                 * @property {respoke.PeerConnection}
	                 */

	                // reset the ice candidate queue for the renegotiation
	                candidateReceivingQueue = respoke.queueFactory();

	                // let the world know we're ready to re-negotiate
	                that.fire('modify-accept', {signal: evt.signal});
	            }
	            return;
	        } else if (evt.signal.action === 'reject') {
	            if (defModify.promise.isPending()) {
	                err = new Error("Remote party cannot negotiate.");
	                log.debug(err.message);
	                defModify.reject(err);
	                /**
	                 * Indicate that the remote party has rejected our invitation to begin renegotiating media.
	                 * @event respoke.PeerConnection#modify-reject
	                 * @type {respoke.Event}
	                 * @property {Error} err
	                 * @property {string} name - the event name.
	                 * @property {respoke.PeerConnection}
	                 */
	                that.fire('modify-reject', {err: err});
	            }
	            return;
	        }

	        // This code only gets executed if signal.action === 'initiate'
	        if (defModify && defModify.promise.isPending()) {
	            // TODO compare signal request ID and accept if we have the higher request ID,
	            // reject if we have the lower request ID.
	            err = new Error("Got modify in a negotiating state.");
	            log.debug(err.message);
	            defModify.reject(err);
	            /**
	             * Indicate that the remote party has rejected our invitation to begin renegotiating media.
	             * @event respoke.PeerConnection#modify-reject
	             * @type {respoke.Event}
	             * @property {Error} err
	             * @property {string} name - the event name.
	             * @property {respoke.PeerConnection}
	             */
	            that.fire('modify-reject', {err: err});
	            signalModify({
	                action: 'reject',
	                call: that.call
	            });
	            return;
	        }

	        defModify = Q.defer();

	        if (!that.state.sentSDP || that.state.isState('idle')) {
	            err = new Error("Got modify in a precall state.");
	            /**
	             * Indicate that the remote party has rejected our invitation to begin renegotiating media.
	             * @event respoke.PeerConnection#modify-reject
	             * @type {respoke.Event}
	             * @property {Error} err
	             * @property {string} name - the event name.
	             * @property {respoke.PeerConnection}
	             */
	            that.fire('modify-reject', {err: err});
	            signalModify({
	                action: 'reject',
	                call: that.call
	            });
	            defModify.reject(err);
	            return;
	        }

	        /*
	         * Received an 'initiate' and we are in the correct state to receive it,
	         * so send the accept and prepare to receive an offer from the remote endpoint.
	         */

	        // reset ice candidate queueing
	        candidateReceivingQueue = respoke.queueFactory();

	        // accept the modify to allow re-negotiating media
	        signalModify({
	            action: 'accept',
	            call: that.call
	        });
	        defModify.resolve();
	    }, true);

	    return that;
	}; // End respoke.PeerConnection


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (c) 2010 David Durman
	//
	// The contents of this file are subject to the MIT License (the "License");
	// you may not use this file except in compliance with the License. You may obtain a copy of the License at
	// http://opensource.org/licenses/MIT.
	//
	// This hierarchical state machine implementation has been inspired
	// by the QP active object framework, see http://www.state-machine.com/


	(function(root, factory){
	    "use strict";

	    if (true) {

	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like enviroments that support module.exports,
	        // like Node.
	        module.exports = factory();

	    } else if (typeof define === 'function' && define.amd) {

	        // AMD. Register as an anonymous module.
	        define(factory);

	    } else {

	        // Browser globals (root is window)
	        root.Statechart = factory();
	    }

	}(this, function(){

	    "use strict";

	    var assert = function(assertion){
	        if (!assertion) {
	            throw new Error("Assertion failed.");
	        }
	    };


	    // Statechart.
	    // -----------

	    // `myState` - the current state
	    // `mySource` - the source of the current transition

	    var Statechart = {

	        run: function(opt){
	            opt = opt || {};
	            this.debug = opt.debug ? opt.debug : function(){};
	            this.construct(this.initialState);
	            this.init(null);
	        },

	        construct: function(initialState){
	            this.myState = this.top();
	            this.mySource = this.state("Initial");

	            // Initial pseudo-state
	            this.states.Initial = {
	                empty: function(){
	                    this.newInitialState(initialState);
	                }
	            };
	            var handled = function(){ return null; };

	            // TOP state
	            this.states.TOP = {
	                entry: handled,
	                exit:  handled,
	                init:  handled,
	                empty: handled
	            };
	            this.flatten();
	        },

	        // Trigger the initial transition and recursively enter the submachine of the top state.
	        // Must be called only once for a given Statechart before dispatching any events to it.
	        init: function(anEventOrNull){
	            assert(this.myState === this.top() && this.mySource !== null);
	            var s = this.myState;    // save top in temp
	            this.mySource.trigger(anEventOrNull);    // topmost initial transition
	            assert(s.equals(this.myState.superstate()));    // verify that we only went one level deep
	            s = this.myState;
	            s.enter();
	            while (s.init() === null) {    // while init is handled (i.e. till we reach a leaf node)
	                assert(s.equals(this.myState.superstate()));    // verify that we only went one level deep
	                s = this.myState;
	                s.enter();
	            }
	        },

	        state: function(stateOrName){
	            return (stateOrName && stateOrName instanceof QState) ? stateOrName : new QState(this, stateOrName);
	        },

	        top: function(stateOrName){
	            // create the top state only once and store it to an auxiliary property
	            return (this._topState || (this._topState = new QState(this, "TOP")));
	        },

	        currentState: function(){
	            return this.myState;
	        },

	        flatten: function(){
	            this.statesTable = this.statesTable || {};
	            this._flatten(this.states, this.top().name);
	        },

	        _flatten: function(states, parent){
	            if (!states) {
	                return;
	            }

	            for (var state in states) {
	                if (states.hasOwnProperty(state)) {
	                    this.statesTable[state] = states[state];
	                    this.statesTable[state].parent = parent;
	                    this._flatten(states[state].states, state);
	                }
	            }
	        },

	        selectState: function(stateName){
	            return this.statesTable[stateName];
	        },

	        dispatchEvent: function(anEvent, state, act){
	            act = act || state[anEvent.type];

	            // Action might also be an array in which case it is assumed that evaluating guards decides
	            // which target to enter.
	            if (act instanceof Array) {
	                for (var i = 0; i < act.length; i++) {
	                    this.dispatchEvent(anEvent, state, act[i]);
	                }
	            }

	            // @todo This is terrible edge case used just for more fancy Statechart representation
	            // It allows using "MyState": { init: "MySubState", ... } intead of
	            // "MyState": { init: function(){ this.newInitialState("MySubState"); }, ... }
	            // In some cases the latter form can be useful for better control of the Statechart
	            if (anEvent.type === "init" && typeof act === "string") {
	                this.newInitialState(act);
	                return null; // handled
	            }

	            if (act instanceof Function){
	                act.call(this, anEvent.args);
	                return null;  // handled
	            } else if (act) {
	                // no guard at all or the guard condition is met
	                if (!act.guard || (act.guard && act.guard.call(this, anEvent.args))){
	                    if (act.action) {
	                        act.action.call(this, anEvent.args);
	                    }
	                    if (act.target) {
	                        this.newState(act.target);
	                    }
	                    return null;  // handled
	                }
	            } else {        // act is undefined (no handler in state for anEvent)
	                if (state === this.selectState("TOP")) {
	                    this.handleUnhandledEvent(anEvent); // not-handled
	                    return null;    // handled (TOP state handles all events)
	                }
	            }
	            return this.state(state.parent); // not-handled
	        },

	        // Override this when needed.
	        handleUnhandledEvent: function(anEvent){
	            this.debug("Unhandled event: " + anEvent.type);
	            return null;
	        },

	        // Traverse the state hierarchy starting from the currently active state myState.
	        // Advance up the state hierarchy (i.e., from substates to superstates), invoking all
	        // the state handlers in succession. At each level of state nesting, it intercepts the value
	        // returned from a state handler to obtain the superstate needed to advance to the next level.
	        dispatch: function(anEvent, args){
	            if (!anEvent || !(anEvent instanceof QEvent)) {
	                anEvent = new QEvent(anEvent, args);
	            }
	            this.mySource = this.myState;
	            while (this.mySource) {
	                this.mySource = this.mySource.trigger(anEvent);
	            }
	        },

	        // Performs dynamic transition. (macro Q_TRAN_DYN())
	        newState: function(aStateName){
	            this.transition(this.state(aStateName));
	        },

	        // Used by handlers only in response to the #init event. (macro Q_INIT())
	        // USAGE: return this.newInitialState("whatever");
	        // @return null for convenience

	        newInitialState: function(aStateOrName){
	            this.myState = this.state(aStateOrName);
	            return null;
	        },

	        // Dynamic transition. (Q_TRAN_DYN())
	        transition: function(target){
	            assert(!target.equals(this.top()));

	            var entry = [];
	            var mySource = this.mySource;
	            var s = this.myState;

	            // exit all the nested states between myState and mySource
	            assert(s !== null);
	            assert(mySource !== null);
	            while (!s.equals(mySource)) {
	                s = s.exit() || s.superstate();
	            }

	            // check all seven possible source/target state combinations

		    entry.push(target);

	            // (a) mySource == target (self transition)
	            if (mySource.equals(target)) {
	                mySource.exit();
	                return this.enterVia(target, entry);
	            }

	            // (b) mySource == target.superstate (one level deep)
	            var p = target.superstate();
	            if (mySource.equals(p)) {
	                return this.enterVia(target, entry);
	            }

	            assert(mySource !== null);

	            // (c) mySource.superstate == target.superstate (most common - fsa)
	            var q = mySource.superstate();
	            if (q.equals(p)) {
	                mySource.exit();
	                return this.enterVia(target, entry);
	            }

	            // (d) mySource.superstate == target (one level up)
	            if (q.equals(target)) {
	                mySource.exit();
	                entry.pop();    // do not enter the LCA
	                return this.enterVia(target, entry);
	            }

	            // (e) mySource == target.superstate.superstate... hierarchy (many levels deep)
		    entry.push(p);
	            s = p.superstate();
	            while (s !== null) {
	                if (mySource.equals(s)) {
	                    return this.enterVia(target, entry);
	                }

			entry.push(s);
	                s = s.superstate();
	            }

	            // otherwise we're definitely exiting mySource
	            mySource.exit();

	            // entry array is complete, save its length to avoid computing it repeatedly
	            var entryLength = entry.length;

	            // (f) mySource.superstate == target.superstate.superstate... hierarchy
	            var lca;
	            for (lca = entryLength - 1; lca >= 0; lca -= 1) {
	                if (q.equals(entry[lca])) {
	                    return this.enterVia(target, entry.slice(0, lca)); // do not enter lca
	                }
	            }

	            // (g) each mySource.superstate.superstate... for each target.superstate.superstate...
	            s = q;
	            while (s !== null) {
	                for (lca = entryLength - 1; lca >= 0; lca -= 1) {
	                    if (s.equals(entry[lca])) {
	                        return this.enterVia(target, entry.slice(0, lca)); // do not enter lca
	                    }
	                }
	                s.exit();
	                s = s.superstate();
	            }
	        },

	        // tail of transition()
	        // We are in the LCA of mySource and target.
	        enterVia: function(target, entry){

	            // retrace the entry path in reverse order
	            var idx = entry.length;
	            while (idx > 0) {
	                idx--;
	                entry[idx].enter();
	            }

	            this.myState = target;
	            while (target.init() === null) {
	                // initial transition must go one level deep
	                assert(target.equals(this.myState.superstate()));
	                target = this.myState;
	                target.enter();
	            }
	        }
	    };

	    // QState.
	    // -------

	    function QState(fsm, name){
	        this.fsm = fsm;
	        this.name = name;
	    }

	    QState.prototype = {
	        equals: function(state){
	            return (this.name === state.name && this.fsm === state.fsm);
	        },

	        dispatchEvent: function(anEvent, state){
	            return this.fsm.dispatchEvent(anEvent, state);
	        },

	        trigger: function(anEvent){
	            var evt = anEvent || QEventEmpty;
	            var state = this.fsm.selectState(this.name);
	            return this.dispatchEvent(evt, state);
	        },

	        enter: function(){
	            this.fsm.debug("[" + this.name + "] enter");
	            return this.trigger(QEventEntry);
	        },

	        exit: function(){
	            this.fsm.debug("[" + this.name + "] exit");
	            return this.trigger(QEventExit);
	        },

	        init: function(){
	            this.fsm.debug("[" + this.name + "] init");
	            return this.trigger(QEventInit);
	        },

	        // Answer my superstate. Default is to return fsm top state.
	        superstate: function(){
	            var superstate = this.trigger(QEventEmpty);
	            if (superstate && superstate instanceof QState) {
	                return superstate;
	            }
	            superstate = this.fsm.top();
	            if (this.name === superstate.name) {
	                return null;
	            }
	            return superstate;
	        }
	    };

	    // QEvent
	    // ------

	    function QEvent(type, args){
	        this.type = type;
	        this.args = args;
	    }

	    // these events are static, they do not carry any arguments
	    // -> create them only once
	    // moreover, they don't have to be exposed to the outer world
	    var QEventEntry = new QEvent("entry");
	    var QEventExit = new QEvent("exit");
	    var QEventInit = new QEvent("init");
	    var QEventEmpty = new QEvent("empty");


	    return Statechart;
	}));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	var respoke = __webpack_require__(1);
	var log = respoke.log;
	var Statechart = __webpack_require__(19);

	/**
	 * State machine for WebRTC calling, data channels, and screen sharing.
	 * NOTE: All state transitions are synchronous! However,
	 * listeners to the events this class fires will be called asynchronously.
	 *
	 * @class respoke.CallState
	 * @constructor
	 * @augments respoke.EventEmitter
	 * @param {object} params
	 * @link https://cdn.respoke.io/respoke.min.js
	 * @returns {respoke.CallState}
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    var fsm;
	    var instanceId = params.instanceId;
	    var that = respoke.EventEmitter(params);
	    that.className = 'respoke.CallState';
	    delete that.instanceId;

	    var client = respoke.getClient(instanceId);
	    var allTimers = [];
	    var answerTimer;
	    var answerTimeout = params.answerTimeout || 10000;
	    var receiveAnswerTimer;
	    var receiveAnswerTimeout = params.receiveAnswerTimeout || 60000;
	    var connectionTimer;
	    var connectionTimeout = params.connectionTimeout || 10000;
	    var modifyTimer;
	    var modifyTimeout = params.modifyTimeout || 60000;
	    var oldRole;

	    function assert(condition) {
	        if (!condition) {
	            throw new Error("Assertion failed.");
	        }
	    }

	    that.hasLocalMediaApproval = false;
	    that.hasLocalMedia = false;
	    that.receivedBye = false;
	    that.isAnswered = false;
	    that.sentSDP = false;
	    that.receivedSDP = false;
	    that.processedRemoteSDP = false;
	    that.needDirectConnection = !!that.needDirectConnection;
	    that.sendOnly = !!that.sendOnly;
	    that.receiveOnly = !!that.receiveOnly;
	    that.isModifying = false;

	    // Event
	    var rejectEvent = [{
	        action: function () {
	            [answerTimer, receiveAnswerTimer, connectionTimer, modifyTimer].forEach(function (timer) {
	                if (timer) {
	                    timer.clear();
	                }
	            });

	            // we have any media flowing or data channel open
	            if (typeof oldRole === 'boolean') {
	                // Reset the role if we have aborted a modify.
	                that.caller = oldRole;
	            }

	            that.isModifying = false;
	        }
	    }, {
	        target: 'connected',
	        guard: function () {
	            return that.hasMedia();
	        }
	    }, {
	        target: 'terminated',
	        guard: function (params) {
	            params = params || {};
	            // we have no media flowing or data channel open
	            that.hangupReason = params.reason || "no media";
	            return !that.hasMedia();
	        }
	    }];

	    // Event
	    function rejectModify() {
	        // reject modification
	        if (modifyTimer) {
	            modifyTimer.clear();
	            that.isModifying = false;
	        }
	    }

	    // Event
	    function clearReceiveAnswerTimer() {
	        that.processedRemoteSDP = true;
	        if (receiveAnswerTimer) {
	            receiveAnswerTimer.clear();
	        }
	    }

	    // Event
	    var hangupEvent = {
	        target: 'terminated',
	        action: function (params) {
	            params = params || {};
	            that.signalBye = params.signal;
	            that.hangupReason = that.hangupReason || params.reason || "none";
	        }
	    };

	    function needToObtainMedia() {
	        return (
	            that.needDirectConnection !== true &&
	            that.receiveOnly !== true &&
	            that.hasLocalMedia !== true
	        );
	    }

	    function needToApproveDirectConnection(params) {
	        return (that.needDirectConnection === true && typeof params.previewLocalMedia === 'function');
	    }

	    function automaticOffering(params) {
	        if (that.caller !== true) {
	            return false;
	        }

	        // TODO: this will need to be change with media negotiation
	        if ((!that.needDirectConnection && that.receiveOnly) || that.hasLocalMedia) {
	            return true;
	        }

	        return (that.needDirectConnection === true && typeof params.previewLocalMedia !== 'function');
	    }

	    function hasListener() {
	        return ((client.hasListeners('call') && !that.needDirectConnection) ||
	                (client.hasListeners('direct-connection') && that.needDirectConnection));
	    }

	    function createTimer(func, name, time) {
	        var id = setTimeout(function () {
	            id = null;
	            log.error((that.caller ? "caller's" : "callee's"), name, "timer expired.");
	            func();
	        }, time);
	        log.debug('setting timer', name, 'for', time / 1000, 'secs');
	        var timer  = {
	            name: name,
	            clear: function () {
	                if (id === null) {
	                    return;
	                }
	                log.debug('clearing', (that.caller ? "caller's" : "callee's"), 'timer', name);
	                clearTimeout(id);
	                id = null;
	            }
	        };
	        allTimers.push(timer);
	        return timer;
	    }

	    var stateParams = {
	        initialState: 'idle',
	        states: {
	            // State
	            idle: {
	                // Event
	                exit: function () {
	                    that.fire('idle:exit');
	                },
	                // Event
	                initiate: [{
	                    target: 'negotiatingContainer',
	                    guard: function (params) {
	                        assert(typeof params.caller === 'boolean');
	                        return (params.caller === true || hasListener());
	                    }
	                }, {
	                    target: 'terminated',
	                    guard: function (params) {
	                        return (params.caller !== true && !hasListener());
	                    }
	                }],
	                receiveLocalMedia: function () {
	                    that.hasLocalMedia = true;
	                },
	                // Event
	                receiveOffer: {
	                    action: function (params) {
	                        that.receivedSDP = true;
	                    }
	                },
	                // Event
	                hangup: hangupEvent
	            },
	            // State
	            negotiatingContainer: {
	                init: "preparing",
	                // Event
	                hangup: hangupEvent,
	                // Event
	                modify: rejectModify,
	                // Event
	                receiveLocalMedia: function () {
	                    that.hasLocalMedia = true;
	                },
	                states: {
	                    preparing: {
	                        // Event
	                        entry: {
	                            action: function () {
	                                that.hasLocalMediaApproval = false;
	                                that.hasLocalMedia = false;
	                                that.sentSDP = false;
	                                that.receivedSDP = false;
	                                that.processedRemoteSDP = false;
	                                that.isAnswered = false;
	                                if (!that.isModifying) {
	                                    answerTimer = createTimer(function () {
	                                        that.dispatch('reject', {reason: "answer own call timer " + that.caller});
	                                    }, 'answer own call', (that.caller ? answerTimeout : receiveAnswerTimeout));
	                                }
	                                that.fire('preparing:entry');
	                            }
	                        },
	                        // Event
	                        exit: function () {
	                            if (answerTimer) {
	                                answerTimer.clear();
	                            }
	                        },
	                        // Event
	                        reject: rejectEvent,
	                        // Event
	                        receiveOffer: [{
	                            action: function (params) {
	                                that.receivedSDP = true;
	                                if (that.isAnswered) {
	                                    // If we get here, we are the callee and we've answered the call before the call
	                                    // creation/receive offer promise chain completed.
	                                    setTimeout(function () {
	                                        that.dispatch('answer', params);
	                                    });
	                                }
	                            }
	                        }, {
	                            target: 'connecting',
	                            guard: function () {
	                                return that.isModifying;
	                            }
	                        }],
	                        // Event
	                        answer: [{
	                            action: function (params) {
	                                assert(!params.previewLocalMedia || typeof params.previewLocalMedia === 'function');
	                                that.isAnswered = true;
	                                if (typeof params.previewLocalMedia !== 'function') {
	                                    that.hasLocalMediaApproval = true;
	                                }
	                            }
	                        }, {
	                            // we are going to send media
	                            target: 'approvingDeviceAccess',
	                            guard: needToObtainMedia
	                        }, {
	                            // we are sending a direct connection & developer wants to approve
	                            target: 'approvingContent',
	                            guard: needToApproveDirectConnection
	                        }, {
	                            target: 'offering',
	                            guard: automaticOffering
	                        }, {
	                            // we are not sending anything or developer does not want to approve media.
	                            target: 'connecting',
	                            guard: function (params) {
	                                // caller will always answer before sending offer.
	                                // callee will usually answer after receiving offer if media is requested.
	                                if (!that.receivedSDP) {
	                                    return false;
	                                }

	                                if (needToObtainMedia() || needToApproveDirectConnection(params) ||
	                                        automaticOffering(params)) {
	                                    return false;
	                                }

	                                if (!params.previewLocalMedia || that.receiveOnly) {
	                                    setTimeout(function () {
	                                        params.approve();
	                                    });
	                                }
	                                return (that.receiveOnly === true || that.needDirectConnection === true);
	                            }
	                        }]
	                    },
	                    // State
	                    gettingMedia: {
	                        reject: rejectEvent,
	                        // Event
	                        receiveLocalMedia: [{
	                            action: function () {
	                                that.hasLocalMedia = true;
	                            }
	                        }, {
	                            target: 'offering',
	                            guard: function (params) {
	                                return (that.caller === true && that.hasLocalMediaApproval === true &&
	                                    that.hasLocalMedia === true);
	                            }
	                        }, {
	                            target: 'connecting',
	                            guard: function (params) {
	                                return (that.caller === false && that.hasLocalMediaApproval === true &&
	                                    that.hasLocalMedia === true);
	                            }
	                        }],
	                        states: {
	                            // State
	                            approvingDeviceAccess: {
	                                // Event
	                                approve: [{
	                                    target: 'approvingContent',
	                                    guard: function (params) {
	                                        return (typeof params.previewLocalMedia === 'function');
	                                    }
	                                }, {
	                                    target: 'connecting',
	                                    guard: function (params) {
	                                        return (that.caller === false &&
	                                            (that.hasLocalMedia === true || that.needDirectConnection === true) &&
	                                            typeof params.previewLocalMedia !== 'function');
	                                    }
	                                }, {
	                                    target: 'offering',
	                                    guard: function (params) {
	                                        return (that.caller === true && that.hasLocalMedia === true &&
	                                            typeof params.previewLocalMedia !== 'function');
	                                    }
	                                }]
	                            },
	                            // State
	                            approvingContent: {
	                                // Event
	                                approve: [function (params) {
	                                    that.hasLocalMediaApproval = true;
	                                }, {
	                                    target: 'offering',
	                                    guard: function (params) {
	                                        return (that.caller === true && that.hasLocalMedia === true);
	                                    }
	                                }, {
	                                    target: 'connecting',
	                                    guard: function (params) {
	                                        return (that.caller === false && that.hasLocalMedia === true);
	                                    }
	                                }]
	                            }
	                        }
	                    },
	                    // State
	                    offeringContainer: {
	                        init: 'offering',
	                        reject: rejectEvent,
	                        sentOffer: function () {
	                            // start answer timer
	                            receiveAnswerTimer = createTimer(function () {
	                                that.dispatch('reject', {reason: "receive answer timer"});
	                            }, 'receive answer', receiveAnswerTimeout);
	                        },
	                        states: {
	                            offering: {
	                                // Event
	                                entry: function () {
	                                    that.fire('offering:entry');
	                                },
	                                // Event
	                                receiveLocalMedia: [function () {
	                                    that.hasLocalMedia = true;
	                                }, {
	                                    target: 'connected',
	                                    guard: function (params) {
	                                        // for direct connection, local media is the same as remote media
	                                        return (that.needDirectConnection === true);
	                                    }
	                                }],
	                                // Event
	                                receiveRemoteMedia: {
	                                    target: 'connected'
	                                },
	                                // Event
	                                receiveAnswer: [clearReceiveAnswerTimer, {
	                                    target: 'connecting',
	                                    guard: function () {
	                                        return !that.isModifying;
	                                    }
	                                }, {
	                                    target: 'connected',
	                                    guard: function () {
	                                        return that.isModifying;
	                                    }
	                                }]
	                            }
	                        }
	                    },
	                    // State
	                    connectingContainer: {
	                        init: 'connecting',
	                        reject: rejectEvent,
	                        receiveAnswer: clearReceiveAnswerTimer,
	                        states: {
	                            connecting: {
	                                // Event
	                                entry: function () {
	                                    that.fire('connecting:entry');

	                                    // set connection timer
	                                    connectionTimer = createTimer(function () {
	                                        that.dispatch('reject', {reason: "connection timer"});
	                                    }, 'connection', connectionTimeout);
	                                },
	                                // Event
	                                exit: function () {
	                                    if (connectionTimer) {
	                                        connectionTimer.clear();
	                                    }
	                                },
	                                // Event
	                                receiveLocalMedia: [{
	                                    action: function () {
	                                        that.hasLocalMedia = true;
	                                    }
	                                }, {
	                                    target: 'connected',
	                                    guard: function (params) {
	                                        // for direct connection, local media is the same as remote media
	                                        return (that.needDirectConnection === true && that.caller === false);
	                                    }
	                                }],
	                                // Event
	                                receiveRemoteMedia: {
	                                    target: 'connected'
	                                },
	                                removeRemoteMedia: {
	                                    target: 'connected'
	                                }
	                            }
	                        }
	                    }
	                }
	            },
	            // State
	            // This state is for when we are in limbo between connected and negotiating and we are
	            // trying to figure out if the other side will allow us to modify. If we receive modify in
	            // this state, we will reject it. If the other party is in connected, we will be able to modify.
	            modifyingContainer: {
	                init: 'modifying',
	                reject: rejectEvent,
	                // Event
	                modify: rejectModify,
	                // Event
	                hangup: hangupEvent,
	                states: {
	                    modifying: {
	                        // Event
	                        entry: function () {
	                            modifyTimer = createTimer(function () {
	                                that.dispatch('reject', {reason: "modify timer"});
	                            }, 'modify for caller', modifyTimeout);
	                        },
	                        // Event
	                        accept: [function () {
	                            that.caller = true;
	                        }, {
	                            target: 'preparing'
	                        }]
	                    }
	                }
	            },
	            // State
	            connectedContainer: {
	                init: 'connected',
	                reject: {
	                    target: 'terminated',
	                    action: function (params) {
	                        that.hangupReason = params.reason || "got reject while connected";
	                    }
	                },
	                receiveAnswer: clearReceiveAnswerTimer,
	                // Event
	                hangup: hangupEvent,
	                states: {
	                    connected: {
	                        // Event
	                        entry: function () {
	                            oldRole = that.caller;
	                            that.needDirectConnection = false;
	                            that.isModifying = false;
	                            that.sendOnly = false;
	                            that.receiveOnly = false;

	                            if (modifyTimer) {
	                                modifyTimer.clear();
	                            }
	                        },
	                        // Event
	                        modify: [{
	                            action: function () {
	                                that.isModifying = true;
	                            }
	                        }, {
	                            // be notified that the other side would like modification
	                            target: 'preparing',
	                            guard: function (params) {
	                                params = params || {};
	                                if (params.receive === true) {
	                                    that.caller = false;
	                                    modifyTimer = createTimer(function () {
	                                        // If modify gets interrupted, go back to previous roles.
	                                        that.dispatch('reject', {reason: "modify timer"});
	                                    }, 'modify', modifyTimeout);
	                                    return true;
	                                }
	                            }
	                        }, {
	                            // request to begin modification
	                            target: 'modifying',
	                            guard: function (params) {
	                                params = params || {};
	                                return (params.receive !== true);
	                            }
	                        }]
	                    }
	                }
	            },
	            // State
	            terminatedContainer: {
	                init: 'terminated',
	                states: {
	                    terminated: {
	                        // Event
	                        entry: {
	                            action: function () {
	                                that.fire('terminated:entry');
	                                allTimers.forEach(function (timer) {
	                                    timer.clear();
	                                });
	                                setTimeout(function () {
	                                    fsm = null;
	                                    that.ignore();
	                                });
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    };

	    stateParams.that = Object.create(Statechart);
	    fsm = respoke.Class(stateParams);
	    fsm.run({
	        // rename to 'debug' to enable
	        debugOff: function () {
	            // So we can print the caller. Debug most often used when testing & tests run in the same tab.
	            var args = Array.prototype.slice.call(arguments);
	            args.unshift("state change:");
	            log.debug.apply(log, args);
	        }
	    });

	    /**
	     * Return the name of the current state.
	     * @memberof! respoke.CallState
	     * @method respoke.Call.getState
	     * @returns {string}
	     */
	    that.getState = function () {
	        if (!fsm) {
	            return 'terminated';
	        }
	        return fsm.currentState().name;
	    };

	    /**
	     * Synchronously dispatch an event, which may or may not change the state.
	     * @memberof! respoke.CallState
	     * @method respoke.Call.dispatch
	     */
	    that.dispatch = function (evt, args) {
	        var oldState;
	        var newState;

	        /*
	         * These can quite often result in a condition in which they do not
	         * cause a transition to occur. There is at least one "universal" (air quotes)
	         * event which probably? shouldn't? but may result in a non-transition error
	         * when it's OK, and that is the 'reject' event.
	         */
	        var nontransitionEvents = ['receiveLocalMedia', 'receiveRemoteMedia', 'removeRemoteMedia',
	            'approve', 'answer', 'sentOffer', 'receiveAnswer'];

	        if (!fsm) {
	            return;
	        }

	        oldState = that.getState();
	        log.debug("dispatching '" + evt + "', from '" + oldState + "'. caller?", that.caller, "args:", args);

	        try {
	            fsm.dispatch(evt, args);
	        } catch (err) {
	            log.debug("error dispatching '" + evt + "' from '" + oldState + "'.", { args: args, error: err });
	            throw err;
	        }

	        newState = that.getState();

	        if (oldState === newState && nontransitionEvents.indexOf(evt) === -1) {
	            log.debug("Possible bad event '" + evt + "', no transition occurred. caller?", that.caller);
	        } else {
	            log.debug("dispatch complete. new state: '" + newState + "'.");
	        }
	    };

	    /**
	     * Helper for testing state name
	     * @memberof! respoke.CallState
	     * @method respoke.Call.isState
	     * @param {string} name
	     * @returns {boolean}
	     */
	    that.isState = function (name) {
	        return (that.getState() === name);
	    };

	    assert(typeof that.hasMedia === 'function');
	    assert(typeof that.caller === 'boolean');
	    return that;
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	var Q = __webpack_require__(8);
	var respoke = __webpack_require__(1);
	var log = respoke.log;

	/**
	 * A `respoke.Call` is Respoke's interface into a WebRTC call, including getUserMedia,
	 * path and codec negotation, and call state.
	 * There are several methods on an instance of `respoke.Client` which return a `respoke.Call`.
	 *
	 * ```
	 * var jim = client.getEndpoint({ id: 'jim' });
	 * var call = jim.startAudioCall();
	 * ```
	 *
	 * @class respoke.Call
	 * @constructor
	 * @augments respoke.EventEmitter
	 * @param {object} params
	 * @param {string} params.instanceId - client id
	 * @param {boolean} params.caller - whether or not we initiated the call
	 * @param {boolean} [params.receiveOnly] - whether or not we accept media
	 * @param {boolean} [params.sendOnly] - whether or not we send media
	 * @param {boolean} [params.needDirectConnection] - flag to enable skipping media & opening direct connection.
	 * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	 * relay servers. If it cannot flow through relay servers, the call will fail.
	 * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	 * required to flow peer-to-peer. If it cannot, the call will fail.
	 * @param {respoke.Endpoint} params.remoteEndpoint - The endpoint who is being called.
	 * @param {string} [params.connectionId] - The connection ID of the remoteEndpoint.
	 * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	 * wants to perform an action between local media becoming available and calling approve().
	 * @param {function} params.signalOffer - Signaling action from SignalingChannel.
	 * @param {function} params.signalConnected - Signaling action from SignalingChannel.
	 * @param {function} params.signalAnswer - Signaling action from SignalingChannel.
	 * @param {function} params.signalHangup - Signaling action from SignalingChannel.
	 * @param {function} params.signalReport - Signaling action from SignalingChannel.
	 * @param {function} params.signalCandidate - Signaling action from SignalingChannel.
	 * @param {Array<RTCConstraints>} params.constraints - Array of WebRTC constraints. This is ignored when
	 * `params.outgoingMedia` is passed into the Call object.
	 * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	 * media renegotiation.
	 * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	 * element with the local audio and/or video attached.
	 * @param {respoke.Call.onConnect} [params.onConnect] - Callback for the remote video element.
	 * @param {respoke.Call.onHangup} [params.onHangup] - Callback for when the call is ended, whether or not
	 * it was ended in a graceful manner.
	 * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	 * This callback will be called when media is muted or unmuted.
	 * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	 * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	 * for the user to give permission to start getting audio or video.
	 * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	 * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	 * the approval was automatic.
	 * @param {respoke.Call.onAllow} [params.onAllow] - Callback for when the browser gives us access to the
	 * user's media.  This event gets called even if the allow process is automatic, i. e., permission and media is
	 * granted by the browser without asking the user to approve it.
	 * @param {respoke.Call.onToneSent} [params.onToneSent] - Callback for when a DTMF tone gets sent from the client.
	 * @param {respoke.Call.onToneSendingStarted} [params.onToneSendingStarted] - Callback for when DTMF tones
	 * have started sending.
	 * @param {HTMLVideoElement} params.videoLocalElement - Pass in an optional html video element to have local
	 * video attached to it.
	 * @param {HTMLVideoElement} params.videoRemoteElement - Pass in an optional html video element to have remote
	 * @param {respoke.LocalMedia} params.outgoingMedia - Pass in an optional LocalMedia object to override the one that is
	 * built automatically when establishing the call. When this is defined then any constraints passed to the
	 * call are ignored since the media object already exists.
	 * video attached to it.
	 * @returns {respoke.Call}
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    /**
	     * @memberof! respoke.Call
	     * @name instanceId
	     * @private
	     * @type {string}
	     */
	    var instanceId = params.instanceId;
	    var that = respoke.EventEmitter(params);
	    delete that.instanceId;
	    delete that.outgoingMedia;

	    /**
	     * A name to identify the type of object.
	     * @memberof! respoke.Call
	     * @name className
	     * @type {string}
	     */
	    that.className = 'respoke.Call';

	    /**
	     * Whether or not the client is the caller of the call.
	     * @memberof! respoke.Call
	     * @name caller
	     * @type {boolean}
	     */
	    that.caller = !!that.caller;
	    Object.defineProperty(that, "initiator", {
	        configurable: true,
	        enumerable: true,
	        get: function () {
	            log.warn("The call.initiator flag is deprecated. Please use call.caller instead.");
	            return that.caller;
	        },
	        set: function () {
	            // ignore
	        }
	    });

	    if (!that.caller) {
	        // Don't let Respoke.js pass any default constraints if we're accepting the call. We have no freaking clue
	        // what kind of media we are expected to provide at this point.
	        delete params.constraints;
	        that.constraints = [];
	    }

	    /**
	     * The call ID.
	     * @memberof! respoke.Call
	     * @name id
	     * @type {string}
	     */
	    that.id = that.caller ? respoke.makeGUID() : that.id;

	    // log the call id to the console for debugging purposes. Do not change this to `respoke.log`!
	    console.log("[Respoke] Creating call. id='" + that.id + "'");

	    if (!that.id) {
	        throw new Error("Can't start a new call without a call id.");
	    }

	    /**
	     * Promise used to trigger actions dependant upon having received media or a datachannel.
	     * @memberof! respoke.Call
	     * @name defMedia
	     * @private
	     * @type {Promise}
	     */
	    var defMedia = Q.defer();
	    /**
	     * Promise used to trigger notification of a request for renegotiating media. For the caller of the
	     * renegotiation (which doesn't have to be the same as the caller of the call), this is resolved
	     * or rejected as soon as the 'accept' or 'reject' signal is received. For the callee, it is
	     * resolved or rejected only after the developer or user approves or rejects the modify.
	     * @memberof! respoke.Call
	     * @name defModify
	     * @private
	     * @type {Promise}
	     */
	    var defModify;
	    /**
	     * @memberof! respoke.Call
	     * @name previewLocalMedia
	     * @private
	     * @type {respoke.Call.previewLocalMedia}
	     */
	    var previewLocalMedia = params.previewLocalMedia;
	    /**
	     * @memberof! respoke.Call
	     * @name client
	     * @private
	     * @type {respoke.getClient}
	     */
	    var client = respoke.getClient(instanceId);
	    /**
	     * @memberof! respoke.Call
	     * @name signalingChannel
	     * @private
	     * @type {respoke.signalingChannel}
	     */
	    var signalingChannel = params.signalingChannel;

	    /**
	     * Informational property. Whether call debugs were enabled on the client during creation.
	     * Changing this value will do nothing.
	     * @name enableCallDebugReport
	     * @type {boolean}
	     */
	    that.enableCallDebugReport = params.signalingChannel.isSendingReport();

	    /**
	     * Informational property indicating if this call has fired the public 'connect' event
	     * inside receiveRemoteMedia.
	     * @name hasReceivedRemoteMedia
	     * @type {boolean}
	     * @private
	     */
	    var hasReceivedRemoteMedia = false;

	    /**
	     * @memberof! respoke.Call
	     * @name pc
	     * @private
	     * @type {respoke.PeerConnection}
	     */
	    var pc = respoke.PeerConnection({
	        instanceId: instanceId,
	        state: respoke.CallState({
	            instanceId: instanceId,
	            caller: that.caller,
	            needDirectConnection: params.needDirectConnection,
	            sendOnly: params.sendOnly,
	            receiveOnly: params.receiveOnly,
	            // hasMedia is not defined yet.
	            hasMedia: function () {
	                return that.hasMedia();
	            }
	        }),
	        forceTurn: !!params.forceTurn,
	        call: that,
	        pcOptions: {
	            optional: [
	                { DtlsSrtpKeyAgreement: true },
	                { RtpDataChannels: false }
	            ]
	        },
	        offerOptions: params.offerOptions || null,
	        signalOffer: function (args) {
	            if (!pc) {
	                return;
	            }

	            params.signalOffer(args);
	            pc.state.dispatch('sentOffer');
	        },
	        signalConnected: params.signalConnected,
	        signalAnswer: params.signalAnswer,
	        signalModify: params.signalModify,
	        signalHangup: params.signalHangup,
	        signalReport: params.signalReport,
	        signalCandidate: params.signalCandidate
	    });

	    /**
	     * Array of streams of local media that we are sending to the remote party.
	     * @name outgoingMediaStreams
	     * @type {Array<respoke.LocalMedia>}
	     */
	    that.outgoingMediaStreams = [];
	    that.outgoingMediaStreams.hasAudio = function () {
	        if (that.outgoingMediaStreams.length === 0) {
	            return false;
	        }

	        return !that.outgoingMediaStreams.every(function (stream) {
	            return stream.getAudioTracks().length === 0;
	        });
	    };

	    that.outgoingMediaStreams.hasVideo = function () {
	        if (that.outgoingMediaStreams.length === 0) {
	            return false;
	        }

	        return !that.outgoingMediaStreams.every(function (stream) {
	            return stream.getVideoTracks().length === 0;
	        });
	    };

	    if (params.outgoingMedia) {
	        that.outgoingMediaStreams.push(params.outgoingMedia);
	    }

	    /**
	     * Local media that we are sending to the remote party. This will be undefined if we are sending no media.
	     * This property is just the first item in the `outgoingMediaStreams` array. If multiple streams are present,
	     * use that array to find the stream you need instead of relying on this property.
	     * @name outgoingMedia
	     * @type {respoke.LocalMedia}
	     */
	    Object.defineProperty(that, "outgoingMedia", {
	        configurable: false,
	        enumerable: true,
	        get: function () {
	            return that.outgoingMediaStreams[0];
	        },
	        set: function () {
	            // ignore
	        }
	    });

	    /**
	     * Array of streams of remote media that we are receiving from the remote party.
	     * @name incomingMediaStreams
	     * @type {Array<respoke.RemoteMedia>}
	     */
	    that.incomingMediaStreams = [];
	    that.incomingMediaStreams.hasAudio = function () {
	        if (that.incomingMediaStreams.length === 0) {
	            return false;
	        }

	        return !that.incomingMediaStreams.every(function (stream) {
	            return stream.getAudioTracks().length === 0;
	        });
	    };

	    that.incomingMediaStreams.hasVideo = function () {
	        if (that.incomingMediaStreams.length === 0) {
	            return false;
	        }

	        return !that.incomingMediaStreams.every(function (stream) {
	            return stream.getVideoTracks().length === 0;
	        });
	    };

	    /**
	     * Remote media that we are receiving from the remote party.  This will be undefined if we
	     * are receiving no media. This property is just the first item in the `incomingMediaStreams` array. If multiple
	     * streams are present, use that array to find the stream you need instead of relying on this property.
	     * @name incomingMedia
	     * @type {respoke.RemoteMedia}
	     */
	    Object.defineProperty(that, "incomingMedia", {
	        configurable: false,
	        enumerable: true,
	        get: function () {
	            return that.incomingMediaStreams[0];
	        },
	        set: function () {
	            // ignore
	        }
	    });

	    /**
	     * A flag indicating whether this call has audio or is expected to have audio coming in from the other side.
	     *
	     * @name hasAudio
	     * @type {boolean}
	     */
	    Object.defineProperty(that, "hasAudio", {
	        configurable: false,
	        enumerable: true,
	        get: that.incomingMediaStreams.hasAudio,
	        set: function () {
	            // ignore
	        }
	    });

	    /**
	     * A flag indicating whether this call has video or is expected to have video coming in from the other side.
	     *
	     * @name hasVideo
	     * @type {boolean}
	     */
	    Object.defineProperty(that, "hasVideo", {
	        configurable: false,
	        enumerable: true,
	        get: that.incomingMediaStreams.hasVideo,
	        set: function () {
	            // ignore
	        }
	    });

	    delete params.signalingChannel;
	    delete that.signalingChannel;

	    /**
	     * @memberof! respoke.Call
	     * @name videoIsMuted
	     * @private
	     * @type {boolean}
	     */
	    var videoIsMuted = false;
	    /**
	     * @memberof! respoke.Call
	     * @name audioIsMuted
	     * @private
	     * @type {boolean}
	     */
	    var audioIsMuted = false;
	    /**
	     * @memberof! respoke.Call
	     * @name directConnection
	     * @private
	     * @type {respoke.DirectConnection}
	     */
	    var directConnection = null;

	    /**
	     * Register any event listeners passed in as callbacks, save other params to answer() and accept().
	     * @memberof! respoke.Call
	     * @method respoke.Call.saveParameters
	     * @param {object} params
	     * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	     * wants to perform an action between local media becoming available and calling approve().
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onRemoteMedia} [params.onRemoteMedia] - Callback called every time a remote
	     * stream is added to the call. Corresponds to 'remote-stream-received' event.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for the remote video element.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for when the call is ended, whether or not
	     * it was ended in a graceful manner.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will fire even if
	     * the approval was automatic.
	     * @param {respoke.Call.onAllow} [params.onAllow] - Callback for when the browser gives us access to the
	     * user's media.  This event gets fired even if the allow process is automatic, i. e., permission and media is
	     * granted by the browser without asking the user to approve it.
	     * @param {respoke.Call.onToneSent} [params.onToneSent] - Callback for when a DTMF tone gets sent from the client.
	     * @param {Array<RTCConstraints>} [params.constraints]
	     * @param {boolean} [params.forceTurn]
	     * @param {boolean} [params.receiveOnly]
	     * @param {boolean} [params.sendOnly]
	     * @param {boolean} [params.needDirectConnection] - flag to enable skipping media & opening direct connection.
	     * @param {HTMLVideoElement} params.videoLocalElement - Pass in an optional html video element to have local
	     * video attached to it.
	     * @param {HTMLVideoElement} params.videoRemoteElement - Pass in an optional html video element to have remote
	     * video attached to it.
	     * @private
	     * @fires respoke.Call#stats
	     */
	    function saveParameters(params) {
	        if (!pc) {
	            /* This happens when the call is hung up automatically, for instance due to the lack of an onCall
	             * handler. In this case, pc has been set to null in hangup. The call has already failed, and the
	             * invocation of this function is an artifact of async code not being finished yet, so we can just
	             * skip all of this setup.
	             */
	            return;
	        }

	        that.listen('local-stream-received', params.onLocalMedia);
	        that.listen('remote-stream-received', params.onRemoteMedia);
	        that.listen('connect', params.onConnect);
	        that.listen('hangup', params.onHangup);
	        that.listen('allow', params.onAllow);
	        that.listen('answer', params.onAnswer);
	        that.listen('approve', params.onApprove);
	        that.listen('mute', params.onMute);
	        that.listen('requesting-media', params.onRequestingMedia);
	        that.listen('tone-sent', params.onToneSent);
	        that.listen('tone-sending-started', params.onToneSendingStarted);
	        that.listen('tone-sending-cancelled', params.onToneSendingCancelled);

	        previewLocalMedia = typeof params.previewLocalMedia === 'function' ?
	            params.previewLocalMedia : previewLocalMedia;

	        pc.state.receiveOnly = typeof params.receiveOnly === 'boolean' ? params.receiveOnly : pc.state.receiveOnly;
	        pc.state.sendOnly = typeof params.sendOnly === 'boolean' ? params.sendOnly : pc.state.sendOnly;
	        pc.state.needDirectConnection = typeof params.needDirectConnection === 'boolean' ?
	            params.needDirectConnection : pc.state.needDirectConnection;
	        pc.disableTurn = typeof params.disableTurn === 'boolean' ? params.disableTurn : !!pc.disableTurn;
	        pc.forceTurn = typeof params.forceTurn === 'boolean' ? params.forceTurn : !!pc.forceTurn;

	        that.videoLocalElement = params.videoLocalElement ? params.videoLocalElement : that.videoLocalElement;
	        that.videoRemoteElement = params.videoRemoteElement ? params.videoRemoteElement : that.videoRemoteElement;

	        if (pc.state.receiveOnly) {
	            that.outgoingMediaStreams.length = 0;
	            that.constraints = [];
	        } else if (params.constraints) {
	            that.constraints = respoke.convertConstraints(params.constraints);
	            updateOutgoingMediaEstimate({constraints: that.constraints[0], source: params.source});
	        }

	        if (pc.state.sendOnly) {
	            that.incomingMediaStreams.length = 0;
	        } else if (params.constraints && pc.state.caller === true && that.incomingMediaStreams.length === 0) {
	            // TODO above condition is not good enough for media renegotiation.
	            // Only the person who initiated this round of media negotiation needs to estimate remote
	            // media based on what constraints local media is using.
	            // Also don't try to guess what media they'll send back if we're sending more than one stream.
	            that.constraints = respoke.convertConstraints(params.constraints);
	            updateIncomingMediaEstimate({constraints: params.constraints[0]});
	        }

	        pc.listen('stats', function fireStats(evt) {
	            /**
	             * This event is fired every time statistical information about audio and/or video on a call
	             * becomes available.
	             * @event respoke.Call#stats
	             * @type {respoke.Event}
	             * @property {respoke.MediaStats} stats - an object with stats in it.
	             * @property {respoke.Call} target
	             * @property {string} name - the event name.
	             */
	            that.fire('stats', {stats: evt.stats});
	        }, true);

	        delete that.signalOffer;
	        delete that.signalConnected;
	        delete that.signalAnswer;
	        delete that.signalHangup;
	        delete that.signalReport;
	        delete that.signalCandidate;
	    }

	    /**
	     * Build respoke.LocalMedia after the call is answered.
	     * @memberof! respoke.Call
	     * @method respoke.Call.buildLocalMedia
	     * @param {RTCConstraint} constraint
	     * @private
	     */
	    function buildLocalMedia(constraint) {
	        var localMedia;

	        if (pc.state.receiveOnly) {
	            return Q.reject(new Error("Shouldn't have requested local media when receiveOnly is true."));
	        }

	        if (constraint.className === 'respoke.LocalMedia') {
	            localMedia = constraint;
	        } else {
	            localMedia = respoke.LocalMedia({
	                hasScreenShare: respoke.constraintsHasScreenShare(constraint),
	                constraints: constraint,
	                source: params.source
	            });
	            that.outgoingMediaStreams.push(localMedia);
	        }

	        // use passed video element if localMedia constraints contain video
	        if (respoke.constraintsHasVideo(localMedia.constraints)) {
	            localMedia.element = that.videoLocalElement;
	        }

	        localMedia.listen('requesting-media', function waitAllowHandler(evt) {
	            if (!pc) {
	                return;
	            }

	            /**
	             * The browser is asking for permission to access the User's media. This would be an ideal time
	             * to modify the UI of the application so that the user notices the request for permissions
	             * and approves it.
	             * @event respoke.Call#requesting-media
	             * @type {respoke.Event}
	             * @property {string} name - the event name.
	             * @property {respoke.Call} target
	             */
	            that.fire('requesting-media');
	        }, true);

	        localMedia.listen('allow', function allowHandler(evt) {
	            if (!pc) {
	                return;
	            }

	            /**
	             * The user has approved the request for media. Any UI changes made to remind the user to click Allow
	             * should be canceled now. This event is the same as the `onAllow` callback.  This event gets fired
	             * even if the allow process is automatic, i. e., permission and media is granted by the browser
	             * without asking the user to approve it.
	             * @event respoke.Call#allow
	             * @type {respoke.Event}
	             * @property {string} name - the event name.
	             * @property {respoke.Call} target
	             */
	            that.fire('allow');
	            pc.state.dispatch('approve', {
	                previewLocalMedia: previewLocalMedia
	            });
	        }, true);

	        return localMedia.start().then(function () {
	            streamReceivedHandler(localMedia);
	        });
	    }

	    /**
	     * Answer the call and start the process of obtaining media. This method is called automatically on the caller's
	     * side. This method must be called on the callee's side to indicate that the endpoint does wish to accept the
	     * call. The app will have a later opportunity, by passing a callback named previewLocalMedia, to approve or
	     * reject the call based on whether audio and/or video is working and is working at an acceptable level.
	     *
	     *     client.listen('call', function (evt) {
	     *         if (!evt.call.caller) {
	     *             evt.call.answer();
	     *         }
	     *     });
	     *
	     * @memberof! respoke.Call
	     * @method respoke.Call.answer
	     * @fires respoke.Call#answer
	     * @param {object} [params]
	     * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	     * wants to perform an action between local media becoming available and calling approve().
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached. Corresponds to 'local-stream-received' event.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback indicating that the call is connected.
	     * This is fired once. Corresponds to 'connect' event.
	     * @param {respoke.Call.onRemoteMedia} [params.onRemoteMedia] - Callback called every time a remote
	     * stream is added to the call. Corresponds to 'remote-stream-received' event.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for when the call is ended, whether or not
	     * it was ended in a graceful manner. Corresponds to 'hangup' event.
	     * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	     * This callback will be called when media is muted or unmuted.
	     * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	     * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	     * for the user to give permission to start getting audio or video.
	     * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	     * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	     * the approval was automatic.
	     * @param {respoke.Call.onAllow} [params.onAllow] - Callback for when the browser gives us access to the
	     * user's media.  This event gets called even if the allow process is automatic, i. e., permission and media is
	     * granted by the browser without asking the user to approve it.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {boolean} [params.receiveOnly] - Whether or not we accept media.
	     * @param {boolean} [params.sendOnly] - Whether or not we send media.
	     * @param {Array<RTCConstraints>} [params.constraints] - Pass in media constraints to specialize
	     * the media requested from the user.
	     * @param {HTMLVideoElement} [params.videoLocalElement] - Pass in an html video element to have local
	     * video attached to it, instead of having a video element created.
	     * @param {HTMLVideoElement} [params.videoRemoteElement] - Pass in an html video element to have remote
	     * video attached to it, instead of having a video element created.
	     */
	    that.answer = function (params) {
	        log.debug('Call.answer', params);
	        params = params || {};

	        saveParameters(params);

	        pc.listen('stream-added', onRemoteStreamAdded, true);
	        pc.listen('stream-removed', onRemoteStreamRemoved, true);

	        pc.state.dispatch('answer', {
	            previewLocalMedia: previewLocalMedia,
	            approve: that.approve
	        });

	        /**
	         * The call was answered.
	         * @event respoke.Call#answer
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         */
	        that.fire('answer');
	    };

	    /**
	     * Accept a request to modify the media on the call. This method should be called within the Call#modify
	     * event listener, which gives the developer or website user a chance to see what changes are proposed and
	     * to accept or reject them.
	     *
	     *     call.listen('modify', function (evt) {
	     *         evt.call.accept();
	     *     });
	     *
	     * @memberof! respoke.Call
	     * @method respoke.Call.accept
	     * @fires respoke.Call#accept
	     * @private
	     * @param {object} [params]
	     * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	     * wants to perform an action between local media becoming available and calling approve().
	     * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	     * element with the local audio and/or video attached.
	     * @param {respoke.Call.onConnect} [params.onConnect] - Callback for the developer to receive the
	     * remote video element.
	     * @param {respoke.Call.onHangup} [params.onHangup] - Callback for the developer to be notified about hangup.
	     * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	     * required to flow peer-to-peer. If it cannot, the call will fail.
	     * @param {boolean} [params.receiveOnly] - Whether or not we accept media.
	     * @param {boolean} [params.sendOnly] - Whether or not we send media.
	     * @param {Array<RTCConstraints>} [params.constraints] - Information about the media for this call.
	     */
	    that.accept = that.answer;

	    /**
	     * Start the process of network and media negotiation. If the app passes in a callback named previewLocalMedia
	     * in order to allow the logged-in person a chance to base their decision to continue the call on whether
	     * audio and/or video is working correctly,
	     * this method must be called on both sides in order to begin the call. If call.approve() is called, the call
	     * will progress as expected. If call.reject() is called, the call will be aborted.
	     *
	     *     call.listen('local-stream-received', function (evt) {
	     *         if (userLikesVideo()) {
	     *             evt.call.approve();
	     *         }
	     *     });
	     *
	     * @memberof! respoke.Call
	     * @method respoke.Call.approve
	     * @fires respoke.Call#approve
	     */
	    that.approve = function () {
	        log.debug('Call.approve');
	        /**
	         * Fired when the local media access is approved.
	         * @event respoke.Call#approve
	         * @type {respoke.Event}
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         */
	        that.fire('approve');
	        pc.state.dispatch('approve', {
	            previewLocalMedia: previewLocalMedia
	        });

	        if (defModify && defModify.promise.isPending()) {
	            defModify.resolve(true);
	            defModify = undefined;
	        }
	    };

	    /**
	     * Listen for the remote side to remove media in the middle of the call.
	     * @memberof! respoke.Call
	     * @method respoke.Call.onRemoteStreamRemoved
	     * @private
	     * @param {object}
	     */
	    function onRemoteStreamRemoved(evt) {
	        log.debug('pc event: remote stream removed');
	        pc.state.dispatch('removeRemoteMedia');
	    }

	    /**
	     * Listen for the remote side to add additional media in the middle of the call.
	     * @memberof! respoke.Call
	     * @method respoke.Call.onRemoteStreamAdded
	     * @private
	     * @param {object}
	     * @fires respoke.Call#connect
	     */
	    function onRemoteStreamAdded(evt) {
	        var hasAudio = false;
	        var hasVideo = false;
	        var hasScreenShare = false;
	        var remoteMedia;

	        if (!pc) {
	            return;
	        }
	        log.debug('received remote media', evt);

	        // This is the first remote media we have received. The one we currently have is a guess. Rip it
	        // out and replace it with reality.
	        if (that.incomingMediaStreams.length === 1 && that.incomingMediaStreams[0].temporary === true) {
	            // have to do it this way because assigning a blank array to that.incomingMediaStreams will
	            // clobber the methods like hasAudio that we have added to the array.
	            that.incomingMediaStreams.length = 0;
	        }
	        if (that.incomingMediaStreams.length) {
	            while (that.incomingMediaStreams.length) {
	                log.debug('onRemoteStreamAdded removing incoming stream', that.incomingMediaStreams[0]);
	                that.incomingMediaStreams.shift().stop();
	            }
	        }
	        hasAudio = evt.stream.getAudioTracks().length > 0;
	        hasVideo = evt.stream.getVideoTracks().length > 0;
	        // TODO this is not good enough long term.
	        hasScreenShare = hasVideo && that.target === 'screenshare';

	        remoteMedia = respoke.RemoteMedia({
	            element: that.videoRemoteElement,
	            stream: evt.stream,
	            hasScreenShare: hasScreenShare,
	            constraints: {
	                audio: hasAudio,
	                video: hasVideo
	            }
	        });
	        that.incomingMediaStreams.push(remoteMedia);

	        pc.state.dispatch('receiveRemoteMedia');

	        if (!hasReceivedRemoteMedia) {
	            hasReceivedRemoteMedia = true;
	            /**
	             * Indicates that either remote media stream has been added to the call or if no
	             * media is expected, the other side is receiving our media. This will fire once,
	             * when the remote media becomes available.
	             * @event respoke.Call#connect
	             * @type {respoke.Event}
	             * @property {Element} element - The HTML5 Video element with the remote stream attached.
	             * @property {respoke.RemoteMedia} stream - The incomingMedia property on the call.
	             * @property {string} name - The event name.
	             * @property {respoke.Call} target
	             */
	            that.fire('connect', {
	                stream: remoteMedia.stream,
	                element: remoteMedia.element
	            });
	        }

	        /**
	         * Fires every time a new remote media stream is added to the call.
	         * @event respoke.Call#onRemoteMedia
	         * @type {respoke.Event}
	         * @property {Element} element - The HTML5 Video element with the remote stream attached.
	         * @property {respoke.RemoteMedia} stream - The incomingMedia property on the call.
	         * @property {string} name - The event name.
	         * @property {respoke.Call} target
	         */
	        that.fire('remote-stream-received', {
	            stream: remoteMedia.stream,
	            element: remoteMedia.element
	        });
	    }

	    /**
	     * ## The plugin `respoke.MediaStats` must be loaded before using this method.
	     *
	     * Start the process of listening for a continuous stream of statistics about the flow of audio and/or video.
	     * Since we have to wait for both the answer and offer to be available before starting
	     * statistics, the library returns a promise for the stats object. The statistics object does not contain the
	     * statistics; rather it contains methods of interacting with the actions of obtaining statistics. To obtain
	     * the actual statistics one time, use stats.getStats(); use the onStats callback to obtain a continuous
	     * stream of statistics every `interval` seconds.  Returns null if stats module is not loaded.
	     *
	     *     call.getStats({
	     *         onStats: function (evt) {
	     *             console.log('Stats', evt.stats);
	     *         }
	     *     }).done(function () {
	     *         console.log('Stats started');
	     *     }, function (err) {
	     *         console.log('Call is already hung up.');
	     *     });
	     *
	     * @memberof! respoke.Call
	     * @method respoke.Call.getStats
	     * @param {object} params
	     * @param {number} [params.interval=5000] - How often in milliseconds to fetch statistics.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - An optional callback to receive
	     * the stats. If no callback is provided, the call's report will contain stats but the developer will not
	     * receive them on the client-side.
	     * @param {respoke.Call.statsSuccessHandler} [params.onSuccess] - Success handler for this invocation of
	     * this method only.
	     * @param {respoke.Call.errorHandler} [params.onError] - Error handler for this invocation of this method only.
	     * @returns {Promise<object>|null}
	     */
	    function getStats(params) {
	        if (pc && pc.getStats) {
	            that.listen('stats', params.onStats);
	            return pc.getStats(params);
	        }
	        return null;
	    }
	    if (respoke.MediaStats) {
	        that.getStats = getStats;
	    }

	    /**
	     * Return local video element with the logged-in endpoint's audio and/or video streams attached to it.
	     *
	     *     var el = call.getLocalElement();
	     *     container.append(el);
	     *
	     * @memberof! respoke.Call
	     * @method respoke.Call.getLocalElement
	     * @returns {Video} An HTML5 video element.
	     */
	    that.getLocalElement = function () {
	        return that.outgoingMediaStreams[0] ? that.outgoingMediaStreams[0].element : undefined;
	    };

	    /**
	     * Return remote video element with the remote endpoint's audio and/or video streams attached to it.
	     *
	     *     var el = call.getRemoteElement();
	     *     container.append(el);
	     *
	     * @memberof! respoke.Call
	     * @method respoke.Call.getRemoteElement
	     * @returns {Video} An HTML5 video element.
	     */
	    that.getRemoteElement = function () {
	        return that.incomingMediaStreams[0] ? that.incomingMediaStreams[0].element : undefined;
	    };

	    /**
	     * Set up the local media.
	     * @memberof! respoke.Call
	     * @method respoke.Call.streamReceivedHandler
	     * @param {respoke.LocalMedia} localMedia
	     * @private
	     */
	    function streamReceivedHandler(localMedia) {
	        if (!pc) {
	            return;
	        }

	        pc.addLocalTracksFromStream(localMedia.stream);
	        if (typeof previewLocalMedia === 'function' && localMedia.element) {
	            previewLocalMedia(localMedia.element, that);
	        }

	        localMedia.listen('stop', function stopHandler(/* evt */) {
	            // remove the media from the call's outgoing streams

	            var idx = that.outgoingMediaStreams.indexOf(localMedia);
	            if (idx > -1) {
	                that.outgoingMediaStreams.splice(idx, 1);
	            }

	            // TODO: See about adding this back
	            // if (!that.outgoingMediaStreams.length && !that.incomingMediaStreams.length) {
	            //     that.hangup({ reason: 'last stream ended' });
	            // }
	        }, true);

	        /**
	         * Indicate that the call has received local media from the browser.
	         * @event respoke.Call#local-stream-received
	         * @type {respoke.Event}
	         * @property {Element} element
	         * @property {respoke.LocalMedia} stream
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         */
	        that.fire('local-stream-received', {
	            element: localMedia.element,
	            stream: localMedia
	        });

	        /**
	         * This event indicates that local video has been unmuted.
	         * @event respoke.Call#mute
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         * @property {string} type - Either "audio" or "video" to specify the type of stream whose muted state
	         * has been changed.
	         * @property {boolean} muted - Whether the stream is now muted. Will be set to false if mute was turned off.
	         */
	        localMedia.listen('mute', function (evt) {
	            that.fire('mute', {
	                type: evt.type,
	                muted: evt.muted
	            });
	        }, true);
	    }

	    /**
	     * Retrieve the constraints that describe the currently flowing outgoing media.
	     * TODO: we can probably use that.constraints instead
	     * @returns { audio, video }
	     * @private
	     */
	    function getOutgoingConstraints() {
	        return that.outgoingMediaStreams.reduce(function (constraints, localMedia) {
	            if (localMedia.temporary) {
	                return constraints;
	            }
	            localMedia.stream.getTracks().forEach(function (track) {
	                if (track.kind === 'audio') {
	                    constraints.audio = true;
	                } else {
	                    constraints.video = true;
	                }
	            });

	            return constraints;
	        }, { audio: false, video: false });
	    }

	    /**
	     * Renegotiate the call to have media that matches the passed constraints.
	     *
	     * @param {object} params
	     * @param {object|Array} params.constraints The constraints to renegotiate to
	     * @returns {Promise}
	     * @private
	     */
	    that.changeMedia = function changeMedia(params) {
	        log.debug('Call.changeMedia', params);
	        params = params || {};

	        if (!params.constraints || !params.constraints.length) {
	            return Q.reject(new Error('at least one set of constraints is required to change media'));
	        }

	        params.instanceId = instanceId;

	        pc.startModify({
	            constraints: params.constraints
	        });

	        defModify = Q.defer();
	        defModify.promise.then(function modifyAccepted() {
	            saveParameters(params);
	        });

	        return defModify.promise;
	    };

	    /**
	     * Renegotiate the call to add video. If a video track is already present
	     * on the call, no action will be taken and the promise will immediately resolve.
	     *
	     * @memberof! respoke.Call
	     * @method respoke.Call.addVideo
	     * @returns {Promise}
	     * @private
	     */
	    that.addVideo = function () {
	        log.debug('Call.addVideo');
	        var outgoingConstraints = getOutgoingConstraints();

	        if (outgoingConstraints.video) {
	            log.debug('Call already contains an outgoing video track');
	            return Q.resolve();
	        }

	        return that.changeMedia({
	            constraints: [{
	                audio: outgoingConstraints.audio,
	                video: true
	            }]
	        });
	    };

	    /**
	     * Renegotiate the call to remove video. If a video track is not already present
	     * on the call, no action will be taken and the promise will immediately resolve.
	     *
	     * @memberof! respoke.Call
	     * @method respoke.Call.addVideo
	     * @returns {Promise}
	     * @private
	     */
	    that.removeVideo = function () {
	        log.debug('Call.removeVideo');
	        var outgoingConstraints = getOutgoingConstraints();

	        if (!outgoingConstraints.video) {
	            log.debug('Call does not contain an outgoing video track');
	            return Q.resolve();
	        }

	        return that.changeMedia({
	            constraints: [{
	                audio: outgoingConstraints.audio,
	                video: false
	            }]
	        });
	    };

	    /**
	     * Renegotiate the call to add audio. If an audio track is already present
	     * on the call, no action will be taken and the promise will immediately resolve.
	     *
	     * @memberof! respoke.Call
	     * @method respoke.Call.addVideo
	     * @returns {Promise}
	     * @private
	     */
	    that.addAudio = function () {
	        log.debug('Call.addAudio');
	        var outgoingConstraints = getOutgoingConstraints();

	        if (outgoingConstraints.audio) {
	            log.debug('Call already contains an outgoing audio track');
	            return Q.resolve();
	        }

	        return that.changeMedia({
	            constraints: [{
	                audio: true,
	                video: outgoingConstraints.video
	            }]
	        });
	    };

	    /**
	     * Renegotiate the call to remove audio. If an audio track is not already present
	     * on the call, no action will be taken and the promise will immediately resolve.
	     *
	     * @memberof! respoke.Call
	     * @method respoke.Call.addVideo
	     * @returns {Promise}
	     * @private
	     */
	    that.removeAudio = function () {
	        log.debug('Call.removeAudio');
	        var outgoingConstraints = getOutgoingConstraints();

	        if (!outgoingConstraints.audio) {
	            log.debug('Call does not contain an outgoing audio track');
	            return Q.resolve();
	        }

	        return that.changeMedia({
	            constraints: [{
	                audio: false,
	                video: outgoingConstraints.video
	            }]
	        });
	    };

	    /**
	     * Get the direct connection on this call, if it exists.
	     *
	     *     var dc = call.getDirectConnection();
	     *     if (!dc) {
	     *         console.log("No direct connection has been started.");
	     *     } else {
	     *         dc.sendMessage({message: 'hi'});
	     *     }
	     *
	     * @memberof! respoke.Call
	     * @method respoke.Call.getDirectConnection
	     * @returns {respoke.DirectConnection}
	     */
	    that.getDirectConnection = function () {
	        return directConnection || null;
	    };

	    /**
	     * Remove a direct connection from the existing call. If there is no other media, this will hang up the call.
	     * @memberof! respoke.Call
	     * @method respoke.Call.removeDirectConnection
	     * @private
	     * @param {object} params
	     * @arg {boolean} [params.skipModify] Do not restart media negotiation.
	     */
	    that.removeDirectConnection = function (params) {
	        params = params || {};
	        log.debug('Call.removeDirectConnection');

	        if (directConnection) {
	            directConnection.close({skipRemove: true});
	        }

	        if (!that.hasMedia()) {
	            log.debug('Hanging up because there are no local streams.');
	            that.hangup();
	            return;
	        }

	        if (params.skipModify === true) {
	            return;
	        }

	        pc.startModify({
	            directConnection: false
	        });
	        defModify = Q.defer();
	        defModify.promise.done(function onModifySuccess() {
	            defMedia.resolve();
	            defModify = undefined;
	        });
	    };

	    /**
	     * Add a direct connection to the existing call.
	     *
	     *     call.addDirectConnection({
	     *         onOpen: function (evt) {
	     *             console.log("Direct connection open!");
	     *         }
	     *     });
	     *
	     * @memberof! respoke.Call
	     * @method respoke.Call.addDirectConnection
	     * @private
	     * @param {object} params
	     * @param {respoke.DirectConnection.onClose} [params.onClose] - Callback for the developer to be notified about
	     * closing the connection.
	     * @param {respoke.DirectConnection.onOpen} [params.onOpen] - Callback for the developer to be notified about
	     * opening the connection.
	     * @param {respoke.DirectConnection.onMessage} [params.onMessage] - Callback for the developer to be notified
	     * about incoming messages. Not usually necessary to listen to this event if you are already listening to
	     * respoke.Endpoint#message.
	     * @param {respoke.Call.directConnectionSuccessHandler} [params.onSuccess]
	     * @param {respoke.Client.errorHandler} [params.onError]
	     * @returns {Promise<respoke.DirectConnection>}
	     */
	    that.addDirectConnection = function (params) {
	        log.debug('Call.addDirectConnection');
	        pc.startModify({
	            directConnection: true
	        });
	        defModify = Q.defer();
	        return defModify.promise.then(function onModifySuccess() {
	            return actuallyAddDirectConnection(params);
	        }, function onModifyError(err) {
	            throw err;
	        });
	    };

	    /**
	     * Add a direct connection to the existing call.
	     * @memberof! respoke.Call
	     * @method respoke.Call.actuallyAddDirectConnection
	     * @private
	     * @param {object} params
	     * @param {respoke.DirectConnection.onClose} [params.onClose] - Callback for the developer to be notified about
	     * closing the connection.
	     * @param {respoke.DirectConnection.onOpen} [params.onOpen] - Callback for the developer to be notified about
	     * opening the connection.
	     * @param {respoke.DirectConnection.onMessage} [params.onMessage] - Callback for the developer to be notified
	     * about incoming messages. Not usually necessary to listen to this event if you are already listening to
	     * respoke.Endpoint#message.
	     * @param {respoke.Call.directConnectionSuccessHandler} [params.onSuccess]
	     * @param {respoke.Client.errorHandler} [params.onError]
	     * @returns {Promise<respoke.DirectConnection>}
	     * @fires respoke.Client#direct-connection
	     * @fires respoke.Call#direct-connection
	     */
	    function actuallyAddDirectConnection(params) {
	        log.debug('Call.actuallyAddDirectConnection', params);
	        params = params || {};
	        defMedia.promise.then(params.onSuccess, params.onError);

	        if (directConnection && directConnection.isActive()) {
	            if (defMedia.promise.isPending()) {
	                defMedia.resolve(directConnection);
	            } else {
	                log.warn("Not creating a new direct connection.");
	            }
	            return defMedia.promise;
	        }

	        params.instanceId = instanceId;
	        params.pc = pc;
	        params.call = that;

	        directConnection = respoke.DirectConnection(params);

	        directConnection.listen('close', function handleDirectConnectionClose() {
	            if (!that.hasMedia()) {
	                log.debug('Hanging up because there are no local streams.');
	                that.hangup();
	            } else {
	                that.removeDirectConnection({skipModify: true});
	            }
	        }, true);

	        directConnection.listen('accept', function handleDirectConnectionAccept() {
	            if (pc.state.caller === false) {
	                log.debug('Answering as a result of approval.');
	            } else {
	                defMedia.resolve(directConnection);
	            }
	        }, true);

	        directConnection.listen('open', function handleDirectConnectionOpen() {
	            pc.state.dispatch('receiveRemoteMedia');
	        }, true);

	        directConnection.listen('error', function handleDirectionConnectionError(err) {
	            defMedia.reject(new Error(err));
	        }, true);

	        that.remoteEndpoint.directConnection = directConnection;

	        /**
	         * This event is fired when the local end of the directConnection is available. It still will not be
	         * ready to send and receive messages until the 'open' event fires.
	         * @event respoke.Call#direct-connection
	         * @type {respoke.Event}
	         * @property {respoke.DirectConnection} directConnection
	         * @property {respoke.Endpoint} endpoint
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         */
	        that.fire('direct-connection', {
	            directConnection: directConnection,
	            endpoint: that.remoteEndpoint
	        });

	        /**
	         * This event is fired when the logged-in endpoint is receiving a request to open a direct connection
	         * to another endpoint.  If the user wishes to allow the direct connection, calling
	         * evt.directConnection.accept() will allow the connection to be set up.
	         * @event respoke.Client#direct-connection
	         * @type {respoke.Event}
	         * @property {respoke.DirectConnection} directConnection
	         * @property {respoke.Endpoint} endpoint
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         * @private
	         */
	        client.fire('direct-connection', {
	            directConnection: directConnection,
	            endpoint: that.remoteEndpoint
	        });

	        if (pc.state.caller === true) {
	            directConnection.accept();
	        }

	        return defMedia.promise;
	    }

	    /**
	     * Close the direct connection.
	     * @memberof! respoke.Call
	     * @method respoke.Call.closeDirectConnection
	     */
	    that.closeDirectConnection = function () {
	        if (directConnection) {
	            directConnection.close();
	            directConnection = null;
	        }
	    };

	    /**
	     * Tear down the call, release user media.  Send a hangup signal to the remote party if
	     * signal is not false and we have not received a hangup signal from the remote party.
	     * @memberof! respoke.Call
	     * @method respoke.Call.hangup
	     * @fires respoke.Call#hangup
	     * @param {object} params
	     * @arg {boolean} params.signal Optional flag to indicate whether to send or suppress sending
	     * a hangup signal to the remote side.
	     */
	    that.hangup = respoke.callOnce(function hangup(params) {
	        if (!pc) {
	            return;
	        }
	        params = params || {};
	        params.reason = params.reason || "hangup method called.";
	        pc.state.dispatch('hangup', params);
	    });

	    /**
	     * Tear down the call, release user media.  Send a hangup signal to the remote party if
	     * signal is not false and we have not received a hangup signal from the remote party. This is an event
	     * handler added to the state machine via `once`.
	     * @memberof! respoke.Call
	     * @method respoke.Call.hangup
	     * @fires respoke.Call#hangup
	     * @private
	     */
	    var doHangup = respoke.callOnce(function doHangup() {
	        log.debug('hangup', that.caller);

	        that.outgoingMediaStreams.forEach(function (localMediaInstance) {
	            // only call stop on the localMediaInstance if it was constructed explicitly for the call
	            if (localMediaInstance !== params.outgoingMedia) {
	                localMediaInstance.stop();
	            }
	        });

	        if (directConnection) {
	            directConnection.close();
	            directConnection = null;
	        }

	        if (pc) {
	            pc.close({signal: (pc.state.receivedBye ? false : pc.state.signalBye)});
	        }

	        /**
	         * This event is fired when the call has hung up.
	         * @event respoke.Call#hangup
	         * @type {respoke.Event}
	         * @property {boolean} sentSignal - Whether or not we sent a 'hangup' signal to the other party.
	         * @property {string} name - the event name.
	         * @property {respoke.Call} target
	         */
	        that.fire('hangup', {
	            reason: pc.state.hangupReason || "No reason specified."
	        });

	        pc.state.ignore();
	        pc.ignore();
	        that.ignore();
	        pc = null;
	    });

	    /**
	     * Expose hangup as reject for approve/reject workflow.
	     * @memberof! respoke.Call
	     * @method respoke.Call.reject
	     * @param {object} params
	     */
	    that.reject = function () {
	        if (!pc) {
	            return;
	        }
	        pc.state.dispatch('reject', {reason: 'call.reject() called'});
	    };

	    /**
	     * Indicate whether a call is being setup or is in progress.
	     * @memberof! respoke.Call
	     * @method respoke.Call.isActive
	     * @returns {boolean}
	     */
	    that.isActive = function () {
	        return !!(pc && pc.isActive() && (
	            that.outgoingMediaStreams.length > 0 ||
	            that.incomingMediaStreams.length > 0 ||
	            (directConnection && directConnection.isActive())
	        ));
	    };

	    /**
	     * Set the estimated media status on incoming media.
	     * @memberof! respoke.Call
	     * @method respoke.Call.updateIncomingMediaEstimate
	     * @param {object} params
	     * @param {RTCSessionDescriptor} [params.sdp] - optional sdp to use to estimate media
	     * @param {RTCConstraints} [params.constraints] - optional constraints to use to estimate media
	     * @private
	     */
	    function updateIncomingMediaEstimate(params) {
	        if (pc.state.sendOnly) {
	            that.incomingMediaStreams.length = 0;
	            return;
	        }

	        if (!params.sdp && !params.constraints) {
	            throw new Error("Can't estimate incoming media without sdp or constraints");
	        }

	        if (that.incomingMediaStreams.length === 0) {
	            that.incomingMediaStreams.push(respoke.RemoteMedia({
	                hasScreenShare: (that.target === 'screenshare'),
	                temporary: true
	            }));
	        }

	        if (params.sdp) {
	            if (that.incomingMediaStreams[0] && that.incomingMediaStreams[0].temporary) {
	                that.incomingMediaStreams[0].setSDP(params.sdp);
	            }
	        }

	        if (params.constraints) {
	            if (that.incomingMediaStreams[0] && that.incomingMediaStreams[0].temporary) {
	                that.incomingMediaStreams[0].setConstraints(params.constraints);
	            }
	        }
	    }

	    /**
	     * Set the estimated media status on outgoing media. For this method, by the time we have constraints, we're
	     * already calling getUserMedia so we will have exactly the right information. No need to use constraints
	     * to estimate.
	     * @memberof! respoke.Call
	     * @method respoke.Call.updateOutgoingMediaEstimate
	     * @param {object} params
	     * @param {RTCSessionDescriptor} [params.sdp] - optional sdp to use to estimate media
	     * @param {RTCConstraints} [params.constraints] - optional constraints to use to estimate media
	     * @private
	     */
	    function updateOutgoingMediaEstimate(params) {
	        if (pc.state.receiveOnly) {
	            that.outgoingMediaStreams.length = 0;
	            that.constraints = [];
	            return;
	        }

	        if (!params.sdp && !params.constraints) {
	            throw new Error("Can't estimate outgoing media without sdp or constraints");
	        }

	        if (that.outgoingMediaStreams.length === 0) {
	            that.outgoingMediaStreams.push(respoke.LocalMedia({
	                instanceId: instanceId,
	                temporary: true,
	                source: params.source
	            }));
	        }

	        if (params.sdp) {
	            if (that.outgoingMediaStreams[0] && that.outgoingMediaStreams[0].temporary) {
	                that.outgoingMediaStreams[0].setSDP(params.sdp);
	            }
	        }

	        if (params.constraints) {
	            if (that.outgoingMediaStreams[0] && that.outgoingMediaStreams[0].temporary) {
	                that.outgoingMediaStreams[0].setConstraints(params.constraints);
	            }
	        }
	    }

	    /**
	     * Save the offer so we can tell the browser about it after the PeerConnection is ready.
	     * Set the estimated media status on incoming and outgoing media.
	     * @memberof! respoke.Call
	     * @method respoke.Call.listenOffer
	     * @param {object} evt
	     * @param {object} evt.signal - The offer signal including the sdp
	     * @private
	     * @fires respoke.Call#modify
	     */
	    function listenOffer(evt) {
	        log.debug('listenOffer', evt.signal);

	        that.sessionId = evt.signal.sessionId;
	        pc.state.receiveOnly = respoke.sdpHasSendOnly(evt.signal.sessionDescription.sdp);
	        pc.state.sendOnly = respoke.sdpHasReceiveOnly(evt.signal.sessionDescription.sdp);
	        pc.state.once('connecting:entry', function () {
	            if (!pc.state.caller) {
	                pc.processOffer(evt.signal.sessionDescription);
	            }
	        });

	        // Only do this if we're still trying to guess what media is coming in.
	        // TODO not good enough for media renegotiation
	        updateIncomingMediaEstimate({sdp: evt.signal.sessionDescription});

	        /*
	         * Always overwrite constraints for callee on every offer, since answer() and accept() will
	         * always be called after parsing the SDP. However, if the caller isn't sending any media,
	         * use audio & video as our estimate.
	         * TODO not good enough for media renegotiation
	         */
	        // If sendOnly, we can't rely on the offer for media estimate. It doesn't have any media in it!
	        if (pc.state.sendOnly) {
	            updateOutgoingMediaEstimate({constraints: {
	                audio: true,
	                video: true
	            }});
	        } else {
	            updateOutgoingMediaEstimate({sdp: evt.signal.sessionDescription});
	        }

	        if (that.outgoingMedia) {
	            log.info("Default outgoingMedia constraints", that.outgoingMedia.constraints);
	        }

	        pc.state.dispatch('receiveOffer', {
	            previewLocalMedia: previewLocalMedia,
	            approve: that.approve
	        });
	    }

	    /**
	     * If video is muted, unmute. If not muted, mute.
	     * @deprecated
	     * @memberof! respoke.Call
	     * @method respoke.Call.toggleVideo
	     */
	    that.toggleVideo = function () {
	        if (that.isActive()) {
	            if (!videoIsMuted) {
	                that.muteVideo();
	            } else {
	                that.unmuteVideo();
	            }
	        }
	    };

	    /**
	     * If audio is muted, unmute. If not muted, mute.
	     * @deprecated
	     * @memberof! respoke.Call
	     * @method respoke.Call.toggleAudio
	     */
	    that.toggleAudio = function () {
	        if (that.isActive()) {
	            if (!audioIsMuted) {
	                that.muteAudio();
	            } else {
	                that.unmuteAudio();
	            }
	        }
	    };

	    /**
	     * Indicate whether the call has media of any type flowing in either direction.
	     * @memberof! respoke.Call
	     * @method respoke.Call.hasMedia
	     * @returns {boolean}
	     */
	    that.hasMedia = function () {
	        var local;
	        var remote;

	        if (!pc || !pc.getLocalStreams) {
	            // PeerConnection.init() has not been called yet
	            return false;
	        }

	        local = pc.getLocalStreams();
	        remote = pc.getRemoteStreams();

	        if (directConnection && directConnection.isActive()) {
	            return true;
	        }

	        return (local.length > 0 || remote.length > 0);
	    };

	    /**
	     * Mute all local video streams.
	     * @memberof! respoke.Call
	     * @method respoke.Call.muteVideo
	     * @fires respoke.Call#mute
	     */
	    that.muteVideo = function () {
	        if (videoIsMuted) {
	            return;
	        }
	        that.outgoingMedia.muteVideo();
	        videoIsMuted = true;
	    };

	    /**
	     * Unmute all local video streams.
	     * @memberof! respoke.Call
	     * @method respoke.Call.unmuteVideo
	     * @fires respoke.Call#mute
	     */
	    that.unmuteVideo = function () {
	        if (!videoIsMuted) {
	            return;
	        }
	        that.outgoingMedia.unmuteVideo();
	        videoIsMuted = false;
	    };

	    /**
	     * Mute all local audio streams.
	     * @memberof! respoke.Call
	     * @method respoke.Call.muteAudio
	     * @fires respoke.Call#mute
	     */
	    that.muteAudio = function () {
	        if (audioIsMuted) {
	            return;
	        }
	        that.outgoingMedia.muteAudio();
	        audioIsMuted = true;
	    };

	    /**
	     * Unmute all local audio streams.
	     * @memberof! respoke.Call
	     * @method respoke.Call.unmuteAudio
	     * @fires respoke.Call#mute
	     */
	    that.unmuteAudio = function () {
	        if (!audioIsMuted) {
	            return;
	        }

	        that.outgoingMedia.unmuteAudio();
	        audioIsMuted = false;
	    };

	    /**
	     * Send DTMF tones to the first audio track on the call. This allows interaction with a phone system expecting keys
	     * to be pressed on a normal phone, such as when calling a company for customer support and having to "Press 1 for English".
	     * @memberof! respoke.Call
	     * @method respoke.Call.sendTones
	     * @param {object} params
	     * @param {string} params.tones - The tones to send. Can be any combination of the characters '0123456789ABCD#*', or
	     *  a ',' (comma) to insert a 2 second pause before sending the next tone.
	     * @param {number} [params.duration] - Optional number in milliseconds to indicate how long to play each tone. This
	     *  value needs to be between 40 and 6000. Defaults to 100.
	     * @param {number} [params.gap] - Optional number in mlliseconds to indicate the gap between playing the tones.
	     *  This value needs to be larger than 30. Defaults to 70.
	     * @param {respoke.Call.onSuccess} [params.onSuccess] - Callback called when all requested DTMF tones have been played.
	     * @param {respoke.Call.onError} [params.onError] - Callback called when an error occurs while playing back the DTMF
	     *  tones, or when the request has been cancelled.
	     * @fires respoke.Call#tone-sent
	     * @fires respoke.Call#tone-sending-complete
	     * @returns {Promise}
	     */
	    that.sendTones = function (params) {
	        return pc.sendTones(params);
	    };

	    /**
	     * Cancels playback of all queued tones on the first audio track in a stream
	     * @memberof! respoke.Call
	     * @method respoke.Call.cancelTones
	     * @param {respoke.Call.onSuccess} [params.onSuccess] - Callback called when all the outstanding DTMF tones that
	     *  have not yet been played have been cancelled.
	     * @param {respoke.Call.onError} [params.onError] - Callback called when an error occurs while attempting to cancel
	     *  outstanding DTMF tones.
	     * @fires respoke.Call#tone-sending-cancelled
	     * @returns {Promise}
	     */
	    that.cancelTones = function (params) {
	        return pc.cancelTones(params);
	    };

	    pc.state.once('terminated:entry', function (evt) {
	        doHangup();
	    }, true);

	    /**
	     * Set the estimated media status on incoming media.
	     */
	    that.listen('signal-answer', function handleAnswerSignal(evt) {
	        log.debug('Call handleAnswerSignal', evt);

	        that.hasDataChannel = respoke.sdpHasDataChannel(evt.signal.sessionDescription.sdp);
	        updateIncomingMediaEstimate({sdp: evt.signal.sessionDescription});
	    });

	    that.listen('signal-offer', function handleOfferSignal(evt) {
	        log.debug('Call handleOfferSignal', evt);

	        if (pc.state.getState() === 'idle') {
	            pc.state.once('preparing:entry', function () {
	                listenOffer(evt);
	            });
	        } else {
	            listenOffer(evt);
	        }
	    }, true);

	    /**
	     * Save the hangup reason and hang up.
	     */
	    that.listen('signal-hangup', function handleHangupSignal(evt) {
	        log.debug('Call handleHangupSignal', evt);

	        if (!pc) {
	            return;
	        }

	        pc.report.callStoppedReason = evt.signal.reason || "Remote side hung up";
	        pc.state.receivedBye = true;
	        pc.state.dispatch('hangup', {signal: false, reason: pc.report.callStoppedReason});
	    }, true);

	    /**
	     * Save the answer and tell the browser about it.
	     */
	    that.listen('signal-modify', function handleModifySignal(evt) {
	        log.debug('Call handleModifySignal', evt);

	        if (evt.signal.action === 'initiate') {
	            defModify = Q.defer();
	            pc.state.dispatch('modify', {receive: true});
	        }
	    }, true);

	    /**
	     * Ignore the modify.
	     */
	    pc.listen('modify-reject', function handlePeerConnectModifyReject(evt) {
	        log.debug('Call handlePeerConnectModifyReject', evt);

	        if (evt.signal.action !== 'initiate') {
	            defMedia.reject(evt.err);
	            defModify.reject(evt.err);
	            defModify = undefined;
	        }
	    }, true);

	    /**
	     * Set up state and media for the modify.
	     */
	    pc.listen('modify-accept', function handlePeerConnectionModifyAccept(evt) {
	        log.debug('Call handlePeerConnectionModifyAccept', evt);

	        pc.state.dispatch('accept');

	        if (evt.signal.action !== 'initiate') {
	            defModify.resolve(); // resolved later for callee
	            defModify = undefined;
	            return;
	        }

	        // callee only from here down

	        // init the directConnection if necessary. We don't need to do anything with
	        // audio or video right now.
	        if (evt.signal.directConnection === true) {
	            actuallyAddDirectConnection().done(function successHandler(dc) {
	                directConnection = dc;
	                directConnection.accept();
	            });
	        } else if (evt.signal.directConnection === false) {
	            if (directConnection) {
	                that.removeDirectConnection({skipModify: true});
	                defMedia.resolve(false);
	            }
	        }
	        pc.state.needDirectConnection = typeof evt.signal.directConnection === 'boolean' ?
	            evt.signal.directConnection : null;
	        that.outgoingMedia.constraints = evt.signal.constraints || that.outgoingMedia.constraints;
	    }, true);

	    /**
	     * Send received ice candidates to the peer connection for processing
	     */
	    that.listen('signal-icecandidates', function handleIceCandidatesSignal(evt) {
	        log.debug('Call handleIceCandidatesSignal', evt);

	        if (!pc || !evt.signal.iceCandidates || !evt.signal.iceCandidates.length) {
	            return;
	        }
	        evt.signal.iceCandidates.forEach(function processCandidate(candidate) {
	            if (!pc) {
	                return;
	            }
	            pc.addRemoteCandidate({candidate: candidate});
	        });
	    }, true);

	    that.listen('answer', function handleAnswer(evt) {
	        log.debug('Call handleAnswer', evt);

	        var mediaPromises = [];

	        if (pc.state.receiveOnly || pc.state.needDirectConnection) {
	            that.outgoingMediaStreams.length = 0;
	            return;
	        }

	        /*
	         * By the time we get to here, we could be in a couple of states.
	         *
	         * If receiveOnly is set to true, we could possibly have constraints (if the developer used the API wrong)
	         * but we will not have any media in that.outgoingMediaStreams. We should unset that.constraints and skip
	         * building any local media.
	         *
	         * If we have never received any constraints, and receiveOnly is NOT set to true, we will have an estimate
	         * at that.outgoingMediaStreams[0] with temporary set to true. This estimate was set by parsing the SDP.
	         *
	         * If we have received one or more constraints, that.constraints array will contain the most recent set
	         * AND we will have an estimate at that.outgoingMediaStreams[0] with temporary set to true. We must completely
	         * rebuild that.outgoingMediaStreams from that.constraints.
	         */
	        if (pc.state.receiveOnly) {
	            that.outgoingMediaStreams.length = 0;
	            that.constraints = [];
	            return;
	        }

	        if (that.constraints.length === 0) {
	            // We didn't get told what to do by constraints; use our guess.
	            that.outgoingMediaStreams[0].temporary = undefined;
	        } else if (that.outgoingMediaStreams.length > 0 && that.outgoingMediaStreams[0].temporary) {
	            // We got told what to do. Discard our guess. It's OK for that.outgoingMediaStreams to be empty now.
	            that.outgoingMediaStreams.shift();
	        }

	        // If outgoingMedia is passed into the Call then there is no need to build the LocalMedia here
	        if (params.outgoingMedia) {
	            return;
	        }

	        if (that.constraints.length > 0) {
	            if (pc.state.isModifying) {
	                pc.removeLocalTracks();
	            }
	            that.outgoingMediaStreams.length = 0;
	            that.constraints.forEach(function (constraint) {
	                if (!respoke.constraintsHasAudio(constraint) && !respoke.constraintsHasVideo(constraint)) {
	                    return;
	                }
	                mediaPromises.push(buildLocalMedia(constraint));
	            });
	        } else if (that.outgoingMediaStreams.length > 0) {
	            that.outgoingMediaStreams.forEach(function (localMediaInstance) {
	                mediaPromises.push(buildLocalMedia(localMediaInstance));
	            });
	        } else {
	            throw new Error("I have no idea what type of media I am supposed to build.");
	        }

	        // These errors are handled elsewhere.
	        Q.all(mediaPromises).done(function () {
	            pc.state.dispatch('receiveLocalMedia');
	        }, function (err) {
	            pc.state.dispatch('reject', {reason: 'media stream error'});
	            pc.report.callStoppedReason = err.message;
	            /**
	             * This event is fired on errors that occur during call setup or media negotiation.
	             * @event respoke.Call#error
	             * @type {respoke.Event}
	             * @property {string} reason - A human readable description about the error.
	             * @property {respoke.Call} target
	             * @property {string} name - the event name.
	             */
	            that.fire('error', {
	                reason: err.message
	            });
	        });
	    }, true);

	    if (pc.state.needDirectConnection !== true) {
	        pc.state.once('preparing:entry', function () {
	            /**
	             * This event provides notification for when an incoming call is being received.  If the user wishes
	             * to allow the call, the app should call evt.call.answer() to answer the call.
	             * @event respoke.Client#call
	             * @type {respoke.Event}
	             * @property {respoke.Call} call
	             * @property {respoke.Endpoint} endpoint
	             * @property {string} name - the event name.
	             * @property {respoke.Client} target
	             */
	            client.fire('call', {
	                endpoint: that.remoteEndpoint,
	                call: that
	            });
	        }, true);
	    }

	    pc.state.listen('idle:exit', function (evt) {
	        saveParameters(params);
	    });

	    /**
	     * Set up promises. If we're not the caller, we need to listen for approval AND
	     * the remote SDP to come in before we can act on the call. Save parameters sent
	     * in with the constructor, then delete them off the call. If this call was initiated
	     * with a DirectConnection, set it up so answer() will be the approval mechanism.
	     */
	    pc.state.listen('preparing:entry', function (evt) {
	        if (defModify !== undefined) {
	            defMedia = Q.defer();
	        }

	        pc.init(); // instantiates RTCPeerConnection, can't call on modify
	        if (defModify === undefined && pc.state.needDirectConnection === true) {
	            actuallyAddDirectConnection(params);
	        }

	        if (params.outgoingMedia) {
	            streamReceivedHandler(params.outgoingMedia);
	            pc.state.dispatch('receiveLocalMedia');
	        }

	        if (pc.state.caller === true) {
	            that.answer();
	        }
	    }, true);

	    signalingChannel.getTurnCredentials().then(function (result) {
	        if (!pc) {
	            throw new Error("Already hung up.");
	        }
	        if (!result) {
	            log.warn("Relay service not available.");
	            pc.servers = {iceServers: []};
	        } else {
	            pc.servers = {iceServers: result};
	        }
	    }).fin(function () {
	        if (!pc) {
	            throw new Error("Already hung up.");
	        }
	        pc.state.dispatch('initiate', {
	            caller: that.caller
	        });
	    }).done(null, function (err) {
	        if (err.message !== "Already hung up.") {
	            log.debug('Unexpected exception', err);
	        }
	    });

	    return that;
	}; // End respoke.Call

	/**
	 * Handle an error that resulted from a method call.
	 * @callback respoke.Call.errorHandler
	 * @param {Error} err
	 */
	/**
	 * Handle the successful kick-off of stats on a call.
	 * @callback respoke.Call.statsSuccessHandler
	 * @param {respoke.MediaStatsParser} statsParser
	 */
	/**
	 * Handle obtaining media successfully.
	 * @callback respoke.Call.mediaSuccessHandler
	 * @param {respoke.LocalMedia} localMedia
	 */
	/**
	 * When on a call, receive local media when it becomes available. This is what you will need to provide if you want
	 * to show the user their own video during a call. This callback is called every time
	 * respoke.Call#local-stream-received is fired.
	 * @callback respoke.Call.onLocalMedia Callback for receiving an HTML5 Video
	 * element with the local audio and/or video attached.
	 * @param {respoke.Event} evt
	 * @param {Element} evt.element
	 * @param {respoke.LocalMedia} - The outgoingMedia property on the call.
	 * @param {string} evt.name - The event name.
	 * @param {respoke.Call} evt.target
	 */
	/**
	 * When on a call, receive remote media when it becomes available. This is what you will need to provide if you want
	 * to show the user the other party's video during a call. This callback is called every time
	 * respoke.Call#connect is fired.
	 * @callback respoke.Call.onConnect
	 * @param {respoke.Event} evt
	 * @param {Element} evt.element - the HTML5 Video element with the new stream attached.
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Call} evt.target
	 */
	/**
	 * When a call is in setup or media renegotiation happens. This callback will be called every time
	 * respoke.Call#error.
	 * @callback respoke.Call.onError
	 * @param {respoke.Event} evt
	 * @param {boolean} evt.reason - A human-readable description of the error.
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Call} evt.target
	 */
	/**
	 * When on a call, receive notification the call has been hung up. This callback is called every time
	 * respoke.Call#hangup is fired.
	 * @callback respoke.Call.onHangup
	 * @param {respoke.Event} evt
	 * @param {boolean} evt.sentSignal - Whether or not we sent a 'hangup' signal to the other party.
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Call} evt.target
	 */
	/**
	 * Called when changing the mute state on any type of media. This callback will be called when media is muted or
	 * unmuted. This callback is called every time respoke.Call#mute is fired.
	 * @callback respoke.Call.onMute
	 * @param {respoke.Event} evt
	 * @param {respoke.Call} evt.target
	 */
	/**
	 * Called when the callee answers the call. This callback is called every time respoke.Call#answer is fired.
	 * @callback respoke.Call.onAnswer
	 * @param {respoke.Event} evt
	 * @param {respoke.Call} evt.target
	 */
	/**
	 * Called when the user approves local media. This callback will be called whether or not the approval was based
	 * on user feedback. I. e., it will be called even if the approval was automatic. This callback is called every time
	 * respoke.Call#approve is fired.
	 * @callback respoke.Call.onApprove
	 * @param {respoke.Event} evt
	 * @param {respoke.Call} evt.target
	 */
	/**
	 * When setting up a call, receive notification that the browser has granted access to media.  This callback is
	 * called every time respoke.Call#allow is fired.
	 * @callback respoke.Call.onAllow
	 * @param {respoke.Event} evt
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Call} evt.target
	 */
	/**
	 * When setting up a call, receive notification that the app has asked the browser for permission to get audio or
	 * video and is waiting on the browser to grant or reject permission. This callback will be called every time
	 * respoke.Call#requesting-media is fired.
	 * @callback respoke.Call.onRequestingMedia
	 * @param {respoke.Event} evt
	 * @param {string} evt.name - the event name.
	 * @param {respoke.Call} evt.target
	 */
	/**
	 * The use of stats requires an additional module to Respoke. When on a call, receive periodic statistical
	 * information about the call, including the codec, lost packets, and bandwidth being consumed. This callback is
	 * called every time respoke.Call#stats is fired.
	 * @callback respoke.MediaStatsParser.statsHandler
	 * @param {respoke.Event} evt
	 * @param {respoke.MediaStats} evt.stats - an object with stats in it.
	 * @param {respoke.Call} evt.target
	 * @param {string} evt.name - the event name.
	 */
	/**
	 * When on a call, receive local media when it becomes available. This is what you will need to provide if you want
	 * to allow the user to preview and approve or reject their own video before a call. If this callback is provided,
	 * Respoke will wait for call.answer() to be called before proceeding. If this callback is not provided,
	 * Respoke will proceed without waiting for user input. This callback is called every time
	 * respoke.Call#local-stream-received is fired.
	 * @callback respoke.Call.previewLocalMedia
	 * @param {object} element - the HTML5 Video element with the new stream attached.
	 * @param {respoke.Call} call
	 */
	/**
	 * Called when a tone is sent on an audio track. This callback is called every time respoke.Call#tone-sent is fired.
	 * @callback respoke.Call.onToneSent
	 * @param {respoke.Event} evt
	 * @param {string} evt.tone
	 * @param {number} evt.duration
	 * @param {number} evt.gap
	 */
	/**
	 * Called when the playback queue of tones has started.
	 * This callback is called every time respoke.Call#tone-sending-started is fired.
	 * @callback respoke.Call.onToneSendingStarted
	 * @param {respoke.Event} evt
	 * @param {object} evt.target
	 */
	/**
	 * Receive the DirectConnection.
	 * @callback respoke.Call.directConnectionSuccessHandler
	 * @param {respoke.DirectConnection} directConnection
	 */


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	var respoke = __webpack_require__(1);
	var log = respoke.log;
	var Q = respoke.Q;

	/**
	 * A wrapper around the stream from `getUserMedia`,
	 * which is attached to a call at `call.outgoingMedia`.
	 *
	 * @class respoke.LocalMedia
	 * @constructor
	 * @augments respoke.EventEmitter
	 * @param {object} params
	 * @param {object} [params.constraints]
	 * @param {HTMLVideoElement} params.element - Pass in an optional html video element to have local
	 * video attached to it.
	 * @returns {respoke.LocalMedia}
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    var that = respoke.EventEmitter(params);

	    /**
	     * @memberof! respoke.LocalMedia
	     * @name className
	     * @type {string}
	     */
	    that.className = 'respoke.LocalMedia';
	    /**
	     * Respoke media ID (different from a `MediaStream.id`).
	     * @memberof! respoke.LocalMedia
	     * @name id
	     * @type {string}
	     */
	    that.id = respoke.makeGUID();
	    /**
	     * The HTML element with video attached.
	     * @memberof! respoke.LocalMedia
	     * @name element
	     * @type {HTMLVideoElement}
	     */
	    that.element = params.element;
	    /**
	     * @memberof! respoke.LocalMedia
	     * @name hasScreenShare
	     * @private
	     * @type {boolean}
	     */
	    var hasScreenShare = params.hasScreenShare;
	    delete params.hasScreenShare;

	    /**
	     * @memberof! respoke.LocalMedia
	     * @name screenShareSource
	     * @private
	     * @type {string}
	     */
	    var screenShareSource = params.source;
	    delete params.source;

	    /**
	     * @memberof! respoke.LocalMedia
	     * @name sdpHasAudio
	     * @private
	     * @type {boolean}
	     */
	    var sdpHasAudio = false;
	    /**
	     * @memberof! respoke.LocalMedia
	     * @name sdpHasVideo
	     * @private
	     * @type {boolean}
	     */
	    var sdpHasVideo = false;
	    /**
	     * @memberof! respoke.LocalMedia
	     * @name sdpHasDataChannel
	     * @private
	     * @type {boolean}
	     */
	    var sdpHasDataChannel = false;
	    /**
	     * A timer to make sure we only fire {respoke.LocalMedia#requesting-media} if the browser doesn't
	     * automatically grant permission on behalf of the user. Timer is canceled in onReceiveUserMedia.
	     * @memberof! respoke.LocalMedia
	     * @name allowTimer
	     * @private
	     * @type {number}
	     */
	    var allowTimer = 0;
	    /**
	     * @memberof! respoke.LocalMedia
	     * @name mediaOptions
	     * @private
	     * @type {object}
	     */
	    var mediaOptions = {
	        optional: [
	            { DtlsSrtpKeyAgreement: true },
	            { RtpDataChannels: false }
	        ]
	    };

	    /**
	     * The local `MediaStream` from `getUserMedia()`.
	     * @memberof! respoke.LocalMedia
	     * @name stream
	     * @type {RTCMediaStream}
	     */
	    that.stream = null;

	    /**
	     * The media deferred whose promise is returned from localMedia.start and resolved with the stream.
	     * @memberof! respoke.LocalMedia
	     * @name deferred
	     * @type {object}
	     * @private
	     */
	    var deferred = Q.defer();

	    /**
	     * Save the local stream. Kick off SDP creation.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.onReceiveUserMedia
	     * @private
	     * @param {RTCMediaStream} theStream
	     */
	    function onReceiveUserMedia(theStream) {
	        that.stream = theStream;
	        clearTimeout(allowTimer);
	        /**
	         * The user has approved the request for media. Any UI changes made to remind the user to click Allow
	         * should be canceled now. This event is the same as the `onAllow` callback.  This event gets fired
	         * even if the allow process is automatic, i. e., permission and media is granted by the browser
	         * without asking the user to approve it.
	         * @event respoke.LocalMedia#allow
	         * @type {respoke.Event}
	         * @property {string} name - the event name.
	         * @property {respoke.LocalMedia} target
	         */
	        that.fire('allow');
	        log.debug('User gave permission to use media.');
	        log.debug('onReceiveUserMedia');

	        that.element = that.element || document.createElement('video');

	        that.stream.numPc = 1;

	        attachMediaStream(that.element, that.stream);
	        // We won't want our local video outputting audio.
	        that.element.muted = true;
	        that.element.autoplay = true;

	        // perform cleanup on the LocalMedia instance if the underlying stream has ended
	        that.stream.addEventListener('ended', that.stop, false);
	        deferred.resolve();
	    }

	    /**
	     * Expose getAudioTracks.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.getAudioTracks
	     */
	    that.getAudioTracks = function () {
	        if (that.stream) {
	            return that.stream.getAudioTracks();
	        }
	        return [];
	    };

	    /**
	     * Expose getVideoTracks.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.getVideoTracks
	     */
	    that.getVideoTracks = function () {
	        if (that.stream) {
	            return that.stream.getVideoTracks();
	        }
	        return [];
	    };

	    /**
	     * Create the RTCPeerConnection and add handlers. Process any offer we have already received.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.requestMedia
	     * @private
	     */
	    function requestMedia() {
	        log.debug('LocalMedia.requestMedia', that.constraints);

	        if (!that.constraints) {
	            deferred.reject(new Error('No constraints.'));
	            return;
	        }

	        if (respoke.useFakeMedia === true) {
	            that.constraints.fake = true;
	        }

	        allowTimer = setTimeout(function delayPermissionsRequest() {
	            /**
	             * The browser is asking for permission to access the User's media. This would be an ideal time
	             * to modify the UI of the application so that the user notices the request for permissions
	             * and approves it.
	             * @event respoke.LocalMedia#requesting-media
	             * @type {respoke.Event}
	             * @property {string} name - the event name.
	             * @property {respoke.LocalMedia} target
	             */
	            that.fire('requesting-media');
	        }, 500);

	        if (respoke.constraintsHasScreenShare(that.constraints)) {
	            if (respoke.isNwjs || (respoke.needsChromeExtension && respoke.hasChromeExtension)) {
	                respoke.chooseDesktopMedia({source: screenShareSource}, function (params) {
	                    if (!params.sourceId) {
	                        deferred.reject(new Error("Error trying to get screensharing source: " + params.error));
	                        return;
	                    }
	                    that.constraints.video.mandatory.chromeMediaSourceId = params.sourceId;
	                    log.debug("Running getUserMedia with constraints", that.constraints);
	                    getUserMedia(that.constraints, onReceiveUserMedia, onUserMediaError);
	                });
	                return;
	            } else if (respoke.needsFirefoxExtension && respoke.hasFirefoxExtension) {
	                log.debug("Running getUserMedia with constraints", that.constraints);
	                getUserMedia(that.constraints, onReceiveUserMedia, onUserMediaError);
	                return;
	            } else {
	                deferred.reject(new Error("Screen sharing not implemented on this platform yet."));
	                return;
	            }
	        }
	        log.debug("Running getUserMedia with constraints", that.constraints);
	        getUserMedia(that.constraints, onReceiveUserMedia, onUserMediaError);
	    }

	    /**
	     * Handle any error that comes up during the process of getting user media.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.onUserMediaError
	     * @private
	     * @param {object}
	     */
	    function onUserMediaError(p) {
	        log.debug('Local media error.', p);
	        var errorMessage = p.code === 1 ? "Permission denied." : "Unknown.";
	        deferred.reject(new Error("Error getting user media: " + errorMessage));
	    }

	    /**
	     * Whether the video stream is muted, or undefined if no stream of this type exists.
	     *
	     * All video tracks must be muted for this to return `false`.
	     * @returns boolean
	     */
	    that.isVideoMuted = function () {
	        if (!that.stream || !that.stream.getVideoTracks().length) {
	            return undefined;
	        }

	        return that.stream.getVideoTracks().every(function (track) {
	            return !track.enabled;
	        });
	    };

	    /**
	     * Mute local video stream.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.muteVideo
	     * @fires respoke.LocalMedia#mute
	     */
	    that.muteVideo = function () {
	        if (that.isVideoMuted()) {
	            return;
	        }
	        that.stream.getVideoTracks().forEach(function eachTrack(track) {
	            track.enabled = false;
	        });
	        /**
	         * Indicate that the mute status of local audio or video has changed.
	         * @event respoke.LocalMedia#mute
	         * @property {string} name - the event name.
	         * @property {respoke.LocalMedia} target
	         * @property {string} type - Either "audio" or "video" to specify the type of stream whose muted state
	         * has been changed.
	         * @property {boolean} muted - Whether the stream is now muted. Will be set to false if mute was turned off.
	         */
	        that.fire('mute', {
	            type: 'video',
	            muted: true
	        });
	    };

	    /**
	     * Unmute local video stream.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.unmuteVideo
	     * @fires respoke.LocalMedia#mute
	     */
	    that.unmuteVideo = function () {
	        if (!that.isVideoMuted()) {
	            return;
	        }
	        that.stream.getVideoTracks().forEach(function eachTrack(track) {
	            track.enabled = true;
	        });
	        /**
	         * Indicate that the mute status of local audio or video has changed.
	         * @event respoke.LocalMedia#mute
	         * @property {string} name - the event name.
	         * @property {respoke.LocalMedia} target
	         * @property {string} type - Either "audio" or "video" to specify the type of stream whose muted state
	         * has been changed.
	         * @property {boolean} muted - Whether the stream is now muted. Will be set to false if mute was turned off.
	         */
	        that.fire('mute', {
	            type: 'video',
	            muted: false
	        });
	    };

	    /**
	     * Whether the audio stream is muted, or undefined if no track of this type exists.
	     *
	     * All audio tracks must be muted for this to return `false`.
	     * @returns boolean
	     */
	    that.isAudioMuted = function () {
	        if (!that.stream || !that.stream.getAudioTracks().length) {
	            return undefined;
	        }
	        return that.stream.getAudioTracks().every(function (track) {
	            return !track.enabled;
	        });
	    };

	    /**
	     * Mute local audio stream.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.muteAudio
	     * @fires respoke.LocalMedia#mute
	     */
	    that.muteAudio = function () {
	        if (that.isAudioMuted()) {
	            return;
	        }
	        that.stream.getAudioTracks().forEach(function eachTrack(track) {
	            track.enabled = false;
	        });
	        /**
	         * Indicate that the mute status of local audio or video has changed.
	         * @event respoke.LocalMedia#mute
	         * @property {string} name - the event name.
	         * @property {respoke.LocalMedia} target
	         * @property {string} type - Either "audio" or "video" to specify the type of stream whose muted state
	         * has been changed.
	         * @property {boolean} muted - Whether the stream is now muted. Will be set to false if mute was turned off.
	         */
	        that.fire('mute', {
	            type: 'audio',
	            muted: true
	        });
	    };

	    /**
	     * Unmute local audio stream.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.unmuteAudio
	     * @fires respoke.LocalMedia#mute
	     */
	    that.unmuteAudio = function () {
	        if (!that.isAudioMuted()) {
	            return;
	        }
	        that.stream.getAudioTracks().forEach(function eachTrack(track) {
	            track.enabled = true;
	        });
	        /**
	         * Indicate that the mute status of local audio or video has changed.
	         * @event respoke.LocalMedia#mute
	         * @property {string} name - the event name.
	         * @property {respoke.LocalMedia} target
	         * @property {string} type - Either "audio" or "video" to specify the type of stream whose muted state
	         * has been changed.
	         * @property {boolean} muted - Whether the stream is now muted. Will be set to false if mute was turned off.
	         */
	        that.fire('mute', {
	            type: 'audio',
	            muted: false
	        });
	    };

	    /**
	     * Stop the stream.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.stop
	     * @fires respoke.LocalMedia#stop
	     */
	    that.stop = function () {
	        if (!that.stream) {
	            return;
	        }

	        that.stream.numPc -= 1;
	        if (that.stream.numPc === 0) {
	            that.stream.getTracks().forEach(function (track) {
	                track.stop();
	            });
	        }
	        that.stream = null;
	        /**
	         * Indicate that local media has stopped.
	         * @event respoke.LocalMedia#stop
	         * @property {string} name - the event name.
	         * @property {respoke.LocalMedia} target
	         */
	        that.fire('stop');
	    };

	    /**
	     * Indicate whether we are sending a screenshare.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.hasScreenShare
	     * @return {boolean}
	     */
	    that.hasScreenShare = function () {
	        if (that.stream) {
	            return (that.stream.getVideoTracks().length > 0 && hasScreenShare);
	        }
	        return hasScreenShare;
	    };

	    /**
	     * Indicate whether we are sending video.
	     *
	     * Note: This method will return true when the video is a screenshare.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.hasVideo
	     * @return {boolean}
	     */
	    that.hasVideo = function () {
	        if (that.stream) {
	            return (that.stream.getVideoTracks().length > 0);
	        }
	        return sdpHasVideo;
	    };

	    /**
	     * Indicate whether we are sending audio.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.hasAudio
	     * @return {boolean}
	     */
	    that.hasAudio = function () {
	        if (that.stream) {
	            return (that.stream.getAudioTracks().length > 0);
	        }
	        return sdpHasAudio;
	    };

	    /**
	     * Indicate whether we have media yet.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.hasMedia
	     * @return {boolean}
	     */
	    that.hasMedia = function () {
	        return !!that.stream;
	    };

	    /**
	     * Save and parse the SDP.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.setSDP
	     * @param {RTCSessionDescription} oSession
	     * @private
	     */
	    that.setSDP = function (oSession) {
	        sdpHasVideo = respoke.sdpHasVideo(oSession.sdp);
	        sdpHasAudio = respoke.sdpHasAudio(oSession.sdp);
	        sdpHasDataChannel = respoke.sdpHasDataChannel(oSession.sdp);

	        // We don't have media yet & this can still be changed so create the defaults based on what the sdp says.
	        if (that.temporary) {
	            that.constraints = {
	                video: sdpHasVideo,
	                audio: sdpHasAudio,
	                mandatory: {},
	                optional: []
	            };
	        }
	    };

	    /**
	     * Parse the constraints.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.setConstraints
	     * @param {MediaConstraints} constraints
	     * @private
	     */
	    that.setConstraints = function (constraints) {
	        that.constraints = constraints;
	        sdpHasVideo = respoke.constraintsHasVideo(that.constraints);
	        sdpHasAudio = respoke.constraintsHasAudio(that.constraints);
	    };

	    /**
	     * Start the stream.
	     * @memberof! respoke.LocalMedia
	     * @method respoke.LocalMedia.start
	     * @fires respoke.LocalMedia#start
	     * @param {object} [params]
	     * @param {respoke.Client.successHandler} [params.onSuccess] - Success handler for this invocation of
	     * this method only.
	     * @param {respoke.Client.errorHandler} [params.onError] - Error handler for this invocation of this
	     * method only.
	     * @returns {Promise|undefined}
	     */
	    that.start = function (params) {
	        var retVal;
	        params = params || {};

	        if (that.temporary) {
	            deferred.reject(new Error("Temporary local media started!"));
	        } else {
	            requestMedia();
	        }

	        retVal = respoke.handlePromise(deferred.promise, params.onSuccess, params.onError);
	        return retVal;
	    };

	    return that;
	}; // End respoke.LocalMedia


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	var respoke = __webpack_require__(1);

	/**
	 * Class for managing the remote media stream,
	 * which is attached to a call at `call.outgoingMedia`.
	 *
	 * @class respoke.RemoteMedia
	 * @constructor
	 * @augments respoke.EventEmitter
	 * @param {object} params
	 * @param {object} params.constraints
	 * @param {boolean} params.temporary - whether this instance represents our best guess of future media. If so,
	 * this object will be deleted when real media comes in. It will be replaced by different instance of
	 * respoke.RemoteMedia representing the actual state of media.
	 * @param {HTMLVideoElement} params.element - Pass in an optional html video element to have remote
	 * video attached to it.
	 * @returns {respoke.RemoteMedia}
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    /**
	     * @memberof! respoke.RemoteMedia
	     * @name instanceId
	     * @private
	     * @type {string}
	     */
	    var that = respoke.EventEmitter(params);
	    /**
	     * @memberof! respoke.RemoteMedia
	     * @name className
	     * @type {string}
	     */
	    that.className = 'respoke.RemoteMedia';
	    /**
	     * Respoke media ID (different from a `MediaStream.id`).
	     * @memberof! respoke.RemoteMedia
	     * @name id
	     * @type {string}
	     */
	    that.id = respoke.makeGUID();
	    /**
	     * The HTML element with attached video.
	     * @memberof! respoke.RemoteMedia
	     * @name element
	     * @type {HTMLVideoElement}
	     */
	    that.element = params.element || document.createElement('video');
	    /**
	     * @memberof! respoke.RemoteMedia
	     * @name hasScreenShare
	     * @private
	     * @type {boolean}
	     */
	    var hasScreenShare = params.hasScreenShare;
	    delete params.hasScreenShare;
	    /**
	     * @memberof! respoke.RemoteMedia
	     * @name sdpHasAudio
	     * @private
	     * @type {boolean}
	     */
	    var sdpHasAudio = false;
	    /**
	     * @memberof! respoke.RemoteMedia
	     * @name sdpHasVideo
	     * @private
	     * @type {boolean}
	     */
	    var sdpHasVideo = false;
	    /**
	     * @memberof! respoke.RemoteMedia
	     * @name sdpHasDataChannel
	     * @private
	     * @type {boolean}
	     */
	    var sdpHasDataChannel = false;
	    /**
	     * A timer to make sure we only fire {respoke.RemoteMedia#requesting-media} if the browser doesn't
	     * automatically grant permission on behalf of the user. Timer is canceled in onReceiveUserMedia.
	     * @memberof! respoke.RemoteMedia
	     * @name allowTimer
	     * @private
	     * @type {number}
	     */
	    var allowTimer = 0;
	    /**
	     * @memberof! respoke.RemoteMedia
	     * @name mediaOptions
	     * @private
	     * @type {object}
	     */
	    var mediaOptions = {
	        optional: [
	            { DtlsSrtpKeyAgreement: true },
	            { RtpDataChannels: false }
	        ]
	    };
	    /**
	     * @memberof! respoke.RemoteMedia
	     * @name pc
	     * @private
	     * @type {respoke.PeerConnection}
	     */
	    var pc = params.pc;
	    delete that.pc;
	    /**
	     * The remote `MediaStream`.
	     * @memberof! respoke.RemoteMedia
	     * @name stream
	     * @type {RTCMediaStream}
	     */
	    that.stream = params.stream;

	    if (!that.temporary && that.stream) {
	        attachMediaStream(that.element, that.stream);
	        that.element.autoplay = true;
	        setTimeout(that.element.play.bind(that.element)); // stupid Firefox requires this.
	    }

	    /**
	     * Indicate whether we are receiving a screenshare.
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.hasScreenShare
	     * @return {boolean}
	     */
	    that.hasScreenShare = function () {
	        if (that.stream) {
	            return (that.stream.getVideoTracks().length > 0 && hasScreenShare);
	        }
	        return hasScreenShare;
	    };

	    /**
	     * Indicate whether we are receiving video.
	     *
	     * Note: This method will return true when the video is a screenshare.
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.hasVideo
	     * @return {boolean}
	     */
	    that.hasVideo = function () {
	        if (that.stream) {
	            return (that.stream.getVideoTracks().length > 0);
	        }
	        return sdpHasVideo;
	    };

	    /**
	     * Indicate whether we are receiving audio.
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.hasAudio
	     * @return {boolean}
	     */
	    that.hasAudio = function () {
	        if (that.stream) {
	            return (that.stream.getAudioTracks().length > 0);
	        }
	        return sdpHasAudio;
	    };

	    /**
	     * Indicate whether we have media yet.
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.hasMedia
	     * @return {boolean}
	     */
	    that.hasMedia = function () {
	        return !!that.stream;
	    };

	    /**
	     * Save and parse the SDP
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.setSDP
	     * @param {RTCSessionDescription} oSession
	     * @private
	     */
	    that.setSDP = function (oSession) {
	        sdpHasVideo = respoke.sdpHasVideo(oSession.sdp);
	        sdpHasAudio = respoke.sdpHasAudio(oSession.sdp);
	        sdpHasDataChannel = respoke.sdpHasDataChannel(oSession.sdp);
	    };

	    /**
	     * Parse the constraints.
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.setConstraints
	     * @param {MediaConstraints} constraints
	     * @private
	     */
	    that.setConstraints = function (constraints) {
	        that.constraints = constraints;
	        sdpHasVideo = respoke.constraintsHasVideo(that.constraints);
	        sdpHasAudio = respoke.constraintsHasAudio(that.constraints);
	    };

	    /**
	     * Expose getAudioTracks.
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.getAudioTracks
	     */
	    that.getAudioTracks = function () {
	        if (that.stream) {
	            return that.stream.getAudioTracks();
	        }
	        return [];
	    };

	    /**
	     * Expose getVideoTracks.
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.getVideoTracks
	     */
	    that.getVideoTracks = function () {
	        if (that.stream) {
	            return that.stream.getVideoTracks();
	        }
	        return [];
	    };

	    /**
	     * Stop the stream.
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.stop
	     * @fires respoke.RemoteMedia#stop
	     */
	    that.stop = function () {
	        if (!that.stream) {
	            return;
	        }

	        that.stream.numPc -= 1;
	        if (that.stream.numPc === 0) {
	            that.stream.getTracks().forEach(function (track) {
	                track.stop();
	            });
	        }
	        that.stream = null;
	        /**
	         * Indicate that remote media has stopped.
	         * @event respoke.RemoteMedia#stop
	         * @property {string} name - the event name.
	         * @property {respoke.RemoteMedia} target
	         */
	        that.fire('stop');
	    };

	    /**
	     * Whether the video stream is muted.
	     *
	     * All video tracks must be muted for this to return `false`.
	     * @returns boolean
	     */
	    that.isVideoMuted = function () {
	        if (!that.stream) {
	            return false;
	        }
	        return that.stream.getVideoTracks().every(function (track) {
	            return !track.enabled;
	        });
	    };

	    /**
	     * Mute remote video stream.
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.muteVideo
	     * @fires respoke.RemoteMedia#mute
	     */
	    that.muteVideo = function () {
	        if (that.isVideoMuted()) {
	            return;
	        }
	        that.stream.getVideoTracks().forEach(function eachTrack(track) {
	            track.enabled = false;
	        });
	        /**
	         * Indicate that the muted status of remote video or audio has changed.
	         * @event respoke.RemoteMedia#mute
	         * @property {string} name - the event name.
	         * @property {respoke.RemoteMedia} target
	         * @property {string} type - Either "audio" or "video" to specify the type of stream whose muted state
	         * has been changed.
	         * @property {boolean} muted - Whether the stream is now muted. Will be set to false if mute was turned off.
	         */
	        that.fire('mute', {
	            type: 'video',
	            muted: true
	        });
	    };

	    /**
	     * Unmute remote video stream.
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.unmuteVideo
	     * @fires respoke.RemoteMedia#mute
	     */
	    that.unmuteVideo = function () {
	        if (!that.isVideoMuted()) {
	            return;
	        }
	        that.stream.getVideoTracks().forEach(function eachTrack(track) {
	            track.enabled = true;
	        });
	        /**
	         * Indicate that the muted status of remote video or audio has changed.
	         * @event respoke.RemoteMedia#mute
	         * @property {string} name - the event name.
	         * @property {respoke.RemoteMedia} target
	         * @property {string} type - Either "audio" or "video" to specify the type of stream whose muted state
	         * has been changed.
	         * @property {boolean} muted - Whether the stream is now muted. Will be set to false if mute was turned off.
	         */
	        that.fire('mute', {
	            type: 'video',
	            muted: false
	        });
	    };

	    /**
	     * Whether the audio stream is muted.
	     *
	     * All audio tracks must be muted for this to return `false`.
	     * @returns boolean
	     */
	    that.isAudioMuted = function () {
	        if (!that.stream) {
	            return false;
	        }
	        return that.stream.getAudioTracks().every(function (track) {
	            return !track.enabled;
	        });
	    };

	    /**
	     * Mute remote audio stream.
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.muteAudio
	     * @fires respoke.RemoteMedia#mute
	     */
	    that.muteAudio = function () {
	        if (that.isAudioMuted()) {
	            return;
	        }
	        that.stream.getAudioTracks().forEach(function eachTrack(track) {
	            track.enabled = false;
	        });
	        /**
	         * Indicate that the muted status of remote video or audio has changed.
	         * @event respoke.RemoteMedia#mute
	         * @property {string} name - the event name.
	         * @property {respoke.RemoteMedia} target
	         * @property {string} type - Either "audio" or "video" to specify the type of stream whose muted state
	         * has been changed.
	         * @property {boolean} muted - Whether the stream is now muted. Will be set to false if mute was turned off.
	         */
	        that.fire('mute', {
	            type: 'audio',
	            muted: true
	        });
	    };

	    /**
	     * Unmute remote audio stream.
	     * @memberof! respoke.RemoteMedia
	     * @method respoke.RemoteMedia.unmuteAudio
	     * @fires respoke.RemoteMedia#mute
	     */
	    that.unmuteAudio = function () {
	        if (!that.isAudioMuted()) {
	            return;
	        }
	        that.stream.getAudioTracks().forEach(function eachTrack(track) {
	            track.enabled = true;
	        });
	        /**
	         * Indicate that the muted status of remote video or audio has changed.
	         * @event respoke.RemoteMedia#mute
	         * @property {string} name - the event name.
	         * @property {respoke.RemoteMedia} target
	         * @property {string} type - Either "audio" or "video" to specify the type of stream whose muted state
	         * has been changed.
	         * @property {boolean} muted - Whether the stream is now muted. Will be set to false if mute was turned off.
	         */
	        that.fire('mute', {
	            type: 'audio',
	            muted: false
	        });
	    };

	    return that;
	}; // End respoke.RemoteMedia


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015, Digium, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under The MIT License found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * For all details and documentation:  https://www.respoke.io
	 */

	var Q = __webpack_require__(8);
	var respoke = __webpack_require__(1);

	/**
	 * A conference call to one or more people with audio. Eventually this will handle video, too.
	 * @class respoke.Conference
	 * @constructor
	 * @augments respoke.EventEmitter
	 * @param {object} params
	 * @param {string} params.id - The id that should be used to create the conference call or the ID
	 * of the call to join.
	 * @param {string} params.instanceId - client id
	 * @param {boolean} params.caller - whether or not we initiated the call
	 * @param {boolean} [params.receiveOnly] - whether or not we accept media
	 * @param {boolean} [params.sendOnly] - whether or not we send media
	 * @param {boolean} [params.needDirectConnection] - flag to enable skipping media & opening direct connection.
	 * @param {boolean} [params.forceTurn] - If true, media is not allowed to flow peer-to-peer and must flow through
	 * relay servers. If it cannot flow through relay servers, the call will fail.
	 * @param {boolean} [params.disableTurn] - If true, media is not allowed to flow through relay servers; it is
	 * required to flow peer-to-peer. If it cannot, the call will fail.
	 * @param {respoke.Endpoint} params.remoteEndpoint - The endpoint who is being called.
	 * @param {string} [params.connectionId] - The connection ID of the remoteEndpoint.
	 * @param {respoke.Call.previewLocalMedia} [params.previewLocalMedia] - A function to call if the developer
	 * wants to perform an action between local media becoming available and calling approve().
	 * @param {function} params.signalOffer - Signaling action from SignalingChannel.
	 * @param {function} params.signalConnected - Signaling action from SignalingChannel.
	 * @param {function} params.signalAnswer - Signaling action from SignalingChannel.
	 * @param {function} params.signalHangup - Signaling action from SignalingChannel.
	 * @param {function} params.signalReport - Signaling action from SignalingChannel.
	 * @param {function} params.signalCandidate - Signaling action from SignalingChannel.
	 * @param {Array<RTCConstraints>} params.constraints - Array of WebRTC constraints.
	 * @param {respoke.Conference.onJoin} [params.onJoin] - Callback for when a participant joins the conference.
	 * @param {respoke.Conference.onLeave} [params.onLeave] - Callback for when a participant leaves the conference.
	 * @param {respoke.Conference.onMessage} [params.onMessage] - Callback for when a message is sent to the conference.
	 * @param {respoke.Conference.onMute} [params.onMute] - Callback for when local or remote media is muted or unmuted.
	 * @param {respoke.Conference.onTopic} [params.onTopic] - Callback for the conference topic changes.
	 * @param {respoke.Conference.onPresenter} [params.onPresenter] - Callback for when the presenter changes.
	 * @param {respoke.Call.onError} [params.onError] - Callback for errors that happen during call setup or
	 * media renegotiation.
	 * @param {respoke.Call.onLocalMedia} [params.onLocalMedia] - Callback for receiving an HTML5 Video
	 * element with the local audio and/or video attached.
	 * @param {respoke.Call.onConnect} [params.onConnect] - Callback for the remote video element.
	 * @param {respoke.Call.onHangup} [params.onHangup] - Callback for when the call is ended, whether or not
	 * it was ended in a graceful manner.
	 * @param {respoke.Call.onMute} [params.onMute] - Callback for changing the mute state on any type of media.
	 * This callback will be called when media is muted or unmuted.
	 * @param {respoke.Call.onAnswer} [params.onAnswer] - Callback for when the callee answers the call.
	 * @param {respoke.Call.onRequestingMedia} [params.onRequestingMedia] - Callback for when the app is waiting
	 * for the user to give permission to start getting audio or video.
	 * @param {respoke.Call.onApprove} [params.onApprove] - Callback for when the user approves local media. This
	 * callback will be called whether or not the approval was based on user feedback. I. e., it will be called even if
	 * the approval was automatic.
	 * @param {respoke.Call.onAllow} [params.onAllow] - Callback for when the browser gives us access to the
	 * user's media.  This event gets called even if the allow process is automatic, i. e., permission and media is
	 * granted by the browser without asking the user to approve it.
	 * @param {HTMLVideoElement} params.videoLocalElement - Pass in an optional html video element to have local
	 * video attached to it.
	 * @param {HTMLVideoElement} params.videoRemoteElement - Pass in an optional html video element to have remote
	 * video attached to it.
	 * @returns {respoke.Conference}
	 */
	module.exports = function (params) {
	    "use strict";
	    params = params || {};
	    /**
	     * @memberof! respoke.Client
	     * @name instanceId
	     * @private
	     * @type {string}
	     */
	    var instanceId = params.instanceId;
	    var signalingChannel = params.signalingChannel;
	    var that = respoke.EventEmitter({
	        id: params.id
	    });

	    that.listen('join', params.onJoin);
	    that.listen('leave', params.onLeave);
	    that.listen('message', params.onMessage);
	    that.listen('mute', params.onMute);
	    that.listen('topic', params.onTopic);
	    that.listen('presenter', params.onPresenter);
	    delete params.onJoin;
	    delete params.onLeave;
	    delete params.onMessage;
	    delete params.onMute;
	    delete params.onTopic;
	    delete params.onPresenter;

	    params.caller = true;
	    params.conferenceId = params.id;
	    delete params.id;
	    params.remoteEndpoint = that;
	    that.call = respoke.Call(params);

	    // Redirect a bunch of events.
	    [
	        'mute', 'hangup', 'connect', 'stats', 'error', 'local-stream-received',
	         'remote-stream-received', 'requesting-media', 'approve', 'allow'
	    ].forEach(function (eventName) {
	        that.call.listen(eventName, function (evt) {
	            evt.call = that.call; // target will be updated to point to this conference object.
	            that.fire(eventName, evt);
	        });
	    });

	    delete that.instanceId;

	    /**
	     * A name to identify this class
	     * @memberof! respoke.Conference
	     * @name className
	     * @type {string}
	     */
	    that.className = 'respoke.Conference';

	    /**
	     * @memberof! respoke.Conference
	     * @name client
	     * @type {respoke.Client}
	     * @private
	     */
	    var client = respoke.getClient(instanceId);

	    /**
	     * Leave the conference.
	     * @memberof! respoke.Conference
	     * @method respoke.Conference.leave
	     */
	    that.leave = that.call.hangup;

	    /**
	     * Mute local user's audio.
	     * @memberof! respoke.Conference
	     * @method respoke.Conference.muteAudio
	     */
	    that.muteAudio = that.call.muteAudio;

	    /**
	     * ## The plugin `respoke.MediaStats` must be loaded before using this method.
	     *
	     * Start the process of listening for a continuous stream of statistics about the flow of audio and/or video.
	     * Since we have to wait for both the answer and offer to be available before starting
	     * statistics, the library returns a promise for the stats object. The statistics object does not contain the
	     * statistics; rather it contains methods of interacting with the actions of obtaining statistics. To obtain
	     * the actual statistics one time, use stats.getStats(); use the onStats callback to obtain a continuous
	     * stream of statistics every `interval` seconds.  Returns null if stats module is not loaded.
	     *
	     *     conference.getStats({
	     *         onStats: function (evt) {
	     *             console.log('Stats', evt.stats);
	     *         }
	     *     }).done(function () {
	     *         console.log('Stats started');
	     *     }, function (err) {
	     *         console.log('Call is already hung up.');
	     *     });
	     *
	     * @memberof! respoke.Conference
	     * @method respoke.Conference.getStats
	     * @param {object} params
	     * @param {number} [params.interval=5000] - How often in milliseconds to fetch statistics.
	     * @param {respoke.MediaStatsParser.statsHandler} [params.onStats] - An optional callback to receive
	     * the stats. If no callback is provided, the call's report will contain stats but the developer will not
	     * receive them on the client-side.
	     * @param {respoke.Call.statsSuccessHandler} [params.onSuccess] - Success handler for this invocation of
	     * this method only.
	     * @param {respoke.Call.errorHandler} [params.onError] - Error handler for this invocation of this method only.
	     * @returns {Promise<object>|null}
	     */
	    if (respoke.MediaStats) {
	        that.getStats = that.call.getStats;
	    }

	    /**
	     * Get an array containing a Connection object for each participant in the conference.
	     * @memberof! respoke.Conference
	     * @method respoke.Conference.getParticipants
	     * @returns {Promise<Array>}
	     */
	    that.getParticipants = function () {
	        return signalingChannel.getConferenceParticipants({
	            id: that.id
	        });
	    };

	    /**
	     * If the logged-in endpoint has permission through its Respoke role, forcibly remove another participant
	     * from the conference, ending its conference call.
	     * @memberof! respoke.Conference
	     * @method respoke.Conference.removeParticipant
	     * @param {object} params
	     * @param {string} [endpointId] - The endpoint id of the endpoint to be removed
	     * @param {string} [connectionId] - The connection id of the connection to be removed
	     * @returns {Promise}
	     */
	    that.removeParticipant = function (params) {
	        params = params || {};
	        params.conferenceId = that.id;
	        return signalingChannel.removeConferenceParticipant(params);
	    };

	    /**
	     * If the logged-in endpoint has permission through its Respoke role, shut down the conference, removing all
	     * participants.
	     * @memberof! respoke.Conference
	     * @method respoke.Conference.destroy
	     * @returns {Promise}
	     */
	    that.destroy = function (params) {
	        return signalingChannel.destroyConference({
	            conferenceId: that.id
	        });
	    };

	    return that;
	};


/***/ }
/******/ ])
});
;