<template>

  <div :id="`elem-${elem.id}-container`"
  class="block-container"
  :style="{ 'height': getSectionHeight('container') }">

    <!-- Content -->

    <div class="container-content"
    :style="{ 'width': selfTargetWidth }">

      <!-- Placeholder -->
    
      <div v-if="elem.children.length === 0"
      class="container-placeholder">
        Drop notes here

        <div v-if="$state.dragging.active"
        class="container-drop-zone
        container-placeholder-drop-zone"
        :class="{ 'active' : $state.dragging.dropRegionId == elem.id }"
        @pointerenter="onContainerDropZonePointerEnter"
        @pointerleave="onContainerDropZonePointerLeave"
        @pointerup.left="onContainerDropZonePointerUp">
        </div>
      </div>

      <DisplayElement v-for="(child, idx) of elem.children" :key="child.id"
      :style="{ 'margin-top': idx === 0 ? '0' : '5px' }"
      :elem="child"
      :target-width="selfTargetWidth"/>
    
      <div class="container-drop-zone"
      style="flex: 1"
      :class="{ 'active' : $state.dragging.dropRegionId == elem.id
        && $state.dragging.dropIndex === elem.children.length }"
      @pointerenter="onContainerDropZonePointerEnter"
      @pointerleave="onContainerDropZonePointerLeave"
      @pointerup.left="onContainerDropZonePointerUp">
      </div>

    </div>




    <!-- Container collapse button -->

    <BlockCollapseButton :elem="elem" section="container"/>

  </div>
  
</template>

<script>
export default {

  props: {
    elem: { type: Object },
    
    getSectionHeight: { type: Function },
    
    selfTargetWidth: { type: String },
  },




  methods: {
    
    onContainerDropZonePointerEnter(event) {
      if (!$state.dragging.active)
        return

      $state.dragging.dropRegionId = this.elem.id
      $state.dragging.dropIndex = this.elem.children.length
    },
    onContainerDropZonePointerLeave(event) {
      if (!$state.dragging.active)
        return
      
      $state.dragging.dropRegionId = null
      $state.dragging.dropIndex = null
    },

    onContainerDropZonePointerUp(event) {
      if ($state.dragging.active
      && !$app.selection.has(this.elem)) {
        event.stopPropagation()

        $app.dropping.perform(event, this.elem)
      }
    },

  },

}
</script>

<style scoped>
.block-container {
  display: flex;

  min-height: 56.453px;
}




.container-content {
  flex: 1;

  padding: 9px;

  display: flex;
  flex-direction: column;
  
  overflow: auto;
}




.container-placeholder {
  position: relative;

  height: 100%;

  border: 1px solid;
  border-radius: 4px;
  border-color: rgb(33, 33, 33) #888888 #888888 rgb(33, 33, 33);

  padding: 8px;

  color: #e0e0e0;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  
  font-size: 13px;
  background-color: #686868;
}




.container-placeholder-drop-zone {
  position: absolute;

  left: 0; top: 0;
  right: 0; bottom: 0;

  z-index: 1001;
}




.container-drop-zone {
  background-color: #42A5F5;

  opacity: 0;
}
.container-drop-zone.active {
  opacity: 0.25;
}
</style>