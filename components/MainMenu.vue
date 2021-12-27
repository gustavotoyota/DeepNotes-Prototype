<template>

  <v-app-bar app clipped-left clipped-right dense>
    
    <v-app-bar-title style="flex: none">
      <div>DeepNotes</div>
    </v-app-bar-title>

    <Gap width="15px"/>

    <v-btn @click="loadLocalProject()">
      Load file

      <input ref="file" accept="application/json"
      type="file" style="display: none" @change="onFileChange"/>
    </v-btn>

    <Gap width="15px"/>

    <v-btn @click="$app.storage.saveProject('local')">
      Save file
    </v-btn>
    
  </v-app-bar>
  
</template>

<script>
export default {

  methods: {

    async loadLocalProject() {
      if (!window.showOpenFilePicker) {
        this.$refs.file.click()
        return
      }

      try {
        $app.storage.reset('local')

        $state.storage.local.fileHandle = (await showOpenFilePicker({
          types: [{ accept: { 'application/json': [] } }],
        }))[0]
        $state.storage.local.file = await $state.storage.local.fileHandle.getFile()

        $app.storage.loadProject()
      } catch (err) {
        console.log(err)
      }
    },
    
    onFileChange(event) {
      if (event.target.files.length === 0)
        return
      
      $app.storage.reset('local')

      $state.storage.local.file = event.target.files[0]

      $app.storage.loadProject()
    },

  },

}
</script>

<style scoped>

</style>