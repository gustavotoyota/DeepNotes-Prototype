<template>

  <div v-if="elem[`has${capitalizedSection}`]"
  :id="`elem-${elem.id}-${section}`"
  style="display: flex /* Horizontal flex */;
  min-height: 36.453px"
  :style="`height: ${getSectionHeight(section)}`">

    <!-- Section content -->

    <div style="flex: 1 /* Section content is horizontally flexible */;
    padding: 9px;
    overflow: auto"
    :style="`width: ${selfTargetWidth} /* Auto or 0 (custom) */`"
    @pointerdown.left="onContentPointerDown"
    @dblclick.left="$app.editing.start(elem, section)">

      <SmartEditor ref="editor"
      :id="`elem-${elem.id}-${section}-editor`"
      v-model="elem[section]"
      :disabled="!editing || elem.readOnly"
      :wrap="elem[`wrap${capitalizedSection}`]"/>

    </div>




    <!-- Section collapse button -->

    <BlockCollapseButton :elem="elem" :section="section"/>

  </div>
  
</template>

<script>
export default {

  props: {
    elem: { type: Object },
    
    section: { type: String },
    getSectionHeight: { type: Function },
    
    selfTargetWidth: { type: String },
    editing: { type: Boolean },
  },




  computed: {

    capitalizedSection() {
      return $utils.capitalizeFirst(this.section)
    },

  },




  methods: {
    
    onContentPointerDown(event) {
      if (this.editing) {
        event.stopPropagation()

        setTimeout(() => {
          this.$refs[`editor`].quill.focus()
        })
      }
    },

  },

}
</script>

<style>

</style>