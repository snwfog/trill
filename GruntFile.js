module.exports = function (grunt) {

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

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    open: {
      dev: {
        path: 'http://localhost:8080/index.html'
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
              'static/**/*.otf'],
            dest: './deploy'
          }
        ]
      },
      'client-libs': {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['./src/lib/*'],
            dest: './deploy/lib'
          }
        ]
      },
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/static/*.html'],
            dest: 'deploy'
          }
        ]
      }
    },

    bower: {
      install: {
        options: {
          verbose: true,
          targetDir: 'deploy/lib'
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
          'deploy/index.html': ['deploy/lib/**/*.js', 'deploy/trillClient.js']
        }
      },

      local_css_dependencies: {
        options: {
          transform: function (file) {
            return '<link rel="stylesheet" href="' + file.split('/').slice(2).join('/') + '" />';
          }
        },

        files: {
          'deploy/index.html': ['deploy/static/**/*.css']
        }
      }

    },

    browserify: {
      dist: {
        files: {
          'deploy/trillClient.js': ['src/game/client/**/*.js']
        }
      }
    },

    clean: ["./deploy"],

    concurrent: {
      dev: {
        tasks: ['build', 'nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    nodemon: {
      dev: {
        script: "src/game/server/httpServer.js",
        options: {
          env: {
            PORT: '8080'
          },

          watch: ['src/game/server'],

          callback: function (nodemon) {

            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // Open the application in a new browser window and is optional
            nodemon.on('config:update', function () {
              // Delay before server listens on port
              setTimeout(function () {
                require('open')('http://localhost:8080');
              }, 1000);

            });

          }
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/game/client/**/*.js'],
        tasks: ['build'],
        options: {
          livereload: true
        }
      }
    }

  });

  grunt.registerTask('default', ['build', 'concurrent']);
  grunt.registerTask('build', ['clean', 'browserify', 'bower', 'copy', 'injector']);
};