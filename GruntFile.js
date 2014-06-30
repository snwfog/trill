module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-bower-task')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-open')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-coffee')
    grunt.loadNpmTasks('grunt-coffeescript-concat')
    grunt.loadNpmTasks('grunt-http-server')
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'deploy'
                }
            }
        },
        concat: {
            client: {
                src: ["lib/**/*.js", "libs/**/*.js", "tmp/client.js"],
                dest: 'deploy/<%= pkg.name %>.js'
            }
        },
        watch: {
            files: 'src/**/*.coffee',
            tasks: ['compile-and-concat']
        },
        'http-server': {
            dev: {
                root: './deploy',
                port: 8282,
                host: "localhost",
                cache: 0,
                showDir: true,
                autoIndex: false,
                defaultExt: "html",
                runInBackground: true
            }
        },
        open: {
            dev: {
                path: 'http://localhost:8080/trill.html'
            }
        },
        coffeescript_concat: {
            compile: {
                files: {
                    'tmp/client.coffee': ['src/game/client/**/*.coffee']
                }
            }
        },
        coffee: {
            'compile-client': {
                files: {
                    'tmp/client.js': 'tmp/client.coffee'
                }
            },
            'compile-server': {
                files: {
                    'tmp/server/server.js': 'src/game/server/server.coffee',
                    'tmp/server/trill-server.js': 'src/game/server/trill-server.coffee'
                }
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
                        src: ['tmp/server/**/*.js'],
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
        clean: ["./deploy", "./tmp", './lib']
    })
    grunt.registerTask('default', ['clean', 'bower:install', 'compile-and-concat'])
    grunt.registerTask('open-game', ['default', 'http-server', 'open'])
    grunt.registerTask('compile-and-concat', ['coffeescript_concat', 'coffee', 'concat:client', 'copy'])
}