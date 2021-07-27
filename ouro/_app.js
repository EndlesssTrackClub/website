"use strict";

// ourospect | harry denholm | ishani.org 2021
// an experiment for dynamic riff playback from endlesss, with wgl visualisation
//
// CC BY-NC-SA https://creativecommons.org/licenses/by-nc-sa/4.0/

var ouro = {}
    ouro.onMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    ouro.pageActivationFlag = 1;

const rootObj = document.querySelector("foreignObject");


// ===========================================================================================================

/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=rootObj,oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");

// ===========================================================================================================


// blessings to Spencer Evans for untangling the iOS mute hell
// https://github.com/swevans/unmute
function audioctx_unmute(context) {
    var pageVisibilityAPI;
    if (document.hidden !== undefined)
        pageVisibilityAPI = { hidden: "hidden", visibilitychange: "visibilitychange" };
    else if (document.webkitHidden !== undefined)
        pageVisibilityAPI = { hidden: "webkitHidden", visibilitychange: "webkitvisibilitychange" };
    else if (document.mozHidden !== undefined)
        pageVisibilityAPI = { hidden: "mozHidden", visibilitychange: "mozvisibilitychange" };
    else if (document.msHidden !== undefined)
        pageVisibilityAPI = { hidden: "msHidden", visibilitychange: "msvisibilitychange" };
    // Determine if ios
    var ua = navigator.userAgent.toLowerCase();
    var isIOS = ((ua.indexOf("iphone") >= 0 && ua.indexOf("like iphone") < 0) ||
                 (ua.indexOf("ipad") >= 0 && ua.indexOf("like ipad") < 0) ||
                 (ua.indexOf("ipod") >= 0 && ua.indexOf("like ipod") < 0) ||
                 (ua.indexOf("mac os x") >= 0 && navigator.maxTouchPoints > 0) // New iPads show up as macs in user agent, but they have a touch screen
    );
    // Track page state
    var isPageActive = true;
    var isPageVisible = true;
    var iosIsPageFocused = true; // iOS has a buggy page visibility API, luckily it dispatches blur and focus events on the window when vis change events should fire.
    // Track desired audio state
    var suspendAudio = false;
    var audioUnlockingEvents = ["click", "contextmenu", "auxclick", "dblclick", "mousedown", "mouseup", "touchend", "keydown", "keyup"];
    // Track web audio state
    var contextUnlockingEnabled = false;
    // Track html audio state
    var tag;
    var tagUnlockingEnabled = false;
    var tagPendingChange = false;
    function contextStateCheck(tryResuming) {
        if (context.state == "running") {
            // No need to watch for unlocking events while running
            toggleContextUnlocking(false);
            // Check if our state matches
            if (suspendAudio) {
                // We want to be suspended, we can suspend at any time
                context.suspend().then(context_promiseHandler, context_promiseHandler);
            }
        }
        else if (context.state != "closed") {
            // Interrupted or suspended, check if our state matches
            if (!suspendAudio) {
                // We want to be running
                toggleContextUnlocking(true);
                if (tryResuming)
                    context.resume().then(context_promiseHandler, context_promiseHandler);
            }
            else {
                // We don't want to be running, so no need to watch for unlocking events
                toggleContextUnlocking(false);
            }
        }
    }
    function toggleContextUnlocking(enable) {
        if (contextUnlockingEnabled === enable)
            return;
        contextUnlockingEnabled = enable;
        for (var _i = 0, audioUnlockingEvents_1 = audioUnlockingEvents; _i < audioUnlockingEvents_1.length; _i++) {
            var evt = audioUnlockingEvents_1[_i];
            if (enable)
                window.addEventListener(evt, context_unlockingEvent, { capture: true, passive: true });
            else
                window.removeEventListener(evt, context_unlockingEvent, { capture: true, passive: true });
        }
    }
    function context_statechange() {
        contextStateCheck(true);
    }
    function context_promiseHandler() {
        contextStateCheck(false);
    }
    function context_unlockingEvent() {
        contextStateCheck(true);
    }
    function tagStateCheck(tryChange) {
        // We have a pending state change, let that resolve first
        if (tagPendingChange)
            return;
        if (!tag.paused) {
            // No need to watch for unlocking events while running
            toggleTagUnlocking(false);
            // Check if our state matches
            if (suspendAudio) {
                // We want to be suspended, we can suspend at any time
                tag.pause(); // instant action, so no need to set as pending
            }
        }
        else {
            // Tag isn't playing, check if our state matches
            if (!suspendAudio) {
                // We want to be running
                if (tryChange) {
                    // Try forcing a change, so stop watching for unlocking events while attempt is in progress
                    toggleTagUnlocking(false);
                    // Attempt to play
                    tagPendingChange = true;
                    var p = void 0;
                    try {
                        p = tag.play();
                        if (p)
                            p.then(tag_promiseHandler, tag_promiseHandler);
                        else {
                            tag.addEventListener("playing", tag_promiseHandler);
                            tag.addEventListener("abort", tag_promiseHandler);
                            tag.addEventListener("error", tag_promiseHandler);
                        }
                    }
                    catch (err) {
                        tag_promiseHandler();
                    }
                }
                else {
                    // We're not going to try resuming this time, but make sure unlocking events are enabled
                    toggleTagUnlocking(true);
                }
            }
            else {
                // We don't want to be running, so no need to watch for unlocking events
                toggleTagUnlocking(false);
            }
        }
    }
    function toggleTagUnlocking(enable) {
        if (tagUnlockingEnabled === enable)
            return;
        tagUnlockingEnabled = enable;
        for (var _i = 0, audioUnlockingEvents_2 = audioUnlockingEvents; _i < audioUnlockingEvents_2.length; _i++) {
            var evt = audioUnlockingEvents_2[_i];
            if (enable)
                window.addEventListener(evt, tag_unlockingEvent, { capture: true, passive: true });
            else
                window.removeEventListener(evt, tag_unlockingEvent, { capture: true, passive: true });
        }
    }
    function tag_promiseHandler() {
        tag.removeEventListener("playing", tag_promiseHandler);
        tag.removeEventListener("abort", tag_promiseHandler);
        tag.removeEventListener("error", tag_promiseHandler);
        // Tag started playing, so we're not suspended
        tagPendingChange = false;
        tagStateCheck(false);
    }
    function tag_unlockingEvent() {
        tagStateCheck(true);
    }
    /**
     * Called when the page becomes active.
     */
    function pageActivated() {
        suspendAudio = false;
        if (tag)
            tagStateCheck(true); // tag first to ensure media channel start first
        contextStateCheck(true);
        console.log("#pageActivated");

        ouro.pageActivationFlag = 1;
    }
    /**
     * Called when the page becomes inactive.
     */
    function pageDeactivated() {
        suspendAudio = true;
        contextStateCheck(true); // context first to be sure it stops before the tag
        if (tag)
            tagStateCheck(true);
        console.log("#pageDeactivated");
    }
    /**
     * Updates page active state.
     */
    function pageStateCheck() {
        if (isPageVisible && iosIsPageFocused) {
            if (!isPageActive) {
                isPageActive = true;
                pageActivated();
            }
        }
        else {
            if (isPageActive) {
                isPageActive = false;
                pageDeactivated();
            }
        }
    }
    /**
     * Handle visibility api events.
     */
    function doc_visChange() {
        if (pageVisibilityAPI) {
            if (document[pageVisibilityAPI.hidden] == isPageActive) {
                isPageVisible = !document[pageVisibilityAPI.hidden];
                pageStateCheck();
            }
        }
    }
    /**
     * Handles blur events (ios only).
     */
    function win_focusChange(evt) {
        if (evt && evt.target !== window)
            return;
        if (document.hasFocus()) {
            if (iosIsPageFocused)
                return;
            iosIsPageFocused = true;
            pageStateCheck();
        }
        else {
            if (!iosIsPageFocused)
                return;
            iosIsPageFocused = false;
            pageStateCheck();
        }
    }
    /**
     * A utility function for decompressing the base64 silence string.
     * @param c The number of times the string is repeated in the string segment.
     * @param a The string to repeat.
     */
    function poorManHuffman(c, a) { var e; for (e = a; c > 1; c--)
        e += a; return e; }
    // Watch for tag state changes and check initial state
    if (isIOS) {
        // Is ios, we need to play an html track in the background and disable the widget
        // NOTE: media widget / airplay MUST be disabled with this super gross hack to create the audio tag, setting the attribute in js doesn't work
        //var tmp = document.createElement("div");
        //tmp.innerHTML = "<audio x-webkit-airplay='deny'></audio>";
        tag = rootObj.querySelector("#audio_unmute");
        tag.controls = false;
        tag.disableRemotePlayback = true; // Airplay like controls on other devices, prevents casting of the tag
        tag.preload = "auto";
        // Set the src to a short bit of url encoded as a silent mp3
        // NOTE The silence MP3 must be high quality, when web audio sounds are played in parallel the web audio sound is mixed to match the bitrate of the html sound
        // 0.01 seconds of silence VBR220-260 Joint Stereo 859B
        //tag.src = "data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//////////////////////////////////////////////////////////////////8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADgnABGiAAQBCqgCRMAAgEAH///////////////7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq//////////////////9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";
        // The str below is a "compressed" version using poor mans huffman encoding, saves about 0.5kb
        tag.src = "data:audio/mpeg;base64,//uQx" + poorManHuffman(23, "A") + "WGluZwAAAA8AAAACAAACcQCA" + poorManHuffman(16, "gICA") + poorManHuffman(66, "/") + "8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkI" + poorManHuffman(320, "A") + "//sQxAADgnABGiAAQBCqgCRMAAgEAH" + poorManHuffman(15, "/") + "7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq" + poorManHuffman(18, "/") + "9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAw" + poorManHuffman(97, "V") + "Q==";
        tag.loop = true;
        tag.load();
        // Try to play right off the bat
        tagStateCheck(true);
    }
    // Watch for context state changes and check initial state
    context.onstatechange = context_statechange; // NOTE: the onstatechange callback property is more widely supported than the statechange event   context.addEventListener("statechange", context_statechange);
    contextStateCheck(false);
    // Watch for page state changes and check initial page state
    if (pageVisibilityAPI)
        document.addEventListener(pageVisibilityAPI.visibilitychange, doc_visChange, true);
    if (isIOS) {
        // Watch for blur / focus events on ios because it doesn't dispatch vis change events properly
        window.addEventListener("focus", win_focusChange, true);
        window.addEventListener("blur", win_focusChange, true);
    }
    doc_visChange();
    if (isIOS)
        win_focusChange();
}

