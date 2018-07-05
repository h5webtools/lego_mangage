/**
 * 构建工具配置
 */

const path = require('path');
const fse = require('fs-extra');

module.exports = {
  build(abc, context) {
    context.setConfig({
      scanEntry: { pattern: path.join(__dirname, '{pages,pagesV2}/**/index.js') },
      setOutput: {
        path: path.join(__dirname, '../public'),
        publicPath: '/public/'
      },
      // commonsChunkPlugin: { 
      //   names: ["vue", "element-ui"],
      //   minChunks: 1
      // },
      resolveAliases: {
        '@': path.join(__dirname),
        vue$: 'vue/dist/vue.common.js',
        src: path.join(__dirname, 'src'),
        assets: path.join(__dirname, 'assets'),
        api: path.join(__dirname, 'api'),
        services: path.join(__dirname, 'services'),
        routes: path.join(__dirname, 'router'),
        components: path.join(__dirname, 'components')
      },
      sass: {
        includePaths: ['node_modules']
      },
      defineConstants: {}
    });

    context.on('before', () => {
      fse.emptyDirSync(path.join(__dirname, 'public'));
      fse.emptyDirSync(path.join(__dirname, '../public'));
    });
  }
};