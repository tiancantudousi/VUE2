<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>主应用 - Vue@{{version}}</h1>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'page1',
  data () {
    return {
      version: Vue.version
    }
  },
  components: {
  }
}
</script>

<style>

</style>
