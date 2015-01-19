module.exports = function (grunt) {

	// load all grunt tasks matching the `grunt-*` pattern
	// https://github.com/sindresorhus/load-grunt-tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// == Grunt Dev Update
		// https://npmjs.org/package/grunt-dev-update
		// http://pgilad.github.io/grunt-dev-update
		devUpdate: {
			main: {
				options: {
					reportUpdated: true, // Report updated dependencies: 'false' | 'true'
					updateType   : "prompt" // 'force'|'report'|'prompt'
				}
			}
		},

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

		clean: {
			all: {
				src: [ 'build/**/*' ]
			},
			images: {
				src: [ 'build/images/**/*' ]
			}
		},

		sass: {
			dev: {
				files : [
					{
						src : ['**/*.scss', '!**/_*.scss'],
						cwd : 'src/stylesheets',
						dest : 'build/stylesheets',
						ext : '.css',
						expand : true
					}
				],
				options : {
					style : 'expanded',
					sourcemap: true
				}
			},
			build: {
				files : [
					{
						src : ['**/*.scss', '!**/_*.scss'],
						cwd : 'src/stylesheets',
						dest : 'build/stylesheets',
						ext : '.css',
						expand : true
					}
				],
				options : {
					style : 'compressed'
				}
			}
		},

		watch: {
			sass: {
				files: 'src/stylesheets/**/*.scss',
				tasks: [ 'sass:dev', 'autoprefixer' ]
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

		// html includes
		// https://github.com/alanshaw/grunt-include-replace
		includereplace: {
			build: {
				expand: true,
				cwd: 'src',
				src: '*.html',
				dest: 'build/'
			}
		},

		// sync changes with browser
		// http://www.browsersync.io/docs/grunt/
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

		// https://github.com/gruntjs/grunt-contrib-imagemin
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
		// https://www.npmjs.com/package/grunt-html-validation
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

		// https://github.com/nDmitry/grunt-autoprefixer
		autoprefixer: {
			options: {
				browsers: [
				"Android 2.3",
				"Android >= 4",
				"Chrome >= 20",
				"Firefox >= 24",
				"Explorer >= 8",
				"iOS >= 6",
				"Opera >= 12",
				"Safari >= 6"
				]
			},
			css: {
				src: 'build/stylesheets/**/*.css'
			}
		},

	});

	grunt.registerTask('update', ['devUpdate']);
	grunt.registerTask('default', 'Watch files', ['watch']);
	grunt.registerTask('dev', 'Starts local server and watch files', ['browserSync', 'default']);
	grunt.registerTask('validate', 'Validate html files', ['validation']);
	grunt.registerTask('html', 'Compile html', ['includereplace']);
	grunt.registerTask('img', 'Optimize image files', ['imagemin']);
	grunt.registerTask('build', 'Prepare build files', ['clean:all', 'copy:all', 'includereplace', 'sass:build', 'autoprefixer', 'img']);
	grunt.registerTask('prefix', 'Add vendor prefixes to css', ['css', 'autoprefixer']);

};
