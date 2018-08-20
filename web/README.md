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
      cssKey: 'background-color', //  用于渲染的csskey
    }]
        
}
```
{
    1: [{   
      key: 'B',  
      type: 'color',  
      cssKey: 'background-color', 
      opacity: '0.3'  
    }],
    2: [{
      key: 'A',
      type: 'color',
      cssKey: 'background-color', 
    }]
}



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

# 组件JSON

# row

```javascript
{
  "com_id": "",
  "name": "row测试",
  "thumb": "http://localhost:7002/public/images/product_main@2x.png",
  "tag": "lego-row",
  "draggable": true,
  "extendProps": {
    "isCurrent": false,
    "isLocked": false,
    "isFolded": false
  },
  "model": {
      direction: {
          cellType: "select",
          value: "row",
          options: [
            {
              label: "水平",
              value: "row"
            },
            {
              label: "水平倒置",
              value: "row-reverse"
            },{
              label: "垂直",
              value: "column"
            }, {
              label: "垂直倒置",
              value: "column-reverse"
            }
          ],
          title: "排列方式",
          desc: "排列方式"
        },
      justify: {
        cellType: "select",
        value: "start",
        options: [
          {
            label: "对齐起始位置",
            value: "start"
          },
          {
            label: "靠末端对其",
            value: "end"
          },{
            label: "居中对齐",
            value: "center"
          },
          {
            label: "均匀排布",
            value: "space-around"
          },
          {
            label: "两边对齐",
            value: "space-between"
          }
        ],
        title: "水平排列方式",
        desc: "水平排列方式"
      },          
      align: {
        cellType: "select",
        value: "top",
        options: [
          {
            label: "顶部对齐",
            value: "top"
          },
          {
            label: "居中对齐",
            value: "middle"
          },{
            label: "底部对齐",
            value: "bottom"
          }
        ],
        title: "垂直排列方式",
        desc: "垂直排列方式"
      },
      gutter: {
        cellType: "number",
        value: 0,
        title: "栅格间隔",
        desc: "栅格间隔",
        regExpress: '\\d+',
        message: '必须为数字',
        required: true
      },
      styles: {
        cellType: 'editorStyle',
        value: {},
        title: "编辑样式",
        desc: "编辑样式"
      }
  },
  "children": [],
  "props": {          
    justify: 'start',
    align: 'middle',
    type: 'flex',
    gutter: 0,
    styles: {},
    originStyles: {}
  }
}
```

# col

```javascript

{
  "com_id": "",
  "name": "col测试",
  "thumb": "http://localhost:7002/public/images/product_main@2x.png",
  "tag": "lego-col",
  "draggable": true,
  "extendProps": {
    "isCurrent": false,
    "isLocked": false,
    "isFolded": false
  },
  "children": [],
  model: {
      flex: {
        cellType: "number",
        value: 1,
        title: "栅格整体宽度",
        desc: "栅格整体宽度"
      },
      span: {
        cellType: "number",
        value: 24,
        title: "栅格占据的列数",
        desc: "栅格占据的列数"
      },
      offset: {
        cellType: "number",
        value: 0,
        title: "栅格左侧的间隔格数",
        desc: "栅格左侧的间隔格数"
      },
      push: {
        cellType: "number",
        value: 0,
        title: "栅格向右移动格数",
        desc: "栅格向右移动格数	"
      },
      pull: {
        cellType: "number",
        value: 0,
        title: "栅格向左移动格数",
        desc: "栅格向左移动格数"
      },
      styles: {
        cellType: 'editorStyle',
        value: {},
        title: "编辑样式",
        desc: "编辑样式"
      }
    },
    props: {
      flex: 1,
      span: 24,
      offset: 0,
      push: 0,
      direction: 'row',
      pull: 0,
      styles: {},
      originStyles: {}
    }
}
```

# button

```javascript
{
  "com_id": "",
  "thumb": "http://localhost:7002/public/images/button@2x.png",
  "name": "按钮",
  "tag": "lego-button",
  "themeExtend": [1, 2],
  "extendProps": {
    "isCurrent": false,
    "isLocked": false,
    "isFolded": false
  },
  "model": {
    "size": {
      "cellType": "select",
      "value": "",
      "options": [
        {
          "label": "默认表单",
          "value": ""
        },
        {
          "label": "中等表单",
          "value": "medium"
        },
        {
          "label": "小型表单",
          "value": "small"
        },
        {
          "label": "超小表单",
          "value": "mini"
        }
      ],
      "title": "尺寸",
      "desc": "尺寸"
    },
    "disabled": {
      "cellType": "switch",
      "value": false,
      "desc": "value"
    },
    "text": {
      "cellType": "text",
      "value": "",
      "title": "名称",
      "desc": "名称",
      "placeHolder": "按钮描述"
    },
    "btnType": {
      "cellType": "select",
      "value": "",
      "options": [
        {
          "label": "普通按钮",
          "value": ""
        },
        {
          "label": "吸底按钮",
          "value": "fixbuttom"
        }
      ],
      "title": "按钮类型",
      "desc": "按钮类型"
    },
    "btnToUrl": {
      "cellType": "text",
      "value": "",
      "title": "跳转地址",
      "desc": "跳转地址",
      "placeHolder": "跳转地址"
    },
    "eventId": {
      "cellType": "text",
      "value": "",
      "title": "统计ID",
      "desc": "统计ID",
      "placeHolder": "比如:30001.1.1"
    },
    "labelWidth": {
      "cellType": "text",
      "value": "",
      "title": "label宽度",
      "desc": "表单域标签的宽度"
    },
    "className": {
      "cellType": "text",
      "value": "",
      "title": "class",
      "desc": "class"
    },
    "eventType": {
      "cellType": "select",
      "value": "",
      "options": [
        {
          "label": "登录",
          "value": "login"
        },
        {
          "label": "注册",
          "value": "register"
        },
        {
          "label": "抽奖",
          "value": "lottery"
        },
        {
          "label": "兑换",
          "value": "exchange"
        },
        {
          "label": "红包",
          "value": "coupon"
        }
      ],
      "title": "按钮类型"
    },
    "styles": {
      "cellType": "editorStyle",
      "value": {},
      "title": "编辑样式",
      "desc": "编辑样式"
    }
  },
  "props": {
    "uuid": "1",
    "disabled": false,
    "styles": {},
    "size": "default",
    "labelWidth": "",
    "text": "button",
    "btnType": "",
    "btnToUrl": "",
    "eventId": "",
    "className": "test test222",
    "originStyles": {},
    "eventType": ""
  }
}
```

## 业务组件数据

### headmap

```javascript
{
      com_id: '',
      name: 'headmap组件',
      tag_name: 'lego-headmap',   
      draggable:true,
      showIndex:0,        
      component_type: 1,   
      children:[],  
      shows:[],
      model: {   
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
            themeExtend: [1],
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
          }, {
            tag_name:'lego-button', 
            name: '按钮',           
            themeExtend: [2],
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
