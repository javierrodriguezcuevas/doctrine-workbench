// Karma configuration
// Generated on Sun Sep 20 2015 21:17:33 GMT+0200 (Hora de verano romance)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'app/jquery-ui-1.9.2/jquery-ui.min.js',
        'node_modules/bootbox/bootbox.js',
        'node_modules/jsplumb/dist/js/jsPlumb-2.0.7.js',
        'node_modules/bootstrap-slider/dist/bootstrap-slider.min.js',
        'node_modules/ladda/dist/spin.min.js',
        'node_modules/ladda/dist/ladda.min.js',
        'node_modules/lodash/lodash.min.js',
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/angular-mocks/angular-mocks.js',
        "app/doctrine-workbench-0.1/**/*.js",
        "app/doctrine-workbench-0.1/views/*.html"
    ],


    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        "web/views/*.html": ['ng-html2js'],
        "app/doctrine-workbench-0.1/!(tests|modules|translations)/*.js": ['coverage']
    },
 
    ngHtml2JsPreprocessor: {
        // setting this option will create only a single module that contains templates
        // from all the files, so you can load them all with module('foo')
        moduleName: 'templates'
    },

    coverageReporter: {  
        type: 'html',
        dir: 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
