(function() {
  define(function(require) {
    var ManageElements, _;
    _ = require('underscore');
    return ManageElements = (function() {
      ManageElements.prototype.elements = [];

      function ManageElements(opt, initialize) {
        if (initialize == null) {
          initialize = true;
        }
      }

      ManageElements.prototype.createElement = function(el, options) {
        var item, opt, txt, value;
        if (options == null) {
          options = {};
        }
        item = document.createElement(el);
        for (opt in options) {
          value = options[opt];
          if (options.hasOwnProperty(opt)) {
            if (opt === ("textNode" || "text")) {
              txt = document.createTextNode(value);
              item.appendChild(txt);
            } else {
              item[opt] = value;
            }
          }
        }
        return item;
      };

      ManageElements.prototype.addMultipleElements = function(array, holder) {
        var el, element, els, i, _i, _len;
        if (_.isArray(array)) {
          els = [];
          for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
            element = array[i];
            if (_.isObject(element)) {
              el = this.addSingleElement(element, holder);
            } else {
              return null;
            }
            els.push(el);
            this.elements.push(el);
          }
          return els;
        }
        return null;
      };

      ManageElements.prototype.addSingleElement = function(obj, holder) {
        var el, elName, nested_el, opts;
        if (_.isObject(obj)) {
          if (_.has(obj, "el")) {
            elName = obj.el;
          }
          if (_.has(obj, "opt")) {
            opts = obj.opt;
          }
          if (!_.isUndefined(elName)) {
            el = this.createElement(elName, opts);
          }
          if (_.has(obj, "nested")) {
            if (_.isArray(obj.nested)) {
              nested_el = this.addMultipleElements(obj.nested, el);
            } else if (_.isObject(obj.nested)) {
              nested_el = this.addSingleElement(obj.nested, el);
            } else {

            }
          }
          if (!_.isUndefined(holder)) {
            holder.appendChild(el);
            this.elements.push({
              el: el,
              nested: nested_el
            });
          }
          return el;
        }
        return null;
      };

      ManageElements.prototype.removeElement = function(node) {
        return node.parentNode.removeChild(node);
      };

      return ManageElements;

    })();
  });

}).call(this);