// RequestAnimationFrame
window.requestAnimFrame = ( function () { return window.requestAnimationFrame    || window.webkitRequestAnimationFrame ||
                                                 window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
                                                 window.msRequestAnimationFrame  || function( cb ) { window.setTimeout(cb,1000/60); };
                                        } )();

// performance.now
window.getRealTime = ( function() { if ("performance" in window ) return function() { return window.performance.now(); }
                                                                  return function() { return (new Date()).getTime(); }
                                  } )();

const saturate = (number) =>
{
    return Math.max(0, Math.min(number, 1));
}

// --------------------------------------------------------------------------------------
// ourospect configuration block

const c_stemBlockCount      = 8;
const c_stemVariantCount    = 3;
const c_stemTotalToLoad     = ( c_stemBlockCount * c_stemVariantCount );

// which stems to load, and from where
const c_stemLoadPrefix      = "beam-1/";



// c_stemLockLoopSync
//
// == ENABLE FOR CERTAIN TYPES OF STEM DATA ==
// this sets all loaded stem's loop points to be that of the shortest duration from
// all those loaded, ensuring in theory that they will stay in perfect sync while looping
//
// a clean export from endlesss will not need this, it should loop cleanly;
// this tends to only be required if you manually bounce and slice data 
// NB although you might plug in identical sample-length OGGs, they seem to come in with
//    very slightly different lengths. not normally a problem I'm sure, unless you're 
//    trying to exactly sync and loop a bunch of them together
//
// NB2 this may be solved by having to move to mp3 anyway, their buffer/duration sizes look correct
//
const c_stemLockLoopSync    = false;


