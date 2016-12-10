//引入GULP文件
var gulp = require('gulp');
//模块加载器
var browserify = require('browserify');
//vinyl-source-stream 把 browserify 输出的数据进行准换，使之流符合 gulp 的标准
var source = require('vinyl-source-stream');
//马上运行自动加载插件的方法
var plugins = require('gulp-load-plugins')();
//实时刷新
var browserSync = require('browser-sync').create();

gulp.task('minifyHtml', function() {
	gulp.src('*.html')
		.pipe(plugins.minifyHtml())
		.pipe(gulp.dest('yaHtml'))
});


gulp.task('css', function() {
	gulp.src('css/*.css')
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest('yaCss'))
});

gulp.task('babel', function() {
	gulp.src('js/*.js')
		.pipe(plugins.babel({
			presets: ['es2015'],
		}))
		.pipe(gulp.dest('es5'))

})

gulp.task('browserify', function() {
	var a = browserify({
		entries: 'es5/import.js', //引入编译后的es5文件
	})
	return a.bundle()
		.pipe(source('bundle.js')) //转换流
		.pipe(gulp.dest('es5'))
})


gulp.task('watch', ['css', 'minifyHtml'], function() { //定义一个监视
	browserSync.reload()
})


gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch(['./css/**.css','./js/**.js','**.html'], ['watch']) //第一个参数里面的任意文件发生改变，就会触发第二个参数watch的执行

})