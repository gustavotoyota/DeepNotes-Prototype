<template>

  <div class="anchor"
  :style="`left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <v-sheet class="note"
    :id="`elem-${elem.id}`" rounded elevation="6"
    :color="isActive ? `grey darken-1` :
      (isSelected ? `grey darken-2` : `grey darken-3`)"
    :style="`width: ${elem.size.x == null ? 'auto' : elem.size.x + 'px'};
    height: ${elem.size.y == null ? 'auto' : elem.size.y + 'px'};
    white-space: ${elem.wrapText ? 'normal' : 'nowrap'}`"
    @pointerdown="onPointerDown">

      <div v-show="elem.hasTitle"
      class="title-outer-div"
      @dblclick="onTitleDoubleClick">
        <div class="title-inner-div">
          <quill-editor
          v-model="elem.title"
          :options="editorOptions"
          :disabled="!isEditing || elem.readOnly"
          @ready="onEditorReady"/>
        </div>

        <v-divider/>
      </div>

      <div class="content-div"
      @dblclick="onContentDoubleClick">
        <quill-editor
        v-model="elem.content"
        :options="editorOptions"
        :disabled="!isEditing || elem.readOnly"
        @ready="onEditorReady"/>
      </div>

      <div v-if="isSelected && elem.resizable"
      class="handlers">
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

<style scoped>
.anchor {
  position: absolute; width: 0; height: 0;
}

.note {
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 7px !important;
  min-width: 23px; min-height: 40px;
  display: flex; flex-direction: column;
}

.title-outer-div {
  flex: none;
  max-height: 100%;
  white-space: inherit;
}

.title-inner-div {
  padding: 11px;
  height: 100%;
  white-space: inherit;
}

.content-div {
  padding: 11px;
  flex: 1;
  height: 0;
  white-space: inherit;
}

.handlers {
  position: absolute;
  pointer-events: none;
  
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.quill-editor {
  min-width: 1px;

  white-space: inherit;
  
  height: 100%;
}

.quill-editor /deep/ .ql-container {
  white-space: inherit;
}

.quill-editor /deep/ .ql-editor {
  padding: 0 !important;

  min-width: 100%;
  max-width: 100%;

  width: max-content;
  
  white-space: inherit !important;
}

.quill-editor /deep/ .ql-editor > * {
  cursor: auto !important;
}

.quill-editor /deep/ .ql-tooltip {
  width: max-content;

  z-index: 9999;
}

.quill-editor /deep/ ul {
  padding-left: 0 !important;
}

.quill-editor /deep/ li {
  padding-left: 1em !important;
}
.quill-editor /deep/ .ql-indent-1 {
  padding-left: 2em !important;
}
.quill-editor /deep/ .ql-indent-2 {
  padding-left: 3em !important;
}
.quill-editor /deep/ .ql-indent-3 {
  padding-left: 4em !important;
}



/* Remove link before */

.quill-editor /deep/ a::before {
  display: none;
}
.quill-editor /deep/ a::after {
  display: none;
}
</style>