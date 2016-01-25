var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var concat = require("gulp-concat");
var minifyCSS = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var order = require("gulp-order");
var del = require('del');

gulp.task('default', ['css', 'mp3', 'minify'], function() {
    
});

gulp.task('css', function(){
  return gulp.src('src/css/**/*.css')
    .pipe(order([
        "style.css",    // base
        "hues-m.css",   // modern
        "hues-x.css",   //   xmas
        "hues-h.css",   //   hlwn
        "hues-r.css",   // retro
        "hues-w.css"    //   weed
    ]))
    .pipe(autoprefixer('last 2 version', 'ios 6', 'android 4'))
    .pipe(minifyCSS())
    .pipe(concat('hues-min.css'))
    .pipe(gulp.dest('css'));
});

gulp.task("mp3", function () {
  return gulp.src("src/js/mp3/*.js")
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("mp3-min.js"))
    .pipe(gulp.dest("lib"));
});

gulp.task("minify", function () {
  return gulp.src("src/js/*.js")
    // Enable later
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("hues-min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("lib"));
});

gulp.task('watch', function() {
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/js/*.js', ['minify']);
});

gulp.task('clean', function() {
    return del([
        'lib/hues-min.js',
        'lib/hues-min.map',
        'lib/mp3-min.js',
        'css',
        'release']);
});

gulp.task('release', ['default'], function() {
    gulp.src(['css/**/*', 'lib/**/*', 'fonts/**/*', 'img/**/*', 'index.html', 'favicon.ico'], {
            base: '.'
    }).pipe(gulp.dest('release'));
});