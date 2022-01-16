<template>

  <div v-if="$getters.elem && $getters.elem.type === 'block'"
  style="height: 100%"
  class="d-flex flex-column">

    <v-toolbar dense style="flex: none">

      <v-toolbar-title>
        <span style="position: relative; top: 2px">Note Properties</span>
      </v-toolbar-title>

    </v-toolbar>



    
    <!-- Linked page -->
    
    <div style="flex: 1; overflow-y: auto" class="pb-4">
      
      <div class="mx-5 mt-4">
        <div class="body-2 grey--text text--lighten-1"
        style="margin-left: 1px">
          Linked page:
        </div>

        <Gap height="2px"/>

        <v-select dense outlined hide-details
        background-color="#181818" clearable
        :items="$app.pages.getRecent()" item-text="text" item-value="value"
        :menu-props="{ top: false, offsetY: true }"
        :value="$getters.elem.linkedPageId"
        @change="changeProp($event, (elem, value) => {
          elem.linkedPageId = value
        })"/>

        <Gap height="10px"/>
        
        
        <NewPageDialog/>
      </div>




      <!-- Default properties -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex; flex-direction: column">
        <v-btn @click="$app.defaultProps.set()">
          Set default properties
        </v-btn>

        <Gap height="14px"/>

        <v-btn @click="$app.defaultProps.copy($getters.elems)">
          Copy default properties
        </v-btn>
      </div>




      <!-- Title/Body -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex; flex-direction: column">
        <div style="display: flex">
          <v-checkbox hide-details label="Has title"
          style="flex: 1; margin-top: 0; padding-top: 0"
          :input-value="$getters.elem.hasTitle"
          @change="changeProp($event, (elem, value) => {
            elem.hasTitle = value
            elem.hasBody = elem.hasBody || $app.elems.getNumSections(elem) === 0
          })"/>

          <Gap width="16px" style="flex: none"/>

          <v-checkbox hide-details label="Has body"
          style="flex: 1; margin-top: 0; padding-top: 0"
          :input-value="$getters.elem.hasBody"
          @change="changeProp($event, (elem, value) => {
            elem.hasBody = value
            elem.hasTitle = elem.hasTitle || $app.elems.getNumSections(elem) === 0
          })"/>
        </div>

        <Gap height="12px"/>

        <v-btn @click="changeProp($event, (elem, value) => {
          const aux = elem.title
          elem.title = elem.body
          elem.body = aux
        })">
          Swap title and body
        </v-btn>
      </div>




      <!-- Container -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Container"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.container"
        @change="changeProp($event, (elem, value) => {
          elem.container = value
          elem.hasBody = elem.hasBody || $app.elems.getNumSections(elem) === 0
        })"/>
      </div>




      <!-- Anchor -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4" style="display: flex">
        <div style="flex: 1">
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
          @change="changeProp($event, (elem, value) => {
            elem.anchor.x = value
          })"/>
        </div>

        <Gap width="16px" style="flex: none"/>

        <div style="flex: 1">
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
          @change="changeProp($event, (elem, value) => {
            elem.anchor.y = value
          })"/>
        </div>
      </div>




      <!-- Collapsible/Collapsed -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Collapsible"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.collapsible"
        @change="changeProp($event, (elem, value) => {
          elem.collapsible = value
          elem.collapsed = elem.collapsed && value
        })">
        </v-checkbox>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Collapsed"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :disabled="!$getters.elem.collapsible"
        :input-value="$getters.elem.collapsed"
        @change="changeProp($event, (elem, value) => {
          $app.collapsing.setCollapsed(elem, value)
        })">
        </v-checkbox>
      </div>




      <!-- Width -->

      <v-divider class="mt-4"/>
        
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
          v-model="width">
          </v-select>
        </div>
        
      </div>




      <!-- Title height -->
        
      <div class="mx-5 mt-4" style="display: flex">
        
        <div style="flex: 1; width: 0">
          <div class="body-2 grey--text text--lighten-1"
          style="margin-left: 1px">
            Title height:
          </div>

          <Gap height="2px"/>

          <v-select dense outlined hide-details
          background-color="#181818"
          :items="[
            { text: 'Auto', value: 'auto' },
            { text: 'Custom', value: 'custom' },
          ]" item-text="text" item-value="value"
          :menu-props="{ top: false, offsetY: true }"
          v-model="titleHeight">
          </v-select>
        </div>
        
      </div>




      <!-- Body height -->
        
      <div class="mx-5 mt-4" style="display: flex">
        
        <div style="flex: 1; width: 0">
          <div class="body-2 grey--text text--lighten-1"
          style="margin-left: 1px">
            Body height:
          </div>

          <Gap height="2px"/>

          <v-select dense outlined hide-details
          background-color="#181818"
          :items="[
            { text: 'Auto', value: 'auto' },
            { text: 'Custom', value: 'custom' },
          ]" item-text="text" item-value="value"
          :menu-props="{ top: false, offsetY: true }"
          v-model="bodyHeight">
          </v-select>
        </div>
        
      </div>




      <!-- Container height -->
        
      <div class="mx-5 mt-4" style="display: flex">
        
        <div style="flex: 1; width: 0">
          <div class="body-2 grey--text text--lighten-1"
          style="margin-left: 1px">
            Container height:
          </div>

          <Gap height="2px"/>

          <v-select dense outlined hide-details
          background-color="#181818"
          :items="[
            { text: 'Auto', value: 'auto' },
            { text: 'Custom', value: 'custom' },
          ]" item-text="text" item-value="value"
          :menu-props="{ top: false, offsetY: true }"
          v-model="containerHeight">
          </v-select>
        </div>
        
      </div>




      <!-- Movable/Resizable -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Movable"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.movable"
        @change="changeProp($event, (elem, value) => {
          elem.movable = value
        })"/>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Resizable"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.resizable"
        @change="changeProp($event, (elem, value) => {
          elem.resizable = value
        })"/>
      </div>




      <!-- Wrapping -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Wrap title"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.wrapTitle"
        @change="changeProp($event, (elem, value) => {
          elem.wrapTitle = value
        })"/>

        <Gap width="16px" style="flex: none"/>
        
        <v-checkbox hide-details label="Wrap body"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.wrapBody"
        @change="changeProp($event, (elem, value) => {
          elem.wrapBody = value
        })"/>
      </div>




      <!-- Read-only -->

      <v-divider class="mt-4"/>
        
      <div class="mx-5 mt-4"
      style="display: flex">
        <v-checkbox hide-details label="Read-only"
        style="flex: 1; margin-top: 0; padding-top: 0"
        :input-value="$getters.elem.readOnly"
        @change="changeProp($event, (elem, value) => {
          elem.readOnly = value
        })"/>
      </div>

    </div>

  </div>
  
