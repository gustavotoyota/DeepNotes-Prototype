<template>

  <v-navigation-drawer
  app width="300"
  permanent clipped touchless>
    
    <div style="height: 100%"
    class="d-flex flex-column">

      <v-toolbar dense style="flex: none">

        <v-toolbar-title>
          <span style="position: relative; top: 2px">Page Path</span>
        </v-toolbar-title>

      </v-toolbar>

      
      <v-list dense style="flex: 1; overflow-y: auto">
        
        <v-list-item @click.prevent=""
        v-for="pageId of $state.project.pages.path" :key="pageId">

          <v-list-item-title class="body-2"
          style="word-break: break-all; white-space: normal">
            {{ $state.project.pages.list.find((page) => page.id == pageId).name }}
          </v-list-item-title>

        </v-list-item>

      </v-list>

    </div>

  </v-navigation-drawer>

</template>

<script>
export default {

}
</script>

<style scoped>

</style>