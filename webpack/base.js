const path = require('path');
const nodeExternals = require('webpack-node-externals');

const localIdentName = '[hash:base64:5]';
const include = path.resolve(__dirname, '../src');

const resolve = {
  extensions: ['.js', '.jsx'],
  alias: {
    components: path.resolve(__dirname, '../src/components'),
    containers: path.resolve(__dirname, '../src/containers'),
  },
};

exports.withoutCssModuleFiles = [
  /src(\\|\/)client(\\|\/)bulma.modules.sass/,
  /components(\\|\/)SpinLoader(\\|\/)style.sass/,
];

exports.clientBaseConfig = {
  resolve,
  entry: path.join(__dirname, '../src/client'),
};

exports.serverBaseConfig = {
  target: 'node',
  resolve,
  externals: [nodeExternals()],
  entry: path.join(__dirname, '../src/server'),
};

exports.include = include;
exports.localIdentName = localIdentName;
exports.staticAssetsPath = 'assets/static';

exports.serverModule = {
  rules: [
    {
      test: /\.jsx?$/,
      include,
      use: ['babel-loader'],
    },
    {
      test: /\.sass$/,
      include,
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName,
              exportOnlyLocals: true,
            },
          },
        },
        'sass-loader',
      ],
    },
  ],
};
