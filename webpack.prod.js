/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
// const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const pkg = require('./package.json');

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
    // entry: path.resolve(__dirname, 'src', 'index.js'),
    // Contoh bundle dengan worker thread
    entry: {
        'server.bundle': path.resolve(__dirname, 'src', 'index.js'),
        'buble-sorts.worker': path.resolve(
            __dirname,
            'src',
            'workers',
            'buble-sorts.worker.js',
        ),
        'calc-primes.worker': path.resolve(
            __dirname,
            'src',
            'workers',
            'calc-primes.worker.js',
        ),
        'workerpool-primes.worker': path.resolve(
            __dirname,
            'src',
            'workers',
            'workerpool-primes.worker.js',
        ),
    },
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
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
                extractComments: false,
                terserOptions: {
                    mangle: true,
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    output: {
        // filename: 'server.bundle.js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'bundle', `server-${config.version}`),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        node: pkg.engines.node,
                                    },
                                },
                            ],
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    regenerator: true,
                                },
                            ],
                            '@babel/plugin-proposal-object-rest-spread',
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
                { from: 'winston-logs', to: './winston-logs' },
            ],
        }),
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.js'],
    },
};
