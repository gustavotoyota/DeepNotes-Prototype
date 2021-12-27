<template>

  <v-navigation-drawer
  app width="300" right
  permanent clipped touchless>

    <div style="height: 100%"
    class="d-flex flex-column">

      <v-toolbar dense style="flex: none">

        <v-toolbar-title>
          <span style="position: relative; top: 2px">Properties</span>
        </v-toolbar-title>

      </v-toolbar>

      
      <div style="flex: 1; overflow-y: auto">
        
        <div v-if="!!activeElem" class="mb-5">
          
          <div class="mx-5"
          style="display: flex">
            <v-checkbox hide-details label="Has title"
            style="flex: 1"
            v-model="activeElem.hasTitle">
            </v-checkbox>
            
            <v-checkbox hide-details label="Collapsible"
            style="flex: 1"
            v-model="activeElem.collapsible">
            </v-checkbox>
          </div>

          <v-divider class="mt-4"/>
            
          <div class="mx-5"
          style="display: flex">
            <v-checkbox hide-details label="Movable"
            style="flex: 1"
            v-model="activeElem.movable">
            </v-checkbox>
            
            <v-checkbox hide-details label="Resizable"
            style="flex: 1"
            v-model="activeElem.resizable">
            </v-checkbox>
          </div>

          <v-divider class="mt-4"/>
            
          <div class="mx-5"
          style="display: flex">
            <v-checkbox hide-details
            label="Auto width" style="flex: 1"
            :input-value="activeElem.size.x == null"
            @change="onAutoWidthChange">
            </v-checkbox>
            
            <v-checkbox hide-details
            label="Auto height" style="flex: 1"
            :input-value="activeElem.size.y == null"
            @change="onAutoHeightChange">
            </v-checkbox>
          </div>

          <v-divider class="mt-4"/>
            
          <div class="mx-5"
          style="display: flex">
            <v-checkbox hide-details label="Wrap text"
            style="flex: 1"
            v-model="activeElem.wrapText">
            </v-checkbox>
            
            <v-checkbox hide-details label="Read-only"
            style="flex: 1"
            v-model="activeElem.readOnly">
            </v-checkbox>
          </div>

        </div>

      </div>

    </div>

  </v-navigation-drawer>

</template>

<script>
export default {

  computed: {

    activeElem() {
      return $getters.activeElem
    },

  },



  methods: {

    onAutoWidthChange(value) {
      if (value)
        this.activeElem.size.x = null
      else {
        const clientRect = $app.elems.getClientRect(this.activeElem)

        this.activeElem.size.x = clientRect.width / $getters.currentPage.camera.zoom
      }
    },
    onAutoHeightChange(value) {
      if (value)
        this.activeElem.size.y = null
      else {
        const clientRect = $app.elems.getClientRect(this.activeElem)

        this.activeElem.size.y = clientRect.height / $getters.currentPage.camera.zoom
      }
    },

  },

}
</script>

<style>
</style>