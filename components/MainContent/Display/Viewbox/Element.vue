<template>

  <Note v-if="this.elem.type === 'note'" :elem="elem"/>
  <Container v-else-if="this.elem.type === 'container'" :elem="elem"/>
  <Arrow v-else-if="this.elem.type === 'arrow'" :elem="elem"/>
    
</template>

<script>
export default {

  props: {
    elem: { type: Object },
  },

}
</script>

<style>
.ql-editor {
  padding: 0 !important;

  min-width: 1px;
  width: max-content;
}

.ql-tooltip {
  width: max-content;
}

ul {
  padding-left: 0 !important;
}

li {
  padding-left: 1em !important;
}
.ql-indent-1 {
  padding-left: 2em !important;
}
.ql-indent-2 {
  padding-left: 3em !important;
}
.ql-indent-3 {
  padding-left: 4em !important;
}
</style>