<template>

  <div v-if="!!elem && elem.type === 'note'"
  style="height: 100%"
  class="d-flex flex-column">

    <v-toolbar dense style="flex: none">

      <v-toolbar-title>
        <span style="position: relative; top: 2px">Note Properties</span>
      </v-toolbar-title>

    </v-toolbar>

    
    <div style="flex: 1; overflow-y: auto">

      <div class="mb-5">
        
        <div class="mx-5"
        style="display: flex">
          <v-checkbox hide-details label="Has title"
          style="flex: 1"
          v-model="elem.hasTitle">
          </v-checkbox>
          
          <v-checkbox hide-details label="Collapsible"
          style="flex: 1"
          v-model="elem.collapsible">
          </v-checkbox>
        </div>

        <v-divider class="mt-4"/>
          
        <div class="mx-5"
        style="display: flex">
          <v-checkbox hide-details label="Movable"
          style="flex: 1"
          v-model="elem.movable">
          </v-checkbox>
          
          <v-checkbox hide-details label="Resizable"
          style="flex: 1"
          v-model="elem.resizable">
          </v-checkbox>
        </div>

        <v-divider class="mt-4"/>
          
        <div class="mx-5"
        style="display: flex">
          <v-checkbox hide-details
          label="Auto width" style="flex: 1"
          :input-value="elem.size.x == null"
          @change="onAutoWidthChange">
          </v-checkbox>
          
          <v-checkbox hide-details
          label="Auto height" style="flex: 1"
          :input-value="elem.size.y == null"
          @change="onAutoHeightChange">
          </v-checkbox>
        </div>

        <v-divider class="mt-4"/>
          
        <div class="mx-5"
        style="display: flex">
          <v-checkbox hide-details label="Wrap text"
          style="flex: 1"
          v-model="elem.wrapText">
          </v-checkbox>
          
          <v-checkbox hide-details label="Read-only"
          style="flex: 1"
          v-model="elem.readOnly">
          </v-checkbox>
        </div>

      </div>

    </div>

  </div>
  
</template>

<script>
export default {

  computed: {

    elem() {
      return $getters.activeElem
    },

  },



  methods: {

    onAutoWidthChange(value) {
      if (value)
        this.elem.size.x = null
      else {
        const clientRect = $app.elems.getClientRect(this.elem)

        this.elem.size.x = clientRect.width / $getters.currentPage.camera.zoom
      }
    },
    onAutoHeightChange(value) {
      if (value)
        this.elem.size.y = null
      else {
        const clientRect = $app.elems.getClientRect(this.elem)

        this.elem.size.y = clientRect.height / $getters.currentPage.camera.zoom
      }
    },

  },

}
</script>

<style>

</style>