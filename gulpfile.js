var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
purgecss = require("gulp-purgecss");
var imagemin = require("gulp-imagemin");
var sass = require("gulp-sass")(require("sass"));
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create();
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");

const browserSupport = [
  "last 2 version",
  "safari 5",
  "ie 8",
  "ie 9",
  "opera 12.1",
  "ios 6",
  "android 4",
];

gulp.task("sass", function () {
  return gulp
    .src("./app/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer(browserSupport))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./app/css/"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

// copy html
gulp.task("html", function html() {
  return gulp.src("./app/*.html").pipe(gulp.dest("./dist/"));
});

// copy css
gulp.task("copycss", function html() {
  return gulp
    .src("./app/css/*.css")
    .pipe(
      purgecss({
        content: ["./app/*.html", "./app/js/*.js"],
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest("./dist/css/"));
});

// copy js
gulp.task("copyjs", function () {
  return gulp.src("./app/js/*.js")
  .pipe(uglify())
  .pipe(gulp.dest("./dist/js"));
});

// copy img
gulp.task("images", function html() {
  return gulp
    .src("./app/**/*.{gif,jpg,png,svg,jpeg}")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/"));
});

// Static server
gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: "./app",
    },
  });
});

// watch sass
gulp.task("watch", ["serve", "sass"], function (done) {
  gulp.watch("app/scss/**/*.scss", ["sass"]);
  gulp.watch("app/*.html").on("change", browserSync.reload);
  done();
});

// clean dist folder
gulp.task("clean:dist", function () {
  return del.sync("dist");
});

gulp.task("build", ['clean:dist','copycss','html','images','copyjs'], function(done){
  console.log("======================================================");
  console.log("==================BUILD SUCCESSFULL===================");
  console.log("======================================================");
  done();
})