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
                        flatten: true,
                        src: ['./src/static/**/*.html', './src/static/**/*.css', './src/static/**/*.png', './src/game/trill-server.js', './src/game/server/server.js'],
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
            }
        },
        
        bower: {
            install: {
                options: {
                    verbose: true
                }
            }
        },
        clean: ["./deploy", './lib']
    })

    grunt.registerTask('default', ['clean', 'bower:install', 'compile-and-concat'])
    grunt.registerTask('open-game', ['default', 'open'])
    grunt.registerTask('compile-and-concat', ['concat', 'copy'])
}