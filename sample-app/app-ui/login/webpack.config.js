var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

const ssrCSS = new ExtractTextPlugin({ filename: 'server-bundle.[chunkhash].css', disable: false, allChunks: true });
const csrCSS = new ExtractTextPlugin({ filename: 'client-bundle.[chunkhash].css', disable: false, allChunks: true });

const path = require('path');
module.exports = [{
     entry: {
        server_bundle: './src/app/server.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server-bundle.js',
        publicPath: '/'
    },
    target: 'node',
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: true,
        __dirname: true
    },
    plugins: [
        //new CopyWebpackPlugin([{ from: 'src/app/status.html'},
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
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: ["node_modules", "dist"],
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader']
            })
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules'
        ]

    }
}, {
    entry: {
        client_bundle: './src/app/client.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        publicPath: '/',
        filename: "[name].[chunkhash].js",
        chunkFilename: "[chunkhash].js"
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
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
        }),
        ssrCSS,
        csrCSS,
        new ManifestPlugin()
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: [
                /dist/
            ],
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            include: [
                path.resolve(__dirname, "node_modules/common_ui/src/app/components/header/header.css")
            ],
            use: ssrCSS.extract({
                use: ['css-loader']
            })
        }, {
            test: /\.css$/,
            exclude: [
                path.resolve(__dirname, "node_modules/common_ui/src/app/components/header/header.css")
            ],
            use: csrCSS.extract({
                use: ['css-loader']
            })
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules'
        ]
    }
}];
