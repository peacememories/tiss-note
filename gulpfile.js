var gulp = require('gulp')
var gulp_webpack = require('gulp-webpack')
var webpack = require('webpack')
var cfx = require('cfx')
var named = require('vinyl-named')
var ncp = require('ncp').ncp

gulp.task('content-scripts', function() {
    return gulp.src([
        'src/content-scripts/favorites.js',
        'src/content-scripts/course-site.js'
    ])
        .pipe(named())
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
                filename: '[name].js'
            },
            plugins: [
                new webpack.ProvidePlugin({
                    riot: 'riot'
                }),
                new webpack.optimize.UglifyJsPlugin()
            ]
        }))
        .pipe(gulp.dest('build/data/'))
})

gulp.task('lib', function() {
    return gulp.src('src/main.js')
        .pipe(gulp_webpack({
            node: {
                global: true
            },
            output: {
                filename: 'main.js'
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin()
            ],
            externals: [
                function(context, request, callback) {
                    if(/^sdk\/.*/.test(request)) {
                        callback(null, 'require("' + request + '")')
                    } else {
                        callback()
                    }
                }
            ]
        }))
        .pipe(gulp.dest('build/lib'))
})

gulp.task('build', ['lib', 'content-scripts'], function() {
    ncp('data', 'build/data')
    ncp('package.json', 'build/package.json')
})

gulp.task('run', ['build'], function(cb) {
    var child = cfx.run({
        pkgdir: __dirname + '/build'
    })
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    child.on('close', cb)
})
