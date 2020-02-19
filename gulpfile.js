const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const prettify = require('gulp-html-prettify');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });
    
});

gulp.task('views', function buildHTML() {
    return gulp.src('src/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest("src"))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(browserSync.stream())
  });

  gulp.task('templates', function() {
    gulp.src('src/*.html')
      .pipe(prettify({indent_char: ' ', indent_size: 2}))
      .pipe(gulp.dest('src/'))
  });

gulp.task('styles', function() {
    return gulp.src("src/sass/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade:false          
        }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream())
});

gulp.task('watch', function() {
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/*.pug", gulp.parallel('views'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
})



gulp.task('default', gulp.parallel('watch', 'templates', 'server', 'views', 'styles'));