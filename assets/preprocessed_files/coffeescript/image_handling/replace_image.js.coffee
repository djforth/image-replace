define (require) ->
  $      = require('jquery')
  _      = require('underscore')
  Loader = require('utils/loader')

  class ReplaceImage
    # holderID:"container"
    caption:false
    fig:"figure"
    element:".screenshots li a"
    main_img:"main_image"
    # jq_image:"#"+@main_img
    # container:"screenshots"
    holder:null
    img:undefined
    figcap:undefined
    loader:null


    constructor: (holder=undefined, caption=false, opt={}, initialize=true) ->
      # @holderID = holder unless _.isUndefined(holder)
      @setDefaults(opt) if _.isObject(opt)

      @holder = if _.isUndefined(holder) then document.body else holder
      @caption = caption

      @init() if initialize

    addClick:()->

      $(@holder).on "click", @element, {callback:@replaceImage, that:@}, (e) ->
        if  e.preventDefault
          e.preventDefault()
        else
          e.cancelBubble = true
          e.returnValue = false

        e.data.callback.call(e.data.that, e.target)


    changeImg:(img, attr)->
      if img.getAttribute('src') == attr.img
        return false
      else
        img.setAttribute('src', attr.img+ "?" + new Date().getTime())
        img.setAttribute('alt', attr.title)
        return true

    init: ->
      @addClick()
      @loader = new Loader(document.getElementById(@main_img))

    getNewImg:(item)->
      {title:item.getAttribute("title"), img:item.getAttribute("href")}

    replaceImage:(item) ->
      @img = @findImage()
      attributes = @getNewImg(item)
      if @changeImg(@img, attributes)
        @loader.loadItem(@img)
        @replaceCaption(title) if @caption

    findImage:()->
      imgholder = document.getElementById(@main_img)
      img = imgholder.getElementsByTagName('img')
      img[0]

    findCaption:()->
      fig = @holder.getElementsByTagName(@fig)
      fig[0].getElementsByTagName('figcaption')[0]

    replaceCaption:(cap, txt)->
      new_cap = document.createTextNode(txt)
      old = cap.replaceChild(new_cap, cap.firstChild)

    # imageLoader:()->
    #   @loader.removeLoader()
    #   @loader.addLoader()
    #   that = @
    #   $(@img).off "load"
    #   $(@img).on "load", ()->
    #     # console.log "loaded", that.loader
    #     that.loader.removeLoader.call(that.loader)

    setDefaults:(opt)->
      @fig = opt.fig if _.isString(opt.fig)
      @element = opt.element if _.isString(opt.element)
      @main_img = opt.main_img if _.isString(opt.main_img)


# $(document).ready ->
#   window.img_rep = new ReplaceImage()
#   img_rep.init()