import { setUuid } from '@/util/helper'
import { mapGetters } from 'vuex';

export default {
    model: {
        prop: "listData"
    },
    props: {
        listData: {
            type: Array,
            default: () => {
                return [];
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
        }
    },
    computed: {
        ...mapGetters({
            currentThemeStyle: 'editor/currentThemeStyle'
        })
    },
    data() {
        return {
            currentListData: this.listData,
            style: {
                // "min-height": "80px",
                // background: "red",
                // margin: "10px"
            },
            style2: {
                // "min-height": "50px",
                // background: "yellow",
                // border: "1px dotted black"
            },
            dragOptions: {
                animation: 50,
                group: {
                    name: "formDesign"
                },
                ghostClass: "ghost",
                handle: '.draggableDesignItem',
                chosenClass: "sortable-chosen",  // Class name for the chosen item
                dragClass: "sortable-drag",
            }
        };
    },
    watch: {
        /*         listData(newVal, oldVal) {
                    debugger
                    this.currentListData = JSON.parse(JSON.stringify(newVal));
                }, */
        listData: {
            handler(newVal, oldVal) {
               debugger
               this.currentListData = JSON.parse(JSON.stringify(newVal))
               // this.currentListData = newVal
            },
            deep: true//对象内部的属性监听，也叫深度监听

        }
    },
    created: function () {
    },
    methods: {
        onChoose(item, event) {
            // debugger
            console.log('onChoose');
            // TODO 深层的例如button 点击还未阻止
            event.stopPropagation();
            event.preventDefault();
            const self = this;

            setTimeout(function () {
                console.log(item, 'chooseitem')
                console.log(item[event.oldIndex])
                // self.currentChoosedItem = item[event.oldIndex];
                self.$store.dispatch('editor/setCurrentComponent', {
                    item: item[event.oldIndex],
                    levelIndex: self.levelIndex,
                    itemIndex: event.oldIndex
                });
            }, 50);
        },
        onAdd(item, event) {
            debugger
            console.log('onAdd', item);
            // 只有这里的updatePage： 拖拽到编辑区域的需要验证组件是否register以及注册

            let newItem = item[event.newIndex];
            setUuid(
                item[event.newIndex],
                event.newIndex,
                this.level,
                this.levelIndex,
                item,
                this.currentThemeStyle
            );

            if (!newItem.is_register) {
                loadComponents(newItem.fileUrl, () => {
                    window[newItem.component_umd_name].install(Vue);
                    // Vue.use(newItem.component_umd_name)
                    console.log(Vue.options.components, '注册组件');
                    // TODO  安装一个记录一次， 再次拖拽不再安装
                    newItem.is_register = true;
                    this.updatePage(item, event.newIndex);
                })
            } else {
                this.updatePage(item, event.newIndex);
            }

        },
        onEnd(item, event) {
            console.log('onEnd', item)
        },
        onRemove(item, event) {
            console.log('onRemove', item)
            this.updatePage(item)
        },
        onSort(item, event) {
            console.log('onSort', item);
            // 拖拽进来一个元素后也会触发一次
            this.updatePage(item)
        },
        onMove(dragContext) {
            if (dragContext.draggedContext.element.extendProps.isLocked === true) {
                return false;
            }
        },
        /**
         * 
         * @param {*} item 
         * @param {*} validateRegister 是否要验证改组件是否注册
         */
        updatePage(item, itemIndex) {
            this.$store.dispatch("editor/updatePage", {
                levelIndex: this.levelIndex,
                data: item,
                itemIndex: itemIndex
            });
        }
    }
}