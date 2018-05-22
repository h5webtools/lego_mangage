# 开发文档

## 安装

全局安装，如果有安装，可以直接跳过

```shell
npm i @jyb/jfet-solution-h5product -g
npm i concurrently cross-env -g
```

当前目录执行：

```shell
npm i
```

## 本地mock数据开发

`process.env.NODE_ENV`为`mock`

```shell
npm run mock
```

## 本地开发

`process.env.NODE_ENV`为`local`

```shell
npm run dev
```

## 发布集成测试环境

`process.env.NODE_ENV`为`test`

```shell
npm run build:test
```

如果需要访问构建打包后的文件，可以执行`npm run serve:build`

## 发布预发布/正式环境

`process.env.NODE_ENV`为`production`

```shell
npm run build:prod
```

如果需要访问构建打包后的文件，可以执行`npm run serve:build`

## 离线包(测试环境)

`process.env.NODE_ENV`为`test`

```shell
npm run build:packtest
npm run pack:test
```

## 离线包(预发布/正式环境)

`process.env.NODE_ENV`为`production`

```shell
npm run build:pack
npm run pack:prod
```

## 目录结构

```text
|- h5_act_xxx
  |- assets # 放置例子
  |- |- img # 公共图片
  |- |- js # 公共js
  |- |- sass # 公共样式
  |- components # 组件目录
  |- |- c_dialog
  |- pages # 页面目录，其中layouts,partials非页面
  |- |- index
  |- |- |- index.hbs
  |- |- |- index.scss
  |- |- |- index.js
  |- mock # 放置mock代码
  |- services # 用于数据的处理
  |- public # 输出目录
  |- abc.json # 构建工具配置
  |- package.json
  |- development.md # 开发文档
  |- README.md
```

## abc.json配置

配置查看：[jfet-solution-h5product](http://fe.doc.jyb.com/book/workflow/packages/jfet-solution-h5product/index.html)

## 开发注意

- `pages`目录下，除了layouts,partials目录之外，每一个目录为一个页面，约定模板名称为`index.hbs`,入口名称为`index.js`，其中模板中的`cssFile,jsFile`直接填写`页面目录名称`
- 如果需要在`pages`下的hbs模板中直接引入图片，可以先在`index.js`中把图片引入，然后使用`require`引入，这点以后会做相应的优化
- 目前支持`assets`,`components`,`services`目录的alias，比如需要使用`assets/js/api.js`，直接这样引入`require('assets/js/api.js')`
