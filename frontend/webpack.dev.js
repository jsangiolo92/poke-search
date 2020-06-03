const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const distDir = path.join(__dirname, "./dist");
const webpack = require("webpack");
const dotenv = require("dotenv");

console.log("running DEV config");

module.exports = merge(
  common(),
  (() => {
    const env = dotenv.config({ path: "./.env.development" }).parsed;
    const envKeys = env
      ? Object.keys(env).reduce((prev, curr) => {
          prev[`process.env.${curr}`] = JSON.stringify(env[curr]);
          return prev;
        }, {})
      : {};

    return {
      mode: "development",
      devServer: {
        contentBase: distDir,
        historyApiFallback: true,
      },
      devtool: "inline-source-map",
      plugins: [new webpack.DefinePlugin(envKeys)],
    };
  })(),
);
