import service from 'services';

export function getAllComponents(data) {
  return service({
    url: '/lego/getComponentList',
    method: 'post',
    data
  });
}

// 保存组件
export function saveComponent(data) {
  return service({
    url: '/lego/saveComponent',
    method: 'post',
    data
  });
}

// 更新组件
export function updateComponent(data) {
  return service({
    url: '/lego/updateComponent',
    method: 'post',
    data
  });
}

// 获取组件下的组件样式列表
export function getSelectedComponentStyles(comid) {
  return service({
    url: '/lego/getSelectedComponentStyles',
    method: 'post',
    data: {
      comid
    }
  });
}

// 新增组件样式
export function saveComponentStyle(data) {
  return service({
    url: '/lego/saveComponentStyle',
    method: 'post',
    data
  });
}
// 更新组件样式
export function updateComponentStyle(data) {
  return service({
    url: '/lego/updateComponentStyle',
    method: 'post',
    data
  });
}

// 打包页面
export function packageAct(data) {
  return service({
    url: '/lego/packageAct',
    method: 'post',
    data
  });
}

