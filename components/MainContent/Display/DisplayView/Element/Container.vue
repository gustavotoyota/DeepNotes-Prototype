<template>

  <Block :elem="elem"
  min-width="170px"
  :inherited-width="inheritedWidth">
    
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
      class="drop-zone"
      :class="{ 'active' : $state.dragging.dropRegionId == this.elem.id }"
      @pointerenter="onDropZonePointerEnter"
      @pointerleave="onDropZonePointerLeave"
      @pointerup.left="onDropZonePointerUp">
      </div>
    </div>

    <div v-else
    :id="`elem-${elem.id}-scrollbox`"
    style="height: 100%; overflow: auto;
    display: flex; flex-direction: column">

      <Element v-for="(child, idx) of elem.children" :key="child.id"
      :style="`margin-top: ${idx === 0 ? 0: '5px'}`"
      :elem="child" :inherited-width="targetWidth"/>
    
      <div class="container-drop-zone"
      style="flex: 1"
      :class="{ 'active' : $state.dragging.dropRegionId == this.elem.id
        && $state.dragging.dropIndex === this.elem.children.length }"
      @pointerenter="onDropZonePointerEnter"
      @pointerleave="onDropZonePointerLeave"
      @pointerup.left="onDropZonePointerUp">
      </div>

    </div>

  </Block>
  
</template>

<script>
export default {
  
  props: {
    elem: { type: Object },

    inheritedWidth: { },
  },



  methods: {
    
    onDropZonePointerEnter(event) {
      if (!$state.dragging.active)
        return

      $state.dragging.dropRegionId = this.elem.id
      $state.dragging.dropIndex = this.elem.children.length
    },
    onDropZonePointerLeave(event) {
      if (!$state.dragging.active)
        return
      
      $state.dragging.dropRegionId = null
      $state.dragging.dropIndex = null
    },

    onDropZonePointerUp(event) {
      if ($state.dragging.active
      && !$app.selection.has(this.elem)) {
        event.stopPropagation()

        $app.dropping.perform(event, this.elem)
      }
    },

  },

  

  computed: {

    active() {
      return $app.activeElem.is(this.elem)
    },
    editing() {
      return this.active && $getters.editing
    },



    sizeProp() {
      return $app.elems.getSizeProp(this.elem)
    },
    targetWidth() {
      if (this.inheritedWidth != null)
        return this.inheritedWidth

      if (this.elem[this.sizeProp].x === 'auto'
      || this.elem[this.sizeProp].x === 'expanded' && this.elem.expandedSize.x === 'auto')
        return 'auto'

      return 0
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