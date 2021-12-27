<template>

  <v-menu v-model="$state.popup.visible" absolute
  :position-x="$state.popup.pos.x"
  :position-y="$state.popup.pos.y">

    <v-list dense>
      
      <v-list-item @click="$app.creation.perform($state.popup.pos)">
        <v-list-item-title>Note</v-list-item-title>
      </v-list-item>

      <v-list-item @click.prevent="">
        <v-list-item-title>Container</v-list-item-title>
      </v-list-item>

    </v-list>

  </v-menu>
  
</template>

<script>
export default {

}
</script>

<style scoped>

</style>