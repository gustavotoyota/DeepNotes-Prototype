<template>

  <div class="anchor"
  :style="`left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <div class="wrapper"
    :style="`transform: translate(${-elem.anchor.x * 100}%, ${-elem.anchor.y * 100}%); `">

      <v-sheet class="note"
      :id="`elem-${elem.id}`"
      :color="color" rounded elevation="6"
      :style="`width: ${width}; height: ${height}; ` +
      `cursor: ${(elem.linkedPageId == null || selected) ? 'auto' : 'pointer' }; ` +
      `white-space: ${elem.wrapText ? 'normal' : 'nowrap'}`"
      @pointerdown="onPointerDown"
      @click="onClick">

        <div class="editor-0-div"
        :style="`flex: ${ elem.hasBody ? 'none' : 1 }`"
        @pointerdown="onEditorPointerDown($event, 0)"
        @dblclick="onEditorDoubleClick($event, 0)">
          <quill-editor ref="editor-0"
          :id="`note-${elem.id}-editor-0`"
          v-model="elem.content[0]"
          :options="editorOptions"
          :disabled="!editing || elem.readOnly"/>
        </div>

        <div class="editor-1-outer-div"
        v-if="elem.hasBody && (!elem.collapsed || elem.collapsedSize.y !== 'auto')">
          <v-divider/>

          <div class="editor-1-inner-div"
          @pointerdown="onEditorPointerDown($event, 1)"
          @dblclick="onEditorDoubleClick($event, 1)">
            <quill-editor ref="editor-1"
            :id="`note-${elem.id}-editor-1`"
            v-model="elem.content[1]"
            :options="editorOptions"
            :disabled="!editing || elem.readOnly"/>
          </div>
        </div>

      </v-sheet>

      <div v-if="selected && elem.resizable"
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

    </div>

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
        toolbar: [
          [
            'bold',
            'italic',
            'underline',
            'strike',
            { 'header': 1 },
            { 'header': 2 },
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
          ],
          [
            { 'indent': '-1' },
            { 'indent': '+1' },
            { 'script': 'sub' },
            { 'script': 'super' },
            'blockquote',
            'code-block',
            'link',
            'image',
            'formula',
            'clean',
          ],
        ],
        
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
        $app.editing.stop()

      if (this.elem.linkedPageId != null
      && !event.altKey && !this.selected)
        return

      $app.clickSelection.perform(this.elem, event)

      if ($app.elems.isSelected(this.elem.id)
      && this.elem.movable
      && !this.page.elems.editing)
        $app.dragging.start(event)
    },



    onClick(event) {
      if (this.elem.linkedPageId == null
      || event.altKey || this.selected)
        return

      $app.pages.navigate(this.elem.linkedPageId)
    },



    onEditorPointerDown(event, editorIdx) {
      if (!event.target.className.toString().startsWith(`editor-${editorIdx}`))
        return

      if (event.button === 0 && this.editing
      && !event.target.isContentEditable) {
        this.$refs[`editor-${editorIdx}`].quill.focus()
        event.preventDefault()
      }
    },
    onEditorDoubleClick(event, editorIdx) {
      if (event.button === 0)
        $app.editing.start(this.elem, editorIdx)
    },

  },



  computed: {

    page() {
      return $getters.currentPage
    },



    selected() {
      return $app.elems.isSelected(this.elem.id)
    },
    active() {
      return this.page.elems.activeId == this.elem.id
    },
    editing() {
      return this.active && this.page.elems.editing
    },



    color() {
      if (this.active)
        return `grey darken-1`
      else if (this.selected)
        return `grey darken-2`
      else
        return `grey darken-3`
    },



    sizeProp() {
      return $app.elems.getSizeProp(this.elem)
    },
    width() {
      if (this.elem[this.sizeProp].x === 'auto')
        return 'auto'
      else if (this.elem[this.sizeProp].x === 'expanded')
        return `${this.elem.expandedWidth}px`
      else
        return `${this.elem[this.sizeProp].x}px`
    },
    height() {
      if (this.elem[this.sizeProp].y === 'auto')
        return 'auto'
      else
        return `${this.elem[this.sizeProp].y}px`
    },

  },

}
</script>

<style scoped>
.anchor {
  position: absolute; width: 0; height: 0;
}

.wrapper {
  position: absolute;
}

.note {
  border-radius: 7px !important;

  min-width: 23px;
  min-height: 40px;

  display: flex;
  flex-direction: column;

  overflow: hidden;
}

.editor-0-div {
  padding: 11px;
  max-height: 100%;
  white-space: inherit;
}

.editor-1-outer-div {
  flex: 1;
  height: 0;
  white-space: inherit;
}
.editor-1-inner-div {
  padding: 11px;
  height: 100%;
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
  cursor: inherit !important;
}

.quill-editor /deep/ .ql-formats:nth-child(1) {
  margin-bottom: 0 !important;
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

<style>
.ql-tooltip {
  z-index: 9999;

  background-color: #303030 !important;
  border-radius: 12px !important;
}

.ql-toolbar {
  display: flex;

  flex-direction: column;
}

.ql-formats {
  margin: 8px !important;
}
.ql-formats:not(:first-child) {
  margin-top: 0 !important;
}
</style>