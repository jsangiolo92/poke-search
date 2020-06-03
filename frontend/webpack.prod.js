const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");
const dotenv = require("dotenv");

console.log("running PRODUCTION config");

module.exports = merge(
  common(),
  (() => {
    const env = dotenv.config({ path: "./.env.production" }).parsed;
    const envKeys = env
      ? Object.keys(env).reduce((prev, curr) => {
          prev[`process.env.${curr}`] = JSON.stringify(env[curr]);
          return prev;
        }, {})
      : {};

    return {
      mode: "production",
      devtool: "source-map",
      plugins: [new webpack.DefinePlugin(envKeys)],
    };
  })(),
);
