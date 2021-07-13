var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
purgecss = require("gulp-purgecss");
var imagemin = require('gulp-imagemin');
var sass = require("gulp-sass")(require("sass"));
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create();
var sourcemaps = require('gulp-sourcemaps');


gulp.task("sass", function () {
  return gulp
    .src("./app/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(
      purgecss({
        content: ["./app/*.html","./app/js/*.js"],
      })
    )
    .pipe(gulp.dest("./app/css/"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// copy html
gulp.task("html", function html() {
  return gulp.src("./app/*.html").pipe(gulp.dest("./dist/"));
});

// copy css
gulp.task("copycss", function html() {
  return gulp.src("./app/css/*.css").pipe(gulp.dest("./dist/css/"));
});

// js
// gulp.task('scripts', function() {
//   return gulp.src('./app/js/main.js')
//       .pipe(concat('main.js'))
//       .pipe(gulp.dest('./dist/js'));
// });

// copy js
gulp.task('copyjs', function() {
  return gulp.src('./app/js/*.js')
      .pipe(gulp.dest('./dist/js'));
});

// copy img
gulp.task("images", function html() {
    return gulp.src("./app/**/*.{gif,jpg,png,svg,jpeg}")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/"));
  });


// Static server
gulp.task('serve', function() {
  browserSync.init({
      server: {
          baseDir: "./app"
      }
  });
});

// Static Server + watching scss/html files
// gulp.task('serve', gulp.series(['sass']), function() {

//   browserSync.init({
//       server: "./app"
//   });

//   gulp.watch("app/scss/**/*.scss", gulp.series(['sass']));
//   gulp.watch("app/*.html").on('change', browserSync.reload);
// });

// watch sass
gulp.task('watch', ['serve', 'sass'], function(done){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
  done();

})