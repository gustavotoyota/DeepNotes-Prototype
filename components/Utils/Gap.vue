<template>
  <div :style="{
    'width': width,
    'height': height,
    'display': inline ? 'inline-block' : null
  }">
  </div>
</template>

<script>
export default {

  props: {
    width: { type: String },
    height: { type: String },
    inline: { type: Boolean },
  },

}
</script>

<style>

</style>