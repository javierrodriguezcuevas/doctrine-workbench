var gulp = require('gulp'),
  concat = require('gulp-concat'),
  copy = require('gulp-copy'),
  cssmin = require('gulp-cssmin'),
  nginclude = require('gulp-nginclude'),
  uglify = require('gulp-uglify'),
  karma = require('karma');

gulp.task('test', function (done) {
	return new karma.Server({
		configFile: 'karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('js-main', function () {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('./web/dist/js/'))
    ;
});
gulp.task('js-dependencies', function () {
    return gulp.src([
            'node_modules/jquery-ui-dist/jquery-ui.min.js',
            'node_modules/bootbox/bootbox.js',
            'node_modules/jsplumb/dist/js/jsPlumb-2.0.7.js',
            'node_modules/bootstrap-slider/dist/bootstrap-slider.min.js',
            'node_modules/ladda/dist/spin.min.js',
            'node_modules/ladda/dist/ladda.min.js',
            'node_modules/lodash/lodash.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-route/angular-route.min.js'
        ])
        .pipe(concat('dependencies.min.js'))
        .pipe(gulp.dest('./web/dist/js/'))
    ;
});
gulp.task('js-app', function () {
    return gulp.src(['app/doctrine-workbench-0.1/!(tests)/*.js'])
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./web/dist/js/'))
    ;
});

gulp.task('css-main', function () {
	return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css'
        ])
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./web/dist/css/'))
});

gulp.task('css-dependencies', function () {
	return gulp.src([
            'node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css',
            'node_modules/ladda/dist/ladda-themeless.min.css'
        ])
        .pipe(concat('dependencies.min.css'))
        .pipe(gulp.dest('./web/dist/css/'))
});

gulp.task('css-app', function () {
	return gulp.src(['app/doctrine-workbench-0.1/resources/css/*.css'])
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('./web/dist/css/'));
});

gulp.task('nginclude', function () {
  	return gulp.src(['./app/doctrine-workbench-0.1/views/{,*/}*.html'])
		.pipe(nginclude())
        .pipe(concat('index.html'))
		.pipe(gulp.dest('./web/views/'));
});

gulp.task('fonts', function () {
    return gulp.src([
			'./node_modules/bootstrap/dist/fonts/*',
			'./app/doctrine-workbench-0.1/resources/fonts/*'
		])
        .pipe(gulp.dest('./web/dist/fonts/'));
});

gulp.task('img', function () {
    return gulp.src(['./app/doctrine-workbench-0.1/resources/img/*'])
        .pipe(gulp.dest('./web/dist/img/'));
});

gulp.task('test', ['test']);
gulp.task('default', ['js-main', 'js-dependencies', 'js-app', 'css-main', 'css-dependencies', 'css-app', 'nginclude', 'fonts']);
