<template>

  <!-- Anchor -->

  <div :id="`elem-${elem.id}-anchor`"
  :class="{ anchor: elem.parentId == null }"
  :style="`left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <!-- Frame -->

    <div :id="`elem-${elem.id}-frame`"
    style="min-height: 40px"
    :style="`position: ${elem.parentId == null ? 'absolute' : 'relative'}; ` +
    (minWidth ? `min-width: ${minWidth}; ` : '') +
    `width: ${width}; height: ${height}; ` +
    (elem.parentId == null ? `transform: translate(${-elem.anchor.x * 100}%, ${-elem.anchor.y * 100}%); ` : '') +
    (dragging ? `opacity: 0.7; pointer-events: none` : ``)">

      <!-- Element drop helpers -->

      <div v-if="elem.parentId != null && $state.dragging.active">

        <div class="drop-zone"
        :class="{ 'active' : $state.dragging.dropRegionId == this.parentElem.id
          && $state.dragging.dropIndex === index }"
        style="top: -5px; bottom: 50%"
        @mouseenter="onDropZoneMouseEnter($event, 0)"
        @mouseleave="onDropZoneMouseLeave($event, 0)"
        @pointerup.left.stop="onDropZonePointerUp($event, 0)">
        </div>

        <div class="drop-zone"
        :class="{ 'active' : $state.dragging.dropRegionId == this.parentElem.id
          && $state.dragging.dropIndex === index + 1 }"
        style="top: 50%; bottom: 0%"
        @mouseenter="onDropZoneMouseEnter($event, 1)"
        @mouseleave="onDropZoneMouseLeave($event, 1)"
        @pointerup.left.stop="onDropZonePointerUp($event, 1)">
        </div>

      </div>



      <!-- Background -->

      <v-sheet style="border-radius: 7px !important;
      height: 100%;
      display: flex; flex-direction: column;
      overflow: hidden"
      :color="color" rounded elevation="6"
      :style="`cursor: ${(elem.linkedPageId == null || selected) ? 'auto' : 'pointer' }`"
      @pointerdown.left.stop="onPointerDown"
      @click.left.stop="onClick">

        <!-- Title -->

        <div v-if="elem.hasTitle"
        style="max-height: 100% /* Brings vertical scroll to title */;
        display: flex /* Horizontal flex */"
        :style="`flex: ${elem.hasBody ? 'none' : 1}`"
        @pointerdown.left="onTitlePointerDown"
        @dblclick.left="$app.editing.start(elem, 0)">

          <!-- Title content -->

          <div style="flex: 1 /* Title content is horizontally flexible */"
          :style="`padding: 10px;
          width: ${targetWidth} /* Auto or 0 (custom) */;
          padding-right: ${elem.collapsible ? 0 : `10px`} /* Padding 0 when collapsible */`">

            <SmartEditor ref="editor-0"
            :id="`elem-${elem.id}-editor-0`"
            v-model="elem.title"
            :disabled="!editing || elem.readOnly"
            :wrap="elem.wrapTitle"/>

          </div>



          <!-- Title collapse button -->

          <div v-if="elem.collapsible"
          style="flex: none /* Button is horizontally inflexible */">

            <v-btn plain tile
            style="min-width: 0 /* Allows reducing collapse button width */;
            width: 32px /* Reduces collapse button width to 32px */;
            height: 100% /* Makes the collapse button height the same as the title */"
            @pointerdown.left.stop
            @click.left.stop="$app.collapsing.toggleCollapsed(elem)"
            @dblclick.left.stop>
              <v-icon v-if="elem.collapsed">mdi-chevron-down</v-icon>
              <v-icon v-else>mdi-chevron-up</v-icon>
            </v-btn>

          </div>

        </div>



        <!-- Divider -->

        <v-divider v-if="elem.hasTitle && elem.hasBody && !(elem.collapsed && elem.collapsedSize.y === 'auto')"/>



        <!-- Body -->

        <div v-if="elem.hasBody && !(elem.collapsed && elem.collapsedSize.x === 'auto')"
        style="flex: 1 /* Body is vertically flexible */;
        height: 0 /* Body wants the least height */;
        max-height: 100% /* Brings vertical scroll to body */;
        display: flex /* Horizontal flex */"
        :style="(elem.hasTitle && elem[sizeProp].x === 'expanded' ? 'max-height: 0 /* Squash height if collapsed and width is set to expanded */' : '')">



          <!-- Body content -->

          <div :id="`elem-${elem.id}-body`"
          style="flex: 1 /* Body content is horizontally flexible */;
          padding: 10px !important; /* '!important' is necessary because of padding bug */"
          :style="`height: ${elem.hasTitle && elem[sizeProp].x === 'expanded' ? `${elem.expandedHeight}px` : '100%'};
          width: ${targetWidth} /* Auto or 0 (custom) */;
          padding-right: ${!elem.hasTitle && elem.collapsible ? 0 : `10px`} /* Padding 0 when collapsible */`"
          @pointerdown.left="$emit('body-pointerdown', $event)"
          @dblclick.left="$emit('body-dblclick', $event)">

            <slot/>

          </div>



          <!-- Body collapse button -->

          <div v-if="!elem.hasTitle && elem.collapsible"
          style="flex: none /* Button is horizontally inflexible */">

            <v-btn plain tile
            style="min-width: 0 /* Allows reducing collapse button width */;
            width: 32px /* Reduces collapse button width to 32px */;
            height: 40px /* Makes collapse button fixed to 40px height */"
            @pointerdown.left.stop
            @click.left.stop="$app.collapsing.toggleCollapsed(elem)"
            @dblclick.left.stop>
              <v-icon v-if="elem.collapsed">mdi-chevron-down</v-icon>
              <v-icon v-else>mdi-chevron-up</v-icon>
            </v-btn>

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

    inheritedWidth: { },

    minWidth: { type: String },
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
      if (this.elem[this.sizeProp].y === 'auto') {
        if (!this.elem.hasTitle && this.elem.collapsed)
          return 0
        else
          return 'auto'
      } else
        return `${this.elem[this.sizeProp].y}px`
    },



    targetWidth() {
      if (this.inheritedWidth != null)
        return this.inheritedWidth

      if (this.elem[this.sizeProp].x === 'auto'
      || this.elem[this.sizeProp].x === 'expanded' && this.elem.size.x === 'auto')
        return 'auto'

      return 0
    },



    parentElem() {
      return $app.elems.getById(this.elem.parentId)
    },
    index() {
      if (!this.parentElem)
        return null

      return this.parentElem.children.findIndex(item => item === this.elem)
    },

  },



  methods: {

    onPointerDown(event) {
      // Stop selecting element on scrollbar click

      if (event.target.scrollWidth > event.target.clientWidth
      && event.offsetY > event.target.clientHeight) 
        return

      if (event.target.scrollHeight > event.target.clientHeight
      && event.offsetX > event.target.clientWidth)
        return

      

      if (event.target.style.opacity === '0.8')
        return

      if (!$app.activeElem.is(this.elem))
        $app.editing.stop()

      if (this.elem.linkedPageId != null
      && !event.altKey && !this.selected)
        return

      $app.clickSelection.perform(this.elem, event)

      if ($app.selection.has(this.elem)
      && !$getters.page.elems.editing)
        $app.dragging.start(event, this.elem)
    },



    onClick(event) {
      if (this.elem.linkedPageId == null
      || event.altKey || this.selected)
        return

      $app.pages.navigate(this.elem.linkedPageId)
    },



    onTitlePointerDown(event) {
      console.log('test')

      if (this.editing) {
        event.stopPropagation()

        setTimeout(() => {
          this.$refs[`editor-0`].quill.focus()
        })
      }
    },



    // Drop zones
    
    onDropZoneMouseEnter(event, offset) {
      if (!$state.dragging.active)
        return

      $state.dragging.dropRegionId = this.parentElem.id
      $state.dragging.dropIndex = this.index + offset
    },
    onDropZoneMouseLeave(event, offset) {
      if (!$state.dragging.active)
        return
      
      $state.dragging.dropRegionId = null
      $state.dragging.dropIndex = null
    },

    onDropZonePointerUp(event, offset) {
      const dropIndex = this.index + offset

      $app.selection.moveToRegion(this.parentElem, dropIndex)
      
      $app.dragging.finish(event)
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


.drop-zone {
  position: absolute;
  left: 0; right: 0;

  background-color: #42A5F5;
  opacity: 0;

  z-index: 9999;
}
.drop-zone.active {
  opacity: 0.25;
}
</style>