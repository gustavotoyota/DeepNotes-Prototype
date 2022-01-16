<template>

  <quill-editor ref="editor"
  v-on="$listeners" v-bind="$attrs"
  :options="editorOptions"
  v-model="model"
  @ready="onReady"
  @blur="onBlur"/>

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
        syntax: true,

        keyboard: {
          bindings: {
            'indent code-block': null,
            'outdent code-block': null,
          },
        },

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

    onReady(quill) {
      this.quill = quill

      quill.history.clear()

      this.$emit('ready', quill)
    },



    onBlur(quill) {
      quill.theme.tooltip.hide()
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