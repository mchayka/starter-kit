module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Copy
		copy: {
			all: {
				cwd: 'src',
				src: [ '**/*.{png,jpg,gif,svg,ico}', 'javascript/**/*' ],
				dest: 'build',
				expand: true
			},
			javascript: {
				cwd: 'src',
				src: [ 'javascript/**/*' ],
				dest: 'build',
				expand: true
			},
			images: {
				cwd: 'src',
				src: [ '**/*.{png,jpg,gif,svg,ico}' ],
				dest: 'build',
				expand: true
			}
		},

		// Clean
		clean: {
			all: {
				src: [ 'build/**/*' ]
			}
		},

		// Sass
		sass: {
			nested: {
				options: {
					outputStyle: 'nested'
				},
				files: {
					'build/stylesheets/style.css': 'src/scss/style.scss'
				}
			},
			compressed: {
				options: {
					outputStyle: 'compressed'
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

		// Watch files changes
		watch: {
			sass: {
				files: 'src/scss/**/*.scss',
				tasks: [ 'sass:nested' ],
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
			img: {
				files: 'src/images/**/*.{png,jpg,gif,svg,ico}',
				tasks: [ 'copy:images' ],
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

		// HTML validation
		validation: {
			options: {
				reset: grunt.option('reset') || false,
				stoponerror: false,
				relaxerror: ["Bad value X-UA-Compatible for attribute http-equiv on element meta."]
			},
			files: {
				src: ['build/**/*.html']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-html-validation');

	// Tasks
	grunt.registerTask('default', 'Watch files', ['watch']);
	grunt.registerTask('start', 'Starts local server and watch files', ['connect', 'default']);
	grunt.registerTask('validate', 'Validate html files', ['validation']);
	grunt.registerTask('html', 'Compile html', ['includereplace']);
	grunt.registerTask('css', 'Compile sass', ['sass']);
	grunt.registerTask('img', 'Optimize image files', ['imagemin']);
	grunt.registerTask('build', 'Prepare build files', ['clean:all', 'copy:all', 'includereplace', 'sass:compressed', 'img']);

};