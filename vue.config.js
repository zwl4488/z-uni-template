const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        import: [
          path.join(__dirname, './src/common/css/base.styl')
        ],
        paths: [
          path.join(__dirname, "./src/common/css")
        ]
      }
    }
  },
  configureWebpack: {
    plugins: [
      // 移动云函数代码
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, 'src/cloudfunctions'),
          to: path.join(__dirname, 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM, 'cloudfunctions')
        }
      ])
    ]
  }
}