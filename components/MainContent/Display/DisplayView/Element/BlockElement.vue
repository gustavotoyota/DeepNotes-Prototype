<template>

  <!-- Anchor -->

  <BlockAnchor :elem="elem">

    <!-- Frame -->

    <BlockFrame :elem="elem" :min-width="minWidth"
    :self-width="selfWidth" :dragging="dragging">

      <!-- Element drop helpers -->

      <BlockDropHelpers :elem="elem"
      :parent-elem="parentElem" :index="index"/>




      <!-- Handles -->

      <BlockHandles :elem="elem" :selected="selected"
      :top-section="topSection" :bottom-section="bottomSection"/>



      
      <!-- Background -->

      <BlockBackground :elem="elem"
      :selected="selected" :color="color">

        <!-- Title -->

        <BlockTextSection :elem="elem"
        section="title"
        :get-section-height="getSectionHeight"
        :self-target-width="selfTargetWidth"
        :editing="editing"
        :size-prop="sizeProp"/>




        <div v-if="!(elem.collapsed && topSection === 'title' && elem.collapsedSize.x === 'auto')"
        :style="`height: ${topSection === 'title' && elem.collapsed ? '0' : 'unset'}`">

          <!-- Divider -->

          <div v-if="elem.hasTitle && elem.hasBody"
          style="position: relative">

            <v-divider/>

            <BlockHandle v-if="selected"
            :elem="elem" side="s" section="title"/>

          </div>



          
          <!-- Body -->

          <BlockTextSection :elem="elem"
          section="body"
          :get-section-height="getSectionHeight"
          :self-target-width="selfTargetWidth"
          :editing="editing"
          :size-prop="sizeProp"/>




          <div v-if="elem.container
          && !(elem.collapsed && topSection === 'body' && elem.collapsedSize.x === 'auto')"
          :style="`height: ${topSection === 'body' && elem.collapsed ? '0' : 'unset'}`">

            <!-- Divider -->
            
            <div v-if="elem.hasTitle || elem.hasBody"
            style="position: relative">
            
              <v-divider/>

              <BlockHandle v-if="selected"
              :elem="elem" side="s" :section="elem.hasBody ? 'body' : 'title'"/>

            </div>



            
            <!-- Container -->

            <BlockContainerSection :elem="elem"
            :get-section-height="getSectionHeight"
            :self-target-width="selfTargetWidth"/>

          </div>

        </div>

      </BlockBackground>

    </BlockFrame>

  </BlockAnchor>

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
      } else if (this.elem[this.sizeProp].y[section] === 'auto')
        return this.elem.expandedSize.y[section]
      else
        return this.elem[this.sizeProp].y[section]
    },




    onEditorPointerDown(event, section) {
      if (this.editing) {
        event.stopPropagation()

        setTimeout(() => {
          this.$refs[`${section}-editor`].quill.focus()
        })
      }
    },

  },

}
</script>

<style scoped>
</style>