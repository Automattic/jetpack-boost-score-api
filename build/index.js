!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.BoostScoreApiLibrary=t():e.BoostScoreApiLibrary=t()}(self,(()=>(()=>{"use strict";var e={477:(e,t,r)=>{r.d(t,{M:()=>c});var n,o=r(736),i=r(752),s=r(283),u=(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function __(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}),c=function(e){function t(t,r,n){var o=e.call(this)||this;return o.httpCode=t,o.body=r,o.parseError=n,o}return u(t,e),Object.defineProperty(t.prototype,"message",{get:function(){switch(this.httpCode){case 403:return this.getRestApiErrorMessage();case 200:if(this.parseError)return(0,o.sprintf)(
/* Translators: %s refers to a browser-supplied error message (hopefully already in the right language) */
(0,o.__)("Received invalid response while communicating with your WordPress site: %s","boost-score-api"),this.parseError.message)}return(0,o.sprintf)(
/* Translators: %d refers to numeric HTTP error code */
(0,o.__)("HTTP %d error received while communicating with the server.","boost-score-api"),this.httpCode)},enumerable:!1,configurable:!0}),t.prototype.getDisplayBody=function(){return(0,s.b)(this.body)?JSON.stringify(this.body,null,"  "):(0,i.x)(this.body,"").substring(0,1e3)},t.prototype.getRestApiErrorMessage=function(){return(0,o.__)("Your site's REST API does not seem to be accessible. Jetpack Boost requires access to your REST API in order to receive site performance scores. Please make sure that your site's REST API is active and accessible, and try again.","boost-score-api")},t}(Error)},655:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(736),o=r(477),i=r(73),s=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function u(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}c((n=n.apply(e,t||[])).next())}))},u=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(u){return function(c){return function(u){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,u[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&u[0]?n.return:u[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,u[1])).done)return o;switch(n=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return s.label++,{value:u[1],done:!1};case 5:s.label++,n=u[1],u=[0];continue;case 7:u=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==u[0]&&2!==u[0])){s=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){s.label=u[1];break}if(6===u[0]&&s.label<o[1]){s.label=o[1],o=u;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(u);break}o[2]&&s.ops.pop(),s.trys.pop();continue}u=t.call(e,s)}catch(e){u=[6,e],n=0}finally{r=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,c])}}};function c(e,t,r,o,c){return void 0===o&&(o=null),s(this,void 0,void 0,(function(){var s,a,l,f,p,d;return u(this,(function(u){switch(u.label){case 0:s={method:e,mode:"cors",headers:{"X-WP-Nonce":c}},"post"!==e&&"delete"!==e||!o||(s.body=JSON.stringify(o),s.headers["Content-Type"]="application/json"),a=function(e,t){return t+i.N+i.L+e}(r,t),u.label=1;case 1:return u.trys.push([1,3,,4]),[4,fetch(a,s)];case 2:return l=u.sent(),[3,4];case 3:throw f=u.sent(),delete(p=s).body,delete p.headers["X-WP-Nonce"],d={requestInitiator:window.location.href,requestUrl:a,requestArgs:p,originalErrorMessage:f.toString()},new Error((0,n.sprintf)(
/* Translators: %s refers to a string representation of an error object containing useful debug information  */
(0,n.__)("An error occurred while trying to communicate with the site REST API. Extra debug info: %s","boost-score-api"),JSON.stringify(d)));case 4:return[2,l]}}))}))}function a(e,t,r,n,i){return void 0===n&&(n=null),s(this,void 0,void 0,(function(){var s,a,l,f;return u(this,(function(u){switch(u.label){case 0:return[4,c(e,t,r,n,i)];case 1:s=u.sent(),u.label=2;case 2:return u.trys.push([2,4,,5]),[4,s.text()];case 3:return a=u.sent(),[3,5];case 4:throw l=u.sent(),new o.M(s.status,null,l);case 5:try{f=JSON.parse(a)}catch(e){throw new o.M(s.status,a,e)}if(!s.ok)throw new o.M(s.status,f,null);return[2,f]}}))}))}const l={get:function(e,t,r){return a("get",e,t,null,r)},post:function(e,t,r,n){return void 0===r&&(r=null),a("post",e,t,r,n)}}},73:(e,t,r)=>{r.d(t,{L:()=>o,N:()=>n});var n="jetpack-boost/v1",o=""},194:(e,t,r)=>{function n(e,t){if(void 0===t&&(t=void 0),"number"==typeof e)return e;if("string"==typeof e){var r=parseFloat(e);if(!isNaN(r))return r}return t}r.d(t,{W:()=>n})},752:(e,t,r)=>{function n(e,t){return void 0===t&&(t=void 0),"string"==typeof e?e:e&&e.toString instanceof Function?e.toString():t}r.d(t,{x:()=>n})},283:(e,t,r)=>{function n(e){return!!e&&e instanceof Object&&!(e instanceof Array)}r.d(t,{b:()=>n})},281:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(736),o=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function u(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}c((n=n.apply(e,t||[])).next())}))},i=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(u){return function(c){return function(u){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,u[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&u[0]?n.return:u[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,u[1])).done)return o;switch(n=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return s.label++,{value:u[1],done:!1};case 5:s.label++,n=u[1],u=[0];continue;case 7:u=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==u[0]&&2!==u[0])){s=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){s.label=u[1];break}if(6===u[0]&&s.label<o[1]){s.label=o[1],o=u;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(u);break}o[2]&&s.ops.pop(),s.trys.pop();continue}u=t.call(e,s)}catch(e){u=[6,e],n=0}finally{r=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,c])}}};function s(e){var t=e.interval,r=e.callback,s=e.timeout,u=e.timeoutError;return o(this,void 0,void 0,(function(){var e,c,a=this;return i(this,(function(l){return[2,new Promise((function(l,f){e=setTimeout((function(){f(new Error(u||(0,n.__)("Timed out","boost-score-api")))}),s||12e4),c=setInterval((function(){return o(a,void 0,void 0,(function(){var e;return i(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,Promise.resolve(r(l))];case 1:return t.sent(),[3,3];case 2:return e=t.sent(),f(e),[3,3];case 3:return[2]}}))}))}),t)})).finally((function(){clearTimeout(e),clearInterval(c)}))]}))}))}},595:(e,t,r)=>{function n(e,t){return e instanceof Error?e:"string"==typeof e||e instanceof String?new Error(e.toString()):e.message?new Error(e.message):t?new Error(t):new Error(JSON.stringify(e))}r.d(t,{V:()=>n})},736:e=>{e.exports=window.wp.i18n}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return(()=>{r.r(n),r.d(n,{didScoresChange:()=>w,getScoreLetter:()=>v,getScoreMovementPercentage:()=>g,requestSpeedScores:()=>d,requestSpeedScoresHistory:()=>h});var e=r(736),t=r(655),o=r(194),i=r(752),s=r(283),u=r(281),c=r(595),a=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function u(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}c((n=n.apply(e,t||[])).next())}))},l=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(u){return function(c){return function(u){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,u[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&u[0]?n.return:u[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,u[1])).done)return o;switch(n=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return s.label++,{value:u[1],done:!1};case 5:s.label++,n=u[1],u=[0];continue;case 7:u=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==u[0]&&2!==u[0])){s=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){s.label=u[1];break}if(6===u[0]&&s.label<o[1]){s.label=o[1],o=u;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(u);break}o[2]&&s.ops.pop(),s.trys.pop();continue}u=t.call(e,s)}catch(e){u=[6,e],n=0}finally{r=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,c])}}},f=12e4,p=5e3;function d(e,r,n,o){return void 0===e&&(e=!1),a(this,void 0,void 0,(function(){var i,s;return l(this,(function(u){switch(u.label){case 0:return s=b,[4,t.Z.post(r,e?"/speed-scores/refresh":"/speed-scores",{url:n},o)];case 1:return(i=s.apply(void 0,[u.sent()])).scores?[2,i.scores]:[4,y(r,n,o)];case 2:return[2,u.sent()]}}))}))}function h(e,r,n){return a(this,void 0,void 0,(function(){var r,o;return l(this,(function(i){switch(i.label){case 0:return r=(new Date).getTime(),o=r-2592e6,[4,t.Z.post(e,"/speed-scores-history",{start:o,end:r},n)];case 1:return[2,i.sent()]}}))}))}function b(t){if(t.error){var r=(0,e.__)("An unknown error occurred while requesting metrics","boost-score-api");throw(0,c.V)(t.error,r)}if((0,s.b)(t.scores))return{status:"success",scores:{current:(0,s.b)(t.scores.current)?{mobile:(0,o.W)(t.scores.current.mobile,0),desktop:(0,o.W)(t.scores.current.desktop,0)}:{mobile:0,desktop:0},noBoost:(0,s.b)(t.scores.noBoost)?{mobile:(0,o.W)(t.scores.noBoost.mobile,0),desktop:(0,o.W)(t.scores.noBoost.desktop,0)}:null,isStale:!!t.scores.isStale}};var n=(0,i.x)(t.status);if(!n)throw new Error((0,e.__)("Invalid response while requesting metrics","boost-score-api"));return{status:n}}function y(r,n,o){return a(this,void 0,void 0,(function(){var i=this;return l(this,(function(s){return[2,(0,u.Z)({timeout:f,interval:p,timeoutError:(0,e.__)("Timed out while waiting for speed-score.","boost-score-api"),callback:function(e){return a(i,void 0,void 0,(function(){var i,s;return l(this,(function(u){switch(u.label){case 0:return s=b,[4,t.Z.post(r,"/speed-scores",{url:n},o)];case 1:return(i=s.apply(void 0,[u.sent()])).scores&&e(i.scores),[2]}}))}))}})]}))}))}function v(e,t){var r=(e+t)/2;return r>90?"A":r>75?"B":r>50?"C":r>35?"D":r>25?"E":"F"}function w(e){var t=e.current,r=e.noBoost;return null!=t&&null!=r&&(t.mobile!==r.mobile||t.desktop!==r.desktop)}function g(e){var t=e.current,r=e.noBoost;if(null!==t&&null!==r){var n=(e.current.mobile+e.current.desktop)/(e.noBoost.mobile+e.noBoost.desktop)-1;return Math.round(100*n)}return 0}})(),n})()));