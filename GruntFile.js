var open = require('open');
var url = require('url');
var path = require('path');
var envify = require('envify');
var remapify = require('remapify');

module.exports = function (grunt) {

  var args = {
    deploy: grunt.option('deploy') || './deploy',
    url: grunt.option('url') || 'http://localhost:8080/'
  };

  var urlObj = url.parse(args.url);
  var indexUrl = url.resolve(url.format(urlObj), '/index.html');

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-env');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    args: args,

    open: {
      dev: {
        path: indexUrl
      }
    },

    copy: {
      client: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: 'src/',
            src: [
              'static/**/*.css',
              'static/**/*.png',
              'static/**/*.otf',
              'static/**/*.ttf',
              'static/**/*.xml',
              'static/**/*.json'],
            dest: path.normalize(args.deploy)
          }
        ]
      },
      'client-libs': {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['./src/lib/*'],
            dest: path.join(args.deploy, '/lib')
          }
        ]
      },
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/static/*.html'],
            dest: path.normalize(args.deploy)
          }
        ]
      }
    },

    bower: {
      install: {
        options: {
          verbose: true,
          targetDir: path.join(args.deploy, '/lib')
        }
      }
    },

    injector: {
      local_js_dependencies: {
        options: {
          transform: function (file) {
            return '<script src="' + file.split('/').slice(2).join('/') + '"></script>';
          }
        },

        files: {
          '<%= args.deploy %>/index.html': [
            path.join(args.deploy, '/lib/**/*.js'),
            path.join(args.deploy, '/trillClient.js')
          ]
        }
      },

      local_css_dependencies: {
        options: {
          transform: function (file) {
            return '<link rel="stylesheet" href="' + file.split('/').slice(2).join('/') + '" />';
          }
        },

        files: {
          '<%= args.deploy %>/index.html': [
            path.join(args.deploy, '/static/**/*.css')
          ]
        }
      }

    },

    browserify: {
      dev: {
        files: {
          '<%= args.deploy %>/trillClient.js': ['src/game/client/**/*.js']
        },
        options: {

          browserifyOptions: {
            debug: true
          },

          preBundleCB: function (b) {
            b.transform(envify, {
              TRILL_SERVER_URL: url.format(urlObj)
            })
                .plugin(remapify, [
                  {
                    src: './**/*.js',
                    expose: '',
                    cwd: './src/game/client'
                  }
                ]);
          }
        }
      }
    },

    clean: [args.deploy],

    concurrent: {
      options: {
        logConcurrentOutput: true
      },

      dev: {
        tasks: ['build', 'nodemon', 'watch']
      },

      test: {
        tasks: ['build:test', 'nodemon', 'watch']
      }
    },

    nodemon: {
      dev: {
        script: "src/game/server/httpServer.js",
        options: {
          watch: ['src/game'],

          callback: function (nodemon) {

            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // Open the application in a new browser window and is optional
            nodemon.on('config:update', function () {
              // Delay before server listens on port
              setTimeout(function () {
                open(indexUrl);
              }, 1000);

            });

          }
        }
      }
    },

    watch: {

      options: {
        livereload: true
      },

      dev: {
        files: ['src/game/client/**/*.js', 'src/static/**'],
        tasks: ['build']
      },

      test: {
        files: ['src/game/client/**/*.js', 'src/static/**'],
        tasks: ['build:test']
      }
    },

    env: {

      all: {
        TRILL_SERVER_ASSET_ROOT: path.normalize(args.deploy),
        TRILL_SERVER_URL: url.format(urlObj)
      },

      dev: {
        options: {
          add: {
            TRILL_SERVER_SRC: 'src/game/server/trillServer.js'
          }
        }
      },

      test: {
        options: {
          add: {
            TRILL_SERVER_SRC: 'src/game/server/mock.js'
          }
        }
      }
    }

  });

  grunt.registerTask('build', 'Builds the client part of the game', function (target) {

    var t = target || 'dev';

    grunt.task.run('clean', 'env:all', 'env:' + t, 'browserify', 'bower', 'copy', 'injector');
  });

  grunt.registerTask('build-watch', 'Builds the client + watch and builds on file changes.', function (target) {

    var t = target || 'dev';

    grunt.task.run('build:' + t, 'watch:' + t);
  });

  grunt.registerTask('default', 'Builds the client + watch and builds on file changes + run the server', function (target) {

    var t = target || 'dev';

    grunt.task.run('build:' + t, 'concurrent:' + t);
  });

  grunt.registerTask('test', ['default:test']);

};