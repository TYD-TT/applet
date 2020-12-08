(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/t-table/t-th"],{"0d3c":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={props:{align:String},data:function(){return{thBorder:"1",borderColor:"#d0dee5",fontSize:"15",color:"#3b4246",thAlign:"center"}},inject:["table","tr"],created:function(){this.thBorder=this.table.border,this.borderColor=this.table.borderColor,this.fontSize=this.tr.fontSize,this.color=this.tr.color,this.align?this.thAlign=this.align:this.thAlign=this.tr.align},computed:{thAlignCpd:function(){var t="";switch(this.thAlign){case"left":t="flex-start";break;case"center":t="center";break;case"right":t="flex-end";break;default:t="center";break}return t}}};e.default=r},"1ad9":function(t,e,n){},3489:function(t,e,n){"use strict";n.r(e);var r=n("0d3c"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"5fd7":function(t,e,n){"use strict";n.r(e);var r=n("9a21"),i=n("3489");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("d495");var o,c=n("f0c5"),l=Object(c["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=l.exports},"9a21":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},d495:function(t,e,n){"use strict";var r=n("1ad9"),i=n.n(r);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/t-table/t-th-create-component',
    {
        'components/t-table/t-th-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5fd7"))
        })
    },
    [['components/t-table/t-th-create-component']]
]);
