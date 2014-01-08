require.config {
  baseUrl: "/assets/javascripts"
  paths:
    jquery:'lib/jquery.min'
    underscore: 'lib/underscore-min'
    carousel:'carousel'
    utils:'utils'
    test:'test'
}


require [
  'image_handling/replace_image'
], (ReplaceImage) ->

    replace = document.querySelectorAll(".screenshots")

    if replace.length > 0
      @replace_image = new ReplaceImage()
