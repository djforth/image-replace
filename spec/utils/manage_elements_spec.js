(function() {
  describe("Manage Elements", function() {
    beforeEach(function() {
      var flag, that;
      flag = false;
      this.elements = void 0;
      that = this;
      require(['utils/manage_elements'], function(ManageElements) {
        flag = true;
        return that.elements = new ManageElements(false);
      });
      return waitsFor(function() {
        return flag;
      });
    });
    it('It should exist', function() {
      return expect(this.elements).toBeDefined();
    });
    describe('should create an element', function() {
      it("should create an element", function() {
        var el;
        el = this.elements.createElement('div', {
          id: "test"
        });
        expect(el).toBeDefined();
        return expect($(el)).toBe('div#test');
      });
      return it("should create a text element", function() {
        var el_txt;
        el_txt = this.elements.createElement('div', {
          id: "text",
          textNode: "some text"
        });
        expect(el_txt).toBeDefined();
        expect($(el_txt)).toBe('div#text');
        return expect($(el_txt)).toContainText('some text');
      });
    });
    return describe("should create deeply nested items", function() {
      beforeEach(function() {
        this.holder = document.createElement("div");
        this.holder.id = "testHolder";
        return document.body.appendChild(this.holder);
      });
      it("should create deeply nested elements", function() {
        var el, obj;
        obj = {
          el: "div",
          opt: {
            id: "nested"
          },
          nested: {
            el: "div",
            opt: {
              id: "nested2"
            }
          }
        };
        el = this.elements.addSingleElement(obj, document.body);
        expect(el).toBeDefined();
        expect($(el)).toBe('div#nested');
        return expect($(el).find("#nested2")).toBe('div#nested2');
      });
      it("should create multiple deep nested elements", function() {
        var array, els;
        array = [
          {
            el: "div",
            opt: {
              className: "root"
            }
          }, {
            el: "div",
            opt: {
              className: "root"
            },
            nested: [
              {
                el: "div",
                opt: {
                  className: "nested2"
                }
              }, {
                el: "div",
                opt: {
                  className: "nested2"
                },
                nested: [
                  {
                    el: "div",
                    opt: {
                      className: "nested3"
                    }
                  }, {
                    el: "div",
                    opt: {
                      className: "nested3"
                    }
                  }
                ]
              }
            ]
          }
        ];
        els = this.elements.addMultipleElements(array, document.body);
        console.log(els);
        expect(els.length).toEqual(2);
        expect($(".root")).toHaveLength(2);
        expect($(".nested2")).toHaveLength(2);
        return expect($(".nested3")).toHaveLength(2);
      });
      return afterEach(function() {
        return this.holder.parentNode.removeChild(this.holder);
      });
    });
  });

}).call(this);
