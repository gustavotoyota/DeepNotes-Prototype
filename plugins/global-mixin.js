import Vue from "vue"



if (!Vue.__global_mixin__) {
  Vue.__global_mixin__ = true

  Vue.mixin({

    computed: {
      
      $app() { return $app },
      
      $state: {
        get() { return $state },
        set(value) { $state = value },
      },
      
      $assign() { return $assign },
      
      $getters() { return $getters },
      $commit() { return $commit },

    },

  })
}