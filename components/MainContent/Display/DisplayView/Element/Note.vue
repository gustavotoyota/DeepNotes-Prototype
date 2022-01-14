<template>

  <!-- Anchor -->

  <div :id="`elem-${elem.id}-anchor`"
  :class="{ anchor: elem.parentId == null }"
  :style="`left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <!-- Frame -->

    <div :id="`elem-${elem.id}-frame`"
    :style="`position: ${elem.parentId == null ? 'absolute' : 'relative'}; ` +
    `min-width: ${minWidth}; ` +
    `width: ${selfWidth}; ` +
    (elem.parentId == null ? `transform: translate(${-elem.anchor.x * 100}%, ${-elem.anchor.y * 100}%); ` : '') +
    (dragging ? `opacity: 0.7; pointer-events: none` : ``)">

      <!-- Element drop helpers -->

      <div v-if="elem.parentId != null && $state.dragging.active">

        <div class="drop-zone"
        :class="{ 'active' : $state.dragging.dropRegionId == this.parentElem.id
          && $state.dragging.dropIndex === index }"
        style="top: -5px; bottom: 50%"
        @pointerenter="onDropZonePointerEnter($event, 0)"
        @pointerleave="onDropZonePointerLeave($event, 0)"
        @pointerup.left.stop="onDropZonePointerUp($event, 0)">
        </div>

        <div class="drop-zone"
        :class="{ 'active' : $state.dragging.dropRegionId == this.parentElem.id
          && $state.dragging.dropIndex === index + 1 }"
        style="top: 50%; bottom: 0%"
        @pointerenter="onDropZonePointerEnter($event, 1)"
        @pointerleave="onDropZonePointerLeave($event, 1)"
        @pointerup.left.stop="onDropZonePointerUp($event, 1)">
        </div>

      </div>




      <!-- Handles -->

      <div v-if="selected && elem.resizable"
      style="position: absolute; pointer-events: none;
      left: 0; right: 0; top: 0; bottom: 0">

        <Handle :elem="elem" side="s"/>

        <div v-if="elem.parentId == null">
          <Handle :elem="elem" side="nw"/>
          <Handle :elem="elem" side="n"/>
          <Handle :elem="elem" side="ne"/>
          <Handle :elem="elem" side="w"/>
          <Handle :elem="elem" side="e"/>
          <Handle :elem="elem" side="sw"/>
          <Handle :elem="elem" side="se"/>
        </div>
        
      </div>



      
      <!-- Background -->

      <v-sheet style="border-radius: 7px;
      border: 1px solid #212121;
      border-left-color: #757575;
      border-top-color: #757575;
      height: 100%;
      overflow: hidden"
      elevation="6"
      :style="`cursor: ${(elem.linkedPageId == null || selected) ? 'auto' : 'pointer' };
      background-color: ${color}`"
      @pointerdown.left.stop="onPointerDown"
      @click.left.stop="onClick">

        <!-- Title -->

        <div v-if="elem.hasTitle"
        style="display: flex /* Horizontal flex */;
        min-height: 36.453px"
        :style="`height: ${getSectionHeight('title')}`"
        @pointerdown.left="onEditorPointerDown($event, 'title')"
        @dblclick.left="$app.editing.start(elem, 'title')">

          <!-- Title content -->

          <div style="flex: 1 /* Title content is horizontally flexible */;
          padding: 9px;
          overflow: auto"
          :style="`width: ${selfTargetWidth} /* Auto or 0 (custom) */`">

            <SmartEditor ref="title-editor"
            :id="`elem-${elem.id}-title-editor`"
            v-model="elem.title"
            :disabled="!editing || elem.readOnly"
            :wrap="elem.wrapTitle"/>

          </div>




          <!-- Title collapse button -->

          <CollapseButton :elem="elem" section="title"/>

        </div>




        <div v-if="!(elem.collapsed && topSection === 'title' && elem.collapsedSize.x === 'auto')"
        :style="`height: ${topSection === 'title' && elem.collapsed ? '0' : 'unset'}`">

          <!-- Divider -->

          <div v-if="elem.hasTitle && elem.hasBody"
          style="position: relative">

            <v-divider/>

            <Handle v-if="selected"
            :elem="elem" side="s" section="title"/>

          </div>



          
          <!-- Body -->

          <div v-if="elem.hasBody"
          style="display: flex /* Horizontal flex */;
          min-height: 36.453px"
          :style="`height: ${getSectionHeight('body')}`"
          @pointerdown.left="onEditorPointerDown($event, 'body')"
          @dblclick.left="$app.editing.start(elem, 'body')">

            <!-- Body content -->

            <div style="flex: 1 /* Body content is horizontally flexible */;
            padding: 9px;
            overflow: auto"
            :style="`width: ${selfTargetWidth} /* Auto or 0 (custom) */`">

              <SmartEditor ref="body-editor"
              :id="`elem-${elem.id}-body-editor`"
              v-model="elem.body"
              :disabled="!editing || elem.readOnly"
              :wrap="elem.wrapBody"/>

            </div>




            <!-- Body collapse button -->

            <CollapseButton :elem="elem" section="body"/>

          </div>




          <div v-if="elem.container
          && !(elem.collapsed && topSection === 'body' && elem.collapsedSize.x === 'auto')"
          :style="`height: ${topSection === 'body' && elem.collapsed ? '0' : 'unset'}`">

            <!-- Divider -->
            
            <div v-if="elem.hasTitle || elem.hasBody"
            style="position: relative">
            
              <v-divider/>

              <Handle v-if="selected"
              :elem="elem" side="s" :section="elem.hasBody ? 'body' : 'title'"/>

            </div>



            
            <!-- Container -->

            <div style="display: flex /* Horizontal flex */;
            min-height: 56.453px"
            :style="`height: ${getSectionHeight('container')}`">

              <!-- Container content -->

              <div :id="`elem-${elem.id}-scrollbox`"
              style="flex: 1 /* Body content is horizontally flexible */;
              padding: 9px; overflow: auto;
              display: flex; flex-direction: column"
              :style="`width: ${selfTargetWidth} /* Auto or 0 (custom) */`">
              
                <div v-if="elem.children.length === 0"
                style="padding: 8px;
                position: relative;
                height: 100%;
                font-size: 13px;
                background-color: #686868;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden">
                  Drop notes here

                  <div v-if="$state.dragging.active"
                  style="position: absolute;
                  left: 0; top: 0; right: 0; bottom: 0;
                  z-index: 1001"
                  class="drop-zone"
                  :class="{ 'active' : $state.dragging.dropRegionId == elem.id }"
                  @pointerenter="onContainerDropZonePointerEnter"
                  @pointerleave="onContainerDropZonePointerLeave"
                  @pointerup.left="onContainerDropZonePointerUp">
                  </div>
                </div>

                <Element v-for="(child, idx) of elem.children" :key="child.id"
                :style="`margin-top: ${idx === 0 ? 0: '5px'}`"
                :elem="child"
                :target-width="selfTargetWidth"/>
              
                <div class="container-drop-zone"
                style="flex: 1"
                :class="{ 'active' : $state.dragging.dropRegionId == elem.id
                  && $state.dragging.dropIndex === elem.children.length }"
                @pointerenter="onContainerDropZonePointerEnter"
                @pointerleave="onContainerDropZonePointerLeave"
                @pointerup.left="onContainerDropZonePointerUp">
                </div>

              </div>




              <!-- Container collapse button -->

              <CollapseButton :elem="elem" section="container"/>

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

    targetWidth: { type: String },
  },




  computed: {

    selected() {
      return $app.selection.has(this.elem)
    },
    active() {
      return $app.activeElem.is(this.elem)
    },
    editing() {
      return this.active && $getters.editing
    },
    dragging() {
      return $state.dragging.active
        && $app.selection.has(this.elem)
    },




    color() {
      if (this.active)
        return `#757575`
      else if (this.selected)
        return `#616161`
      else
        return `#424242`
    },


    

    sizeProp() {
      return $app.elems.getSizeProp(this.elem)
    },
    topSection() {
      return $app.elems.getTopSection(this.elem)
    },
    bottomSection() {
      return $app.elems.getBottomSection(this.elem)
    },
    numSections() {
      return $app.elems.getNumSections(this.elem)
    },




    parentElem() {
      return $app.elems.getById(this.elem.parentId)
    },
    index() {
      return $app.elems.getIndex(this.elem)
    },




    minWidth() {
      if (this.elem.container && this.elem.children.length === 0)
        return '165px'

      if (this.elem.container)
        return '41px'

      return '21px'
    },




    selfWidth() {
      if (this.elem.parentId != null)
        return 'auto'
      else if (this.elem[this.sizeProp].x === 'expanded')
        return this.elem.expandedSize.x
      else
        return this.elem[this.sizeProp].x
    },
    selfTargetWidth() {
      if (this.targetWidth != null)
        return this.targetWidth

      if (this.selfWidth === 'auto')
        return 'auto'
      else
        return '0'
    },

  },




  methods: {

    getSectionHeight(section) {
      if (this.elem.collapsed
      && this.elem.collapsedSize.y[section] === 'auto'
      && this.topSection === section) {
        if (this.numSections === 1)
          return '0'
        else
          return this.elem.expandedSize.y[section]
      } else
        return this.elem[this.sizeProp].y[section]
    },




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
      && !event.ctrlKey
      && !event.altKey
      && !event.shiftKey
      && !this.selected)
        return

      $app.clickSelection.perform(this.elem, event)

      if ($app.selection.has(this.elem)
      && !$getters.editing)
        $app.dragging.start(event, this.elem)
    },




    onClick(event) {
      if (this.elem.linkedPageId == null
      || event.ctrlKey || event.shiftKey || this.selected)
        return

      $app.pages.navigate(this.elem.linkedPageId)
    },




    onEditorPointerDown(event, section) {
      if (this.editing) {
        event.stopPropagation()

        setTimeout(() => {
          this.$refs[`${section}-editor`].quill.focus()
        })
      }
    },




    // Drop zones
    
    onDropZonePointerEnter(event, offset) {
      if (!$state.dragging.active)
        return

      $state.dragging.dropRegionId = this.parentElem.id
      $state.dragging.dropIndex = this.index + offset
    },
    onDropZonePointerLeave(event, offset) {
      if (!$state.dragging.active)
        return
      
      $state.dragging.dropRegionId = null
      $state.dragging.dropIndex = null
    },

    onDropZonePointerUp(event, offset) {
      const dropIndex = this.index + offset

      $app.dropping.perform(event, this.parentElem, dropIndex)
    },



    
    // Container drop zones
    
    onContainerDropZonePointerEnter(event) {
      if (!$state.dragging.active)
        return

      $state.dragging.dropRegionId = this.elem.id
      $state.dragging.dropIndex = this.elem.children.length
    },
    onContainerDropZonePointerLeave(event) {
      if (!$state.dragging.active)
        return
      
      $state.dragging.dropRegionId = null
      $state.dragging.dropIndex = null
    },

    onContainerDropZonePointerUp(event) {
      if ($state.dragging.active
      && !$app.selection.has(this.elem)) {
        event.stopPropagation()

        $app.dropping.perform(event, this.elem)
      }
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

  z-index: 1000;
}
.drop-zone.active {
  opacity: 0.25;
}
</style>