module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        concat: {
            main_css: {
                src: [
                    'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    'node_modules/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css'
                ],
                dest: 'assets/css/main.css'
            },
            main_js: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js'
                ],
                dest: 'assets/js/main.js'
            },
            doctrineworkbench_js: {
                src: [
                    'app/doctrine-workbench-0.1/!(tests)/*.js'
                ],
                dest: 'assets/js/app.js'
            },
            doctrineworkbench_css: {
                src: [
                    'app/doctrine-workbench-0.1/resources/css/*.css'
                ],
                dest: 'assets/css/app.css'
            },
            dependencies_js: {
                src: [
                    'app/jquery-ui-1.9.2/jquery-ui.min.js',
                    'node_modules/bootbox/bootbox.js',
                    'node_modules/jsplumb/dist/js/jsPlumb-2.0.7.js',
                    'node_modules/bootstrap-slider/dist/bootstrap-slider.min.js',
                    'node_modules/ladda/dist/spin.min.js',
                    'node_modules/ladda/dist/ladda.min.js',
                    'node_modules/lodash/lodash.min.js',
                    'node_modules/angular/angular.min.js',
                    'node_modules/angular-route/angular-route.min.js'
                ],
                dest: 'assets/js/dependencies.js'
            },
            dependencies_css: {
                src: [
                    'node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css',
                    'node_modules/ladda/dist/ladda-themeless.min.css'
                ],
                dest: 'assets/css/dependencies.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'web/dist/js/main.min.js': ['assets/js/main.js'],
                    'web/dist/js/dependencies.min.js': ['assets/js/dependencies.js'],
                    'web/dist/js/app.min.js': ['assets/js/app.js']
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'web/dist/css/main.min.css': ['assets/css/main.css'],
                    'web/dist/css/dependencies.min.css': ['assets/css/dependencies.css'],
                    'web/dist/css/app.min.css': ['assets/css/app.css']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['node_modules/bootstrap/dist/fonts/*'], dest: 'web/dist/fonts/', flatten: true}
                ]
            },
            doctrineworkbench: {
                files: [
                    {expand: true, src: ['app/doctrine-workbench-0.1/resources/fonts/*'], dest: 'web/dist/fonts/', flatten: true},
                    {expand: true, src: ['app/doctrine-workbench-0.1/resources/img/*'], dest: 'web/dist/img/', flatten: true}
                ]
            }
        },
        nginclude: {
            options: {
                assetsDirs: ['app/doctrine-workbench-0.1/views']
            },
            doctrineworkbench: {
                files: [{
                    src: 'app/doctrine-workbench-0.1/views/index.html',
                    dest: 'web/views/index.html'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-nginclude');
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'nginclude', 'copy']);
    grunt.registerTask('test', ['karma']);

};