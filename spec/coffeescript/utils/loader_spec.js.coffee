describe "Loader", ->
  beforeEach ->
    flag = false

    @loader = undefined
    that = @

    @holder = document.createElement("div");
    @holder.id = "testHolder"
    document.body.appendChild(@holder)

    # @feature = new detect()
    require ['utils/loader'], (Loader) ->
      flag = true
      that.loader = new Loader(that.holder, {}, false)
      

    waitsFor ->
      flag

  it 'It should exist', ->
    expect(@loader).toBeDefined()

  describe 'should create an element', ->

    it "should create an element", ->
      el = @loader.addLoader()
      expect(el).toBeDefined()
      expect($(el)).toHaveClass("ajax-loader")
      expect($(el)).toContainHtml("<img src='/assets/ajax-loader.gif' alt='loader'")
   

  describe "should get the width and height of holder", ->

    beforeEach ->
      @el = document.createElement("div");
      @el.setAttribute("style", "width:300px;height:200px;display:block;float:left; border:1px solid red;")
      @holder.appendChild(@el)
      

    it "should get the element size", ->
      size= @loader.getElementSize(@el)
      expect(size[0]).toEqual(300)
      expect(size[1]).toEqual(200)


  afterEach ->
    @holder.parentNode.removeChild(@holder)


