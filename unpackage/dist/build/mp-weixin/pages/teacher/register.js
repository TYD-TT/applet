(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/teacher/register"],{"079e":function(e,a,l){"use strict";l.r(a);var n=l("8902"),t=l.n(n);for(var u in n)"default"!==u&&function(e){l.d(a,e,(function(){return n[e]}))}(u);a["default"]=t.a},1232:function(e,a,l){"use strict";l.d(a,"b",(function(){return t})),l.d(a,"c",(function(){return u})),l.d(a,"a",(function(){return n}));var n={evanForm:function(){return Promise.all([l.e("common/vendor"),l.e("components/evan-form/evan-form")]).then(l.bind(null,"f7ea"))},evanFormItem:function(){return l.e("components/evan-form-item/evan-form-item").then(l.bind(null,"f407"))},uniSteps:function(){return l.e("components/uni-steps/uni-steps").then(l.bind(null,"0eb3"))}},t=function(){var e=this,a=e.$createElement;e._self._c},u=[]},"38f9":function(e,a,l){"use strict";l.r(a);var n=l("1232"),t=l("079e");for(var u in t)"default"!==u&&function(e){l.d(a,e,(function(){return t[e]}))}(u);l("c8f8");var r,i=l("f0c5"),o=Object(i["a"])(t["default"],n["b"],n["c"],!1,null,"8af088c8",null,!1,n["a"],r);a["default"]=o.exports},8902:function(e,a,l){"use strict";(function(e){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=t(l("a34a"));t(l("c1c0"));function t(e){return e&&e.__esModule?e:{default:e}}function u(e,a,l,n,t,u,r){try{var i=e[u](r),o=i.value}catch(s){return void l(s)}i.done?a(o):Promise.resolve(o).then(n,t)}function r(e){return function(){var a=this,l=arguments;return new Promise((function(n,t){var r=e.apply(a,l);function i(e){u(r,n,t,i,o,"next",e)}function o(e){u(r,n,t,i,o,"throw",e)}i(void 0)}))}}var i=function(){Promise.all([l.e("common/vendor"),l.e("components/lb-picker/index")]).then(function(){return resolve(l("fc0e"))}.bind(null,l)).catch(l.oe)},o={components:{LbPicker:i},data:function(){return{hideRequiredAsterisk:!1,register:{name:"",phone:"",account:"",ID_type:"身份证",ID_number:"",department:"",people_type:"teacher",service_type:"register"},list1:[{label:"机械工程学院",value:"1"},{label:"电子信息与电气工程学院",value:"2"},{label:"计算机科学与信息工程学院",value:"3"},{label:"土木与建筑工程学院",value:"4"},{label:"化学与环境工程学院",value:"5"},{label:"生物与食品工程学院",value:"6"},{label:"数理学院",value:"7"},{label:"飞行学院",value:"8"},{label:"经济管理学院",value:"9"},{label:"文法学院",value:"10"},{label:"外国语学院",value:"11"},{label:"艺术设计学院",value:"12"},{label:"国际教育学院",value:"13"},{label:"党委办公室",value:"14"},{label:"组织部",value:"15"},{label:"宣传部",value:"16"},{label:"统战部",value:"17"},{label:"纪检委",value:"18"},{label:"学生工作部",value:"19"},{label:"武装部",value:"20"},{label:"工会",value:"21"},{label:"团委",value:"22"},{label:"机关党委",value:"23"},{label:"校长办公室",value:"24"},{label:"发展规划处",value:"25"},{label:"教务处",value:"26"},{label:"科研处",value:"27"},{label:"人事处",value:"28"},{label:"学生处",value:"29"},{label:"招生就业指导处",value:"30"},{label:"国有资产管理处",value:"31"},{label:"计划财务处",value:"32"},{label:"后勤管理处",value:"33"},{label:"国际合作交流处",value:"34"},{label:"审计处",value:"35"},{label:"基建处",value:"36"},{label:"保卫处",value:"37"},{label:"离退休处",value:"38"},{label:"现代教育技术中心",value:"39"},{label:"图书馆",value:"40"},{label:"学报编辑部",value:"41"},{label:"教学研究与评估办公室",value:"42"},{label:"工程训练中心",value:"43"},{label:"心理健康教育中心",value:"44"},{label:"教师教学发展中心",value:"45"},{label:"档案馆",value:"46"}],label1:"",value1:[],active:0,rules:{name:{required:!0,message:"请输入姓名"},phone:[{required:!0,message:"请输入手机号"},{min:11,max:11,message:"手机号长度为11位"}],ID_number:[{required:!0,message:"请输入证件号码"},{min:18,max:18,message:"证件号长度为18位"}],account:[{required:!0,message:"请输入工号"},{min:10,max:6,message:"工号长度为6-8位"}],department:{required:!0,message:"请选择申请的院系"}}}},mounted:function(){this.$refs.register.setRules(this.rules)},methods:{isCellPhone:function(e){return!!/^1(3|4|5|6|7|8)\d{9}$/.test(e)},handleTap1:function(){this.$refs.picker1.show()},handleChange1:function(e){},handleCancel1:function(e){},handleConfirm1:function(e){if(e){var a=e.dataset.name,l=e.item.map((function(e){return e.label})).join("-");this.value1=l,this.register.department=l,a&&l&&(this[a]=l)}},t_register:function(){var a=this;this.register.creat_time=this.$getFormatDate.getFormatDate(),this.$refs.register.validate(function(){var l=r(n.default.mark((function l(t){var u,r;return n.default.wrap((function(l){while(1)switch(l.prev=l.next){case 0:if(!t){l.next=7;break}return a.active=1,l.next=4,a.$http({url:"/register",method:"POST",data:a.register});case 4:u=l.sent,r=u.data,201==r.status&&(e.showToast({title:r.message,icon:"none"}),e.navigateTo({url:"../index/index"}));case 7:case"end":return l.stop()}}),l)})));return function(e){return l.apply(this,arguments)}}())},back:function(){e.navigateBack({delta:1})}}};a.default=o}).call(this,l("543d")["default"])},"98fa":function(e,a,l){},c8f8:function(e,a,l){"use strict";var n=l("98fa"),t=l.n(n);t.a},d3c5:function(e,a,l){"use strict";(function(e){l("a38d");n(l("66fd"));var a=n(l("38f9"));function n(e){return e&&e.__esModule?e:{default:e}}e(a.default)}).call(this,l("543d")["createPage"])}},[["d3c5","common/runtime","common/vendor"]]]);