module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-bower-task'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-open'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-coffeescript-concat'
  grunt.loadNpmTasks 'grunt-http-server'

  grunt.initConfig(
    pkg: grunt.file.readJSON 'package.json'

    connect:
      server:
        options:
          port: 8080,
          base: 'deploy'

    concat:
      client:
        src: ["lib/**/*.js", "libs/**/*.js", "tmp/client.js"]
        dest: 'deploy/<%= pkg.name %>.js'

    watch:
      files: 'src/**/*.coffee'
      tasks: ['compile-and-concat']

    'http-server':
      dev:
        root: './deploy',
        port: 8282,
        host: "localhost",
        cache: 0,
        showDir : true,
        autoIndex: false,
        defaultExt: "html"
        runInBackground: true

    open:
      dev:
        path: 'http://localhost:8282/trill.html'

    coffeescript_concat:
      compile:
        files:
          'tmp/client.coffee': ['src/game/client/**/*.coffee']
          'tmp/server.coffee': ['src/game/server/**/*.coffee']

    coffee:
      compile:
        files:
          'tmp/client.js': 'tmp/client.coffee'
          'tmp/server.js': 'tmp/server.coffee'

    copy:
      client:
        files: [
          expand: true
          flatten: true
          src: [
            './src/**/*.html',
            './src/**/*.css'
          ]
          dest: './deploy'
        ]
      server:
        files: [
          src: [
            'tmp/server.js'
          ]
          dest: './deploy/server.js'
        ]

    bower:
      install:
        options:
          verbose:true

    clean: ["./deploy", "./tmp", './lib']
  )

  grunt.registerTask 'default', ['clean', 'bower:install', 'compile-and-concat']
  grunt.registerTask 'open-game', ['default', 'http-server', 'open']
  grunt.registerTask 'compile-and-concat', ['coffeescript_concat', 'coffee', 'concat:client', 'copy', 'watch']

