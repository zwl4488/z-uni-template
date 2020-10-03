const path = require('path');

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
  }
}