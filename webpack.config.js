var path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'buble-loader',
                exclude: [/node_modules/],
                options: {
                    objectAssign: 'Object.assign',
                    transforms: {
                        modules: false,
                        dangerousForOf: true
                    }
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: [/node_modules/]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/index.html', to: './'}
        ])
    ]
};