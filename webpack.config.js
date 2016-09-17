var path = require('path');
var webpack = require('webpack');

module.exports = {
  // configure dev server
  devServer: {
    inline: true,
    // if no contentBase, the files are served from the current directory
    // contentBase: './',
    port: 3000
  },
  // input file
  entry: [
    // 'script!jquery/dist/jquery.min.js',
    // 'script!foundation-sites/dist/foundation.min.js',
    './src/index.js',
  ],

  // output file
  output: {
    // set to current directory
    path: __dirname,
    // output file name
    filename: './bundle.js',
    // path for source map
    sourceMapFilename: "./bundle.js.map"
  },
  // emit source-map for debugging
  devtool: "#source-map",
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      // link folder to avoid specifying aliases
      './src/components'
      // './src/api'
    ],
    alias: {
      applicationStyles: 'src/styles/app.scss'
      // actions: 'src/actions/actions.js',
      // reducers: 'src/reducers/reducers.js',
      // configureStore: 'src/store/configureStore.js'
    },
    // which extensions to look for
    extensions: ['', '.js', '.jsx']
  },
  // specify modules
  module: {
    loaders: [
      {
        // tell babel which files to process
        // escaped dot, jsx extension, ? - match zero or one `x`, $ - matches the end
        test: /\.jsx?$/,
        // loader name
        loader: 'babel',
        // babel config
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        // folders not to process
        exclude: /(node_modules)/
      },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file'
        }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        },
      // {
      //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'file'
      // },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      // {
      //     test: /\.scss/,
      //     loader: 'style-loader!css-loader!sass-loader'
      // }
    ]
  },
  // sassLoader: {
    // includePaths: [
    //   path.resolve(__dirname, './node_modules/foundation-sites/scss')
    // ]
    // includePaths: [
    //   './node_modules'
    // ]
    // includePaths: [
    //   // path.resolve(__dirname, './node_modules')
    //   path.resolve('./node_modules/grommet/node_modules')
    // ]
  // }
};
