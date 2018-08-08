/**
 * store
 */

export class Store {
  constructor() {
    this.store = {};
  }
  set(key, value, cover = false) {
    if (this.store[key] && !cover) return;
    this.store[key] = value;
  }
  get(key) {
    return this.store[key];
  }
  remove(key) {
    return delete this.store[key];
  }
  removeAll() {
    this.store = {};
  }
}

export default new Store();
