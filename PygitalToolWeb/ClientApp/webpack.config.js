const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        admin_platform: './src/js/entry-points/admin-platform.ts',
        backoffice: './src/js/entry-points/backoffice.ts',
        flow_page: './src/js/entry-points/flow-page.ts',
        main_theme_page: './src/js/entry-points/main-theme-page.ts',
        notes: './src/js/entry-points/notes.ts',
        questions_page: './src/js/entry-points/questions-page.ts',
        results: './src/js/entry-points/results.ts',
        site: './src/js/entry-points/site.ts',
        sub_theme_page: './src/js/entry-points/sub-theme-page.ts',
        supervisor_platform: './src/js/entry-points/supervisor-platform.ts',
        user_platform: './src/js/entry-points/user-platform.ts',
        hub_connection: './src/js/frontend/hub-connection.ts',
        validation: './src/js/validation.ts'
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