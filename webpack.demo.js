const path = require('path');

module.exports = {
    entry: './demo/index.jsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'demo/build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        inline: true,
        contentBase: './demo/build',
        port: 3000,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /(\.html|\.txt)$/,
                loader: 'raw-loader'
            }
        ]
    }
};