// set above/below 0/1 as we use an exponential attack interpolation that would otherwise take a long time to 
// perfectly reach the 0/1 values (they are clamped anyway)
const c_gainOn = 1.05;
const c_gainOff = -0.05;

var c_gainSlowOut = new Float32Array(4);
c_gainSlowOut[0] = 1.0;
c_gainSlowOut[1] = 0.25;
c_gainSlowOut[2] = 0.1;
c_gainSlowOut[3] = 0;

var c_gainSlowIn = new Float32Array(4);
c_gainSlowIn[0] = 0.0;
c_gainSlowIn[1] = 0.1;
c_gainSlowIn[2] = 0.3;
c_gainSlowIn[3] = 1.0;



// --------------------------------------------------------------------------------------

function createGLContext( canvasObject )
{
    var opts = { alpha: false,
                 depth: false,
                 stencil: false,
                 powerPreference: "high-performance" };

    var gl = null;
    if( gl === null) gl = canvasObject.getContext( "webgl2", opts );
    if( gl === null) gl = canvasObject.getContext( "experimental-webgl2", opts );
    if( gl === null) gl = canvasObject.getContext( "webgl", opts );
    if( gl === null) gl = canvasObject.getContext( "experimental-webgl", opts );

    ouro.gl             = gl;
    ouro.glHas20        = !(gl instanceof WebGLRenderingContext);     // using webgl 2?
    ouro.glHasFloatTex  = ouro.glHas20 || 
                          ouro.gl.getExtension( 'OES_texture_float' );

    console.log( " GL CONTEXT CAPS : ");
    console.log( " is Gl2   = " + ouro.glHas20 );
    console.log( " has rgbf = " + ouro.glHasFloatTex );

    ouro.glSrcVersion   =  ouro.glHas20 ? "#version 300 es\nprecision highp float;\n" : "precision highp float;\n";
}

const createBeatSyncTexture = () =>
{
    var tex = ouro.gl.createTexture();
    ouro.gl.bindTexture(ouro.gl.TEXTURE_2D, tex);

    // assume the worst
    ouro.glBeatSyncInternalFormat  = ouro.gl.RGBA;
    ouro.glBeatSyncStorageType     = ouro.gl.UNSIGNED_BYTE;
    ouro.glBeatSyncData            = new Uint8Array(c_stemBlockCount * 4);

    if ( ouro.glHasFloatTex )
    {
        ouro.glBeatSyncStorageType    = ouro.gl.FLOAT;
        ouro.glBeatSyncData           = new Float32Array(c_stemBlockCount * 4);

        if ( ouro.glHas20 )
        {
            ouro.glBeatSyncInternalFormat = ouro.gl.RGBA32F;
        }
    }
    ouro.glBeatSyncData.fill(0);

    ouro.gl.texParameteri( ouro.gl.TEXTURE_2D, ouro.gl.TEXTURE_WRAP_S, ouro.gl.CLAMP_TO_EDGE);
    ouro.gl.texParameteri( ouro.gl.TEXTURE_2D, ouro.gl.TEXTURE_WRAP_T, ouro.gl.CLAMP_TO_EDGE);
    ouro.gl.texParameteri( ouro.gl.TEXTURE_2D, ouro.gl.TEXTURE_MIN_FILTER, ouro.gl.NEAREST);
    ouro.gl.texParameteri( ouro.gl.TEXTURE_2D, ouro.gl.TEXTURE_MAG_FILTER, ouro.gl.NEAREST);

    ouro.glBeatSyncTex = tex;
};

const updateBeatSyncTexture = () =>
{
    ouro.gl.bindTexture(ouro.gl.TEXTURE_2D, ouro.glBeatSyncTex);
    ouro.gl.texImage2D(
        ouro.gl.TEXTURE_2D,
        0,
        ouro.glBeatSyncInternalFormat,
        c_stemBlockCount,
        1,
        0,
        ouro.gl.RGBA,
        ouro.glBeatSyncStorageType,
        ouro.glBeatSyncData);
}


const canvas          = rootObj.querySelector("#viewport_shader");
createGLContext(canvas);
createBeatSyncTexture();
updateBeatSyncTexture();


