const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // gets overwritten by --mode development/production of npm start command
    mode: 'development',

    entry: {
        main: path.resolve(__dirname, 'src/index.ts')
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },

    // optimization: {
    //     minimize: true,
    //     minimizer: [new TerserPlugin({
    //         sourceMap: false
    //     })],
    // },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                    },
                ]
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
    ]
};
