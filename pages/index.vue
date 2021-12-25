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
</style>