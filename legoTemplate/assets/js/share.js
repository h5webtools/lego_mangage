/**
 * 分享
 */

import extend from '@jyb/lib-extend';
import libDetect from '@jyb/lib-detect';
import globalVar from 'config/global_var';
import actConfig from 'config/index';

const detect = libDetect();

export function showShareOptionsMenu(shareOptions) {
  if (!detect.jyb) return;
  globalVar.wv.ready(() => {
    globalVar.wv.showOptionMenu({
      icon: 'https://cdn.jyblife.com/static/style/public/image/share.png',
      title: '分享',
      menuItems: [
        { key: 'menuItem:share', name: '分享' }
      ],
      success() {}
    });
    globalVar.wv.on('menuItem:share', {
      complete() {
        shareNow(shareOptions);
      }
    });
  });
}

export function shareNow(shareOptions = {}) {
  if (detect.jyb) {
    globalVar.wv.showShareMenu(extend({
      title: '',
      content: '',
      image: actConfig.jybIcon,
      url: '',
      menuItems: ['wxmsg', 'wxtml', 'qq'],
      complete() {}
    }, shareOptions));
  } else {
    window.location.href = actConfig.appDown;
  }
}
