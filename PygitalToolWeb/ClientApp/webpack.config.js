const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        site: './src/js/EntryPoints/site.ts',
        validation: './src/js/validation.ts',
        index: './src/js/index.ts',
        questionHandling: './src/js/questionHandling.ts',
        projectCreation: './src/js/ProjectCreation.ts',
        circularFlow: './src/js/circularFlow.ts',
        addFlow: './src/js/addFlow.ts',
        addQuestion: './src/js/addQuestion.ts',
        subThemeCreation: './src/js/subThemeCreation.ts',
        themeCreation: './src/js/themeCreation.ts',
        activeProjects: './src/js/activeProjects.ts',
        editAndDeleteFlow: './src/js/editAndDeleteFlow.ts',
        phygitalAnswerButton: './src/js/phygitalAnswerButton.ts',
        superVisors: './src/js/Supervisors.ts',
        results: './src/js/results.ts',
        resultsInformation: './src/js/resultsInformation.ts',
        projectEditAndDelete:'./src/js/ProjectEditAndDelete',
        subThemeEditAndDelete:'./src/js/subThemeEditAndDelete',
        backOfficeCreation:'./src/js/backOfficeCreation',
        themeEditAndDelete:'./src/js/themeEditAndDelete',
        Userform: './src/js/UserForm',
        backOfficeHome: './src/js/EntryPoints/backOfficeHome.ts',
        mainThemePage: './src/js/EntryPoints/mainThemePage.ts',
        subThemePage: './src/js/EntryPoints/subThemePage.ts',
        flowPage: './src/js/EntryPoints/flowPage.ts',
        results: './src/js/EntryPoints/results.ts',
        questionsPage: './src/js/EntryPoints/questionsPage.ts',
        userPlatform: './src/js/EntryPoints/userPlatform.ts',
        managers: './src/js/EntryPoints/managers.ts'
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