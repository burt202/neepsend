/* eslint-disable-next-line import/namespace */
import * as CopyWebpackPlugin from "copy-webpack-plugin"
import * as path from "path"
import * as webpack from "webpack"

import packageJson = require("../package.json")

const config: webpack.Configuration = {
  entry: ["./src/js/index.tsx"],
  output: {
    publicPath: "/",
    path: path.join(__dirname, "../build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {from: "src/images/logo.png", to: "logo.png"},
        {from: "src/images/settings.svg", to: "settings.svg"},
        {from: "src/images/dartboard.svg", to: "dartboard.svg"},
      ],
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
    }),
  ],
}

export default config
