(function() {
  require.config({
    baseUrl: "/assets/javascripts",
    paths: {
      jquery: 'lib/jquery.min',
      underscore: 'lib/underscore-min',
      carousel: 'carousel',
      utils: 'utils',
      test: 'test'
    }
  });

  require(['image_handling/replace_image'], function(ReplaceImage) {
    var replace;
    replace = document.querySelectorAll(".screenshots");
    if (replace.length > 0) {
      return this.replace_image = new ReplaceImage();
    }
  });

}).call(this);
