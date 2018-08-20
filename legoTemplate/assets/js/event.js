/**
 * 事件处理模块
 */
let evtContext = {};

function handleEvent(e) {
  let node = $(e.target);
  let et;

  et = node.attr('et');
  if (!et) {
    while (node[0] !== this && !et) {
      node = node.parent();
      et = node.attr('et');
    }
    if (!et) {
      return;
    }
  }
  e.stopPropagation();
  const etArr = et.split('|');
  $.each(etArr, (index, item) => {
    // 是对应的事件
    if (item.indexOf(e.type) == 0) {
      const curr = item.split(':')[1];

      // 调用事件指定的函数
      if (typeof evtContext[curr] === 'function') {
        evtContext[curr](node, e);
      }
    }
  });
}

export function addHandler(handlers) {
  for (const k in handlers) {
    if (evtContext[k]) {
      throw new Error(`事件${k}已经注册`);
    }
    evtContext[k] = handlers[k];
  }
}

export function clearHandler() {
  evtContext = {};
}

export function bindEvent(evts) {
  // 先卸载事件
  const $ct = $('#container');
  $ct.off(evts, handleEvent);
  $ct.on(evts, handleEvent);
}
