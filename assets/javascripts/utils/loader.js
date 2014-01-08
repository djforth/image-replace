(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var $, Loader, ManageElements, _;
    $ = require('jquery');
    _ = require('underscore');
    ManageElements = require('utils/manage_elements');
    return Loader = (function(_super) {
      __extends(Loader, _super);

      Loader.prototype.loader_icon = "/assets/images/ajax-loader.gif";

      Loader.prototype.loader_class = "ajax-loader";

      Loader.prototype.holder = void 0;

      Loader.prototype.loader = void 0;

      function Loader(holder, opt, initialize) {
        if (initialize == null) {
          initialize = true;
        }
        this.holder = _.isUndefined(holder) ? document.body : holder;
      }

      Loader.prototype.addLoader = function() {
        var el;
        el = {
          el: "div",
          opt: {
            className: this.loader_class
          },
          nested: {
            el: "img",
            opt: {
              src: this.loader_icon,
              alt: "Loading"
            }
          }
        };
        this.loader = this.addSingleElement(el, this.holder);
        return this.loader;
      };

      Loader.prototype.getElementSize = function(h) {
        this.width = h.clientWidth || h.scrollWidth || h.offsetWidth;
        this.height = h.clientHeight || h.scrollHeight || h.offsetHeight;
        return [this.width, this.height];
      };

      Loader.prototype.getHolderSize = function() {
        if (this.holder === document.body) {
          return this.getWindowSize();
        } else if (_.isElement(this.holder)) {
          return this.getElementSize(this.holder);
        }
      };

      Loader.prototype.getWindowSize = function() {
        var body, d, root;
        d = document;
        root = d.documentElement;
        body = d.body;
        this.width = window.innerWidth || root.clientWidth || body.clientWidth;
        this.height = window.innerHeight || root.clientHeight || body.clientHeight;
        return [this.width, this.height];
      };

      Loader.prototype.loadItem = function(item) {
        this.removeLoader();
        this.addLoader();
        return $(item).on("load", {
          remove: this.removeLoader,
          that: this
        }, function(e) {
          return e.data.remove.call(e.data.that);
        });
      };

      Loader.prototype.removeLoader = function() {
        if (!_.isUndefined(this.loader)) {
          this.removeElement(this.loader);
          return this.loader = void 0;
        }
      };

      return Loader;

    })(ManageElements);
  });

}).call(this);
