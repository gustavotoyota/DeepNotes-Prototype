import Vue from "vue"



if (!Vue.__global_mixin__) {
  Vue.__global_mixin__ = true

  Vue.mixin({

    computed: {
      
      $state: {
        get() { return $state },
        set(value) { $state = value },
      },
      
      $assign() { return $assign },
      $merge() { return $merge },
      
      $getters() { return $getters },
      $commit() { return $commit },

    },

  })
}