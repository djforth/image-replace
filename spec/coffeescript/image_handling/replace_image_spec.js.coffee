

describe "ReplaceImage", ->

  beforeEach ->
    flag = false



    @r_img = undefined
    that = @

    # throw(jasmine.getFixtures().fixturesPath)

    loadFixtures "image_replace.html"
    # throw $("body").html()

    @holder = document.getElementsByClassName("screenshots")[0];
    @holder.setAttribute('id',"testHolder")

    # @feature = new detect()
    require ['image_handling/replace_image'], (ReplaceImage) ->
      flag = true
      that.r_img = new ReplaceImage(undefined, true, {}, false)



    waitsFor ->
      flag

  it 'It should exist', ->
    # throw(@r_img)
    expect(@r_img).toBeDefined()


  describe 'Should find an image', ->

    it 'Should find the main image', ->
      @img = @r_img.findImage()
      expect(@img.src).toMatch("/uploads/asset/file/1/AB0004_about_1.2.1.jpg")
      expect(@img.alt).toEqual("Ab0004_about_1.2.1")

  describe "Should get new image details", ->

    beforeEach ->
      @img = document.getElementById("test")


    it "Returns an obj with details", ->
      obj = @r_img.getNewImg(@img)
      expect(obj).toEqual({title:"About 1", img:"/uploads/asset/file/1/AB0004_about_1.2.1.jpg"})

  describe "Sets image styles -", ->

    beforeEach ->
      holder = document.getElementById("main_image")
      @img = holder.getElementsByTagName('img')[0]
      @attr ={title:"Testing", img:"/assets/Evil-Bert.jpg"}

    it "Should set new image details", ->


      change = @r_img.changeImg(@img, @attr)
      expect(@img.src).toMatch("/assets/Evil-Bert.jpg")
      expect(@img.alt).toEqual("Testing")
      expect(change).toBeTruthy()


    it "Should Not load image if already loaded", ->
      attr2 = {title:"Ab0004_about_1.2.1", img:"/uploads/asset/file/1/AB0004_about_1.2.1.jpg"}
      change = @r_img.changeImg(@img, attr2)
      expect(change).toBeFalsy()



  describe "Adds Caption to image", ->
    beforeEach ->
      @cap = document.getElementsByTagName('figcaption')[0]

    it 'Should find the figcaption', ->
      cap = @r_img.findCaption()
      expect($(cap)).toHaveText("Some Caption")


    it 'Should change Caption', ->
      expect($(@cap)).toHaveText("Some Caption")
      @r_img.replaceCaption(@cap, "New Caption")
      expect($(@cap)).toHaveText("New Caption")



