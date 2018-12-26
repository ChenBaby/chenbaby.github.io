---
title: Gulp一些常用API
date: 2018-12-14 13:33:41
tags: Gulp
---
Gulp前端自动化构建工具，常用于：
css/less编译
html/css/js/图片等资源的压缩与合并
babel转译等等

<!-- more -->

* gulp.src() –全局匹配一个或多个文件
* gulp.dest() –将文件写入目录
* gulp.symlink() –与dest相似，但是使用软连接形式
* gulp.task() –定义任务
* gulp.lastRun() –获得上次成功运行的时间戳
* gulp.parallel() –并行运行任务
* gulp.series() –运行任务序列
* gulp.watch() –当文件发生变化时做某些操作
* gulp.tree() –获得任务书树
* gulp.registry() –获得或注册任务

### gulp.task
`gulp.task(name[, deps], fn)`

gulp 3.X可以以数组形式传入任务，如下
```
gulp.task('watch', function() {
  gulp.watch('app/css/*.css', ['styles']);
  gulp.watch('app/js/*.js', ['scripts']);
  gulp.watch('app/img/*', ['images']);
});
```
gulp 4.x不再能够通过数组形式传入任务，你需要使用gulp.series()和gulp.parallel()来执行他们

**gulp.series 和 gulp.parallel**
```
gulp.task('default',gulp.parallel('taskA','taskB'));//并行执行
gulp.task('default',gulp.series('taskA','taskB'));//按顺序执行
```
gulp.task又增加了一种用法，即传递一个具名函数作为参数，将自动注册以该函数名命名的任务
```
function compile() {
    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}
gulp.task(compile); //使用gulp.task注册taskName,可将函数名命名的任务，在命令行通过敲gulp taskname的方式执行

gulp.task('default',gulp.series(compile) //这里不需要引号
```
### gulp.src
`gulp.src(globs[, options])`
将返回一个 Vinyl files 的 stream 它可以被 piped 到别的插件中。
```
gulp.src('app/src/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
```
globs
类型： String 或 Array
可以直接写文件的路径

### gulp.dest
`gulp.dest(path[, options])`
能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，因此你可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。

path
类型： String or Function
文件将被写入的路径（输出目录）。也可以传入一个函数，在函数中返回相应路径

### gulp.watch
`gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])`
监视文件，并且可以在文件发生改动时候做一些事情。

* `gulp.watch(glob[, opts], tasks)`
glob
类型： String or Array
一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动。
tasks
类型： Array
需要在文件变动后执行的一个或者多个通过 gulp.task() 创建的 task 的名字
```
var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```
* `gulp.watch(glob[, opts, cb])`
cb(event)
类型： Function
每次变动需要执行的 callback。
```
gulp.watch('js/**/*.js', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```
callback 会被传入一个名为 event 的对象。这个对象描述了所监控到的变动：

event.type
类型： String
发生的变动的类型：added, changed 或者 deleted。

event.path
类型： String
触发了该事件的文件的路径。