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
			'src/main/resources/web/ui/components/react-slick.js',
			'src/main/resources/web/ui/components/util.js',
			'src/main/resources/web/ui/components/dom-align.js',
			'src/main/resources/web/ui/components/css-animation.js',
			'src/main/resources/web/ui/components/align.js',
			'src/main/resources/web/ui/components/animate.js',
			'src/main/resources/web/ui/components/trigger.js',
			'src/main/resources/web/ui/components/notification.js',
			'src/main/resources/web/ui/components/checkbox.js',
			'src/main/resources/web/ui/components/input-number.js',
			'src/main/resources/web/ui/components/dropdown.js',
			'src/main/resources/web/ui/components/radio.js',
			'src/main/resources/web/ui/components/menu.js',
			'src/main/resources/web/ui/components/select.js',
			'src/main/resources/web/ui/components/switch.js',
			'src/main/resources/web/ui/components/progress.js',
			'src/main/resources/web/ui/components/tooltip.js',
			'src/main/resources/web/ui/components/dialog.js',
			'src/main/resources/web/ui/components/tabs.js',
			'src/main/resources/web/ui/components/upload.js',
			'src/main/resources/web/ui/components/form.js',
			'src/main/resources/web/ui/components/pagination.js',
			'src/main/resources/web/ui/components/table.js',
			'src/main/resources/web/ui/components/steps.js',
			'src/main/resources/web/ui/components/cascader.js',
			'src/main/resources/web/ui/components/gregorian-calendar.js',
			'src/main/resources/web/ui/components/time-picker.js',
			'src/main/resources/web/ui/components/calendar.js',
			'src/main/resources/web/ui/components/slider.js',
			'src/main/resources/web/ui/components/tree.js',
			'src/main/resources/web/ui/components/tree-select.js',
		],
		wegits: [
			'src/main/resources/web/ui/wegits/index.js',
			'src/main/resources/web/ui/wegits/layout.js',
			'src/main/resources/web/ui/wegits/icon.js',
			'src/main/resources/web/ui/wegits/breadcrumb.js',
			'src/main/resources/web/ui/wegits/input.js',
			'src/main/resources/web/ui/wegits/progress.js',
			'src/main/resources/web/ui/wegits/checkbox.js',
			'src/main/resources/web/ui/wegits/switch.js',
			'src/main/resources/web/ui/wegits/radio.js',
			'src/main/resources/web/ui/wegits/form.js',
			'src/main/resources/web/ui/wegits/input-number.js',
			'src/main/resources/web/ui/wegits/message.js',
			'src/main/resources/web/ui/wegits/notification.js',
			'src/main/resources/web/ui/wegits/affix.js',
			'src/main/resources/web/ui/wegits/alert.js',
			'src/main/resources/web/ui/wegits/badge.js',
			'src/main/resources/web/ui/wegits/button.js',
			'src/main/resources/web/ui/wegits/menu.js',
			'src/main/resources/web/ui/wegits/select.js',
			'src/main/resources/web/ui/wegits/dropdown.js',
			'src/main/resources/web/ui/wegits/modal.js',
			'src/main/resources/web/ui/wegits/tooltip.js',
			'src/main/resources/web/ui/wegits/tabs.js',
			'src/main/resources/web/ui/wegits/popconfirm.js',
			'src/main/resources/web/ui/wegits/upload.js',
			'src/main/resources/web/ui/wegits/tag.js',
			'src/main/resources/web/ui/wegits/spin.js',
			'src/main/resources/web/ui/wegits/popover.js',
			'src/main/resources/web/ui/wegits/pagination.js',
			'src/main/resources/web/ui/wegits/table.js',
			'src/main/resources/web/ui/wegits/steps.js',
			'src/main/resources/web/ui/wegits/timeline.js',
			'src/main/resources/web/ui/wegits/cascader.js',
			'src/main/resources/web/ui/wegits/time-picker.js',
			'src/main/resources/web/ui/wegits/calendar.js',
			'src/main/resources/web/ui/wegits/date-picker.js',
			'src/main/resources/web/ui/wegits/slider.js',
			'src/main/resources/web/ui/wegits/tree.js',
			'src/main/resources/web/ui/wegits/tree-select.js',
			'src/main/resources/web/ui/wegits/carousel.js',
			'src/main/resources/web/ui/wegits/transfer.js',
			'src/main/resources/web/ui/wegits/datagrid.jsx',
			'src/main/resources/web/ui/wegits/tree-form.jsx',
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