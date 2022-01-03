<template>

  <div class="anchor"
  :style="`left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <div :id="`elem-${elem.id}`"
    style="position: absolute;
    min-width: 150px; min-height: 40px"
    :style="`width: ${width}; height: ${height};
    transform: translate(${-elem.anchor.x * 100}%, ${-elem.anchor.y * 100}%)`">

      <v-sheet style="border-radius: 7px !important;
      display: flex; flex-direction: column;
      height: 100%; overflow: hidden"
      :color="color" rounded elevation="6"
      @pointerdown="onPointerDown">

        <div v-if="elem.hasTitle"
        style="flex: none;
        max-height: 100%; display: flex"
        @pointerdown="onEditorPointerDown($event, 0)"
        @dblclick="onEditorDoubleClick($event, 0)">

          <div style="flex: 1"
          :style="`padding: 10px;
          width: ${ (elem[sizeProp].x === 'auto' || (elem[sizeProp].x === 'expanded' && elem.size.x === 'auto')) ? 'auto' : 0 };
          padding-right: ${ elem.collapsible ? 0 : `10px`}`">

            <SmartEditor ref="editor-0"
            :id="`elem-${elem.id}-editor-0`"
            v-model="elem.title"
            :disabled="!editing || elem.readOnly"
            :wrap="elem.wrapText"/>

          </div>

          <div v-if="elem.collapsible"
          style="flex: none">

            <v-btn plain tile
            style="min-width: 0; width: 32px; height: 100%"
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

        <div style="flex: 1; height: 0"
        :style="`max-height: ${ visibleBody ? 'none' : 0 }`">

          <v-divider/>

          <div style="padding: 10px"
          :style="`height: ${ elem[sizeProp].x === 'expanded' ? `${elem.expandedHeight}px` : '100%' }`">

            <Element v-for="child of elem.children" :key="child.id" :elem="child"/>

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

      if (!$app.activeElem.is(this.elem.id))
        $app.editing.stop()

      $app.clickSelection.perform(this.elem, event)

      if ($app.selection.hasElem(this.elem.id)
      && this.elem.movable
      && !this.page.elems.editing)
        $app.dragging.start(event)
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




    onDropZonePointerUp(event) {
      if ($state.dragging.active && event.button === 0
      && !$app.selection.hasElem(this.elem.id)) {
        for (const selectedElem of $app.selection.getElems()) {
          this.elem.children.push(selectedElem)
          selectedElem.parent = this.elem
        }
      }
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
      return $app.activeElem.is(this.elem.id)
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
      return !this.elem.collapsed
        || this.elem.collapsedSize.y !== 'auto'
    },

  },

}
</script>

<style scoped>
.anchor {
  position: absolute; 
  
  width: 0;
  height: 0;
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