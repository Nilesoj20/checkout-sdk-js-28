(()=>{"use strict";var e={780:e=>{e.exports=require("iframe-resizer")},252:e=>{e.exports=require("iframe-resizer/js/iframeResizer.contentWindow")}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{r.r(n),r.d(n,{initializeExtensionService:()=>l});const e=require("tslib"),t=function(t){function r(e){var r=t.call(this,e||"Invalid arguments have been provided.")||this;return r.name="InvalidArgumentError",r.type="invalid_argument",r}return(0,e.__extends)(r,t),r}(function(t){function r(e){var r,n,i=this.constructor,o=t.call(this,e||"An unexpected error has occurred.")||this;return o.name="StandardError",o.type="standard",r=o,n=i.prototype,Object.setPrototypeOf?Object.setPrototypeOf(r,n):r.__proto__=n,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(o,i):o.stack=new Error(o.message).stack,o}return(0,e.__extends)(r,t),r}(Error));function i(e){if(!/^(https?:)?\/\//.test(e))throw new t("The provided URL must be absolute.");var r=document.createElement("a");r.href=e;var n=r.port&&-1!==e.indexOf(r.hostname+":"+r.port)?r.port:"";return{hash:r.hash,hostname:r.hostname,href:r.href,origin:r.protocol+"//"+r.hostname+(n?":"+n:""),pathname:r.pathname,port:n,protocol:r.protocol,search:r.search}}const o=function(t,r,n){return r&&n?s(0,r,n):function(t){var r=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return(0,e.__extends)(r,t),r}(t);return Object.getOwnPropertyNames(t.prototype).forEach((function(e){var n=Object.getOwnPropertyDescriptor(t.prototype,e);n&&"constructor"!==e&&Object.defineProperty(r.prototype,e,s(t.prototype,e,n))})),r}(t)};function s(t,r,n){if("function"!=typeof n.value)return n;var i=n.value;return{get:function(){var t=i.bind(this);return Object.defineProperty(this,r,(0,e.__assign)((0,e.__assign)({},n),{value:t})),t},set:function(e){i=e}}}function a(e,t){return e.type===t}const p=function(){function t(e){var t;this._sourceOrigins=[i(e).origin,(t=i(e),i(0===t.hostname.indexOf("www")?t.href:t.href.replace(t.hostname,"www."+t.hostname))).origin],this._isListening=!1,this._listeners={}}return t.prototype.listen=function(){this._isListening||(this._isListening=!0,window.addEventListener("message",this._handleMessage))},t.prototype.stopListen=function(){this._isListening&&(this._isListening=!1,window.removeEventListener("message",this._handleMessage))},t.prototype.addListener=function(e,t){var r=this._listeners[e];r||(this._listeners[e]=r=[]),-1===r.indexOf(t)&&r.push(t)},t.prototype.removeListener=function(e,t){var r=this._listeners[e];if(r){var n=r.indexOf(t);n>=0&&r.splice(n,1)}},t.prototype.trigger=function(e){var t=this._listeners[e.type];t&&t.forEach((function(t){return t(e)}))},t.prototype._handleMessage=function(e){-1!==this._sourceOrigins.indexOf(e.origin)&&a(e.data,e.data.type)&&this.trigger(e.data)},(0,e.__decorate)([o],t.prototype,"_handleMessage",null),t}(),u=require("rxjs"),c=require("rxjs/operators"),d=function(){function e(e,t){this._targetWindow=t,this._targetOrigin="*"===e?"*":i(e).origin}return e.prototype.post=function(e,t){var r=this,n=this._targetWindow;if(window!==n){if(!n)throw new Error("Unable to post message because target window is not set.");var i=t&&(0,u.fromEvent)(window,"message").pipe((0,c.filter)((function(e){return e.origin===r._targetOrigin&&a(e.data,e.data.type)&&-1!==[t.successType,t.errorType].indexOf(e.data.type)})),(0,c.map)((function(e){if(t.errorType===e.data.type)throw e.data;return e.data})),(0,c.take)(1)).toPromise();return n.postMessage(e,this._targetOrigin),i}},e.prototype.setTarget=function(e){this._targetWindow=e},e}();var f,h;!function(e){e.CheckoutLoaded="CHECKOUT_LOADED",e.ShippingCountryChange="SHIPPING_COUNTRY_CHANGE"}(f||(f={})),function(e){e.FRAME_LOADED="FRAME_LOADED",e.RELOAD_CHECKOUT="RELOAD_CHECKOUT",e.SET_IFRAME_STYLE="SET_IFRAME_STYLE",e.SHOW_LOADING_INDICATOR="SHOW_LOADING_INDICATOR"}(h||(h={}));const _=require("lodash"),g=function(){function t(e,t){this._eventListener=e,this._eventPoster=t,this._eventPoster.setTarget(window.parent)}return t.prototype.initialize=function(e){if(!e)throw new Error("Extension Id not found.");this._extensionId=e,this._eventListener.listen()},t.prototype.post=function(t){if(this._extensionId){if(!Object.values(h).includes(t.type))throw new Error(t.type+" is not supported.");var r=(0,e.__assign)((0,e.__assign)({},t.payload),{extensionId:this._extensionId});this._eventPoster.post((0,e.__assign)((0,e.__assign)({},t),{payload:r}))}},t.prototype.addListener=function(e,t){var r=this;if(void 0===t&&(t=_.noop),!Object.values(f).includes(e))throw new Error(e+" is not supported.");return this._eventListener.addListener(e,t),function(){return r._eventListener.removeListener(e,t)}},t}();function l(e){var t=e.extensionId,n=e.parentOrigin;r(252);var i=new g(new p(n),new d(n));return i.initialize(t),i.post({type:h.FRAME_LOADED,payload:{extensionId:t}}),i}})(),module.exports=n})();
//# sourceMappingURL=extension.js.map