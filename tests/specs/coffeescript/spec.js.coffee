
# specs            = "specs/"
jsFolder         = "/assets/javascripts/"
lib              = jsFolder+"lib/"
specHelpers      = "/tests/lib/"
jasmineFolder    = specHelpers + "jasmine-1.3.1/";

@styles = document.createElement("link");
@styles.media= "screen"
@styles.rel= "stylesheet"
@styles.href= "/assets/stylesheets/screen.css"
document.head.appendChild(@styles);

require.config {
  baseUrl: "/tests/",
  urlArgs: "cb=" + Math.random(),
  paths:{
    jasmine: jasmineFolder + "jasmine",
    jasmineHtml: jasmineFolder + "jasmine-html",
    'jquery':lib+'jquery.min'
    'underscore': lib+'underscore-min'
    'sinon':specHelpers+'sinon-1.6.0'
    'jasmine-sinon':specHelpers+'jasmine-sinon'
    'jasmine-jquery':specHelpers+'jasmine-jquery'
    utils:jsFolder+'utils'
    image_handling:jsFolder+"image_handling"
    imgh_spec: "image_handling"

    u_spec: "utils"
  },
  shim: {
    underscore:
        exports: '_'
   jasmine: {
      exports: "jasmine"
    },
    jasmineHtml: ["jasmine"],
    jasmineJquery: ["jasmine"],
    jquery: {
      exports: "$"
    }
  }
}


require ['jquery', 'underscore', "jasmine", 'jasmine-jquery', "sinon", "jasmine-sinon", ], () ->

    _.templateSettings =
        interpolate : /\[\%\=(.+?)\%\]/g
        evaluate: /\[\%(.+?)\%\]/g

    # console.log "Am I?", jasmine.getFixtures().fixturesPath

    jasmine.getFixtures().fixturesPath = "fixtures"

    # console.log "Am I?", jasmine.getFixtures().fixturesPath


    jasmineEnv = jasmine.getEnv()
    window.jas =  jasmineEnv
    jasmineEnv.updateInterval = 1000
    htmlReporter = new jasmine.HtmlReporter()
    jasmineEnv.addReporter htmlReporter
    jasmineEnv.specFilter = (spec) ->
        htmlReporter.specFilter spec

    specs = [
      # 'c_spec/carousel_spec',
      # 'c_spec/carousel.css_spec',
      # 'c_spec/carousel.touch_spec',
      # 'c_spec/carousel.ani_spec',
      # 'f_spec/filters_spec',
      'imgh_spec/replace_image_spec',
      # 'imgh_spec/responsive_image_spec',
      # 'n_spec/endless_scroll_spec',
      # 'n_spec/nav_spec'
      'u_spec/loader_spec'
      'u_spec/manage_elements_spec'
      # 'u_spec/replace_image_spec'
    ]

    require specs, ->
        console.log "huh?"
        jasmineEnv.execute()

# require ['jquery', 'underscore', 'sinon', 'jasmine-jquery', 'jasmine-sinon', 'runner'], () ->
#   console.log "running"

#   jasmine.getFixtures().fixturesPath = "/assets/fixtures/"


# define "runner", ['carousel_spec'], ()->
#     console.log "Working?"
#     jasmine.getEnv().execute()
  # c_css_spec()




