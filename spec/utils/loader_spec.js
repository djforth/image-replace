(function() {
  describe("Loader", function() {
    beforeEach(function() {
      var flag, that;
      flag = false;
      this.loader = void 0;
      that = this;
      this.holder = document.createElement("div");
      this.holder.id = "testHolder";
      document.body.appendChild(this.holder);
      require(['utils/loader'], function(Loader) {
        flag = true;
        return that.loader = new Loader(that.holder, {}, false);
      });
      return waitsFor(function() {
        return flag;
      });
    });
    it('It should exist', function() {
      return expect(this.loader).toBeDefined();
    });
    describe('should create an element', function() {
      return it("should create an element", function() {
        var el;
        el = this.loader.addLoader();
        expect(el).toBeDefined();
        expect($(el)).toHaveClass("ajax-loader");
        return expect($(el)).toContainHtml("<img src='/assets/ajax-loader.gif' alt='loader'");
      });
    });
    describe("should get the width and height of holder", function() {
      beforeEach(function() {
        this.el = document.createElement("div");
        this.el.setAttribute("style", "width:300px;height:200px;display:block;float:left; border:1px solid red;");
        return this.holder.appendChild(this.el);
      });
      return it("should get the element size", function() {
        var size;
        size = this.loader.getElementSize(this.el);
        expect(size[0]).toEqual(300);
        return expect(size[1]).toEqual(200);
      });
    });
    return afterEach(function() {
      return this.holder.parentNode.removeChild(this.holder);
    });
  });

}).call(this);
