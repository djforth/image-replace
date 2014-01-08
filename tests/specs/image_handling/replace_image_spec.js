(function() {
  describe("ReplaceImage", function() {
    beforeEach(function() {
      var flag, that;
      flag = false;
      this.r_img = void 0;
      that = this;
      loadFixtures("image_replace");
      this.holder = document.getElementsByClassName("screenshots")[0];
      this.holder.setAttribute('id', "testHolder");
      require(['image_handling/replace_image'], function(ReplaceImage) {
        flag = true;
        return that.r_img = new ReplaceImage(void 0, true, {}, false);
      });
      return waitsFor(function() {
        return flag;
      });
    });
    it('It should exist', function() {
      return expect(this.r_img).toBeDefined();
    });
    describe('Should find an image', function() {
      return it('Should find the main image', function() {
        this.img = this.r_img.findImage();
        expect(this.img.src).toEqual("http://localhost:3000/uploads/asset/file/1/AB0004_about_1.2.1.jpg");
        return expect(this.img.alt).toEqual("Ab0004_about_1.2.1");
      });
    });
    describe("Should get new image details", function() {
      beforeEach(function() {
        return this.img = document.getElementById("test");
      });
      return it("Returns an obj with details", function() {
        var obj;
        obj = this.r_img.getNewImg(this.img);
        return expect(obj).toEqual({
          title: "About 1",
          img: "/uploads/asset/file/1/AB0004_about_1.2.1.jpg"
        });
      });
    });
    describe("Sets image styles -", function() {
      beforeEach(function() {
        var holder;
        holder = document.getElementById("main_image");
        this.img = holder.getElementsByTagName('img')[0];
        return this.attr = {
          title: "Testing",
          img: "/assets/Evil-Bert.jpg"
        };
      });
      it("Should set new image details", function() {
        var change;
        change = this.r_img.changeImg(this.img, this.attr);
        expect(this.img.src).toEqual("http://localhost:3000/assets/Evil-Bert.jpg");
        expect(this.img.alt).toEqual("Testing");
        return expect(change).toBeTruthy();
      });
      return it("Should Not load image if already loaded", function() {
        var attr2, change;
        attr2 = {
          title: "Ab0004_about_1.2.1",
          img: "/uploads/asset/file/1/AB0004_about_1.2.1.jpg"
        };
        change = this.r_img.changeImg(this.img, attr2);
        return expect(change).toBeFalsy();
      });
    });
    return describe("Adds Caption to image", function() {
      beforeEach(function() {
        return this.cap = document.getElementsByTagName('figcaption')[0];
      });
      it('Should find the figcaption', function() {
        var cap;
        cap = this.r_img.findCaption();
        return expect($(cap)).toHaveText("Some Caption");
      });
      return it('Should change Caption', function() {
        expect($(this.cap)).toHaveText("Some Caption");
        this.r_img.replaceCaption(this.cap, "New Caption");
        return expect($(this.cap)).toHaveText("New Caption");
      });
    });
  });

}).call(this);
