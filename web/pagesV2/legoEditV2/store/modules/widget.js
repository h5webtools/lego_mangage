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
  widgetList: (state) => {
    // mock 数据
    return [
      {
        type: 'form',
        uuid: '2222223s',
        title: 'form',
        widgets: [
          {          
            c_id: '1231',
            name: 'button1 测试prop编辑',
             tag: 'el-button',
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
          c_id: '12321',
          name: 'button12',
           tag: 'button-test',
       }
        ]
      },
      {
        type: 'base',
        uuid: '2222222223s',
        title: '行列',
        widgets: [
          {          
            c_id: '1222434331',
            name: 'row',
            tag: 'el-row',
           draggable: true,
           children: []          
         },
         {          
          c_id: '123fdasf21',
          name: 'col',
           tag: 'el-col',
           draggable: true,
           children: [],
           u_key:''              
       }
        ]
      }

    ]
  }
};

// actions
const actions = {
  getWidgetList({ commit }) {

  }
};

// mutations
const mutations = {
  setWidgetList(state, result) {

  }
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
};
