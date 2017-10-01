const gulp = require("gulp");
const babel = require("gulp-babel");
const path = require("path");
const SOURCE_JS = path.join(__dirname, "source/*.js");
const SOURCE_JS_BROWSER = path.join(__dirname, "source/browser/*.js");
const DIST_JS = path.join(__dirname, "dist/");
const DIST_JS_BROWSER = path.join(__dirname, "dist/browser/");
gulp.task("babel", function () {
    return gulp.src(SOURCE_JS)
        .pipe(babel())
        .pipe(gulp.dest(DIST_JS));
});

gulp.task("copy", function () {
    return gulp.src(SOURCE_JS_BROWSER)
        .pipe(gulp.dest(DIST_JS_BROWSER));
});
gulp.task("build", ["babel", "copy"]);
