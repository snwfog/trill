module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-open'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-coffeescript-concat'

  grunt.initConfig(
    pkg: grunt.file.readJSON 'package.json'

    connect:
      server:
        options:
          port: 8080,
          base: './deploy'

    concat:
      dist:
        src: ["src/lib/**/*.js", "tmp/concatenated.js"]
        dest: 'deploy/<%= pkg.name %>.js'

    watch:
      files: 'src/**/*.coffee'
      tasks: ['compile-and-concat']

    open:
      dev:
        path: 'http://localhost:8080/index.html'

    coffeescript_concat:
      compile:
        files:
          'tmp/concatenated.coffee': ['src/game/**/*.coffee']

    coffee:
      compile:
        files:
          'tmp/concatenated.js': 'tmp/concatenated.coffee'

    copy:
      main:
        files: [
          expand: true
          flatten: true
          src: ['./src/**/*.js'
            , './src/**/*.html'
            , './src/**/*.css']
          dest: './deploy'
        ]

    clean: ["./deploy", "./tmp"]
  )

  grunt.registerTask 'default'
  , ['clean', 'compile-and-concat', 'copy']
  grunt.registerTask 'lazy', ['compile-and-concat', 'connect', 'open', 'watch']
  grunt.registerTask 'compile-and-concat'
  , ['coffeescript_concat', 'coffee', 'concat']

