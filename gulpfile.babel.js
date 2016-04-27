/* eslint-disable global-require, no-useless-concat */

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del'; // Used for cleaning up the folders
import babelify from 'babelify'; // Used to convert ES6 & JSX to ES5
import rollupify from 'rollupify'; // Used to tree shake the code
import browserify from 'browserify'; // Providers "require" support, CommonJS
import chalk from 'chalk'; // Allows for coloring for logging
import source from 'vinyl-source-stream'; // Vinyl stream support
import buffer from 'vinyl-buffer'; // Vinyl stream support

const $ = gulpLoadPlugins();

GLOBAL.config = {
	env: 'prod',
	notify: true
};

GLOBAL.config.env = 'dev';

function mapError(err) {
	if (err.fileName) {
		// Regular error
		$.util.log(chalk.red(err.name)
		+ ': ' + chalk.yellow(err.fileName.replace(__dirname + 'app/scripts/', ''))
		+ ': ' + 'Line ' + chalk.magenta(err.lineNumber)
		+ ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
		+ ': ' + chalk.blue(err.description));
	} else {
		// Browserify error..
		$.util.log(chalk.red(err.name)
		+ ': '
		+ chalk.yellow(err.message));
	}
}

gulp.task('styles', () => {
	return gulp.src('client/styles/*.scss')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.sass.sync({
			outputStyle: 'expanded',
			precision: 10,
			includePaths: ['.']
		}).on('error', $.sass.logError))
		.pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('.bin/client/styles'))
		.pipe($.if(GLOBAL.config.notify, $.notify({ message: 'Generated file: <%= file.relative %>' })));
});

gulp.task('scripts', () => {
	const bundler = browserify('client/scripts/main.js', {
		fullPaths: false,
		debug: true
	});

	const bundleTimer = $.duration('JS browserify bundle time');

	if (GLOBAL.config.env !== 'dev') {
		bundler.transform(rollupify);
	}

	bundler.transform(babelify, {
		presets: ['es2015'],
		sourceMaps: true
	});

	return bundler
		.bundle()
		.on('error', mapError) // Map error reporting
		.pipe(source('main.js')) // Set source name
		.pipe(buffer()) // Convert to gulp pipeline
		.pipe($.rename('main.build.js')) // Rename the output file
		.pipe($.sourcemaps.init({ loadMaps: true })) // Extract the inline sourcemaps
		.pipe($.sourcemaps.write('.')) // Set folder for sourcemaps to output to
		.pipe(gulp.dest('.bin/client/scripts')) // Set the output folder
		.pipe($.if(GLOBAL.config.notify, $.notify({ message: 'Generated file: <%= file.relative %>' }))) // Output the file being created
		.pipe(bundleTimer); // Output time timing of the file creation
});

gulp.task('fonts', () => {
	return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', (err) => {
		if (err) {
			$.util.log(chalk.red(err));
		}
	})
		.concat('client/fonts/**/*'))
		.pipe(gulp.dest('.bin/client/fonts'));
});

gulp.task('images', () => {
	return gulp.src('client/images/**/*')
		.pipe($.cache($.imagemin({
			progressive: true,
			interlaced: true,
			// don't remove IDs from SVGs, they are often used
			// as hooks for embedding and styling
			svgoPlugins: [{ cleanupIDs: false }]
		})))
		.pipe(gulp.dest('.bin/client/images'));
});

gulp.task('views', () => {
	gulp.src(['views/**/*.hbs'])
		.pipe($.handlebars({
			handlebars: require('handlebars')
		}))
		.pipe($.defineModule('node'))
		.pipe(gulp.dest('.bin/views/'));
});

gulp.task('clean', del.bind(null, ['.bin', '.tmp', 'dist']));

gulp.task('build:dev', ['styles', 'scripts', 'fonts', 'images', 'views'], () => {
	gulp.watch('client/styles/**/*.scss', ['styles']);
	gulp.watch('client/scripts/**/*.js', ['scripts']);
	gulp.watch('client/fonts/**/*', ['fonts']);
	gulp.watch('client/images/**/*', ['images']);

	gulp.watch('views/**/*.hbs', ['views']);
});

gulp.task('build:production', ['styles', 'scripts', 'fonts', 'images', 'views']);

gulp.task('start:dev', ['build:dev'], () => {
	$.nodemon({
		script: 'server.js',
		ext: 'hbs js'
	})
	.on('restart', () => {
		$.util.log(chalk.yellow('[nodemon] restarted!'));
	});
});
