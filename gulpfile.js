var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

gulp.task('sass', function(){
  return gulp.src('./src/scss/**/*.scss')
        .pipe(plumber({
          errorHandler: function(err){
            notify.onError({
              title: "Gulp Error in " + err.plugin,
              message: err.toString()
            })(err);
                this.emit('end');
          }}))
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
        .pipe(browserSync.stream());
});

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: './src/'
    }
  });
});

gulp.task('default', ['browserSync', 'sass'], function(){
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.html', browserSync.reload);
  gulp.watch('./src/js/**/*.js', browserSync.reload);
});