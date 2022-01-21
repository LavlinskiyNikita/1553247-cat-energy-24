import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgo';
import del from 'del';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// html

const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

// sripts

const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'));
}

// img b

const imageOptimize = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe( gulp.dest('build/img'));
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe( gulp.dest('build/img'));
}

// webp

const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest('build/img'))
}

//svg0

const svgO = () => {
  return gulp.src('source/img/**/*.svg')
  .pipe(svgo())
  .pipe(gulp.dest('build/img'))
}

//copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico'
  ], {
    base: 'source'
  })

  .pipe(gulp.dest('build'))
  done();
}

//clean

const clean = () => {
  return del('build')
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//reload

const reload = (done) => {
  browser.reload()
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// build
export const build = gulp.series(
  clean,
  copy,
  imageOptimize,
  gulp.parallel(
    styles,
    html,
    scripts,
    svgO,
    createWebp
  ),
);

export default  gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svgO,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);