</template>

<script>
export default {

  methods: {
    changeProp(value, func) {
      for (const elem of $getters.elems)
        func(elem, value)
    },
  },



  computed: {

    sizeProp() {
      return $app.elems.getSizeProp($getters.elem)
    },




    // Properties
   
    width: {
      get() {
        if ($getters.elem[this.sizeProp].x.endsWith('px'))
          return 'custom'
        else
          return $getters.elem[this.sizeProp].x
      },
      set(value) {
        for (const elem of $getters.elems) {
          const sizeProp = $app.elems.getSizeProp(elem)

          if (value === 'custom') {
            const clientRect = $app.elems.getClientRect(elem)

            elem[sizeProp].x = `${$app.sizes.screenToWorld1D(clientRect.size.x)}px`
          } else
            elem[sizeProp].x = value
        }
      },
    },

    titleHeight: {
      get() {
        if ($getters.elem[this.sizeProp].y.title.endsWith('px'))
          return 'custom'
        else
          return $getters.elem[this.sizeProp].y.title
      },
      set(value) {
        for (const elem of $getters.elems) {
          const sizeProp = $app.elems.getSizeProp(elem)

          if (value === 'custom') {
            const node = $app.elems.getNode(elem, 'title')
            const clientRect = node.getBoundingClientRect()

            elem[sizeProp].y.title = `${$app.sizes.screenToWorld1D(clientRect.height)}px`
          } else
            elem[sizeProp].y.title = value
        }
      },
    },

    bodyHeight: {
      get() {
        if ($getters.elem[this.sizeProp].y.body.endsWith('px'))
          return 'custom'
        else
          return $getters.elem[this.sizeProp].y.body
      },
      set(value) {
        for (const elem of $getters.elems) {
          const sizeProp = $app.elems.getSizeProp(elem)

          if (value === 'custom') {
            const node = $app.elems.getNode(elem, 'body')
            const clientRect = node.getBoundingClientRect()

            elem[sizeProp].y.body = `${$app.sizes.screenToWorld1D(clientRect.height)}px`
          } else
            elem[sizeProp].y.body = value
        }
      },
    },

    containerHeight: {
      get() {
        if ($getters.elem[this.sizeProp].y.container.endsWith('px'))
          return 'custom'
        else
          return $getters.elem[this.sizeProp].y.container
      },
      set(value) {
        for (const elem of $getters.elems) {
          const sizeProp = $app.elems.getSizeProp(elem)

          if (value === 'custom') {
            const node = $app.elems.getNode(elem, 'container')
            const clientRect = node.getBoundingClientRect()

            elem[sizeProp].y.container = `${$app.sizes.screenToWorld1D(clientRect.height)}px`
          } else
            elem[sizeProp].y.container = value
        }
      },
    },

  },

}
</script>

<style>

</style>