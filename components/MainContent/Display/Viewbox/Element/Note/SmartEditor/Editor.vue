<template>

  <quill-editor ref="editor"
  v-on="$listeners" v-bind="$attrs"
  :options="editorOptions"
  v-model="model"
  @ready="onEditorReady"/>

</template>

<script>
export default {

  props: {
    value: { type: String },
  },



  created() {
    this.editorOptions = {
      theme: 'bubble',

      placeholder: '',

      modules: {
        toolbar: [
          [
            'bold',
            'italic',
            'underline',
            'strike',
            { 'header': 1 },
            { 'header': 2 },
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
          ],
          [
            { 'indent': '-1' },
            { 'indent': '+1' },
            { 'script': 'sub' },
            { 'script': 'super' },
            'blockquote',
            'code-block',
            'link',
            'image',
            'formula',
            'clean',
          ],
        ],
        
        imageDrop: true,
        imageResize: {
          modules: ['DisplaySize', 'Resize'],
        },
      },
    }
  },

  beforeDestroy() {
    document.body.removeChild(this.quill.theme.tooltip.root.parentNode)
  },



  methods: {

    onEditorReady(quill) {
      this.quill = quill

      this.$emit('ready', quill)
    },

  },



  computed: {

    model: {
      get() {
        if (this.quill)
          return this.value
        else
          return this.value.replaceAll('&nbsp; ', '&nbsp;&nbsp;')
      },
      set(value) { this.$emit('input', value) },
    },

  },

}
</script>