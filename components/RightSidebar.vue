<template>

  <v-navigation-drawer
  app width="300" right
  permanent clipped touchless>
        
    <PageProperties/>
    <NoteProperties/>
    <ContainerProperties/>

  </v-navigation-drawer>

</template>

<script>
export default {

  computed: {

    elem() {
      return $getters.activeElem
    },

  },

}
</script>

<style scoped>
</style>