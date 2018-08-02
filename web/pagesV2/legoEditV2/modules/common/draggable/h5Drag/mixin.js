import { setUuid } from '@/util/helper'
import { mapGetters } from 'vuex';

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
        /*         listData(newVal, oldVal) {
                    debugger
                    this.currentListData = JSON.parse(JSON.stringify(newVal));
                }, */
        currentListData: {
            handler(newVal, oldVal) {
               debugger
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