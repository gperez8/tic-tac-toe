module.exports = {
	resolve: {
    	extensions: ['.js', '.jsx'],
  	},
	context: __dirname,
	entry: './app/js/index.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist',
	},
	devServer: {
		host: '0.0.0.0',
		port: 9000,
	},
	module: {
		loaders: [{
			test: /(\.js|.jsx)$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['env','es2015', 'react']
			}
		}],
	}
};