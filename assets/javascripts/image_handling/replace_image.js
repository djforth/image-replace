(function() {
  define(function(require) {
    var $, Loader, ReplaceImage, _;
    $ = require('jquery');
    _ = require('underscore');
    Loader = require('utils/loader');
    return ReplaceImage = (function() {
      ReplaceImage.prototype.caption = false;

      ReplaceImage.prototype.fig = "figure";

      ReplaceImage.prototype.element = ".screenshots li a";

      ReplaceImage.prototype.main_img = "main_image";

      ReplaceImage.prototype.holder = null;

      ReplaceImage.prototype.img = void 0;

      ReplaceImage.prototype.figcap = void 0;

      ReplaceImage.prototype.loader = null;

      function ReplaceImage(holder, caption, opt, initialize) {
        if (holder == null) {
          holder = void 0;
        }
        if (caption == null) {
          caption = false;
        }
        if (opt == null) {
          opt = {};
        }
        if (initialize == null) {
          initialize = true;
        }
        if (_.isObject(opt)) {
          this.setDefaults(opt);
        }
        this.holder = _.isUndefined(holder) ? document.body : holder;
        this.caption = caption;
        if (initialize) {
          this.init();
        }
      }

      ReplaceImage.prototype.addClick = function() {
        return $(this.holder).on("click", this.element, {
          callback: this.replaceImage,
          that: this
        }, function(e) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.cancelBubble = true;
            e.returnValue = false;
          }
          return e.data.callback.call(e.data.that, e.target);
        });
      };

      ReplaceImage.prototype.changeImg = function(img, attr) {
        if (img.getAttribute('src') === attr.img) {
          return false;
        } else {
          img.setAttribute('src', attr.img + "?" + new Date().getTime());
          img.setAttribute('alt', attr.title);
          return true;
        }
      };

      ReplaceImage.prototype.init = function() {
        this.addClick();
        return this.loader = new Loader(document.getElementById(this.main_img));
      };

      ReplaceImage.prototype.getNewImg = function(item) {
        return {
          title: item.getAttribute("title"),
          img: item.getAttribute("href")
        };
      };

      ReplaceImage.prototype.replaceImage = function(item) {
        var attributes;
        this.img = this.findImage();
        attributes = this.getNewImg(item);
        if (this.changeImg(this.img, attributes)) {
          this.loader.loadItem(this.img);
          if (this.caption) {
            return this.replaceCaption(title);
          }
        }
      };

      ReplaceImage.prototype.findImage = function() {
        var img, imgholder;
        imgholder = document.getElementById(this.main_img);
        img = imgholder.getElementsByTagName('img');
        return img[0];
      };

      ReplaceImage.prototype.findCaption = function() {
        var fig;
        fig = this.holder.getElementsByTagName(this.fig);
        return fig[0].getElementsByTagName('figcaption')[0];
      };

      ReplaceImage.prototype.replaceCaption = function(cap, txt) {
        var new_cap, old;
        new_cap = document.createTextNode(txt);
        return old = cap.replaceChild(new_cap, cap.firstChild);
      };

      ReplaceImage.prototype.setDefaults = function(opt) {
        if (_.isString(opt.fig)) {
          this.fig = opt.fig;
        }
        if (_.isString(opt.element)) {
          this.element = opt.element;
        }
        if (_.isString(opt.main_img)) {
          return this.main_img = opt.main_img;
        }
      };

      return ReplaceImage;

    })();
  });

}).call(this);
