const registerRouter = require('./backend/router')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) { throw new Error('webpack-dev-server is not defined') }

      registerRouter(devServer.app)

      return middlewares
    }
  }
}
