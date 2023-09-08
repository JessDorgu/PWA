const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');



plugins: [
  new HtmlWebpackPlugin({
    template: './index.html', 
  }),
  new WebpackPwaManifest({
    name: 'Just Another Text Editor', 
    short_name: 'JATE', 
    description: 'A text editor app', 
    background_color: '#ffffff', 
    theme_color: '#000000', 
     icons:[ {
        src: path.resolve('src/imgages/logo.png'), 
        sizes: [96, 128, 192, 256, 384, 512], 
        destination: path.join("assets", "icons"), 
      },
    ],
  }),
  new InjectManifest({
    swSrc: './src-sw.js', 
    swDest: 'src-sw.js',
  }),
],

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
