<template>

  <div :id="`elem-${elem.id}-frame`"
  :style="`position: ${elem.parentId == null ? 'absolute' : 'relative'}; ` +
  `min-width: ${minWidth}; ` +
  `width: ${selfWidth}; ` +
  (elem.parentId == null ? `transform: translate(${-elem.anchor.x * 100}%, ${-elem.anchor.y * 100}%); ` : '') +
  (dragging ? `opacity: 0.7; pointer-events: none` : ``)">

    <slot/>

  </div>
  
</template>

<script>
export default {

  props: {
    elem: { type: Object },

    minWidth: { type: String },
    selfWidth: { type: String },
    dragging: { type: Boolean },
  },

}
</script>

<style>

</style>