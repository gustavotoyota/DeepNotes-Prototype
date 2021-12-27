<template>
  <div :style="{
    width, height,
    display: inline ? 'inline-block' : ''
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