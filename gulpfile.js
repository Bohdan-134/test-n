const gulp = require('gulp');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const jsmin = require('gulp-jsmin');
const svgSprite = require('gulp-svg-sprite');
const browserSync = require("browser-sync").create();

const paths = {
    html: {
        src: 'src/*.html',
        dist: 'dist'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dist: 'dist/css'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dist: 'dist/js/'
    },
    icons: {
        src: 'src/icons/**/*.svg',
        dist: 'dist/icons'
    },
    fonts: {
        src: 'src/fonts/**/*.ttf',
        dist: 'dist/fonts'
    }
}

function clean() {
    return del(["dist"]);
}

function html() {
    return gulp
        .src(paths.html.src)
        .pipe(htmlmin())
        .pipe(gulp.dest(paths.html.dist))
        .pipe(browserSync.stream());
}

function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(concat('main.css'))
        .pipe(gulp.dest(paths.styles.dist))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp
        .src(paths.scripts.src)
        .pipe(jsmin())
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(browserSync.stream());
}

function icons() {
    return gulp
        .src(paths.icons.src)
        .pipe(svgSprite({
            mode: {
                symbol: {
                    dest: '.',
                    sprite: 'sprite.svg'
                }
            }
        }))
        .pipe(gulp.dest(paths.icons.dist))
        .pipe(browserSync.stream());
}

function fonts() {
    return gulp
        .src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dist))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "dist",
        },
    });
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.icons.src, icons);
    gulp.watch(paths.fonts.src, fonts);
}

const build = gulp.series(
    clean,
    html,
    gulp.parallel(styles, scripts, icons, fonts),
    watch
);

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.icons = icons;
exports.fonts = fonts;
exports.default = build;