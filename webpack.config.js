const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.argv[process.argv.indexOf('--mode') + 1] ? process.argv[process.argv.indexOf('--mode') + 1] : 'development';

module.exports = {
    // gets overwritten by --mode development/production of npm start command
    mode: 'development',

    entry: {
        main: path.resolve(__dirname, 'src/index.ts')
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/compiled'),
    },

    optimization: {
        minimize:  mode === 'production' ? true : false,
        minimizer: [new TerserPlugin({
            sourceMap: mode === 'production' ? false : true,
        })],
    },

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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*'],
        }),
    ]
};
