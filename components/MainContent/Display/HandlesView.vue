<template>

  <div style="position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  pointer-events: none"
  :style="($state.dragging.active ? `pointer-events: none; opacity: 0.7` : ``)">
    <Handles v-for="elem of $app.selection.getElems()" :key="elem.id"
    :elem="elem"/>
  </div>
  
</template>

<script>
export default {

}
</script>

<style>

</style>