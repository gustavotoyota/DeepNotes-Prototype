<template>

  <Block :elem="elem"
  min-width="22px"
  :inherited-width="inheritedWidth"
  @body-pointerdown="onBodyPointerDown"
  @body-dblclick="$app.editing.start(elem, 1)">

    <SmartEditor ref="editor-1"
    :id="`elem-${elem.id}-editor-1`"
    v-model="elem.body"
    :disabled="!editing || elem.readOnly"
    :wrap="elem.wrapBody"/>

  </Block>
  
</template>

<script>
export default {
  
  props: {
    elem: { type: Object },

    inheritedWidth: { },
  },



  methods: {

    onClick(event) {
      if (this.elem.linkedPageId == null
      || event.altKey || this.selected)
        return

      $app.pages.navigate(this.elem.linkedPageId)
    },



    onBodyPointerDown(event) {
      if (this.editing) {
        event.stopPropagation()

        setTimeout(() => {
          this.$refs[`editor-1`].quill.focus()
        })
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

  },

}
</script>

<style>
</style>