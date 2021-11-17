const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
    app: path.join(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
    build: path.resolve(__dirname, 'public/build'),
};

const config = {
    mode: 'development',
    entry: {
        app: path.resolve(PATHS.app, 'index.tsx'),
    },
    output: {
        filename: `index.js`,
        path: PATHS.build
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
                options: {
                    compact: false,
                    cacheCompression: false,
                    cacheDirectory: true,
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: {
                                localIdentName: '[folder]__[local]__[hash:base64:5]',
                            },
                            importLoaders: 1,
                        },
                    },
                    require.resolve('postcss-loader'),
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Видео плеер',
            template: path.resolve(__dirname, 'src/templates/index.html'),
            filename: path.resolve(__dirname, 'public/build/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: ['node_modules'],
        alias: {
            '@components': path.resolve(PATHS.app, 'components'),
            '@utilities': path.resolve(PATHS.app, 'utilities'),
        },
    }
};

module.exports = config;