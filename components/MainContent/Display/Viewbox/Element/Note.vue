<template>

  <div :style="`position: absolute; width: 0; height: 0;
  left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <v-sheet :id="`elem-${elem.id}`"
    rounded elevation="6"
    :color="isActive ? `grey darken-1` :
      (isSelected ? `grey darken-2` : `grey darken-3`)"
    :style="`position: absolute;
    transform: translate(-50%, -50%);
    padding: 9px 11px`"
    @pointerdown="onPointerDown"
    @dblclick="onDoubleClick">

      <quill-editor
      ref="quillEditor"
      v-model="elem.content"
      :options="editorOptions"
      :disabled="!isActive || !page.elems.editing"/>

    </v-sheet>

  </div>

</template>

<script>
export default {
  
  props: {
    elem: { type: Object },
  },

  created() {
    this.editorOptions = {
      theme: 'bubble',

      placeholder: '',

      modules: {
        imageDrop: true,
        imageResize: {
          modules: ['DisplaySize', 'Resize'],
        },
      },
    }
  },


  methods: {

    onPointerDown(event) {
      if (this.elem.id != this.page.elems.activeId)
        this.page.elems.editing = false

      $app.clickSelection.perform(this.elem, event)

      if ($app.elems.isSelected(this.elem)
      && !this.page.elems.editing)
        $app.dragging.start(event)
    },

    onDoubleClick(event) {
      if (event.button === 0)
        $app.editing.start(this.elem)
    },

  },



  computed: {

    page() {
      return $getters.currentPage
    },

    isActive() {
      return this.page.elems.activeId == this.elem.id
    },
    isSelected() {
      return $app.elems.isSelected(this.elem)
    },

  },

}
</script>

<style>

</style>