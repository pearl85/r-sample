const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    //context: path.join(__dirname, './'),
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'www'),
        filename: 'bundle.js',
    },
    module: {
        rules: [ {
            test: /\.js$/,
            exclude: /node_modules/,
            //use: ['babel-loader', 'eslint-loader']
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            //use: ['css-loader','csslint-loader']
            use: ['css-loader']
        }],
    },
    plugins: [
        /*new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),*/
        new ExtractTextPlugin({ filename: 'styles.css', disable: false, allChunks: true })
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    },
};
