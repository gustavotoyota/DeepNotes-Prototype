<template>

  <div class="anchor"
  :style="`left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <div style="position: absolute"
    :style="`transform: translate(${-elem.anchor.x * 100}%, ${-elem.anchor.y * 100}%); `">

      <v-sheet style="border-radius: 7px !important;
      min-width: 23px; min-height: 40px;
      display: flex; flex-direction: column;
      overflow: hidden"
      :id="`elem-${elem.id}`"
      :color="color" rounded elevation="6"
      :style="`width: ${width}; height: ${height}; ` +
      `cursor: ${(elem.linkedPageId == null || selected) ? 'auto' : 'pointer' }; `"
      @pointerdown="onPointerDown"
      @click="onClick">

        <div style="max-height: 100%; display: flex"
        :style="`flex: ${ elem.hasBody ? 'none' : 1 }`"
        @pointerdown="onEditorPointerDown($event, 0)"
        @dblclick="onEditorDoubleClick($event, 0)">

          <div style="flex: 1"
          :style="`padding: 11px;
          width: ${ (elem[sizeProp].x === 'auto' || (elem[sizeProp].x === 'expanded' && elem.size.x === 'auto')) ? 'auto' : 0 };
          padding-right: ${ elem.collapsible ? 0 : `11px`}`">
            <SmartEditor ref="editor-0"
            :id="`note-${elem.id}-editor-0`"
            v-model="elem.content[0]"
            :disabled="!editing || elem.readOnly"
            :wrap="elem.wrapText"/>
          </div>

          <div v-if="elem.collapsible"
          style="flex: none">
            <v-btn plain tile
            style="min-width: 0; width: 32px; height: 100%"
            :style="`max-height: ${ elem.hasBody ? 'none' : '40px' };
            border-bottom-left-radius: ${ elem.hasBody ? 0 : '4px' }`"
            @pointerdown="(event) => {
              if (event.button === 0)
                event.stopPropagation()
            }"
            @click="(event) => {
              if (event.button === 0) {
                $app.collapsing.toggleCollapsed(elem)
                event.stopPropagation()
              }
            }"
            @dblclick.stop="">
              <v-icon v-if="elem.collapsed">mdi-chevron-down</v-icon>
              <v-icon v-else>mdi-chevron-up</v-icon>
            </v-btn>
          </div>

        </div>

        <div v-if="elem.hasBody && (!elem.collapsed || elem[sizeProp].x === 'expanded')"
        style="flex: 1; height: 0"
        :style="`max-height: ${ visibleBody ? 'none' : 0 }`">
          <v-divider/>

          <div :id="`note-${elem.id}-body`"
          style="padding: 11px"
          :style="`height: ${ elem[sizeProp].x === 'expanded' ? `${elem.expandedHeight}px` : '100%' }`"
          @pointerdown="onEditorPointerDown($event, 1)"
          @dblclick="onEditorDoubleClick($event, 1)">
            <SmartEditor ref="editor-1"
            :id="`note-${elem.id}-editor-1`"
            v-model="elem.content[1]"
            :disabled="!editing || elem.readOnly"
            :wrap="elem.wrapText"/>
          </div>
        </div>

      </v-sheet>

      <div v-if="selected && elem.resizable"
      class="handlers">
        <Handle :elem="elem" side="nw"/>
        <Handle :elem="elem" side="n"/>
        <Handle :elem="elem" side="ne"/>
        <Handle :elem="elem" side="w"/>
        <Handle :elem="elem" side="e"/>
        <Handle :elem="elem" side="sw"/>
        <Handle :elem="elem" side="s"/>
        <Handle :elem="elem" side="se"/>
      </div>

    </div>

  </div>

</template>

<script>
export default {
  
  props: {
    elem: { type: Object },
  },



  methods: {

    onPointerDown(event) {
      if (event.target.style.opacity === '0.8')
        return

      if (!$app.elems.isActive(this.elem.id))
        $app.editing.stop()

      if (this.elem.linkedPageId != null
      && !event.altKey && !this.selected)
        return

      $app.clickSelection.perform(this.elem, event)

      if ($app.selection.hasElem(this.elem.id)
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
      return $app.selection.hasElem(this.elem.id)
    },
    active() {
      return $app.elems.isActive(this.elem.id)
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
      let expandedWidth
      if (this.elem.size.x === 'auto')
        expandedWidth = 'auto'
      else
        expandedWidth = `${this.elem.size.x}px`

      if (this.elem[this.sizeProp].x === 'auto')
        return 'auto'
      else if (this.elem[this.sizeProp].x === 'expanded')
        return expandedWidth
      else
        return `${this.elem[this.sizeProp].x}px`
    },
    height() {
      if (this.elem[this.sizeProp].y === 'auto')
        return 'auto'
      else
        return `${this.elem[this.sizeProp].y}px`
    },



    visibleBody() {
      return this.elem.hasBody &&
        (!this.elem.collapsed || this.elem.collapsedSize.y !== 'auto')
    },

  },

}
</script>

<style scoped>
.anchor {
  position: absolute; width: 0; height: 0;
}

.handlers {
  position: absolute;
  pointer-events: none;
  
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>