const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let environment = "production";

switch ((process.env.NODE_ENV || "production").toLowerCase()) {
    case "d":
    case "dev":
    case "development":
        environment = "development";
        break;
    case "prod":
    case "p":
    case "production":
    default:
        environment = "production";
        break;
}

console.log(`WEBPACK AS [${environment}]`);

module.exports = {
    entry: {
        app: "./src/index.ts",
        sw: "./src/sw.ts",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            // {
            //     test: /\.hbs$/,
            //     loader: 'handlebars-loader',
            //     options: {
            //         runtime: path.join(__dirname, ".webpack", "handlebars.js"),
            //     },
            // },
            {
                test: /\.hbs$/,
                loader: 'raw-loader',
            },
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/manifest.webmanifest', to: "manifest.webmanifest" },
            { from: 'src/images/icons/**/*', to: "images/icons/", flatten: true },
        ]),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            excludeChunks: ["sw"],
            template: '!!handlebars-loader!src/index.hbs',
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode: environment,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9001,
        host: '0.0.0.0',
    }
};