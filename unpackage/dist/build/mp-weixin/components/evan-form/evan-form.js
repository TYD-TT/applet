(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/evan-form/evan-form"],{4359:function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return u})),r.d(t,"c",(function(){return i})),r.d(t,"a",(function(){return n}));var u=function(){var e=this,t=e.$createElement;e._self._c},i=[]},9490:function(e,t,r){"use strict";var n=r("989d"),u=r.n(n);u.a},"989d":function(e,t,r){},c161:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(r("a34a")),u=i(r("c1c0"));function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t,r,n,u,i,a){try{var s=e[i](a),o=s.value}catch(l){return void r(l)}s.done?t(o):Promise.resolve(o).then(n,u)}function s(e){return function(){var t=this,r=arguments;return new Promise((function(n,u){var i=e.apply(t,r);function s(e){a(i,n,u,s,o,"next",e)}function o(e){a(i,n,u,s,o,"throw",e)}s(void 0)}))}}var o={name:"EvanForm",props:{labelStyle:{type:Object,default:function(){return{}}},model:Object,hideRequiredAsterisk:{type:Boolean,default:!1},showMessage:{type:Boolean,default:!0},labelPosition:{validator:function(e){return-1!==["top","left"].indexOf(e)},default:"left"},rules:{type:Object,default:function(){return{}}}},provide:function(){return{evanForm:this}},computed:{hasRequiredAsterisk:function(){if(this.hideRequiredAsterisk)return!1;if(this.mRules){var e=Object.values(this.mRules);if(e&&e.length>0)for(var t=0;t<e.length;t++){var r=e[t];if(Array.isArray(r)&&r.length>0){var n=r.find((function(e){return!0===e.required}));if(n)return!0}else if(r&&r.required)return!0}}return this.childHasRequired}},watch:{rules:{immediate:!0,deep:!0,handler:function(e){this.mRules=e||{}}}},data:function(){return{mRules:{},fields:[],childHasRequired:!1}},methods:{setRules:function(e){this.mRules=e||{}},validate:function(e){var t=this;return s(n.default.mark((function r(){var i;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(i=t.getRules(),"function"!==typeof e){r.next=5;break}u.default.validate(t.model,i,e,{showMessage:t.showMessage}),r.next=8;break;case 5:return r.next=7,u.default.validate(t.model,i,e,{showMessage:t.showMessage});case 7:return r.abrupt("return",r.sent);case 8:case"end":return r.stop()}}),r)})))()},validateField:function(e,t){var r=this;return s(n.default.mark((function i(){var a;return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=r.getRules(),"function"!==typeof t){n.next=5;break}u.default.validateField(r.model,a,e,t,{showMessage:r.showMessage}),n.next=8;break;case 5:return n.next=7,u.default.validateField(r.model,a,e,t,{showMessage:r.showMessage});case 7:return n.abrupt("return",n.sent);case 8:case"end":return n.stop()}}),i)})))()},getRules:function(){var e=this,t={};return this.fields.forEach((function(r){if(r.prop){var n=r.required?{required:!0,message:r.message||"".concat(r.label,"必填")}:[],u=e.mRules&&e.mRules[r.prop]?e.mRules[r.prop]:[];t[r.prop]=[].concat(r.rules||u||[]).concat(n)}})),t}},created:function(){var e=this;this.$on("evan.form.addField",(function(t){if(t.prop&&(e.fields.push({rules:t.rules,prop:t.prop,required:t.required,label:t.label,message:t.message,_uid:t._uid}),!e.childHasRequired)){if(t.required)return void(e.childHasRequired=t.required);if(t.rules){var r=[].concat(t.rules);r.forEach((function(t){t.required&&(e.childHasRequired=!0)}))}}})),this.$on("evan.form.removeField",(function(t){e.fields.splice(e.fields.findIndex((function(e){return e._uid===t._uid})),1)}))}};t.default=o},f1cb:function(e,t,r){"use strict";r.r(t);var n=r("c161"),u=r.n(n);for(var i in n)"default"!==i&&function(e){r.d(t,e,(function(){return n[e]}))}(i);t["default"]=u.a},f7ea:function(e,t,r){"use strict";r.r(t);var n=r("4359"),u=r("f1cb");for(var i in u)"default"!==i&&function(e){r.d(t,e,(function(){return u[e]}))}(i);r("9490");var a,s=r("f0c5"),o=Object(s["a"])(u["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);t["default"]=o.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/evan-form/evan-form-create-component',
    {
        'components/evan-form/evan-form-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f7ea"))
        })
    },
    [['components/evan-form/evan-form-create-component']]
]);
