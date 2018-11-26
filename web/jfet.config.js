/**
 * 构建工具配置
 */

const path = require('path');
const fse = require('fs-extra');

module.exports = {
  build(abc, context) {
    const publicDir = path.join(__dirname, '../public');
    context.setConfig({
      scanEntry: { pattern: path.join(__dirname, '{pages,pagesV2,library}/**/index.js') },
      setOutput: {
        path: publicDir,
        publicPath: '/public/'
      },
      // commonsChunkPlugin: {
      //   names: ["vue", "element-ui"],
      //   minChunks: 1
      // },
      resolveAliases: {
        '@': path.join(__dirname),
        vue$: 'vue/dist/vue.common.js',
        '@': path.join(__dirname),
        src: path.join(__dirname, 'src'),
        assets: path.join(__dirname, 'assets'),
        api: path.join(__dirname, 'api'),
        services: path.join(__dirname, 'services'),
        routes: path.join(__dirname, 'router'),
        components: path.join(__dirname, 'components'),
        apiV2: path.join(__dirname, './api/v2'),
        routesV2: path.join(__dirname, './router/v2'),
        pagesV2: path.join(__dirname, './pagesV2'),
        constV2: path.join(__dirname, './const/v2'),
        pagesMainV2: path.join(__dirname, './pagesV2/mainV2'),
        componentsV2: path.join(__dirname, './componentsV2')
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
