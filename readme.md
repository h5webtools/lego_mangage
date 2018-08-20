# 乐高

<<<<<<< HEAD
乐高管理系统
=======
乐高配置系统   
>>>>>>> develop

## 快速入门

### 文档

<<<<<<< HEAD
- [开发规范](http://wikipad.jyb.com/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F)
- [egg 文档][egg]
- [jfet 文档](http://doc.fe.jyb.com/book/workflow/index.html)
- [egg-view-jyb](http://npm.jyblife.com/#/detail/@jyb/egg-view-jyb)

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发

```bash
// 进入web目录，执行
$ npm i
// 回到项目根目录，执行
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 构建

```bash
$ npm run build
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org


# 新版乐高

## 组件的结构

```javascript
 {
    c_id: '1222434332',
    name: 'col测试',
    thumb: 'http://localhost:7002/public/images/product_main@2x.png',
    tag: 'lego-col',
    draggable: true,
    extendProps:{
        isCurrent: false, // 当前选中的
        isLocked: false,  // 当前元素是否锁定（move）,
        isFolded: false  //  tree 中默认展开
    },
    children: [],
    model: {
    },
    props:{
        // 通用属性
        // 开始的style（删除styles后也能显示）
        originStyles: {
            'background-color': 'red'
        },
        // 可以手动改变styles的地方
        styles: {}
    }
 }
 ```
=======
```shell
// 构建，进入/app/web，执行
npm run build:test
// 返回项目根目录，执行
sh build.sh
// ssh到服务器，进入目录/data/www/h5_dev/canye/lego
npm run stop
npm run start:dev
```
>>>>>>> develop
