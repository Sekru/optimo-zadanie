
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module:{
        rules:[{
            test: /\.m?ts$|\.tsx?$/,
            exclude: /node_modules/,
            use: {
                loader: "ts-loader",
                options: {
                    onlyCompileBundledFiles: true,
                }
            },
        },]
    },
    output: {
        publicPath: '/',
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist/'),
    },
    mode: 'development',
    devServer: {
        open: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        host: '0.0.0.0',
        hot: true,
        port: 8080,
    },
    devtool: 'inline-source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve('assets'), to: path.resolve(__dirname, 'dist/assets') },
            ]
        }),
        new HTMLWebpackPlugin({
            template: 'src/index.html',
            filename: path.join(__dirname,'dist','index.html')
        })
    ]
};