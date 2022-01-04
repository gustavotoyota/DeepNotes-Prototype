<template>

  <Block :elem="elem"
  :root-width="rootWidth"
  @body-pointerdown="onBodyPointerDown"
  @body-dblclick="onBodyDoubleClick">

    <SmartEditor ref="editor-1"
    :id="`elem-${elem.id}-editor-1`"
    v-model="elem.body"
    :disabled="!editing || elem.readOnly"
    :wrap="elem.wrapText"/>

  </Block>
  
</template>

<script>
export default {
  
  props: {
    elem: { type: Object },

    rootWidth: { },
  },



  methods: {

    onClick(event) {
      if (this.elem.linkedPageId == null
      || event.altKey || this.selected)
        return

      $app.pages.navigate(this.elem.linkedPageId)
    },



    onBodyPointerDown(event) {
      if (!event.target.className.toString().startsWith(`editor-1`))
        return

      if (event.button === 0 && this.editing
      && !event.target.isContentEditable) {
        this.$refs[`editor-1`].quill.focus()
        event.preventDefault()
      }
    },
    onBodyDoubleClick(event) {
      if (event.button === 0)
        $app.editing.start(this.elem, 1)
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

  },

}
</script>

<style>
</style>