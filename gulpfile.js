var gulp = require('gulp')
var webpack = require('gulp-webpack')

gulp.task('content-script', function() {
    return gulp.src('src/main.jsx')
        .pipe(webpack({
            module: {
                loaders: [
                    {test: /\.jsx/, loader: 'jsx-loader'}
                ]
            },
            node: {
                global: true
            },
            output: {
                filename: 'content-script.js'
            }
        }))
        .pipe(gulp.dest('data/'))
})
