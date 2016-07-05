var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, "dist");
var APP_DIR = path.resolve(__dirname);

module.exports = {
    entry: {
        'bundle': './src/app.js',
        'mock': './src/mock.js'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js',
        publicPath: "/"
    },
    watch: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: APP_DIR,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ["es2015"],
                    
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css", {allChunks: true}),
        new webpack.OldWatchingPlugin()  
    ]
};