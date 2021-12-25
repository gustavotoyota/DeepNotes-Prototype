<template>

  <div :style="`position: absolute; width: 0; height: 0;
  left: ${elem.pos.x}px; top: ${elem.pos.y}px`">

    <div :id="`elem-${elem.id}`"
    :style="`position: absolute;
    border: 1px solid ${ isSelected ? 'blue' : 'white' };
    background-color: #404040;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 7px 9px`"
    @pointerdown="onPointerDown">

      <quill-editor
      v-model="elem.content"
      :options="editorOptions"/>

    </div>

  </div>
    
</template>

<script>
export default {

  props: {
    elem: { type: Object },
  },


  created() {
    this.editorOptions = {
      theme: 'bubble',

      placeholder: '',

      modules: {
        imageDrop: true,
        imageResize: {
          modules: ['DisplaySize', 'Resize'],
        },
      },
    }
  },


  methods: {

    onPointerDown(event) {
      $app.clickSelection.perform(this.elem, event)

      if ($app.elems.isSelected(this.elem))
        $app.dragging.start(event)
    },

  },



  computed: {

    isSelected() {
      return $app.elems.isSelected(this.elem)
    },

  },


}
</script>

<style>
.ql-editor {
  padding: 0 !important;

  min-width: 15px;
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