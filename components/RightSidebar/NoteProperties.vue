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
        <v-checkbox hide-details label="Has body"
        style="flex: 1; margin-top: 0; padding-top: 0"
        v-model="elem.hasBody">
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
        v-model="collapsible">
        </v-checkbox>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Collapsed"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :disabled="!elem.collapsible"
        v-model="collapsed">
        </v-checkbox>
      </div>
        
      <div class="mx-5 mt-4" style="display: flex">
        <div style="flex: 1; width: 0">
          <div class="body-2 grey--text text--lighten-1"
          style="margin-left: 1px">
            Width:
          </div>

          <Gap height="2px"/>

          <v-select dense outlined hide-details
          background-color="#181818"
          :items="[
            { text: 'Auto', value: 'auto' },
            ...(elem.collapsed ? [{ text: 'Expanded', value: 'expanded' }] : []),
            { text: 'Custom', value: 'custom' },
          ]" item-text="text" item-value="value"
          :menu-props="{ top: false, offsetY: true }"
          v-model="width">
          </v-select>
        </div>

        <Gap width="16px" style="flex: none"/>

        <div style="flex: 1">
          <div class="body-2 grey--text text--lighten-1"
          style="margin-left: 1px">
            Height:
          </div>

          <Gap height="2px"/>

          <v-select dense outlined hide-details
          background-color="#181818"
          :items="[
            { text: 'Auto', value: 'auto' },
            { text: 'Custom', value: 'custom' },
          ]" item-text="text" item-value="value"
          :menu-props="{ top: false, offsetY: true }"
          v-model="height">
          </v-select>
        </div>
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

    page() {
      return $getters.currentPage
    },
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





    // Properties
    
    linkedPageId: {
      get() { return this.elem.linkedPageId },
      set(value) {
        for (const elem of $app.selection.getElems())
          elem.linkedPageId = value
      },
    },

    collapsible: {
      get() {
        return this.elem.collapsible
      },
      set(value) {
        this.elem.collapsible = value

        if (!value)
          this.elem.collapsed = false
      },
    },
    collapsed: {
      get() {
        return this.elem.collapsed
      },
      set(value) {
        if (value) {
          const clientRect = $app.elems.getClientRect(this.elem.id)

          this.elem.expandedWidth = $app.sizes.screenToWorld1D(clientRect.width)
        }

        this.elem.collapsed = value
      },
    },




    width: {
      get() {
        if (!isNaN(this.elem[this.sizeProp].x))
          return 'custom'
        else
          return this.elem[this.sizeProp].x
      },
      set(value) {
        if (value === 'custom') {
          const clientRect = $app.elems.getClientRect(this.elem.id)

          this.elem[this.sizeProp].x = $app.sizes.screenToWorld1D(clientRect.width)
        } else
          this.elem[this.sizeProp].x = value
      },
    },
    height: {
      get() {
        if (!isNaN(this.elem[this.sizeProp].y))
          return 'custom'
        else
          return this.elem[this.sizeProp].y
      },
      set(value) {
        if (value === 'custom') {
          const clientRect = $app.elems.getClientRect(this.elem.id)

          this.elem[this.sizeProp].y = $app.sizes.screenToWorld1D(clientRect.height)
        } else
          this.elem[this.sizeProp].y = value
      },
    },

  },

}
</script>

<style>

</style>