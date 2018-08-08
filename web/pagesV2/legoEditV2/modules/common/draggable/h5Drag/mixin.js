import { setUuid } from '@/util/helper'
import { mapGetters } from 'vuex';
/**
 * 必须区分直接点中组件是levelindex是真实索引； 拖拽到目标位置的索引的children索引
 */
export default {
    props: {
/*         currentListData: {
            type: Array,
            default: () => {
                return [];
            }
        }, */
        item: {
            type: Object,
            default: () => {
                return {};
            }
        },
        // 树的层级
        level: {
            type: Number,
            default: 0
        },
        // 层级index 索引， 例如0-2
        levelIndex: {
            type: String,
            default: "0"
        },
        itemIndex: {
            type: Number,
            // default: 0
        },
        childrenLength: {
            type: Number
        }
    },
    computed: {
        ...mapGetters({
            currentThemeStyle: 'editor/currentThemeStyle'
        })
    },
    data() {
        return {
            dragOptions: {}
        };
    },
    watch: {

        currentListData: {
            handler(newVal, oldVal) {
               // this.currentListData = newVal
            },
            deep: true//对象内部的属性监听，也叫深度监听

        }
    },
    created: function () {
    },
    methods: {

    }
}