<template>

  <div :id="`elem-${elem.id}-container`"
  style="display: flex /* Horizontal flex */;
  min-height: 56.453px"
  :style="`height: ${getSectionHeight('container')}`">

    <!-- Container content -->

    <div style="flex: 1 /* Body content is horizontally flexible */;
    padding: 9px; overflow: auto;
    display: flex; flex-direction: column"
    :style="`width: ${selfTargetWidth} /* Auto or 0 (custom) */`">
    
      <div v-if="elem.children.length === 0"
      style="padding: 8px;
      position: relative;
      height: 100%;
      font-size: 13px;
      background-color: #686868;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden">
        Drop notes here

        <div v-if="$state.dragging.active"
        style="position: absolute;
        left: 0; top: 0; right: 0; bottom: 0;
        z-index: 1001"
        class="container-drop-zone"
        :class="{ 'active' : $state.dragging.dropRegionId == elem.id }"
        @pointerenter="onContainerDropZonePointerEnter"
        @pointerleave="onContainerDropZonePointerLeave"
        @pointerup.left="onContainerDropZonePointerUp">
        </div>
      </div>

      <DisplayElement v-for="(child, idx) of elem.children" :key="child.id"
      :style="`margin-top: ${idx === 0 ? 0: '5px'}`"
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
.container-drop-zone {
  background-color: #42A5F5;
  opacity: 0;
}
.container-drop-zone.active {
  opacity: 0.25;
}
</style>