<template>
  <c-draggable  element="div" class="draggableDesign" v-model="pageData" :options="dragOptions">
      <transition-group name="no" class="list-group-design" tag="ul">
      <!-- <transition-group name="no" class="list-group-design" type="transition"> -->
         <component :is="item.tag" :prop="{ prop: {}, event:{}}" v-for="item in pageData" :key="item.uuid"></component>
         <div v-for="(item, index) in pageData" :key="index" class="dragItem" :style="style">
           {{item}}
<!--            <c-draggable v-if="item.draggable" v-for="item2 in item.children" :key="item2.uuid" :style="style2" element="div" class="draggableDesign" v-model="item.children" :options="dragOptions">
             {{item2}}
           </c-draggable> -->
            <c-draggable-multi v-if="item.draggable" v-for="(item2, index2) in item.children" :key="index2" :style="style2" element="div" class="draggableDesign" v-model="item.children" :options="dragOptions">
             {{item2}}
           </c-draggable-multi>
           <!-- <slot name="children"></slot> -->
         </div>
      </transition-group>
  </c-draggable>
</template>
