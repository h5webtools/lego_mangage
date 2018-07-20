import {setUuid} from '@/util/helper'
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
        listData(newVal, oldVal) {
            this.currentListData = this.listData;
        },
        currentListData(newVal, oldVal) {
            // this.$store.dispatch("editor/updatePage", {
            //   levelIndex: this.levelIndex,
            //   data: newVal
            // });
        }
    },
    created: function () {
    },
    methods: {
        onChoose(item, event) {
            // TODO 深层的例如button 点击还未阻止
            event.stopPropagation();
            event.preventDefault();
            const self = this;
            setTimeout(function () {
                console.log(item, 'chooseitem')
                console.log(item[event.oldIndex])
                // self.currentChoosedItem = item[event.oldIndex];
                self.$store.dispatch('editor/setCurrentComponent', item[event.oldIndex]);
            }, 50);
        },
        onAdd(item, event) {
            setUuid(item[event.newIndex], event.newIndex, this.level, this.levelIndex, item, this.currentThemeStyle)
      
            this.updatePage(item)
        },
        onEnd(item, event) {
        },
        onRemove(item = [], event) {
            this.updatePage(item)
        },
        onSort(item, event) {
            this.updatePage(item)
        },
        onMove(dragContext) {
            if (dragContext.draggedContext.element.extendProps.isLocked === true) {
                return false;
            }
        },
        
        updatePage(item) {
            this.$store.dispatch("editor/updatePage", {
                levelIndex: this.levelIndex,
                data: item
            });
        }
    }
}