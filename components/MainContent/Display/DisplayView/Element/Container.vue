<template>

  <Block :elem="elem"
  :root-width="rootWidth">
    
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
      :elem="child" :root-width="contentWidth"/>

    </div>

  </Block>
  
</template>

<script>
export default {
  
  props: {
    elem: { type: Object },

    rootWidth: { },
  },



  methods: {

    onDropZonePointerUp(event) {
      if ($state.dragging.active && event.button === 0
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
    contentWidth() {
      if (this.elem.parentId != null) {
        if (this.rootWidth === 'auto')
          return 'auto'
        else
          return 0
      }

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