(function() {
  var jasmineFolder, jsFolder, lib, specHelpers;

  jsFolder = "/assets/javascripts/";

  lib = jsFolder + "lib/";

  specHelpers = "/tests/lib/";

  jasmineFolder = specHelpers + "jasmine-1.3.1/";

  this.styles = document.createElement("link");

  this.styles.media = "screen";

  this.styles.rel = "stylesheet";

  this.styles.href = "/assets/stylesheets/screen.css";

  document.head.appendChild(this.styles);

  require.config({
    baseUrl: "/tests/",
    urlArgs: "cb=" + Math.random(),
    paths: {
      jasmine: jasmineFolder + "jasmine",
      jasmineHtml: jasmineFolder + "jasmine-html",
      'jquery': lib + 'jquery.min',
      'underscore': lib + 'underscore-min',
      'sinon': specHelpers + 'sinon-1.6.0',
      'jasmine-sinon': specHelpers + 'jasmine-sinon',
      'jasmine-jquery': specHelpers + 'jasmine-jquery',
      utils: jsFolder + 'utils',
      image_handling: jsFolder + "image_handling",
      imgh_spec: "image_handling",
      u_spec: "utils"
    },
    shim: {
      underscore: {
        exports: '_'
      },
      jasmine: {
        exports: "jasmine"
      },
      jasmineHtml: ["jasmine"],
      jasmineJquery: ["jasmine"],
      jquery: {
        exports: "$"
      }
    }
  });

  require(['jquery', 'underscore', "jasmine", 'jasmine-jquery', "sinon", "jasmine-sinon"], function() {
    var htmlReporter, jasmineEnv, specs;
    _.templateSettings = {
      interpolate: /\[\%\=(.+?)\%\]/g,
      evaluate: /\[\%(.+?)\%\]/g
    };
    jasmine.getFixtures().fixturesPath = "fixtures";
    jasmineEnv = jasmine.getEnv();
    window.jas = jasmineEnv;
    jasmineEnv.updateInterval = 1000;
    htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };
    specs = ['imgh_spec/replace_image_spec', 'u_spec/loader_spec', 'u_spec/manage_elements_spec'];
    return require(specs, function() {
      console.log("huh?");
      return jasmineEnv.execute();
    });
  });

}).call(this);
