(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/teacher/software"],{2961:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(t("a34a"));i(t("2e31"));function i(e){return e&&e.__esModule?e:{default:e}}function r(e,n,t,a,i,r,o){try{var u=e[r](o),c=u.value}catch(s){return void t(s)}u.done?n(c):Promise.resolve(c).then(a,i)}function o(e){return function(){var n=this,t=arguments;return new Promise((function(a,i){var o=e.apply(n,t);function u(e){r(o,a,i,u,c,"next",e)}function c(e){r(o,a,i,u,c,"throw",e)}u(void 0)}))}}var u=function(){Promise.all([t.e("common/vendor"),t.e("components/lb-picker/index")]).then(function(){return resolve(t("7142"))}.bind(null,t)).catch(t.oe)},c={components:{LbPicker:u},data:function(){return{hideRequiredAsterisk:!1,software:{ios:"",office:"",address:"",time:"",section:"",phone:"",creat_time:"",text:"",account:"",people_type:"teacher",service_type:"software"},list1:[{label:"windows 7 32位",value:"1"},{label:"windows 7 64位",value:"2"},{label:"windows 10 32位",value:"3"},{label:"windows 10 64位",value:"4"}],list2:[{label:"office 2010 32位",value:"1"},{label:"office 2010 64位",value:"2"},{label:"office 2013 32位",value:"3"},{label:"office 2013 64位",value:"4"},{label:"office 2016 32位",value:"5"},{label:"office 2016 64位",value:"6"}],list3:[{label:"周一上午 09:00-11:00",value:"1"},{label:"周三下午 16:00-17:00",value:"2"},{label:"周四下午 16:00-17:00",value:"3"}],label1:"",value1:[],label2:"",value2:[],label3:"",value3:[],active:0,rules:{ios:{required:!0,message:"请选择操作系统"},office:{required:!0,message:"请选择office版本"},time:{required:!0,message:"请选择安装时间"},address:{required:!0,message:"请输入安装地点"},section:{required:!0,message:"请输入所在部门"},phone:{required:!0,message:"请输入联系电话"}}}},mounted:function(){this.$refs.software.setRules(this.rules)},methods:{handleTap1:function(){this.$refs.picker1.show()},handleTap2:function(){this.$refs.picker2.show()},handleTap3:function(){this.$refs.picker3.show()},handleChange1:function(e){},handleConfirm1:function(e){if(e){var n=e.dataset.name,t=e.item.map((function(e){return e.label})).join("-");this.software.ios=t,this.value1=t,n&&t&&(this[n]=t)}},handleCancel1:function(e){},handleChange2:function(e){},handleConfirm2:function(e){if(e){var n=e.dataset.name,t=e.item.map((function(e){return e.label})).join("-");this.software.office=t,this.value2=t,n&&t&&(this[n]=t)}},handleCancel2:function(e){},handleChange3:function(e){},handleConfirm3:function(e){if(e){var n=e.dataset.name,t=e.item.map((function(e){return e.label})).join("-");this.value3=t,this.software.time=t,n&&t&&(this[n]=t)}},handleCancel3:function(e){},submit:function(){var n=this;this.$refs.software.validate(function(){var t=o(a.default.mark((function t(i){return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n.software.creat_time=n.$getFormatDate.getFormatDate(),i&&(n.active=1,e.getStorage({key:"teacher_account",success:function(){var t=o(a.default.mark((function t(i){var r,o;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n.software.account=i.data,t.next=3,n.$http({url:"/teacher/software",method:"POST",data:n.software});case 3:r=t.sent,o=r.data,201==o.status&&e.showModal({title:"提示",content:o.message,success:function(n){n.confirm?e.reLaunch({url:"./index"}):n.cancel&&e.navigateTo({url:"./software"})}});case 6:case"end":return t.stop()}}),t)})));function i(e){return t.apply(this,arguments)}return i}()}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},back:function(){e.navigateBack({delta:1})}}};n.default=c}).call(this,t("543d")["default"])},"371e":function(e,n,t){"use strict";var a=t("83a9"),i=t.n(a);i.a},"3f1b":function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return a}));var a={evanForm:function(){return t.e("components/evan-form/evan-form").then(t.bind(null,"7a37"))},evanFormItem:function(){return t.e("components/evan-form-item/evan-form-item").then(t.bind(null,"e70f"))},uniSteps:function(){return t.e("components/uni-steps/uni-steps").then(t.bind(null,"1e87"))}},i=function(){var e=this,n=e.$createElement;e._self._c},r=[]},"66a0":function(e,n,t){"use strict";t.r(n);var a=t("2961"),i=t.n(a);for(var r in a)"default"!==r&&function(e){t.d(n,e,(function(){return a[e]}))}(r);n["default"]=i.a},"7f0d":function(e,n,t){"use strict";t.r(n);var a=t("3f1b"),i=t("66a0");for(var r in i)"default"!==r&&function(e){t.d(n,e,(function(){return i[e]}))}(r);t("371e");var o,u=t("f0c5"),c=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,"6666ac4e",null,!1,a["a"],o);n["default"]=c.exports},"83a9":function(e,n,t){},d153:function(e,n,t){"use strict";(function(e){t("9fbd");a(t("66fd"));var n=a(t("7f0d"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])}},[["d153","common/runtime","common/vendor"]]]);