const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Compile SCSS into CSS
gulp.task('sass', () => {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

// Watch SCSS files
gulp.task('sass:watch', () => {
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});

// Default task
gulp.task('default', gulp.series('sass', 'sass:watch'));