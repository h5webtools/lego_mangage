<script>
import Vue from 'vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import * as util from '@/util';
import extend from '@jyb/lib-extend';
import mergeWith from 'lodash.mergewith';
import * as queryString from '@/util/querystring';

export default {
  props: {
    pageData: {
      type: Array,
      default: null
    }
  },
  methods: {
    createVNode(h, definition) {
      const version = definition.componentVersion || '';
      const ctor = Vue.component(`${definition.tag}-${version.replace(/\./g, '')}`);
      if (!ctor) return;
      const code = this.codeSnippet[definition.uid] || {};
      const dataCode = extend(true, {}, code.data) || {};
      const dataExtend = extend(true, {}, code.extend) || {};

      // 单独处理vuex state/getters
      if (!util.isEmptyObject(code)) {
        const dataVuex = code.vuex || {};
        extend(dataExtend, {
          computed: {
            ...dataExtend.computed,
            ...mapGetters(queryString.pageId, dataVuex.getters || {})
          }
        });
      }

      // props
      dataCode.props = extend(true, {}, dataCode.props, code.props);
      // event
      dataCode.on = extend(true, {}, dataCode.on, code.event);

      // data对象
      let dataObject = dataCode;
      // 是否layout模式
      if (this.isLayout) {
        // 重新设置cube平台设置的props，可以同步属性设置
        dataCode.props = definition.props;
        // 合并code.data对象和cube系统默认的data对象
        dataObject = mergeWith(dataCode, definition.dataObject);
        // 重新设置下componentDefinition
        dataObject.domProps.componentDefinition = definition.dataObject.domProps.componentDefinition;
      }

      // 设置元素ID
      if (!dataObject.attrs) {
        dataObject.attrs = {};
      }
      dataObject.attrs['data-cube-id'] = `${queryString.pageId}--${definition.uid}`;
      
      return h(
        ctor.extend(dataExtend),
        dataObject,
        definition.children.map((child, i) => {
          return this.createVNode(h, child);
        })
      );
    },
    createVNodeOne(h, definition = {}) {
      const version = definition.componentVersion || '';
      const ctor = Vue.component(`${definition.tag}-${version.replace(/\./g, '')}`);
      if (!ctor) return;
      const code = this.codeSnippet[definition.uid] || {};
      const dataCode = extend(true, {}, code.data) || {};
      const dataExtend = extend(true, {}, code.extend) || {};

      // 单独处理vuex state/getters
/*       if (!util.isEmptyObject(code)) {
        const dataVuex = code.vuex || {};
        extend(dataExtend, {
          computed: {
            ...dataExtend.computed,
            ...mapGetters(queryString.pageId, dataVuex.getters || {})
          }
        });
      } */

      // props
      dataCode.props = extend(true, {}, dataCode.props, code.props);
      // event
      dataCode.on = extend(true, {}, dataCode.on, code.event);

      // data对象
      let dataObject = dataCode;
      // 是否layout模式
      if (this.isLayout) {
        // 重新设置cube平台设置的props，可以同步属性设置
        dataCode.props = definition.props;
        // 合并code.data对象和cube系统默认的data对象
        dataObject = mergeWith(dataCode, definition.dataObject);
        // 重新设置下componentDefinition
        dataObject.domProps.componentDefinition = definition.dataObject.domProps.componentDefinition;
      }

      // 设置元素ID
      if (!dataObject.attrs) {
        dataObject.attrs = {};
      }
      dataObject.attrs['data-cube-id'] = `${queryString.pageId}--${definition.uid}`;
      
      return h(
        ctor.extend(dataExtend),
        dataObject,
        definition.children.map((child, i) => {
          return this.createVNode(h, child);
        })
      );
    }
  },
  
  render(h) {
    return this.createVNode(h, this.pageData);
  }
}
</script>
