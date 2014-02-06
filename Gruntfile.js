module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Copy
		copy: {
			build: {
				cwd: 'src',
				src: [ 'fonts/**/*', 'images/**/*', 'javascript/**/*', 'favicon.ico', 'json/**/*' ],
				dest: 'build',
				expand: true
			},
			javascript: {
				cwd: 'src',
				src: [ 'javascript/**/*' ],
				dest: 'build',
				expand: true
			}
		},

		// Clean
		clean: {
			all: {
				src: [ 'build/**/*' ]
			},
			html: {
				src: [ 'build/*.html' ]
			}
		},

		// Sass
		sass: {
			dist: {
				options: {
					style: 'expanded',
					noCache: true
				},
				files: {
					'build/stylesheets/style.css': 'src/scss/style.scss',
					'build/stylesheets/style-german.css': 'src/scss/style-german.scss',
					'build/stylesheets/browsers/ie8.css': 'src/scss/browsers/ie8.scss',
					'build/stylesheets/browsers/ie9.css': 'src/scss/browsers/ie9.scss',
					'build/stylesheets/debug.css': 'src/scss/non-modular/debug/debug.scss'
				}
			},
			build: {
				options: {
					style: 'compressed',
					noCache: true
				},
				files: {
					'build/stylesheets/style.css': 'src/scss/style.scss',
					'build/stylesheets/style-german.css': 'src/scss/style-german.scss',
					'build/stylesheets/browsers/ie8.css': 'src/scss/browsers/ie8.scss',
					'build/stylesheets/browsers/ie9.css': 'src/scss/browsers/ie9.scss',
					'build/stylesheets/debug.css': 'src/scss/non-modular/debug/debug.scss'
				}
			}
		},

		// html includes
		includereplace: {
			build: {
				expand: true,
				cwd: 'src/html/',
				src: '*.html',
				dest: 'build/'
			}
		},

		// Watch
		watch: {
			sass: {
				files: 'src/scss/**/*.scss',
				tasks: [ 'sass:dist' ],
				options: {
					livereload: true
				}
			},
			html: {
				files: 'src/html/**/*.html',
				tasks: [ 'includereplace' ],
				options: {
					livereload: true
				}
			},
			javascript: {
				files: 'src/javascript/**/*.js',
				tasks: [ 'copy:javascript' ],
				options: {
					livereload: true
				}
			}
		},

		// Image optimization
		imagemin: {
			all: {
				files: [
					{
						expand: true,
						cwd: 'src/images/',
						src: ['**/*.{png,jpg,gif}'],
						dest: 'build/images/'
					}
				]
			}
		},

		// Local server
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'build'
				}
			}
		},

		// html pretify
		prettify: {
			options: {
				"indent": 4,
				"condense": true,
				"indent_char": " ",
				"indent_scripts": "normal",
				"wrap_line_length": 0,
				"brace_style": "collapse",
				"preserve_newlines": true,
				"max_preserve_newlines": 1,
				unformatted: [ 'strong', 'small', 'sub', 'sup', 'b', 'i', 'u', 'a', 'button', 'span']
			},
			build: {
				expand: true,
				cwd: 'build/',
				ext: '.html',
				src: ['*.html'],
				dest: 'build/'
			}

		}


	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-prettify');
	grunt.loadNpmTasks('grunt-notify');


	grunt.registerTask('default', 'Watch files nad start a custom static web server.', ['connect', 'watch']);
	grunt.registerTask('build', ['clean:all', 'copy', 'sass:build', 'includereplace', 'prettify', 'imagemin']);
	grunt.registerTask('compress', ['imagemin']);
	grunt.registerTask('htmlpretify', ['prettify']);


};