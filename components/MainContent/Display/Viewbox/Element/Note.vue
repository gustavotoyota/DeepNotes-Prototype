<template>

  <div :style="`position: absolute; width: 0; height: 0;
  left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <v-sheet :id="`elem-${elem.id}`"
    rounded elevation="6"
    :color="isActive ? `grey darken-1` :
      (isSelected ? `grey darken-2` : `grey darken-3`)"
    :style="`position: absolute;
    transform: translate(-50%, -50%)`"
    @pointerdown="onPointerDown">

      <div v-show="elem.hasTitle"
      @dblclick="onTitleDoubleClick">
        <div style="padding: 9px 11px">
          <quill-editor
          v-model="elem.title"
          :options="editorOptions"
          :disabled="!isEditing || elem.readOnly"/>
        </div>

        <v-divider/>
      </div>

      <div style="padding: 9px 11px"
      @dblclick="onContentDoubleClick">
        <quill-editor
        v-model="elem.content"
        :options="editorOptions"
        :disabled="!isEditing || elem.readOnly"/>
      </div>

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

    onTitleDoubleClick(event) {
      if (event.button === 0)
        $app.editing.start(this.elem, 0)
    },
    onContentDoubleClick(event) {
      if (event.button === 0)
        $app.editing.start(this.elem, 1)
    },

  },



  computed: {

    page() {
      return $getters.currentPage
    },

    isSelected() {
      return $app.elems.isSelected(this.elem)
    },
    isActive() {
      return this.page.elems.activeId == this.elem.id
    },
    isEditing() {
      return this.isActive && this.page.elems.editing
    },

  },

}
</script>

<style>
.ql-editor {
  padding: 0 !important;

  min-width: calc(100% + 1px);
  width: max-content;
}

.ql-editor > * {
  cursor: auto !important;
}

.ql-tooltip {
  width: max-content;

  z-index: 9999;
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