<template>
  <ul>
    <li>
      <div class="node action">
        {{subAction[0].chainName}}
        <i @click="addNewActionNode(subAction[0])" style="margin-left: 10px;" class="glyphicon glyphicon-plus" title="新增动作节点"></i>&nbsp;&nbsp;
        <i @click="deleteActionNode(subAction[0])" class="glyphicon glyphicon-remove" title="删除"></i>&nbsp;&nbsp;
        <i @click="editActionParam(subAction[0])" class="glyphicon glyphicon-edit" title="编辑"></i>
      </div>
      <action-tree-node :parentAction="subAction[0]" :chainIndex="chainIndex" :subAction="subAction[0].params[0].subAction" v-if="subAction[0].params[0].subAction.length > 0"></action-tree-node>
    </li>
  </ul>
</template>
<script>
// 创建动作子节点
import event from 'assets/js/event';
export default {
  name: 'actionTreeNode',
  props: {
    subAction: {
      type: Array
    },
    parentAction: {},
    chainIndex: 0
  },
  data() {
    return {
      copySubAction: ''
    }
  },
  methods: {
    addNewActionNode(addNode) {
      event.$emit('add-subaction-node');
      event.$once('confirm-param-edit', (config) => {
        if(config.chainName == this.subAction[0].chainName) {
          this.$message.error('不能添加相同名字的动作节点');
          return;
        }
        // editNode.params[0].param = config.params[0].param;
        if(this.subAction[0].params[0].subAction.length > 0) {
          config.params[0].subAction = this.subAction[0].params[0].subAction;
          this.subAction[0].params[0].subAction = [config];
        } else {
          this.subAction[0].params[0].subAction.push(config);
        }
      })
    },
    deleteActionNode(deleteNode) {
      event.$emit('delete-subaction-node', this.parentAction, deleteNode);
    },
    editActionParam(editNode) {
      event.$emit('edit-subaction-node', this.subAction[0].params[0]);
      event.$once('confirm-param-edit', (config) => {
        editNode.params[0].param = config.params[0].param;
      })
    },
  }
}
</script>
