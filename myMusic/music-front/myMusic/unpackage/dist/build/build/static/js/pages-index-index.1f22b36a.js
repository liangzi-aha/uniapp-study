(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{4772:function(t,i,e){"use strict";var n=e("4ea4");e("d81d"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=n(e("c504")),r={components:{mForSkeleton:a.default},data:function(){return{topList:[],isLoading:!0,initMusicFiexdTabCal:"",HistoryIsMusic:!1}},onLoad:function(){var t=this,i=["3","0","2","1"];this.$api.topList().then((function(e){var n=e.list;n.length=4,n.map((function(t,e){return t.listId=i[e]})),n.length&&(t.topList=n),t.isLoading=!1}))},onShow:function(){var t=this;console.log("show"),this.initMusicFiexdTab(),uni.getStorage({key:"songDetail",success:function(i){i&&(t.HistoryIsMusic=!0)}})},methods:{handleToList:function(t){uni.navigateTo({url:"/pages/list/list?id="+t})},handleToSearch:function(){uni.navigateTo({url:"/pages/search/search"})},initMusicFiexdTab:function(t){t?(this.initMusicFiexdTabCal=t,this.initMusicFiexdTabCal()):this.initMusicFiexdTabCal&&this.initMusicFiexdTabCal()}}};i.default=r},6203:function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return r})),e.d(i,"a",(function(){return n}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return t.show?e("v-uni-view",{class:[t.displayInfo,"skeleton"],attrs:{animation:t.animationData}},[t.avatar?e("div",{staticClass:"skeleton-avatar",style:{width:t.imgsize,height:t.imgsize,borderRadius:t.imgarc}}):t._e(),e("v-uni-view",{staticClass:"skeleton-content"},[t.title?e("v-uni-view",{staticClass:"skeleton-content-title",style:t.titleInfo}):t._e(),t._l(t.rowDataInfo,(function(i,n){return e("v-uni-view",{key:n,staticClass:"skeleton-content-row",style:{width:t.rowInfo(n)}})}))],2)],1):t._e()},r=[]},6362:function(t,i,e){"use strict";var n=e("7900"),a=e.n(n);a.a},"69d9":function(t,i,e){"use strict";e.r(i);var n=e("ae0e"),a=e.n(n);for(var r in n)"default"!==r&&function(t){e.d(i,t,(function(){return n[t]}))}(r);i["default"]=a.a},7900:function(t,i,e){var n=e("955d");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("cf9aaeca",n,!0,{sourceMap:!1,shadowMode:!1})},8807:function(t,i,e){var n=e("a7e5");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("804598e4",n,!0,{sourceMap:!1,shadowMode:!1})},"955d":function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.skeleton[data-v-44c9967e]{display:-webkit-box;display:-webkit-flex;display:flex;padding:%?20?%;box-sizing:border-box}.skeleton.vertical[data-v-44c9967e]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.skeleton.vertical .skeleton-content[data-v-44c9967e]{width:100%;margin-left:0;margin-top:%?20?%}.skeleton-avatar[data-v-44c9967e]{background:#ddd;-webkit-flex-shrink:0;flex-shrink:0}.skeleton-content[data-v-44c9967e]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;margin-left:%?20?%;overflow:hidden}.skeleton-content-title[data-v-44c9967e]{height:%?40?%;width:50%;background:#ddd}.skeleton-content-row[data-v-44c9967e]{width:80%;height:%?40?%;background:#ddd;margin-top:%?20?%}',""]),t.exports=i},a7e5:function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.index .index-search[data-v-e50943be]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?70?%;margin:%?30?% %?30?% %?30?% %?30?%;background-color:#f7f7f7;border-radius:%?35?%}.index .index-search uni-text[data-v-e50943be]{font-size:%?26?%;margin-right:%?26?%;margin-left:%?28?%}.index .index-search uni-input[data-v-e50943be]{font-size:%?28?%;-webkit-box-flex:1;-webkit-flex:1;flex:1}.index .index-list[data-v-e50943be]{margin:0 %?30?%}.index .index-list .index-list-item[data-v-e50943be]{display:-webkit-box;display:-webkit-flex;display:flex;margin-bottom:%?34?%}.index .index-list .index-list-item .index-list-img[data-v-e50943be]{width:%?212?%;height:%?212?%;position:relative;border-radius:%?30?%;overflow:hidden;margin-right:%?22?%}.index .index-list .index-list-item .index-list-img uni-image[data-v-e50943be]{width:100%;height:100%}.index .index-list .index-list-item .index-list-img uni-text[data-v-e50943be]{position:absolute;left:%?12?%;bottom:%?16?%;color:#fff;font-size:%?25?%}.index .index-list .index-list-item .index-list-text[data-v-e50943be]{-webkit-box-flex:1;-webkit-flex:1;flex:1;line-height:%?66?%;font-size:%?26?%;text-overflow:ellipsis;\r\n  /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/white-space:nowrap;\r\n  /*让文字不换行*/overflow:hidden\r\n  /*超出要隐藏*/}',""]),t.exports=i},ad12:function(t,i,e){"use strict";e.r(i);var n=e("ea7b"),a=e("fb52");for(var r in a)"default"!==r&&function(t){e.d(i,t,(function(){return a[t]}))}(r);e("bcae");var s,o=e("f0c5"),l=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"e50943be",null,!1,n["a"],s);i["default"]=l.exports},ae0e:function(t,i,e){"use strict";e("99af"),e("caad"),e("c975"),e("a9e3"),e("acd8"),e("2532"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=uni.createAnimation({duration:1e3,timingFunction:"linear"}),a={data:function(){return{animationData:{},imgType:["circular","square"],displayType:["vertical","horizontal"],show:!0}},props:{loading:{type:Boolean,default:!0},title:{type:Boolean,default:!0},avatar:{type:Boolean,default:!0},avatarSize:{type:Number|String,default:100},isarc:{type:String,default:"square"},titleSize:{type:Number|String,default:"50%"},titleStyle:{type:Object,default:{}},row:{type:Number,default:1},rowData:{type:Array|String,default:"80%"},display:{type:String,default:"horizontal"}},created:function(){this.animationData=n},watch:{loading:function(t){var i=this;if(!t){n.opacity(0).step(),this.animationData=n.export();var e=setTimeout((function(){i.show=!1,clearTimeout(e)}),1e3)}}},computed:{rowDataInfo:function(){for(var t=[],i=0;i<this.row;i++)t.push(i);return t},titleInfo:function(){var t="";for(var i in this.titleStyle)t+="".concat(i,":").concat(this.titleStyle[i],";");return t},imgsize:function(){switch(typeof this.avatarSize){case"number":return"".concat(uni.upx2px(this.avatarSize),"px");default:return"".concat(uni.upx2px(parseFloat(this.avatarSize)),"px")}},titlwidth:function(){switch(typeof this.titleSize){case"number":return"".concat(uni.upx2px(this.titleSize),"px");default:return"".concat(uni.upx2px(parseFloat(this.titleSize)),"px")}},imgarc:function(){return this.imgType.includes(this.isarc)?"square"==this.isarc?"0%":"50%":(console.error("输入错误".concat(this.isarc)),"0%")},displayInfo:function(){return this.displayType.includes(this.display)?this.display:(console.error("输入错误".concat(this.display)),"horizontal")}},methods:{rowInfo:function(t){var i=typeof this.rowData;switch(i){case"string":return this.rowData;case"object":return this.rowData[0]?(this.rowData[t]||(t=0),this.rowData[t].indexOf("%")>-1?this.rowData[t]:"".concat(uni.upx2px(parseFloat(this.rowData[t])),"px")):"80%"}}}};i.default=a},bcae:function(t,i,e){"use strict";var n=e("8807"),a=e.n(n);a.a},c504:function(t,i,e){"use strict";e.r(i);var n=e("6203"),a=e("69d9");for(var r in a)"default"!==r&&function(t){e.d(i,t,(function(){return a[t]}))}(r);e("6362");var s,o=e("f0c5"),l=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"44c9967e",null,!1,n["a"],s);i["default"]=l.exports},ea7b:function(t,i,e){"use strict";e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return r})),e.d(i,"a",(function(){return n}));var n={musichead:e("c594").default,mForSkeleton:e("c504").default},a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"index"},[e("musichead",{attrs:{title:"网易云音乐",icon:!1}}),e("v-uni-view",{staticClass:"container"},[e("v-uni-scroll-view",{style:{paddingBottom:t.HistoryIsMusic?"100rpx":""},attrs:{"scroll-y":"true"}},[e("v-uni-view",{staticClass:"index-search",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.handleToSearch.apply(void 0,arguments)}}},[e("v-uni-text",{staticClass:"iconfont icon-search"}),e("v-uni-input",{attrs:{type:"text",placeholder:"搜索歌曲"}})],1),t.isLoading?e("v-uni-view",t._l(4,(function(i,n){return e("m-for-skeleton",{key:n,attrs:{avatarSize:200,row:3,loading:t.isLoading,isarc:"square",titleStyle:{},title:!1}})})),1):e("v-uni-view",{staticClass:"index-list"},t._l(t.topList,(function(i){return e("v-uni-view",{key:i.id,staticClass:"index-list-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleToList(i.id)}}},[e("v-uni-view",{staticClass:"index-list-img"},[e("v-uni-image",{attrs:{src:i.coverImgUrl}}),e("v-uni-text",[t._v(t._s(i.updateFrequency))])],1),e("v-uni-view",{staticClass:"index-list-text"},t._l(i.tracks,(function(i,n){return e("v-uni-view",{key:n},[t._v(t._s(n+1)+"、"+t._s(i.second)+" - "+t._s(i.second))])})),1)],1)})),1)],1)],1),t.HistoryIsMusic?e("play-music",{on:{initMusicFiexdTab:function(i){arguments[0]=i=t.$handleEvent(i),t.initMusicFiexdTab.apply(void 0,arguments)}}}):t._e()],1)},r=[]},fb52:function(t,i,e){"use strict";e.r(i);var n=e("4772"),a=e.n(n);for(var r in n)"default"!==r&&function(t){e.d(i,t,(function(){return n[t]}))}(r);i["default"]=a.a}}]);