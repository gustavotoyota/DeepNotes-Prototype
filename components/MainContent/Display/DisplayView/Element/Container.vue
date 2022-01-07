<template>

  <Block :elem="elem"
  min-width="170px"
  :inherited-width="inheritedWidth">
    
    <div v-if="elem.children.length === 0"
    style="padding: 8px;
    height: 100%;
    font-size: 13px;
    background-color: #686868;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center"
    @pointerup.left="onDropZonePointerUp">
      Drop notes here
    </div>

    <div v-else
    :id="`elem-${elem.id}-scrollbox`"
    style="height: 100%; overflow: auto;
    display: flex; flex-direction: column">

      <Element v-for="(child, idx) of elem.children" :key="child.id"
      :style="`margin-top: ${idx === 0 ? 0: '5px'}`"
      :elem="child" :inherited-width="targetWidth"/>
    
      <div v-if="$state.dragging.active"
      class="drop-zone"
      :class="{ 'active' : $state.dragging.dropRegionId == this.elem.id
        && $state.dragging.dropIndex === this.elem.children.length }"
      @mouseenter="onDropZoneMouseEnter"
      @mouseleave="onDropZoneMouseLeave"
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
    
    onDropZoneMouseEnter(event) {
      if (!$state.dragging.active)
        return

      $state.dragging.dropRegionId = this.elem.id
      $state.dragging.dropIndex = this.elem.children.length
    },
    onDropZoneMouseLeave(event) {
      if (!$state.dragging.active)
        return
      
      $state.dragging.dropRegionId = null
      $state.dragging.dropIndex = null
    },

    onDropZonePointerUp(event) {
      if ($state.dragging.active
      && !$app.selection.has(this.elem)) {
        event.stopPropagation()

        $app.selection.moveToRegion(this.elem)

        $app.dragging.finish(event)
      }
    },

  },

  

  computed: {

    active() {
      return $app.activeElem.is(this.elem)
    },
    editing() {
      return this.active && $getters.page.elems.editing
    },



    sizeProp() {
      return $app.elems.getSizeProp(this.elem)
    },
    targetWidth() {
      if (this.inheritedWidth != null)
        return this.inheritedWidth

      if (this.elem[this.sizeProp].x === 'auto'
      || this.elem[this.sizeProp].x === 'expanded' && this.elem.size.x === 'auto')
        return 'auto'

      return 0
    },

  },

}
</script>

<style scope>
.drop-zone {
  flex: 1;

  background-color: #42A5F5;
  opacity: 0;
}
.drop-zone.active {
  opacity: 0.25;
}
</style>