const loadTextureFromImage = (url) =>
{
   // use cyan as the default color.
   var initialColor = new Uint8Array([0,255,255,255]);

   // make a texture with 1x1 pixels so we can use the texture immediately
   // while we wait for the image to load
   var tex = ouro.gl.createTexture();
   ouro.gl.bindTexture(ouro.gl.TEXTURE_2D, tex);
   ouro.gl.texImage2D(ouro.gl.TEXTURE_2D, 0, ouro.gl.RGBA, 1, 1, 0, 
                 ouro.gl.RGBA, ouro.gl.UNSIGNED_BYTE, initialColor); 

   var img = new Image();
   img.src = url;
   img.onload = function() {
      ouro.gl.bindTexture(ouro.gl.TEXTURE_2D, tex);
      ouro.gl.texImage2D(ouro.gl.TEXTURE_2D, 0, ouro.gl.RGBA, ouro.gl.RGBA, ouro.gl.UNSIGNED_BYTE, img);
      ouro.gl.texParameteri(ouro.gl.TEXTURE_2D, ouro.gl.TEXTURE_WRAP_S, ouro.gl.REPEAT);
      ouro.gl.texParameteri(ouro.gl.TEXTURE_2D, ouro.gl.TEXTURE_WRAP_T, ouro.gl.REPEAT);
      ouro.gl.texParameteri(ouro.gl.TEXTURE_2D, ouro.gl.TEXTURE_MIN_FILTER, ouro.gl.LINEAR_MIPMAP_LINEAR);
      ouro.gl.texParameteri(ouro.gl.TEXTURE_2D, ouro.gl.TEXTURE_MAG_FILTER, ouro.gl.LINEAR);
      ouro.gl.generateMipmap(ouro.gl.TEXTURE_2D);
      console.log("texture bound");
   };

   return tex;
};



// --------------------------------------------------------------------------------------



var loadingProgress      = 0;
var loadingProgressDelta = 1.0 / ( c_stemTotalToLoad + 1 );    // +1 as we treat post-processing as a final step
var loadingReveal        = 0;

var stemBuffers = []
var stemNodes = []
var stemDuration = []
var stemDurationLoopSet = 10;

var gainNodes           = [];   // gain nodes in audio graph
var gainVisualValues    = [];   // split of 'visual' gains, where initially we want to show the promise
var gainVisualTargets   = [];   //      of what's going to be playing but would like the actual audio to 
                                //      only actually fade-up when the audio is unlocked on a tap


const audioCtx          = new(window.AudioContext || window.webkitAudioContext)();
var   audioCtxLaunch    = "waiting";

function initWebAudio()
{
    audioctx_unmute( audioCtx );

    audioCtxLaunch = "waiting"

    console.log(`audioContext :`);
    console.log(` -> initial state : [${audioCtx.state}] [${audioCtxLaunch}]`);
    console.log(` ->   sample rate : ${audioCtx.sampleRate}`);
}

initWebAudio();

// small analyser instance to extract some beat info; this is the last node in the
// graph before connecting to the output
const audioAnalysis = audioCtx.createAnalyser();
audioAnalysis.fftSize = 32;

var biquadFilter = audioCtx.createBiquadFilter();
biquadFilter.connect(audioCtx.destination);



// preallocate an FFT output buffer, analyser writes into it per frame
var fftOutputSize = audioAnalysis.frequencyBinCount;
var fftDataArray = new Uint8Array(fftOutputSize);



// async fn to fetch and install stem audio from a URL
const loadStem = async ( url, stemI ) => {

    console.log(` -> fetching stem {${stemI}} @ [${url}]`);

    let params = {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        headers: {
            "Content-Type": "audio/mpeg",
            "Accept": "audio/mpeg"
        }
    }

    return fetch(url, params)
            .then(response => response.arrayBuffer())
            // promisify decodeAudioData()-in-callback mode, as Safari can't cope with the promise-version of it :|
            .then(arrayBuffer => new Promise((resolve, reject) => 
            {
                audioCtx.decodeAudioData(
                    arrayBuffer,
                    audioBuffer => { resolve( audioBuffer ) }, 
                    error => { reject(error) }
                    );
            }))
            .then( audioBuffer => 
            {
                // log duration per stem, as we may need to clip to the smallest for perfect looping
                console.log(` <- loaded {${stemI}} [buf:${audioBuffer.length}] [dur:${audioBuffer.duration}]`);
                stemDuration[stemI] = audioBuffer.duration;
                stemBuffers[stemI]  = audioBuffer;

                loadingProgress += loadingProgressDelta;
            });
};

const installGainNode = ( destIdx ) => 
{
    // gain node for fading per stem, plugs into the analyser
    var gainNode = audioCtx.createGain();
    gainNode.connect(biquadFilter);

    if ( destIdx == 2 || destIdx == 7 )
        gainNode.connect(audioAnalysis);

    gainNodes[destIdx] = gainNode;
    gainVisualValues[destIdx]  = 0.0;
    gainVisualTargets[destIdx] = c_gainOn;
    gainNode.gain.value = 0.0;
}

const uninstallStem = ( destIdx ) => 
{
    if ( stemNodes[destIdx] != null )
    {
        stemNodes[destIdx].stop();
        stemNodes[destIdx].disconnect();
        try { stemNodes[destIdx].buffer = null; } catch(e) {}
        stemNodes[destIdx] = null;
    }
}

const installStem = ( srcIdx, destIdx, syncTime ) => 
{
    uninstallStem( destIdx );

    // plug the output into the gain node
    const source = audioCtx.createBufferSource();
    source.buffer = stemBuffers[srcIdx];
    source.loop = true;
    source.connect( gainNodes[destIdx] );

    stemNodes[destIdx] = source;
    stemNodes[destIdx].start( syncTime );
}

// load the stems, do post-processing ready to play
const loadRiff = async () => {

    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(24000, audioCtx.currentTime);

    // async fetch all the audio
    var stemTasks = [];
    for (let iB = 0; iB < c_stemBlockCount; iB++) {

        installGainNode( iB );

        for (let iV = 0; iV < c_stemVariantCount; iV++) {

            let stemUrl = c_stemLoadPrefix + `block${iB+1}-${iV+1}.mp3`;
            let stemIdx = 0 + ( ( iB * c_stemVariantCount ) + iV );

            stemTasks.push( loadStem(stemUrl, stemIdx) );
        }
    }
    await Promise.all(stemTasks);

    // check comments on c_stemLockLoopSync above for what this is doing
    if ( c_stemLockLoopSync )
    {
        stemDurationLoopSet = Math.min(...stemDuration)
        console.log("Shortest Stem: " + stemDurationLoopSet)

        for (let i = 0; i < stemNodes.length; i++) {
            stemNodes[i].loopEnd = stemDurationLoopSet;
        }
    }

    // and we're done, lets go!
    loadingProgress = 1.0;
}


