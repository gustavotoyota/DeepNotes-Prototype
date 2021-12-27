<template>

  <div :style="`position: absolute; width: 0; height: 0;
  left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <v-sheet :id="`elem-${elem.id}`"
    rounded elevation="6"
    :color="isActive ? `grey darken-1` :
      (isSelected ? `grey darken-2` : `grey darken-3`)"
    :style="`position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 7px !important;
    min-width: 23px; min-height: 40px;
    width: ${elem.size.x == null ? 'auto' : elem.size.x + 'px'};
    height: ${elem.size.y == null ? 'auto' : elem.size.y + 'px'};
    white-space: ${elem.wrapText ? 'normal' : 'nowrap'};
    display: flex; flex-direction: column`"
    @pointerdown="onPointerDown">

      <div v-show="elem.hasTitle"
      style="flex: none;
      max-height: 100%; white-space: inherit"
      @dblclick="onTitleDoubleClick">
        <div style="padding: 11px;
        height: 100%; white-space: inherit">
          <quill-editor
          v-model="elem.title"
          :options="editorOptions"
          :disabled="!isEditing || elem.readOnly"
          @ready="onEditorReady"/>
        </div>

        <v-divider/>
      </div>

      <div style="padding: 11px;
      flex: 1; height: 0; white-space: inherit"
      @dblclick="onContentDoubleClick">
        <quill-editor
        v-model="elem.content"
        :options="editorOptions"
        :disabled="!isEditing || elem.readOnly"
        @ready="onEditorReady"/>
      </div>

      <div v-if="isSelected && elem.resizable"
      style="position: absolute; pointer-events: none;
      left: 0; right: 0; top: 0; bottom: 0">
        <Handle style="left: 0%; top: 0%" side="nw"/>
        <Handle style="left: 50%; top: 0%" side="n"/>
        <Handle style="left: 100%; top: 0%" side="ne"/>
        <Handle style="left: 0%; top: 50%" side="w"/>
        <Handle style="left: 100%; top: 50%" side="e"/>
        <Handle style="left: 0%; top: 100%" side="sw"/>
        <Handle style="left: 50%; top: 100%" side="s"/>
        <Handle style="left: 100%; top: 100%" side="se"/>
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
      
      bounds: '#display',

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

    onEditorReady(quill) {
      quill.on('selection-change', () => {
        $app.tooltips.fix()
      })
    },





    onPointerDown(event) {
      if (this.elem.id != this.page.elems.activeId)
        $app.editing.stop()

      $app.clickSelection.perform(this.elem, event)

      if ($app.elems.isSelected(this.elem)
      && this.elem.movable
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
.quill-editor {
  min-width: 1px;

  white-space: inherit;
  
  height: 100%;
}

.ql-container {
  white-space: inherit;
}

.ql-editor {
  padding: 0 !important;

  min-width: 100%;
  max-width: 100%;

  width: max-content;
  
  white-space: inherit !important;
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



/* Remove link before */

a::before {
  display: none;
}a::after {
  display: none;
}
</style>