var webpack = require("webpack");
var path = require("path");

module.exports = {
    devtool: "inline-source-map",
    entry: {
        "index": "./src/index.js"
    }, output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js"
    }, module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                // exclude:/node_modules/,
                use: ["style-loader", "css-loader"]
            },
            // {
            //     test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=8192'
            // }
            {
                test: /\.(jpg|gif|png|svg)$/,
                use: {
                    loader: 'url-loader',
                }
            }
        ]
    }, devServer: {
        contentBase: path.join(__dirname, "/public"),
        port: 3013,
        publicPath: "http://localhost:3013/dist",
        historyApiFallback: true
    }
}