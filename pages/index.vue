<template>

  <v-app dark v-if="!!$state.project">
    
    <v-app-bar app clipped-left clipped-right dense>
      
      <v-app-bar-title style="flex: none">
        <div>DeepNotes</div>
      </v-app-bar-title>
      
    </v-app-bar>
    
    <v-navigation-drawer
    app width="300"
    permanent clipped touchless>
    </v-navigation-drawer>
    
    <v-main>

      <Display/>

    </v-main>
    
    <v-navigation-drawer
    app width="300" right
    permanent clipped touchless>
    </v-navigation-drawer>

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
        <v-list-item @click.prevent="">
          <v-list-item-title>Arrow</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app>

</template>

<script>
export default {
}
</script>

<style>
  html, body, #__nuxt, #__layout {
    height: 100%;
  }
  
  body {
    margin: 0;
  }

  * {
    user-select: none;
  }

  .v-list {
    padding: 0;
  }
</style>