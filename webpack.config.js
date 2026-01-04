const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

// Dynamically get all HTML files in pages folder
const getPages = () => {
  try {
    const pagesDir = path.resolve(__dirname, 'src/pages');
    if (!fs.existsSync(pagesDir)) {
      return [];
    }
    return fs.readdirSync(pagesDir)
      .filter(file => file.endsWith('.html'))
      .map(file => file.replace('.html', ''));
  } catch (error) {
    console.warn('Warning: Could not read pages directory:', error.message);
    return [];
  }
};

module.exports = {
  entry: "./src/js/app.js", // Entry point for your JS
  output: {
    filename: "bundle.js", // Output file for the bundled JS
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clean output directory before each build
  },
  module: {
    rules: [
      // Image files handling
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      // Font files handling
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
      // SCSS to CSS loader
      {
        test: /\.scss$/,
        use: [
          //   "style-loader", // Injects CSS into the DOM
          MiniCssExtractPlugin.loader, // Extracts CSS into separate file
          "css-loader", // Turns CSS into CommonJS
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      // JavaScript transpiling using Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Transpiles ES6+ code
          },
        },
      },
    ],
  },
  plugins: [
    // HTML Template Plugin for index.html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body',
      scriptLoading: 'defer'
    }),
    
    // Dynamically create HtmlWebpackPlugin for each page
    ...getPages().map(page => new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `src/pages/${page}.html`),
      filename: `${page}.html`,
      inject: 'body',
      scriptLoading: 'defer'
    })),
    
    // Copy static assets
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }
      ]
    }),
    
    // Automatically load jQuery when encountering `$` or `jQuery`
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new MiniCssExtractPlugin({
      filename: "css/app.css", // Output file for the compiled CSS
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "src"),
        publicPath: "/"
      },
      {
        directory: path.join(__dirname, "src/pages"),
        publicPath: "/"
      }
    ],
    compress: true, // Enable gzip compression for everything served
    port: 9000, // Port for the dev server
    open: true, // Automatically open the browser
    hot: true, // Enable hot module replacement (HMR)
    liveReload: true, // Enable live reloading for HTML/JS/CSS
  },
  devtool: "source-map", // Useful for debugging
  mode: "development", // Use 'production' for minified production build
};
