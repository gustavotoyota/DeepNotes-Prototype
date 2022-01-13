<template>

  <div v-if="disabled"
  class="quill-editor"
  :class="{ wrap: wrap, nowrap: !wrap }">
    <div class="ql-container ql-bubble">
      <div class="ql-editor facade"
      v-html="value">
      </div>
    </div>
  </div>

  <Editor v-else
  ref="editor"
  v-on="$listeners" v-bind="$attrs"
  :class="{ wrap: wrap, nowrap: !wrap }"
  v-model="model"
  @ready="onEditorReady"/>

</template>

<script>
export default {

  props: {
    value: { type: String },
    disabled: { type: Boolean },
    wrap: { type: Boolean },
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
  
  height: 100%;
}

.quill-editor /deep/ .ql-editor {
  padding: 0;

  min-width: 100%;
  max-width: 100%;

  width: max-content;
  height: max-content;
}

.quill-editor.wrap /deep/ .ql-editor {
  white-space: normal;
}
.quill-editor.nowrap /deep/ .ql-editor {
  white-space: nowrap;
}

.quill-editor /deep/ .ql-editor * {
  cursor: inherit;
}




/* Code blocks */

.quill-editor /deep/ pre.ql-syntax {
  min-width: 100%;
  width: fit-content;
}

.quill-editor.nowrap /deep/ pre.ql-syntax {
  white-space: pre-wrap;
}
.quill-editor.nowrap /deep/ pre.ql-syntax {
  white-space: pre;
}

.quill-editor /deep/ pre.ql-syntax:empty {
  display: none;
}




/* Lists */

.quill-editor /deep/ ul {
  padding-left: 0 !important;
}
.quill-editor /deep/ li {
  padding-left: 1em !important;
}
.quill-editor /deep/ li.ql-indent-1 {
  padding-left: 2em !important;
}
.quill-editor /deep/ li.ql-indent-2 {
  padding-left: 3em !important;
}
.quill-editor /deep/ li.ql-indent-3 {
  padding-left: 4em !important;
}
.quill-editor /deep/ li.ql-indent-4 {
  padding-left: 5em !important;
}
.quill-editor /deep/ li.ql-indent-5 {
  padding-left: 6em !important;
}
.quill-editor /deep/ li.ql-indent-6 {
  padding-left: 7em !important;
}
.quill-editor /deep/ li.ql-indent-7 {
  padding-left: 8em !important;
}
.quill-editor /deep/ li.ql-indent-8 {
  padding-left: 9em !important;
}
.quill-editor /deep/ li.ql-indent-9 {
  padding-left: 10em !important;
}




/* Indentation */

.quill-editor /deep/ p.ql-indent-1 {
  padding-left: 1em !important;
}
.quill-editor /deep/ p.ql-indent-2 {
  padding-left: 2em !important;
}
.quill-editor /deep/ p.ql-indent-3 {
  padding-left: 3em !important;
}
.quill-editor /deep/ p.ql-indent-4 {
  padding-left: 4em !important;
}
.quill-editor /deep/ p.ql-indent-5 {
  padding-left: 5em !important;
}
.quill-editor /deep/ p.ql-indent-6 {
  padding-left: 6em !important;
}
.quill-editor /deep/ p.ql-indent-7 {
  padding-left: 7em !important;
}
.quill-editor /deep/ p.ql-indent-8 {
  padding-left: 8em !important;
}
.quill-editor /deep/ p.ql-indent-9 {
  padding-left: 9em !important;
}





/* Anchor links */

.quill-editor /deep/ a::before {
  display: none;
}
.quill-editor /deep/ a::after {
  display: none;
}
</style>



<style>
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