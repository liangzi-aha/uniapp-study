(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"00c3":function(t,i,n){var e=n("a8c0");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=n("4f06").default;a("0053ea44",e,!0,{sourceMap:!1,shadowMode:!1})},3677:function(t,i,n){var e=n("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.index .container .index_scroll[data-v-3023605d]{height:calc(100vh - 125px - %?130?%)}.index .index-search[data-v-3023605d]{display:flex;align-items:center;height:%?70?%;margin:%?30?% %?30?% %?30?% %?30?%;background-color:#f7f7f7;border-radius:%?35?%}.index .index-search uni-text[data-v-3023605d]{font-size:%?26?%;margin-right:%?26?%;margin-left:%?28?%}.index .index-search uni-input[data-v-3023605d]{font-size:%?28?%;flex:1}.index .index-list[data-v-3023605d]{margin:0 %?30?%}.index .index-list .index-list-item[data-v-3023605d]{display:flex;margin-bottom:%?34?%}.index .index-list .index-list-item .index-list-img[data-v-3023605d]{width:%?212?%;height:%?212?%;position:relative;border-radius:%?30?%;overflow:hidden;margin-right:%?22?%}.index .index-list .index-list-item .index-list-img uni-image[data-v-3023605d]{width:100%;height:100%}.index .index-list .index-list-item .index-list-img uni-text[data-v-3023605d]{position:absolute;left:%?12?%;bottom:%?16?%;color:#fff;font-size:%?25?%}.index .index-list .index-list-item .index-list-text[data-v-3023605d]{flex:1;line-height:%?66?%;font-size:%?26?%;text-overflow:ellipsis;\r\n  /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/white-space:nowrap;\r\n  /*让文字不换行*/overflow:hidden\r\n  /*超出要隐藏*/}',""]),t.exports=i},"3a1c":function(t,i,n){"use strict";n("99af"),n("caad"),n("c975"),n("a9e3"),n("acd8"),n("2532"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=uni.createAnimation({duration:1e3,timingFunction:"linear"}),a={data:function(){return{animationData:{},imgType:["circular","square"],displayType:["vertical","horizontal"],show:!0}},props:{loading:{type:Boolean,default:!0},title:{type:Boolean,default:!0},avatar:{type:Boolean,default:!0},avatarSize:{type:Number|String,default:100},isarc:{type:String,default:"square"},titleSize:{type:Number|String,default:"50%"},titleStyle:{type:Object,default:{}},row:{type:Number,default:1},rowData:{type:Array|String,default:"80%"},display:{type:String,default:"horizontal"}},created:function(){this.animationData=e},watch:{loading:function(t){var i=this;if(!t){e.opacity(0).step(),this.animationData=e.export();var n=setTimeout((function(){i.show=!1,clearTimeout(n)}),1e3)}}},computed:{rowDataInfo:function(){for(var t=[],i=0;i<this.row;i++)t.push(i);return t},titleInfo:function(){var t="";for(var i in this.titleStyle)t+="".concat(i,":").concat(this.titleStyle[i],";");return t},imgsize:function(){switch(typeof this.avatarSize){case"number":return"".concat(uni.upx2px(this.avatarSize),"px");default:return"".concat(uni.upx2px(parseFloat(this.avatarSize)),"px")}},titlwidth:function(){switch(typeof this.titleSize){case"number":return"".concat(uni.upx2px(this.titleSize),"px");default:return"".concat(uni.upx2px(parseFloat(this.titleSize)),"px")}},imgarc:function(){return this.imgType.includes(this.isarc)?"square"==this.isarc?"0%":"50%":(console.error("输入错误".concat(this.isarc)),"0%")},displayInfo:function(){return this.displayType.includes(this.display)?this.display:(console.error("输入错误".concat(this.display)),"horizontal")}},methods:{rowInfo:function(t){var i=typeof this.rowData;switch(i){case"string":return this.rowData;case"object":return this.rowData[0]?(this.rowData[t]||(t=0),this.rowData[t].indexOf("%")>-1?this.rowData[t]:"".concat(uni.upx2px(parseFloat(this.rowData[t])),"px")):"80%"}}}};i.default=a},"3d87":function(t,i,n){"use strict";var e=n("00c3"),a=n.n(e);a.a},"6ab3":function(t,i,n){"use strict";var e=n("fbd0"),a=n.n(e);a.a},"711d":function(t,i,n){"use strict";n.r(i);var e=n("8b3d"),a=n.n(e);for(var r in e)"default"!==r&&function(t){n.d(i,t,(function(){return e[t]}))}(r);i["default"]=a.a},8809:function(t,i,n){"use strict";var e;n.d(i,"b",(function(){return a})),n.d(i,"c",(function(){return r})),n.d(i,"a",(function(){return e}));var a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return t.show?n("v-uni-view",{class:[t.displayInfo,"skeleton"],attrs:{animation:t.animationData}},[t.avatar?n("div",{staticClass:"skeleton-avatar",style:{width:t.imgsize,height:t.imgsize,borderRadius:t.imgarc}}):t._e(),n("v-uni-view",{staticClass:"skeleton-content"},[t.title?n("v-uni-view",{staticClass:"skeleton-content-title",style:t.titleInfo}):t._e(),t._l(t.rowDataInfo,(function(i,e){return n("v-uni-view",{key:e,staticClass:"skeleton-content-row",style:{width:t.rowInfo(e)}})}))],2)],1):t._e()},r=[]},"8b3d":function(t,i,n){"use strict";var e=n("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=e(n("9965")),r={components:{mForSkeleton:a.default},data:function(){return{topList:[],isLoading:!0,initMusicFiexdTabCal:"",HistoryIsMusic:!1,baseImgUrl:this.$imgBaseUrl}},onLoad:function(){var t=this;this.$api.classifyList().then((function(i){var n=i.data;n.length>4&&(n.length=4),n.length&&(t.topList=n),console.log(t.topList),t.isLoading=!1}))},onShow:function(){var t=this;this.initMusicFiexdTab(),uni.getStorage({key:"songDetail",success:function(i){i&&(t.HistoryIsMusic=!0)}})},onHide:function(){},methods:{handleToList:function(t){uni.navigateTo({url:"/pages/list/list?id="+t})},handleToSearch:function(){uni.navigateTo({url:"/pages/search/search"})},initMusicFiexdTab:function(t){t?(this.initMusicFiexdTabCal=t,this.initMusicFiexdTabCal()):this.initMusicFiexdTabCal&&this.initMusicFiexdTabCal()}}};i.default=r},"8b47":function(t,i,n){"use strict";n.r(i);var e=n("a265"),a=n("711d");for(var r in a)"default"!==r&&function(t){n.d(i,t,(function(){return a[t]}))}(r);n("6ab3");var s,o=n("f0c5"),c=Object(o["a"])(a["default"],e["b"],e["c"],!1,null,"3023605d",null,!1,e["a"],s);i["default"]=c.exports},"8d10":function(t,i,n){"use strict";n.r(i);var e=n("3a1c"),a=n.n(e);for(var r in e)"default"!==r&&function(t){n.d(i,t,(function(){return e[t]}))}(r);i["default"]=a.a},9965:function(t,i,n){"use strict";n.r(i);var e=n("8809"),a=n("8d10");for(var r in a)"default"!==r&&function(t){n.d(i,t,(function(){return a[t]}))}(r);n("3d87");var s,o=n("f0c5"),c=Object(o["a"])(a["default"],e["b"],e["c"],!1,null,"44c9967e",null,!1,e["a"],s);i["default"]=c.exports},a265:function(t,i,n){"use strict";n.d(i,"b",(function(){return a})),n.d(i,"c",(function(){return r})),n.d(i,"a",(function(){return e}));var e={musichead:n("9f9f").default,mForSkeleton:n("9965").default},a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",{staticClass:"index"},[n("musichead",{attrs:{title:"良子音乐",icon:!1}}),n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"index-search",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.handleToSearch.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"iconfont icon-search"}),n("v-uni-input",{attrs:{type:"text",placeholder:"搜索歌曲"}})],1),n("v-uni-scroll-view",{staticClass:"index_scroll",style:{paddingBottom:t.HistoryIsMusic?"100rpx":""},attrs:{"scroll-y":"true"}},[t.isLoading?n("v-uni-view",t._l(4,(function(i,e){return n("m-for-skeleton",{key:e,attrs:{avatarSize:200,row:3,loading:t.isLoading,isarc:"square",titleStyle:{},title:!1}})})),1):n("v-uni-view",{staticClass:"index-list"},t._l(t.topList,(function(i){return n("v-uni-view",{key:i.id,staticClass:"index-list-item",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.handleToList(i.id)}}},[n("v-uni-view",{staticClass:"index-list-img"},[n("v-uni-image",{attrs:{src:(t.baseImgUrl+i.music_classify_img).replace(/\\/g,"/")}}),n("v-uni-text",[t._v(t._s(i.music_classify_name))])],1),n("v-uni-view",{staticClass:"index-list-text"},t._l(i.music_classify_content,(function(i,e){return n("v-uni-view",{key:e},[t._v(t._s(e+1)+"、"+t._s(i.musicName)+" - "+t._s(i.musicAuthor))])})),1)],1)})),1)],1)],1),t.HistoryIsMusic?n("music-tabbar",{attrs:{fixedButton:!0},on:{initMusicFiexdTab:function(i){arguments[0]=i=t.$handleEvent(i),t.initMusicFiexdTab.apply(void 0,arguments)}}}):t._e()],1)},r=[]},a8c0:function(t,i,n){var e=n("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.skeleton[data-v-44c9967e]{display:flex;padding:%?20?%;box-sizing:border-box}.skeleton.vertical[data-v-44c9967e]{flex-direction:column;align-items:center}.skeleton.vertical .skeleton-content[data-v-44c9967e]{width:100%;margin-left:0;margin-top:%?20?%}.skeleton-avatar[data-v-44c9967e]{background:#ddd;flex-shrink:0}.skeleton-content[data-v-44c9967e]{flex:1;display:flex;flex-direction:column;margin-left:%?20?%;overflow:hidden}.skeleton-content-title[data-v-44c9967e]{height:%?40?%;width:50%;background:#ddd}.skeleton-content-row[data-v-44c9967e]{width:80%;height:%?40?%;background:#ddd;margin-top:%?20?%}',""]),t.exports=i},fbd0:function(t,i,n){var e=n("3677");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=n("4f06").default;a("b0971782",e,!0,{sourceMap:!1,shadowMode:!1})}}]);