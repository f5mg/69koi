// Load Grunt
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Tasks 
    sass: { // Begin Sass Plugin
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: 'css',
          ext: '.css'
      }]
      }
    },
	
		 cssmin: { // Begin CSS Minify Plugin
      target: {
				options:{
					rebase: false,
				},
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css' , '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
          
    }]
      }
    },
		
		concat: {
	  options: {
			separator: '/* CONCATENATED */'
		},
			
    dist: {
      src: ['css/*.min.css'],
      dest: 'style.min.css',
    },
			
		},
		
    uglify: { // Begin JS Uglify Plugin
      build: {
        src: ['js/*.js'],
        dest: 'script.min.js'
      }
    },
    watch: { // Compile everything into one task with Watch Plugin
      css: {
        files: 'sass/*.scss',
        tasks: ['sass', 'cssmin', 'concat']
      },
      js: {
        files: 'js/*.js' ,
        tasks: ['uglify']
      }
    }
  });
  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register Grunt tasks
  grunt.registerTask('default', ['watch']);
};