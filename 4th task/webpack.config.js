

var NODE_ENV = process.env.NODE_ENV || 'development';
var webpack = require('webpack');

module.exports = {
	entry: './main.js',
	output: {
        path: __dirname + "/dist",
        publicPath:'./dist/',
		filename: 'bundle.js'
	},
	devServer: {
        host: "localhost",
        port: 8080,
        contentBase: "./"
    },
	watch: NODE_ENV === 'development',
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV:JSON.stringify(NODE_ENV)
		})
	],
	module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.png$/,
                loader:"url?limit=30000&name=[name].[ext]"
            }
        ]
    }
};
