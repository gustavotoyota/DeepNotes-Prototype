<template>

  <div :style="`position: absolute; width: 0; height: 0;
  left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <v-sheet :id="`elem-${elem.id}`"
    rounded elevation="6"
    :color="isActive ? `light-blue darken-2` :
      (isSelected ? `light-blue darken-4` : `grey darken-3`)"
    :style="`position: absolute;
    transform: translate(-50%, -50%);
    padding: 7px 9px`"
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
.ql-editor {
  padding: 0 !important;

  min-width: 1px;
  width: max-content;
}

.ql-tooltip {
  width: max-content;
}

ul {
  padding-left: 0 !important;
}

li {
  padding-left: 1em !important;
}
.ql-indent-1 {
  padding-left: 2em !important;
}
.ql-indent-2 {
  padding-left: 3em !important;
}
.ql-indent-3 {
  padding-left: 4em !important;
}
</style>