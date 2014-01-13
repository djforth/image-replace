define (require) ->
  _           = require('underscore')

  class ManageElements
    elements:[]

    constructor:(opt, initialize=true)->
      # # console.log "creating"


    createElement:(el, options={})->
      item = document.createElement(el)
      for opt, value of options
        if options.hasOwnProperty(opt)
          if opt == ("textNode" || "text")
            # # console.log "txt"
            txt = document.createTextNode(value)
            item.appendChild(txt)
          else
            # # console.log "attribute"
            item[opt] = value

      item

    addMultipleElements:(array, holder)->
      if _.isArray(array)
        els = []
        for element, i in array
          if _.isObject(element)
            el = @addSingleElement(element, holder)
          else
            # console.log "null"
            return null

          els.push(el)
          @elements.push(el)

        return els

      null

    addSingleElement:(obj, holder)->

      if _.isObject(obj)
        elName = obj.el if _.has(obj, "el")
        opts = obj.opt if _.has(obj, "opt")

        el = @createElement(elName, opts) unless _.isUndefined(elName)

        if _.has(obj, "nested")
          if _.isArray(obj.nested)
            nested_el =  @addMultipleElements(obj.nested, el)
          else if _.isObject(obj.nested)
            nested_el = @addSingleElement(obj.nested, el)
          else
            # console.log "NULL"

        unless _.isUndefined(holder)
          holder.appendChild(el)
          @elements.push({el:el, nested:nested_el})

        return el

      null


    removeElement:(node)->
      node.parentNode.removeChild(node)










