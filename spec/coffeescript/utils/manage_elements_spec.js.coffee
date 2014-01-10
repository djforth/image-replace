describe "Manage Elements", ->
  beforeEach ->
    flag = false

    @elements = undefined
    that = @

    # @feature = new detect()
    require ['utils/manage_elements'], (ManageElements) ->
      flag = true
      # console.log ManageElements
      that.elements = new ManageElements(false)
      

    waitsFor ->
      flag

  it 'It should exist', ->
    expect(@elements).toBeDefined()


  describe 'should create an element', ->

    it "should create an element", ->
      el = @elements.createElement('div', {id:"test"})      
      expect(el).toBeDefined()
      expect($(el)).toBe('div#test')

    it "should create a text element", ->
      el_txt = @elements.createElement('div', {id:"text", textNode:"some text"})      
      expect(el_txt).toBeDefined()
      expect($(el_txt)).toBe('div#text')
      expect($(el_txt)).toContainText('some text')
      


  describe "should create deeply nested items", ->
    beforeEach ->
      @holder = document.createElement("div");
      @holder.id = "testHolder"
      document.body.appendChild(@holder)

    it "should create deeply nested elements", ->
      obj = {
          el:"div", 
          opt:{id:"nested"}, 
          nested:{el:"div", opt:{id:"nested2"}}
        }
      el = @elements.addSingleElement(obj, document.body)
      expect(el).toBeDefined()
      expect($(el)).toBe('div#nested')
      expect($(el).find("#nested2")).toBe('div#nested2')

    it "should create multiple deep nested elements", ->
      array = [{el:"div", opt:{className:"root"}}, {el:"div", opt:{className:"root"}, nested:[{el:"div", opt:{className:"nested2"}}, {el:"div", opt:{className:"nested2"}, nested:[{el:"div", opt:{className:"nested3"}}, {el:"div", opt:{className:"nested3"}}]}]}]

      els = @elements.addMultipleElements(array, document.body)
      console.log els
      expect(els.length).toEqual(2)
      expect($(".root")).toHaveLength(2)
      expect($(".nested2")).toHaveLength(2)
      expect($(".nested3")).toHaveLength(2)
      

    afterEach ->
      @holder.parentNode.removeChild(@holder)
      
