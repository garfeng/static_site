'use strict';

/*
webpack --optimize-minimize -p
 */
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

const cssFilename = "static/css/[name].css";
const extractTextPluginOptions = {
    publicPath: Array(cssFilename.split('/').length).join('../')
};
const extractOptions = Object.assign({
    fallback: 'style-loader',
    use: 'css-loader'
}, extractTextPluginOptions);

//'react-redux', 'redux'
module.exports = {
    entry: {
        main: './src/index.js',
        vendor: ["react", 'react-dom', 'jquery', 'react-router', 'reactstrap', 'tether','toml']
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'static/js/[name].js'
    },

    devServer: {
        inline: true,
        port: 9000
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            // @remove-on-eject-begin
            query: {
                babelrc: false,
                presets: [
                    ["react"],
                    ["es2015", {
                        "modules": false,
                        "loose": true
                    }]

                ],
            },
            // @remove-on-eject-end
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                extractOptions
            )
        }, {
            test: /\.(jpg|png|gif)/,
            loader: "url-loader"
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(eot|woff|ttf|eof|svg)/,
            loader: 'file-loader',
            query: {
                name: 'static/media/[name].[ext]'
            }
        }]
    },
    plugins: [
        new ExtractTextPlugin(cssFilename),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: './src/test.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};