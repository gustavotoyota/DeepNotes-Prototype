<template>

  <div :class="{ anchor: elem.parentId == null }"
  :style="`left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <div :id="`elem-${elem.id}`"
    style="min-width: 165px; min-height: 40px"
    :style="`position: ${elem.parentId == null ? 'absolute' : 'static'};
    min-width: ${elem.parentId == null ? 'max-content' : 0};
    width: ${width}; height: ${height}; ` +
    (elem.parentId == null ? `transform: translate(${-elem.anchor.x * 100}%, ${-elem.anchor.y * 100}%); ` : '') +
    (dragging ? `opacity: 0.7; pointer-events: none` : ``)">

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
          width: ${titleWidth};
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

        <div v-if="!(elem.collapsed && elem.collapsedSize.x === 'auto')"
        style="flex: 1; height: 0"
        :style="`max-height: ${ visibleBody ? 'none' : 0 }`">

          <v-divider/>

          <div :id="`elem-${elem.id}-body`"
          style="padding: 10px"
          :style="`height: ${ elem[sizeProp].x === 'expanded' ? `${elem.expandedHeight}px` : '100%' }`">

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
              :elem="child" :parent-width="titleWidth"/>
            </div>

          </div>

        </div>

      </v-sheet>

    </div>

  </div>
  
</template>

<script>
export default {
  
  props: {
    elem: { type: Object },

    parentWidth: { },
  },



  methods: {
    
    onPointerDown(event) {
      if (event.target.style.opacity === '0.8')
        return

      if (!$app.activeElem.is(this.elem))
        $app.editing.stop()

      $app.clickSelection.perform(this.elem, event)

      if ($app.selection.has(this.elem)
      && this.elem.parentId == null
      && !$getters.page.elems.editing)
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

    selected() {
      return $app.selection.has(this.elem)
    },
    active() {
      return $app.activeElem.is(this.elem)
    },
    editing() {
      return this.active && $getters.page.elems.editing
    },
    dragging() {
      return $state.dragging.active
        && $state.dragging.moved
        && $app.selection.has(this.elem)
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
      if (this.elem.parentId != null)
        return 'auto'

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



    titleWidth() {
      if (this.elem.parentId != null) {
        if (this.parentWidth === 'auto')
          return 'auto'
        else
          return 0
      }

      if (this.elem[this.sizeProp].x === 'auto'
      || this.elem[this.sizeProp].x === 'expanded' && this.elem.size.x === 'auto')
        return 'auto'

      return 0
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