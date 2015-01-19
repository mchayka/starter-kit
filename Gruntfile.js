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
			javascript: {
				cwd: 'src',
				src: [ '**/*.js' ],
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
			src: [ 'build/**/*' ]
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
				files: 'src/**/*.scss',
				tasks: [ 'sass:dev', 'autoprefixer' ]
			},
			html: {
				files: 'src/**/*.hbs',
				tasks: [ 'assemble' ]
			},
			img: {
				files: 'src/**/*.{png,jpg,gif,svg,ico}',
				tasks: [ 'copy:images' ]
			},
			javascript: {
				files: 'src/**/*.js',
				tasks: [ 'copy:javascript' ]
			}
		},

		// Static site generator using the Handlebars template engine
		//https://github.com/assemble
		assemble: {
			options: {
				flatten: true,
				layout: 'layout.hbs',
				layoutdir: 'src/templates/layouts',
				assets: 'build',
				partials: ['src/templates/pages/*.hbs', 'src/templates/parts/*.hbs']
			},
			demo: {
				files: {
					'build/': ['src/templates/pages/*.hbs']
				}
			}
		},

		// sync changes with browser
		// http://www.browsersync.io/docs/grunt/
		browserSync: {
			dev: {
				bsFiles: {
					src : [
					'**/*.css',
					'**/*.html',
					'**/*.{png,jpg,gif,svg,ico}',
					'**/*.js'
					],
					cwd : 'build'
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

	grunt.loadNpmTasks('assemble');

	grunt.registerTask('update', ['devUpdate']);
	grunt.registerTask('default', 'Starts local server and watch files', ['browserSync', 'watch']);
	grunt.registerTask('build', 'Prepare build files', ['clean', 'copy', 'assemble', 'sass:build', 'autoprefixer', 'imagemin']);

};
