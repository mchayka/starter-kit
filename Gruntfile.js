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
			},
			images: {
				src: [ 'build/images/**/*' ]
			}
		},

		// Sass
		sass: {
			expanded: {
				options: {
					style: 'expanded',
					sourcemap: true
				},
				files: {
					'build/stylesheets/style.css': 'src/stylesheets/style.scss'
				}
			},
			compressed: {
				options: {
					style: 'compressed'
				},
				files: {
					'build/stylesheets/style.css': 'src/stylesheets/style.scss'
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
				files: 'src/stylesheets/**/*.scss',
				tasks: [ 'sass:expanded', 'autoprefixer' ]
			},
			html: {
				files: 'src/**/*.html',
				tasks: [ 'includereplace' ]
			},
			img: {
				files: 'src/images/**/*.{png,jpg,gif,svg,ico}',
				tasks: [ 'copy:images' ]
			},
			javascript: {
				files: 'src/javascript/**/*.js',
				tasks: [ 'copy:javascript' ]
			}
		},

		// sync changes with browser
		browserSync: {
			dev: {
				bsFiles: {
					src : [
					'build/stylesheets/*.css',
					'build/**/*.html',
					'build/images/**/*.{png,jpg,gif,svg,ico}',
					'build/javascript/**/*.js'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: "build"
					}
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
		},

		// css autoprefixer
		autoprefixer: {
			options: {},
			css: {
				src: 'build/stylesheets/**/*.css'
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-html-validation');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-browser-sync');

	// Tasks
	grunt.registerTask('default', 'Watch files', ['watch']);
	grunt.registerTask('dev', 'Starts local server and watch files', ['browserSync', 'default']);
	grunt.registerTask('validate', 'Validate html files', ['validation']);
	grunt.registerTask('html', 'Compile html', ['includereplace']);
	grunt.registerTask('css', 'Compile sass', ['sass:expanded']);
	grunt.registerTask('img', 'Optimize image files', ['imagemin']);
	grunt.registerTask('build', 'Prepare build files', ['clean:all', 'copy:all', 'includereplace', 'sass:compressed', 'autoprefixer', 'img']);
	grunt.registerTask('prefix', 'Add vendor prefixes to css', ['css', 'autoprefixer']);

};
