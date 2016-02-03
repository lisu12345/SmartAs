// 获取 gulp
var gulp = require('gulp'),
	less = require('gulp-less'),// 获取 gulp-less 模块
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');
	//babel = require('gulp-babel'),
	//notify = require('gulp-notify');
const scripts = {
	react: {
		components: [
			'src/main/resources/web/ui/components/index.js',
			'src/main/resources/web/ui/components/util/index.js',
			'src/main/resources/web/ui/components/dom-align/index.js',
			'src/main/resources/web/ui/components/css-animation/index.js',
			'src/main/resources/web/ui/components/align/index.js',
			'src/main/resources/web/ui/components/animate/index.js',
			'src/main/resources/web/ui/components/trigger/index.js',
			'src/main/resources/web/ui/components/notification/index.js',
			'src/main/resources/web/ui/components/checkbox/index.js',
			'src/main/resources/web/ui/components/input-number/index.js',
			'src/main/resources/web/ui/components/dropdown/index.js',
			'src/main/resources/web/ui/components/radio/index.js',
			'src/main/resources/web/ui/components/menu/index.js',
			'src/main/resources/web/ui/components/select/index.js',
			'src/main/resources/web/ui/components/switch/index.js',
			'src/main/resources/web/ui/components/progress/index.js',
			'src/main/resources/web/ui/components/tooltip/index.js',
			'src/main/resources/web/ui/components/dialog/index.js',
			'src/main/resources/web/ui/components/tabs/index.js',
			'src/main/resources/web/ui/components/upload/index.js',
			'src/main/resources/web/ui/components/form/index.js',
			'src/main/resources/web/ui/components/pagination/index.js',
			'src/main/resources/web/ui/components/table/index.js',
			'src/main/resources/web/ui/components/steps/index.js',
		],
		wegits: [
			'src/main/resources/web/ui/wegits/index.js',
			'src/main/resources/web/ui/wegits/layout/index.js',
			'src/main/resources/web/ui/wegits/icon/index.js',
			'src/main/resources/web/ui/wegits/breadcrumb/index.js',
			'src/main/resources/web/ui/wegits/input/index.js',
			'src/main/resources/web/ui/wegits/progress/index.js',
			'src/main/resources/web/ui/wegits/checkbox/index.js',
			'src/main/resources/web/ui/wegits/switch/index.js',
			'src/main/resources/web/ui/wegits/radio/index.js',
			'src/main/resources/web/ui/wegits/form/index.js',
			'src/main/resources/web/ui/wegits/input-number/index.js',
			'src/main/resources/web/ui/wegits/message/index.js',
			'src/main/resources/web/ui/wegits/notification/index.js',
			'src/main/resources/web/ui/wegits/affix/index.js',
			'src/main/resources/web/ui/wegits/alert/index.js',
			'src/main/resources/web/ui/wegits/badge/index.js',
			'src/main/resources/web/ui/wegits/button/index.js',
			'src/main/resources/web/ui/wegits/menu/index.js',
			'src/main/resources/web/ui/wegits/select/index.js',
			'src/main/resources/web/ui/wegits/dropdown/index.js',
			'src/main/resources/web/ui/wegits/modal/index.js',
			'src/main/resources/web/ui/wegits/tooltip/index.js',
			'src/main/resources/web/ui/wegits/tabs/index.js',
			'src/main/resources/web/ui/wegits/popconfirm/index.js',
			'src/main/resources/web/ui/wegits/upload/index.js',
			'src/main/resources/web/ui/wegits/tag/index.js',
			'src/main/resources/web/ui/wegits/spin/index.js',
			'src/main/resources/web/ui/wegits/popover/index.js',
			'src/main/resources/web/ui/wegits/pagination/index.js',
			'src/main/resources/web/ui/wegits/table/index.js',
			'src/main/resources/web/ui/wegits/steps/index.js',
		]
	},
	core: [
		'src/main/resources/web/core/Namespace.js',
		'src/main/resources/web/core/EventBus.js',
		'src/main/resources/web/core/ActionTypes.js',
		'src/main/resources/web/core/Store.js',
		'src/main/resources/web/core/Resource.js',
		'src/main/resources/web/core/DataSource.js',
		'src/main/resources/web/core/Service.js',
		
	],
};


/*
gulp.task('minifycss', function() {                          
	// 1. 找到 less 文件
	gulp.src('src/main/resources/style/**.less')
    .pipe(concat('smart.mini.css'))//合并CSS文件
	// 2. 编译为css
	.pipe(less())
	// 3. 另存文件
	.pipe(minifyCss())
	.pipe(gulp.dest('src/main/resources/web/ui/css')) 
});*/

// 编译less
// 在命令行输入 gulp less 启动此任务
gulp.task('less', function() {
	// 1. 找到 less 文件
	gulp.src('src/main/resources/style/**.less')
		.pipe(concat('smart.css')) //合并CSS文件
		// 2. 编译为css
		.pipe(less())
		// 3. 另存文件
		//.pipe(minifyCss())
		.pipe(gulp.dest('src/main/resources/web/ui/css'))
});


// JS处理任务
gulp.task('core', function() {
	return gulp.src(scripts.core) //引入所有需处理的JS
		.pipe(jshint.reporter('default')) //JS代码检查
		//.pipe(babel({presets: ['es2015']}))
		.pipe(concat('main.js')) //合并JS文件
		.pipe(gulp.dest('src/main/resources/web/core')) //完整版输出
		.pipe(rename({suffix: '.min'})) //重命名
		.pipe(uglify()) //压缩JS
		.pipe(gulp.dest('src/main/resources/web/core')) //压缩版输出
		//.pipe(notify({message: 'core JS文件处理完成'}));
});

//JS处理任务
gulp.task('components', function() {
	return gulp.src(scripts.react.components) //引入所有需处理的JS
		.pipe(jshint.reporter('default')) //JS代码检查
		.pipe(concat('main.js')) //合并JS文件
		.pipe(gulp.dest('src/main/resources/web/ui/components')) //完整版输出
		.pipe(rename({suffix: '.min'})) //重命名
		.pipe(uglify()) //压缩JS
		.pipe(gulp.dest('src/main/resources/web/ui/components')) //压缩版输出
		//.pipe(notify({message: 'components JS文件处理完成'}));
});
//JS处理任务
gulp.task('wegits', function() {
	return gulp.src(scripts.react.wegits) //引入所有需处理的JS
		.pipe(jshint.reporter('default')) //JS代码检查
		.pipe(concat('main.js')) //合并JS文件
		.pipe(gulp.dest('src/main/resources/web/ui/wegits')) //完整版输出
		.pipe(rename({suffix: '.min'})) //重命名
		.pipe(uglify()) //压缩JS
		.pipe(gulp.dest('src/main/resources/web/ui/wegits')) //压缩版输出
		//.pipe(notify({message: 'wegits JS文件处理完成'}));
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function() {
	// 监听文件修改，当文件被修改则执行 less 任务
	//gulp.watch('less/**.less', ['less','core','components','wegits'])
})

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 less 任务和 auto 任务
gulp.task('default', ['less','core','components','wegits'])