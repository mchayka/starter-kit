module.exports = function (grunt) {

	// load all grunt tasks matching the `grunt-*` pattern
	// https://github.com/sindresorhus/load-grunt-tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		site: grunt.file.readYAML('_config.yml'),

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
				cwd: '<%= site.source %>',
				src: [ '**/*.js' ],
				dest: '<%= site.destination %>',
				expand: true
			},
			images: {
				cwd: '<%= site.source %>',
				src: [ '**/*.{png,jpg,gif,svg,ico}' ],
				dest: '<%= site.destination %>',
				expand: true
			}
		},

		clean: {
			src: [ '<%= site.destination %>/**/*' ]
		},

		sass: {
			dev: {
				files : [
					{
						src : ['**/*.scss', '!**/_*.scss'],
						cwd : '<%= site.source %>/stylesheets',
						dest : '<%= site.destination %>/stylesheets',
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
						cwd : '<%= site.source %>/stylesheets',
						dest : '<%= site.destination %>/stylesheets',
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
				files: '<%= site.source %>/**/*.scss',
				tasks: [ 'sass:dev', 'autoprefixer' ]
			},
			html: {
				files: '<%= site.source %>/**/*.hbs',
				tasks: [ 'assemble' ]
			},
			img: {
				files: '<%= site.source %>/**/*.{png,jpg,gif,svg,ico}',
				tasks: [ 'copy:images' ]
			},
			javascript: {
				files: '<%= site.source %>/**/*.js',
				tasks: [ 'copy:javascript' ]
			}
		},

		// Static site generator using the Handlebars template engine
		//https://github.com/assemble
		assemble: {
			options: {
				prettify: {indent: 2},
				production: true,
				data: '<%= site.source %>/**/*.{json,yml}',
				layoutdir: '<%= site.layouts %>',
				assets: '<%= site.destination %>',
				partials: ['<%= site.includes %>']
			},
			site: {
				options: {layout: 'default.hbs'},
				files: [
					{ expand: true, cwd: '<%= site.pages %>', src: ['*.hbs'], dest: '<%= site.destination %>/' }
				]
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
					cwd : '<%= site.destination %>'
				},
				options: {
					watchTask: true,
					server: {
						baseDir: '<%= site.destination %>'
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
						cwd: '<%= site.source %>/images/',
						src: ['**/*.{png,jpg,gif}'],
						dest: '<%= site.destination %>/images/'
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
				src: ['<%= site.destination %>/**/*.html']
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
				src: '<%= site.destination %>/stylesheets/**/*.css'
			}
		}

	});

	grunt.loadNpmTasks('assemble');

	grunt.registerTask('update', ['devUpdate']);
	grunt.registerTask('default', 'Starts local server and watch files', ['browserSync', 'watch']);
	grunt.registerTask('build', 'Prepare build files', ['clean', 'copy', 'assemble', 'sass:build', 'autoprefixer', 'imagemin']);

};
