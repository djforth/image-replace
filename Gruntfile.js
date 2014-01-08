


module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'assets/javascript/main.js',
        dest: 'assets/build/javascript/main.min.js'
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {
          config: 'config.rb'
        }
      }

    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'assets/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'assets/images/'
        }]
      }
    },
    coffee:{
      build: {
        expand: true,
        cwd: 'assets/preprocessed_files/coffeescript',
        src: ['**/*.coffee'],
        dest: 'assets/javascripts',
        ext: '.js'
      },
      test: {
        expand: true,
        cwd: 'tests/specs/coffeescript',
        src: ['**/*.coffee'],
        dest: 'tests/specs',
        ext: '.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: './'
        }
      }
    },
    clean: {
      build: ["assets/stylesheets/*"],
    },
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['**/*.coffee'],
        tasks: ['coffee:build', 'coffee:test'],
        options: {
          spawn: false,
        }
      },
      sass: {
        files: ["assets/preprocessed_files/sass/*.scss"],
        tasks: ['compass:dist']
      },
      css: {
        files: ['assets/stylesheets/*.css']
      },
      images: {
        files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-compass');
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'compass', 'imagemin', "coffee"]);
  grunt.registerTask('dev', ['connect', 'watch']);
};
