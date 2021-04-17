module.exports = {
  lintOnSave: false,
  publicPath: '/admin',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      },
    },
  },
};
