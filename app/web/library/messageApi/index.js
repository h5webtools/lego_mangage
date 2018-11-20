/**
 * MessageAPI
 */

import Postmate from 'postmate';

function MessageAPI() {
  this.styleElement = null;
  this.scriptElement = null;

  this.headElement = document.getElementsByTagName('head')[0];
  this.bodyElement = document.body;

  this.handshake = null;

  this.init();
}

MessageAPI.prototype.init = function() {
  this.createPostmateModel();
};

MessageAPI.prototype.removeElement = function(parent, child) {
  if (parent && child) {
    parent.removeChild(child);
  }
};

MessageAPI.prototype.appendToHead = function(element, remove) {
  if (remove) {
    this.removeElement(this.headElement, this.styleElement);
  }
  if (this.headElement) {
    this.styleElement = element;
    this.headElement.appendChild(element);
  }
};

MessageAPI.prototype.appendToBody = function(element, remove) {
  if (remove) {
    this.removeElement(this.bodyElement, this.scriptElement);
  }
  if (this.bodyElement) {
    this.scriptElement = element;
    this.bodyElement.appendChild(element);
  }
};

MessageAPI.prototype.createPostmateModel = function() {
  var that = this;
  this.handshake = new Postmate.Model({
    injectStyle: function(payload) {
      var style = document.createElement('style');
      style.innerHTML = payload.code;
      that.appendToHead(style, true);
    },
    evalFunc: function(payload) {
      var script = document.createElement('script');
      script.innerHTML = that.wrapperScriptCode(payload.code);
      that.appendToBody(script, true);
    }
  });
};

MessageAPI.prototype.wrapperScriptCode = function(str) {
  return 'try { ' + str + ' } catch (e) { alert(e.toString()); }';
};

new MessageAPI();
