const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');
// const WebpackShellPlugin = require('webpack-shell-plugin');
// const exec = require('child_process').exec;

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    favicon: 'src/favicon/favicon.ico',
    template: path.resolve(__dirname, 'src/index.html'),
  }),
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, 'src/img'),
      to: path.resolve(__dirname, 'build/img'),
    },
    {
      from: path.resolve(__dirname, 'src/js'),
      to: path.resolve(__dirname, 'build/js'),
    },
    {
      from: path.resolve(__dirname, 'src/pwa-wiki_files'),
      to: path.resolve(__dirname, 'build/pwa-wiki_files'),
    },
    {
      from: path.resolve(__dirname, 'src/favicon'),
      to: path.resolve(__dirname, 'build/favicon'),
    },
    'src/offline.html',
    'src/img/placeholder-image.png',
    'src/manifest.json',
    'src/CNAME'
  ]),
  new InjectManifest({
    swSrc: 'src/service-worker.js',
    exclude: [/\.DS_Store$/, /CNAME/]
  })
];

module.exports = [
  {
    mode: 'none',
    // Tell Webpack which file kicks off our app.
    entry: './src/index.html',
    // entry: {
      // home: path.resolve(__dirname, 'src/js/index.js'),
      // tabs: path.resolve(__dirname, 'src/js/tabs.js'),
    // },
    // Tell Weback to output our bundle.js
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, 'build')
    },
    // Tell Webpack which directories to look in to resolve import statements.
    // Normally Webpack will look in node_modules by default.
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
      ]
    },
    // These rules tell Webpack how to process different module types.
    // Remember, *everything* is a module in Webpack. That includes
    // CSS, and (thanks to our loader) HTML.
    module: {
      rules: [
        {
          // If you see a file that ends in .html, send it to these loaders.
          test: /\.html$/,
          // This is an example of chained loaders in Webpack.
          // Chained loaders run last to first. So it will run
          // polymer-webpack-loader, and hand the output to
          // babel-loader. This let's us transpile JS in our `<script>` elements.
          use: [
            { loader: 'babel-loader' },
            { loader: 'raw-loader' }
          ]
        },
        {
          // If you see a file that ends in .js, just send it to the babel-loader.
          test: /(^@polymer|\.js$)/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: { 
                insert: 'head',
                injectType: 'singletonStyleTag'
              },
            },
            "css-loader"
          ]
        },
        {
          test: /.(jpg|jpeg|png|svg)$/,
          use: ['file-loader'],
        },
      ]
    },
    // Enable the Webpack dev server which will build, serve, and reload our
    // project on changes.
    devServer: {
      contentBase: __dirname,
      compress: true,
      port: 9000
    },
    plugins: [...plugins]
  }
];
