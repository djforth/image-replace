(function() {
  define(function(require) {
    var ImageResponsive, ManageEvents, _;
    _ = require('underscore');
    ManageEvents = require("utils/manage_events");
    return ImageResponsive = (function() {
      ImageResponsive.prototype.sizes = {};

      ImageResponsive.prototype.elements = null;

      ImageResponsive.prototype.screen_width = 0;

      ImageResponsive.prototype.screen_height = 0;

      ImageResponsive.prototype.eventHandler = void 0;

      function ImageResponsive(opt, initialize) {
        if (initialize == null) {
          initialize = true;
        }
        this.sizes = {
          mobile: 300,
          tablet: 640,
          desktop: 980
        };
        this.eventHandler = new ManageEvents();
        if (_.isObject(opt)) {
          this.setDefaults(opt);
        }
        if (initialize) {
          this.init();
        }
      }

      ImageResponsive.prototype.documentWidth = function() {
        return document.body.clientWidth;
      };

      ImageResponsive.prototype.getSizeType = function(w) {
        var key, near, type, value, _ref;
        type = null;
        near = null;
        _ref = this.sizes;
        for (key in _ref) {
          value = _ref[key];
          if (Math.abs(value - w < Math.abs(near - w || _.isNull(near)))) {
            type = key;
            near = value;
          }
        }
        return type;
      };

      ImageResponsive.prototype.init = function() {
        this.resizeEvent();
        return this.resizeHandler();
      };

      ImageResponsive.prototype.setBgSrc = function(type) {
        var bgs, reg, str;
        str = type + "Bg";
        reg = new RegExp(str);
        bgs = document.querySelectorAll("[data-" + type + "-bg]");
        return _.each(bgs, function(bg) {
          var bck, _ref, _results;
          _ref = bg.dataset;
          _results = [];
          for (type in _ref) {
            bck = _ref[type];
            if (reg.test(type)) {
              _results.push(bg.style.backgroundImage = "url(" + bck + ")");
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }, this);
      };

      ImageResponsive.prototype.setImageSrc = function(type) {
        var imgs, reg;
        reg = new RegExp(type);
        imgs = document.getElementsByTagName("img");
        return _.each(imgs, function(img) {
          var src, _ref, _results;
          _ref = img.dataset;
          _results = [];
          for (type in _ref) {
            src = _ref[type];
            if (reg.test(type)) {
              _results.push(img.setAttribute("src", src));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }, this);
      };

      ImageResponsive.prototype.setLinkSrc = function(type) {
        var links, reg;
        reg = new RegExp(type);
        links = document.querySelectorAll("a[data-" + type + "-href]");
        return _.each(links, function(link) {
          var href, _ref, _results;
          _ref = link.dataset;
          _results = [];
          for (type in _ref) {
            href = _ref[type];
            if (reg.test(type)) {
              _results.push(link.setAttribute("href", href));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }, this);
      };

      ImageResponsive.prototype.resizeEvent = function() {
        return this.eventHandler.addEvent(window, 'resize orientationchange load', {
          resize: this.resizeHandler,
          that: this
        }, function(e) {
          var r;
          r = e.data;
          return r.resize.call(r.that);
        });
      };

      ImageResponsive.prototype.resizeHandler = function(e) {
        var type, width;
        width = this.documentWidth();
        type = this.getSizeType(width);
        this.setImageSrc(type);
        this.setLinkSrc(type);
        return this.setBgSrc(type);
      };

      ImageResponsive.prototype.setDefaults = function(opt) {
        var additional, key, obj, value;
        if (_.has(opt, "desktop") && _.isNumber(opt.desktop)) {
          this.sizes.desktop = opt.desktop;
        }
        if (_.has(opt, "tablet") && _.isNumber(opt.tablet)) {
          this.sizes.tablet = opt.tablet;
        }
        if (_.has(opt, "mobile") && _.isNumber(opt.mobile)) {
          this.sizes.mobile = opt.mobile;
        }
        additional = _.omit(opt, ["desktop", "tablet", "mobile"]);
        if (!_.isEmpty(additional)) {
          obj = {};
          for (key in additional) {
            value = additional[key];
            if (_.isNumber(value)) {
              obj[key] = value;
            }
          }
          return _.extend(this.sizes, obj);
        }
      };

      return ImageResponsive;

    })();
  });

}).call(this);
