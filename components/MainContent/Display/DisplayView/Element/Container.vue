<template>

  <Block refs="block" :elem="elem"
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
    @pointerup="onDropZonePointerUp">
      Drop notes here
    </div>

    <div v-else
    style="height: 100%; overflow: auto">

      <Element v-for="child of elem.children" :key="child.id"
      :elem="child" :inherited-width="targetWidth"/>

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

    onDropZonePointerUp(event) {
      if (event.button === 0
      && $state.dragging.active
      && !$app.selection.has(this.elem)) {
        for (const selectedElem of $app.selection.getElems()) {
          $app.elems.removeFromRegion(selectedElem)
          this.elem.children.push(selectedElem)
          
          selectedElem.parentId = this.elem.id

          $app.selection.add(selectedElem)
        }
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

<style>
</style>