function resize() {
    let minimalDim = Math.min(window.innerWidth, window.innerHeight);
    canvas.width     = minimalDim;
    canvas.height    = minimalDim;
}
resize();

var delayRebuildOnResize;
window.addEventListener('resize', function(event) {
    clearTimeout(delayRebuildOnResize);
    delayRebuildOnResize= setTimeout(() => 
        {
            resize();

            ouro.gl.viewport(0, 0, ouro.gl.drawingBufferWidth, ouro.gl.drawingBufferHeight);
            ouro.gl.clearColor(0, 0, 0, 1);
            ouro.gl.clear(ouro.gl.COLOR_BUFFER_BIT);

        }, 200);
}, true);

var program;

function compileShader( vsh, fsh )
{
    let shVertex = vsh;
    let shFragment = fsh;

    console.log( `compileShader() [${fsh.length}]` );

    let vs = ouro.gl.createShader(ouro.gl.VERTEX_SHADER);
    ouro.gl.shaderSource(vs, shVertex);
    ouro.gl.compileShader(vs);

    let fs = ouro.gl.createShader(ouro.gl.FRAGMENT_SHADER);
    ouro.gl.shaderSource(fs, shFragment);
    ouro.gl.compileShader(fs);

    let shaderProgram = ouro.gl.createProgram();
    ouro.gl.attachShader(shaderProgram, vs);
    ouro.gl.attachShader(shaderProgram, fs);
    ouro.gl.linkProgram(shaderProgram);

    if ( !ouro.gl.getProgramParameter(shaderProgram, ouro.gl.LINK_STATUS) )
    {
        console.error('Link failed : ' + ouro.gl.getProgramInfoLog(shaderProgram));
        console.error('     vs log : ' + ouro.gl.getShaderInfoLog(vs));
        console.error('     fs log : ' + ouro.gl.getShaderInfoLog(fs));
        return null;
    }

    return shaderProgram;
}

async function configureShaderRendering()
{
    let vsQuadSrc;
    if( ouro.glHas20 )
        vsQuadSrc = "layout(location = 0) in vec2 aVertexPosition; void main() { gl_Position = vec4(aVertexPosition.xy,0.0,1.0); }";
    else
        vsQuadSrc = "attribute vec2 aVertexPosition; void main() { gl_Position = vec4(aVertexPosition.xy,0.0,1.0); }";

    const fsShimHeader = `
uniform sampler2D iChannel0;
uniform vec2  iResolution;
uniform float iTime;
uniform float iLoopTime;

uniform vec3  iTouch;
uniform vec2  iTouchSum;
uniform vec4  iState;
uniform vec4  iBeat;
uniform vec4  iBeatSmooth;
uniform vec4  iBeatFlow;
uniform float iVariance;
`;

    const fsShimFooter = `

// =================================================================================================================

void main()
{
    vec2 uv = gl_FragCoord.xy/iResolution.xy;

    vec4 v_state = iState;
    vec4 v_beat = iBeat;
    vec4 v_beatSmooth = iBeatSmooth;
    vec4 v_beatFlow = iBeatFlow;
    float v_loopTime = 0.0;
    vec3 v_touchAbs = iTouch;
    vec2 v_touchSum = iTouchSum;
    float v_variance = iVariance;

    vec3 result = ourospectEntrypoint( 
        v_state,
        v_beat,
        v_beatSmooth,
        v_beatFlow,
        v_loopTime,
        gl_FragCoord.xy,
        uv,
        v_touchAbs,
        v_touchSum,
        v_variance);

    finalOutputColour = vec4( result, 1.0 );
}
`;
    let fsTextureAdaptor = ouro.glHas20 ? 
        "" :
        "vec4 texture( sampler2D s, vec2 c) { return texture2D(s,c); }\n";

    let fsOutputAdaptor = ouro.glHas20 ?
        "\nout vec4 finalOutputColour;\n" :
        "\n#define finalOutputColour gl_FragColor\n";

    if ( ouro.gl == null ) {
        console.log("WebGL INIT FAILED");
        return;
    }

    const fsCommon  = await fetch( "_shader.common.glsl", { cache: "no-store" } );
    const fsMain    = await fetch( "_shader.main.glsl", { cache: "no-store" } );

    var fsCommonSrc = await fsCommon.text();
    var fsMainSrc   = await fsMain.text();

    program = compileShader( 
        ouro.glSrcVersion + 
            vsQuadSrc,
        ouro.glSrcVersion +
            fsCommonSrc + 
            fsShimHeader + 
            fsTextureAdaptor + 
            fsMainSrc + 
            fsOutputAdaptor +
            fsShimFooter );

    var aspect = canvas.clientWidth / canvas.clientHeight;
    var vertices = new Float32Array([
        -1, 1 * aspect, 1, 1 * aspect, 1, -1 * aspect,
        -1, 1 * aspect, 1, -1 * aspect, -1, -1 * aspect
    ]);

    let vbuffer = ouro.gl.createBuffer();
    ouro.gl.bindBuffer(ouro.gl.ARRAY_BUFFER, vbuffer);
    ouro.gl.bufferData(ouro.gl.ARRAY_BUFFER, vertices, ouro.gl.STATIC_DRAW);


    program.aVertexPosition = ouro.gl.getAttribLocation(program, "aVertexPosition");
    ouro.gl.enableVertexAttribArray(program.aVertexPosition);
    ouro.gl.vertexAttribPointer(program.aVertexPosition, 2, ouro.gl.FLOAT, false, 0, 0);

    ouro.gl.viewport(0, 0, ouro.gl.drawingBufferWidth, ouro.gl.drawingBufferHeight);
    ouro.gl.clearColor(0, 0, 0, 1);
    ouro.gl.clear(ouro.gl.COLOR_BUFFER_BIT);

    ouro.gl.useProgram(program);


    ouro.gl.bindBuffer(ouro.gl.ARRAY_BUFFER, vbuffer);

    program.aVertexPosition = ouro.gl.getAttribLocation(program, "aVertexPosition");
    ouro.gl.enableVertexAttribArray(program.aVertexPosition);
    ouro.gl.vertexAttribPointer(program.aVertexPosition, 2, ouro.gl.FLOAT, false, 0, 0);


    ouro.gl.uniform1i( ouro.gl.getUniformLocation(program, "iChannel0"), ouro.gl.eatSyncTex );

    program.res      = ouro.gl.getUniformLocation(program, "iResolution");
    program.touch    = ouro.gl.getUniformLocation(program, "iTouch");
    program.touchsum = ouro.gl.getUniformLocation(program, "iTouchSum");
    program.time     = ouro.gl.getUniformLocation(program, "iTime");
    program.looptime = ouro.gl.getUniformLocation(program, "iLoopTime");
    program.state    = ouro.gl.getUniformLocation(program, "iState");
    program.beat     = ouro.gl.getUniformLocation(program, "iBeat");
    program.beatsm   = ouro.gl.getUniformLocation(program, "iBeatSmooth");
    program.beatflow = ouro.gl.getUniformLocation(program, "iBeatFlow");
    program.variance = ouro.gl.getUniformLocation(program, "iVariance");

    console.log("AS: " + aspect);
    console.log("IW: " + window.innerWidth + " : " + window.innerHeight);
    console.log("canvasObject: " + canvas.width + " : " + canvas.height);
    console.log("CL: " + canvas.clientWidth + " : " + canvas.clientHeight);
}

