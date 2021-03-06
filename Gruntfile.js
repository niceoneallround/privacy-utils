//
// Assume that grunt-cli has been installed at the npm -g level, so can run grunt
//

module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    buddyjs: {
      src: ['lib/*.js', 'test/*.js'],
      options: {
        ignore: [0, 1, 2, 3]
      }
    },

    jshint: {
      all: ['Gruntfile.js',
        'lib/*.js',
        'test/*.js'],
      options: {
        predef: ['describe', 'it', 'before', 'after'],
        exported: ['should'],
        curly: true,
        indent: 2,
        node: true,
        undef: true,
        unused: true,
        eqeqeq: true,
        strict: true,
        esnext: true
      }
    },

    shell: {
      update: {
        command: ['echo running npm update', 'npm update'].join('&&')
      }
    },

    mochaTest: {
      unitTest: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js']
      }
    },

    jscs: {
      src: ['lib', 'lib/*.js', '*.js', 'test/*.js'],
      options: {
        preset: 'airbnb',
        disallowMultipleVarDecl: false,
        requireTrailingComma: false,
        maximumLineLength: 255
      },
      fix: {
        src: ['lib', 'lib/*.js', '*.js', 'test/*.js'],
        options:{
          preset: 'airbnb',
          disallowMultipleVarDecl: false,
          requireTrailingComma: false,
          maximumLineLength: 255,
          fix: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-buddyjs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('update', ['shell:update']);
  grunt.registerTask('pp', ['jshint', 'jscs:src', 'buddyjs']);
  grunt.registerTask('test', ['pp', 'mochaTest:unitTest']);

  grunt.registerTask('release', ['update', 'test']);

  grunt.registerTask('default', ['test']);

};
