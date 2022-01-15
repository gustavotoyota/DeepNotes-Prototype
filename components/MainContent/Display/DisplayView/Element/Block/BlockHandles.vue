<template>

  <div v-if="selected && elem.resizable"
  style="position: absolute; pointer-events: none;
  left: 0; right: 0; top: 0; bottom: 0">

    <div v-if="elem.parentId == null">
      <BlockHandle :elem="elem" side="nw" :section="topSection"/>
      <BlockHandle :elem="elem" side="n" :section="topSection"/>
      <BlockHandle :elem="elem" side="ne" :section="topSection"/>
      
      <BlockHandle :elem="elem" side="w"/>
      <BlockHandle :elem="elem" side="e"/>

      <BlockHandle :elem="elem" side="sw" :section="bottomSection"/>
      <BlockHandle :elem="elem" side="se" :section="bottomSection"/>
    </div>

    <BlockHandle :elem="elem" side="s" :section="bottomSection"/>
    
  </div>
  
</template>

<script>
export default {

  props: {
    elem: { type: Object },
    
    selected: { type: Boolean },

    topSection: { type: String },
    bottomSection: { type: String },
  },

}
</script>

<style scoped>
</style>