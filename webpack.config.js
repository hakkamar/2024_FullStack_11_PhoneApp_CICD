const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

const config = () => {
  return {
    entry: "./client/src/main.jsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
          ],
        },
        {
          // Load other files
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: ["file-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".*", ".js", ".jsx"],
    },
    devServer: {
      historyApiFallback: true,
    },
    devtool: "source-map",
    plugins: [
      new HtmlWebPackPlugin({
        template: "./client/index.html",
        filename: "index.html",
      }),
    ],
  };
};

module.exports = config;
