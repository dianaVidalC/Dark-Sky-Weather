'use strict';

var gulp         = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var browserSync  = require("browser-sync").create();
var sass         = require("gulp-sass");
var nodemon      = require("gulp-nodemon");
var concat       = require("gulp-concat");

var config = {
    source  :'./src/',
    dist    :'./public/'
};

var paths = {
    assets   :"assets/",
    html     :"**/*.html",
    js       :"js/**/*.js",
    sass     :"scss/**/*.scss",
    mainSass :"scss/main.scss",
    mainJS   :"js/index.js",
};

var sources = {
    assets      :config.source + paths.assets,
    html        :config.source + paths.html,
    js          :config.source + paths.js,
    sass        :config.source + paths.sass,
    rootSass    :config.source + paths.assets + paths.mainSass,
    rootJs      :config.source + paths.assets + paths.js,
};

gulp.task("html",()=>{
    gulp.src(sources.html)
        .pipe(gulp.dest(config.dist));
});

gulp.task("watch-html",["html"],(done)=>{
    browserSync.reload();
    done();
});

gulp.task("sass",()=>{
    gulp.src(sources.rootSass)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({
            outputStyle: "compressed"
            }).on("error",sass.logError))
        .pipe(gulp.dest(config.dist + paths.assets + "css"));
})

gulp.task("watch-sass",["sass"],(done)=>{
    browserSync.reload();
    done();
})

gulp.task("js",()=>{
   gulp.src(sources.rootJs)
       .pipe(concat("bundle.js"))
       .pipe(gulp.dest(config.dist + paths.assets + "js"));
});

gulp.task("watch-js",["js"],(done)=>{
    browserSync.reload();
    done();
})

gulp.task('nodemon', (cb)=>{
    var callbackCalled = false;
    return nodemon({script: 'server.js'}).on('start', function(){
        if(!callbackCalled){
            callbackCalled = true;
            cb();
        }
    });
});

gulp.task('browser-sync', ['nodemon'],function () {
    browserSync.init({
        port: 3007,
        proxy: {
            target: "localhost:4000",
            ws: true
        }
    });
});
    gulp.watch(sources.html,["watch-html"]);
    gulp.watch(sources.js,["watch-js"]);
    gulp.watch(sources.sass,["watch-sass"]);

gulp.task("default",["html","js","sass","browser-sync"]);