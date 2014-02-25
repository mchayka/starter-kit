module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Copy
		copy: {
			build: {
				cwd: 'src',
				src: [ 'images/**/*', 'javascript/**/*', 'favicon.ico', 'apple-touch-icon-precomposed.png' ],
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
				src: [ 'build/**/*', 'test/**/*' ]
			},
			build: {
				src: [ 'build/**/*' ]
			},
			test: {
				src: [ 'test/**/*' ]
			}
		},

		// Sass
		sass: {
			build: {
				options: {
					style: 'compressed',
					noCache: true
				},
				files: {
					'build/stylesheets/style.css': 'src/scss/style.scss'
				}
			}
		},

		// html includes
		includereplace: {
			build: {
				expand: true,
				cwd: 'src',
				src: '*.html',
				dest: 'build/'
			}
		},

		// Watch
		watch: {
			sass: {
				files: 'src/scss/**/*.scss',
				tasks: [ 'sass:build' ],
				options: {
					livereload: true
				}
			},
			html: {
				files: 'src/**/*.html',
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

		// Local servers
		connect: {
			build: {
				options: {
					port: 9001,
					base: 'build'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', 'Prepare build files', ['clean:build', 'copy:build', 'includereplace', 'sass']);
	grunt.registerTask('start', 'Starts local server and watch files', ['connect', 'watch-files']);
	grunt.registerTask('watch-files', 'Watch files', ['watch']);

};