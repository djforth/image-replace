
# specs            = "specs/"
jsFolder         = "/assets/javascripts/"
lib              = jsFolder+"lib/"
specHelpers      = "/tests/lib/"
# jasmineFolder    = specHelpers + "jasmine-1.3.1/";

@styles = document.createElement("link");
@styles.media= "screen"
@styles.rel= "stylesheet"
@styles.href= "/assets/stylesheets/screen.css"
document.head.appendChild(@styles);

require.config {
  baseUrl: "/tests/",
  urlArgs: "cb=" + Math.random(),
  paths:{
    jasmine: "/tests/lib/jasmine-1.3.1/jasmine",
    jasmineHtml: "/tests/lib/jasmine-1.3.1/jasmine-html",
    'jquery':'/assets/javascripts/lib/jquery.min'
    'underscore': '/assets/javascripts/lib/underscore-min'
    'sinon':'/tests/lib/sinon-1.6.0'
    'jasmineSinon':'/tests/lib/jasmine-sinon'
    'jasmineJquery':'/tests/lib/jasmine-jquery'
    utils:'/assets/javascripts/utils'
    image_handling:"/assets/javascripts/image_handling"
    imgh_spec: "specs/image_handling"

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




require ['jquery', 'underscore', 'jasmine', "jasmineHtml", "jasmineJquery"], () ->

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
      'imgh_spec/replace_image_spec'
    ]

    require specs, ->
        jasmineEnv.execute()





