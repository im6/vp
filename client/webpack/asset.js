var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = "127.0.0.1",
  PORT = "3000",
  antDir = process.platform === 'win32' ? /node_modules\\antd\\lib/ :  /node_modules\/antd\/lib/,
  VENDORS = [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux-saga',
    'immutable'
  ];

var commonsChunk = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: 'vendor.js',
  minChunks: Infinity
});

var baseTemplate = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories:['node_modules',  './client/modules/']
  }
};


var loaders = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
            presets: ['es2015','react', "stage-0"],
            plugins: [
                'transform-runtime',
                ['import', {
                    libraryName: 'antd',
                    libraryDirectory: "lib",
                    style: true  // use less, 'css' to css build
                }]
            ]
        }
    },
  {
    test: /\.less$/,
    loader: "style!css!less",
    include: antDir

  },

  {
    test: /\.less$/,
    loader: "style!css?module!less",
    exclude: antDir
  },
  {
    test: /\.css$/,
    loader: "style!css?modules!autoprefixer-loader?browsers=last 2 versions"
  },
  { test: /\.(gif|png|jpg|jpeg)($|\?)/, loader: 'url?limit=10000' },
  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
];



var plugins = {
  hot: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("dev")
      }
    }),
    commonsChunk
  ],
  watch: [
    new HtmlWebpackPlugin({
      title: 'ZJ Guo',
      template: 'client/template/index.html',
      //favicon: 'client/content/img/favicon.ico',
      hash:true,
      showErrors: false
    }),
    commonsChunk,
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("dev")
      }
    }),
  ],
  build: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mange:{
        "screw-ie8" : true
      },
      compress : {
        "screw_ie8" : true,
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new HtmlWebpackPlugin({
      title: 'ZJ Guo',
      template: 'client/template/index.html',
      favicon: './client/content/img/favicon.ico',
      hash:true,
      showErrors: false
    }),
    new HtmlWebpackPlugin({
      template: 'client/template/error.html',
      filename: 'error.html',
      inject: false,
      showErrors: false
    }),
    commonsChunk
  ]
};

var entry = {
    hot:{
      app: [
        'webpack-dev-server/client?http://' + HOST + ':' + PORT,
        'webpack/hot/only-dev-server',
        './client/entry/index.jsx'
      ],
      vendor: VENDORS
    },
    watch:{
      app: ['./client/entry/index.jsx'],
      vendor: VENDORS
    },
    build:{
      app: ['./client/entry/index.jsx'],
      vendor: VENDORS
    }
};


module.exports = {
  loaders: loaders,
  plugins: function(mode){
      return plugins[mode]
  },
  entry: function(mode){
      return entry[mode];
  },
  template: baseTemplate,
  constant: {
    port: PORT,
    host: HOST
  }
};
