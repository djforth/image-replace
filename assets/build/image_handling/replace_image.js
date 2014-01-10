(function(){define(["require","jquery","underscore","utils/loader"],function(e){var t,n,r,i;return t=e("jquery"),i=e("underscore"),n=e("utils/loader"),r=function(){function e(e,t,n,r){e==null&&(e=void 0),t==null&&(t=!1),n==null&&(n={}),r==null&&(r=!0),i.isObject(n)&&this.setDefaults(n),this.holder=i.isUndefined(e)?document.body:e,this.caption=t,r&&this.init()}return e.prototype.caption=!1,e.prototype.fig="figure",e.prototype.element=".screenshots li a",e.prototype.main_img="main_image",e.prototype.holder=null,e.prototype.img=void 0,e.prototype.figcap=void 0,e.prototype.loader=null,e.prototype.addClick=function(){return t(this.holder).on("click",this.element,{callback:this.replaceImage,that:this},function(e){return e.preventDefault?e.preventDefault():(e.cancelBubble=!0,e.returnValue=!1),e.data.callback.call(e.data.that,e.target)})},e.prototype.changeImg=function(e,t){return e.getAttribute("src")===t.img?!1:(e.setAttribute("src",t.img+"?"+(new Date).getTime()),e.setAttribute("alt",t.title),!0)},e.prototype.init=function(){return this.addClick(),this.loader=new n(document.getElementById(this.main_img))},e.prototype.getNewImg=function(e){return{title:e.getAttribute("title"),img:e.getAttribute("href")}},e.prototype.replaceImage=function(e){var t;this.img=this.findImage(),t=this.getNewImg(e);if(this.changeImg(this.img,t)){this.loader.loadItem(this.img);if(this.caption)return this.replaceCaption(title)}},e.prototype.findImage=function(){var e,t;return t=document.getElementById(this.main_img),e=t.getElementsByTagName("img"),e[0]},e.prototype.findCaption=function(){var e;return e=this.holder.getElementsByTagName(this.fig),e[0].getElementsByTagName("figcaption")[0]},e.prototype.replaceCaption=function(e,t){var n,r;return n=document.createTextNode(t),r=e.replaceChild(n,e.firstChild)},e.prototype.setDefaults=function(e){i.isString(e.fig)&&(this.fig=e.fig),i.isString(e.element)&&(this.element=e.element);if(i.isString(e.main_img))return this.main_img=e.main_img},e}()})}).call(this);