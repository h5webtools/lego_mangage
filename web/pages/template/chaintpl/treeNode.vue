<template>
  <ul v-if="editData.length > 0">
    <li v-for="(chain, chainIndex) in editData" :key="chain.id">
      <div class="node" v-bind:class="{action: chain.nodeType=='action', rule: chain.nodeType=='rule'}">
        {{chain.chainName}}
        <i v-if="chain.nodeType=='action'" @click="addNewActionNode(chainIndex)" style="margin-left: 10px;" class="glyphicon glyphicon-plus" title="新增动作节点"></i>
        <i v-if="chain.nodeType=='rule'" @click="addParam(chainIndex)" style="margin-left: 10px;" class="glyphicon glyphicon-plus" title="新增参数"></i>&nbsp;&nbsp;
        <i @click="deleteNode(chainIndex)" class="glyphicon glyphicon-remove" title="删除"></i>&nbsp;&nbsp;
        <i v-if="chain.params.length==1" @click="editParam(chainIndex, 0)" class="glyphicon glyphicon-edit" title="编辑"></i>
      </div>
      <div v-if="chain.nodeType=='action' && chain.params[0].subAction.length > 0">
        <!-- 多个动作子节点 -->
        <action-tree-node :chainIndex="chainIndex" :parentAction="chain.params[0]" :subAction="chain.params[0].subAction"></action-tree-node>
      </div>
      <ul v-if="chain.nodeType=='rule'">
        <li v-for="(param, index) in chain.params" :key="param.id">
          <div v-if="chain.nodeType == 'rule'">
            <div v-if="chain.params.length>1" class="node param">
              参数{{index+1}}&nbsp;
              <i @click="editParam(chainIndex, index)" style="margin-left: 10px;" class="glyphicon glyphicon-edit" title="编辑参数"></i>&nbsp;&nbsp;
              <i @click="deleteParam(chainIndex, index)" class="glyphicon glyphicon-remove" title="删除参数"></i>
            </div>
            <ul class="inner">
              <li>
                <div @click="addNewNode(param, 'match', chainIndex)" :parent="chain.chainName" tag="match" :chainIndex="chainIndex" :paramIndex="index" class="node match" title="新增满足条件的子节点">符合
                  <i class="glyphicon glyphicon-step-forward"></i>
                </div>
                <tree-node :path="getPath(param)" :parentData="param" :editData="param.match"></tree-node>
              </li>
              <li>
                <div @click="addNewNode(param, 'notmatch', chainIndex)" :parent="chain.chainName" tag="notmatch" class="node match" title="新增不满足条件的子节点">不符合
                  <i class="glyphicon glyphicon-step-forward"></i>
                </div>
                <tree-node :path="getPath(param)" :parentData="param" :editData="param.notmatch"></tree-node>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
