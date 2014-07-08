module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-bower-task')
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-browserify');

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
              'static/**/*.png'],
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
      server: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/game/server/**/*.js'],
            dest: 'deploy/server'
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
      local_dependencies: {
        options: {
          transform: function (file) {
            return '<script src="' + file.split('/').slice(2).join('/') + '"></script>';
          }
        },

        files: {
          'deploy/index.html': ['deploy/lib/**/*.js', 'deploy/trillClient.js']
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

    clean: ["./deploy"]
  })

  grunt.registerTask('default', ['clean', 'concat'])
  grunt.registerTask('open-game', ['default', 'open'])
  grunt.registerTask('concat', ['browserify', 'bower', 'copy', 'injector'])
}