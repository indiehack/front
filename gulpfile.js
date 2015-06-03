'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    bower = require('gulp-bower'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    //batch = require('gulp-batch'),
    Config = require('./gulpfile.config');

var config = new Config();

var $ = require("gulp-load-plugins")({
    pattern: [
        'gulp-*',
        'main-bower-files'
    ]
});

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScript], {read: false});
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript)
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions, //reference to library .d.ts files
                         config.appTypeScriptReferences];     //reference to app.d.ts files

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           target: 'ES5',
                           declarationFiles: false,
                           noExternalResolve: true,
                           out : 'app.js'
                       }));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [config.tsOutputPath,            // path to generated JS files
                            config.sourceApp +'**/*.js',    // path to all JS files auto gen'd by editor
                            config.sourceApp +'**/*.js.map' // path to all sourcemap files auto gen'd by editor
                           ];
  // delete the files
  del(typeScriptGenFiles, cb);
});

gulp.task('assets', function() {
    return gulp.src(config.assets)
        .pipe(gulp.dest(config.public));
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.publicJsComponentsDir));
});

gulp.task('less', function () {
    return gulp.src(config.allLessFiles)
        .pipe(less())
        .pipe(minifyCss())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.compiledCssDir));
});


gulp.task('watch', ['build'], function() {
    gulp.watch(config.allTypeScript, ['ts-lint', 'compile-ts', 'gen-ts-refs']);
    gulp.watch(config.lessDir, ['less']);
    gulp.watch(config.assets, ['assets']);
});

gulp.task('build', ['bower', 'less', 'ts-lint', 'compile-ts', 'assets']);

gulp.task('serve', ['watch'], function() {
//    gulp.start();
    gulp.src(config.public)
        .pipe($.webserver({
            port: 3333,
            livereload: true,
            fallback: 'index.html'
        }));
});

gulp.task('default', ['serve']);