var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var Webpack = require('webpack');

module.exports = {
  // 入口文件
  entry: path.join(__dirname,'/src/main.js'),
  output: {
    // 打包后输出的目录
    path: path.join(__dirname,'/dist'),
    // 打包后资源文件的前缀
    // publicPath: '/dist/',
    filename: 'build.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, './dist'),'node_modules'],
    extensions: ['*','.js', '.vue'],
  },
  // 处理不同后缀的文件
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue'
    }, {
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ['vue-style-loader','css-loader']
    }, {
      test: /\.less$/,
      use: ['vue-style-loader','css-loader','less-loader']
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      use: 'file',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    })
  ],
  // webpack-dev-server配置
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  // 开启source-map，webpack有多种source-map，在官网文档可以查到
  devtool: '#eval-source-map'
}

// 生产环境，运行npm run build则执行这里
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    // 环境变量
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // 压缩代码
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
