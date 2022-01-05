<template>

  <div v-if="$getters.elem && $getters.elem.type === 'note'"
  style="height: 100%"
  class="d-flex flex-column">

    <v-toolbar dense style="flex: none">

      <v-toolbar-title>
        <span style="position: relative; top: 2px">Note Properties</span>
      </v-toolbar-title>

    </v-toolbar>

    
    <div style="flex: 1; overflow-y: auto" class="pb-4">
      
      <div class="mx-5 mt-4">
        <div class="body-2 grey--text text--lighten-1"
        style="margin-left: 1px">
          Linked page:
        </div>

        <Gap height="2px"/>

        <v-select dense outlined hide-details
        background-color="#181818" clearable
        :items="recentPages" item-text="text" item-value="value"
        :menu-props="{ top: false, offsetY: true }"
        :value="$getters.elem.linkedPageId"
        @change="changeProp((elem, value) => {
          elem.linkedPageId = value
        }, $event)"/>

        <Gap height="10px"/>
        
        
        <NewPageDialog/>
      </div>

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex; flex-direction: column">
        <v-btn @click="$app.defaultProps.set()">
          Set default properties
        </v-btn>

        <Gap height="14px"/>

        <v-btn @click="$app.defaultProps.copy($app.selection.getElems())">
          Copy default properties
        </v-btn>
      </div>

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Has title"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.hasTitle"
        @change="changeProp((elem, value) => {
          elem.hasTitle = value
          elem.hasBody = elem.hasBody || (!elem.hasTitle && !elem.hasBody)
        }, $event)"/>

        <Gap width="16px" style="flex: none"/>

        <v-checkbox hide-details label="Has body"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.hasBody"
        @change="changeProp((elem, value) => {
          elem.hasBody = value
          elem.hasTitle = elem.hasTitle || (!elem.hasTitle && !elem.hasBody)
        }, $event)"/>
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
          :value="$getters.elem.anchor.x"
          @change="changeProp((elem, value) => {
            elem.anchor.x = value
          }, $event)"/>
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
          :value="$getters.elem.anchor.y"
          @change="changeProp((elem, value) => {
            elem.anchor.y = value
          }, $event)"/>
        </div>
      </div>

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Collapsible"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.collapsible"
        @change="changeProp((elem, value) => {
          elem.collapsible = value
          elem.collapsed = elem.collapsed && value
        }, $event)">
        </v-checkbox>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Collapsed"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :disabled="!$getters.elem.collapsible"
        :input-value="$getters.elem.collapsed"
        @change="changeProp((elem, value) => {
          $app.collapsing.setCollapsed(elem, value)
        }, $event)">
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
            ...($getters.elem.collapsed ? [{ text: 'Expanded', value: 'expanded' }] : []),
            { text: 'Custom', value: 'custom' },
          ]" item-text="text" item-value="value"
          :menu-props="{ top: false, offsetY: true }"
          :value="$getters.elem.anchor.x"
          @change="changeProp((elem, value) => {
            elem.anchor.x = value
          }, $event)">
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
        :input-value="$getters.elem.movable"
        @change="changeProp((elem, value) => {
          elem.movable = value
        }, $event)"/>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Resizable"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.resizable"
        @change="changeProp((elem, value) => {
          elem.resizable = value
        }, $event)"/>
      </div>

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Wrap text"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.wrapText"
        @change="changeProp((elem, value) => {
          elem.wrapText = value
        }, $event)"/>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Read-only"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.readOnly"
        @change="changeProp((elem, value) => {
          elem.readOnly = value
        }, $event)"/>
      </div>

    </div>

  </div>
  
</template>

<script>
export default {

  methods: {
    changeProp(func, value) {
      for (const elem of $app.selection.getElems())
        func(elem, value)
    },
  },



  computed: {

    sizeProp() {
      return $app.elems.getSizeProp($getters.elem)
    },

    recentPages() {
      const recentPages = []

      for (let i = $state.project.pages.recent.length - 1; i >= 0; --i) {
        const recentPageId = $state.project.pages.recent[i]

        if (recentPageId == $getters.page.id)
          continue

        const recentPage = $app.pages.getById(recentPageId)

        recentPages.push({ text: recentPage.name, value: recentPageId })
      }

      return recentPages
    },





    // Properties
   
    width: {
      get() {
        if (!isNaN($getters.elem[this.sizeProp].x))
          return 'custom'
        else
          return $getters.elem[this.sizeProp].x
      },
      set(value) {
        for (const elem of $app.selection.getElems()) {
          const sizeProp = $app.elems.getSizeProp(elem)

          if (value === 'custom') {
            const clientRect = $app.elems.getClientRect(elem)

            elem[sizeProp].x = $app.sizes.screenToWorld1D(clientRect.width)
          } else
            elem[sizeProp].x = value
        }
      },
    },
    height: {
      get() {
        if (!isNaN($getters.elem[this.sizeProp].y))
          return 'custom'
        else
          return $getters.elem[this.sizeProp].y
      },
      set(value) {
        for (const elem of $app.selection.getElems()) {
          const sizeProp = $app.elems.getSizeProp(elem)

          if (value === 'custom') {
            const clientRect = $app.elems.getClientRect(elem)

            elem[sizeProp].y = $app.sizes.screenToWorld1D(clientRect.height)
          } else
            elem[sizeProp].y = value
        }
      },
    },

  },

}
</script>

<style>

</style>