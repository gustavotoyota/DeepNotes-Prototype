<template>

  <div v-if="elem.parentId != null && $state.dragging.active">

    <div class="drop-zone"
    :class="{ 'active' : $state.dragging.dropRegionId == parentElem.id
      && $state.dragging.dropIndex === index }"
    style="bottom: 50%"
    :style="{ 'top': index === 0 ? '0': '-5px' }"
    @pointerenter="onDropZonePointerEnter($event, 0)"
    @pointerleave="onDropZonePointerLeave($event, 0)"
    @pointerup.left.stop="onDropZonePointerUp($event, 0)">
    </div>

    <div class="drop-zone"
    :class="{ 'active' : $state.dragging.dropRegionId == parentElem.id
      && $state.dragging.dropIndex === index + 1 }"
    style="top: 50%; bottom: 0%"
    @pointerenter="onDropZonePointerEnter($event, 1)"
    @pointerleave="onDropZonePointerLeave($event, 1)"
    @pointerup.left.stop="onDropZonePointerUp($event, 1)">
    </div>

  </div>
  
</template>

<script>
export default {

  props: {
    elem: { type: Object },
    
    parentElem: { type: Object },
    index: { type: Number },
  },




  methods: {
    
    onDropZonePointerEnter(event, offset) {
      if (!$state.dragging.active)
        return

      $state.dragging.dropRegionId = this.parentElem.id
      $state.dragging.dropIndex = this.index + offset
    },
    onDropZonePointerLeave(event, offset) {
      if (!$state.dragging.active)
        return
      
      $state.dragging.dropRegionId = null
      $state.dragging.dropIndex = null
    },

    onDropZonePointerUp(event, offset) {
      const dropIndex = this.index + offset

      $app.dropping.perform(event, this.parentElem, dropIndex)
    },
    
  },

}
</script>

<style scoped>
.drop-zone {
  position: absolute;
  left: 0; right: 0;

  background-color: #42A5F5;
  opacity: 0;

  z-index: 1000;
}
.drop-zone.active {
  opacity: 0.25;
}
</style>