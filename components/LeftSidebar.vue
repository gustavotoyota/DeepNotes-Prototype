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
        
        <v-list-item
        v-for="(pageId, idx) of $state.project.pages.path" :key="pageId"
        @click="onPageClick(idx)"
        :input-value="idx === $state.project.pages.depth">

          <v-list-item-title class="body-2"
          style="word-break: break-all; white-space: normal">
            {{ $app.pages.getById(pageId).name }}
          </v-list-item-title>

        </v-list-item>

      </v-list>

    </div>

  </v-navigation-drawer>

</template>

<script>
export default {

  methods: {

    onPageClick(idx) {
      $state.project.pages.depth = idx
    },

  },

}
</script>

<style scoped>

</style>