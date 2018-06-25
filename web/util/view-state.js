/**
 * view state
 */

import { IS_SA } from '@/util/enum';

/* eslint-disable import/no-mutable-exports */
const el = document.getElementById('__VIEW_STATE__');
let viewState = {};

if (el) {
  try {
    viewState = JSON.parse(el.value);
  } catch (e) {
    viewState = {};
  }
} else if (window.__VIEW_STATE__) {
  viewState = window.__VIEW_STATE__;
}

if (!viewState.user) {
  viewState.user = {};
}

// 系统管理员
viewState._sa = viewState.user.is_sa === IS_SA.YES;

export default viewState;
