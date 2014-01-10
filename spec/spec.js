(function() {
  var jsFolder, lib, specHelpers;

  jsFolder = "/assets/javascripts/";

  lib = jsFolder + "lib/";

  specHelpers = "/tests/lib/";

  this.styles = document.createElement("link");

  this.styles.media = "screen";

  this.styles.rel = "stylesheet";

  this.styles.href = "/assets/stylesheets/screen.css";

  document.head.appendChild(this.styles);

  require.config({
    baseUrl: "/tests/",
    urlArgs: "cb=" + Math.random(),
    paths: {
      jasmine: "/tests/lib/jasmine-1.3.1/jasmine",
      jasmineHtml: "/tests/lib/jasmine-1.3.1/jasmine-html",
      'jquery': '/assets/javascripts/lib/jquery.min',
      'underscore': '/assets/javascripts/lib/underscore-min',
      'sinon': '/tests/lib/sinon-1.6.0',
      'jasmineSinon': '/tests/lib/jasmine-sinon',
      'jasmineJquery': '/tests/lib/jasmine-jquery',
      utils: '/assets/javascripts/utils',
      image_handling: "/assets/javascripts/image_handling",
      imgh_spec: "specs/image_handling",
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

  require(['jquery', 'underscore', 'jasmine', "jasmineHtml", "jasmineJquery"], function() {
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
    specs = ['imgh_spec/replace_image_spec'];
    return require(specs, function() {
      return jasmineEnv.execute();
    });
  });

}).call(this);
