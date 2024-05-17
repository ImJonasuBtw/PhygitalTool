const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        site: './src/js/EntryPoints/site.ts',
        validation: './src/js/validation.ts',
        backOfficeHome: './src/js/EntryPoints/backOfficeHome.ts',
        mainThemePage: './src/js/EntryPoints/mainThemePage.ts',
        subThemePage: './src/js/EntryPoints/subThemePage.ts',
        flowPage: './src/js/EntryPoints/flowPage.ts',
        results: './src/js/EntryPoints/results.ts',
        questionsPage: './src/js/EntryPoints/questionsPage.ts',
        userPlatform: './src/js/EntryPoints/userPlatform.ts',
        managers: './src/js/EntryPoints/managers.ts',
    },
    output: {
        filename: '[name].entry.js',
        path: path.resolve(__dirname, '..', 'wwwroot', 'dist'),
        clean: true
    },
    devtool: 'source-map',
    mode: 'development',
    resolve: {
        extensions: [".ts", ".js"],
        extensionAlias: {'.js': ['.js', '.ts']}
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: ["ts-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: "asset"
            },
            {
                test: /\.(eot|woff(2)?|ttf|otf|svg)$/i,
                type: 'asset'
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
};