import event from 'assets/js/event';
import actionTreeNode from './actionTreeNode.vue';
export default {
  name: "treeNode",
  components: {
    actionTreeNode
  },
  props: {
    path: {
      type: Array,
      default: () => []
    },
    editData: {},
    parentData: {}
  },
  methods: {
    checkNodeParamRepeat(checkArray, param) {
      if(checkArray.length <= 1) {
        return false;
      }
      let sameParam = checkArray.filter((check) => {
        if(JSON.stringify(check.param) == JSON.stringify(param)) {
          return true;
        }
      });
      // 长度大于0表示有相同参数存在
      return sameParam.length > 0;
    },
    /**
     * 编辑参数
     * @param chainIndex
     * @param paramIndex 
     * */
    editParam(chainIndex, paramIndex) {
      event.$emit('showParamDialog', {
        data: JSON.parse(JSON.stringify(this.editData[chainIndex].params[paramIndex])),
        lock: true
      });
      event.$once("confirm-param-edit", (config) => {
        if(!this.checkNodeParamRepeat(this.editData[chainIndex].params, config.params[0].param)) {
          // TODO 检查参数是否重复
          this.editData[chainIndex].params[paramIndex].param = config.params[0].param;
          this.editData[chainIndex].params[paramIndex].editParams = config.params[0].editParams;
          this.editData[chainIndex].params[paramIndex].paramsFixed = config.params[0].paramsFixed;
          this.editData[chainIndex].params[paramIndex].contentDesc = config.params[0].contentDesc;
        } else {
          this.$message.error('已经存在相同的参数');
        }
      });
    },
    /**
     * 删除参数
     * @param chainIndex 规则树序号
     * @param paramIndex 该规则树下的参数序号
     */
    deleteParam(chainIndex, paramIndex) {
      this.editData[chainIndex].params.splice(paramIndex, 1);
    },
    /**
     * 删除规则/动作节点
     * @argument
     */
    deleteNode(chainIndex) {
      this.editData.splice(chainIndex, 1);
      event.$emit('add-edit-sign');
    },
    /**
     * 在同一个节点下新增参数
     * @param chainIndex 规则树序号
     */
    addParam(chainIndex) {
      event.$emit('showParamDialog', {
        data: {
          id: this.editData[chainIndex].id
        },
        lock: true
      });
      event.$once("confirm-param-edit", (config) => {
        if(!this.checkNodeParamRepeat(this.editData[chainIndex].params, config.params[0].param)) {
          this.editData[chainIndex].params.push({
            id: config.id,
            param: config.params[0].param,
            editParams: config.params[0].editParams,
            paramsFixed: config.params[0].paramsFixed,
            contentDesc: config.params[0].contentDesc,
            match: [],
            notmatch: []
          });
        } else {
          this.$message.error('已经存在相同的参数');
        }
      });
    },
    /**
     * 符合和不符合按钮下添加子节点
     * @argument 
     * */
    addNewNode(param, tag) {
      let parentPath = this.path.concat(param.chainName);
      event.$emit('showParamDialog', {
        data: {},
        lock: false
      });
      event.$once("confirm-param-edit", (config) => {
        if(parentPath.indexOf(config.chainName) != -1 && config.nodeType == 'rule') {
          this.$message.error('路径上已经有相同的规则/动作名称');
        } else {
          param[tag].push(config);
        }
      });
    },
    addNewActionNode(index) {
      let tempData = this.editData[index].params[0];
      event.$emit('showParamDialog', {
        data: {
          nodeType: 'action'
        },
        lock: false,
        lockRule: true,
      });
      event.$once('confirm-param-edit', (config) => {
        if(config.chainName == tempData.chainName) {
          this.$message.error('不能添加相同名字的动作节点');
          return;
        }
        if(tempData.subAction.length > 0) {
          config.params[0].subAction = tempData.subAction;
          tempData.subAction = [config];
        } else {
          tempData.subAction.push(config);
        }
      })
    },

    getPath(param) {
      return this.path.concat(param.chainName)
    }
  },
  updated() {
    let uls = Array.from(document.querySelectorAll('.tree ul.inner')).reverse(),
      len = uls.length;
    // 倒序
    for (let i = 0; i < len; i++) {
      let lis = Array.from(uls[i].children), widthArr = [], max;
      if (lis.length > 1) {
        widthArr = lis.map(li => {
          return li.scrollWidth;
        });
        max = Math.max.apply(Math, widthArr);
        lis.forEach(li => {
          li.style.width = (li.querySelector("ul") || max < 200 ? max : max / 2) + 'px';
        })
      }
    }
  },
}
</script>
<style lang="scss">
.tree {
  padding-bottom: 30px;
  width: 100%;
  overflow-x: auto;
  background-color: #fbfbfb;
}

.tree a {
  color: inherit;
}

.tree ul {
  padding-top: 30px;
  position: relative;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  text-align: center;
  font-size: 0;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
}

.tree ul li {
  white-space: nowrap;
  display: inline-block;
  -webkit-box-flex: 1;
  vertical-align: top;
  font-size: 14px;
  position: relative;
  color: #333;
  padding: 30px 5px 0 5px;
}

.tree ul li .node {
  border: 1px solid transparent;
  padding: 10px 10px;
  text-decoration: none;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  display: inline-block;
  border-radius: 5px !important;
  transition: all 0.5s;
  position: relative;
  &.action {
    border-color: #d2322d;
  }
  &.rule {
    background-color: darkcyan;
    color: #fff;
  }
  &.param {
    padding: 8px 15px;
    font-size: 13px;
    background-color: #418bca;
    color: #fff;
  }
  &.match {
    padding: 5px 10px;
    border-color: #9cc1e0;
    font-size: 12px;
    color: #666;
    cursor: pointer;
  }
  &.start {
    border-radius: 50%;
    padding: 20px;
    border-color: #999;
  }
  .glyphicon {
    cursor: pointer;
  }
}

.tree ul li .node:hover {
  background-color: #c8e4f8;
  color: #333;
}

.tree ul li .node:hover+ul li .node {
  background: #c8e4f8;
  color: #333;
  border: 1px solid #94a0b4;
}

.tree ul li:after,
.tree ul li:before {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid #05d61d;
  width: 50%;
  height: 30px;
}

.tree ul li:after {
  right: auto;
  left: 50%;
  border-left: 1px solid #05d61d;
}

.tree ul li:only-child {
  padding-top: 0;
}

.tree ul li:only-child:after,
.tree ul li:only-child:before {
  display: none;
}

.tree ul li:last-child:before {
  border-right: 1px solid #05d61d;
  border-radius: 0 5px 0 0;
}

.tree ul li:first-child:after {
  border-radius: 5px 0 0 0;
}

.tree ul li:first-child:before,
.tree ul li:last-child:after {
  border: 0 none;
}

.tree ul li ul:before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid #05d61d;
  width: 0;
  height: 30px;
}
</style>
