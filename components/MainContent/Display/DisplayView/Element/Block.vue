<template>

  <!-- Anchor -->

  <div :class="{ anchor: elem.parentId == null }"
  :style="`left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <!-- Controller -->

    <div :id="`elem-${elem.id}`"
    style="min-height: 40px"
    :style="`position: ${elem.parentId == null ? 'absolute' : 'static'}; ` +
    (minWidth ? `min-width: ${minWidth}; ` : '') +
    `width: ${width}; height: ${height}; ` +
    (elem.parentId == null ? `transform: translate(${-elem.anchor.x * 100}%, ${-elem.anchor.y * 100}%); ` : '') +
    (dragging ? `opacity: 0.7; pointer-events: none` : ``)">

      <!-- Background -->

      <v-sheet style="border-radius: 7px !important;
      height: 100%;
      display: flex; flex-direction: column;
      overflow: hidden"
      :color="color" rounded elevation="6"
      :style="`cursor: ${(elem.linkedPageId == null || selected) ? 'auto' : 'pointer' }`"
      @pointerdown="onPointerDown"
      @click="onClick">

        <!-- Title -->

        <div v-if="elem.hasTitle"
        style="max-height: 100% /* Brings vertical scroll to title */;
        display: flex /* Horizontal flex */"
        :style="`flex: ${elem.hasBody ? 'none' : 1}`"
        @pointerdown="onTitlePointerDown"
        @dblclick="onTitleDoubleClick">

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
            @pointerdown="onCollapseButtonPointerDown"
            @click="onCollapseButtonClick"
            @dblclick.stop>
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
          @pointerdown="$emit('body-pointerdown', $event)"
          @dblclick="$emit('body-dblclick', $event)">

            <slot/>

          </div>



          <!-- Body collapse button -->

          <div v-if="!elem.hasTitle && elem.collapsible"
          style="flex: none /* Button is horizontally inflexible */">

            <v-btn plain tile
            style="min-width: 0 /* Allows reducing collapse button width */;
            width: 32px /* Reduces collapse button width to 32px */;
            height: 40px /* Makes collapse button fixed to 40px height */"
            @pointerdown="onCollapseButtonPointerDown"
            @click="onCollapseButtonClick"
            @dblclick.stop>
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



  methods: {

    onPointerDown(event) {
      if (event.target.style.opacity === '0.8')
        return

      if (!$app.activeElem.is(this.elem))
        $app.editing.stop()

      if (this.elem.linkedPageId != null
      && !event.altKey && !this.selected)
        return

      $app.clickSelection.perform(this.elem, event)

      if ($app.selection.has(this.elem)
      && this.elem.parentId == null
      && !$getters.page.elems.editing)
        $app.dragging.start(event)
    },



    onClick(event) {
      if (this.elem.linkedPageId == null
      || event.altKey || this.selected)
        return

      $app.pages.navigate(this.elem.linkedPageId)
    },



    onTitlePointerDown(event) {
      if (!event.target.className.toString().startsWith(`editor-0`))
        return

      if (event.button === 0 && this.editing
      && !event.target.isContentEditable) {
        this.$refs[`editor-0`].quill.focus()
        event.preventDefault()
      }
    },
    onTitleDoubleClick(event) {
      if (event.button === 0)
        $app.editing.start(this.elem, 0)
    },



    onCollapseButtonPointerDown(event) {
      if (event.button === 0)
        event.stopPropagation()
    },
    onCollapseButtonClick(event) {
      if (event.button === 0) {
        $app.collapsing.toggleCollapsed(this.elem)
        event.stopPropagation()
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



    visibleBody() {
      return this.elem.hasBody &&
        (!this.elem.collapsed || this.elem.collapsedSize.y !== 'auto')
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