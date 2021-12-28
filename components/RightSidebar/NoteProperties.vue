<template>

  <div v-if="!!elem && elem.type === 'note'"
  style="height: 100%"
  class="d-flex flex-column">

    <v-toolbar dense style="flex: none">

      <v-toolbar-title>
        <span style="position: relative; top: 2px">Note Properties</span>
      </v-toolbar-title>

    </v-toolbar>

    
    <div style="flex: 1; overflow-y: auto" class="pb-4">
      
      <div class="mx-5 mt-5">
        <div class="body-2 grey--text text--lighten-1"
        style="margin-left: 1px">
          Linked page:
        </div>

        <Gap height="2px"/>

        <v-select dense outlined hide-details
        background-color="#181818" clearable
        :items="recentPages" item-text="text" item-value="value"
        :menu-props="{ top: false, offsetY: true }"
        v-model="elem.linkedPageId">
        </v-select>

        <Gap height="10px"/>
        
        
        <NewPageDialog :elem="elem"/>
      </div>

      <v-divider class="mt-6"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Has title"
        style="flex: 1; margin-top: 0; padding-top: 0"
        v-model="elem.hasTitle">
        </v-checkbox>
      </div>

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4" style="display: flex">
        <div>
          <div class="body-2 grey--text text--lighten-1"
          style="margin-left: 1px">
            X anchor:
          </div>

          <Gap height="2px"/>

          <v-select dense outlined hide-details
          background-color="#181818"
          :items="[
            { text: 'Left', value: 0 },
            { text: 'Center', value: 0.5 },
            { text: 'Right', value: 1 },
          ]" item-text="text" item-value="value"
          :menu-props="{ top: false, offsetY: true }"
          v-model="elem.anchor.x">
          </v-select>
        </div>

        <Gap width="16px" style="flex: none"/>

        <div>
          <div class="body-2 grey--text text--lighten-1"
          style="margin-left: 1px">
            Y anchor:
          </div>

          <Gap height="2px"/>

          <v-select dense outlined hide-details
          background-color="#181818"
          :items="[
            { text: 'Top', value: 0 },
            { text: 'Center', value: 0.5 },
            { text: 'Bottom', value: 1 },
          ]" item-text="text" item-value="value"
          :menu-props="{ top: false, offsetY: true }"
          v-model="elem.anchor.y">
          </v-select>
        </div>
      </div>

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Collapsible"
        style="flex: 1; margin-top: 0; padding-top: 0"
        v-model="elem.collapsible">
        </v-checkbox>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Collapsed"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :disabled="!elem.collapsible"
        v-model="elem.collapsed">
        </v-checkbox>
      </div>

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details
        label="Auto width"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="elem[sizeProp].x == null"
        @change="onAutoWidthChange">
        </v-checkbox>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details
        label="Auto height"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="elem[sizeProp].y == null"
        @change="onAutoHeightChange">
        </v-checkbox>
      </div>

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Movable"
        style="flex: 1; margin-top: 0; padding-top: 0"
        v-model="elem.movable">
        </v-checkbox>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Resizable"
        style="flex: 1; margin-top: 0; padding-top: 0"
        v-model="elem.resizable">
        </v-checkbox>
      </div>

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Wrap text"
        style="flex: 1; margin-top: 0; padding-top: 0"
        v-model="elem.wrapText">
        </v-checkbox>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Read-only"
        style="flex: 1; margin-top: 0; padding-top: 0"
        v-model="elem.readOnly">
        </v-checkbox>
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

    sizeProp() {
      return this.elem.collapsed ? 'collapsedSize' : 'size'
    },

    recentPages() {
      const recentPages = []

      for (let i = $state.project.pages.recent.length - 1; i >= 0; --i) {
        const recentPageId = $state.project.pages.recent[i]

        if (recentPageId == $getters.currentPage.id)
          continue

        const recentPage = $app.pages.getById(recentPageId)

        recentPages.push({ text: recentPage.name, value: recentPageId })
      }

      return recentPages
    },

  },



  methods: {

    onAutoWidthChange(value) {
      if (value)
        this.elem[this.sizeProp].x = null
      else {
        const clientRect = $app.elems.getClientRect(this.elem)

        this.elem[this.sizeProp].x = $app.sizes.screenToWorld1D(clientRect.width)
      }
    },
    onAutoHeightChange(value) {
      if (value)
        this.elem[this.sizeProp].y = null
      else {
        const clientRect = $app.elems.getClientRect(this.elem)

        this.elem[this.sizeProp].y = $app.sizes.screenToWorld1D(clientRect.height)
      }
    },

  },



  watch: {

    'elem.collapsible'(value) {
      if (value != null && !value)
        this.elem.collapsed = false
    },

  },

}
</script>

<style>

</style>