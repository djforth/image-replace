(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var $, Carousel, CarouselAni, _, _ref;
    $ = require('jquery');
    _ = require('underscore');
    Carousel = require('carousel/carousel.main');
    return CarouselAni = (function(_super) {
      __extends(CarouselAni, _super);

      function CarouselAni() {
        _ref = CarouselAni.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CarouselAni.prototype.animateCarousel = function(item, data, that) {
        return item.animate({
          left: data.move
        }, 200, function() {
          return that.finishAnimation.call(that, $(this), data.select, data.css);
        });
      };

      CarouselAni.prototype.finishAnimation = function(item, select, start_css) {
        if (select) {
          item.removeClass(start_css);
        }
        item.removeAttr('style');
        if (select) {
          item.addClass(this.selected);
        } else {
          item.removeClass(this.selected);
        }
        return item.addClass(this.item_class);
      };

      CarouselAni.prototype.getDocWidth = function() {
        return $(document).width();
      };

      CarouselAni.prototype.getInAmount = function(dir) {
        var w;
        if (dir == null) {
          dir = 'right';
        }
        w = this.getDocWidth();
        if (dir === 'right') {
          return 0 - w;
        } else {
          return w;
        }
      };

      CarouselAni.prototype.getOutAmount = function(dir) {
        var w;
        if (dir == null) {
          dir = 'right';
        }
        w = this.getDocWidth();
        if (dir === 'right') {
          return w;
        } else {
          return 0 - w;
        }
      };

      CarouselAni.prototype.moveCarousel = function(dir) {
        var css, current, in_mover, item, out_mover;
        if (dir == null) {
          dir = "right";
        }
        current = this.getSelected();
        item = dir === "left" ? this.getNextItem(current, false) : this.getNextItem(current);
        css = dir === "left" ? this.left_classes : this.right_classes;
        in_mover = this.getInAmount(dir);
        out_mover = this.getOutAmount(dir);
        this.transitionsIn(item, css.start, in_mover);
        return this.transitionsOut(current, out_mover);
      };

      CarouselAni.prototype.transitionsIn = function(item, css, starter) {
        item.removeClass(this.item_class);
        item.addClass(css);
        item.css("left", starter);
        return _.defer(this.animateCarousel, item, {
          css: css,
          move: 0,
          select: true
        }, this);
      };

      CarouselAni.prototype.transitionsOut = function(item, starter) {
        return _.defer(this.animateCarousel, item, {
          css: "",
          move: starter,
          select: false
        }, this);
      };

      return CarouselAni;

    })(Carousel);
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var $, Carousel, CarouselCSS, _, _ref;
    $ = require('jquery');
    _ = require('underscore');
    Carousel = require('carousel/carousel.main');
    return CarouselCSS = (function(_super) {
      __extends(CarouselCSS, _super);

      function CarouselCSS() {
        _ref = CarouselCSS.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CarouselCSS.prototype.CSSTransitions = "";

      CarouselCSS.prototype.cssTransitionsIn = function(item, css) {
        this.transitionCSSStart(item, css);
        this.setCSSTransitions(item, this.in_class);
        return this.trackTransition(item, css, true);
      };

      CarouselCSS.prototype.cssTransitionsOut = function(item, css) {
        this.removeSelect(item);
        this.transitionCSSStart(item, css);
        return this.trackTransition(item, css, false);
      };

      CarouselCSS.prototype.finishCSS = function(item, transCSS, selected) {
        if (selected == null) {
          selected = true;
        }
        $(item).removeClass(this.in_class).removeClass(transCSS);
        if (selected) {
          $(item).addClass(this.selected);
        }
        $(item).addClass(this.item_class);
        return $(item).off("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd");
      };

      CarouselCSS.prototype.moveCarousel = function(dir) {
        var css, current, item;
        if (dir == null) {
          dir = "right";
        }
        current = this.getSelected();
        item = dir === "left" ? this.getNextItem(current, false) : this.getNextItem(current);
        css = dir === "left" ? this.left_classes : this.right_classes;
        this.cssTransitionsIn(item, css.start);
        return this.cssTransitionsOut(current, css.out);
      };

      CarouselCSS.prototype.setCSSTransitions = function(id, move) {
        return _.defer(function(id, move) {
          return $(id).addClass(move);
        }, id, move);
      };

      CarouselCSS.prototype.transitionCSSStart = function(item, start) {
        return $(item).removeClass(this.item_class).addClass(start);
      };

      CarouselCSS.prototype.trackTransition = function(item, css, selected) {
        return $(item).on("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd", {
          callback: this.finishCSS,
          css: css,
          call: this,
          selected: selected
        }, function(e) {
          return e.data.callback.call(e.data.call, this, css, selected);
        });
      };

      return CarouselCSS;

    })(Carousel);
  });

}).call(this);

