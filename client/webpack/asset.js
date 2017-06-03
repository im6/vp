var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = "127.0.0.1",
  PORT = "3000",
  antDir = process.platform === 'win32' ? /node_modules\\antd\\lib/ :  /node_modules\/antd\/lib/,
  FAVICON = './client/content/img/favicon.ico';

var commonsChunk = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: 'vendor.js',
  minChunks: Infinity
});

var htmlHelper = new HtmlWebpackPlugin({
    title: 'ColorPK | Your Best Color Picker, Pal',
    template: 'client/template/index.html',
    //favicon: FAVICON,
    hash:true,
    showErrors: false
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
    loader: 'style!css?module=true&localIdentName=[hash:base64:4]!less!autoprefixer-loader?{browsers:["not ie <= 8","iOS >= 7"]}',
    exclude: antDir
  },
  {
    test: /\.css$/,
    loader: "style!css?modules!autoprefixer-loader"
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
    //commonsChunk
  ],
  watch: [
    htmlHelper,
    //commonsChunk,
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        //NODE_ENV: JSON.stringify("production"),
        NODE_ENV: JSON.stringify("dev"),
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
    htmlHelper,
    //commonsChunk
  ]
};

var entry = {
    hot:[
      'webpack-dev-server/client?http://' + HOST + ':' + PORT,
      'webpack/hot/only-dev-server',
      './client/entry/index.jsx'
    ],
    watch: './client/entry/index.jsx',
    build: './client/entry/index_prod.jsx'
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
