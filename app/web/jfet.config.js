/**
 * 构建工具配置
 */

const path = require('path');
const fse = require('fs-extra');

module.exports = {
  build(abc, context) {
    const publicDir = path.join(__dirname, '../public');
    context.setConfig({
      scanEntry: { pattern: path.join(__dirname, 'pages/**/index.js') },
      setOutput: {
        path: publicDir,
        publicPath: '/public/'
      },
      // commonsChunkPlugin: {
      //   names: ["vue", "element-ui"],
      //   minChunks: 1
      // },
      resolveAliases: {
        vue$: 'vue/dist/vue.common.js',
        '@': path.join(__dirname),
        src: path.join(__dirname, 'src'),
        assets: path.join(__dirname, './assets'),
        api: path.join(__dirname, './api'),
        services: path.join(__dirname, './services'),
        routes: path.join(__dirname, './router'),
        components: path.join(__dirname, './components')
      },
      sass: {
        includePaths: ['node_modules']
      },
      defineConstants: {}
    });

    context.on('before', () => {
      fse.emptyDirSync(path.join(__dirname, 'public'));
      fse.emptyDirSync(publicDir);
    });

    context.on('after', () => {
      fse.copySync(path.join(__dirname, 'assets/ace'), path.join(publicDir, 'assets/ace'));
    });
  }
};
