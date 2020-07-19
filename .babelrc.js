const pkg = require('./package.json');
module.exports = {
    plugins: ['@babel/plugin-transform-runtime'],
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
};
