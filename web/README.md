# lego

乐高系统

## 文档

- [数据接口]()
- [需求文档]()
- 设计稿：

## 更新日志

- v1.0.0 | 2018-01-15
  - 初始版本




# json

- 基本数据
```javascript
{
      com_id: '',
      name: 'headmap组件',
      tag_name: 'lego-headmap',   // 组件在页面渲染的 标签(tag_name)
      draggable:true,
      showIndex:0,         //  如果组件有多个样式则 要显示哪个组件样式
      component_type: 1,   // 组件数据性质（0 基本组件，前端无需注册； 1， 业务组件， 需要拓展props到children；  3，全部自己封装内部聚合组件）
      children:[],  
      shows:[ //从数据库拉取 
        [{
          com_desc:'主题一 样式一1',
          com_img:'http://lego.jyb.com/images/product3.png',
          tag_name:'lego-headmap',
        },{
          com_desc:'主题一 样式二2',
          com_img:'https://images.jyblife.com/lego/legoconfig/productlist/show.4.png',
          tag_name:'lego-headmap',
          com_config: 
        }]
      ],
      model: {    //  数据编辑项
        img_url: {
            cellType: 'text',
            value: '',
            title: '图片地址',
            desc: '图片地址',
            placeHolder:'头图地址'
        }
      },
      props: {
        img_url:'http://lego.jyb.com/images//banner_txvideo.png',
        comType:'lego-headmap', 
        className:'headmap-theme1-style1',
        children:[
          {
            tag_name:'lego-button',
            name: '按钮',
            themeExtend: {
              
            },
            props: {
              disabled: false,
              styles: {},
              size: 'default',
              labelWidth: '',
              text: 'button-test-desc1',
              btnType:'',
              btnToUrl:'javascript:;',
              eventId:'',
              className:'headmap-theme1-style1__btn-up'
            }
          },{
            tag_name:'lego-button', 
            name: '按钮',           
            themeExtend: {
             
            },
            props: {
              disabled: false,
              styles: { 'width': '212px' },
              size: 'default',
              labelWidth: '',
              text: 'button-test-down',
              btnType:'',
              btnToUrl:'javascript:;',
              eventId:'',
              className:'headmap-theme1-style1__btn-down'
            }
          }
        ]
      }
    }
```

- model
   - 每个item都必须有对应的model配置（如果要直接利用LegoEditProp）
   - 内层children 的item  切记也要有对应model
   - TODO  可以在setCurrentComponent 中工厂化model


- themeExtend
```javascript
{
    1: [{   //  theme_style_id
      key: 'B',   // 位置
      type: 'color',  //  配色中的类型（color/font-size）
      cssKey: 'background-color', //  用于渲染的csskey
      opacity: '0.3'    // 透明度可选
    }],
    2: [{
      key: 'A',
      type: 'color',
      // opacity: '1',
    }],
        
}
```

- tag_name
渲染时候的tag_name,  必须和注册组件标签一致

- component_umd_name
component.component_umd_name = 'Lego' + component.tag_name;
必须是和挂载在window上全局变量一致

- extendProps  页面编辑拓展属性
```javascript
      extendProps:{
        isCurrent: false, // 当前选中的
        isLocked: false,  // 当前元素是否锁定（move）,
        isFolded: false  //  tree 中默认展开
      }
```


# 主题
- 主题样式
```JavaScript
{
  "A": {
    "color": "#1d1d1d"
  },
  "B": {
    "color": "#353333"
  },
  "C": {
    "color": "#fbf5e2"
  },
  "D": {
    "color": "#ffffff"
  },
  "E": {
    "color": "#dfb66e"
  },
  "F": {
    "color": "#2e2e2e"
  },
  "G": {
    "color": "#dfb66e"
  },
  "H": {
    "color": "#cccccc"
  },
  "I": {
    "color": "#333333"
  },
  "J": {
    "color": "#9f9f9f"
  },
  "K": {
    "color": "#eeeeee"
  },
  "L": {
    "color": "#ff6e34"
  },
  "M": {
    "color": "#333333"
  },
  "N": {
    "color": "#ab9887"
  },
  "O": {
    "color": "#ffffff"
  }
}
```
