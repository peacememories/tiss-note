var gulp = require('gulp')
var gulp_webpack = require('gulp-webpack')
var webpack = require('webpack')

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
