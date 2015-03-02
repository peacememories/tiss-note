var gulp = require('gulp')
var gulp_webpack = require('gulp-webpack')
var webpack = require('webpack')
var cfx = require('cfx')

gulp.task('content-script', function() {
    return gulp.src('src/main.js')
        .pipe(gulp_webpack({
            module: {
                loaders: [
                    {test: /\.tag/, loader: 'riotjs-loader'}
                ]
            },
            node: {
                global: true
            },
            output: {
                filename: 'content-script.js'
            },
            plugins: [
                new webpack.ProvidePlugin({
                    riot: 'riot'
                }),
                new webpack.optimize.UglifyJsPlugin()
            ]
        }))
        .pipe(gulp.dest('data/'))
})

gulp.task('run', ['content-script'], function(cb) {
    var child = cfx.run({
        pkgdir: __dirname
    })
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    child.on('close', cb)
})
