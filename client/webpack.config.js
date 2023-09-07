const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

plugins: [
  new HtmlWebpackPlugin({
    template: './index.html', // Specify your HTML template file
  }),
  new WebpackPwaManifest({
    name: 'Just Another Text Editor', // Your app's name
    short_name: 'JATE', // Short name for your app
    description: 'A text editor app', // Description for your app
    background_color: '#ffffff', // Background color
    theme_color: '#000000', // Theme color
    icons: [
      {
        src: path.resolve('src/imgages/logo.png'), // Path to your app's icon
        sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
        destination: path.join("assets", "icons"), // Destination folder for icons
      },
    ],
  }),
  new InjectManifest({
    swSrc: './src/sw.js', // Path to your service worker file
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
        
      ],
    },
  };
};
