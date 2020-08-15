/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
// const fs = require('fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const config = require('./config');

// const nodeModules = {};
// fs.readdirSync('node_modules')
//     .filter((x) => {
//         return ['.bin'].indexOf(x) === -1;
//     })
//     .forEach((mod) => {
//         nodeModules[mod] = `commonjs ${mod}`;
//     });

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false, // if you don't put this is, __dirname
        __filename: false, // and __filename return blank or /
    },
    externals: [nodeExternals()],
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                    mangle: true,
                    compress: {
                        sequences: true,
                        dead_code: true,
                        conditionals: true,
                        booleans: true,
                        unused: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: true,
                    },
                },
                parallel: true,
                sourceMap: true,
            }),
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    output: {
        filename: `server.${config.version}.bundle.js`,
        path: path.resolve(__dirname, 'bundle'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-transform-runtime',
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'package.json', to: './' },
                { from: 'package-lock.json', to: './' },
                { from: 'DEPLOY-README.txt', to: './' },
                { from: '.env', to: './' },
                { from: 'config.js', to: './' },
            ],
        }),
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.js'],
    },
};
