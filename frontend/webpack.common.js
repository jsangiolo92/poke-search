const path = require("path");
const srcDir = path.join(__dirname, "./src");
const distDir = path.join(__dirname, "./dist");

module.exports = () => {
  return {
    entry: `${srcDir}/index.tsx`,
    output: {
      path: distDir,
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "awesome-typescript-loader",
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
  };
};
