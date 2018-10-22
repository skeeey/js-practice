var gulp = require('gulp');
var clean = require('gulp-clean');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');

gulp.task('clean', function () {
    return gulp.src(['build/*', 'dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('lint', function () {
    return gulp.src('src/console/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('concat-vendors', [], function() {
    return gulp.src(['node_modules/angular/angular.min.js',
        'node_modules/angular-translate/dist/angular-translate.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/ngstorage/ngStorage.min.js'])
        .pipe(concat('vendors.min.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('minify-console', function () {
    return gulp.src(['src/console/i18n/translations.js',
        'src/console/app.module.js',
        'src/console/app.config.js',
        'src/console/app.startup.js',
        'src/console/common/common.module.js',
        'src/console/services/**/*.module.js',
        'src/console/services/**/*.service.js',
        'src/console/login/login.module.js',
        'src/console/login/login.ctrl.js',
        'src/console/home/home.module.js',
        'src/console/home/home.ctrl.js',
        'src/console/dashboard/dashboard.module.js',
        'src/console/dashboard/dashboard.ctrl.js',
        'src/console/grains/grains.module.js',
        'src/console/grains/**/*.ctrl.js',
        'src/console/leaves/leaves.module.js',
        'src/console/leaves/**/*.ctrl.js',])
        .pipe(sourcemaps.init())
        .pipe(concat('console.temporary.js'))
        .pipe(gulp.dest('build'))
        .pipe(rename('console.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'));
});

gulp.task('hash-files', ['concat-vendors', 'minify-console'], function () {
    return gulp.src(['build/*.min.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-source-map', ['hash-files'], function () {
    return gulp.src(['build/*.js.map']).pipe(gulp.dest('dist/js'));
});

gulp.task('copy-css', function () {
    gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css']).pipe(gulp.dest('dist/css'));
    gulp.src(['node_modules/bootstrap/dist/fonts/glyphicons-*']).pipe(gulp.dest('dist/fonts'));
    return gulp.src(['src/assets/css/console.css']).pipe(gulp.dest('dist/css'));
});

gulp.task('copy-html', function () {
    gulp.src(['src/console/login/login.tpl.html']).pipe(gulp.dest('dist/console/login'));
    gulp.src(['src/console/home/home.tpl.html']).pipe(gulp.dest('dist/console/home'));
    gulp.src(['src/console/dashboard/dashboard.tpl.html']).pipe(gulp.dest('dist/console/dashboard'));
    gulp.src(['src/console/grains/bookmarks/bookmarks.tpl.html']).pipe(gulp.dest('dist/console/grains/bookmarks'));
    gulp.src(['src/console/grains/tags/tags.tpl.html']).pipe(gulp.dest('dist/console/grains/tags'));
    return gulp.src(['src/console/leaves/tasks/tasks.tpl.html']).pipe(gulp.dest('dist/console/leaves/tasks'));
});

gulp.task('main', ['copy-source-map', 'copy-css', 'copy-html'], function () {
    return gulp.src(['dist/js/*.json', 'index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'lint'], function () {
    return gulp.start('main'); 
});

var proxyOptions = {
    target: 'http://localhost:3000', // proxy to fake server
    changeOrigin: true
};

gulp.task('connect', function() {
    connect.server({
        port: 8888,
        root: 'dist',
        livereload: true,
        middleware: function() {
            return [proxy(['/api'], proxyOptions)];
        }
    });
});

gulp.task('dev-reload', ['main'], function () {
    connect.reload();
});
 
gulp.task('dev-watch', function () {
    return gulp.watch(['src/console/**/*.html', 'src/console/**/*.js', 'src/assets/css'], ['dev-reload']);
});
 
gulp.task('dev-server', ['connect', 'dev-watch']);
