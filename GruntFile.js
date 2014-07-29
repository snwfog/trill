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
      lib: {
        files: [
          {
            expand: true, flatten: true, cwd: 'bower_components',
            src: ['jquery/dist/jquery.min.js'
              , 'phaser/phaser.min.js'
              , 'socket.io-client/socket.io.js'
            ],
            dest: './src/lib'
          }
        ]
      },
    },

    bower: {
      install: {
        options: {
          verbose: true,
          targetDir: 'deploy/lib'
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
  })

  grunt.registerTask('default', ['copy:lib'])
  grunt.registerTask('concat', ['browserify', 'bower', 'copy'])
}