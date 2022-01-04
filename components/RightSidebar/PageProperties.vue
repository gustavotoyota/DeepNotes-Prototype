<template>

  <div v-if="!$getters.elem"
  style="height: 100%"
  class="d-flex flex-column">

    <v-toolbar dense style="flex: none">

      <v-toolbar-title>
        <span style="position: relative; top: 2px">Page Properties</span>
      </v-toolbar-title>

    </v-toolbar>


    
    <div style="flex: 1; overflow-y: auto" class="pb-5">
      
      <div class="mx-5 mt-5">
        <div class="body-2 grey--text text--lighten-1">
          Name:
        </div>

        <v-text-field dense solo hide-details style="clear: right"
        class="mt-1 body-2" v-model="$getters.page.name">
        </v-text-field>
      </div>

    </div>

  </div>

</template>

<script>
export default {

}
</script>

<style>

</style>