window.onload = async (event) => {

    // bring up the shader
    await configureShaderRendering();
    render();

    // schedule audio load
    loadRiff();
};

const eUpdateMode = {
  DataStreamIn:         'DataStreamIn',
  AwaitingInitialClick: 'AwaitingInitialClick',
  InitialFadeUp:        'InitialFadeUp',
  Idle:                 'Idle',
  FadeOutForMutation:   'FadeOutForMutation',
  Mutating:             'Mutating',
  FadeIn:               'FadeIn',
  FadeOutToPause:       'FadeOutToPause',
  FadeInFromPause:      'FadeInFromPause', 
  HasPaused:            'HasPaused',
}

var lastTimestamp       = performance.now();
var updateMode          = eUpdateMode.DataStreamIn;

var mutationValue       = 0;
var clickPulse          = 0;

var glArgAudioLive      = 0;
var glArgBeat0          = 0;
var glArgBeat1          = 0;
var glArgBeat2          = 0;
var glArgBeat3          = 0;
var glArgBeatSmooth0    = 0;
var glArgBeatSmooth1    = 0;
var glArgBeatSmooth2    = 0;
var glArgBeatSmooth3    = 0;
var beatIncX            = 0;
var beatIncY            = 0;
var beatIncZ            = 0;
var beatIncW            = 0;

var glArgTouchX         = 0.5;
var glArgTouchY         = 0.5;
var glArgIsTouching     = 0.0;
var glArgTouchSumTgtX   = 0.0;
var glArgTouchSumTgtY   = 0.0;
var glArgTouchSumX      = 0.0;
var glArgTouchSumY      = 0.0;

const enqueueGainRampUp = ( timeSec ) => 
{
    for (let iB = 0; iB < c_stemBlockCount; iB++) 
    {
        if ( stemNodes[iB] != null )
             gainNodes[iB].gain.setValueCurveAtTime( c_gainSlowIn, audioCtx.currentTime, timeSec + ( iB * 0.5 ) );
    }
    biquadFilter.frequency.exponentialRampToValueAtTime( 24000, audioCtx.currentTime + (timeSec * 2.0) );
}

