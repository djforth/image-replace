define (require) ->
  $           = require('jquery')
  _           = require('underscore')
  ManageElements = require('utils/manage_elements')

  class Loader extends ManageElements
    loader_icon:"/assets/images/ajax-loader.gif"
    loader_class:"ajax-loader"
    holder:undefined
    loader:undefined

    constructor:(holder, opt, initialize=true)->
      @holder = if _.isUndefined(holder) then document.body else holder


    addLoader:()->
      el = {el:"div", opt:{className:@loader_class}, nested:{el:"img", opt:{src:@loader_icon, alt:"Loading"}}}
      # # console.log "holder", @holder
      @loader = @addSingleElement(el, @holder)
      # # console.log "Loader", @loader
      @loader

    getElementSize:(h)->
      @width = h.clientWidth || h.scrollWidth || h.offsetWidth;
      @height = h.clientHeight || h.scrollHeight || h.offsetHeight;
      [@width, @height]


    getHolderSize:()->
     if @holder == document.body
      return @getWindowSize();
     else if _.isElement(@holder)
       return @getElementSize(@holder)


    getWindowSize:()->
     d = document
     root= d.documentElement
     body= d.body;
     @width = window.innerWidth || root.clientWidth || body.clientWidth
     @height = window.innerHeight || root.clientHeight || body.clientHeight
     [@width, @height]

    loadItem:(item)->
      @removeLoader()
      @addLoader()

      $(item).on "load", {remove:@removeLoader, that:@}, (e)->
        # alert "loaded"
        e.data.remove.call(e.data.that)

    removeLoader:()->

      unless _.isUndefined(@loader)

        @removeElement(@loader)
        @loader = undefined





