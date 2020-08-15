const pkg = require('./package.json');
module.exports = {
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
};