(function() {
  define(function(require) {
    var $, Carousel, Detect, _;
    $ = require('jquery');
    _ = require('underscore');
    Detect = require("utils/detect");
    return Carousel = (function() {
      Carousel.prototype.holder = "#project_outer";

      Carousel.prototype.buttons = {
        left: "#left",
        right: "#right"
      };

      Carousel.prototype.in_class = "carousel-in";

      Carousel.prototype.item = ".slug";

      Carousel.prototype.item_class = 'carousel-items';

      Carousel.prototype.left_classes = {
        start: 'carousel-start-reverse',
        out: 'carousel-out-reverse'
      };

      Carousel.prototype.right_classes = {
        start: 'carousel-start',
        out: 'carousel-out'
      };

      Carousel.prototype.selected = "carousel-selected";

      Carousel.prototype.items = 0;

      Carousel.prototype.section_limit = 0;

      function Carousel(opt, initialize) {
        if (opt == null) {
          opt = {};
        }
        if (initialize == null) {
          initialize = true;
        }
        if (!_.isEmpty(opt)) {
          if (_.isString(opt.holder)) {
            this.holder = opt.holder;
          }
          if (_.isObject(opt.buttons)) {
            this.buttons = opt.buttons;
          }
          if (_.isString(opt.item)) {
            this.item = opt.item;
          }
        }
        if (initialize) {
          this.init();
        }
      }

      Carousel.prototype.animateItem = function(item, move) {
        return item.animate({
          left: move
        }, 200, function() {
          return $(this);
        });
      };

      Carousel.prototype.applyButtons = function() {
        $('body').off("click", this.buttons.left);
        $('body').on("click", this.buttons.left, {
          dir: "left",
          callback: this.moveCarousel,
          call: this
        }, function(e) {
          e.preventDefault();
          return e.data.callback.call(e.data.call, e.data.dir);
        });
        $('body').off("click", this.buttons.right);
        return $('body').on("click", this.buttons.right, {
          dir: "right",
          callback: this.moveCarousel,
          call: this
        }, function(e) {
          e.preventDefault();
          return e.data.callback.call(e.data.call, e.data.dir);
        });
      };

      Carousel.prototype.createItems = function(slugs, id) {
        $(this.holder).append("<div id='" + id + "' class='" + this.item_class + "'></div>");
        return $("#" + id).html(slugs);
      };

      Carousel.prototype.getItems = function() {
        return this.items = $(this.holder).find(this.item);
      };

      Carousel.prototype.getNextItem = function(current, next) {
        var item;
        if (next == null) {
          next = true;
        }
        if (next) {
          item = current.next();
          if (item.length < 1) {
            item = $(this.holder).children("." + this.item_class).first();
          }
        } else {
          item = current.prev();
          if (item.length < 1) {
            item = $(this.holder).children("." + this.item_class).last();
          }
        }
        return item;
      };

      Carousel.prototype.getSelected = function() {
        var selected;
        selected = $(this.holder).find("." + this.selected).first();
        if (_.isUndefined(selected)) {
          return $(this.holder).children("." + this.item_class).first();
        } else {
          return selected;
        }
      };

      Carousel.prototype.getAmount = function() {
        var item_width, width;
        width = $(this.holder).innerWidth();
        item_width = $(this.items[0]).outerWidth(true);
        return this.section_limit = Math.floor(width / item_width);
      };

      Carousel.prototype.init = function() {
        this.getItems();
        this.getAmount();
        this.wrapItems();
        this.applyButtons();
        return this.moniterResize();
      };

      Carousel.prototype.moniterResize = function() {
        return $(window).on('resize orientationchange', {
          resize: this.resize,
          c: this
        }, function(e) {
          return e.data.resize.call(e.data.c);
        });
      };

      Carousel.prototype.moveCarousel = function(dir) {
        var css, current, item;
        if (dir == null) {
          dir = "right";
        }
        current = this.getSelected();
        item = dir === "left" ? this.getNextItem(current, false) : this.getNextItem(current);
        return css = dir === "left" ? this.left_classes : this.right_classes;
      };

      Carousel.prototype.removeSelect = function(item) {
        return $(item).removeClass(this.selected);
      };

      Carousel.prototype.resize = function() {
        this.items.unwrap();
        $(this.item_class).remove();
        this.getAmount();
        return this.wrapItems();
      };

      Carousel.prototype.selectedItem = function(item) {
        return $(item).addClass(this.selected);
      };

      Carousel.prototype.transitionsOut = function(item, css) {
        return this.removeSelect(item);
      };

      Carousel.prototype.wrapItems = function() {
        var i, n, slugs, _i, _ref, _ref1;
        n = 0;
        for (i = _i = 0, _ref = this.items.length, _ref1 = this.section_limit; _ref1 > 0 ? _i < _ref : _i > _ref; i = _i += _ref1) {
          n++;
          slugs = this.items.slice(i, i + this.section_limit);
          this.createItems(slugs, "inner" + n);
        }
        return this.selectedItem("#inner1");
      };

      return Carousel;

    })();
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var $, CarouselCss, CarouselTouch, _, _ref;
    $ = require('jquery');
    _ = require('underscore');
    CarouselCss = require('carousel/carousel.css');
    return CarouselTouch = (function(_super) {
      __extends(CarouselTouch, _super);

      function CarouselTouch() {
        _ref = CarouselTouch.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CarouselTouch.prototype.startX = null;

      CarouselTouch.prototype.moveX = null;

      CarouselTouch.prototype.direction = null;

      CarouselTouch.prototype.touch_area = null;

      CarouselTouch.prototype.touchID = "project_outer";

      CarouselTouch.prototype.init = function() {
        CarouselTouch.__super__.init.call(this);
        this.getTouchArea();
        return this.startTouch();
      };

      CarouselTouch.prototype.getMoveInfo = function(e) {
        var that, touch;
        e.preventDefault();
        touch = this.processTouchData(e.touches);
        this.startX = touch.pageX;
        that = this;
        this.touch_area.on('touchmove', {
          callback: this.touchMove,
          c: this
        }, function(e) {
          return e.data.callback.call(e.data.c, e.originalEvent);
        });
        return this.touch_area.on('touchend', {
          callback: this.touchEnd,
          c: this
        }, function(e) {
          return e.data.callback.call(e.data.c, e.originalEvent);
        });
      };

      CarouselTouch.prototype.getTouchArea = function() {
        return this.touch_area = $(this.holder);
      };

      CarouselTouch.prototype.processTouchData = function(touches) {
        return touches[0];
      };

      CarouselTouch.prototype.startTouch = function() {
        var that;
        that = this;
        if (this.touch_area) {
          return this.touch_area.on('touchstart', {
            callback: this.getMoveInfo,
            c: this
          }, function(e) {
            return e.data.callback.call(e.data.c, e.originalEvent);
          });
        }
      };

      CarouselTouch.prototype.touchCancel = function() {
        this.touch_area.off('touchmove');
        return this.touch_area.off('touchend');
      };

      CarouselTouch.prototype.touchDirection = function() {
        if (this.startX < this.moveX) {
          return "right";
        } else {
          return "left";
        }
      };

      CarouselTouch.prototype.touchEnd = function() {
        this.touchCancel();
        return this.moveCarousel(this.touchDirection());
      };

      CarouselTouch.prototype.touchMove = function(e) {
        var touch;
        e.preventDefault();
        if (this.touchStop(e.touches)) {
          return this.touchCancel();
        } else {
          touch = this.processTouchData(e.touches);
          return this.moveX = touch.pageX;
        }
      };

      CarouselTouch.prototype.touchStop = function(touches) {
        return touches.length > 1;
      };

      return CarouselTouch;

    })(CarouselCss);
  });

}).call(this);
