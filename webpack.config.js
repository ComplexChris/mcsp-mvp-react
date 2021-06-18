const path = require("path");

const SRC_DIR = path.join(__dirname, "/client");
const PUBLIC_DIR = path.join(__dirname, "/public");

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: "bundle.js",
    path: PUBLIC_DIR,
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: "babel-loader",
      },
      {
        test: /\.css?/,
        include: SRC_DIR,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