function update() {

    // deal with page reset
    if ( ouro.pageActivationFlag === 1 )
    {
        ouro.pageActivationFlag = 0;
        lastTimestamp           = performance.now();
    }

    let currentAudioTime = audioCtx.currentTime;

    let newTimestamp = performance.now();
    let timeDelta = ( newTimestamp - lastTimestamp ) * 0.001;
    lastTimestamp = newTimestamp;

    if ( updateMode == eUpdateMode.DataStreamIn && loadingProgress > 0.99 ) 
    {
        loadingReveal += (1.05 - loadingReveal) * 3.0 * timeDelta;
        loadingReveal  = saturate(loadingReveal);

        if ( loadingReveal >= 1.0 ) {
            updateMode = eUpdateMode.AwaitingInitialClick;
        }
    }

    audioAnalysis.getByteFrequencyData(fftDataArray);
    glArgBeat0 = fftDataArray[14] / 255.0;
    glArgBeat1 = fftDataArray[13] / 255.0;
    glArgBeat2 = fftDataArray[12] / 255.0;
    glArgBeat3 = fftDataArray[9] / 255.0;

    let beatSmoothingRate = 6.0;
    glArgBeatSmooth0 += ( glArgBeat0 - glArgBeatSmooth0 ) * beatSmoothingRate * timeDelta;
    glArgBeatSmooth1 += ( glArgBeat1 - glArgBeatSmooth1 ) * beatSmoothingRate * timeDelta;
    glArgBeatSmooth2 += ( glArgBeat2 - glArgBeatSmooth2 ) * beatSmoothingRate * timeDelta;
    glArgBeatSmooth3 += ( glArgBeat3 - glArgBeatSmooth3 ) * beatSmoothingRate * timeDelta;

    beatIncX += glArgBeat0;
    beatIncY += glArgBeat1;
    beatIncZ += glArgBeat2;
    beatIncW += glArgBeat3;

    let touchSmoothingRate = 3.0;
    glArgTouchSumX += ( glArgTouchSumTgtX - glArgTouchSumX ) * touchSmoothingRate * timeDelta;
    glArgTouchSumY += ( glArgTouchSumTgtY - glArgTouchSumY) * touchSmoothingRate * timeDelta;



    let stateAudioIsLive = (audioCtxLaunch === "running") ? 1.0 : 0.0;
    glArgAudioLive += ( stateAudioIsLive - glArgAudioLive ) * timeDelta;


    let overlayPulseTarget   = -0.05;

    // once reveal is done, begin updating gains from targets
    if ( updateMode != eUpdateMode.DataStreamIn )
    {
        let allAudioGainSilent = true;
        let allAudioGainFull   = true;

        for (let iB = 0; iB < c_stemBlockCount; iB++) 
        {
            gainVisualValues[iB] += ( gainVisualTargets[iB] - gainVisualValues[iB] ) * 1.0 * timeDelta;
            gainVisualValues[iB]  = saturate( gainVisualValues[iB] );
            
            let currentAudioGain = gainNodes[iB].gain.value;

            allAudioGainSilent &= ( currentAudioGain <= 0.0 );
            if ( stemNodes[iB] != null )
                allAudioGainFull   &= ( currentAudioGain >= 1.0 );

            let pixelIndex = iB * 4;
            if ( ouro.glHasFloatTex )
            {
                ouro.glBeatSyncData[pixelIndex + 0] = gainVisualValues[iB];
                ouro.glBeatSyncData[pixelIndex + 1] = currentAudioGain;
            }
            else
            {
                ouro.glBeatSyncData[pixelIndex + 0] = gainVisualValues[iB] * 255.0;
                ouro.glBeatSyncData[pixelIndex + 1] = currentAudioGain * 255.0;
            }
        }

        let prevUpdateMode = updateMode;

        switch ( updateMode )
        {
            case eUpdateMode.InitialFadeUp:
            {
                if ( allAudioGainFull )
                    updateMode = eUpdateMode.Idle;
            }
            break;

            case eUpdateMode.Idle:
            {
            }
            break;

            case eUpdateMode.FadeOutToPause:
            {
                if ( allAudioGainSilent )
                {
                    updateMode = eUpdateMode.HasPaused;
                }
            }
            break;

            case eUpdateMode.FadeInFromPause:
            case eUpdateMode.HasPaused:
            {
            }
            break;

            case eUpdateMode.FadeOutForMutation:
            {
                overlayPulseTarget   = 1.0;

                if ( allAudioGainSilent )
                {
                    mutateStems();
                    setTimeout( () => { 
                        updateMode = eUpdateMode.FadeIn;
                        enqueueGainRampUp( 3.0 );
                    }, 200 );

                    updateMode = eUpdateMode.Mutating;
                }
            }
            break;

            case eUpdateMode.Mutating:
            {
                overlayPulseTarget   = 1.5;
            }
            break;

            case eUpdateMode.FadeIn:
            {
                if ( allAudioGainFull )
                    updateMode = eUpdateMode.Idle;
            }
            break;
        }

        if ( prevUpdateMode != updateMode )
        {
            console.log(` ${prevUpdateMode} ==> ${updateMode}`);
        }
    }

    {
        clickPulse      += (overlayPulseTarget - clickPulse) * timeDelta;
    }
}

function render() {

    update();
    updateBeatSyncTexture();


    let currentAudioTime = audioCtx.currentTime;

    ouro.gl.uniform2f(program.res,
        canvas.clientWidth,
        canvas.clientHeight
        );

    ouro.gl.uniform3f(program.touch,
        glArgTouchX,
        1.0 - glArgTouchY,
        glArgIsTouching
        );
    ouro.gl.uniform2f(program.touchsum,
        glArgTouchSumX,
        glArgTouchSumY
        );


    ouro.gl.uniform1f(program.variance,
        mutationValue
        );

    ouro.gl.uniform1f(program.time,
        0.001 * performance.now()
        );

    ouro.gl.uniform1f(program.looptime,
        (currentAudioTime % stemDurationLoopSet) / stemDurationLoopSet
        );

    ouro.gl.uniform4f(program.state,
        glArgAudioLive,
        loadingProgress,
        loadingReveal * loadingReveal,
        saturate( clickPulse * 1.1 )
        );

    ouro.gl.uniform4f(program.beat,
        glArgBeat0,
        glArgBeat1,
        glArgBeat2,
        glArgBeat3
        );

    ouro.gl.uniform4f(program.beatsm,
        glArgBeatSmooth0,
        glArgBeatSmooth1,
        glArgBeatSmooth2,
        glArgBeatSmooth3
        );

    ouro.gl.uniform4f(program.beatflow,
        beatIncX,
        beatIncY,
        beatIncZ,
        beatIncW
        );

    ouro.gl.drawArrays(ouro.gl.TRIANGLES, 0, 6);

    window.requestAnimFrame(render);
};

