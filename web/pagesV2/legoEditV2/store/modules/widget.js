/**
 * widget module
 */


// initial state
const initialState = {
  widgetType: [],
  widgets: [],
  detail: {}
};

// getters
const getters = {
  // widgetList: state => state.widgetList
   widgetList: (state) => {
    // mock 数据
    return [
      {
        type: 'form',
        uuid: '2222223s',
        title: '通用组件',
        widgets: [{
            com_id: '1',
            thumb: 'http://localhost:7002/public/images/top_banner@2x.png',
            name: '头图Banner',
            tag: 'lego-button',
            model: {
              size: {
                type: 'select',
                value: '',
                options: [{
                  label: '默认表单',
                  value: ''
                }, {
                  label: '中等表单',
                  value: 'medium'
                }, {
                  label: '小型表单',
                  value: 'small'
                }, {
                  label: '超小表单',
                  value: 'mini'
                }],
                title: '尺寸',
                desc: '尺寸'
              },
              disabled: {
                type: 'boolean',
                value: false,
                desc: 'value'
              },
              styles: {
                type: 'json',
                value: {},
                desc: 'value'
              },
              labelWidth: {
                type: 'string',
                value: '',
                title: 'label宽度',
                desc: '表单域标签的宽度'
              }
            },
            props: {
              disabled: false,
              styles: {

              },
              size: '',
              labelWidth: ''
            },
          },
          {
            com_id: '2',
            thumb: 'http://localhost:7002/public/images/jump@2x.png',
            name: '跳转组件',
            tag: 'lego-button',
            model: {
              size: {
                type: 'select',
                value: '',
                options: [{
                  label: '默认表单',
                  value: ''
                }, {
                  label: '中等表单',
                  value: 'medium'
                }, {
                  label: '小型表单',
                  value: 'small'
                }, {
                  label: '超小表单',
                  value: 'mini'
                }],
                title: '尺寸',
                desc: '尺寸'
              },
              disabled: {
                type: 'boolean',
                value: false,
                desc: 'value'
              },
              styles: {
                type: 'json',
                value: {},
                desc: 'value'
              },
              labelWidth: {
                type: 'string',
                value: '',
                title: 'label宽度',
                desc: '表单域标签的宽度'
              }
            },
            props: {
              disabled: false,
              styles: {

              },
              size: '',
              labelWidth: ''
            },
          }, {
            com_id: '3',
            thumb: 'http://localhost:7002/public/images/tab@2x.png',
            name: 'Tab切换',
            tag: 'lego-button',
            model: {
              size: {
                type: 'select',
                value: '',
                options: [{
                  label: '默认表单',
                  value: ''
                }, {
                  label: '中等表单',
                  value: 'medium'
                }, {
                  label: '小型表单',
                  value: 'small'
                }, {
                  label: '超小表单',
                  value: 'mini'
                }],
                title: '尺寸',
                desc: '尺寸'
              },
              disabled: {
                type: 'boolean',
                value: false,
                desc: 'value'
              },
              styles: {
                type: 'json',
                value: {},
                desc: 'value'
              },
              labelWidth: {
                type: 'string',
                value: '',
                title: 'label宽度',
                desc: '表单域标签的宽度'
              }
            },
            props: {
              disabled: false,
              styles: {

              },
              size: '',
              labelWidth: ''
            },
          }, {
            com_id: '4',
            thumb: 'http://localhost:7002/public/images/desc_text@2x.png',
            name: '说明文字',
            tag: 'lego-button',
            model: {
              size: {
                type: 'select',
                value: '',
                options: [{
                  label: '默认表单',
                  value: ''
                }, {
                  label: '中等表单',
                  value: 'medium'
                }, {
                  label: '小型表单',
                  value: 'small'
                }, {
                  label: '超小表单',
                  value: 'mini'
                }],
                title: '尺寸',
                desc: '尺寸'
              },
              disabled: {
                type: 'boolean',
                value: false,
                desc: 'value'
              },
              styles: {
                type: 'json',
                value: {},
                desc: 'value'
              },
              labelWidth: {
                type: 'string',
                value: '',
                title: 'label宽度',
                desc: '表单域标签的宽度'
              }
            },
            props: {
              disabled: false,
              styles: {

              },
              size: '',
              labelWidth: ''
            },
          }, {
            com_id: '5',
            thumb: 'http://localhost:7002/public/images/rule_desc@2x.png',
            name: '规则说明',
            tag: 'lego-button',
            model: {
              size: {
                type: 'select',
                value: '',
                options: [{
                  label: '默认表单',
                  value: ''
                }, {
                  label: '中等表单',
                  value: 'medium'
                }, {
                  label: '小型表单',
                  value: 'small'
                }, {
                  label: '超小表单',
                  value: 'mini'
                }],
                title: '尺寸',
                desc: '尺寸'
              },
              disabled: {
                type: 'boolean',
                value: false,
                desc: 'value'
              },
              styles: {
                type: 'json',
                value: {},
                desc: 'value'
              },
              labelWidth: {
                type: 'string',
                value: '',
                title: 'label宽度',
                desc: '表单域标签的宽度'
              }
            },
            props: {
              disabled: false,
              styles: {

              },
              size: '',
              labelWidth: ''
            },
          }, {
            com_id: '6',
            thumb: 'http://localhost:7002/public/images/rule_activity.png',
            name: '活动规则',
            tag: 'lego-button',
            model: {
              size: {
                type: 'select',
                value: '',
                options: [{
                  label: '默认表单',
                  value: ''
                }, {
                  label: '中等表单',
                  value: 'medium'
                }, {
                  label: '小型表单',
                  value: 'small'
                }, {
                  label: '超小表单',
                  value: 'mini'
                }],
                title: '尺寸',
                desc: '尺寸'
              },
              disabled: {
                type: 'boolean',
                value: false,
                desc: 'value'
              },
              styles: {
                type: 'json',
                value: {},
                desc: 'value'
              },
              labelWidth: {
                type: 'string',
                value: '',
                title: 'label宽度',
                desc: '表单域标签的宽度'
              }
            },
            props: {
              disabled: false,
              styles: {

              },
              size: '',
              labelWidth: ''
            },
          }, {
            com_id: '7',
            thumb: 'http://localhost:7002/public/images/button@2x.png',
            name: '按钮',
            tag: 'lego-button',
            themeExtend: {
              1: [/* {
                key: 'A',
                type: 'color',
                cssKey: 'color'
                // opacity: '1',
              }, */{
                key: 'B',
                type: 'color',
                cssKey: 'background-color',
                opacity: '0.3'
              }],
              2: [{
                key: 'A',
                type: 'color',
                // opacity: '1',
              }],
        
            },
            extendProps:{
              isCurrent: false, // 当前选中的
              isLocked: false,  // 当前元素是否锁定（move）,
              isFolded: false  //  tree 中默认展开
            },
            model: {
              size: {
                cellType: "select",
                value: "",
                options: [
                  {
                    label: "默认表单",
                    value: ""
                  },
                  {
                    label: "中等表单",
                    value: "medium"
                  },
                  {
                    label: "小型表单",
                    value: "small"
                  },
                  {
                    label: "超小表单",
                    value: "mini"
                  }
                ],
                title: "尺寸",
                desc: "尺寸"
              },
            
              disabled: {
                cellType: "switch",
                value: false,
                desc: "value"
              },
              text: {
                cellType: "text",
                value: "",
                title: "名称",
                desc: "名称",
                placeHolder:"按钮描述"
              },
              btnType: {
                cellType: "select",
                value: "",
                options: [
                  {
                    label: "普通按钮",
                    value: ""
                  },
                  {
                    label: "吸底按钮",
                    value: "fixbuttom"
                  }
                ],
                title: "按钮类型",
                desc: "按钮类型"
              },
              btnToUrl: {
                cellType: "text",
                value: "",
                title: "跳转地址",
                desc: "跳转地址",
                placeHolder:"跳转地址"
              },
              eventId:{
                cellType: "text",
                value: "",
                title: "统计ID",
                desc: "统计ID",
                placeHolder:"比如:30001.1.1"
              },
              labelWidth: {
                cellType: "text",
                value: "",
                title: "label宽度",
                desc: "表单域标签的宽度"
              },
              className: {
                cellType: "text",
                value: "",
                title: "class",
                desc: "class"
              },
              eventType: {
                cellType: "select",
                value: "",
                options: [
                  {
                    label: "登录",
                    value: "login"
                  },
                  {
                    label: "注册",
                    value: "register"
                  },{
                    label: "抽奖",
                    value: "lottery"
                  },{
                    label: "兑换",
                    value: "exchange"
                  },{
                    label: "红包",
                    value: "coupon"
                  },
                ],
                title: "按钮类型",
              },
              styles: {
                cellType: 'editorStyle',
                value: {},
                title: "编辑样式",
                desc: "编辑样式"
              }
            },
            props: {
              uuid: "1",
              disabled: false,
              styles: {},
              size: "default",
              labelWidth: "",
              text: "button-test-desc",
              styles: {},
              btnType:"",
              btnToUrl:"",
              eventId:"",
              className: 'test test222',
              originStyles: {
                // 'background-color': null
              },
              eventType: ''
            }
          },{
            com_id: '8',
            thumb: 'http://localhost:7002/public/images/number@2x.png',
            name: '数字组件',
            tag: 'lego-button',
            model: {
              size: {
                type: 'select',
                value: '',
                options: [{
                  label: '默认表单',
                  value: ''
                }, {
                  label: '中等表单',
                  value: 'medium'
                }, {
                  label: '小型表单',
                  value: 'small'
                }, {
                  label: '超小表单',
                  value: 'mini'
                }],
                title: '尺寸',
                desc: '尺寸'
              },
              disabled: {
                type: 'boolean',
                value: false,
                desc: 'value'
              },
              styles: {
                type: 'json',
                value: {},
                desc: 'value'
              },
              labelWidth: {
                type: 'string',
                value: '',
                title: 'label宽度',
                desc: '表单域标签的宽度'
              }
            },
            props: {
              disabled: false,
              styles: {

              },
              size: '',
              labelWidth: ''
            },
          },{
            com_id: '1222434331',
            name: 'row测试',
            thumb: 'http://localhost:7002/public/images/product_main@2x.png',
            tag: 'lego-row',
            draggable: true, // 内部children 是否可拖拽
            extendProps:{
              isCurrent: false, // 当前选中的
              isLocked: false,  // 当前元素是否锁定（move）,
              isFolded: false  //  tree 中默认展开
            },
            children: [],
            model: {
            },
            props:{

            }
          },
          {
            com_id: '1222434332',
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

            }
          }
        ]
      },
      {
        type: 'base',
        uuid: '2222222223s',
        title: '活动组件',
        widgets: [{
          com_id: '21',
          thumb: 'http://localhost:7002/public/images/product_main@2x.png',
          name: '主推商品',
          tag: 'lego-button',
          model: {
            size: {
              type: 'select',
              value: '',
              options: [{
                label: '默认表单',
                value: ''
              }, {
                label: '中等表单',
                value: 'medium'
              }, {
                label: '小型表单',
                value: 'small'
              }, {
                label: '超小表单',
                value: 'mini'
              }],
              title: '尺寸',
              desc: '尺寸'
            },
            disabled: {
              type: 'boolean',
              value: false,
              desc: 'value'
            },
            styles: {
              type: 'json',
              value: {},
              desc: 'value'
            },
            labelWidth: {
              type: 'string',
              value: '',
              title: 'label宽度',
              desc: '表单域标签的宽度'
            }
          },
          props: {
            disabled: false,
            styles: {

            },
            size: '',
            labelWidth: ''
          },
        },{
          com_id: '22',
          thumb: 'http://localhost:7002/public/images/product1@2x.png',
          name: '商品列表1',
          tag: 'lego-button',
          model: {
            size: {
              type: 'select',
              value: '',
              options: [{
                label: '默认表单',
                value: ''
              }, {
                label: '中等表单',
                value: 'medium'
              }, {
                label: '小型表单',
                value: 'small'
              }, {
                label: '超小表单',
                value: 'mini'
              }],
              title: '尺寸',
              desc: '尺寸'
            },
            disabled: {
              type: 'boolean',
              value: false,
              desc: 'value'
            },
            styles: {
              type: 'json',
              value: {},
              desc: 'value'
            },
            labelWidth: {
              type: 'string',
              value: '',
              title: 'label宽度',
              desc: '表单域标签的宽度'
            }
          },
          props: {
            disabled: false,
            styles: {

            },
            size: '',
            labelWidth: ''
          },
        },{
          com_id: '23',
          thumb: 'http://localhost:7002/public/images/product2@2x.png',
          name: '商品列表2',
          tag: 'lego-button',
          model: {
            size: {
              type: 'select',
              value: '',
              options: [{
                label: '默认表单',
                value: ''
              }, {
                label: '中等表单',
                value: 'medium'
              }, {
                label: '小型表单',
                value: 'small'
              }, {
                label: '超小表单',
                value: 'mini'
              }],
              title: '尺寸',
              desc: '尺寸'
            },
            disabled: {
              type: 'boolean',
              value: false,
              desc: 'value'
            },
            styles: {
              type: 'json',
              value: {},
              desc: 'value'
            },
            labelWidth: {
              type: 'string',
              value: '',
              title: 'label宽度',
              desc: '表单域标签的宽度'
            }
          },
          props: {
            disabled: false,
            styles: {

            },
            size: '',
            labelWidth: ''
          },
        },{
          com_id: '24',
          thumb: 'http://localhost:7002/public/images/financial@2x.png',
          name: '理财组件',
          tag: 'lego-button',
          model: {
            size: {
              type: 'select',
              value: '',
              options: [{
                label: '默认表单',
                value: ''
              }, {
                label: '中等表单',
                value: 'medium'
              }, {
                label: '小型表单',
                value: 'small'
              }, {
                label: '超小表单',
                value: 'mini'
              }],
              title: '尺寸',
              desc: '尺寸'
            },
            disabled: {
              type: 'boolean',
              value: false,
              desc: 'value'
            },
            styles: {
              type: 'json',
              value: {},
              desc: 'value'
            },
            labelWidth: {
              type: 'string',
              value: '',
              title: 'label宽度',
              desc: '表单域标签的宽度'
            }
          },
          props: {
            disabled: false,
            styles: {

            },
            size: '',
            labelWidth: ''
          },
        },{
          com_id: '25',
          thumb: 'http://localhost:7002/public/images/exchange@2x.png',
          name: '兑换组件',
          tag: 'lego-button',
          model: {
            size: {
              type: 'select',
              value: '',
              options: [{
                label: '默认表单',
                value: ''
              }, {
                label: '中等表单',
                value: 'medium'
              }, {
                label: '小型表单',
                value: 'small'
              }, {
                label: '超小表单',
                value: 'mini'
              }],
              title: '尺寸',
              desc: '尺寸'
            },
            disabled: {
              type: 'boolean',
              value: false,
              desc: 'value'
            },
            styles: {
              type: 'json',
              value: {},
              desc: 'value'
            },
            labelWidth: {
              type: 'string',
              value: '',
              title: 'label宽度',
              desc: '表单域标签的宽度'
            }
          },
          props: {
            disabled: false,
            styles: {

            },
            size: '',
            labelWidth: ''
          },
        },{
          com_id: '26',
          thumb: 'http://localhost:7002/public/images/task_list@2x.png',
          name: '任务列表',
          tag: 'lego-button',
          model: {
            size: {
              type: 'select',
              value: '',
              options: [{
                label: '默认表单',
                value: ''
              }, {
                label: '中等表单',
                value: 'medium'
              }, {
                label: '小型表单',
                value: 'small'
              }, {
                label: '超小表单',
                value: 'mini'
              }],
              title: '尺寸',
              desc: '尺寸'
            },
            disabled: {
              type: 'boolean',
              value: false,
              desc: 'value'
            },
            styles: {
              type: 'json',
              value: {},
              desc: 'value'
            },
            labelWidth: {
              type: 'string',
              value: '',
              title: 'label宽度',
              desc: '表单域标签的宽度'
            }
          },
          props: {
            disabled: false,
            styles: {

            },
            size: '',
            labelWidth: ''
          },
        },{
          com_id: '27',
          thumb: 'http://localhost:7002/public/images/number@2x.png',
          name: '表格',
          tag: 'lego-button',
          model: {
            size: {
              type: 'select',
              value: '',
              options: [{
                label: '默认表单',
                value: ''
              }, {
                label: '中等表单',
                value: 'medium'
              }, {
                label: '小型表单',
                value: 'small'
              }, {
                label: '超小表单',
                value: 'mini'
              }],
              title: '尺寸',
              desc: '尺寸'
            },
            disabled: {
              type: 'boolean',
              value: false,
              desc: 'value'
            },
            styles: {
              type: 'json',
              value: {},
              desc: 'value'
            },
            labelWidth: {
              type: 'string',
              value: '',
              title: 'label宽度',
              desc: '表单域标签的宽度'
            }
          },
          props: {
            disabled: false,
            styles: {

            },
            size: '',
            labelWidth: ''
          },
        },{
          com_id: '28',
          thumb: 'http://localhost:7002/public/images/attendance@2x.png',
          name: '签到组件',
          tag: 'lego-button',
          model: {
            size: {
              type: 'select',
              value: '',
              options: [{
                label: '默认表单',
                value: ''
              }, {
                label: '中等表单',
                value: 'medium'
              }, {
                label: '小型表单',
                value: 'small'
              }, {
                label: '超小表单',
                value: 'mini'
              }],
              title: '尺寸',
              desc: '尺寸'
            },
            disabled: {
              type: 'boolean',
              value: false,
              desc: 'value'
            },
            styles: {
              type: 'json',
              value: {},
              desc: 'value'
            },
            labelWidth: {
              type: 'string',
              value: '',
              title: 'label宽度',
              desc: '表单域标签的宽度'
            }
          },
          props: {
            disabled: false,
            styles: {

            },
            size: '',
            labelWidth: ''
          },
        },{
          com_id: '29',
          thumb: 'http://localhost:7002/public/images/leaderboard@2x.png',
          name: '排行榜',
          tag: 'lego-button',
          model: {
            size: {
              type: 'select',
              value: '',
              options: [{
                label: '默认表单',
                value: ''
              }, {
                label: '中等表单',
                value: 'medium'
              }, {
                label: '小型表单',
                value: 'small'
              }, {
                label: '超小表单',
                value: 'mini'
              }],
              title: '尺寸',
              desc: '尺寸'
            },
            disabled: {
              type: 'boolean',
              value: false,
              desc: 'value'
            },
            styles: {
              type: 'json',
              value: {},
              desc: 'value'
            },
            labelWidth: {
              type: 'string',
              value: '',
              title: 'label宽度',
              desc: '表单域标签的宽度'
            }
          },
          props: {
            disabled: false,
            styles: {

            },
            size: '',
            labelWidth: ''
          },
        },{
          com_id: '210',
          thumb: 'http://localhost:7002/public/images/dynamic@2x.png',
          name: '动态组件',
          tag: 'lego-button',
          model: {
            size: {
              type: 'select',
              value: '',
              options: [{
                label: '默认表单',
                value: ''
              }, {
                label: '中等表单',
                value: 'medium'
              }, {
                label: '小型表单',
                value: 'small'
              }, {
                label: '超小表单',
                value: 'mini'
              }],
              title: '尺寸',
              desc: '尺寸'
            },
            disabled: {
              type: 'boolean',
              value: false,
              desc: 'value'
            },
            styles: {
              type: 'json',
              value: {},
              desc: 'value'
            },
            labelWidth: {
              type: 'string',
              value: '',
              title: 'label宽度',
              desc: '表单域标签的宽度'
            }
          },
          props: {
            disabled: false,
            styles: {

            },
            size: '',
            labelWidth: ''
          },
        },{
          com_id: '211',
          thumb: 'http://localhost:7002/public/images/title@2x.png',
          name: '标题组件',
          tag: 'lego-button',
          model: {
            size: {
              type: 'select',
              value: '',
              options: [{
                label: '默认表单',
                value: ''
              }, {
                label: '中等表单',
                value: 'medium'
              }, {
                label: '小型表单',
                value: 'small'
              }, {
                label: '超小表单',
                value: 'mini'
              }],
              title: '尺寸',
              desc: '尺寸'
            },
            disabled: {
              type: 'boolean',
              value: false,
              desc: 'value'
            },
            styles: {
              type: 'json',
              value: {},
              desc: 'value'
            },
            labelWidth: {
              type: 'string',
              value: '',
              title: 'label宽度',
              desc: '表单域标签的宽度'
            }
          },
          props: {
            disabled: false,
            styles: {

            },
            size: '',
            labelWidth: ''
          },
        },{
          com_id: '212',
          thumb: 'http://localhost:7002/public/images/ninebox@2x.png',
          name: '九宫格',
          tag: 'lego-button',
          model: {
            size: {
              type: 'select',
              value: '',
              options: [{
                label: '默认表单',
                value: ''
              }, {
                label: '中等表单',
                value: 'medium'
              }, {
                label: '小型表单',
                value: 'small'
              }, {
                label: '超小表单',
                value: 'mini'
              }],
              title: '尺寸',
              desc: '尺寸'
            },
            disabled: {
              type: 'boolean',
              value: false,
              desc: 'value'
            },
            styles: {
              type: 'json',
              value: {},
              desc: 'value'
            },
            labelWidth: {
              type: 'string',
              value: '',
              title: 'label宽度',
              desc: '表单域标签的宽度'
            }
          },
          props: {
            disabled: false,
            styles: {

            },
            size: '',
            labelWidth: ''
          },
        }
        
        ]
      },
      {
        type: 'base',
        uuid: '2222222223s',
        title: '推广',
        widgets: [
          {
            com_id: '31',
            thumb: 'http://localhost:7002/public/images/register@2x.png',
            name: '注册组件',
            tag: 'lego-button',
            model: {
              size: {
                type: 'select',
                value: '',
                options: [{
                  label: '默认表单',
                  value: ''
                }, {
                  label: '中等表单',
                  value: 'medium'
                }, {
                  label: '小型表单',
                  value: 'small'
                }, {
                  label: '超小表单',
                  value: 'mini'
                }],
                title: '尺寸',
                desc: '尺寸'
              },
              disabled: {
                type: 'boolean',
                value: false,
                desc: 'value'
              },
              styles: {
                type: 'json',
                value: {},
                desc: 'value'
              },
              labelWidth: {
                type: 'string',
                value: '',
                title: 'label宽度',
                desc: '表单域标签的宽度'
              }
            },
            props: {
              disabled: false,
              styles: {

              },
              size: '',
              labelWidth: ''
            },
          },{
            com_id: '32',
            thumb: 'http://localhost:7002/public/images/pay@2x.png',
            name: '支付组件',
            tag: 'lego-button',
            model: {
              size: {
                type: 'select',
                value: '',
                options: [{
                  label: '默认表单',
                  value: ''
                }, {
                  label: '中等表单',
                  value: 'medium'
                }, {
                  label: '小型表单',
                  value: 'small'
                }, {
                  label: '超小表单',
                  value: 'mini'
                }],
                title: '尺寸',
                desc: '尺寸'
              },
              disabled: {
                type: 'boolean',
                value: false,
                desc: 'value'
              },
              styles: {
                type: 'json',
                value: {},
                desc: 'value'
              },
              labelWidth: {
                type: 'string',
                value: '',
                title: 'label宽度',
                desc: '表单域标签的宽度'
              }
            },
            props: {
              disabled: false,
              styles: {

              },
              size: '',
              labelWidth: ''
            },
          }
        ]
      }

    ]
  } 
};

// actions
const actions = {
  setWidgetList({ commit }, result) {
    commit('setWidgetList', result);
  }
};

// mutations
const mutations = {
  setWidgetList(state, result) {
    debugger
    state.widgetList = result;
  }
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
};
