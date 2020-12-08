(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/t-table/t-td"],{"0610":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={props:{align:String},data:function(){return{thBorder:"1",borderColor:"#d0dee5",fontSize:"14",color:"#555c60",tdAlign:"center"}},inject:["table","tr"],created:function(){this.thBorder=this.table.border,this.borderColor=this.table.borderColor,this.fontSize=this.tr.fontSize,this.color=this.tr.color,this.align?this.tdAlign=this.align:this.tdAlign=this.tr.align},computed:{tdAlignCpd:function(){var t="";switch(this.tdAlign){case"left":t="flex-start";break;case"center":t="center";break;case"right":t="flex-end";break;default:t="center";break}return t}}};e.default=r},"2f3a":function(t,e,n){"use strict";n.r(e);var r=n("ced6"),i=n("89c7");for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);n("c0df");var o,a=n("f0c5"),l=Object(a["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=l.exports},"79ee":function(t,e,n){},"89c7":function(t,e,n){"use strict";n.r(e);var r=n("0610"),i=n.n(r);for(var c in r)"default"!==c&&function(t){n.d(e,t,(function(){return r[t]}))}(c);e["default"]=i.a},c0df:function(t,e,n){"use strict";var r=n("79ee"),i=n.n(r);i.a},ced6:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement;t._self._c},c=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/t-table/t-td-create-component',
    {
        'components/t-table/t-td-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2f3a"))
        })
    },
    [['components/t-table/t-td-create-component']]
]);