function mutateStems()
{
    var syncLaunch = audioCtx.currentTime + 0.2;
    for (let iB = 0; iB < c_stemBlockCount; iB++) 
    {
        uninstallStem( iB );

        // then possibly turn one variant on
        if (Math.random() > 0.25)
        {
            let activeVariant = Math.floor(Math.random() * c_stemVariantCount);
            let stemIndex = ( iB * c_stemVariantCount ) + activeVariant;

            installStem( stemIndex, iB, syncLaunch );

            console.log(`Block ${iB} -> Var ${activeVariant}`);
        }
    }

    mutationValue = Math.random();
    console.log("= new mutation = " + mutationValue)
}



// ===========================================================================================================

const initialClick_DelayedLaunch = () => 
{
    console.log("-launching-audio-");

    // ask all stems to begin playing at a point just in the future; this was recommended as
    // a way to get the audio context to properly synchronize playback on multiple inputs
    var syncLaunch = audioCtx.currentTime + 0.2;
    for (let iB = 0; iB < c_stemBlockCount; iB++) {
        let stemIndex = ( iB * c_stemVariantCount );

        installStem( stemIndex, iB, syncLaunch );
    }

    // because start() has a delay, set the audio fade-up to begin after that; stagger fade-ins
    for (let iB = 0; iB < c_stemBlockCount; iB++) {
        gainNodes[iB].gain.setValueCurveAtTime( c_gainSlowIn, syncLaunch, 3.0 );
    }

    console.log(` -> context state : [${audioCtx.state}]`);
    audioCtxLaunch  = "running";
    updateMode      = eUpdateMode.InitialFadeUp;
}

const initialClick_UnlockAndLaunchAudio = () =>
{
    // don't trigger before we have stems in hand
    if ( loadingReveal <= 0.5 )
        return false;

    if (audioCtxLaunch === "waiting"   ||
        audioCtx.state === "suspended" )
    {
        audioCtx.resume();
        audioCtxLaunch = "launch";

        // run with a small delay to try and avoid time where resume() takes a moment
        setTimeout( () => initialClick_DelayedLaunch(), 100);

        clickPulse      = 2.0;

        return true;
    } 
    return false;
}

// ===========================================================================================================

function onTap(ev)
{
    console.log(" => onTap");

    if ( updateMode == eUpdateMode.Idle )
    {
        for (let iB = 0; iB < c_stemBlockCount; iB++) 
        {
            setTimeout( () =>
            {
                gainNodes[iB].gain.setValueCurveAtTime( c_gainSlowOut, audioCtx.currentTime, 2.0 );
                gainVisualTargets[iB] = c_gainOff;
            }, iB * 200 );
        }

        biquadFilter.frequency.exponentialRampToValueAtTime( 700, audioCtx.currentTime + 3.0 );
        updateMode = eUpdateMode.FadeOutForMutation;
    }
    if ( updateMode == eUpdateMode.HasPaused )
    {
        updateMode = eUpdateMode.FadeInFromPause;
        setTimeout( () => { 
            updateMode = eUpdateMode.FadeIn;
            enqueueGainRampUp( 3.0 );
        }, 200 );
    }
}

function onDoubleTap(ev)
{
    console.log(" => onDoubleTap");

    if ( updateMode == eUpdateMode.Idle )
    {
        for (let iB = 0; iB < c_stemBlockCount; iB++) 
        {
            setTimeout( () =>
            {
                gainNodes[iB].gain.setValueCurveAtTime( c_gainSlowOut, audioCtx.currentTime, 2.0 );
                gainVisualTargets[iB] = c_gainOff;
            }, iB * 200 );
        }

        updateMode = eUpdateMode.FadeOutToPause;
    }
}

var cachedTouchSumX      = 0.0;
var cachedTouchSumY      = 0.0;
var cachedPanStart;

function onPanBegin(ev)
{
    cachedTouchSumX = glArgTouchSumTgtX;
    cachedTouchSumY = glArgTouchSumTgtY;
    cachedPanStart  = ev.center;
    glArgIsTouching = 1.0;
}

function onPanContinue(ev)
{
    glArgTouchX = ev.center.x / canvas.width;
    glArgTouchY = ev.center.y / canvas.height;

    glArgTouchSumTgtX = cachedTouchSumX + (ev.center.x - cachedPanStart.x);
    glArgTouchSumTgtY = cachedTouchSumY + (ev.center.y - cachedPanStart.y);

    //console.log("my object: %o", ev)
    //console.log("INPUT: PAN ! !" + glArgTouchSumX + " , " + glArgTouchSumY);
}

function onInputFinished()
{
    glArgIsTouching = 0.0;
}

var hammerInstance;

function initialClickHandler(event) 
{
    // wait for data load
    if ( updateMode != eUpdateMode.AwaitingInitialClick )
        return;

    if ( !initialClick_UnlockAndLaunchAudio() )
        return;

    console.log(" => first-click complete, switching to hammer");

    // unplug the first-run audio unlock / audio launch handler, hand event management wholesale to Hammer
    canvas.removeEventListener('click', initialClickHandler);
    canvas.removeEventListener('touchend', initialClickHandler);

    hammerInstance = new Hammer.Manager(canvas);

    hammerInstance.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0, pointers: 0 }));

    var singleTap = new Hammer.Tap({ event: 'tap' });
    var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });

    hammerInstance.add([doubleTap, singleTap]);
    doubleTap.recognizeWith(singleTap);
    singleTap.requireFailure(doubleTap);

    hammerInstance.on( "tap",        onTap );
    hammerInstance.on( "doubletap",  onDoubleTap );
    hammerInstance.on( "panstart",   onPanBegin );
    hammerInstance.on( "panmove",    onPanContinue );
    hammerInstance.on( "hammer.input", (ev) => { if(ev.isFinal) { onInputFinished(); } } );
}

// these let us ensure we go through the audio unlock rigamarole
rootObj.addEventListener('click', initialClickHandler);
rootObj.addEventListener('touchend', initialClickHandler);

