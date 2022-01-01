<template>

  <div v-if="disabled"
  v-html="value.replaceAll('&nbsp; ', '&nbsp;')"
  class="quill-editor ql-bubble ql-container ql-editor facade"/>

  <Editor v-else
  ref="editor"
  v-on="$listeners" v-bind="$attrs"
  :disabled="disabled"
  v-model="model"
  @ready="onEditorReady"/>

</template>

<script>
export default {

  props: {
    value: { type: String },
    disabled: { type: Boolean },
  },



  methods: {

    onEditorReady(quill) {
      this.quill = quill
    },

  },



  computed: {

    model: {
      get() { return this.value },
      set(value) { this.$emit('input', value) },
    },

  },

}
</script>



<style scoped>
.facade:empty::after {
  content: '\200B';
  visibility: hidden;
}

.quill-editor {
  min-width: 1px;

  white-space: inherit;
  
  height: 100%;
}

.quill-editor /deep/ ul {
  padding-left: 0 !important;
}

.quill-editor /deep/ li {
  padding-left: 1em !important;
}
.quill-editor /deep/ .ql-indent-1 {
  padding-left: 2em !important;
}
.quill-editor /deep/ .ql-indent-2 {
  padding-left: 3em !important;
}
.quill-editor /deep/ .ql-indent-3 {
  padding-left: 4em !important;
}



/* Remove link before */

.quill-editor /deep/ a::before {
  display: none;
}
.quill-editor /deep/ a::after {
  display: none;
}
</style>



<style>
.ql-container {
  white-space: inherit;
}

.ql-editor {
  padding: 0 !important;

  min-width: 100%;
  max-width: 100%;

  width: max-content;
  
  white-space: inherit !important;
}

.ql-editor * {
  cursor: inherit !important;
}

.ql-tooltip {
  z-index: 9999;

  background-color: #303030 !important;
  border-radius: 12px !important;
}

.ql-toolbar {
  display: flex;

  flex-direction: column;
}

.ql-formats {
  margin: 8px !important;
}
.ql-formats:not(:first-child) {
  margin-top: 0 !important;
}
</style>