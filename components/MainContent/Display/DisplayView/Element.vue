<template>

  <Note v-if="elem.type === 'note'"
  :elem="elem" :inherited-width="inheritedWidth"/>
  
  <Arrow v-else-if="elem.type === 'arrow'"
  :elem="elem" :inherited-width="inheritedWidth"/>
    
</template>

<script>
export default {

  props: {
    elem: { type: Object },
    
    inheritedWidth: { },
  },

}
</script>

<style scoped>
</style>