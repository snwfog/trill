module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-task')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-open')

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      client: {
        src: ["src/game/**/*.js"],
        dest: 'deploy/<%= pkg.name %>.js'
      }
    },

    watch: {
      files: 'src/**/*.js',
      tasks: ['compile-and-concat']
    },

    open: {
      dev: {
        path: 'http://localhost:8080/trill.html'
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
                        flatten: false,
                        src: ['./libs/*'],
                        dest: './deploy'
                    }
                ]
            },
            server: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/server/**/*.js'],
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
                    verbose: true
                }
            }
        },

        wiredep: {
            target: {
                src: [
                    'deploy/trill.html'
                ],
                cwd: 'deploy/',
                bowerJson: require('./bower.json'),
                directory: './bower_components'
            }

        },


        clean: ["./deploy"]
    })

    grunt.registerTask('default', ['clean', 'compile-and-concat'])
    grunt.registerTask('open-game', ['default', 'open'])
    grunt.registerTask('compile-and-concat', ['concat', 'copy', 'wiredep'])
}