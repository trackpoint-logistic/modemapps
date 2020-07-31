const { src, dest, task, series } = require('gulp');

const webpack = require('webpack');
const sass = require('sass');

const Transform = require('stream').Transform;
const HTMLParser = require('node-html-parser');
const concat = require('gulp-concat');
const path = require('path')

const WEBPACK_OPTION = {
	devtool: 'source-map',
	mode: 'production',
	output: {
		path: path.resolve('./build'),
		filename: 'ol.js',
		library: 'ol',
		libraryTarget: 'umd',
		libraryExport: 'default'
	}
};

const SASS_OPTION = {
	sourceComments: false,
	outputStyle: "compressed",
	//outputStyle: "expanded",
	includePaths: ["node_modules"]
};


const openlayer = function () {
	const stream = new Transform({ objectMode: true });
	const files = [];

	stream._transform = function (file, enc, callback) {
		if (file.isNull()) {
			return callback();
		}

		if (file.isStream()) {
			return callback(new gutil.PluginError('HTML-SCSS', 'Streaming not supported'));
		}

		const type = path.extname(file.path).substr(1);
		files.push(file.path);
		callback();
	}

	stream._flush = function (callback) {
		const config = {
			entry: files
		};
		
		webpack(Object.assign(config, WEBPACK_OPTION), (err, stats) => {
			if(err){
				console.error(err)
			}
		});

		callback();
	}

	return stream;
}


var html = function () {
	const stream = new Transform({ objectMode: true });

	stream._transform = function (file, enc, callback) {

		if (file.isNull()) {
			return callback(null, file);
		}

		if (file.isStream()) {
			return callback(new gutil.PluginError('HTML-SCSS', 'Streaming not supported'));
		}

		const document = HTMLParser.parse(file.contents.toString(enc), {
			script: true,
			style: true
		});

		const styles = document.querySelectorAll('style');
		for (let i = 0, ii = styles.length; i < ii; i++) {
			const style = styles[i];
			const css = sass.renderSync({ ...SASS_OPTION, ...{ data: style.rawText } }).css;
			style.set_content(css.toString());
		}

		//file.contents = new Buffer(htmlmin.minify(document.toString(), MINIFY_OPTION));
		file.contents = new Buffer(document.toString());

		callback(null, file);
	};

	return stream;
}

task('html', function () {
	return src('src/*.html') 
		.pipe(html())
		.pipe(concat('ol.html'))
		.pipe(dest('./build'));
});

task('openlayer', function () {
	return src('src/*.js')
		.pipe(openlayer());
});

task('resources', function () {
	return src('src/resources/*.{gif,jpg,png,svg}')
		.pipe(dest('./build'));
});


exports.default = series(
	'html',
	'openlayer',
	'resources');
