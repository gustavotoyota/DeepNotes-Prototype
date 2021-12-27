<template>

  <v-app dark v-if="!!$state.project" spellcheck="false">
    
    <MainMenu/>
    <LeftSidebar/>
    <MainContent/>
    <RightSidebar/>
    
    <ElemCreationPopup/>

  </v-app>

</template>

<script>
export default {
}
</script>

<style>
* {
  user-select: none;
}


html, body, #__nuxt, #__layout {
  height: 100%;
}

  
html {
  /* Hide scrollbar */
  overflow-y: hidden;

  /* Disable pull-to-refresh */
  overscroll-behavior-y: none;

  /* Enable smooth scrolling */
  scroll-behavior: smooth;
}
  
body {
  margin: 0;
}




/* List padding */

.v-menu__content .v-list {
  padding: 0 !important
}




/* Scrollbars */

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  background: #202020;
}

::-webkit-scrollbar-thumb {
  background: #303030;
  border: solid 1px #404040;
}

::-webkit-scrollbar-thumb:hover {
  background: #404040;
}




/* Remove link underline */

a {
  text-decoration: none !important;
}
</style>