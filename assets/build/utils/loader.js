(function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define(["require","jquery","underscore","utils/manage_elements"],function(e){var n,r,i,s;return n=e("jquery"),s=e("underscore"),i=e("utils/manage_elements"),r=function(e){function r(e,t,n){n==null&&(n=!0),this.holder=s.isUndefined(e)?document.body:e}return t(r,e),r.prototype.loader_icon="/assets/images/ajax-loader.gif",r.prototype.loader_class="ajax-loader",r.prototype.holder=void 0,r.prototype.loader=void 0,r.prototype.addLoader=function(){var e;return e={el:"div",opt:{className:this.loader_class},nested:{el:"img",opt:{src:this.loader_icon,alt:"Loading"}}},this.loader=this.addSingleElement(e,this.holder),this.loader},r.prototype.getElementSize=function(e){return this.width=e.clientWidth||e.scrollWidth||e.offsetWidth,this.height=e.clientHeight||e.scrollHeight||e.offsetHeight,[this.width,this.height]},r.prototype.getHolderSize=function(){if(this.holder===document.body)return this.getWindowSize();if(s.isElement(this.holder))return this.getElementSize(this.holder)},r.prototype.getWindowSize=function(){var e,t,n;return t=document,n=t.documentElement,e=t.body,this.width=window.innerWidth||n.clientWidth||e.clientWidth,this.height=window.innerHeight||n.clientHeight||e.clientHeight,[this.width,this.height]},r.prototype.loadItem=function(e){return this.removeLoader(),this.addLoader(),n(e).on("load",{remove:this.removeLoader,that:this},function(e){return e.data.remove.call(e.data.that)})},r.prototype.removeLoader=function(){if(!s.isUndefined(this.loader))return this.removeElement(this.loader),this.loader=void 0},r}(i)})}).call(this);