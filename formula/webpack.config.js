const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: [
        path.resolve(__dirname, "app.js")
    ],
    output: {
      path: __dirname + '/dist/js',
      filename: 'main.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: { minimize: true, url:false }
                }, {
                    loader: "sass-loader"
                }] 
            }
        ]
    },
    plugins: [
        //new LiveReloadPlugin()
    ]
  }